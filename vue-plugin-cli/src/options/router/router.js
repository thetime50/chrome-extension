const home = () => import('@/options/pages/home/home.vue')
const about = () => import('@/options/pages/about/about.vue')

const routes = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        name:'home',
        component: home
    },
    {
        path: '/about',
        name: 'about',
        component: about
    }
]

export default routes


