<template>
    <div class="">
        <div class="h-full component component-full">
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

                    <MarketFeed />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
/* Import components. */
import MarketFeed from './MarketFeed'

export default {
    components: {
        MarketFeed,
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
