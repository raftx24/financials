import routeImporter from '@enso-ui/ui/src/modules/importers/routeImporter';

const routes = routeImporter(require.context('./clients', false, /.*\.js$/));
const RouterView = () => import('@enso-ui/ui/src/bulma/pages/Router.vue');

export default {
    path: 'clients',
    component: RouterView,
    meta: {
        breadcrumb: 'clients',
    },
    children: routes,
};
