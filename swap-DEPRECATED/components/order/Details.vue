<script setup lang="ts">
/* Define properties. */
// https://vuejs.org/guide/components/props.html#props-declaration
const props = defineProps({
    data: {
        type: [Object],
    },
})

// onMounted(() => {
//     console.log('Mounted!')
//     // Now it's safe to perform setup operations.
// })

// onBeforeUnmount(() => {
//     console.log('Before Unmount!')
//     // Now is the time to perform all cleanup operations.
// })

</script>

<template>
    <table class="mt-16 w-full whitespace-nowrap text-left text-sm leading-6">
        <colgroup>
            <col class="w-full" />
            <col />
            <col />
            <col />
        </colgroup>

        <thead class="border-b border-gray-200 text-gray-900">
            <tr>
                <th scope="col" class="px-0 py-3 font-semibold">
                    Order Details
                </th>
                <th scope="col" class="hidden py-3 pl-8 pr-0 text-right font-semibold sm:table-cell">Hours</th>
                <th scope="col" class="hidden py-3 pl-8 pr-0 text-right font-semibold sm:table-cell">Rate</th>
                <th scope="col" class="py-3 pl-8 pr-0 text-right font-semibold">Price</th>
            </tr>
        </thead>

        <tbody>
            <tr class="border-b border-gray-100">
                <td class="max-w-0 px-0 py-5 align-top">
                    <div class="truncate font-medium text-gray-900">Logo redesign</div>
                    <div class="truncate text-gray-500">New logo and digital asset playbook.</div>
                </td>
                <td class="hidden py-5 pl-8 pr-0 text-right align-top tabular-nums text-gray-700 sm:table-cell">20.0</td>
                <td class="hidden py-5 pl-8 pr-0 text-right align-top tabular-nums text-gray-700 sm:table-cell">$100.00</td>
                <td class="py-5 pl-8 pr-0 text-right align-top tabular-nums text-gray-700">$2,000.00</td>
            </tr>

            <tr class="border-b border-gray-100">
                <td class="max-w-0 px-0 py-5 align-top">
                    <div class="truncate font-medium text-gray-900">Website redesign</div>
                    <div class="truncate text-gray-500">Design and program new company website.</div>
                </td>
                <td class="hidden py-5 pl-8 pr-0 text-right align-top tabular-nums text-gray-700 sm:table-cell">52.0</td>
                <td class="hidden py-5 pl-8 pr-0 text-right align-top tabular-nums text-gray-700 sm:table-cell">$100.00</td>
                <td class="py-5 pl-8 pr-0 text-right align-top tabular-nums text-gray-700">$5,200.00</td>
            </tr>

            <tr class="border-b border-gray-100">
                <td class="max-w-0 px-0 py-5 align-top">
                    <div class="truncate font-medium text-gray-900">Business cards</div>
                    <div class="truncate text-gray-500">Design and production of 3.5&quot; x 2.0&quot; business cards.</div>
                </td>
                <td class="hidden py-5 pl-8 pr-0 text-right align-top tabular-nums text-gray-700 sm:table-cell">12.0</td>
                <td class="hidden py-5 pl-8 pr-0 text-right align-top tabular-nums text-gray-700 sm:table-cell">$100.00</td>
                <td class="py-5 pl-8 pr-0 text-right align-top tabular-nums text-gray-700">$1,200.00</td>
            </tr>

            <tr class="border-b border-gray-100">
                <td class="max-w-0 px-0 py-5 align-top">
                    <div class="truncate font-medium text-gray-900">T-shirt design</div>
                    <div class="truncate text-gray-500">Three t-shirt design concepts.</div>
                </td>
                <td class="hidden py-5 pl-8 pr-0 text-right align-top tabular-nums text-gray-700 sm:table-cell">4.0</td>
                <td class="hidden py-5 pl-8 pr-0 text-right align-top tabular-nums text-gray-700 sm:table-cell">$100.00</td>
                <td class="py-5 pl-8 pr-0 text-right align-top tabular-nums text-gray-700">$400.00</td>
            </tr>
        </tbody>

        <tfoot>
            <tr>
                <th scope="row" class="px-0 pb-0 pt-6 font-normal text-gray-700 sm:hidden">Subtotal</th>
                <th scope="row" colspan="3" class="hidden px-0 pb-0 pt-6 text-right font-normal text-gray-700 sm:table-cell">Subtotal</th>
                <td class="pb-0 pl-8 pr-0 pt-6 text-right tabular-nums text-gray-900">$8,800.00</td>
            </tr>

            <tr>
                <th scope="row" class="pt-4 font-normal text-gray-700 sm:hidden">Tax</th>
                <th scope="row" colspan="3" class="hidden pt-4 text-right font-normal text-gray-700 sm:table-cell">Tax</th>
                <td class="pb-0 pl-8 pr-0 pt-4 text-right tabular-nums text-gray-900">$1,760.00</td>
            </tr>

            <tr>
                <th scope="row" class="pt-4 font-semibold text-gray-900 sm:hidden">Total</th>
                <th scope="row" colspan="3" class="hidden pt-4 text-right font-semibold text-gray-900 sm:table-cell">Total</th>
                <td class="pb-0 pl-8 pr-0 pt-4 text-right font-semibold tabular-nums text-gray-900">$10,560.00</td>
            </tr>
        </tfoot>
    </table>
</template>
