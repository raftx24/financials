<template>
    <div class="wrapper">
        <div class="columns is-centered"
            v-if="ready">
            <div class="column is-4">
                <enso-select-filter class="box raises-on-hover"
                    v-model="filters.supplier_invoices.supplier_id"
                    source="administration.companies.options"
                    :name="i18n('Supplier')"/>
            </div>
            <div class="column is-narrow">
                <enso-date-filter class="box raises-on-hover"
                    v-model="params.dateInterval"
                    default="thirtyDays"
                    :name="i18n('Due Date')"
                    :interval="intervals"/>
            </div>
            <div class="column is-narrow">
                <boolean-filter class="box raises-on-hover"
                    v-model="filters.supplier_invoices.is_cancelled"
                    icons
                    :name="i18n('Cancelled')"/>
            </div>
        </div>
        <enso-table class="box is-paddingless raises-on-hover"
            id="outInvoices"
            :filters="filters"
            :intervals="tableIntervals"
            @reset="$refs.filterState.reset()"/>
        <filter-state :api-version="apiVersion"
            name="supplier_invoice_filters"
            :filters="filters"
            :intervals="intervals"
            :params="params"
            @ready="ready = true"
            ref="filterState"/>
    </div>
</template>

<script>
import { mapState } from 'vuex';
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
        apiVersion: 1.1,
        ready: false,
        supplierParams: { is_supplier: true },
        filters: {
            supplier_invoices: {
                is_cancelled: false,
                supplier_id: null,
            },
        },
        intervals: {
            min: null,
            max: null,
        },
        params: {
            dateInterval: 'thirtyDays',
        },
    }),

    computed: {
        ...mapState(['meta']),
        tableIntervals() {
            return {
                supplier_invoices: {
                    due_date: {
                        min: this.intervals.min,
                        max: this.intervals.max,
                        dateFormat: null,
                    },
                },
            };
        },
    },

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
