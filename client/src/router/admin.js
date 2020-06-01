const routes = [
    {
        path: '/admin',
        name: 'Admin',
        component: () => import("@/views/admin/Card"),
        meta: {
            layout: 'logged'
        }
    },
    {
        path: '/admin/Profile',
        name: 'AdminProfile',
        component: () => import("@/views/admin/Profile"),
        meta: {
            layout: 'logged'
        }
    },
    {
        path: '/admin/news',
        name: 'AdminNews',
        component: () => import("@/views/admin/Card"),
        meta: {
            layout: 'logged'
        }
    },
    {
        path: '/admin/categories',
        name: 'AdminCategories',
        component: () => import("@/views/admin/Categories"),
        meta: {
            layout: 'logged'
        }
    },
]

export default routes