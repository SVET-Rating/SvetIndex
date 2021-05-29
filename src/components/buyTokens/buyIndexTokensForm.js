import React, { useState } from 'react';
import { connect } from 'react-redux';
import { getContract } from 'ethvtx/lib/contracts/helpers/getters';
import checkSvetTokensForBuyIndexTokensAction  from '../../ethvtx_config/actions/checkIndexTokenAmountAction';
import svetTokensBuyProcessStart from '../../ethvtx_config/actions/goToSvetTokenMethodPayment';
import formBuyIndexTokens from '../../ethvtx_config/actions/buyIndexTokensAction';
import resetAction from "../../ethvtx_config/actions/resetInvestmentsAction";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  button: {
    marginLeft: '20px',
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
      color: '#FFF'
    },
  },
});

const IndexTokenPaymentForm = (props) => {
  const classes = useStyles();
  const [isDisable, setIsDisable] = useState(() => (
    props.indexTokensAmount <= 0 || props.indexTokensAmount > props.svetTokensAmount
  ));

  const handleTextField = (e) => {
    const { value } = e.target;
    setIsDisable(() => Number.isNaN(Number(value)) || value <= 0 || value > props.svetTokensAmount);
    props.addIndexTokenAmount(value, props.indexTokenPrice, props.svetTokensAmount);
  };

  const handleGoBack = (e) => {
    props.addIndexTokenAmount(0, props.indexTokenPrice, props.svetTokensAmount);
    props.resetToInvestment(e);
  };

  const handleBuyToken = () => {
    props.buyIndexTokens(
      props.buyIndexTokensContract,
      props.indexTokensAmount,
      props.indexTokenAddress,
      props.currentAddress,
      props.svetToken,
    );
  };

  const handleBuySVET = (e) => props.buySvetTokensMethodSelect(e);

  return (
    <div>
      <div className="left-list-header">
        <p>{props.indexTokenName}</p>
      </div>

      <div className="svet-token-payment-form">
        <p className="field">
          PRICE (SVET):
          <span className="numbers">
            {props.indexTokenPrice.toFixed(4)}
          </span>
        </p>
        <p className="field">
          Available in YOUR WALLET (SVET):
          <span className="numbers">
            {props.svetTokensAmount.toFixed(4)}
          </span>
          </p>
        <p className="field">
          MAX TO BUY:
          <span className="numbers">
            {(props.svetTokensAmount/props.indexTokenPrice).toFixed(4)}
          </span>
        </p>
        <p>GAS AMOUNT: <span className="number_left">{props.gasAmount}</span></p>
        <p>GAS PRICE (gwei):<span className="number_left">{props.gasPrice}</span></p>
        <p>APPROX. COST of TRANSACTION (ETH):
          <span className="number_left">{props.gasPrice * props.gasAmount / 1000000000}</span>
        </p>
        <p>FOR BLOCK: <span className="number_left">{props.curBlock}</span></p>

        <div className="svet-token-payment-form-input"
          style={props.enoughSvetTokensForBuy || props.svetTokensAmount != 0 ? {} : {display:'none'}}
        >
          <TextField
            autoComplete="off"
            id="outlined-basic"
            label="AMOUNT of SVETS to invest"
            variant="outlined"
            value={props.indexTokensAmount}
            onChange={handleTextField}
          />
          <p>Sum of Index:
            <span className="number_left">
              {isDisable ? '0' : (props.indexTokensAmount / props.indexTokenPrice).toFixed(4)}
            </span>
          </p>
        </div>

        <div >
          <Button variant="outlined" className={classes.button}
            onClick={handleGoBack}
          >Go Back</Button>

          <Button variant="outlined" className={classes.button}
            style={props.enoughSvetTokensForBuy || props.svetTokensAmount != 0 ? {} : {display:'none'}}
            onClick={handleBuyToken}
            disabled={isDisable}
          >
            {isDisable ? 'Buy' : `Buy: ${(props.indexTokensAmount / props.indexTokenPrice).toFixed(4)} Index`}
          </Button>

          <Button variant="outlined" className={classes.button}
            // style={props.enoughSvetTokensForBuy || props.svetTokensAmount != 0 ? {display:'none'} : {}}
            onClick={handleBuySVET}
          >Buy SVET Tokens</Button>
        </div>
      </div>
    </div>
  );
}

const getIndexPriceInSvet = (tokens,state) => {
  var tokenPrice;

  var tokensPrice = tokens.map((item, key) => {
    var tokenPriceCurrent = getContract(state, 'OraclePrice', '@oracleprice').fn.getLastPrice(item[0]);
    if (tokenPriceCurrent === undefined) {
      return tokenPriceCurrent;
    }
    tokenPrice = tokenPriceCurrent / 10**item[2] * item[1] / 10000;
    ///10^item[4]
    return tokenPrice;
  });

  var svetTokenPrice = getContract(state, 'OraclePrice', '@oracleprice')
    .fn.getLastPrice(state.buyTokensReducer.svetTokens.address);

  if (svetTokenPrice === undefined) {
    return svetTokenPrice;
  }

  if (tokensPrice.indexOf(undefined) !== -1) {
    return undefined;
  }

  var resultIndexTokenPriceUSD = tokensPrice.reduce((a, b) => a + b, 0);
  return resultIndexTokenPriceUSD / (svetTokenPrice / 10**18);
};

const getIndex2swap = (state) => {
  const fnIndex2swap = getContract(state, 'IndexSwap', '@indexswap');
  //let amount_in_wei = web3.utils.toBN(_amount)
  //const fN = fnIndex2swap._contract.methods.buyIndexforSvetEth
  //(web3.utils.toWei(amount_in_wei), _address).send({from: state.vtxconfig.coinbase});
  return fnIndex2swap;
};

const getEventSvetToken = (state) => {
  const contract = getContract(state, 'ERC20', '@svettoken')
  const events = contract.events.Approval()
  return events;
};

const getGasAmount = (state) => {
  return getIndex2swap._contract.methods
    .buyIndexforSvetEth(1, state.indexTokenReducer.activeToken.tokenAddress)
    .estimationGas({ from: state.vtxconfig.coinbase });
};

const getGasPriceAsync = async (state) => {
  const result = await state.vtxconfig.web3.eth.getGasPrice();
  console.log(result);
  return result;
};

const getGasPrice = (state) => {
  getGasPriceAsync(state).then((result) => {
      if (typeof(result) == 'object') {
        return undefined;
      } else {
        return result;
      }
    }
  );
};

const getIndexGasAmout = (state) => {
  const actList = getContract(state, 'IndexToken', state.indexTokenReducer.activeToken.tokenAddress)
    .fn.getActivesList();

  if (actList == undefined) {
    return actList;
  } else {
    const gasAmount = Math.round((actList.length * 161387 + 44160 + 52010) * 1.02);
    return gasAmount;
  }
};

const getTxPrice = () => getGasAmount * web3.eth.gasPrice;

const mapStateToProps = (state) => {
  return {
    indexTokenName: state.indexTokenReducer.activeToken.indexTokenName,
    indexTokenAddress:state.indexTokenReducer.activeToken.tokenAddress,
    enoughSvetTokensForBuy: state.buyTokensReducer.enoughSvetTokensForBuy,
    indexTokenPrice: getIndexPriceInSvet(state.indexTokenTokens.tokens,state),
    svetTokensAmount: state.buyTokensReducer.svetTokens.amount,
    buyIndexTokensContract: getIndex2swap(state),
    indexTokensAmount: state.buyTokensReducer.indexTokensAmount,
    currentAddress: state.vtxconfig.coinbase,
    svetToken:getContract(state, 'ERC20', '@svettoken'),
    svetTokenAprovalEvent: getEventSvetToken(state),
    gasPrice: state.buyTokensReducer.gasPrice,// web3.eth.getGasPrice(),
    gasAmount: getIndexGasAmout(state),
    curBlock: state.blocks.current_height,
    blockTimeStamp: state.blocks.blocks[state.blocks.current_height].timestamp,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    resetToInvestment: (e) => dispatch(resetAction(e)),
    buySvetTokensMethodSelect:(e) => dispatch(svetTokensBuyProcessStart(e)),
    addIndexTokenAmount: (e, indexTokenPrice, svetTokensAmount) => (
      dispatch(checkSvetTokensForBuyIndexTokensAction(e, indexTokenPrice, svetTokensAmount))
    ),
    buyIndexTokens: (ITokContract, ITAmount, ITAddress, currentAddress, svetToken) => (
      dispatch(formBuyIndexTokens(ITokContract, ITAmount, ITAddress, currentAddress, svetToken))
    ),
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(IndexTokenPaymentForm);
