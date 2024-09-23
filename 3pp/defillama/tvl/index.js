/* Import modules. */
const axios = require('axios')

/**
 * Get Daily History
 *
 */
async function GetDailyHistory(_day) {
    // const target = `https://gitlab.com/0353F40E/anyhedge-stats/-/raw/master/stats_daily/${day}.csv`
    const target = `https://nexa.exchange/3pp/defillama/${_day}`

    // Data & calculation method is fully reproducible, see:
    // https://gitlab.com/0353F40E/anyhedge-stats/-/blob/master/readme.md
    try {
        let { data } = await axios.get(target)
        data = parseCSV(data)
        return data[0].tvl
    } catch {
        return null
    }
}

/**
 * Get Total Value Locked (TVL) Hedge
 *
 */
async function getTVLWiserSwap(timestamp) {
    const day = new Date(timestamp * 1000).toISOString().slice(0,10)
    return await GetDailyHistory(day)
}

/**
 * Total Value Locked (TVL)
 *
 */
async function tvl({timestamp}) {
    /* Initialize locals. */
    let tvlWiserSwap, testDataSource

    // tvl data lags by contract duration since contracts are secret until settled
    // so tvl at current time will always be 0, and only later when contracts are revealed
    // can it be calculated in retrospect and stats back-filled
    // for this reason, we cut-off the data at (today-31d)
    const lastTimestamp = Math.floor(new Date().getTime() / 1000 - 31*86400)

    if (timestamp > lastTimestamp) {
        throw `Data for the date is incomplete, awaiting contract reveals.`
    }

    tvlWiserSwap = await getTVLWiserSwap(timestamp)
    testDataSource = await getTVLWiserSwap(timestamp + 31*86400)

    // if we're querying data for `timestamp`, a row for `timestamp+31d` should exist
    if (testDataSource == null) {
        throw `Data source hasn't been updated yet.`
    }

    // if none of our scrape targets worked then throw an error
    if (tvlWiserSwap == null) {
        throw `Unable to determine WiserSwap TVL.`
    }

    /* Format Nexa Total Value Locked (TVL). */
    const nexaTvl = Number(tvlWiserSwap).toFixed()

    return {
        // 'bitcoin-cash': bchTvl
        'nexa': nexaTvl
    }
}

module.exports = {
    methodology: "Scrape the blockchain and filter for spent transaction outputs that match the contract's input script template. Aggregate them to compute TVL. The TVL data lags by contract duration since contracts are secret until settled. So, TVL at the current time will always be 0 and can only be calculated in retrospect and stats back-filled when contracts are revealed. For this reason, the code cuts-off the data at 31 days ago. See here for more details: https://gitlab.com/0353F40E/anyhedge-stats/-/blob/master/readme.md",
    start: 1704110400, // Monday, January 1, 2024 12:00:00 PM (GMT)
    bitcoincash: { tvl },
    hallmarks: [
        [1654787405, "First WiserSwap v0.11 Contract"],
        [1663106400, "WiserSwap Alpha is live and available"],
        [1666585080, "The BCH Bull (Beta) goes live"],
        [1666785960, "Paytaca wallet's product live"],
        [1680356040, "BCH Bull trials P2P contracts"],
        [1681725240, "BCH Bull is released"],
        [1683634380, "BCH Bull adds Achievements"],
        [1686651480, "BCH Bull raise max contract to $100k"],
        [1687330080, "BCH Bull raise max leverage to 7.77x"],
        [1703054100, "BCH Bull enables Early Settlements"],
    ]
}

/**
 * Parse CSV
 *
 * (helper function)
 */
function parseCSV(_csvData) {
    _csvData = _csvData.replaceAll('\r', '').split('\n').map(i => i.split(','))
    const headers = _csvData.shift()
    return _csvData.map(row => toObject(headers, row))
}

/**
 * To Object
 *
 * (helper function)
 */
function toObject(_keys, _values) {
    const res = {}
    _keys.forEach((key, i) => {
        res[key] = _values[i]
    })
    return res
}
