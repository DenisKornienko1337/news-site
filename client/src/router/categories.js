const categoriesRoutes = [
      // {
      //   path: '/categories',
      //   name: 'Categories',
      //   component: Categories
      // },
      {
        path: '/categories/:id',
        name: 'SingleCategory',
        component: () => import("@/views/categories/SingleCategory"),
        props: true
      },
      {
        path: '/categories/add-category',
        name: 'AddCategory',
        component: () => import("@/views/admin/Categories/AddCategory"),
        props: true,
        meta: {
            layout: 'logged'
        }
      },
      {
        path: '/categories/update-category/:id',
        name: 'UpdateCategory',
        component: () => import("@/views/admin/Categories/AddCategory"),
        props: true,
        meta: {
            layout: 'logged'
        }
      },
]

export  default categoriesRoutes