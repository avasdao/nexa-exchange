---
sidebar_position: 4
---

# Federation Database

> Peer-to-Peer Databases for the Decentralized Web

A single, shared database is required to manage the Exchange's data storage needs. [__OrbitDB__](https://github.com/orbitdb) is currently leading when it comes to peer-to-peer databases for the decentralized web.

## Why OrbitDB?

After months of extensive research, our team has decided that OrbitDB will provide the most flexible Distributed Database System (DDS) of the three options we considered: [__OrbitDB__](https://github.com/orbitdb), [__GUN__](https://gun.eco/) and [__Secure Scuttlebutt (SSB)__](https://www.scuttlebutt.nz/).

__The Orbit interface offers the widest range of potential use cases.__ The variety of data stores offered by Orbit provide optionality and flexibility for building many different types of applications and tools for a very wide range of use cases.

__The Orbit network is built on top of familiar, well-maintained technologies.__ libp2p and ipfs provide a solid foundation to the Orbit system that many members of the SmartBCH community are likely already familiar with.

__The Orbit network allows many peers to host and share data.__ libp2p allows OrbitDB to easily sync database updates from multiple peers, which allows many peers to host data. Because of this, OrbitDB allows for the creation of a network which anyone can join to help keep data available, making the entire network more robust.

## Message Format

```json
{
  "messageid": "b96ab63d-a941-49cd-a02e-7257035de6e1",
  "title": "",
  "body": "",
  "isDeleted": false,
  "createdAt": 1657151337
}
```
