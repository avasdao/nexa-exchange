# Nexa Database

A queriable database of the full Nexa blockchain.

## Design Documents

CouchDB design documents enable search optimization to the MOST popular queries.

The following design document views are defined by default:

### api/byHash

```
{
  "_id": "_design/api",
  "_rev": "1-ed43ded243b39edb66b793a72657332a",
  "views": {
    "byHash": {
      "map": "function (doc) {\n  if (doc.hash) {\n    emit(doc.hash);  \n  }\n}"
    }
  },
  "language": "javascript"
}
```
