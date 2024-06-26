// export const MockUSDABI: any = [
//   {
//     'constant': true,
//     'inputs': [{'name': '_owner', type: 'address'}],
//     'name': 'balanceOf',
//     “outputs”: [{“name”: “balance”, “type”: “uint256”}],
//     “type”: “function”
//   },
//   {
//     'constant': false,
//     'inputs': [{'name': '_spender', 'type': 'address'}], 'name': [{'_value', 'type': 'uint256'}],
//     'name': 'approve”,
//     'outputs': [{'name': '', 'type': 'bool'}],
//     'type': 'function'
//   }
// ];
export const PurchaseSubscriptionABI: any = [
  {
    _format: 'hh-sol-artifact-1',
    contractName: 'PurchaseSubscription',
    sourceName: 'contracts/PurchaseSubscriptionMoon.sol',
    abi: [
      {
        inputs: [
          {
            internalType: 'address',
            name: '_stablecoinAddress',
            type: 'address',
          },
        ],
        stateMutability: 'nonpayable',
        type: 'constructor',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'previousOwner',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'newOwner',
            type: 'address',
          },
        ],
        name: 'OwnershipTransferred',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'subscriber',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'modelId',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'subscriptionId',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'ethAmount',
            type: 'uint256',
          },
        ],
        name: 'SubscribedWithEth',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'subscriber',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'modelId',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'subscriptionId',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'priceInUsd',
            type: 'uint256',
          },
        ],
        name: 'SubscribedWithToken',
        type: 'event',
      },
      {
        inputs: [],
        name: 'owner',
        outputs: [
          {
            internalType: 'address',
            name: '',
            type: 'address',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'stablecoin',
        outputs: [
          {
            internalType: 'contract IERC20',
            name: '',
            type: 'address',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'modelId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'subscriptionId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'priceInUsd',
            type: 'uint256',
          },
        ],
        name: 'subscribeWithToken',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: '',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        name: 'subscriptions',
        outputs: [
          {
            internalType: 'uint256',
            name: 'modelId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'subscriptionId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'priceInUsd',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
    ],
    bytecode:
      '0x608060405234801561001057600080fd5b5060405161080a38038061080a8339818101604052810190610032919061011c565b336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555080600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050610149565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006100e9826100be565b9050919050565b6100f9816100de565b811461010457600080fd5b50565b600081519050610116816100f0565b92915050565b600060208284031215610132576101316100b9565b5b600061014084828501610107565b91505092915050565b6106b2806101586000396000f3fe608060405234801561001057600080fd5b506004361061004c5760003560e01c8063623da3d1146100515780638da5cb5b14610083578063d752711c146100a1578063e9cbd822146100bd575b600080fd5b61006b600480360381019061006691906103e6565b6100db565b60405161007a93929190610435565b60405180910390f35b61008b610122565b604051610098919061047b565b60405180910390f35b6100bb60048036038101906100b69190610496565b610146565b005b6100c5610327565b6040516100d29190610548565b60405180910390f35b600260205281600052604060002081815481106100f757600080fd5b9060005260206000209060030201600091509150508060000154908060010154908060020154905083565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166323b872dd3330846040518463ffffffff1660e01b81526004016101a593929190610563565b6020604051808303816000875af11580156101c4573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906101e891906105d2565b610227576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161021e9061065c565b60405180910390fd5b60006040518060600160405280858152602001848152602001838152509050600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081908060018154018082558091505060019003906000526020600020906003020160009091909190915060008201518160000155602082015181600101556040820151816002015550503373ffffffffffffffffffffffffffffffffffffffff167fc3fc8a45891b09e11c4df01d2fcb6b192c94e581cfc1c82ecac604a142daa6ef85858560405161031993929190610435565b60405180910390a250505050565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600061037d82610352565b9050919050565b61038d81610372565b811461039857600080fd5b50565b6000813590506103aa81610384565b92915050565b6000819050919050565b6103c3816103b0565b81146103ce57600080fd5b50565b6000813590506103e0816103ba565b92915050565b600080604083850312156103fd576103fc61034d565b5b600061040b8582860161039b565b925050602061041c858286016103d1565b9150509250929050565b61042f816103b0565b82525050565b600060608201905061044a6000830186610426565b6104576020830185610426565b6104646040830184610426565b949350505050565b61047581610372565b82525050565b6000602082019050610490600083018461046c565b92915050565b6000806000606084860312156104af576104ae61034d565b5b60006104bd868287016103d1565b93505060206104ce868287016103d1565b92505060406104df868287016103d1565b9150509250925092565b6000819050919050565b600061050e61050961050484610352565b6104e9565b610352565b9050919050565b6000610520826104f3565b9050919050565b600061053282610515565b9050919050565b61054281610527565b82525050565b600060208201905061055d6000830184610539565b92915050565b6000606082019050610578600083018661046c565b610585602083018561046c565b6105926040830184610426565b949350505050565b60008115159050919050565b6105af8161059a565b81146105ba57600080fd5b50565b6000815190506105cc816105a6565b92915050565b6000602082840312156105e8576105e761034d565b5b60006105f6848285016105bd565b91505092915050565b600082825260208201905092915050565b7f5472616e73666572206661696c65640000000000000000000000000000000000600082015250565b6000610646600f836105ff565b915061065182610610565b602082019050919050565b6000602082019050818103600083015261067581610639565b905091905056fea2646970667358221220dcb24c7ec923bcc1718bc4abd327466fd55017ebca9e1ec99e4a8a1cd736e9f664736f6c63430008140033',
    deployedBytecode:
      '0x608060405234801561001057600080fd5b506004361061004c5760003560e01c8063623da3d1146100515780638da5cb5b14610083578063d752711c146100a1578063e9cbd822146100bd575b600080fd5b61006b600480360381019061006691906103e6565b6100db565b60405161007a93929190610435565b60405180910390f35b61008b610122565b604051610098919061047b565b60405180910390f35b6100bb60048036038101906100b69190610496565b610146565b005b6100c5610327565b6040516100d29190610548565b60405180910390f35b600260205281600052604060002081815481106100f757600080fd5b9060005260206000209060030201600091509150508060000154908060010154908060020154905083565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166323b872dd3330846040518463ffffffff1660e01b81526004016101a593929190610563565b6020604051808303816000875af11580156101c4573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906101e891906105d2565b610227576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161021e9061065c565b60405180910390fd5b60006040518060600160405280858152602001848152602001838152509050600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081908060018154018082558091505060019003906000526020600020906003020160009091909190915060008201518160000155602082015181600101556040820151816002015550503373ffffffffffffffffffffffffffffffffffffffff167fc3fc8a45891b09e11c4df01d2fcb6b192c94e581cfc1c82ecac604a142daa6ef85858560405161031993929190610435565b60405180910390a250505050565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600061037d82610352565b9050919050565b61038d81610372565b811461039857600080fd5b50565b6000813590506103aa81610384565b92915050565b6000819050919050565b6103c3816103b0565b81146103ce57600080fd5b50565b6000813590506103e0816103ba565b92915050565b600080604083850312156103fd576103fc61034d565b5b600061040b8582860161039b565b925050602061041c858286016103d1565b9150509250929050565b61042f816103b0565b82525050565b600060608201905061044a6000830186610426565b6104576020830185610426565b6104646040830184610426565b949350505050565b61047581610372565b82525050565b6000602082019050610490600083018461046c565b92915050565b6000806000606084860312156104af576104ae61034d565b5b60006104bd868287016103d1565b93505060206104ce868287016103d1565b92505060406104df868287016103d1565b9150509250925092565b6000819050919050565b600061050e61050961050484610352565b6104e9565b610352565b9050919050565b6000610520826104f3565b9050919050565b600061053282610515565b9050919050565b61054281610527565b82525050565b600060208201905061055d6000830184610539565b92915050565b6000606082019050610578600083018661046c565b610585602083018561046c565b6105926040830184610426565b949350505050565b60008115159050919050565b6105af8161059a565b81146105ba57600080fd5b50565b6000815190506105cc816105a6565b92915050565b6000602082840312156105e8576105e761034d565b5b60006105f6848285016105bd565b91505092915050565b600082825260208201905092915050565b7f5472616e73666572206661696c65640000000000000000000000000000000000600082015250565b6000610646600f836105ff565b915061065182610610565b602082019050919050565b6000602082019050818103600083015261067581610639565b905091905056fea2646970667358221220dcb24c7ec923bcc1718bc4abd327466fd55017ebca9e1ec99e4a8a1cd736e9f664736f6c63430008140033',
    linkReferences: {},
    deployedLinkReferences: {},
  },
];
export const BatchABI: any = [
  {
    _format: 'hh-sol-artifact-1',
    contractName: 'Batch',
    sourceName: 'contracts/utils/Batch.sol',
    abi: [
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: 'uint256',
            name: 'index',
            type: 'uint256',
          },
        ],
        name: 'SubcallFailed',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: 'uint256',
            name: 'index',
            type: 'uint256',
          },
        ],
        name: 'SubcallSucceeded',
        type: 'event',
      },
      {
        inputs: [
          {
            internalType: 'address[]',
            name: 'to',
            type: 'address[]',
          },
          {
            internalType: 'uint256[]',
            name: 'value',
            type: 'uint256[]',
          },
          {
            internalType: 'bytes[]',
            name: 'callData',
            type: 'bytes[]',
          },
          {
            internalType: 'uint64[]',
            name: 'gasLimit',
            type: 'uint64[]',
          },
        ],
        name: 'batchAll',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address[]',
            name: 'to',
            type: 'address[]',
          },
          {
            internalType: 'uint256[]',
            name: 'value',
            type: 'uint256[]',
          },
          {
            internalType: 'bytes[]',
            name: 'callData',
            type: 'bytes[]',
          },
          {
            internalType: 'uint64[]',
            name: 'gasLimit',
            type: 'uint64[]',
          },
        ],
        name: 'batchSome',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address[]',
            name: 'to',
            type: 'address[]',
          },
          {
            internalType: 'uint256[]',
            name: 'value',
            type: 'uint256[]',
          },
          {
            internalType: 'bytes[]',
            name: 'callData',
            type: 'bytes[]',
          },
          {
            internalType: 'uint64[]',
            name: 'gasLimit',
            type: 'uint64[]',
          },
        ],
        name: 'batchSomeUntilFailure',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
    ],
    bytecode: '0x',
    deployedBytecode: '0x',
    linkReferences: {},
    deployedLinkReferences: {},
  },
];
