export default defineEventHandler((event) => {
    /* Set (request) query. */
    const query = getQuery(event)
    console.log('QUERY', query)

    return query
})
