const home = ()=>import('@/options/pages/home/home.vue')

const routes = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        component: home
    }
]

export default routes


