import EmbarkJS from '../embarkjs';

const KybertstConfig = {"abiDefinition":[{"inputs":[{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"symbol","type":"string"},{"internalType":"uint8","name":"decimals","type":"uint8"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"}],"deployedAddress":"0xB6C08C15e64B0DCC5bceaBFFE6C88EAc2D70b55C","className":"Kybertst","args":["KNC","QUB",18],"instanceOf":"TokTst","gas":"auto","silent":false,"track":true,"deploy":true,"realRuntimeBytecode":"608060405234801561001057600080fd5b50600436106100a95760003560e01c8063395093511161007157806339509351146101d957806370a082311461020557806395d89b411461022b578063a457c2d714610233578063a9059cbb1461025f578063dd62ed3e1461028b576100a9565b806306fdde03146100ae578063095ea7b31461012b57806318160ddd1461016b57806323b872dd14610185578063313ce567146101bb575b600080fd5b6100b66102b9565b6040805160208082528351818301528351919283929083019185019080838360005b838110156100f05781810151838201526020016100d8565b50505050905090810190601f16801561011d5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6101576004803603604081101561014157600080fd5b506001600160a01b03813516906020013561034f565b604080519115158252519081900360200190f35b61017361036c565b60408051918252519081900360200190f35b6101576004803603606081101561019b57600080fd5b506001600160a01b03813581169160208101359091169060400135610372565b6101c36103ff565b6040805160ff9092168252519081900360200190f35b610157600480360360408110156101ef57600080fd5b506001600160a01b038135169060200135610408565b6101736004803603602081101561021b57600080fd5b50356001600160a01b031661045c565b6100b6610477565b6101576004803603604081101561024957600080fd5b506001600160a01b0381351690602001356104d8565b6101576004803603604081101561027557600080fd5b506001600160a01b038135169060200135610546565b610173600480360360408110156102a157600080fd5b506001600160a01b038135811691602001351661055a565b60038054604080516020601f60026000196101006001881615020190951694909404938401819004810282018101909252828152606093909290918301828280156103455780601f1061031a57610100808354040283529160200191610345565b820191906000526020600020905b81548152906001019060200180831161032857829003601f168201915b5050505050905090565b600061036361035c610585565b8484610589565b50600192915050565b60025490565b600061037f848484610675565b6103f58461038b610585565b6103f085604051806060016040528060288152602001610945602891396001600160a01b038a166000908152600160205260408120906103c9610585565b6001600160a01b03168152602081019190915260400160002054919063ffffffff6107dc16565b610589565b5060019392505050565b60055460ff1690565b6000610363610415610585565b846103f08560016000610426610585565b6001600160a01b03908116825260208083019390935260409182016000908120918c16815292529020549063ffffffff61087316565b6001600160a01b031660009081526020819052604090205490565b60048054604080516020601f60026000196101006001881615020190951694909404938401819004810282018101909252828152606093909290918301828280156103455780601f1061031a57610100808354040283529160200191610345565b60006103636104e5610585565b846103f0856040518060600160405280602581526020016109b6602591396001600061050f610585565b6001600160a01b03908116825260208083019390935260409182016000908120918d1681529252902054919063ffffffff6107dc16565b6000610363610553610585565b8484610675565b6001600160a01b03918216600090815260016020908152604080832093909416825291909152205490565b3390565b6001600160a01b0383166105ce5760405162461bcd60e51b81526004018080602001828103825260248152602001806109926024913960400191505060405180910390fd5b6001600160a01b0382166106135760405162461bcd60e51b81526004018080602001828103825260228152602001806108fd6022913960400191505060405180910390fd5b6001600160a01b03808416600081815260016020908152604080832094871680845294825291829020859055815185815291517f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b9259281900390910190a3505050565b6001600160a01b0383166106ba5760405162461bcd60e51b815260040180806020018281038252602581526020018061096d6025913960400191505060405180910390fd5b6001600160a01b0382166106ff5760405162461bcd60e51b81526004018080602001828103825260238152602001806108da6023913960400191505060405180910390fd5b61070a8383836108d4565b61074d8160405180606001604052806026815260200161091f602691396001600160a01b038616600090815260208190526040902054919063ffffffff6107dc16565b6001600160a01b038085166000908152602081905260408082209390935590841681522054610782908263ffffffff61087316565b6001600160a01b038084166000818152602081815260409182902094909455805185815290519193928716927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef92918290030190a3505050565b6000818484111561086b5760405162461bcd60e51b81526004018080602001828103825283818151815260200191508051906020019080838360005b83811015610830578181015183820152602001610818565b50505050905090810190601f16801561085d5780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b505050900390565b6000828201838110156108cd576040805162461bcd60e51b815260206004820152601b60248201527f536166654d6174683a206164646974696f6e206f766572666c6f770000000000604482015290519081900360640190fd5b9392505050565b50505056fe45524332303a207472616e7366657220746f20746865207a65726f206164647265737345524332303a20617070726f766520746f20746865207a65726f206164647265737345524332303a207472616e7366657220616d6f756e7420657863656564732062616c616e636545524332303a207472616e7366657220616d6f756e74206578636565647320616c6c6f77616e636545524332303a207472616e736665722066726f6d20746865207a65726f206164647265737345524332303a20617070726f76652066726f6d20746865207a65726f206164647265737345524332303a2064656372656173656420616c6c6f77616e63652062656c6f77207a65726fa264697066735822122077e9e59024c5ab5fdf","realArgs":[],"fromIndex":0,"path":"/home/st/Desktop/svet_token/contracts/TokTst.sol","originalFilename":"contracts/TokTst.sol","filename":"/home/st/Desktop/svet_token/.embark/contracts/TokTst.sol","code":"60806040523480156200001157600080fd5b5060405162000e8638038062000e86833981810160405260608110156200003757600080fd5b81019080805160405193929190846401000000008211156200005857600080fd5b9083019060208201858111156200006e57600080fd5b82516401000000008111828201881017156200008957600080fd5b82525081516020918201929091019080838360005b83811015620000b85781810151838201526020016200009e565b50505050905090810190601f168015620000e65780820380516001836020036101000a031916815260200191505b50604052602001805160405193929190846401000000008211156200010a57600080fd5b9083019060208201858111156200012057600080fd5b82516401000000008111828201881017156200013b57600080fd5b82525081516020918201929091019080838360005b838110156200016a57818101518382015260200162000150565b50505050905090810190601f168015620001985780820380516001836020036101000a031916815260200191505b5060405260209081015185519093508592508491620001bd91600391850190620003c1565b508051620001d3906004906020840190620003c1565b50506005805460ff19166012179055508251620001f8906006906020860190620003c1565b5081516200020e906007906020850190620003c1565b5060088054601260ff1990911617908190556200023990339060ff16600a0a6301406f400262000242565b50505062000466565b6001600160a01b0382166200029e576040805162461bcd60e51b815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f206164647265737300604482015290519081900360640190fd5b620002b5600083836001600160e01b036200035a16565b620002d1816002546200035f60201b620008731790919060201c565b6002556001600160a01b0382166000908152602081815260409091205462000304918390620008736200035f821b17901c565b6001600160a01b0383166000818152602081815260408083209490945583518581529351929391927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9281900390910190a35050565b505050565b600082820183811015620003ba576040805162461bcd60e51b815260206004820152601b60248201527f536166654d6174683a206164646974696f6e206f766572666c6f770000000000604482015290519081900360640190fd5b9392505050565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106200040457805160ff191683800117855562000434565b8280016001018555821562000434579182015b828111156200043457825182559160200191906001019062000417565b506200044292915062000446565b5090565b6200046391905b808211156200044257600081556001016200044d565b90565b610a1080620004766000396000f3fe608060405234801561001057600080fd5b50600436106100a95760003560e01c8063395093511161007157806339509351146101d957806370a082311461020557806395d89b411461022b578063a457c2d714610233578063a9059cbb1461025f578063dd62ed3e1461028b576100a9565b806306fdde03146100ae578063095ea7b31461012b57806318160ddd1461016b57806323b872dd14610185578063313ce567146101bb575b600080fd5b6100b66102b9565b6040805160208082528351818301528351919283929083019185019080838360005b838110156100f05781810151838201526020016100d8565b50505050905090810190601f16801561011d5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6101576004803603604081101561014157600080fd5b506001600160a01b03813516906020013561034f565b604080519115158252519081900360200190f35b61017361036c565b60408051918252519081900360200190f35b6101576004803603606081101561019b57600080fd5b506001600160a01b03813581169160208101359091169060400135610372565b6101c36103ff565b6040805160ff9092168252519081900360200190f35b610157600480360360408110156101ef57600080fd5b506001600160a01b038135169060200135610408565b6101736004803603602081101561021b57600080fd5b50356001600160a01b031661045c565b6100b6610477565b6101576004803603604081101561024957600080fd5b506001600160a01b0381351690602001356104d8565b6101576004803603604081101561027557600080fd5b506001600160a01b038135169060200135610546565b610173600480360360408110156102a157600080fd5b506001600160a01b038135811691602001351661055a565b60038054604080516020601f60026000196101006001881615020190951694909404938401819004810282018101909252828152606093909290918301828280156103455780601f1061031a57610100808354040283529160200191610345565b820191906000526020600020905b81548152906001019060200180831161032857829003601f168201915b5050505050905090565b600061036361035c610585565b8484610589565b50600192915050565b60025490565b600061037f848484610675565b6103f58461038b610585565b6103f085604051806060016040528060288152602001610945602891396001600160a01b038a166000908152600160205260408120906103c9610585565b6001600160a01b03168152602081019190915260400160002054919063ffffffff6107dc16565b610589565b5060019392505050565b60055460ff1690565b6000610363610415610585565b846103f08560016000610426610585565b6001600160a01b03908116825260208083019390935260409182016000908120918c16815292529020549063ffffffff61087316565b6001600160a01b031660009081526020819052604090205490565b60048054604080516020601f60026000196101006001881615020190951694909404938401819004810282018101909252828152606093909290918301828280156103455780601f1061031a57610100808354040283529160200191610345565b60006103636104e5610585565b846103f0856040518060600160405280602581526020016109b6602591396001600061050f610585565b6001600160a01b03908116825260208083019390935260409182016000908120918d1681529252902054919063ffffffff6107dc16565b6000610363610553610585565b8484610675565b6001600160a01b03918216600090815260016020908152604080832093909416825291909152205490565b3390565b6001600160a01b0383166105ce5760405162461bcd60e51b81526004018080602001828103825260248152602001806109926024913960400191505060405180910390fd5b6001600160a01b0382166106135760405162461bcd60e51b81526004018080602001828103825260228152602001806108fd6022913960400191505060405180910390fd5b6001600160a01b03808416600081815260016020908152604080832094871680845294825291829020859055815185815291517f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b9259281900390910190a3505050565b6001600160a01b0383166106ba5760405162461bcd60e51b815260040180806020018281038252602581526020018061096d6025913960400191505060405180910390fd5b6001600160a01b0382166106ff5760405162461bcd60e51b81526004018080602001828103825260238152602001806108da6023913960400191505060405180910390fd5b61070a8383836108d4565b61074d8160405180606001604052806026815260200161091f602691396001600160a01b038616600090815260208190526040902054919063ffffffff6107dc16565b6001600160a01b038085166000908152602081905260408082209390935590841681522054610782908263ffffffff61087316565b6001600160a01b038084166000818152602081815260409182902094909455805185815290519193928716927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef92918290030190a3505050565b6000818484111561086b5760405162461bcd60e51b81526004018080602001828103825283818151815260200191508051906020019080838360005b83811015610830578181015183820152602001610818565b50505050905090810190601f16801561085d5780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b505050900390565b6000828201838110156108cd576040805162461bcd60e51b815260206004820152601b60248201527f536166654d6174683a206164646974696f6e206f766572666c6f770000000000604482015290519081900360640190fd5b9392505050565b50505056fe45524332303a207472616e7366657220746f20746865207a65726f206164647265737345524332303a20617070726f766520746f20746865207a65726f206164647265737345524332303a207472616e7366657220616d6f756e7420657863656564732062616c616e636545524332303a207472616e7366657220616d6f756e74206578636565647320616c6c6f77616e636545524332303a207472616e736665722066726f6d20746865207a65726f206164647265737345524332303a20617070726f76652066726f6d20746865207a65726f206164647265737345524332303a2064656372656173656420616c6c6f77616e63652062656c6f77207a65726fa264697066735822122077e9e59024c5ab5fdf925e9430455bd0e0efd154118c55458346f3f74dc22c8264736f6c63430006060033","runtimeBytecode":"608060405234801561001057600080fd5b50600436106100a95760003560e01c8063395093511161007157806339509351146101d957806370a082311461020557806395d89b411461022b578063a457c2d714610233578063a9059cbb1461025f578063dd62ed3e1461028b576100a9565b806306fdde03146100ae578063095ea7b31461012b57806318160ddd1461016b57806323b872dd14610185578063313ce567146101bb575b600080fd5b6100b66102b9565b6040805160208082528351818301528351919283929083019185019080838360005b838110156100f05781810151838201526020016100d8565b50505050905090810190601f16801561011d5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6101576004803603604081101561014157600080fd5b506001600160a01b03813516906020013561034f565b604080519115158252519081900360200190f35b61017361036c565b60408051918252519081900360200190f35b6101576004803603606081101561019b57600080fd5b506001600160a01b03813581169160208101359091169060400135610372565b6101c36103ff565b6040805160ff9092168252519081900360200190f35b610157600480360360408110156101ef57600080fd5b506001600160a01b038135169060200135610408565b6101736004803603602081101561021b57600080fd5b50356001600160a01b031661045c565b6100b6610477565b6101576004803603604081101561024957600080fd5b506001600160a01b0381351690602001356104d8565b6101576004803603604081101561027557600080fd5b506001600160a01b038135169060200135610546565b610173600480360360408110156102a157600080fd5b506001600160a01b038135811691602001351661055a565b60038054604080516020601f60026000196101006001881615020190951694909404938401819004810282018101909252828152606093909290918301828280156103455780601f1061031a57610100808354040283529160200191610345565b820191906000526020600020905b81548152906001019060200180831161032857829003601f168201915b5050505050905090565b600061036361035c610585565b8484610589565b50600192915050565b60025490565b600061037f848484610675565b6103f58461038b610585565b6103f085604051806060016040528060288152602001610945602891396001600160a01b038a166000908152600160205260408120906103c9610585565b6001600160a01b03168152602081019190915260400160002054919063ffffffff6107dc16565b610589565b5060019392505050565b60055460ff1690565b6000610363610415610585565b846103f08560016000610426610585565b6001600160a01b03908116825260208083019390935260409182016000908120918c16815292529020549063ffffffff61087316565b6001600160a01b031660009081526020819052604090205490565b60048054604080516020601f60026000196101006001881615020190951694909404938401819004810282018101909252828152606093909290918301828280156103455780601f1061031a57610100808354040283529160200191610345565b60006103636104e5610585565b846103f0856040518060600160405280602581526020016109b6602591396001600061050f610585565b6001600160a01b03908116825260208083019390935260409182016000908120918d1681529252902054919063ffffffff6107dc16565b6000610363610553610585565b8484610675565b6001600160a01b03918216600090815260016020908152604080832093909416825291909152205490565b3390565b6001600160a01b0383166105ce5760405162461bcd60e51b81526004018080602001828103825260248152602001806109926024913960400191505060405180910390fd5b6001600160a01b0382166106135760405162461bcd60e51b81526004018080602001828103825260228152602001806108fd6022913960400191505060405180910390fd5b6001600160a01b03808416600081815260016020908152604080832094871680845294825291829020859055815185815291517f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b9259281900390910190a3505050565b6001600160a01b0383166106ba5760405162461bcd60e51b815260040180806020018281038252602581526020018061096d6025913960400191505060405180910390fd5b6001600160a01b0382166106ff5760405162461bcd60e51b81526004018080602001828103825260238152602001806108da6023913960400191505060405180910390fd5b61070a8383836108d4565b61074d8160405180606001604052806026815260200161091f602691396001600160a01b038616600090815260208190526040902054919063ffffffff6107dc16565b6001600160a01b038085166000908152602081905260408082209390935590841681522054610782908263ffffffff61087316565b6001600160a01b038084166000818152602081815260409182902094909455805185815290519193928716927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef92918290030190a3505050565b6000818484111561086b5760405162461bcd60e51b81526004018080602001828103825283818151815260200191508051906020019080838360005b83811015610830578181015183820152602001610818565b50505050905090810190601f16801561085d5780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b505050900390565b6000828201838110156108cd576040805162461bcd60e51b815260206004820152601b60248201527f536166654d6174683a206164646974696f6e206f766572666c6f770000000000604482015290519081900360640190fd5b9392505050565b50505056fe45524332303a207472616e7366657220746f20746865207a65726f206164647265737345524332303a20617070726f766520746f20746865207a65726f206164647265737345524332303a207472616e7366657220616d6f756e7420657863656564732062616c616e636545524332303a207472616e7366657220616d6f756e74206578636565647320616c6c6f77616e636545524332303a207472616e736665722066726f6d20746865207a65726f206164647265737345524332303a20617070726f76652066726f6d20746865207a65726f206164647265737345524332303a2064656372656173656420616c6c6f77616e63652062656c6f77207a65726fa264697066735822122077e9e59024c5ab5fdf925e9430455bd0e0efd154118c55458346f3f74dc22c8264736f6c63430006060033","gasEstimates":{"creation":{"codeDepositCost":"515200","executionCost":"infinite","totalCost":"infinite"},"external":{"allowance(address,address)":"1360","approve(address,uint256)":"infinite","balanceOf(address)":"1167","decimals()":"1102","decreaseAllowance(address,uint256)":"infinite","increaseAllowance(address,uint256)":"infinite","name()":"infinite","symbol()":"infinite","totalSupply()":"1043","transfer(address,uint256)":"infinite","transferFrom(address,address,uint256)":"infinite"}},"functionHashes":{"allowance(address,address)":"dd62ed3e","approve(address,uint256)":"095ea7b3","balanceOf(address)":"70a08231","decimals()":"313ce567","decreaseAllowance(address,uint256)":"a457c2d7","increaseAllowance(address,uint256)":"39509351","name()":"06fdde03","symbol()":"95d89b41","totalSupply()":"18160ddd","transfer(address,uint256)":"a9059cbb","transferFrom(address,address,uint256)":"23b872dd"},"linkReferences":{},"type":"instance","deploymentAccount":"0x132e2c063960e14eE62EC2dAC6AbA6bA4BB68552"};
const Kybertst = new EmbarkJS.Blockchain.Contract(KybertstConfig);

export default Kybertst;
