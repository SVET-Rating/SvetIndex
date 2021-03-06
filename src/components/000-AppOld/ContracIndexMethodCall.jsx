import { getContract, getAccount } from 'ethvtx/lib/contracts/helpers/getters';
import React from 'react';

import { connect } from 'react-redux';

export class ContractMethodCallRaw extends React.Component {

    render() {
        return (
            <div>
            <li className="left-list-item" id={this.props.item.id} style={!this.props.item.active ? {boxShadow:'none'}:{}}>
                        
                        <i className="fa fa-question-circle"></i>
                    
                    
                        <p onClick={this.props.changeActiveElement}>
                            {/* VERY GOOD INDEX TOKEN */}
                            {this.props.IndexToken_name || 'Loading Index name...'}
                            {this.props.IndexToken_SYM || 'Loading Index symbol...'}

                        </p>
                        <p style={{ minWidth: '1rem' }}>
                            {/* VERY GOOD INDEX TOKEN */}
                            {this.props.IndexToken_balanceOf(this.props.account)}
                        </p>
                    
                    
                        <button className="invest">INVEST</button>
                    
                     </li>
                            
        
                  
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    account: getAccount(state, '@mainAcc'),
    IndexToken_name: getContract(state, 'IndexToken').fn.name(),
    IndexToken_SYM: getContract(state, 'IndexToken').fn.symbol(),
    IndexToken_balanceOf: getContract(state, 'IndexToken').fn.balanceOf
});

export const ContractIndexMethodCall = connect(mapStateToProps)(ContractMethodCallRaw);
