const SHA256 = require("crypto-js/sha256");
const TARGET_DIFFICULTY =
  BigInt(0x0fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff);
const MAX_TRANSACTIONS = 10;

const mempool = [];
const blocks = [];

function addTransaction(transaction) {
  // TODO: add transaction to mempool
  mempool.push(transaction);
}

function mine(nonce) {
  // mine tx:
  let transactions = [];
  while (transactions.length < MAX_TRANSACTIONS && mempool.length > 0) {
    transactions.push(mempool.pop());
  };
  // stores id of last block
  const block = { id: blocks.length, transactions };
  block.nonce = 0;
  let hash;
  while (true) {
      hash = SHA256(JSON.stringify(block)).toString();
      if (BigInt(`0x${hash}`) < TARGET_DIFFICULTY) {
          break;
      }
      block.nonce++;
  }
  blocks.push({ ...block, hash });
}

// You can compare a BigInt to another BigInt using the JavaScript comparison operators. 
// You can convert from a hash to be a BigInt by:
// const hash = SHA256("example");
// const int = BigInt(`0x${hash}`);

module.exports = {
  TARGET_DIFFICULTY,
  MAX_TRANSACTIONS,
  addTransaction,
  mine,
  blocks,
  mempool,
};
