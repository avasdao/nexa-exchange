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
        data: [ 1, 3, 3, 7, 13, 8 ],
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
