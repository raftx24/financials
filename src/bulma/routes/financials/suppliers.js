import routeImporter from '@enso-ui/ui/src/modules/importers/routeImporter';

const routes = routeImporter(require.context('./suppliers', false, /.*\.js$/));
const RouterView = () => import('@enso-ui/ui/src/bulma/pages/Router.vue');

export default {
    path: 'suppliers',
    component: RouterView,
    meta: {
        breadcrumb: 'suppliers',
    },
    children: routes,
};
