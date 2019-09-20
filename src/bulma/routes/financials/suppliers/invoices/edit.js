const SupplierInvoiceEdit = () => import('../../../../pages/financials/suppliers/invoices/Edit.vue');

export default {
    name: 'financials.suppliers.invoices.edit',
    path: ':invoice/edit',
    component: SupplierInvoiceEdit,
    meta: {
        breadcrumb: 'edit',
        title: 'Edit Invoice',
    },
};
