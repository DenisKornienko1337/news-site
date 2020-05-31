import Profile from '@/views/admin/Profile'
import Card from '@/views/admin/Card'
import Categories from '@/views/admin/Categories'

const routes = [
    {
        path: '/admin',
        name: 'Admin',
        component: Card,
        meta: {
            layout: 'logged'
        }
    },
    {
        path: '/admin/Profile',
        name: 'AdminProfile',
        component: Profile,
        meta: {
            layout: 'logged'
        }
    },
    {
        path: '/admin/news',
        name: 'AdminNews',
        component: Card,
        meta: {
            layout: 'logged'
        }
    },
    {
        path: '/admin/categories',
        name: 'Admin',
        component: Categories,
        meta: {
            layout: 'logged'
        }
    },
]

export default routes