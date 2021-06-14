const sha256 = require("./utility");
const hash = require("./utility");

class MerkelTree {
	constructor() {
    // Design of root: it will contain the transactionsList and root hashes built during merkel tree construction 
		this.root = [];
	}

/**
 * Takes a list of transaction as input and create the merkel tree by joining child nodes{leaf nodes}
 * @param {TransactionList} transactionList
 */
createTree(transactionList) {
    this.root.unshift(transactionList);
    this.root.unshift(transactionList.map(t => t.hash));

    while (this.root[0].length > 1) {
      let temp = [];
      
      //join the leaf hashes and make merkel root
      for (let index = 0; index < this.root[0].length; index += 2) {
        if (index < this.root[0].length - 1 && index % 2 == 0)
          temp.push(sha256(this.root[0][index] + this.root[0][index + 1]));
        else temp.push(this.root[0][index]);
      }
      this.root.unshift(temp);
    }
  }

  /**
   * @returns the root array of hashes
   */
  merkelRoot(){
    return this.root.slice(0,-1)
  }

  /**
   * @param {*tx } takes transaction object {hash and id}
   * @returns the proof if transaction hash is present
   */
  generateProof({...tx}){
    return this.root.slice(-1)[0].find(item => item.hash === tx.hash)
  }

  /**
   * @param {*proof, transaction} 
   * verifyProof is same as createTree method. Take the input param transaction hash and hash it with the neighbouring node. and check if both root of the merkel tree and output of varifyHash is same or not
   * return boolean valid or not valid of input transaction hash  
  */
  verifyProof(proof, transaction) {
    
    let pos = this.root.slice(-1)[0].findIndex(t => t.hash == transaction.hash);
 
    if (proof && pos > 0) {

      let verifyHash = transaction.hash;
  
      for (let index = this.root.length - 2; index > 0; index--) {
  
        let neighbour = null;
        if (pos % 2 == 0) {
          neighbour = this.root[index][pos + 1];
          pos = Math.floor((pos) / 2)
          verifyHash = sha256(verifyHash + neighbour);
        }
        else {
          neighbour = this.root[index][pos - 1];
          pos = Math.floor((pos - 1) / 2)
          verifyHash = sha256(neighbour + verifyHash);
        }
  
      }
      console.log('Proof is: \x1b[42m%s\x1b[0m', verifyHash == this.root[0][0] ? "Valid" : "Not Valid");
    }
    else {
      console.log('Proof is: \x1b[41m%s\x1b[0m',"invalid or data not found");
  
    }
  }
}
module.exports = MerkelTree;