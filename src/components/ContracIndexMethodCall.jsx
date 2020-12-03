import { getContract, getAccount } from 'ethvtx/lib/contracts/helpers/getters';
import React from 'react';

import { connect } from 'react-redux';

const ContractMethodCallRaw  =  (props) => {

        return (
            <div>
            <li className="left-list-item" id={props.item.id} style={!props.item.active ? {boxShadow:'none'}:{}}>
                        
                        <i className="fa fa-question-circle"></i>
                    
                    
                        <p onClick={props.changeActiveElement}>
                            {/* VERY GOOD INDEX TOKEN */}
                            {props.IndexToken_name || 'Loading Index name...'}
                            {props.IndexToken_SYM || 'Loading Index symbol...'}

                        </p>
                        <p style={{ minWidth: '1rem' }}>
                            {/* VERY GOOD INDEX TOKEN */}
                            {props.IndexToken_balanceOf}
                        </p>
                    
                    
                        <button className="invest">INVEST</button>
                    
                     </li>
                            
        
                  
            </div>
        );
    }


const mapStateToProps = (state) => ({

});

export const ContractIndexMethodCall = connect(mapStateToProps)(ContractMethodCallRaw);
