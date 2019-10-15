<template>
    <div class="wrapper">
        <div class="columns is-centered is-multiline"
            v-if="ready">
            <div class="column is-4">
                <client-filter :params="params"
                    :filters="filters.client_payments"/>
            </div>
            <div class="column is-narrow">
                <enso-date-filter class="box raises-on-hover"
                    v-model="params.dateInterval"
                    default="thirtyDays"
                    :name="i18n('Due Date')"
                    :interval="intervals.client_payments.due_date"/>
            </div>
            <div class="column is-narrow">
                <boolean-filter class="box raises-on-hover"
                    v-model="filters.client_payments.is_cancelled"
                    icons
                    :name="i18n('Cancelled')"/>
            </div>
            <div class="column is-6-tablet is-4-desktop is-3-widescreen">
                <enso-select-filter class="box raises-on-hover"
                    v-model="filters.client_payments.type"
                    multiple
                    :options="enums.paymentTypes._select()"
                    :name="i18n('Type')"/>
            </div>
        </div>
        <filter-state :api-version="apiVersion"
            name="client_payment_filters"
            :filters="filters"
            :intervals="intervals"
            :params="params"
            @ready="ready = true"
            ref="filterState"/>
        <enso-table class="box is-paddingless raises-on-hover"
            :filters="filters"
            :intervals="intervals"
            :params="params"
            @create-company="create('company')"
            @create-individual="create('person')"
            id="in_payments"
            @reset="$refs.filterState.reset()"
            @download-pdf="downloadPdf"/>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import { EnsoTable } from '@enso-ui/tables/bulma';
import { BooleanFilter, EnsoDateFilter, EnsoSelectFilter } from '@enso-ui/filters/bulma';
import { FilterState } from '@enso-ui/filters/renderless';
import { faFilePdf, faBuilding, faUserTie } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import ClientFilter from '../components/ClientFilter.vue';

library.add(faFilePdf, faBuilding, faUserTie);

export default {
    name: 'Index',

    components: {
        EnsoTable, BooleanFilter, EnsoDateFilter, ClientFilter, EnsoSelectFilter, FilterState,
    },

    inject: ['i18n', 'route'],

    data: () => ({
        apiVersion: 1.1,
        ready: false,
        filters: {
            client_payments: {
                is_cancelled: false,
                type: [],
                person_id: null,
                company_id: null,
            },
        },
        intervals: {
            client_payments: {
                due_date: {
                    min: null,
                    max: null,
                    dateFormat: null,
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

    methods: {
        create(type) {
            this.$router.push({
                name: 'financials.clients.payments.create',
                params: { type },
            });
        },
        downloadPdf($event) {
            if ($event.type === 'Receipt') {
                window.open(this.route('financials.clients.payments.pdf', { payment: $event.id }), '_blank');

                return;
            }

            this.$toastr.warning('Pdf is only available for receipts');
        },
    },
};
</script>
