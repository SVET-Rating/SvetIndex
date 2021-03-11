import React,{useEffect} from 'react';
import Iframe from 'react-iframe'



const dashboardPage = (props) => {

    useEffect(() => {
        const handler = event => {
                const selector_iframe = document.querySelector('iframe').contentWindow.document.querySelector(".navbar");
        if (selector_iframe != null) {
            selector_iframe.style.display = "none";
        }
        }
    
        window.addEventListener("message", handler)
    
        // clean up
        return () => window.removeEventListener("message", handler)
      }, []) 

    return (
        // <meta http-equiv="refresh" content="0;http://svetrating.com/coin_list" />
        <div style={{margin: '0 auto', width:'90%'}}>
        <iframe is="x-frame-bypass" src="http://svetrating.com/coin_list"
         width="100%" height="500px" />
         </div>

        // <Iframe url="http://svetrating.com/coin_list"
        // width="450px"
        // height="450px"
        // id="myId"
        // className="myClassname"
        // display="initial"
        // position="relative"
        // sandbox=""/>

    );
}

/**
 *         <div>
        <div className="tokens-container">
         
         <div className="left-list">
             test left dashboard
         </div>
         
         <div className="right-list">
             test right dashboard
         </div>

     </div> 
     </div>
 */
export default dashboardPage;