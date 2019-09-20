<template>
    <div class="wrapper">
        <div class="table-responsive invoice-table">
            <table class="table is-fullwidth is-striped is-marginless is-narrow" v-if="hasLines()">
                <header-line v-bind="$attrs"/>
                <transition-group name="lines" tag="tbody">
                    <tr is="row-line"
                        class="line"
                        v-for="(line,index) in lines()"
                        :line="line"
                        :index="index"
                        :key="line.id"
                        v-on="$listeners"
                        ref="line"/>
                </transition-group>
                <footer-line v-bind="$attrs" @add="addLine()"/>
            </table>
            <div v-else>
                <a class="button is-success" @click="addLine()">
                    <span class="is-hidden-mobile">Add First Invoice Line</span>
                    <span class="icon"><fa icon="plus"/></span>
                    <span class="is-hidden"/>
                </a>
            </div>
        </div>
    </div>
</template>

<script>
import HeaderLine from './HeaderLine.vue';
import RowLine from './RowLine.vue';
import FooterLine from './FooterLine.vue';

export default {
    name: 'Lines',

    inject: ['lines', 'errorHandler', 'route', 'invoice', 'updateInvoice'],

    components: {
        HeaderLine, RowLine, FooterLine,
    },

    methods: {
        hasLines() {
            return this.lines().length > 0;
        },
        chainRequest(call) {
            if (!this.invoice.promise) {
                this.invoice.promise = call();
                return;
            }

            this.invoice.promise = this.invoice.promise.then(call);
        },
        addLine() {
            this.invoice.processing = true;

            const call = () => axios.post(
                this.route('financials.clients.invoices.lines.store', this.$route.params),
            ).then(({ data }) => {
                const { line, invoice } = data;
                this.updateInvoice(invoice);
                this.lines().push(line);
                this.invoice.processing = false;
            }).catch((error) => {
                this.invoice.processing = false;
                this.errorHandler(error);
            });

            this.chainRequest(call);
        },
    },

    provide() {
        return {
            chainRequest: this.chainRequest,
        };
    },
};
</script>

<style lang="scss">
    .invoice-table {
        overflow-x: auto;

        th {
            vertical-align: middle;
        }

        .line {
            transition: all 0.5s;
        }

        .lines-move {
            transition: item transform 0.333s;
        }

        .lines-enter, .lines-leave-to {
            opacity: 0;
        }
    }
</style>
