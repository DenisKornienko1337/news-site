// import Admin from '../views/admin/Admin'

const login = [
    {
        path: '/login',
        name: 'Login',
        component: () => import("@/views/login"),
    },
    // {
    //     path: '/admin',
    //     name: 'Admin',
    //     component: Admin,
    //     meta: {
    //         layout: 'logged'
    //     }
    // }
]


export  default login