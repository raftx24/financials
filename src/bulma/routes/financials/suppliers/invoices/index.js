const SupplierInvoices = () => import('../../../../pages/financials/suppliers/invoices/Index.vue');

export default {
    name: 'financials.suppliers.invoices.index',
    path: '',
    component: SupplierInvoices,
    meta: {
        breadcrumb: 'index',
        title: 'Invoices',
    },
};
