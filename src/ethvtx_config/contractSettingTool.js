const contractObject = (net_id, jsonObject) => {
        return {
          address:jsonObject[net_id.toString()].address,
          abi:jsonObject.abi,
          bytecode:jsonObject.deployedBytecode,
          name:jsonObject.contractName
        }
} 

export default contractObject;