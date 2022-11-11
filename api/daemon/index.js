console.log('\n  Starting Nexa Exchange Sandbox Tests..\n')

/* Initialize IPFS options. */
const ipfsOptions = {
    EXPERIMENTAL: {
        pubsub: true,
    },
    repo : './ipfs',
}

async function main () {
    /* Initialize local variables. */
    let pkg
    let response
    let result

    /* Import ESM modules. */
    const { create } = await import('ipfs')
    const OrbitDB = await import('orbit-db')

    try {
        /* Create IPFS instance. */
        const ipfs = await create(ipfsOptions)

        /* Create OrbitDB instance. */
        const orbitdb = await OrbitDB.default
            .createInstance(ipfs)

        /* Initialize Orbit (Orders) database. */
        const ordersDb = await orbitdb.docs('exchange.nexa.orders')

        ordersDb.events.on('load.progress', (address, hash, entry, progress, total) => {
            console.log('  EVENT-address', address)
            console.log('  EVENT-hash', hash)
            // console.log('  EVENT-entry', entry)
            console.log('  EVENT-progress', progress)
            console.log('  EVENT-total', total)
        })

        ordersDb.events.on('ready', (dbname, heads) => {
            console.log('  EVENTS-dbname', dbname)
            // console.log('  EVENTS-heads', heads)
        })

        ordersDb.events.on('write', (address, entry, heads) => {
            console.log('  EVENTS-address', address)
            // console.log('  EVENTS-entry', entry)
            // console.log('  EVENTS-heads', heads)
        })

        /* Initialize Orbit (Messages) database. */
        const messagesDb = await orbitdb.docs('exchange.nexa.messages')

        /* Load (Orders) database. */
        await ordersDb.load()

        // pkg = { _id: 'hello world', doc: 'all the things', followers: 3 }
        // response = await ordersDb.put(pkg)

        // pkg = { _id: 'hello universe', doc: 'all things', followers: 10 }
        // response = await ordersDb.put(pkg)

        // pkg = { _id: 'sup world', doc: 'other things', followers: 5 }
        // response = await ordersDb.put(pkg)

        result = ordersDb.get('')
        console.log(result)

        // result = await ordersDb.del('sup world')

        const pending = ordersDb.query(doc => doc.followers >= 5)
        console.log(pending)
    } catch (err) {
        console.error(err)
    }
}

main()
