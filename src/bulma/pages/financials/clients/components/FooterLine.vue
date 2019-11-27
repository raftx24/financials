<template>
    <tfoot class="invoice-line">
    <tr class="has-background-light">
        <td class="is-bold has-text-right">
            <a class="button is-success"
               :class="{'is-loading':invoice.processing}"
               @click="$emit('add')">
                <fa icon="plus"/>
            </a>
        </td>
        <td/>
        <td class="has-text-right is-bold">
            <div v-if="form" class="total-quantity">
                {{ form.field('quantity').value }}
            </div>
        </td>
        <td colspan="2"/>
        <td v-if="form"
            class="has-text-right is-bold total-price">
            {{ form.field('vat').value | numberFormat(2) }}
        </td>
        <td v-if="form"
            class="has-text-right is-bold total-price">
            {{ form.field('discount').value | numberFormat(2) }}
        </td>
        <td v-if="form"
            class="has-text-right is-bold total-price">
            {{ form.field('amount').value | numberFormat(2) }}
        </td>
        <td/>
    </tr>
    <tr class="has-background-light grand-total">
        <td colspan="4"/>
        <td v-if="form"
            class="has-text-right is-bold total-price" colspan="3">
            {{ i18n('Grand Total') }}
        </td>
        <td v-if="form"
            class="has-text-right is-bold total-price">
            {{ form.field('total').value | numberFormat(2) }}
        </td>
        <td/>
    </tr>
    </tfoot>
</template>

<script>
export default {
    inject: ['invoice', 'i18n'],

    computed: {
        form() {
            return this.invoice.form;
        },
    },
};
</script>

<style>
    .invoice-line tr.total-price td, .invoice-line tr.grand-total td {
        border: none;
    }
    .total-price, .total-quantity {
        font-family: monospace;
        font-size: 1em;
        text-align: right;
    }

    .grand-total {
        font-family: monospace;
        font-size: 1.1em;
        text-align: right;
    }
    .total-quantity {
        padding-right: 0.5em;
    }
</style>
