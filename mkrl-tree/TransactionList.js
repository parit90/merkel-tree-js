/**
 * @TransactionList class contain list of transaction objects contains [hash, id]
 * Method has a dynamic list as constructor variable and a add method.
 */

class TransactionList {
	constructor() {
		this.list = [];
	}

	add(transaction) {
		this.list.push(transaction);
	}
}

module.exports = TransactionList;