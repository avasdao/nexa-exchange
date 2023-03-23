export default `######################################################################
#
#  Welcome to the Nexa Exchange GraphiQL
#
#  Nexa Investors & Traders should make great use of this tool for:
#    ✔ Comprehensive market analysis
#    - validating queries
#    - and testing queries
#
#  Sample queries from each (of 5) data categories shown below:
#
#     Assets:   Request transaction histories
#               and full balance details.
#
#    Markets:   Request confirmation and transaction
#               details.
#
#     Orders:   Request information from Meta (extended)
#               on-chain data.
#
#    Reports:   Request all available on-chain details for
#               a specific Owner ID.
#
#       Swap:   Request on-chain metadata details stored
#               in a transaction's 'OP_RETURN' script area.
#
######################################################################

{
  # Sample address query
  address(base58: "nexa:...") {
    base58
    script
    type
  }

  # Sample block query
  block(height: [227570, 227571, 227572]) {
    height
    hash
    size
    txcount
    time
    mediantime
    nonce
    bits
    difficulty
    utxoCommitment
    minerData
  }

  # Sample meta query
  meta(id: "txidem-for-some-nft-pfp") {
    id
  }

  # Sample owner query
  owner(id: "nexa:someone-with-too-many-nfts") {
    id
  }

  # Request specific data match based on OP_RETURN
  # data stored on-chain.
  # NOTE: 'FUZ' is the datacode for a CashFusion transaction.
  script(id: "FUZ") {
    id
    txidem
    owner {
      id
    }
  }

  # Sample token query
  token(id: "a-very-cool-tokenid") {
    id
  }

  # Sample transaction query
  transaction(txid: "my-super-expensive-txid") {
    txid
    txidem
    amount
  }
}
`
