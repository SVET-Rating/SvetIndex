import React, { Fragment } from 'react';

import {ContractIndexMethodCall } from "./ContracIndexMethodCall";
import { getContract, getAccount } from 'ethvtx/lib/contracts/helpers/getters';
import { connect } from 'react-redux';
import indexTokenSelect from '../redux/actions/indexTokenSelect';

const ContractLoaderContainer  =  (props) => {



        return (
            <Fragment>
            <div>
            {
                 <ContractIndexMethodCall 
                    IndexToken_name = {props.indexToken_name} 
                    IndexToken_SYM ={props.indexToken_SYM} 
                    IndexToken_balanceOf = {props.indexToken_balanceOf}
                /> 
            }
            </div>
            </Fragment>
        );
    
}


const mapStateToProps = (state, props) => ({
    
    indexToken_name: getContract(state, "@"+props.item.name.toLowerCase() ).fn.name(),
    indexToken_SYM: getContract(state, "@"+ props.item.name.toLowerCase() ).fn.symbol(),
    indexToken_balanceOf: getContract(state, "@"+ props.item.name.toLowerCase() ).fn.balanceOf(getAccount(state, '@mainAcc'))
});

const mapDispatchToProps = dispatch => ({
    changeActiveElement: (e) => dispatch(indexTokenSelect(e.target.parentElement.id)),
  })


export const IndexContractLoader = connect(mapStateToProps, mapDispatchToProps)(ContractLoaderContainer)

// export const IndexContractLoader = withContracts(loadContract, ContractLoaderContainer);