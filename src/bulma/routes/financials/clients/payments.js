import routeImporter from '@enso-ui/ui/src/modules/importers/routeImporter';

const routes = routeImporter(require.context('./payments', false, /.*\.js$/));
const RouterView = () => import('@enso-ui/ui/src/bulma/pages/Router.vue');

export default {
    path: 'payments',
    component: RouterView,
    meta: {
        breadcrumb: 'payments',
        route: 'financials.clients.payments.index',
    },
    children: routes,
};
