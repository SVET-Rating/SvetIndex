import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
// import { Fragment } from 'react';
import indexTokenSelect from '../../ethvtx_config/actions/indexTokenSelect';
import startBuyIndexTokens from '../../ethvtx_config/actions/startToBuyIndexTokens';
import startSellToken from '../../ethvtx_config/actions/startSellIndexTokens';
import IndexTokens from '../indexTokenTokens/TokensInIndexTokenList';
//import { IndexContractLoader } from '../IndexContractLoader';
import { getContract, getContractList } from 'ethvtx/lib/contracts/helpers/getters';
//import contracts from '../embarkArtifacts/contracts';
import { Jazzicon } from '@ukstv/jazzicon-react';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
// import { white } from 'chalk';
//import {readFile}  from 'commonjs fs';
import tokenList from '../../assets/tokenlist.json';
import { EthAddress } from 'rimble-ui';

const useStyles = makeStyles({
  buttonSell: {
    padding: '1rem',
    minWidth: '10rem',
    color: "white",
    fontSize: '2rem',
    lineHeight: 1,
    border: '1px solid',
    borderRadius: '0.5rem',
    backgroundColor: '#e0101099',
    '&:hover': {
      backgroundColor: '#9a8f11b0',
      color: '#FFF',
    },
  },
  buttonBuy: {
    padding: '1rem',
    minWidth: '10rem',
    color: 'white',
    fontSize: '2rem',
    lineHeight: 1,
    border: '1px solid',
    borderRadius: '0.5rem',
    backgroundColor: '#119a1199',
    '&:hover': {
      backgroundColor: '#9a8f11b0',
      color: '#FFF',
    },
  },
  actionSection: {
    display: 'flex',
    justifyContent: 'center',
    '& > button:last-child': {
      marginLeft: '20px',
    },
    minHeight: '4rem',
  },
});

const IndexTokensListItem = (props) => {
  const classes = useStyles();

  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(max-width: 600px)');
    if (media.matches !== matches) {
      setMatches(media.matches);
      console.log('TEST MEDIA QUERY', media.matches);
    }
  }, [matches]);

  const getTokensIcons = (tokens) => {
    return tokens.map((address, key) => {
      const isExist = tokenList.tokens.findIndex(e => e.address == address.addrActive) >= 0;
      return (
        <div className="icon-item" key={key}>
          <span>&nbsp;{address.amount / 100}&nbsp;%</span>
          <div style={{ width: '25px', height: '25px', margin:'0 5px' }} id={key}>
            {isExist && (
              <img style={{ width: '25px', height: '25px', margin: '0 5px' }}
                src={'/static/assets/blockchains/ethereum/assets/' + address.addrActive + '/logo.png'}
              />
            )}
            {!isExist && <Jazzicon address={address.addrActive} />}
          </div>
          <span>{address.symbol}</span>
        </div>
      );
    });
  };

  if (props.indexList !== undefined) {
    const indexJSXList = props.indexList.map((item, key) => {
      let styleSelect = {};
      let investStyle = {};
      let indexListComponent = '';

      if (item.addr !== props.activeToken.tokenAddress) {
        styleSelect = { boxShadow: 'none', border: 'unset' };
        investStyle = { display:'none' };
        indexListComponent = '';
      } else {
        styleSelect = { border: '1px dashed #c51f1f' };
        if (matches) {
          indexListComponent = <div><h3>Tokens of Index Token</h3><IndexTokens /></div>
        }
      }

      return (
        <li className="left-list-item index-li" id={item.addr} style={styleSelect} key={key}
          onClick={(e) => {
            if (matches) {
              setTimeout(() => {
                const objControl = document.getElementById(item.addr);
                objControl.scrollIntoView({ behavior: "smooth" });
              }, 500);
            }
            props.changeActiveElement(item.addr, item.name, item.balance / 10**18)
          }}
        >
          {/* <i className="fa fa-question-circle"></i> */}
          <div className="token_info">
            <div>
              <div className="index-token-name">
                <div style={{ width: '25px', height: '25px', margin:'0 5px' }} id={key}>
                  <Jazzicon address={item.addr} />
                </div>
                <div className="price">
                  {item.name}
                </div>
              </div>
            </div>

            <div>
              <p className="price"> Index Price: {item.price.toFixed(4)} SVT</p>
              <p className="balance numbers" style={{ minWidth: '1rem' }}>
                Your Index Balance: {(item.balance / 10**18).toFixed(6)}
              </p>
            </div>
          </div>

          <div className="address_container" >
            <span style={{ 'fontSize': '65%' }} className="address_in_list">
              {matches}
              Contract Address: <EthAddress address={item.addr} />
            </span>
          </div>

          <div className="index-token-icons">{getTokensIcons(item.tokens)}</div>

          <Box className={classes.actionSection}>
            <Button variant="outlined" className={classes.buttonBuy}
              style={investStyle}
              onClick={() => props.startBuyToken(props.svetTokensAmount, props.svetTokenAddress, props.state_web3)}
            >Buy</Button>

            <Button variant="outlined" className={classes.buttonSell}
              style={investStyle}
              onClick={() => props.startSellToken(props.state_web3)}
            >Sell</Button>
          </Box>

          {indexListComponent}
        </li>
      );
    });

    return <div>{indexJSXList}</div>;
  } else {
    return <div>Data loading...</div>;
  }
};

const getIndexPriceInSvet = (indexTokenAddress, state) => {
  let tokenPrice;

  let svetTokenAddress = getContract(state, 'Exchange', '@exchange').fn.getBA();
  if (svetTokenAddress == undefined) {
    return undefined;
  }

  let tokensList = getContract(state, 'IndexToken', indexTokenAddress).fn.getActivesList();
  if (tokensList == undefined) {
    return undefined;
  }

  const tokensPrice = tokensList.map((item, key) => {
    const tokenPriceCurrent = getContract(state, 'OraclePrice', '@oracleprice').fn.getLastPrice(item[0]);
    if (tokenPriceCurrent === undefined) {
      return tokenPriceCurrent;
    }
    tokenPrice = tokenPriceCurrent / 10**item[2] * item[1] / 10000
        ///10^item[4]
    return tokenPrice;
  });

  const svetTokenPrice = getContract(state, 'OraclePrice', '@oracleprice').fn.getLastPrice(svetTokenAddress);
  if (svetTokenPrice === undefined) {
    return svetTokenPrice;
  }
  if (tokensPrice.indexOf(undefined) !== -1) {
    return undefined;
  }

  const resultIndexTokenPriceUSD = tokensPrice.reduce((a, b) => a + b, 0);
  return resultIndexTokenPriceUSD / (svetTokenPrice / 10**18);
};

const getIndexList = (address,state) => {
  if (address === "") {
    return undefined;
  }
  return getContract(state, 'IndexToken', address).fn.getActivesList();
};

const indexListWithBalance = (state) => {
  const indexTokensList = getContract(state, 'IndexStorage', '@indexstorage').fn.indexList();

  if (indexTokensList != undefined) {
    const resultList = indexTokensList.map((item, key) => {
      const currentBalance = getContract(state, 'IndexToken', item.addr)
        .fn.balanceOf(state.contracts.web3.currentProvider.selectedAddress);
      // const currentPrice = getContract(state, 'OraclePrice', '@oracleprice').fn.getLastPrice(item.addr);
      const currentPrice = getIndexPriceInSvet(item.addr, state);

      if (currentBalance == undefined || currentPrice == undefined) {
        return undefined;
      } else {
        const tokens_addresses_list = getIndexList(item.addr,state);

        if (tokens_addresses_list == undefined) {
          return undefined;
        }

        return {
          addr: item.addr,
          name: item.name,
          balance: currentBalance,
          price: currentPrice,
          tokens: tokens_addresses_list,
          //._contract.methods.balanceOf(state.contracts.web3.currentProvider.selectedAddress)
        };
      }
    });

    if (resultList.indexOf(undefined) == -1 ) {
      return resultList;
    } else {
      return undefined;
    }
  } else {
    return undefined;
  }
};

const mapStateToProps = (state) => ({
  indexList: indexListWithBalance(state),
  contractsList: getContractList(state),
  activeToken: state.indexTokenReducer.activeToken,
  svetTokensAmount: getContract(
      state, 'ERC20', '@svettoken'
    ).fn.balanceOf(state.contracts.web3.currentProvider.selectedAddress) / 10**18,
  svetTokenAddress: getContract(state, 'Exchange', '@exchange').fn.getBA(),
  state_web3: state.vtxconfig.web3.eth,
  //svetTokenAddress: getContract(state, 'Exchange', '@exchange').fn.getBA()
});

const mapDispatchToProps = (dispatch) => {
  return {
    changeActiveElement: (e, indexTokenName, indexTokenBalance) => (
      dispatch(indexTokenSelect(e, indexTokenName, indexTokenBalance))
    ),
    startBuyToken: (svetTokensAmount, svetTokenAddress, stateWeb3) => (
      dispatch(startBuyIndexTokens(svetTokensAmount, svetTokenAddress, stateWeb3))
    ),
    startSellToken: (stateWeb3) => dispatch(startSellToken(stateWeb3)),
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(IndexTokensListItem);
