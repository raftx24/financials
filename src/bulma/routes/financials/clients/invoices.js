import routeImporter from '@enso-ui/ui/src/modules/importers/routeImporter';

const routes = routeImporter(require.context('./invoices', false, /.*\.js$/));
const RouterView = () => import('@enso-ui/ui/src/bulma/pages/Router.vue');

export default {
    path: 'invoices',
    component: RouterView,
    meta: {
        breadcrumb: 'invoices',
        route: 'financials.clients.invoices.index',
    },
    children: routes,
};
