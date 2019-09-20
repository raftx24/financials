const SupplierClientEdit = () => import('../../../../pages/financials/suppliers/payments/Edit.vue');

export default {
    name: 'financials.suppliers.payments.edit',
    path: ':payment/edit',
    component: SupplierClientEdit,
    meta: {
        breadcrumb: 'edit',
        title: 'Edit Payment',
    },
};
