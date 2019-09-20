import routeImporter from '@core-modules/importers/routeImporter';

const routes = routeImporter(require.context('./financials', false, /.*\.js$/));
const RouterView = () => import('@core-pages/Router.vue');

export default {
    path: '/financials',
    component: RouterView,
    meta: {
        breadcrumb: 'financials',
    },
    children: routes,
};
