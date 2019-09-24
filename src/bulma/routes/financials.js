import routeImporter from '@enso-ui/ui/src/modules/importers/routeImporter';

const routes = routeImporter(require.context('./financials', false, /.*\.js$/));
const RouterView = () => import('@enso-ui/ui/src/bulma/pages/Router.vue');

export default {
    path: '/financials',
    component: RouterView,
    meta: {
        breadcrumb: 'financials',
    },
    children: routes,
};
