---
title: 'Exploring vulnerabilities of smart contracts - Part 1'
date: '2021-07-05'
---

> Note - This is an update regarding my previous "Learning Dapp
> development" series. I will not be posting simple updates to the blog
> but will try to write them as if I am teaching someone. From now on,
> the titles of my posts will change, and the blogs will feel more like a blog and
> less like an update.
 
Ethereum smart contracts are immutable, which means that once they're deployed to the network, they cannot be modified or updated. So, it is important to test the smart contracts thoroughly before deploying and should be written by adhering to the best practices known. The vulnerabilities in the contracts can lead to losing millions of dollars of value. Today, we will look at three different types of attacks, that can potentially steal all the ethers from the deployed contracts.
> 
> Prerequisites: Some knowledge of smart contracts, Solidity programming
> language, and at least a pinch of enthusiasm for the decentralized
> future :)

## Reentrancy attacks 
Reentrancy attacks are those where the attackers can deplete a deployed contract from all of its ethers/token balance. It does so by re-entering the execution of a smart contract. Consider a smart contract named Bank where users can deposit ethers and withdraw 1 ether at a time using its withdraw() function. Here's how the contract may look:

	pragma solidity ^0.6.0;
	contract Bank {
		mapping(address => uint256) public balances;
		// Assume that the initial balance of the contract is 50 ethers.

		function deposit() public payable {
			balances[msg.sender] += msg.value;
		}

		function withdraw(uint256 _withdrawAmount) public {
			require(balances[msg.sender] >= _withdrawAmount);
			boolean status = msg.sender.call.value(_withdrawAmount)();
			if(status) {
				balances[msg.sender] -= _withdrawAmount;
			}
		}
	}

The withdraw function transfers ethers using the CALL opcode, and once executed, it updates its state variable that maintains the balance of that caller in the contract. When CALL opcode is used to transfer ether, the fallback function is triggered because either the function signature does not match with any of the function signatures in the attacker's contract, or if there was no data supplied while calling the function. 
Now consider the attacker's contract:

	pragma solidity ^0.6.0;

	contract Attacker {
		Bank public bank;
		// Initialize the Bank contract using its address in the constructor 

		function attack() {
			bank.deposit.value(1 ether)();
			bank.withdraw(1 ether);
		}
		function () payable {
			if(bank.balance > 1){
				bank.withdraw(1 ether);
			}
		}
	}

When the attacker will call the attack() function of this contract, it will deposit 1 ether to the Bank contract and the attacker contract's balance in Bank is now 1 ether. In the next line, the bank's withdraw() function is called. Since the balance of the attacker's contract is now 1 ether, the require statement will evaluate to true, stating that the ether could be transferred. When the transfer of ether happens using the CALL opcode, the fallback function of the Attacker contract will be triggered. In the fallback function, it checks if the Bank contract's balance is greater than 1 ether. If it is, it will again call the withdraw() function. Since the state update of balances mapping variable in the Bank contract hasn't taken place yet, the transfer will again go through, which will trigger another call to the fallback function, and this will keep on repeating until the balance of the Bank contract is 1 ether. In this way, the Attacker contract can withdraw all the ethers from the Bank contract even though it only had deposited 1.

**Solution** - The solution to avoid this attack is to make use of the transfer() function that is in-built in Solidity. The transfer function sends only 2300 gas units which are too little to call another function. Another thing that should be kept in mind is that all the state change that needs to happen in the sender's contract, should happen before calling the transfer() function. If we had done this in the above contract example, the recursive call from the fallback function would have been reverted since the balance of the attacker would have already been updated by then.


## Default visibility vulnerabilities
Solidity provides 4 visibility specifiers that dictate who can call the functions in the contract. 

> **public** - Can be called by external accounts, contracts, and internally from within the contract.
> 
> **external** - Can only be called by external accounts and contracts.
> 
> **private** - Can only be called from within the contract.
> 
> **internal** - Can only be called internally from within the contract, and from its derived contracts.

By default, the functions in Solidity are public. This means, that if one fails to specify the visibility for crucial functions, especially those which transfer ethers/tokens, it can be called by anyone on the network. A [real-life case](https://www.freecodecamp.org/news/a-hacker-stole-31m-of-ether-how-it-happened-and-what-it-means-for-ethereum-9e5dc29e33ce/) where an attacker stole $31M worth of ethers by exploiting this vulnerability.

Here's an example contract:

	contract HashForEther {

		function withdrawWinnings() {
			// Winner if the last 8 hex characters of the address are 0
			require(uint32(msg.sender) == 0);
			_sendWinnings();
		}

		function _sendWinnings() {
			msg.sender.transfer(this.balance);
		}
	}

Here, the contract awards all of its balance to any address whose last 8 hex characters are all zeroes. 

**Solution:** Always specify visibility specifiers as required. Using custom modifiers for ownership like the one below can also help.

	// contract body
	
	address owner;

	modifier isOwner () {
		require(msg.sender == owner);
		_;
	}

	constructor() {
		owner = msg.sender;
	}

	function _sendWinnings() isOwner {
		// transfer reward
	}


## Overflow/Underflow vulnerabilities

This type of attack is the simplest among the three. Data types in Solidity have fixed sizes so they can only represent a range of numbers. For example, a uint16 can only represent numbers in the range [0, 65535]. If a uint16 variable storing the maximum value in the range is incremented by 1, the value of the variable will be equal to 0. Similarly, if a uint16 variable storing the minimum value in the range is decremented by 1, the value will become 65535.

Here's how it is dangerous:

	contract SampleUnderflow {
		mapping(address => uint256) balances;

		function transfer(address _to, uint256 _amount) {
			require(balances[msg.sender] - _amount >= 0);
			balances[msg.sender] -= _amount;
			balances[_to] += _amount;
		}
	}

If an address whose balance in this contract is 0, calls the transfer function with _amount > 0, the require condition will cause underflow, and the value compared to 0 will be some positive number. Due to this, not only the balance of that address will become positive, but that positive number will also be added to the balance of the address _to (the recipient).

**Solution:** Always check for underflow and overflow conditions for state variables. One can do that by using libraries like [SafeMath](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/math/SafeMath.sol) from [OpenZeppelin](https://openzeppelin.com/contracts/).

Example: 
	
	import "SafeMath.sol";
	
	contract SampleUnderflow {
		mapping(address => uint256) balances;
		
		// use SafeMath
		using SafeMath for uint256;
		
		function transfer(address _to, uint256 _amount) {
			require(balances[msg.sender].subtract(_amount) >= 0);
			balances[msg.sender] = balances[msg.sender].subtract(_amount);
			balances[_to] = balances[_to].add(_amount);
		}
	}

So in this blog, we discussed three different types of vulnerabilities that can be exploited by attackers. In the next blog, we will explore other types of attacks.

If you're reading this, thank you.

Dhrumil