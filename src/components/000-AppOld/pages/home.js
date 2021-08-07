import React from 'react';
import investmentImg from '../static/images/investment.png'

const homePage = (props) => {
    return (
        <div>
            <div className="left-list-header">
                    <p>
                        MAKE INTELIGENT INVESTMENTS WITH EXPERTS
                    </p>
                </div>
                <ul className="left-list-items" style={{textAlign:'center'}}>

                    <img src={investmentImg} alt="BEST INVESTMENTS"/>
                    
                   
                </ul>
        </div>
    )
}

export default homePage;