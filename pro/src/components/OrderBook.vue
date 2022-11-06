<template>
    <div class="vertical">
        <div class="component component-full">
            <div class="component-header text-warning">Order Book</div>

            <div id="orders">
                <div id="orderBookScroll">
                    <table class="table table-condensed table-borderless">
                    <!-- <table class="table table-condensed table-borderless table-order-book"> -->
                        <tr>
                            <td>NEX</td>
                            <td>NEX/USDT</td>
                            <td>USDT</td>
                        </tr>
                        <tr>
                            <td colspan="3" v-html="orders">
                                <!-- placeholder for orders -->
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        // msg: String
    },
    data: () => {
        return {
            orders: []
        }
    },
    created: function () {
        //
    },
    mounted: function () {
        //
    },
}
</script>

<style scoped>
/*  */
</style>
