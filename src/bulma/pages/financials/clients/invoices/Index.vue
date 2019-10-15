<template>
    <div class="wrapper">
        <div class="columns is-centered is-multiline"
            v-if="ready">
            <div class="column is-5">
                <client-filter :params="params"
                    :filters="filters.client_invoices"/>
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
                    v-model="filters.client_invoices.is_cancelled"
                    icons
                    :name="i18n('Cancelled')"/>
            </div>
            <div class="column is-narrow">
                <enso-filter class="box raises-on-hover"
                    v-model="filters.client_invoices.type"
                    hide-off
                    :options="enums.invoiceTypes._filter()"
                    :name="i18n('Type')"/>
            </div>
        </div>
        <filter-state :api-version="apiVersion"
            name="client_invoice_filters"
            :filters="filters"
            :intervals="intervals"
            :params="params"
            @ready="ready = true"
            ref="filterState"/>
        <enso-table class="box is-paddingless raises-on-hover"
            id="clientInvoices"
            :filters="filters"
            :intervals="tableIntervals"
            :params="params"
            @create-company="create('company')"
            @create-individual="create('person')"
            @download-pdf="downloadPdf"
            @reset="$refs.filterState.reset()"/>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import { EnsoTable } from '@enso-ui/tables/bulma';
import { BooleanFilter, EnsoDateFilter, EnsoFilter } from '@enso-ui/filters/bulma';
import { FilterState } from '@enso-ui/filters/renderless';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
    faFilePdf, faBuilding, faUserTie, faFileInvoice,
} from '@fortawesome/free-solid-svg-icons';
import ClientFilter from '../components/ClientFilter.vue';

library.add(faFilePdf, faBuilding, faUserTie, faFileInvoice);

export default {
    name: 'Index',

    components: {
        EnsoTable, BooleanFilter, EnsoDateFilter, EnsoFilter, ClientFilter, FilterState,
    },

    inject: ['i18n', 'route'],

    data: () => ({
        apiVersion: 1.1,
        ready: false,
        filters: {
            client_invoices: {
                is_cancelled: false,
                type: null,
                person_id: null,
                company_id: null,
            },
        },
        intervals: {
            min: null,
            max: null,
        },
        params: {
            client: null,
            dateInterval: 'thirtyDays',
        },
    }),

    computed: {
        ...mapState(['enums']),
        ...mapState(['meta']),
        tableIntervals() {
            return {
                client_invoices: {
                    due_date: {
                        min: this.intervals.min,
                        max: this.intervals.max,
                        dateFormat: this.meta && this.meta.dateTimeFormat,
                    },
                },
            };
        },
    },

    mounted() {
        this.filters.client_invoices.type = this.enums.invoiceTypes.Fiscal;
    },

    methods: {
        create(type) {
            this.$router.push({
                name: 'financials.clients.invoices.create',
                params: { type },
            });
        },

        downloadPdf($event) {
            window.open(this.route('financials.clients.invoices.pdf', { invoice: $event.id }), '_blank');
        },
    },
};

</script>
