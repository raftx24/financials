const SupplierPayments = () => import('../../../../pages/financials/suppliers/payments/Index.vue');

export default {
    name: 'financials.suppliers.payments.index',
    path: '',
    component: SupplierPayments,
    meta: {
        breadcrumb: 'index',
        title: 'Payments',
    },
};
