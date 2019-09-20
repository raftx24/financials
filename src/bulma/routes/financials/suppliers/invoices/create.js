const SupplierInvoiceCreate = () => import('../../../../pages/financials/suppliers/invoices/Create.vue');

export default {
    name: 'financials.suppliers.invoices.create',
    path: 'create',
    component: SupplierInvoiceCreate,
    meta: {
        breadcrumb: 'create',
        title: 'Create Invoice',
    },
};
