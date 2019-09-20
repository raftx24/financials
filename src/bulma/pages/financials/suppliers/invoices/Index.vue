<template>
    <div class="wrapper">
        <div class="columns is-centered">
            <div class="column is-4">
                <enso-select-filter class="box raises-on-hover"
                    v-model="filters.supplier_invoices.supplier_id"
                    source="administration.companies.options"
                    title="Supplier"/>
            </div>
            <div class="column is-narrow">
                <enso-date-filter class="box raises-on-hover"
                    :title="i18n('Due Date')"
                    default="thirtyDays"
                    v-model="params.dateInterval"
                    @update="
                        intervals.supplier_invoices.due_date.max = $event.max;
                        intervals.supplier_invoices.due_date.min = $event.min
                    "/>
            </div>
            <div class="column is-narrow">
                <boolean-filter class="box raises-on-hover"
                    v-model="filters.supplier_invoices.is_cancelled"
                    icons
                    :title="i18n('Cancelled')"/>
            </div>
        </div>
        <filter-state :api-version="apiVersion"
            name="supplier_invoice_filters"
            :filters="filters"
            :intervals="intervals"
            :params="params"
            ref="filterState"/>
        <enso-table class="box is-paddingless raises-on-hover"
            id="outInvoices"
            :filters="filters"
            :intervals="intervals"
            @reset="$refs.filterState.reset()"/>
    </div>
</template>

<script>

import { EnsoTable } from '@enso-ui/tables/bulma';
import {
    BooleanFilter, EnsoDateFilter, EnsoSelectFilter,
} from '@enso-ui/filters/bulma';
import FilterState from '@enso-ui/commercial/src/bulma/pages/components/FilterState';

export default {
    name: 'Index',

    components: {
        EnsoTable, BooleanFilter, EnsoDateFilter, EnsoSelectFilter, FilterState,
    },

    inject: ['i18n'],

    data: () => ({
        apiVersion: 1,
        supplierParams: { is_supplier: true },
        filters: {
            supplier_invoices: {
                is_cancelled: false,
                supplier_id: null,
            },
        },
        intervals: {
            supplier_invoices: {
                due_date: {
                    min: null,
                    max: null,
                    dbDateFormat: 'Y-m-d',
                },
            },
        },
        params: {
            dateInterval: 'thirtyDays',
        },
    }),

    methods: {
        create(mode) {
            this.$router.push({
                name: 'financials.clients.invoices.create',
                params: { mode },
            });
        },
    },
};

</script>
