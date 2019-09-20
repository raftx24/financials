<template>
    <div class="wrapper">
        <div class="columns is-centered">
            <div class="column is-4">
                <enso-select-filter class="box raises-on-hover"
                    v-model="filters.supplier_payments.supplier_id"
                    source="administration.companies.options"
                    title="Supplier"/>
            </div>
            <div class="column is-narrow">
                <enso-date-filter class="box raises-on-hover"
                    :title="i18n('Due Date')"
                    default="thirtyDays"
                    v-model="params.dateInterval"
                    @update="
                        intervals.supplier_payments.due_date.max = $event.max;
                        intervals.supplier_payments.due_date.min = $event.min
                    "/>
            </div>
            <div class="column is-narrow">
                <boolean-filter class="box raises-on-hover"
                    v-model="filters.supplier_payments.is_cancelled"
                    icons
                    :title="i18n('Cancelled')"/>
            </div>
            <div class="column is-6-tablet is-4-desktop is-3-widescreen">
                <enso-select-filter class="box raises-on-hover"
                    v-model="filters.supplier_payments.type"
                    multiple
                    :options="enums.paymentTypes._select()"
                    :title="i18n('Types')"/>
            </div>
        </div>
        <filter-state :api-version="apiVersion"
            name="supplier_payment_filters"
            :filters="filters"
            :intervals="intervals"
            :params="params"
            ref="filterState"/>
        <enso-table class="box is-paddingless raises-on-hover"
            :filters="filters"
            :intervals="intervals"
            id="out_payments"
            @reset="$refs.filterState.reset()"/>
    </div>
</template>

<script>

import { mapState } from 'vuex';
import { EnsoTable } from '@enso-ui/tables/bulma';
import {
    BooleanFilter, EnsoDateFilter, EnsoSelectFilter,
} from '@enso-ui/filters/bulma';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBuilding, faUserTie } from '@fortawesome/free-solid-svg-icons';
import { FilterState } from '@enso-ui/filters/bulma';

library.add(faBuilding, faUserTie);

export default {
    name: 'Index',

    components: {
        EnsoTable, BooleanFilter, EnsoDateFilter, EnsoSelectFilter, FilterState,
    },

    inject: ['i18n'],

    data: () => ({
        apiVersion: 1,
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
            supplier_payments: {
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

    computed: {
        ...mapState(['enums']),
    },
};

</script>
