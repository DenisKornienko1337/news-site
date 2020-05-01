import Posts from '../views/posts/Posts'
import NewPost from '../views/posts/NewPostPage'
import UpdatePost from '../views/posts/UpdatePost'

const postsRoutes = [
    {
        path: '/posts',
        name: 'Posts',
        component: Posts
    },
    {
        path: '/posts/new',
        name: 'NewPost',
        component: NewPost,
        props: true
      },
      {
        path: '/posts/update/:id',
        name: 'UpdatePost',
        component: UpdatePost,
        props: true
      },
]


export  default postsRoutes