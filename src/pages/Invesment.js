import React from 'react'
import IndexTokenList from '../components/IndexTokensList'
import TokensInIndexTokenList from '../components/TokensInIndexTokenList'

export default function Invesment() {
    return (
        <div>
           <div className="tokens-container">
            
            <div className="left-list">
                <IndexTokenList/>
            </div>
            
            <div className="right-list">
            <br /> "TokensInIndexTokenList"
            </div >

        </div> 
        </div>
    )
}
