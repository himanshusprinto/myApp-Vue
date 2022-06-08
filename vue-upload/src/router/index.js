import { createRouter, createWebHistory } from 'vue-router';
// import store from './store/store';
//import { IS_USER_AUTHENTICATE_GETTER } from './store/storeconstants';

const Login = () =>import( '../views/SignIn.vue');
const Signup = () => import('../views/SignUp.vue');
const Home = () => import('../views/Home.vue');

 
const routes = [
    { path: '/', redirect: { name: "login"}, component: Home },
    { path: '/login', component: Login, meta: { auth: false } },
    { path: '/signup', component: Signup, meta: { auth: false } },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

// router.beforeEach((to, from, next) => {
//     if (
//         'auth' in to.meta &&
//         to.meta.auth &&
//         !store.getters[`auth/${IS_USER_AUTHENTICATE_GETTER}`]
//     ) {
//         next('/login');
//     } else if (
//         'auth' in to.meta &&
//         !to.meta.auth &&
//         store.getters[`auth/${IS_USER_AUTHENTICATE_GETTER}`]
//     ) {
//         next('/posts');
//     } else {
//         next();
//     }
// });

export default router;