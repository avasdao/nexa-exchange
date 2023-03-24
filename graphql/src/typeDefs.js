export default `#graphql
"Welcome to the Nexa Exchange GraphQL online query manager for Traders."
type Query {
  books: [Book]

  "Provides information about on-chain address: balance, first seen, # of transactions and more."
  address(
      "Accepts a base58-formatted (nexa:) address."
      base58: [String],

      "Accepts a raw Script-formatted address."
      script: [String],
  ): [Address]

  "Retreive Block information, including: hash, # of txs, etc."
  block(
      height: [Int],

      hash: [String],
  ): [Block]

  "Retreive Metadata stored on-chain."
  meta(
      id: [String],
  ): [Meta]

  "Retreive Owner information, including: tokens and transactions."
  owner(
      id: [String],
  ): [Owner]

  "Retreive Script information from OP_RETURN."
  script(
      "A string to match when searching."
      id: String,
  ): [Script]

  "Retreive Token information, including: id, imageUrl."
  token(
      id: [String],

      owner: [String],
  ): [Token]

  "Retreive Transaction information, including: txid, txidem, blocknum."
  transaction(
      txid: [String],

      txidem: [String],
  ): [Transaction]

}

type Book {
  title: String
  author: String
}

"This is an ADDRESS type for the Docs."
type Address {
  "A Base58 encoded address."
  base58: String

  "A raw encoded address."
  script: String

  "The address type."
  type: String
}

"This is an BLOCK type for the Docs."
type Block {
  "Height at which the block was confirmed by the network."
  height: Int

  "Immutable hash of the block data."
  hash: String

  "Size (in bytes) of the block."
  size: Int

  "Number of transactions processed within this block."
  txcount: Int

  feePoolAmt: Int
  merkleroot: String
  time: Int
  mediantime: Int
  nonce: String
  bits: String
  difficulty: Float
  chainwork: String
  utxoCommitment: String
  minerData: String
  status: String
  onMainChain: Boolean
  previousblockhash: String
  ancestorhash: String
  txid: [String]
  txidem: [String]
  txs: [Transaction]
}

"This is an GROUP type for the Docs."
type Group {
  id: String
  owner: Owner
  tokens: [Token]
}

"This is an META type for the Docs."
type Meta {
  id: String
  data: String
}

"Owner is a convenient class for retrieving ALL on-chain details for a specific Owner ID."
type Owner {
  id: String
  address: String
  pubkey: String
  tokens: [Token]
  txs: [Transaction]
}

"This is an SCRIPT type for the Docs."
type Script {
  id: String
  txidem: String
  owner: Owner
}

"This is an TOKEN type for the Docs."
type Token {
  id: String
  owner: String
  groups: [Group]
}

"This is an TRANSACTION type for the Docs."
type Transaction {
  txid: String
  txidem: String
  owner: Owner
  amount: Int
}
`
