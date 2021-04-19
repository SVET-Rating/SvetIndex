import React from 'react';
//  import Fragment from 'react-fragment';
import {connect} from 'react-redux';
import { getContract } from 'ethvtx/lib/contracts/helpers/getters';
import getTokensByIndex from '../../ethvtx_config/actions/getTokensByIndex';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {Pie} from 'react-chartjs-2';
const tokenColors = require("../../assets/colors.json");


const useStyles = makeStyles({
    table: {
      width: '100%',
    },
    tableHeader: {
        backgroundColor: 'beige',
    }
  });
const TokensInIndexTokenListItem = (props) => {
    //get active index token from list
    const classes = useStyles();
        if (props.indexList === undefined) {
            return <div><li className="right-list-item"><p>Click on index token name to view it portfolio </p></li></div>
        } else {
        props.tokens(props.indexList);
        var labels = []
        var data_percent = []
        var backgroundColor = []
        var hoverBackgroundColor = []
        var getTokensByActiveIndexToken = props.indexList.map((item,key) => {
            labels.push(item.symbol);
            data_percent.push(item.amount/100);
            // var randomColor = "#"+Math.floor(Math.random()*16777215).toString(16);
            var randomColor = tokenColors.colors[key]
            backgroundColor.push(randomColor);
            hoverBackgroundColor.push(randomColor);
            return (
            // <li className="right-list-item index-li" style={{showBox:'none'}}>
            // <div><div><p>{item.name}: {item.symbol}</p>
            // <div>{item.addrActive}</div>
            // <p>Index share: {item.amount/100}%</p>
            // <p>Your Balance: {props.balActiveFn(props.currentAddress, props.indexToken, item.addrActive) / 10**18}</p>
            // <i className="fa fa-question-circle"></i></div>
            // </div>               
            // </li>
                
               
                    <TableRow key={item.name}>
                    <TableCell component="th" scope="row">
                        {item.symbol}
                    </TableCell>
                    <TableCell align="right">{item.addrActive}</TableCell>
                    <TableCell align="right">{item.amount/100}</TableCell>
                    <TableCell align="right">{props.balActiveFn(props.currentAddress, props.indexToken.tokenAddress, item.addrActive) / 10**18}</TableCell>
                    </TableRow>
                
                

            )
        });
        }   
                    
        return (
            <React.Fragment>
            <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead className={classes.tableHeader}>
                <TableRow>
                    {/* <TableCell>Name</TableCell> */}
                    <TableCell align="right">Symbol</TableCell>
                    <TableCell align="right">Address</TableCell>
                    <TableCell align="right">%</TableCell>
                    <TableCell align="right">Ballance</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
            {getTokensByActiveIndexToken}
            </TableBody>
            </Table>
            </TableContainer>

            <div>
            <h2>{props.indexToken.indexTokenName}</h2>
            <Pie data={{
                        labels,
                        datasets: [{
                            data: data_percent,
                            backgroundColor,
                            hoverBackgroundColor
                        }]
                    }} />
            </div>
            </React.Fragment>
        )
    
}

const getIndexList = (address,state) => {
    if (address === "") {
        return undefined
    }
    return getContract(state, 'IndexToken', address).fn.getActivesList()
}
const balActiveFn = ( state) => {

    const LS = getContract(state,'Lstorage', '@lstorage');
    if (LS == undefined) {
        return undefined
    } else {
        const liq = LS.fn.getBalance;
        return liq;
    }
    
  
}

const mapStateToProps = (state) => {
    return {indexList: getIndexList(state.indexTokenReducer.activeToken.tokenAddress, state),
    balActiveFn: balActiveFn(state),
    indexToken: state.indexTokenReducer.activeToken,
    currentAddress: state.vtxconfig.coinbase

    }
    //return {indexList: state.indexTokenTokens.tokens }
    
}

const mapDispatchToProps = dispatch => {
   return {
    tokens: (tokens) => dispatch(getTokensByIndex(tokens))
   } 
}

export default connect(mapStateToProps,mapDispatchToProps)(TokensInIndexTokenListItem)


