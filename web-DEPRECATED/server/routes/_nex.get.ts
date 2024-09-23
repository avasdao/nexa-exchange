/* Alias for `price`. */
export default defineEventHandler(async (event) => {
    /* Return query. */
    return await $fetch('/_price')
})
