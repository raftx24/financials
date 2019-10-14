<template>
    <div class="wrapper">
        <div class="columns is-centered"
            v-if="ready">
            <div class="column is-4">
                <enso-select-filter class="box raises-on-hover"
                    v-model="filters.supplier_invoices.supplier_id"
                    source="administration.companies.options"
                    :label="i18n('Supplier')"/>
            </div>
            <div class="column is-narrow">
                <enso-date-filter class="box raises-on-hover"
                    v-model="params.dateInterval"
                    default="thirtyDays"
                    :label="i18n('Due Date')"
                    :interval="intervals.supplier_invoices.due_date"/>
            </div>
            <div class="column is-narrow">
                <boolean-filter class="box raises-on-hover"
                    v-model="filters.supplier_invoices.is_cancelled"
                    icons
                    :label="i18n('Cancelled')"/>
            </div>
        </div>
        <filter-state :api-version="apiVersion"
            name="supplier_invoice_filters"
            :filters="filters"
            :intervals="intervals"
            :params="params"
            @ready="ready = true"
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
import { BooleanFilter, EnsoDateFilter, EnsoSelectFilter } from '@enso-ui/filters/bulma';
import { FilterState } from '@enso-ui/filters/renderless';

export default {
    name: 'Index',

    components: {
        EnsoTable, BooleanFilter, EnsoDateFilter, EnsoSelectFilter, FilterState,
    },

    inject: ['i18n'],

    data: () => ({
        apiVersion: 1,
        ready: false,
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
                    dateFormat: null,
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
