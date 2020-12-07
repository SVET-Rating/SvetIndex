import EmbarkJS from '../embarkjs';

const iLstorageConfig = {"abiDefinition":[{"inputs":[{"internalType":"address","name":"_addrIndex","type":"address"},{"internalType":"address","name":"_addrA","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"add","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_addrIndex","type":"address"},{"internalType":"address","name":"_addrA","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"sub","outputs":[],"stateMutability":"nonpayable","type":"function"}],"className":"iLstorage","args":[],"gas":"auto","silent":false,"track":true,"deploy":false,"realRuntimeBytecode":"","realArgs":[],"code":"","runtimeBytecode":"","linkReferences":{},"swarmHash":"","gasEstimates":null,"functionHashes":{"add(address,address,uint256)":"551f8e2a","sub(address,address,uint256)":"55ceeb31"},"filename":"/home/st/Desktop/svet_token/.embark/contracts/interfaces/iLstorage.sol","originalFilename":"contracts/interfaces/iLstorage.sol","path":"/home/st/Desktop/svet_token/contracts/interfaces/iLstorage.sol","type":"file","deploymentAccount":"0x132e2c063960e14eE62EC2dAC6AbA6bA4BB68552"};
const iLstorage = new EmbarkJS.Blockchain.Contract(iLstorageConfig);

export default iLstorage;
