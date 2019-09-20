const SupplierPaymentCreate = () => import('../../../../pages/financials/suppliers/payments/Create.vue');

export default {
    name: 'financials.suppliers.payments.create',
    path: 'create',
    component: SupplierPaymentCreate,
    meta: {
        breadcrumb: 'create',
        title: 'Create Payment',
    },
};
