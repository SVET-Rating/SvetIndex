import EmbarkJS from '../embarkjs';

const iExpertsConfig = {"abiDefinition":[{"inputs":[{"internalType":"address","name":"_addr","type":"address"}],"name":"isExpert","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"}],"className":"iExperts","args":[],"gas":"auto","silent":false,"track":true,"deploy":false,"realRuntimeBytecode":"","realArgs":[],"code":"","runtimeBytecode":"","linkReferences":{},"swarmHash":"","gasEstimates":null,"functionHashes":{"isExpert(address)":"76c535ae"},"filename":"/home/st/Desktop/svet_token/.embark/contracts/interfaces/iExperts.sol","originalFilename":"contracts/interfaces/iExperts.sol","path":"/home/st/Desktop/svet_token/contracts/interfaces/iExperts.sol","type":"file","deploymentAccount":"0x132e2c063960e14eE62EC2dAC6AbA6bA4BB68552"};
const iExperts = new EmbarkJS.Blockchain.Contract(iExpertsConfig);

export default iExperts;
