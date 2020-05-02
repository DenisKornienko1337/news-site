import Posts from '../views/posts/Posts'
//import NewPost from '../views/posts/NewPostPage'
import UpdatePost from '../views/posts/UpdatePost'
import SinglePost from '../views/posts/SinglePost'

const postsRoutes = [
    {
        path: '/posts',
        name: 'Posts',
        component: Posts
    },
    {
        path: '/posts/new',
        name: 'NewPost',
        component: UpdatePost,
        props: true
      },
      {
        path: '/posts/update/:id',
        name: 'UpdatePost',
        component: UpdatePost,
        props: true
      },
      {
        path: '/posts/:id',
        name: 'SinglePost',
        component: SinglePost,
        props: true
      }
]


export  default postsRoutes