# Black List Aspect

This aspect allows you to enable a blacklist for a smart contract. Users can add or remove accounts from the blacklist. If a blacklisted address attempts to access the smart contract, the aspect will block the contract’s execution.

## Files

```bash
.
├── README.md
├── asconfig.json
├── aspect                 <-- Your aspect code resides here
│   └── index.ts
├── contracts              <-- Place your smart contracts here
├── scripts                <-- Utility scripts, including deploying, binding, etc.
│   ├── aspect-deploy.cjs
│   ├── bind.cjs
│   ├── contract-call.cjs
│   └── contract-deploy.cjs
...
```

## How to Run

Create an address

```bash
$ npm run account:create
address:  0x6B70B03B608a19Bf1817848A4C8FFF844f0Be0fB
```

This script creates a private key file named `privateKey.txt` in the project directory. You can also input your own private key if you prefer. Note your address, then request test tokens from the Artela Discord faucet.

### Compile and Deploy Contracts

```bash
$ npm run contract:build

$ npm run contract:deploy -- --bytecode ./build/contract/Counter.bin --abi ./build/contract/Counter.abi

> contract:deploy
> node scripts/contract-deploy.cjs --bytecode ./build/contract/Counter.bin --abi ./build/contract/Counter.abi

from address:  0xdc863fd839e6a55E804Ae45ffd7A7606aDD7F1e2
(node:82367) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created)
deploy contract tx hash: 0xdc4274875ba014f9009185ec9eb20e4565edbcf3a73be270869d7ae16c4e9cb4
{
  blockHash: '0x23df4a37f4565a85a72d591bc7c4356e0880f3c5e2880a88ce3e6276682b3b64',
  blockNumber: 10587877,
  contractAddress: '0x01D3b3aa301dE819184Dd5b4ec07a20FaBf26d02',
  cumulativeGasUsed: 3500000,
  from: '0xdc863fd839e6a55e804ae45ffd7a7606add7f1e2',
  gasUsed: 7000001,
  logs: [],
  logsBloom: '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
  status: true,
  to: null,
  transactionHash: '0xdc4274875ba014f9009185ec9eb20e4565edbcf3a73be270869d7ae16c4e9cb4',
  transactionIndex: 0,
  type: '0x0'
}
contract address:  0x01D3b3aa301dE819184Dd5b4ec07a20FaBf26d02
--contractAccount 0xdc863fd839e6a55E804Ae45ffd7A7606aDD7F1e2 --contractAddress 0x01D3b3aa301dE819184Dd5b4ec07a20FaBf26d02

```

Remember the address of the deployed contract, as it will be needed for binding later.

### Compile Aspect

```bash
$ npm run aspect:build
```

After building, run the deployment script.

```bash
$ npm run aspect:deploy -- --properties '[{"key":"owner","value":"0xdc863fd839e6a55e804ae45ffd7a7606add7f1e2"}]' --joinPoints PreContractCall 

from address:  0xdc863fd839e6a55E804Ae45ffd7A7606aDD7F1e2
sending signed transaction...
{
  blockHash: '0x2fce10b2a16c6c06b7a17302c328c24be1d0cbe0d570f9407a4db8af3e13f812',
  blockNumber: 10587869,
  contractAddress: null,
  cumulativeGasUsed: 21000,
  from: '0xdc863fd839e6a55e804ae45ffd7a7606add7f1e2',
  gasUsed: 9000001,
  logs: [],
  logsBloom: '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
  status: true,
  to: '0x0000000000000000000000000000000000a27e14',
  transactionHash: '0xcaebf0c142ff67e034728afda3c7bd625088ec09bf48b157c62ddf5328270905',
  transactionIndex: 1,
  type: '0x0',
  aspectAddress: '0x8f80C7a29eC332F878fA13d2396ED6f7189ef875'
}
ret:  {
  blockHash: '0x2fce10b2a16c6c06b7a17302c328c24be1d0cbe0d570f9407a4db8af3e13f812',
  blockNumber: 10587869,
  contractAddress: null,
  cumulativeGasUsed: 21000,
  from: '0xdc863fd839e6a55e804ae45ffd7a7606add7f1e2',
  gasUsed: 9000001,
  logs: [],
  logsBloom: '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
  status: true,
  to: '0x0000000000000000000000000000000000a27e14',
  transactionHash: '0xcaebf0c142ff67e034728afda3c7bd625088ec09bf48b157c62ddf5328270905',
  transactionIndex: 1,
  type: '0x0',
  aspectAddress: '0x8f80C7a29eC332F878fA13d2396ED6f7189ef875'
}
== deploy aspectID == 0x8f80C7a29eC332F878fA13d2396ED6f7189ef875
```

The parameters are as follows:

- owner: Your account address to ensure add/remove blacklist operations succeed.
- joinPoints: Must be specified for binding with the aspect.

Remember the final aspectID for future binding.


### Binding

Run the `bind.cjs` script and input the previously deployed contract address (or your own contract address) and the aspect id.

```bash
$ npm run contract:bind -- --contract 0x01D3b3aa301dE819184Dd5b4ec07a20FaBf26d02 --aspectId 0x8f80C7a29eC332F878fA13d2396ED6f7189ef875 --abi ./build/contract/Counter.abi

sending signed transaction...
{
  blockHash: '0x1c210bb3c50d2574a49626a514a607b34ed0c13660e330d35109e246fa60bada',
  blockNumber: 10587894,
  contractAddress: null,
  cumulativeGasUsed: 0,
  from: '0xdc863fd839e6a55e804ae45ffd7a7606add7f1e2',
  gasUsed: 9000001,
  logs: [],
  logsBloom: '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
  status: true,
  to: '0x0000000000000000000000000000000000a27e14',
  transactionHash: '0x1622ea134aca41a66f9089965416e5b102eb2f78dea85d4543f75833b858917a',
  transactionIndex: 0,
  type: '0x0'
}
== aspect bind success ==
```

Then, we can execute the script to query the Aspect bound to the contract and check if the binding was successful.

```bash
$ node scripts/get-bound-aspect.cjs --contract <CONTRAT_ADDRESS>
bound aspects : 0x8f80C7a29eC332F878fA13d2396ED6f7189ef875,1,1
```

If the output displays the aforementioned `aspectID`, it indicates that the binding was successful.

### Add / Remove Black List

The first digit after 0x in `--callData` decides whether it's an add or remove. 0 stands for remove, 1 stands for add.

```bash
npm run operation:send -- --aspectId 0x8f80C7a29eC332F878fA13d2396ED6f7189ef875 --callData 0x0dc863fd839e6a55e804ae45ffd7a7606add7f1e2

> operation:send
> node scripts/operation.cjs --isCall false --aspectId 0x8f80C7a29eC332F878fA13d2396ED6f7189ef875 --callData 0x0dc863fd839e6a55e804ae45ffd7a7606add7f1e2

(node:99615) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created)
{
  blockHash: '0x0761a3d549a448dc4fdecce4c86887c32779d5c2412d830f8f7e170aec4d1468',
  blockNumber: 10588795,
  contractAddress: null,
  cumulativeGasUsed: 326612,
  from: '0xdc863fd839e6a55e804ae45ffd7a7606add7f1e2',
  gasUsed: 900000,
  logs: [],
  logsBloom: '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
  status: true,
  to: '0x0000000000000000000000000000000000a27e14',
  transactionHash: '0x0e24d901e51c58186446399da1e2dca68e16e802c350ac3ab917d28dc54fc299',
  transactionIndex: 3,
  type: '0x0'
}
```

### Call Contract

Use this command to call the contract. If the address is not blacklisted, the transaction will go through; otherwise, it will fail.

```bash
npm run contract:send -- --contract 0x01D3b3aa301dE819184Dd5b4ec07a20FaBf26d02 --abi ./build/contract/Counter.abi --method increase

> contract:send
> node scripts/contract-send.cjs --contract 0x01D3b3aa301dE819184Dd5b4ec07a20FaBf26d02 --abi ./build/contract/Counter.abi --method increase

(node:169) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created)
from address:  0xdc863fd839e6a55E804Ae45ffd7A7606aDD7F1e2
call contract tx hash: 0xd22f1ecd48e06f6b64de32241a7e3f71ee2f6c2b12b2d58f985828cc4fe0ee7f
{
  blockHash: '0x348d63de6c3c64214b31c57d2c64bb7facd3b606f381a6c28dca44d259918ae7',
  blockNumber: 10588809,
  contractAddress: null,
  cumulativeGasUsed: 2000000,
  from: '0xdc863fd839e6a55e804ae45ffd7a7606add7f1e2',
  gasUsed: 4000001,
  logs: [],
  logsBloom: '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
  status: true,
  to: '0x01d3b3aa301de819184dd5b4ec07a20fabf26d02',
  transactionHash: '0xd22f1ecd48e06f6b64de32241a7e3f71ee2f6c2b12b2d58f985828cc4fe0ee7f',
  transactionIndex: 0,
  type: '0x0'
}
```




