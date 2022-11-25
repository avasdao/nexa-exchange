<template>
    <main class="component">
        <div class="component-header text-warning">Buy | Sell</div>

        <div class="component-tabs nav-header">
            <ul class="nav" role="tablist">
                <li class="nav-item">
                    <a role="tab" data-toggle="tab" href="#buy" class="active nav-link" aria-controls="buy" aria-selected="true">
                        Buy Order
                    </a>
                </li>

                <li class="nav-item">
                    <a role="tab" data-toggle="tab" href="#sell" class="nav-link" aria-controls="sell" aria-selected="false">
                        Sell Order
                    </a>
                </li>
            </ul>
        </div>

        <div class="tab-content">
            <!-- Start buy panel -->
            <div role="tabpanel" class="tab-pane fade show active" id="buy">
                <form>
                    <div class="form-group">
                        <label for="buyAmount">
                            Amount of {{tokenSymbol}} tokens to buy
                        </label>

                        <div class="input-group">
                            <input
                                type="number"
                                class="form-control form-control-sm"
                                id="buyAmount"
                                v-model="buyAmount"
                            >

                            <div class="input-group-append">
                                <span class="input-group-text">
                                    {{tokenSymbol}}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="buyPrice">
                            Price per {{tokenSymbol}} token
                        </label>

                        <div class="input-group">
                            <input
                                type="number"
                                class="form-control form-control-sm"
                                id="buyPrice"
                                v-model="buyPrice"
                                @blur="updateBuyTotal"
                            >

                            <div class="input-group-append">
                                <span class="input-group-text">
                                    USDT
                                </span>
                            </div>
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="buyTotal">
                            Total order value
                        </label>

                        <div class="input-group">
                            <input
                                type="number"
                                id="buyTotal"
                                class="form-control form-control-sm"
                                v-model="buyTotal"
                                @blur="updateBuyPrice"
                            >

                            <div class="input-group-append">
                                <span class="input-group-text">
                                    USDT
                                </span>
                            </div>
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="buyExpires" data-toggle="tooltip" data-placement="bottom" title="">
                            Order expiration time
                        </label>

                        <div class="input-group">
                            <input
                                type="text"
                                class="form-control form-control-sm"
                                id="buyExpires"
                                :value="expirationTime" readonly
                            >

                            <div class="input-group-append">
                                <span class="input-group-text">
                                    {{expirationMeasure}}
                                </span>
                            </div>
                        </div>
                    </div>

                    <span class="text-warning"></span>

                    <div class="form-group">
                        <button
                            type="button"
                            class="btn btn-success btn-sm btn-block"
                            @click="buyOrder"
                        >
                            Create Buy Order
                        </button>
                    </div>
                </form>
            </div>
            <!-- End buy panel -->

            <!-- Start sell panel -->
            <div role="tabpanel" class="tab-pane fade" id="sell">
                <form>
                    <div class="form-group">
                        <label for="sellAmount">
                            Amount of {{tokenSymbol}} tokens to sell
                        </label>

                        <div class="input-group">
                            <input
                                type="number"
                                class="form-control form-control-sm"
                                id="sellAmount"
                                v-model="sellAmount"
                            >

                            <div class="input-group-append">
                                <span class="input-group-text">
                                    {{tokenSymbol}}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="sellPrice">
                            Price per {{tokenSymbol}} token
                        </label>

                        <div class="input-group">
                            <input
                                type="number"
                                class="form-control form-control-sm"
                                id="sellPrice"
                                v-model="sellPrice"
                                @blur="updateSellTotal"
                            >

                            <div class="input-group-append">
                                <span class="input-group-text">
                                    USDT
                                </span>
                            </div>
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="sellTotal">
                            Total order value
                        </label>

                        <div class="input-group">
                            <input
                                type="number"
                                class="form-control form-control-sm"
                                id="sellTotal"
                                v-model="sellTotal"
                                @blur="updateSellPrice"
                            >

                            <div class="input-group-append">
                                <span class="input-group-text">
                                    USDT
                                </span>
                            </div>
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="sellExpires" data-toggle="tooltip" data-placement="bottom" title="">
                            Order expiration time
                        </label>

                        <div class="input-group">
                            <input
                                type="text"
                                class="form-control form-control-sm"
                                id="sellExpires"
                                :value="expirationTime" readonly
                            >

                            <div class="input-group-append">
                                <span class="input-group-text">
                                    {{expirationMeasure}}
                                </span>
                            </div>
                        </div>
                    </div>

                    <span class="text-warning"></span>

                    <div class="form-group">
                        <button
                            type="button"
                            class="btn btn-danger btn-sm btn-block"
                            @click="sellOrder"
                        >
                            Create Sell Order
                        </button>
                    </div>
                </form>

            </div>
            <!-- End sell panel -->

        </div>
    </main>
</template>

<script>
/* Initialize vuex. */
import { mapActions, mapGetters } from 'vuex'

/* Import modules. */
// import numeral from 'numeral'

export default {
    data: () => {
        return {
            token: null,
            buyAmount: null,
            buyPrice: null,
            buyTotal: null,
            sellAmount: null,
            sellPrice: null,
            sellTotal: null,

            expirationTime: null,
            expirationMeasure: null,
        }
    },
    watch: {
        buyAmount: function (_amount) {
            if (!_amount) {
                return null
            }

            if (this.buyPrice) {
                // this.buyTotal = numeral(_amount * this.buyPrice).format('0.00')
                this.buyTotal = (_amount * this.buyPrice)
            }

            if (this.buyTotal) {
                // this.buyTotal = numeral(buyTotal / _amount).format('0.00')
                this.buyPrice = (this.buyTotal / _amount)
            }
        },

        // buyPrice: function (_price) {
        //     if (!_price || !this.buyAmount) {
        //         return null
        //     }

        //     // this.buyTotal = numeral(_price * this.buyAmount).format('0.00')
        //     this.buyTotal = (_price * this.buyAmount).toFixed(8)
        // },

        // buyTotal: function (_total) {
        //     if (!_total || !this.buyAmount) {
        //         return null
        //     }

        //     // this.buyPrice = numeral(_total / this.buyAmount).format('0.00')
        //     this.buyPrice = (_total / this.buyAmount).toFixed(8)
        // },
    },
    computed: {
        ...mapGetters([
            //
        ]),

        // ...mapGetters('tokens', [
        //     'getToken'
        // ]),

        tokenName() {
            if (!this.token) {
                return null
            }

            return this.token.title
        },

        tokenSymbol() {
            if (!this.token) {
                return null
            }

            return this.token.symbol
        },

        // buyTotal() {
        //     if (!this.buyAmount || !this.buyPrice) {
        //         return null
        //     }

        //     return numeral(this.buyAmount * this.buyPrice).format('$0.00')
        // },

        // sellTotal() {
        //     if (!this.sellAmount || !this.sellPrice) {
        //         return null
        //     }

        //     return numeral(this.sellAmount * this.sellPrice).format('$0.00')
        // },

    },
    methods: {
        ...mapActions([
            'createEthOrder'
        ]),

        buyOrder() {
            // console.log('Ready to buy')
        },

        sellOrder() {
            // console.log('Ready to sell')
        },

        updateBuyPrice() {
            if (!this.buyTotal || !this.buyAmount) {
                return null
            }

            // this.buyPrice = numeral(_total / this.buyAmount).format('0.00')
            this.buyPrice = (this.buyTotal / parseFloat(this.buyAmount)).toFixed(8)
        },

        updateBuyTotal() {
            if (!this.buyPrice || !this.buyAmount) {
                return null
            }

            // this.buyTotal = numeral(_price * this.buyAmount).format('0.00')
            this.buyTotal = (this.buyPrice * parseFloat(this.buyAmount))
        },

        updateSellPrice() {
            if (!this.sellTotal || !this.sellAmount) {
                return null
            }

            // this.sellPrice = numeral(_total / this.sellAmount).format('0.00')
            this.sellPrice = (this.sellTotal / parseFloat(this.sellAmount)).toFixed(8)
        },

        updateSellTotal() {
            if (!this.sellPrice || !this.sellAmount) {
                return null
            }

            // this.sellTotal = numeral(_price * this.sellAmount).format('0.00')
            this.sellTotal = (this.sellPrice * parseFloat(this.sellAmount))
        },
    },
    created: async function () {
        /* Retrieve current token. */
        // this.token = await this.getToken('0x505A442B3E3E9AEDF06D54572a295F8D64f8F582')
        // console.log('CURRENT TOKEN', this.token)

        this.expirationTime = 24
        this.expirationMeasure = 'hours'
    },
    mounted: function () {
        //
    },
}
</script>

<style scoped>
/*  */
</style>
