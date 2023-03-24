const books = [
  {
    title: 'The Awakening',
    author: 'Kate Chopin',
  },
  {
    title: 'City of Glass',
    author: 'Paul Auster',
  },
]

export default {
    Query: {
        books: () => books,
    },
}

const myResolver = {
    address: async (_args) => {
        /* Set base58. */
        // NOTE: Array of addresses.
        const base58 = _args?.base58 || ['nexa:my-awesome-address']

        return [{
            base58: base58[0],
            script: '001840888777666555444333222111',
            type: 'template',
        }]
    },

    block: async (_args) => {
        /* Initialize blocks. */
        const blocks = []

        /* Set heights. */
        const height = _args?.height

        /* Validate heights. */
        if (!height) {
            return blocks
        }

        /* Handle each height. */
        for (let i = 0; i < height.length; i++) {
            /* Request block data. */
            const block = await blocksDb
                .get(height[i])
                .catch(err => {
                    console.error(err)
                    // TODO: Handle (logging) errors.
                })
            // console.log('BLOCK', block)

            /* Add block to list. */
            blocks.push(block)
        }

        /* Return blocks. */
        return blocks
    },

    meta: async (_args) => {
        /* Initialize locals. */
        let id

        /* Set meta id. */
        id = _args?.id

        /* Validate array. */
        if (!Array.isArray(id)) {
            id = [id]
        }

        // TODO Add queries.

        return [{
            id: id[0],
            owner: 'nexa:SatoshiOne',
        }]
    },

    owner: async (_args) => {
        /* Initialize locals. */
        let id

        /* Set owner id. */
        id = _args?.id

        /* Validate array. */
        if (!Array.isArray(id)) {
            id = [id]
        }

        // TODO Add queries.

        return [{
            id: id[0],
            tokens: [{
                id: 'awesome-token',
                name: 'Awesome Token',
            }, {
                id: 'super-token',
                name: 'Super Token',
            }],
        }]
    },

    script: async (_args) => {
        /* Initialize locals. */
        let id

        /* Set script id. */
        id = _args?.id

        /* Validate array. */
        if (!Array.isArray(id)) {
            id = [id]
        }

        // TODO Add queries.

        return [{
            id: id[0],
            owner: 'nexa:SatoshiOne',
        }]
    },

    token: async (_args) => {
        /* Initialize locals. */
        let id

        /* Set token id. */
        id = _args?.id

        /* Validate array. */
        if (!Array.isArray(id)) {
            id = [id]
        }

        // TODO Add queries.

        return [{
            id: id[0],
            owner: 'nexa:SatoshiOne',
        }]
    },

    transaction: async (_args) => {
        /* Initialize locals. */
        let txidem

        /* Set tx idem. */
        txidem = _args?.txidem || ['my-leet-txidem']

        /* Validate array. */
        if (!Array.isArray(txidem)) {
            txidem = [txidem]
        }

        // TODO Add queries.

        return [{
            txid: 'my-leet-txid',
            txidem: txidem[0],
            amount: 1337.00
        }]
    },
}
