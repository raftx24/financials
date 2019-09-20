<template>
    <thead>
    <tr class="has-background-light invoice-line-header">
        <th class="index">
            #
        </th>
        <th class="description">
            {{ i18n('Description') }}
        </th>
        <th>
            {{ i18n('Quantity') }}
        </th>
        <th>
            {{ i18n('MU') }}
        </th>
        <th class="price">
            {{ i18n('Price') }}
        </th>
        <th>
            {{ i18n('VAT') }}
        </th>
        <th>
            {{ i18n('Discount') }}
        </th>
        <th>
            {{ i18n('Amount') }}
        </th>

        <th/>
    </tr>
    </thead>
</template>

<script>
export default {
    inject: ['i18n'],
};
</script>

<style lang="scss">
    tr.invoice-line-header {
        th {
            text-align: center !important;
        }

        th.description {
            width: 50%;
        }

        th.price {
            width: 15%;
        }

        th.index {
            width: 3%;
        }

    }
</style>
