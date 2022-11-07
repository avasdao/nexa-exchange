<template>
    <div class="component">
        <div class="component-header text-warning">
            Trades &amp; Volume
        </div>

        <div class="component-tabs nav-header">
            <ul class="nav" role="tablist">
                <li role="presentation" class="nav-item">
                    <a href="javascript://#trades" aria-controls="buy" role="tab" data-toggle="tab" class="active nav-link" data-original-title="" title="">Trades</a>
                </li>

                <li role="presentation" class="nav-item">
                    <a href="javascript://#volume" aria-controls="sell" role="tab" data-toggle="tab" class="nav-link" data-original-title="" title="">Volume</a>
                </li>
            </ul>
        </div>

        <div class="tab-content">
            <div role="tabpanel" class="tab-pane active" id="trades">
                <div>
                    <table class="table table-condensed table-borderless table-trades">
                        <thead>
                            <tr class="table-header">
                                <th>Time</th>
                                <th>USDT</th>
                                <th>NEX/USDT</th>
                                <th></th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td>12:44:52 AM {{today}}</td>
                                <td>
                                    <span cdata-toggle="tooltip" data-placement="bottom" title="10.000000000">10.000</span>
                                </td>
                                <td>
                                    <span class="buy">0.000205414</span>
                                </td>
                                <td>
                                    <a href="https://etherscan.io/tx/0x70a322dcad5da800e439c5c36c3e4aa3a218e186dfe48fd72c045aa0652fa198" target="_blank">
                                        <i class="fa fa-external-link-square-alt" aria-hidden="true"></i></a>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    12:42:00 AM {{today}}
                                </td>
                                <td>
                                    <span cdata-toggle="tooltip" data-placement="bottom" title="9.999999990">10.000</span>
                                </td>
                                <td>
                                    <span class="buy">0.000190172</span>
                                </td>
                                <td>
                                    <a href="https://etherscan.io/tx/0x7656494e4ee100422688f364b45ca58a3e5d6213ef982828ddd2c2b3e990c515" target="_blank">
                                        <i class="fa fa-external-link-square-alt" aria-hidden="true"></i></a>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    7:09:16 PM {{yesterday}}
                                </td>
                                <td>
                                    <span cdata-toggle="tooltip" data-placement="bottom" title="10.000000000">10.000</span>
                                </td>
                                <td>
                                    <span class="buy">0.000190309</span>
                                </td>
                                <td>
                                    <a href="https://etherscan.io/tx/0x8c08711f1b46b3f41c475112ed7572fa2c52dc27ac5d09bab1e2160b51f074ac" target="_blank">
                                        <i class="fa fa-external-link-square-alt" aria-hidden="true"></i></a>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    7:00:44 PM {{yesterday}}
                                </td>
                                <td>
                                    <span cdata-toggle="tooltip" data-placement="bottom" title="10.000000000">10.000</span>
                                </td>
                                <td>
                                    <span class="buy">0.000189355</span>
                                </td>
                                <td>
                                    <a href="https://etherscan.io/tx/0x3aa3383af5fff454855f02e11ccbaa6285cb25f3cd2d6aecd7842b00358a4115" target="_blank">
                                        <i class="fa fa-external-link-square-alt" aria-hidden="true"></i></a>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    6:13:12 PM {{yesterday}}
                                </td>
                                <td>
                                    <span cdata-toggle="tooltip" data-placement="bottom" title="25.000000000">25.000</span>
                                </td>
                                <td>
                                    <span class="buy">0.000162390</span>
                                </td>
                                <td>
                                    <a href="https://etherscan.io/tx/0x7c5eaf0a07000fba9efc76883750a500883ed42753cae0d38ec0d23923b0ca69" target="_blank">
                                        <i class="fa fa-external-link-square-alt" aria-hidden="true"></i></a>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="4" class="table-note">
                                    Note: nexa Exchange will only show recent transactions.
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div role="tabpanel" class="tab-pane" id="volume">
                <div>
                    <table class="table table-condensed table-borderless table-volume">
                        <thead>
                            <tr>
                                <th>Token</th>
                                <th>Daily</th>
                                <th>last</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <a href="javascript://#RHOC-BCH">RHOC</a>
                                </td>
                                <td>200000</td>
                                <td class="text-danger">0.000151421</td>
                            </tr>
                            <tr>
                                <td>
                                    <a href="javascript://#PLR-BCH">PLR</a>
                                </td>
                                <td>119621</td>
                                <td class="text-danger">0.000162000</td>
                            </tr>
                            <tr>
                                <td>
                                    <a href="javascript://#VERI-BCH">VERI</a>
                                </td>
                                <td>112</td>
                                <td class="text-success">0.127800000</td>
                            </tr>
                            <tr>
                                <td>
                                    <a href="javascript://#%C2%A2-BCH">¢</a>
                                </td>
                                <td>0</td>
                                <td class="text-success"></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
/* Initialize vuex. */
import { mapActions, mapGetters } from 'vuex'

/* Import modules. */
import moment from 'moment'

export default {
    props: {
        // msg: String
    },
    data: () => {
        return {
            //
        }
    },
    computed: {
        ...mapGetters([
            //
        ]),

        ...mapGetters('tokens', [
            // 'getToken'
        ]),

        today() {
            return moment().format('M/d')
        },

        yesterday() {
            return moment().subtract(1, 'days').format('M/d')
        },

    },
    methods: {
        ...mapActions([
            // 'createEthOrder'
        ]),

    },
    created: async function () {
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
