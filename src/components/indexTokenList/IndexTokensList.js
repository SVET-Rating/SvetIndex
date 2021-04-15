import React from 'react'
import IndexTokensListItem from './IndexTokensListItem'
export default function IndexTokensList() {
    return (
        <div>
            <div className="left-list-header">
                    <p className="header-index">
                    Indexes
                    </p>
                </div>
                <ul className="left-list-items">

                    <IndexTokensListItem/>
                    
                   
                </ul>
        </div>
    )
}
