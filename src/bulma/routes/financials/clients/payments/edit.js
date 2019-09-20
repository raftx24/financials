const ClientPaymentEdit = () => import('../../../../pages/financials/clients/payments/Edit.vue');

export default {
    name: 'financials.clients.payments.edit',
    path: ':payment/edit',
    component: ClientPaymentEdit,
    meta: {
        breadcrumb: 'edit',
        title: 'Edit Payment',
    },
};
