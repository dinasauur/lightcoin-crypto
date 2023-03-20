// let balance = 500;

class Account {

  constructor() {
    // Have the account balance start at $0 since that makes more sense.
    this.transactions = [];
  }

  get balance() {
    let balance = 0;
    // Calculate the balance using the transaction objects.
    for (let t of this.transactions) {
      balance += t.value;
    }
    return balance;
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }

}

class Transaction {
  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }

  commit() {
    if (!this.isAllowed()) return false;
    // Keep track of the time of the transaction
    this.time = new Date();
    // Add the transaction to the account
    this.account.addTransaction(this);
    return true;
  }

}

class Deposit extends Transaction {
  get value() {
    return this.amount;
  }

  isAllowed() {
    return true;
  }
}

class Withdrawal extends Transaction {
  // new method learned: commit method is called in order to finalize and apply that transaction to the account's balance.
  get value() {
    return -this.amount;
  }

  isAllowed() {
    return (this.account.balance - this.amount >= 0);
  }
}

// Instantiate the withdrawal and deposit
// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected

const myAccount = new Account();

console.log('Starting Account Balance: ', myAccount.balance);

console.log('Attempting to withdraw even $1 should fail...');
t1 = new Withdrawal(1, myAccount);
console.log('Commit result: ', t1.commit());
console.log('Accout balance: ', myAccount.balance);

console.log('Depositing should succeed...');
t2 = new Deposit(9.99, myAccount);
console.log('Commit result: ', t2.commit());
console.log('Accout balance: ', myAccount.balance);

console.log('Withdrawal for 9.99 should be allowed...');
t3 = new Withdrawal(9.99, myAccount);
console.log('Commit result: ', t3.commit());
console.log('Accout balance: ', myAccount.balance);

console.log(`My ending balance: `, myAccount.balance);
console.log("Lookings like I'm broke again");

console.log('Account Transaction History: ', myAccount.transactions);



/****
* Change 1 - Here we are passing the myAccount object reference to the withdrawal/deposit object when we create it.
* This process of passing an object the information it needs when we create it is a great design pattern. *
* It means that, unlike before, the Withdrawal and Deposit objects are not dependent on any surrounding data in their global or outer scope.
* Additionally, transactions are no longer tied to only a single account. We can have these transaction records work with any account.
* This pattern is called Dependency Injection. It's a fancy word that simply means "passing an object the things it needs rather than having the object access them itself".
* It makes for code that is much more modular and testable.
****/

/****
* Change 2 - Created a new class called Transaction that has withdrawal and deposit as subclasses
* We want Deposit and Withdrawal to only contain the code that it absolutely has to. The remaining code in the subclasses is logic that could not be shared with the others.
* The way we create a new Withdrawal or Deposit has not changed; the interface has stayed the same. What has changed is how we're implementing these classes.
* Our driver code, which uses the classes, has zero need to change. This is an example of good refactoring.
****/

/****
* Change 3 - Refactor commit
* Instead of having commit defined in each subclass, we defined a getter method called value in each subclass.
* Now that value contains a positive or negative amount, we can simply add value instead of having to decide in the commit. It's therefore possible to now share the commit method by moving it into the superclass.
****/

/****
 * Change 4 and 5
 * Didn't understand anything.
 */
