<template>
    <tr class="invoice-line">
        <td class="is-numeric">
            {{ index + 1 }}.
        </td>
        <td>
            <input class="input description full is-fullwidth"
                :class="{'is-danger': errors.has('description')}"
                v-model="line.description"
                v-select-on-focus
                :readonly="line.processing"
                :placeholder="i18n('Description')"
                @input="errors.clear('description'); update()">
        </td>
        <td class="has-text-right">
            <input class="input is-numeric"
                :class="{'is-danger': errors.has('quantity')}"
                v-model.number="line.quantity"
                v-select-on-focus
                :readonly="line.processing"
                :placeholder="i18n('qty')"
                @input="errors.clear('quantity'); update()">
        </td>
        <td class="has-text-right">
            <div class="select"
                 :class="{'is-danger': errors.has('measurementUnits')}">
                <select :readonly="line.processing" v-model="line.measurementUnitId"
                        @input="errors.clear('measurementUnits'); update()">
                    <option class="option"
                        v-for="measurementUnit in measurementUnits()"
                        :key="measurementUnit.id"
                        :selected="line.measurementUnitId === measurementUnit.id"
                        :value="measurementUnit.id">
                        {{ i18n(measurementUnit.name) }}
                    </option>
                </select>
            </div>
        </td>

        <td class="has-text-right price">
            <input class="input is-numeric price is-fullwidth"
                :class="{'is-danger': errors.has('listPrice')}"
                v-model.number="line.listPrice"
                v-select-on-focus
                step="0.01"
                :readonly="line.processing"
                :placeholder="i18n('price')"
                @input="errors.clear('listPrice'); update()">
        </td>
        <td class="has-text-right">
            <div class="select"
                 :class="{'is-danger': errors.has('vatPercent')}">
                <select :readonly="line.processing" v-model="line.vatPercent"
                    @input="errors.clear('vatPercent'); update()">
                    <option class="option"
                        v-for="vat in enums.vatRates._select()"
                        :key="vat.id"
                        :selected="line.vatPercent === vat.id"
                        :value="vat.id">
                        {{ vat.name }}%
                    </option>
                </select>
            </div>
        </td>
        <td class="has-text-right ">
            <p class="control has-icons-right has-text-right">
                <input class="input is-numeric discount"
                    :class="{'is-danger': errors.has('discountPercent')}"
                    v-model.number="line.discountPercent"
                    v-select-on-focus
                    :readonly="line.processing"
                    :placeholder="i18n('discount')"
                    @input="errors.clear('discountPercent'); update()">
                <span class="icon is-small is-right">
                    <fa icon="percentage"
                        size="xs"/>
                </span>
            </p>
        </td>
        <td class="has-text-right is-numeric ">
            {{ line.amount | numberFormat(2) }}
        </td>
        <td class="has-text-right ">
            <a class="button is-naked"
               :class="{'is-loading' : line.processing}"
               @click="destroy">
                <span class="icon is-small danger">
                    <fa icon="trash-alt"
                        size="xs"/>
                </span>
            </a>
        </td>
    </tr>
</template>

<script>
import debounce from 'lodash/debounce';
import Errors from '@enso-ui/forms/src/classes/Errors';
import { mapState } from 'vuex';
import { selectOnFocus } from '@enso-ui/directives';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrashAlt, faPercentage } from '@fortawesome/free-solid-svg-icons';

library.add(faTrashAlt, faPercentage);

export default {
    inject: [
        'i18n', 'errorHandler', 'route', 'lines', 'chainRequest', 'invoice',
        'updateInvoice', 'measurementUnits',
    ],

    directives: { selectOnFocus },

    props: {
        line: {
            type: Object,
            required: true,
        },
        index: {
            type: Number,
            required: true,
        },
    },

    data: () => ({
        errors: new Errors(),
    }),

    computed: {
        ...mapState(['enums']),
    },

    created() {
        this.update = debounce(this.update, 300);
    },

    methods: {
        update() {
            this.line.processing = true;

            const call = () => axios.patch(this.route(
                'financials.clients.invoices.lines.update',
                { line: this.line.id },
            ), this.line).then(({ data }) => {
                this.replace(data.line);
                this.updateInvoice(data.invoice);
            }).catch(error => this.rowError(error, this.reload));

            this.chainRequest(call);
        },
        destroy() {
            this.line.processing = true;

            const call = () => axios.delete(
                this.route(
                    'financials.clients.invoices.lines.destroy',
                    { line: this.line.id },
                ),
            ).then(({ data }) => {
                this.lines().splice(this.index, 1);
                this.updateInvoice(data.invoice);
            }).catch(error => this.rowError(error, this.reload));

            this.chainRequest(call);
        },
        reload() {
            this.line.processing = true;

            axios.get(this.route(
                'financials.clients.invoices.lines.show',
                { line: this.line.id },
            )).then(({ data }) => {
                this.replace(data);
                this.invoice.promise = null;
            }).catch(this.errorHandler);
        },
        replace(line) {
            this.lines().splice(this.index, 1, line);
        },
        rowError(error, callback = null) {
            this.line.processing = false;

            const { status, data } = error.response;

            if (status === 422) {
                this.errors.set(data.errors);
                return;
            }

            if (status === 409) {
                this.$toastr.warning(data.message);
                this.invoice.form.fetch();
                return;
            }

            if (callback) {
                callback();
            }

            this.errorHandler(error);
        },
    },
};
</script>

<style lang="scss">
    tr.invoice-line {
        td.is-numeric, .is-numeric {
            font-family: monospace;
            font-size: 1em;
            text-align: right;
        }

        td {
            vertical-align: middle;
            .input {
                width: 4.8em;
            }
            .input.is-fullwidth {
                width: 100%;
            }
        }
    }
</style>
