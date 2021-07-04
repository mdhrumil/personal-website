---
title: 'Learning DApp development - Day 4'
date: '2021-07-03'
---

Welcome to Day 4 of this journey.

Today I read the seventh chapter of the book: [Mastering Ethereum](https://github.com/ethereumbook/ethereumbook) - Smart Contracts and Solidity.

In the seventh chapter, I learned about the Solidity programming language and how one can program smart contracts for the Ethereum blockchain. Most of the concepts that I had already learned prior to reading this chapter include: variable types, the structure of the contract, how to import different contracts, libraries, interfaces, events, access modifiers, custom modifiers, how to handle errors, selfdestruct, payable functions, and so on.

The new things that I learned in this chapter includes:

 - It is dangerous to use tx.origin for validating the ownership in your smart contract. The reason is that some one can perform a phishing attack by creating a proxy fallback function which calls the constructor of your contract and performs transfer function to their own address. This will execute if you used tx.origin to check for the owner and tx.origin will point to your address since you are initiating the transaction.
 - Low-level functions such as call, and delegatecall and how they can be used to call functions of other smart contracts from within a smart contract. The difference between call and delegatecall is related to the context of the function call. In the call function, the context of the function call is of the contract that you're trying to call so any state changes that happen in the function call will be according to the context of that contract whose function you're trying to call using call method. In delegatecall, the context of the function is of the caller contract and not the contract whose function you're trying to call. I know I sound very confusing but this [link](https://medium.com/coinmonks/delegatecall-calling-another-contract-function-in-solidity-b579f804178c) helped me understand it better.
 - Use of both call and delegatecall is dangerous because one doesn't know how much gas will be consumed by the function you're trying to call using those methods. If you're using it, make sure to collect the value it returns.
 - Libraries are used to write simple functions that are anticipated to be re-used for many times in the future. For example, simple arithmetic operations in case of a math library. You use the library by importing them into your contract, and then use it for all the variables of a particular type in your contract with the help of something like: "using SafeMath for uint32". This will allow applying of the SafeMath library functions on all of the uint32 variables in your contract. The way the library functions are called from your contract is using DELEGATECALL opcode, so that any state change that may happen, happens to the variables in your contract. This is done only if your library function is not a pure/view function. If it is a pure/view function, the use of DELEGATECALL is not done.
 - Libraries:
   - cannot be destroyed once created.
   - cannot inherit or be inherited.
   - cannot have non-constant/mutable state variables.
   - does not log events.

Fun story: In my first blockchain interview that I failed miserably, one of the questions was, "What are call, and delegatecall functions in Solidity?", and I didn't know the answer. I'm glad that I know it now.

If you're reading this, thank you.

Dhrumil