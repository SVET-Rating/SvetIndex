import React, {useEffect} from 'react';


const oraculesPage = (props) => {

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
         <meta http-equiv="refresh" content="0;/reports_all/Latest/" />

    );
 /*        <div style={{margin: '0 auto', width:'90%'}}>
        <iframe is="x-frame-bypass" src="http://svetrating.com/reports_all/Latest/"
         width="100%" height="500px" />
         </div>
    return (
        <div>
        <div className="tokens-container">
         
         <div className="left-list">
             test left oracules
         </div>
         
         <div className="right-list">
             test right oracules
         </div>

     </div> 
     </div>
    );
    */
}

export default oraculesPage;