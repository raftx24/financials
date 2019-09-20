<template>
    <div class="columns is-centered">
        <div class="column is-three-quarters-desktop is-full-touch">
            <enso-form class="box has-background-light raises-on-hover smooth-resize"
                @ready="init($event); ready = true; update(); "
                ref="form">
                <template v-slot:company_id="{ field }">
                    <form-field :field="field"
                        ref="companySelect"/>
                </template>
                <template v-slot:person_id="{ field }">
                    <form-field :field="field"
                        ref="personSelect"/>
                </template>
                <template v-slot:type="{ field }">
                    <form-field :field="field"
                        @input="update"/>
                </template>
                <template v-slot:actions>
                    <div v-if="!isCreate && `${type}` === enums.paymentTypes.Receipt">
                        <a class="button is-warning" @click="downloadPdf">
                            <span class="is-hidden-mobile">Download</span>
                            <span class="icon"><fa icon="file-pdf"/></span>
                            <span class="is-hidden"/>
                        </a>
                    </div>
                </template>
            </enso-form>
        </div>
    </div>
</template>

<script>
import { EnsoForm, FormField } from '@enso-ui/bulma';
import { mapState } from 'vuex';
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import partnerType from '../mixins/partnerType';

library.add([faFilePdf]);

export default {
    name: 'BaseForm',

    components: { EnsoForm, FormField },

    mixins: [partnerType],

    inject: ['route'],

    data: () => ({
        ready: true,
    }),

    computed: {
        ...mapState(['enums']),
        type() {
            return this.ready && this.$refs.form.field('type').value;
        },
        isCreate() {
            return this.ready && !this.$refs.form.routeParam('payment');
        },
        usesAutoSerial() {
            return [this.enums.paymentTypes.Receipt, this.enums.paymentTypes.POSReceipt,
                this.enums.paymentTypes.CashRegisterReceipt].includes(`${this.type}`);
        },
        isImmediatelyCollected() {
            return [
                this.enums.paymentTypes.PaymentOrder, this.enums.paymentTypes.Receipt,
                this.enums.paymentTypes.POSReceipt, this.enums.paymentTypes.CashRegisterReceipt
            ].includes(`${this.type}`);
        },
    },

    methods: {
        readonly(field, readonly) {
            this.$refs.form.field(field).meta.readonly = readonly;

            return this;
        },
        readonlyAndClear(field, readonly) {
            if (readonly) {
                this.readonly(field, readonly);
                this.$refs.form.field(field).value = null;

                return this;
            }

            this.readonly(field, readonly);

            return this;
        },
        updateIsCollected() {
            if (`${this.type}` === this.enums.paymentTypes.PromissoryNote) {
                this.$refs.form.field('is_collected').meta.hidden = false;

                return;
            }

            this.$refs.form.field('is_collected').value = false;
            this.$refs.form.field('is_collected').meta.hidden = true;
        },
        update() {
            if (this.isCreate) {
                this.updateIsCollected();
                this.readonlyAndClear('serial', this.usesAutoSerial)
                    .readonlyAndClear('number', `${this.type}` === this.enums.paymentTypes.Receipt)
                    .readonlyAndClear('due_date', this.isImmediatelyCollected);

                return;
            }

            this.readonly('company_id', true)
                .readonly('person_id', true)
                .readonly('serial', true)
                .readonly('number', true)
                .readonly('date', true)
                .readonly('due_date', true)
                .readonly('value', true);
        },
        downloadPdf() {
            window.open(this.route('financials.clients.payments.pdf', this.$route.params), '_blank');
        },
    },
};

</script>
<style>
    .smooth-resize div{
        transition: width 300ms ease-in-out;
    }
</style>
