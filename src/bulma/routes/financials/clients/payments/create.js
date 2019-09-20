const ClientPaymentCreate = () => import('../../../../pages/financials/clients/payments/Create.vue');

export default {
    name: 'financials.clients.payments.create',
    path: 'create',
    component: ClientPaymentCreate,
    meta: {
        breadcrumb: 'create',
        title: 'Create Payment',
    },
};
