<template>
    <div class="columns">
        <div class="column is-narrow">
            <enso-filter class="box raises-on-hover"
                v-model="params.client"
                icons
                :options="clientOptions"
                :title="i18n('Clients')"
                @input="$refs.selectFilter.clear()"/>
        </div>
        <div class="column">
            <enso-select-filter class="box raises-on-hover"
                v-model="clientId"
                :source="clientSelectRoute"
                :readonly="!clientSelectRoute"
                :title="i18n('Client')"
                @input="setClientId"
                ref="selectFilter"/>
        </div>
    </div>
</template>

<script>
import { EnsoFilter, EnsoSelectFilter } from '@enso-ui/filters/bulma';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBuilding, faUserTie } from '@fortawesome/free-solid-svg-icons';

export default {
    name: 'ClientFilter',

    components: {
        EnsoFilter, EnsoSelectFilter,
    },

    inject: ['i18n'],

    props: {
        filters: {
            type: Object,
            required: true,
        },
        params: {
            type: Object,
            required: true,
        },
    },

    data: () => ({
        clientId: null,
        clientOptions: [
            { value: 'company', icon: 'building', class: null },
            { value: 'person', icon: 'user-tie', class: null },
        ],
    }),

    computed: {
        clientSelectRoute() {
            if (this.params.client === null) {
                return null;
            }
            return this.params.client === 'person'
                ? 'administration.people.options'
                : 'administration.companies.options';
        },
    },

    watch: {
        filters() {
            const clientId = this.filters.person_id || this.filters.company_id;

            if(clientId) {
                this.clientId = clientId;
            }
        },
    },

    methods: {
        setClientId(id) {
            switch (this.params.client) {
            case 'company':
                this.filters.person_id = null;
                this.filters.company_id = id;
                break;
            case 'person':
                this.filters.person_id = id;
                this.filters.company_id = null;
                break;
            default:
                this.filters.person_id = null;
                this.filters.company_id = null;
                break;
            }
        },
    },
};
</script>
