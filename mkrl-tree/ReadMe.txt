Process to test 
////////////////////
cd into the current folder
run the command `node test.js`

///////////////////
test.js file invoke methods like `createTree` `merkelRoot` `generateProof` `verifyProof` 


////////////////////
data.json file contain all the given transactions to test. You can put your own hash values inside the array


//////////////////
to test with your own data use below method in test.js file
tree.verifyProof(proof, {hash: 'a991a04e7e6548b1fadedd4b3649b8513361e333f776b583bfd770bfe85769vv',id: 8});
here replace hash value with your own existing value which should present in data.json file
