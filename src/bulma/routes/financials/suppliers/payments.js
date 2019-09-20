import routeImporter from '@core-modules/importers/routeImporter';

const routes = routeImporter(require.context('./payments', false, /.*\.js$/));
const RouterView = () => import('@core-pages/Router.vue');

export default {
    path: 'payments',
    component: RouterView,
    meta: {
        breadcrumb: 'payments',
        route: 'financials.suppliers.payments.index',
    },
    children: routes,
};
