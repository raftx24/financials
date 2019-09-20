import routeImporter from '@core-modules/importers/routeImporter';

const routes = routeImporter(require.context('./clients', false, /.*\.js$/));
const RouterView = () => import('@core-pages/Router.vue');

export default {
    path: 'clients',
    component: RouterView,
    meta: {
        breadcrumb: 'clients',
    },
    children: routes,
};
