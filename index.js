// let balance = 500;

class Account {
  constructor(username) {
    this.username = username,
    // Have the account balance start at $0 since that makes more sense.
    this.balance = 0;
  }
}

class Deposit {

  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }

  commit() {
    this.account.balance += this.amount;
  }

}

class Withdrawal {

  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }

  // new method learned: commit method is called in order to finalize and apply that transaction to the account's balance.
  commit() {
    this.account.balance -= this.amount;
  }
}


// Instantiate the withdrawal and deposit
// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected

const myAccount = new Account('snow-patrol')
console.log('Starting Account Balance: ', myAccount.balance);
t1 = new Withdrawal(50.25, myAccount);
t1.commit();
console.log('Transaction 1:', t1);


t2 = new Withdrawal(9.99);
t2.commit();
console.log('Transaction 2:', t2);

t3 = new Deposit(150);
t3.commit();
console.log(`Transaction 3: `, t3);
console.log(`Balance: ${t3.account.balance}`);

/****
* Note - Here we are passing the myAccount object reference to the withdrawal/deposit object when we create it.
*This process of passing an object the information it needs when we create it is a great design pattern. *
* It means that, unlike before, the Withdrawal and Deposit objects are not dependent on any surrounding data in their global or outer scope.
* Additionally, transactions are no longer tied to only a single account. We can have these transaction records work with any account.
* This pattern is called Dependency Injection. It's a fancy word that simply means "passing an object the things it needs rather than having the object access them itself".
* It makes for code that is much more modular and testable.
****/
