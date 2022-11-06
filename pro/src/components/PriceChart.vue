<template>
    <div class="component">
        <div class="component-header text-warning">Price Chart</div>
        <div id="chartPrice">
            <div class="chart-quote">
                <div></div>
            </div>

            <div class="component-tabs nav-header">
                <ul class="nav" role="tablist">
                    <li role="presentation" class="nav-item">
                        <a aria-controls="1h" role="tab" data-toggle="tab" class="nav-link" data-original-title="" title="">1H</a>
                    </li>

                    <li role="presentation" class="nav-item">
                        <a aria-controls="2h" role="tab" data-toggle="tab" class="nav-link" data-original-title="" title="">2H</a>
                    </li>

                    <li role="presentation" class="nav-item">
                        <a aria-controls="6h" role="tab" data-toggle="tab" class="nav-link" data-original-title="" title="">6H</a>
                    </li>

                    <li role="presentation" class="nav-item">
                        <a aria-controls="24h" role="tab" data-toggle="tab" class="active nav-link" data-original-title="" title="">24H</a>
                    </li>

                    <li role="presentation" class="nav-item">
                        <a aria-controls="7d" role="tab" data-toggle="tab" class="nav-link" data-original-title="" title="">7D</a>
                    </li>

                    <li role="presentation" class="nav-item">
                        <a aria-controls="30d" role="tab" data-toggle="tab" class="nav-link" data-original-title="" title="">30D</a>
                    </li>
                </ul>
            </div>

            <div>
                <div class="chart-container">
                    <div class="price-chart">
                        <div></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        // msg: String
    }
}
</script>

<style scoped>
/*  */
</style>
