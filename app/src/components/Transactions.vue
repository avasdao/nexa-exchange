<template>
    <div class="component">
        <div class="component-header text-warning">Your Transactions</div>
        <div class="component-tabs nav-header">
            <ul class="nav" role="tablist">
                <li role="presentation" class="nav-item">
                    <a href="javascript://#myTrades" aria-controls="myTrades" role="tab" data-toggle="tab" class="active nav-link" data-original-title="" title="">Trades</a>
                </li>

                <li role="presentation" class="nav-item">
                    <a href="javascript://#myOrders" aria-controls="myOrders" role="tab" data-toggle="tab" class="nav-link" data-original-title="" title="">Orders</a>
                </li>

                <li role="presentation" class="nav-item">
                    <a href="javascript://#myFunds" aria-controls="myFunds" role="tab" data-toggle="tab" class="nav-link" data-original-title="" title="">Funds</a>
                </li>
            </ul>
        </div>

        <div class="tab-content">
            <div role="tabpanel" class="tab-pane active" id="myTrades">
                <div>
                    <table class="table table-condensed table-borderless table-my-trades">
                        <thead>
                            <tr class="table-header">
                                <th>Transaction</th>
                                <th>Type</th>
                                <th>USDT</th>
                                <th>NEX</th>
                                <th>NEX/USDT</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td colspan="5" class="table-note">Note: Nexa Exchange will only show recent transactions.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div role="tabpanel" class="tab-pane" id="myOrders">
                <div>
                    <table class="table table-condensed table-borderless table-orders">
                        <thead>
                            <tr class="table-header">
                                <th>NEX/USDT</th>
                                <th>Available volume</th>
                                <th>Expires in</th>
                                <th>Cancel</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td colspan="4" class="table-note">There are no orders here.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div role="tabpanel" class="tab-pane" id="myFunds">
                <div>
                    <table class="table table-condensed table-borderless table-funds">
                        <thead>
                            <tr class="table-header">
                                <th>Transaction</th>
                                <th>Type</th>
                                <th>NEX</th>
                                <th>USDT</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td colspan="5" class="table-note">Note: Nexa Exchange will only show recent transactions.</td>
                            </tr>
                        </tbody>
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
    }
}
</script>

<style scoped>
/*  */
</style>
