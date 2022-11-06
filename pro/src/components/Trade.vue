<template>
    <div class="component">
        <div class="component-header text-warning">Buy | Sell</div>

        <div class="component-tabs nav-header">
            <ul class="nav" role="tablist">
                <li class="nav-item">
                    <a role="tab" data-toggle="tab" href="#buy" class="active nav-link" aria-controls="buy" aria-selected="true">Buy Order</a>
                </li>

                <li class="nav-item">
                    <a role="tab" data-toggle="tab" href="#sell" class="nav-link" aria-controls="sell" aria-selected="false">Sell Order</a>
                </li>
            </ul>
        </div>

        <div class="tab-content">
            <div role="tabpanel" class="tab-pane fade show active" id="buy">
                <form>
                    <div class="form-group">
                        <label for="buyAmount">Amount of {{tokenSymbol}} tokens to buy</label>
                        <div class="input-group">
                            <input type="number" class="form-control form-control-sm" id="buyAmount" v-model="buyAmount">
                            <div class="input-group-append">
                                <span class="input-group-text">{{tokenSymbol}}</span>
                            </div>
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="buyPrice">Price per {{tokenSymbol}} token</label>
                        <div class="input-group">
                            <input type="number" class="form-control form-control-sm" id="buyPrice" v-model="buyPrice">
                            <div class="input-group-append">
                                <span class="input-group-text">USDT</span>
                            </div>
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="buyTotal">Total order value</label>
                        <div class="input-group">
                            <input type="text" id="buyTotal" class="form-control form-control-sm" :value="buyTotal" readonly>
                            <div class="input-group-append">
                                <span class="input-group-text">USDT</span>
                            </div>
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="buyExpires" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="The number of Ethereum blocks until the order automatically expires. (14 seconds per block.)">Order expiration time</label>
                        <div class="input-group">
                            <input type="text" class="form-control form-control-sm" id="buyExpires" :value="expirationTime" readonly>
                            <div class="input-group-append">
                                <span class="input-group-text">{{expirationMeasure}}</span>
                            </div>
                        </div>
                    </div>

                    <span class="text-warning"></span>

                    <div class="form-group">
                        <button type="button" class="btn btn-success btn-sm btn-block" @click="buyOrder">Create Buy Order</button>
                    </div>
                </form>
            </div> <!-- tabpanel -->

            <div role="tabpanel" class="tab-pane fade" id="sell">
                <form>
                    <div class="form-group">
                        <label for="sellAmount">Amount of {{tokenSymbol}} tokens to sell</label>
                        <div class="input-group">
                            <input type="number" class="form-control form-control-sm" id="sellAmount" v-model="sellAmount">
                            <div class="input-group-append">
                                <span class="input-group-text">{{tokenSymbol}}</span>
                            </div>
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="sellPrice">Price per {{tokenSymbol}} token</label>
                        <div class="input-group">
                            <input type="number" class="form-control form-control-sm" id="sellPrice" v-model="sellPrice">
                            <div class="input-group-append">
                                <span class="input-group-text">USDT</span>
                            </div>
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="sellTotal">Total order value</label>
                        <div class="input-group">
                            <input type="text" class="form-control form-control-sm" id="sellTotal" :value="sellTotal" readonly>
                            <div class="input-group-append">
                                <span class="input-group-text">USDT</span>
                            </div>
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="sellExpires" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="The number of Ethereum blocks until the order automatically expires. (14 seconds per block.)">Order expiration time</label>
                        <div class="input-group">
                            <input type="text" class="form-control form-control-sm" id="sellExpires" :value="expirationTime" readonly>
                            <div class="input-group-append">
                                <span class="input-group-text">{{expirationMeasure}}</span>
                            </div>
                        </div>
                    </div>

                    <span class="text-warning"></span>

                    <div class="form-group">
                        <button type="button" class="btn btn-danger btn-sm btn-block" @click="sellOrder">Create Sell Order</button>
                    </div>
                </form>

            </div> <!-- tabpanel -->

        </div> <!-- tab-content -->

    </div> <!-- component -->
</template>

<script>
/* Initialize vuex. */
import { mapActions, mapGetters } from 'vuex'

/* Import modules. */
import numeral from 'numeral'

export default {
    props: {
        // msg: String
    },
    data: () => {
        return {
            token: null,
            buyAmount: null,
            buyPrice: null,
            sellAmount: null,
            sellPrice: null,

            expirationTime: null,
            expirationMeasure: null,
        }
    },
    computed: {
        ...mapGetters([
            //
        ]),

        ...mapGetters('tokens', [
            'getToken'
        ]),

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

        buyTotal() {
            if (!this.buyAmount || !this.buyPrice) {
                return null
            }

            return numeral(this.buyAmount * this.buyPrice).format('$0.00')
        },

        sellTotal() {
            if (!this.sellAmount || !this.sellPrice) {
                return null
            }

            return numeral(this.sellAmount * this.sellPrice).format('$0.00')
        },

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

    },
    created: async function () {
        /* Retrieve current token. */
        this.token = await this.getToken('0x505A442B3E3E9AEDF06D54572a295F8D64f8F582')
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
