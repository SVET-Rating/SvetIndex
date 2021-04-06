import React, {useEffect} from 'react';


const expertsPage = (props) => {
    
    // useEffect (() =>{

    //     const selector_iframe = document.querySelector('iframe').contentWindow.document.querySelector(".navbar");
    //     if (selector_iframe != null) {
    //         selector_iframe.style.display = "none";
    //     }
    //  })

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
          <meta http-equiv="refresh" content="0;/about/" />
         

    );
    /**<div style={{margin: '0 auto', width:'90%'}}>
        <iframe is="x-frame-bypass" src="/about/"
         width="100%" height="500px" />
         </div>
     *         <div>
        <div className="tokens-container">
         
         <div className="left-list">
             test left experts
         </div>
         
         <div className="right-list">
             test right experts
         </div>

     </div> 
     </div>
     */
}

export default expertsPage;