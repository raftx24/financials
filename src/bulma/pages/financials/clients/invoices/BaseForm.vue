<template>
    <div class="wrapper">
        <enso-form class="box has-background-light raises-on-hover"
            @ready="ready"
            disable-state
            ref="form">
                <template v-slot:company_id="{ field }">
                    <form-field :field="field"
                        ref="companySelect"/>
                </template>
                <template v-slot:person_id="{ field }">
                    <form-field :field="field"
                        ref="personSelect"/>
                </template>
                <template v-if="hasInvoice" v-slot:lines>
                    <lines/>
                </template>
                <template v-if="hasLines" v-slot:actions-left>
                    <div>
                        <a class="button is-warning" @click="downloadPdf">
                            <span class="is-hidden-mobile">Download</span>
                            <span class="icon"><fa icon="file-pdf"/></span>
                            <span class="is-hidden"/>
                        </a>
                    </div>
                </template>
            </enso-form>
        </div>
</template>

<script>
import { EnsoForm, FormField } from '@enso-ui/forms/bulma';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';
import Lines from '../components/Lines.vue';
import partnerType from '../mixins/partnerType';

library.add(faFilePdf);

export default {
    name: 'BaseForm',

    components: { EnsoForm, FormField, Lines },

    mixins: [partnerType],

    inject: ['i18n', 'route'],

    data: () => ({
        isReady: false,
        invoice: {
            form: null,
            processing: false,
        },
    }),

    computed: {
        hasInvoice() {
            return this.isReady && this.$route.params.invoice !== undefined;
        },
        hasLines() {
            return this.lines().length > 0;
        },
    },

    methods: {
        lines() {
            return this.isReady
                ? this.$refs.form.param('lines')
                : [];
        },
        measurementUnits() {
            return this.isReady
                ? this.$refs.form.param('measurementUnits')
                : [];
        },
        form() {
            return this.isReady
                ? this.$refs.form
                : null;
        },

        ready($event) {
            this.invoice.form = this.$refs.form;
            this.init($event);
            this.isReady = true;
        },

        updateInvoice(invoice) {
            Object.keys(invoice)
                .forEach(attribute => (this.form()
                    .field(attribute).value = invoice[attribute]));
        },

        downloadPdf() {
            window.open(this.route('financials.clients.invoices.pdf', this.$route.params), '_blank');
        },
    },

    provide() {
        return {
            lines: this.lines,
            measurementUnits: this.measurementUnits,
            invoice: this.invoice,
            updateInvoice: this.updateInvoice,
        };
    },
};
</script>
