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
                <template v-slot:actions-left>
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
import { mapState } from 'vuex';
import { EnsoForm, FormField } from '@enso-ui/forms/bulma';
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import partnerType from '../mixins/partnerType';
import clientPayment from '../mixins/clientPayment';

library.add([faFilePdf]);

export default {
    name: 'BaseForm',

    components: { EnsoForm, FormField },

    mixins: [partnerType, clientPayment],

    inject: ['route'],

    computed: {
        ...mapState(['enums']),
        isCreate() {
            return this.ready && !this.$refs.form.routeParam('payment');
        },
    },

    methods: {
        update() {
            if (this.isCreate) {
                this.updateIsCollected();
                this.readonlyAndClear('serial', this.usesAutoSerial || this.hasNoSerial)
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
