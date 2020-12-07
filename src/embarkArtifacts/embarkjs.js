import EmbarkJS from 'embarkjs';






try {
const __embarkweb3 = require('embarkjs-web3');
EmbarkJS.Blockchain.registerProvider('web3', __embarkweb3.default || __embarkweb3);
} catch (e) {
}









const blockchainConfig = require('./config/blockchain.json');
EmbarkJS.Blockchain.setProvider(blockchainConfig.provider, {});
EmbarkJS.Blockchain.connect(blockchainConfig, (err) => {if (err) { console.error(err); } });





if (typeof WebSocket !== 'undefined') {
    const ws = new WebSocket(`${location.protocol === 'https:' ? 'wss' : 'ws'}://${location.hostname}:${location.port}`);
    ws.addEventListener('message', (evt) => {
        if (evt.data === 'outputDone') {
            location.reload(true);
        }
    });
}




export default EmbarkJS;