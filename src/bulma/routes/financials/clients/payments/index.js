const ClientPayments = () => import('../../../../pages/financials/clients/payments/Index.vue');

export default {
    name: 'financials.clients.payments.index',
    path: '',
    component: ClientPayments,
    meta: {
        breadcrumb: 'index',
        title: 'Payments',
    },
};
