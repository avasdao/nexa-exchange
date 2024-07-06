export default defineEventHandler((event) => {
    const dbStatus = 'ok'
    const tickerStatus = 'ok'
    const nexidStatus = 'ok'

    return {
        database: dbStatus,
        ticker: tickerStatus,
        nexid: nexidStatus,
    }
})
