import routeImporter from '@core-modules/importers/routeImporter';

const routes = routeImporter(require.context('./invoices', false, /.*\.js$/));
const RouterView = () => import('@core-pages/Router.vue');

export default {
    path: 'invoices',
    component: RouterView,
    meta: {
        breadcrumb: 'invoices',
        route: 'financials.suppliers.invoices.index',
    },
    children: routes,
};
