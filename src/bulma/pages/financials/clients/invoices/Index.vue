<template>
    <div class="wrapper">
        <div class="columns is-centered is-multiline">
            <div class="column is-5">
                <client-filter :params="params"
                    :filters="filters.client_invoices"/>
            </div>
            <div class="column is-narrow">
                <enso-date-filter class="box raises-on-hover"
                    :title="i18n('Due Date')"
                    default="thirtyDays"
                    v-model="params.dateInterval"
                    @update="
                        intervals.client_invoices.due_date.max = $event.max;
                        intervals.client_invoices.due_date.min = $event.min
                    "/>
            </div>
            <div class="column is-narrow">
                <boolean-filter class="box raises-on-hover"
                    v-model="filters.client_invoices.is_cancelled"
                    icons
                    :title="i18n('Cancelled')"/>
            </div>
            <div class="column is-narrow">
                <enso-filter class="box raises-on-hover"
                    v-model="filters.client_invoices.type"
                    hide-off
                    :options="enums.invoiceTypes._filter()"
                    :title="i18n('Type')"/>
            </div>
        </div>
        <filter-state :api-version="apiVersion"
            name="client_invoice_filters"
            :filters="filters"
            :intervals="intervals"
            :params="params"
            ref="filterState"/>
        <enso-table class="box is-paddingless raises-on-hover"
            id="clientInvoices"
            :filters="filters"
            :intervals="intervals"
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
import {
    BooleanFilter, EnsoDateFilter, EnsoFilter,
} from '@enso-ui/filters/bulma';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faFilePdf, faBuilding, faUserTie, faFileInvoice } from '@fortawesome/free-solid-svg-icons';
import { FilterState } from '@enso-ui/filters/renderless';
import ClientFilter from '../components/ClientFilter.vue';

library.add(faFilePdf, faBuilding, faUserTie, faFileInvoice);

export default {
    name: 'Index',

    components: {
        EnsoTable, BooleanFilter, EnsoDateFilter, EnsoFilter, ClientFilter, FilterState,
    },

    inject: ['i18n', 'route'],

    data: () => ({
        apiVersion: 1,
        filters: {
            client_invoices: {
                is_cancelled: false,
                type: null,
                person_id: null,
                company_id: null,
            },
        },
        intervals: {
            client_invoices: {
                due_date: {
                    min: null,
                    max: null,
                    dbDateFormat: 'Y-m-d',
                },
            },
        },
        params: {
            client: null,
            dateInterval: 'thirtyDays',
        },
    }),

    computed: {
        ...mapState(['enums']),
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
            window.open(this.route('financials.clients.invoices.pdf', { invoice: $event.dtRowId }), '_blank');
        },
    },
};

</script>
