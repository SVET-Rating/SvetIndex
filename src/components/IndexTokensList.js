import React from 'react'
//import EmbarkJS from 'Embark/EmbarkJS';

import IndexTokensListItem from './IndexTokensListItem'
//import IndexStorage from '../SvetAng/embarkArtifacts/contracts/IndexStorage';
/*
async indexList(e) {
   // e.preventDefault();
    await EmbarkJS.enableEthereum();
    await web3.eth.getAccounts().then(e => { this.state.account = e[0];  
      });
      IndexStorage.methods.indexList().call().then(_value => this.setState({ tokenList: _value }));
    
  }
  */
export default function IndexTokensList() {
    return (
        <div>
            <div className="left-list-header">
                    <p>
                        AVAILABLE INDEX TOKENS (PORTFELS)
                    </p>
                </div>
                <ul className="left-list-items">

                    <IndexTokensListItem/>
                    
                   
                </ul>
        </div>
    )
}
