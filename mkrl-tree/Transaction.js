const sha256 = require("./utility");

/**
 * @Transaction class will used to create the transaction [hash, id]. 
 * This class will return the object {hash and id} of the transaction
 * hash: Transaction constructor accepts the transaction ID data and will hash it using the sha256 algorithm.
 * ID: it is used to keep track of the count.    
 * This constructor can further be extend for other variable like [srcAddr, destAddr, date, time etc] 
 */
class Transaction {
	constructor(data) {
		this.hash = sha256(data);
		this.id = Transaction.getCount();
	}

	static getCount() {
		Transaction.incrementCount();
		return Transaction.count;
	}

	static incrementCount() {
		Transaction.count++;
	}

	toString() {
		return `
        hash:${this.hash}
        id:${this.id}`;
	}
}

Transaction.count = 0;

module.exports = Transaction;