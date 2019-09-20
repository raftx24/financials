import routeImporter from '@core-modules/importers/routeImporter';

const routes = routeImporter(require.context('./suppliers', false, /.*\.js$/));
const RouterView = () => import('@core-pages/Router.vue');

export default {
    path: 'suppliers',
    component: RouterView,
    meta: {
        breadcrumb: 'suppliers',
    },
    children: routes,
};
