const ClientInvoices = () => import('../../../../pages/financials/clients/invoices/Index.vue');

export default {
    name: 'financials.clients.invoices.index',
    path: '',
    component: ClientInvoices,
    meta: {
        breadcrumb: 'index',
        title: 'Invoices',
    },
};
