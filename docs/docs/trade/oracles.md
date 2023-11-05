---
sidebar_position: 5
---

# Price Oracles

We are actively researching the possibility of offering a "Trusted" Oracle Service, managed by the Federation of XHedge Validators currently securing the SmartBCH sidechain.

__Two (2) possible specifications are under consideration:__

- [Oracles Cash](https://oracles.cash/) — by General Protocols
- [XHedge Price Oracle](https://github.com/smartbch/xhedge-price-oracle) — by SmartBCH Team

## Oracles Cash

_by General Protocols_

Cash Oracles are software that provides signed price information for various assets such that they can be used in the Bitcoin Cash scripting engine.

The current specification can be found [here](https://gitlab.com/GeneralProtocols/priceoracle/specification).

### Operators

Each oracle is run by an operator, who can provide a signed metadata message stating who they are and can also provide contact and support information.

### Price Sources

In order for an oracle to provide price information, they must have a source for their pricing data. Each oracle can use their own source, and can provide signed metadata messages stating what price source they are observing.

### Attestation

As each oracle observes a price point, they create an attestion in the form of a price oracle message. This message is then signed and distributed on the oracle network.

### Installation

```js
npm install @generalprotocols/price-oracle
```

## XHedge Price Oracle

_by SmartBCH Team_

Notably, this specification is 100% compatible with Ethereum's UniSwap v2 and all of its compatible protocols, eg. SushiSwap.

Virtually ALL SmartBCH DEXs are using one or the other, which makes this specification highly compatible with smart contracts.
