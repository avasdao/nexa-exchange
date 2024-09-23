export default defineEventHandler(async (event) => {
    // NOTE: (DEPRECATED) alias for ticker.
    //       Will replace with `__ticker.vue` after ALL upgrades are completed!!
    return await $fetch('/_ticker')
})
