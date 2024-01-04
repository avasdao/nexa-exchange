<script setup>

const props = defineProps({
    width: Number,
})

const chartOptions = {
    chart: {
        id: 'vuechart-example',
    },
    xaxis: {
        categories: [ 'Aug', 'Sept', 'Oct', 'Nov', 'Dec', 'Jan' ],
    },
}

const series = [
    {
        name: 'series-1',
        data: [ 30, 40, 35, 50, 70, 91 ],
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
