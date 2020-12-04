/* eslint-disable react/no-typos */
import React from 'react'
import IndexTokenList from '../components/indexTokenList/IndexTokensList';
import TokensInIndexTokenList from '../components/indexTokenTokens/TokensInIndexTokenList'

export default function Invesment() {
    return (
        <div>
           <div className="tokens-container">
            
            <div className="left-list">
                <IndexTokenList/>
            </div>
            
            <div className="right-list">
            <TokensInIndexTokenList />
            </div>

        </div> 
        </div>
    )
}
