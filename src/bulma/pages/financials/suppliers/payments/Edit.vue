<template>
    <div class="columns is-centered">
        <div class="column is-three-quarters-desktop is-full-touch">
            <enso-form class="box has-background-light raises-on-hover"/>
            <accessories>
                <template slot-scope="{ count }">
                    <tab keep-alive
                         id="Comments">
                        <div class="columns is-centered">
                            <div class="column is-two-thirds">
                                <comments :id="paymentId"
                                    type="supplierPayment"
                                    @update="$set(count, 'Comments', $refs.comments.count)"
                                    ref="comments"/>
                            </div>
                        </div>
                    </tab>
                    <tab keep-alive
                         id="Documents">
                        <div class="columns is-centered">
                            <div class="column is-two-thirds">
                                <documents :id="paymentId"
                                    type="supplierPayment"
                                    @update="$set(count, 'Documents', $refs.documents.count)"
                                    ref="documents"/>
                            </div>
                        </div>
                    </tab>
                </template>
            </accessories>
        </div>
    </div>
</template>

<script>
import { EnsoForm } from '@enso-ui/forms/bulma';
import { Accessories, Comments, Documents } from '@enso-ui/accessories/bulma';
import { Tab } from '@enso-ui/tabs/bulma';

export default {
    name: 'Edit',

    components: {
        EnsoForm, Tab, Accessories, Comments, Documents,
    },

    computed: {
        paymentId() {
            return Number.parseInt(this.$route.params.payment, 10);
        },
    },
};
</script>
