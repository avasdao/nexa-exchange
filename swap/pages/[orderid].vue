<script setup>
/* Import modules. */
import moment from 'moment'


const path = ref(null)
const orderid = ref(null)

// const params = $route.params
// console.log('PARAMS', params)

/* Initialize route. */
const route = useRoute()
// console.log('ROUTE', route)

/* Set (route) path. */
path.value = route?.path
console.log('ROUTE PATH', path.value)

/* Set (route) path. */
orderid.value = route?.params.orderid
console.log('ROUTE PATH', orderid.value)

</script>

<template>
    <main>
        <h1>Monitoring Station</h1>

        <h3>ORDER ID: {{orderid}}</h3>
    </main>
</template>
