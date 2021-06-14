const MerkelTree = require("./MerkelTree");
const TransactionList = require("./TransactionList");
const Transaction = require("./Transaction");

//import the data.json
const data = require("./data")

let transactionList = new TransactionList();

for (let index = 0; index < data.tx.length; index++) {
	transactionList.add(new Transaction(data.tx[index]));
}

const tree = new MerkelTree();

tree.createTree(transactionList.list);
console.log("Merkel root is: \x1b[45m%s\x1b[0m",tree.merkelRoot()[0][0])

//correct hash data
let proof = tree.generateProof(transactionList.list[4])
tree.verifyProof(proof, transactionList.list[4]);


// wrong hash data
tree.verifyProof(proof, {hash: 'a991a04e7e6548b1fadedd4b3649b8513361e333f776b583bfd770bfe85769vv',id: 8});