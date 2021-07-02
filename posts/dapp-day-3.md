---
title: 'Learning DApp development - Day 3'
date: '2021-07-02'
---

Welcome to Day 3 of this journey.

Today I read the third and fourth chapter of the book: [Mastering Ethereum](https://github.com/ethereumbook/ethereumbook) - Ethereum clients, and Cryptography.

In the third chapter, I learned about Ethereum networks and different types of Ethereum clients.
Ethereum networks are basically blockchain networks that conform and follow the specifications in Ethereum Yellow paper and may or may not conform to the proposals put forth by Ethereum Improvement Proposals (EIP). Some examples of Ethereum networks are: Ethereum, Ethereum Classic, Ella, Expanse and others.

Ethereum client is basically a program that acts as a node in the network and communicates with other nodes. There are many types of Ethereum clients:
 - Full node: Stores all the transaction data of the blockchain, and "mines" or verifies and validates the blocks of transactions. It also serves the requests for network related data and state. For example: Geth - implemented using Go lang, Parity - implemented using Rust, and others.
 - Remote client - Remote clients do not store blockchain data like full nodes but is like a wallet which is useful to interact with the smart contracts, and other externally owned accounts (EOAs). For example: Metamask, Emerald wallet, MyEtherWallet, and others.
 - Light client - Light clients do not store full blockchain data like full nodes but they are useful for validating the block headers, handling requests for account balances, information on transactions and verifies the authenticity of data using Merkle proofs.


In the fourth chapter, I learned about how cryptography plays a role in the blockchain. I learned the basics about elliptical curve cryptography and how it used to generate private and public keys. A private key is generated from a truly random source - such as one waivering the mouse cursor randomly on their screen, cosmic radiation noise, and others. The private key is a non-zero random number up to a very large number slightly less than 2<sup>256</sup>. The public key K is calculated as K = k * G where k is the private key and G is a generator point on a elliptical curve. This multiplication is not the regular arithmetic multiplication that we use for multiplying normal numbers. In elliptical arithmetic, this multiplication ensures that the public key K that is computed, is also another point in the elliptical curve. The generator point that Ethereum uses to generate keys for all its users stays the same so that it is ensured that whenever a unique private key is provided, the same public key is generated, at all the times. Then the public Ethereum address that you see in your remote client is computed by passing the public key K into a hash function Keccack256 which is inbuilt in Ethereum and taking the last 20 bytes of that computed hash. It is interesting to notice that the keys pointing to an account in the Ethereum are always in pairs because a private key denotes the ownership and authority over an account while the public key which is derived from that private key, is an identifier for the public to denote that particular Ethereum account.

Note: Keep your private keys private to your self because the one who possesses the private key of an account has the authority over its ethers.

New concept learned:
 - Merkle proofs, and elliptical curve cryptography. They are one of the most interesting technical concepts I've read about till date.

If you're reading this, thank you.

Dhrumil