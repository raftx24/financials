const ClientInvoiceEdit = () => import('../../../../pages/financials/clients/invoices/Edit.vue');

export default {
    name: 'financials.clients.invoices.edit',
    path: ':invoice/edit',
    component: ClientInvoiceEdit,
    meta: {
        breadcrumb: 'edit',
        title: 'Edit Invoice',
    },
};
