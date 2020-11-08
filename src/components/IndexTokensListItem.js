import React from 'react'

//import EmbarkJS from 'Embark/EmbarkJS';
//import OraclePrice from 'github.com/stanta/SvetAng/tree/svetboard-Ropsten/embarkArtifacts/contracts/OraclePrice';
//import Exchange from 'github.com/stanta/SvetAng/tree/svetboard-Ropsten/embarkArtifacts/contracts/Exchange';
//import ERC20 from 'github.com/stanta/SvetAng/tree/svetboard-Ropsten/embarkArtifacts/contracts/TokTst';

//import OraclePrice from '../SvetAng/embarkArtifacts/contracts/OraclePrice';
//import Exchange from '../SvetAng/embarkArtifacts/contracts/Exchange';
//import ERC20 from '../SvetAng/embarkArtifacts/contracts/TokTst';
import {IndexTokenConfig} from '../contracts/IndexToken';
import {DrizzleProvider} from 'drizzle-react';
import {LoadingContainer, AccountData, ContractData, ContractForm} from 'drizzle-react-components';
 
const drizzleOptions  = {
    contracts: [IndexTokenConfig]
}
/*
async getActivesList(e) {
   // e.preventDefault();
    await EmbarkJS.enableEthereum();
    await web3.eth.getAccounts().then(e => { this.state.account = e[0];  
      });
      IndexToken.methods.getActivesList().call().then(_value => this.setState({ tokenList: _value }));
    
  }
  
  async getValue(e) {
  //  e.preventDefault();
    await EmbarkJS.enableEthereum();
    
    await web3.eth.getAccounts().then(e => { this.state.account = e[0];  
      });
    //MakeOptions.methods.getLast(account).call().then(_value => this.setState({ getValue: _value }));
    
    this.state.curToken =  EmbarkJS.Blockchain.Contract({
        abi: ERC20.options.jsonInterface,
        address: this.state.getValue});
    
          
    await this.state.curToken.methods.name().call().then(_value =>
          {
            this.setState({name: _value});
          });
        
    await this.state.curToken.methods.symbol().call().then(_value =>
            {
              this.setState({symbol: _value});
            });
    await this.state.curToken.methods.decimals().call().then(_value =>
              {
                this.setState({decimals: _value});
              });
    this._addToLog("token address: ", this.state.getValue );

  //  * 3. get rates from oraclePrice and caclulate amounts
  await OraclePrice.methods.getLastPrice(this.state.getValue).call().then(_value =>
    {
      this.setState({tokenPrice: _value});
    });
  }
*/
export default function IndexTokensListItem() {
    return (
        <DrizzleProvider options = {drizzleOptions}>
            <LoadingContainer>
                
            <li className="left-list-item">
                        
                        <i className="fa fa-question-circle"></i>
                        <AccountData accountIndex={0} units={"ether"} precision = {3} />

                        <p>
                            VERY GOOD INDEX TOKEN
                        </p>

                        <ContractData contract = "IndexTokenConfig" method = "getActivesList" />
                        <button className="invest">INVEST</button>
                    
            </li>
            </LoadingContainer>
        </DrizzleProvider>
    )
}
