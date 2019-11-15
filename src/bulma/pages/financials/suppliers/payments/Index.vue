<template>
    <div class="wrapper">
        <div class="columns is-centered"
            v-if="ready">
            <div class="column is-4">
                <enso-select-filter class="box raises-on-hover"
                    v-model="filters.supplier_payments.supplier_id"
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
                    v-model="filters.supplier_payments.is_cancelled"
                    icons
                    :name="i18n('Cancelled')"/>
            </div>
            <div class="column is-6-tablet is-4-desktop is-3-widescreen">
                <enso-select-filter class="box raises-on-hover"
                    v-model="filters.supplier_payments.type"
                    multiple
                    :options="enums.paymentTypes._select()"
                    :name="i18n('Types')"/>
            </div>
        </div>
        <enso-table class="box is-paddingless raises-on-hover"
            :filters="filters"
            :intervals="tableIntervals"
            id="out_payments"
            @reset="$refs.filterState.reset()"/>
        <filter-state :api-version="apiVersion"
            name="supplier_payment_filters"
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
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBuilding, faUserTie } from '@fortawesome/free-solid-svg-icons';

library.add(faBuilding, faUserTie);

export default {
    name: 'Index',

    components: {
        EnsoTable, BooleanFilter, EnsoDateFilter, EnsoSelectFilter, FilterState,
    },

    inject: ['i18n'],

    data: () => ({
        apiVersion: 1.1,
        ready: false,
        clientSource: null,
        clientId: null,
        filters: {
            supplier_payments: {
                type: [],
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
        ...mapState(['enums']),
        ...mapState(['meta']),
        tableIntervals() {
            return {
                supplier_payments: {
                    due_date: {
                        min: this.intervals.min,
                        max: this.intervals.max,
                        dateFormat: null,
                    },
                },
            };
        },
    },
};
</script>
