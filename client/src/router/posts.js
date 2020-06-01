const postsRoutes = [
    {
        path: '/posts',
        name: 'Posts',
        component: () => import("@/views/posts/Card"),
    },
    {
        path: '/posts/new',
        name: 'NewPost',
        component: () => import("@/views/posts/UpdatePost"),
        props: true,
        meta: {
            layout: 'logged'
        }
      },
      {
        path: '/posts/update/:id',
        name: 'UpdatePost',
        component: () => import("@/views/posts/UpdatePost"),
        props: true,
        meta: {
            layout: 'logged'
        }
      },
      {
        path: '/posts/:id',
        name: 'SinglePost',
        component: () => import("@/views/posts/SinglePost"),
        props: true
      }
]


export  default postsRoutes