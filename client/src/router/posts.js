import PostCards from '../views/posts/Card'
//import NewPost from '../views/posts/NewPostPage'
import UpdatePost from '../views/posts/UpdatePost'
import SinglePost from '../views/posts/SinglePost'

const postsRoutes = [
    {
        path: '/posts',
        name: 'Posts',
        component: PostCards
    },
    {
        path: '/posts/new',
        name: 'NewPost',
        component: UpdatePost,
        props: true,
        meta: {
            layout: 'logged'
        }
      },
      {
        path: '/posts/update/:id',
        name: 'UpdatePost',
        component: UpdatePost,
        props: true,
        meta: {
            layout: 'logged'
        }
      },
      {
        path: '/posts/:id',
        name: 'SinglePost',
        component: SinglePost,
        props: true
      }
]


export  default postsRoutes