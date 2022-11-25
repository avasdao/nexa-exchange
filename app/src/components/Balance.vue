<template>
    <div class="component">
        <div class="component-header">
            <span class="text-primary">Nexa</span> <span class="text-warning">Exchange</span> Balance
        </div>

        <div id="balance">
            <div class="component-tabs nav-header">
                <ul class="nav" role="tablist">
                    <li class="nav-item">
                        <a role="tab" data-toggle="tab" href="#deposit" class="active nav-link" aria-controls="deposit" aria-selected="true">
                            Deposit
                        </a>
                    </li>

                    <li class="nav-item">
                        <a role="tab" data-toggle="tab" href="#withdraw" class="nav-link" aria-controls="withdraw" aria-selected="false">
                            Withdraw
                        </a>
                    </li>

                    <li class="nav-item">
                        <a role="tab" data-toggle="tab" href="#staking" class="nav-link" aria-controls="staking" aria-selected="false">
                            Staking/Pools
                        </a>
                    </li>
                </ul>
            </div>

            <div>
                <div class="tab-content">

                    <!-- DEPOSIT -->
                    <div role="tabpanel" class="tab-pane fade show active" id="deposit">
                        <table class="table table-borderless table-balances">
                            <thead>
                                <tr>
                                    <th style="width:50%">Token name</th>
                                    <th style="width:25%">Wallet</th>
                                    <th style="width:25%">Exchange</th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr>
                                    <td>
                                        <a href="javascript://" class="nowrap">{{tokenName}}<span class="d-md-none"> ({{tokenSymbol}})</span></a>
                                    </td>

                                    <td>
                                        <span>{{tokenBalanceDisplay}}</span>
                                    </td>

                                    <td>
                                        <span>{{exchangeBalanceDisplay}}</span>
                                    </td>
                                </tr>

                                <tr class="">
                                    <td>
                                        <div class="form-group">
                                            <input type="number" class="form-control form-control-sm" id="cacheInBaseToken" placeholder="Amount" v-model="depositAmount">
                                        </div>
                                    </td>
                                    <td colspan="2">
                                        <button type="button" class="btn btn-info btn-sm btn-block" @click="depositTokens">
                                            Deposit
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <!-- WITHDRAW -->
                    <div role="tabpanel" class="tab-pane fade" id="withdraw">
                        <table class="table table-borderless table-balances">
                            <thead>
                                <tr>
                                    <th style="width:50%">Token name</th>
                                    <th style="width:25%" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="This is the balance in your personal Ethereum wallet, which you have connected to Nexa Exchange in the account dropdown (upper right).">Wallet</th>
                                    <th style="width:25%" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="This is the balance you have deposited from your personal Ethereum wallet to the Nexa Exchange smart contract.">Exchange</th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr>
                                    <td>
                                        <a href="javascript://" class="nowrap">{{tokenName}}<span class="d-md-none"> ({{tokenSymbol}})</span></a>
                                    </td>
                                    <td>
                                        <span data-toggle="tooltip" data-placement="bottom" title="" data-original-title="0.000000000000">0.0000</span>
                                    </td>
                                    <td>
                                        <span data-toggle="tooltip" data-placement="bottom" title="" data-original-title="0.000000000000">0.0000</span>
                                    </td>
                                </tr>

                                <!-- <tr class="balance-form"> -->
                                <tr class="">
                                    <td>
                                        <div class="form-group">
                                            <input type="number" class="form-control form-control-sm" id="cacheInBaseToken" placeholder="Amount">
                                        </div>
                                    </td>
                                    <td colspan="2">
                                        <button type="button" class="btn btn-info btn-sm btn-block" @click="withdraw">
                                            Withdraw
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <!-- STAKING -->
                    <div role="tabpanel" class="tab-pane fade" id="staking">
                        <table class="table table-borderless table-balances">
                            <thead>
                                <tr>
                                    <th style="width:50%">Token name</th>
                                    <th style="width:25%" data-toggle="tooltip" data-placement="bottom" title="">Wallet</th>
                                    <th style="width:25%" data-toggle="tooltip" data-placement="bottom" title="">Exchange</th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr>
                                    <td>
                                        <a href="javascript://" class="nowrap">{{tokenName}}
                                            <span class="d-md-none">
                                                ({{tokenSymbol}})
                                            </span>
                                        </a>
                                    </td>

                                    <td>
                                        <span data-toggle="tooltip" data-placement="bottom" title="" data-original-title="0.000000000000">
                                            0.0000
                                        </span>
                                    </td>

                                    <td>
                                        <span data-toggle="tooltip" data-placement="bottom" title="" data-original-title="0.000000000000">
                                            0.0000
                                        </span>
                                    </td>
                                </tr>

                                <tr>
                                    <td colspan="3">
                                        <div class="form-row balance-inline-form">
                                            <div class="col-sm-4 form-group">
                                                <input
                                                    type="number"
                                                    class="form-control form-control-sm"
                                                    id="validationDefault01"
                                                    value=""
                                                    placeholder="Amt"
                                                >
                                            </div>

                                            <div class="col-sm-5 form-group">
                                                <input
                                                    type="text"
                                                    class="form-control form-control-sm"
                                                    id="validationDefault02"
                                                    value=""
                                                    placeholder="Addr"
                                                >
                                            </div>

                                            <div class="col-sm-3">
                                                <button class="btn btn-info btn-sm btn-block">
                                                    Stake
                                                </button>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
/* Initialize vuex. */
import { mapActions, mapGetters } from 'vuex'

/* Import modules. */
import MobileDetect from 'mobile-detect'
import numeral from 'numeral'
import Swal from 'sweetalert2'

export default {
    props: {
        // msg: String
    },
    data: () => {
        return {
            token: null,
            tokenBalance: null,
            exchangeBalance: null,
            depositAmount: null,
        }
    },
    computed: {
        ...mapGetters([
            //
        ]),

        // ...mapGetters('tokens', [
        //     'getExchangeBalance',
        //     // 'getWalletBalance',
        //     'getToken',
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

        tokenBalanceDisplay() {
            if (!this.tokenBalance) {
                return '0.0000'
            }

            const units = this.tokenBalance.units
            const decimals = this.tokenBalance.decimals

            const amount = parseFloat(units / (1 * 10**decimals))

            return numeral(amount).format('0,0[.]0000')
        },

        exchangeBalanceDisplay() {
            if (!this.exchangeBalance) {
                return '0.0000'
            }

            const units = this.exchangeBalance.units
            const decimals = this.exchangeBalance.decimals

            const amount = parseFloat(units / (1 * 10**decimals))

            return numeral(amount).format('0,0[.]0000')
        },

    },
    methods: {
        ...mapActions([
            // 'deposit'
        ]),

        // ...mapActions('tokens', [
        //     'deposit'
        // ]),

        ...mapActions('utils', [
            'toast',
        ]),

        depositTokens() {
            if (typeof this.depositAmount === 'undefined' || this.depositAmount === 0 || this.depositAmount === null) {
                // this.toast(['Error!', 'Please enter a token amount', 'danger'])

                return Swal.fire({
                    title: 'Deposit Error!',
                    text: `Please enter the amount of tokens you want to deposit.`,
                    icon: 'error',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'Okay'
                })
            }

            /* Build deposit package. */
            // const pkg = {
            //     address: '0x505A442B3E3E9AEDF06D54572a295F8D64f8F582',
            //     amount: this.depositAmount,
            // }

            /* Deposit tokens. */
            // this.deposit(pkg) // KBBQ Token (Ropsten)

            const md = new MobileDetect(window.navigator.userAgent)
            return Swal.fire({
                title: 'Device Info',
                text: `Mobile: ${md.mobile()}`,
                icon: 'info',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Okay'
            })
        },

        withdraw() {
            // console.log('Ready to withdraw')

        },

    },
    created: async function () {
        /* Retrieve current token. */
        // this.token = await this.getToken('0x505A442B3E3E9AEDF06D54572a295F8D64f8F582')
        // console.log('CURRENT TOKEN', this.token)

        /* Retrieve account balance. */
        // this.tokenBalance = await this.getWalletBalance('0x505A442B3E3E9AEDF06D54572a295F8D64f8F582', '0x830ad555fCe0547782E14d67d22002082916e660')
        // console.log('BALANCE', this.tokenBalance)

        /* Retrieve exchange balance. */
        // this.exchangeBalance = await this.getExchangeBalance('0x505A442B3E3E9AEDF06D54572a295F8D64f8F582', '0x830ad555fCe0547782E14d67d22002082916e660')
        // console.log('BALANCE', this.exchangeBalance)
    },
    mounted: function () {
        //
    },
}
</script>

<style scoped>
/*  */
</style>
