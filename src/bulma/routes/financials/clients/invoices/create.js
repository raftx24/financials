const ClientInvoiceCreate = () => import('../../../../pages/financials/clients/invoices/Create.vue');

export default {
    name: 'financials.clients.invoices.create',
    path: 'create',
    component: ClientInvoiceCreate,
    meta: {
        breadcrumb: 'create',
        title: 'Create Invoice',
    },
};
