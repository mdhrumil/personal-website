---
title: 'Learning DApp development - Day 3'
date: '2021-07-02'
---

Welcome to Day 3 of this journey.

Today I read the third, fourth, fifth, and sixth chapters of the book: [Mastering Ethereum](https://github.com/ethereumbook/ethereumbook) - Ethereum clients, Cryptography, Wallets, and Transactions.

In the third chapter, I learned about Ethereum networks and different types of Ethereum clients.
Ethereum networks are basically blockchain networks that conform and follow the specifications in Ethereum Yellow paper and may or may not conform to the proposals put forth by Ethereum Improvement Proposals (EIP). Some examples of Ethereum networks are: Ethereum, Ethereum Classic, Ella, Expanse and others.

Ethereum client is basically a program that acts as a node in the network and communicates with other nodes. There are many types of Ethereum clients:
 - Full node: Stores all the transaction data of the blockchain, and "mines" or verifies and validates the blocks of transactions. It also serves the requests for network related data and state. For example: Geth - implemented using Go lang, Parity - implemented using Rust, and others.
 - Remote client - Remote clients do not store blockchain data like full nodes but is like a wallet which is useful to interact with the smart contracts, and other externally owned accounts (EOAs). For example: Metamask, Emerald wallet, MyEtherWallet, and others.
 - Light client - Light clients do not store full blockchain data like full nodes but they are useful for validating the block headers, handling requests for account balances, information on transactions and verifies the authenticity of data using Merkle proofs.


In the fourth chapter, I learned about how cryptography plays a role in the blockchain. I learned the basics about elliptical curve cryptography and how it used to generate private and public keys. A private key is generated from a truly random source - such as one waivering the mouse cursor randomly on their screen, cosmic radiation noise, and others. The private key is a non-zero random number up to a very large number slightly less than 2<sup>256</sup>. The public key K is calculated as K = k * G where k is the private key and G is a generator point on a elliptical curve. This multiplication is not the regular arithmetic multiplication that we use for multiplying normal numbers. In elliptical arithmetic, this multiplication ensures that the public key K that is computed, is also another point in the elliptical curve. The generator point that Ethereum uses to generate keys for all its users stays the same so that it is ensured that whenever a unique private key is provided, the same public key is generated, at all the times. Then the public Ethereum address that you see in your remote client is computed by passing the public key K into a hash function Keccack256 which is inbuilt in Ethereum and taking the last 20 bytes of that computed hash. It is interesting to notice that the keys pointing to an account in the Ethereum are always in pairs because a private key denotes the ownership and authority over an account while the public key which is derived from that private key, is an identifier for the public to denote that particular Ethereum account.

Note: Keep your private keys private to your self because the one who possesses the private key of an account has the authority over its ethers.

In the fifth chapter, I learned about the role of wallets, how they're created and different types of wallets. There are two primary types of wallets: non-deterministic and deterministic. Non-deterministic wallets are those which creates all the multiple key pairs randomly, independently of each other and can keep on generating private keys randomly as needed. One positive thing about non-deterministic wallets is that there is no defined relationship between the keys, but that also comes with the cost of complex management as more keys are created and especially if used for multiple different token transactions. Deterministic wallets such as Metamask, Coinbase wallet uses a seed mnemonic phrase that is responsible for creating a set of key pairs. Usually you would want to have multiple key pairs as having only one is not only unsafe but can also make it easier to track your payments. The seed mnemonic phrase will derive the same key pairs every time. The phrase is usually a combination of 12-24 English words. The mnemonic phrase is easier to remember than remembering the long hexa-decimal seed. 

In the sixth chapter, I learned about transactions. Transactions are what causes the Ethereum network's change of state. It can either be transfer of tokens or ethers, or it can be calls to functions of smart contracts on the network. It is important to have a defined nonce value since it will: 
 - Help to keep track of the order of transactions so that each of them are executed sequentially.
 - Avoids a transaction to be duplicated in the cases of attack.

Other parameters that a transaction should have are "value" and "data". Both the parameters are optional. Value defines the amount of ethers to be transferred in wei (1 ether = 10<sup>18</sup> wei), and Data defines the message to be called in case if the recipient of the transaction is an EOA or may indicate the function call in case if the recipient of the transaction is a smart contract. 

Transactions that are addressed to 0x000..00 address are simply for deploying the smart contracts to the chain.

Ethers sent to the public addresses that do not exist yet are called to be "burnt" since those ethers are now forever lost (There's no way to access the public key since you'd want a private key from which that public key is derived and the chances of one coincidently getting a public key with already burnt ethers is near to 0%).

New concept learned:
 - Merkle proofs, and elliptical curve cryptography. They are one of the most interesting technical concepts I've read about till date.
 - Importance of Nonce
 - How mnemonic phrases are created.

If you're reading this, thank you.

Dhrumil