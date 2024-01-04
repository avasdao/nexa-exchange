<script setup>

const props = defineProps({
    width: Number,
})

/* Configure chart options. */
const chartOptions = {
    chart: {
        id: 'wiserswap-example',
    },
    xaxis: {
        categories: [ 'Aug', 'Sept', 'Oct', 'Nov', 'Dec', 'Jan' ],
    },
}

/* Configure series data. */
const series = [
    {
        name: 'Total Trade Value',
        data: [ 3, 4, 5, 10, 27, 6 ],
    },
]
</script>

<template>
    <ClientOnly>
        <apexchart
            :width="width"
            type="bar"
            :options="chartOptions"
            :series="series"
        ></apexchart>
    </ClientOnly>
</template>
