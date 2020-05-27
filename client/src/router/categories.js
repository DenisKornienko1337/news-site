import Categories from '../views/categories/Categories'

import AddCategory from '../views/categories/AddCategory'
import SingleCategory from '../views/categories/SingleCategory'

const categoriesRoutes = [
    {
        path: '/categories',
        name: 'Categories',
        component: Categories
      },
      {
        path: '/categories/:id',
        name: 'SingleCategory',
        component: SingleCategory,
        props: true
      },
      {
        path: '/categories/add-category',
        name: 'AddCategory',
        component: AddCategory,
        props: true
      },
      {
        path: '/categories/update-category/:id',
        name: 'UpdateCategory',
        component: AddCategory,
        props: true
      },
]

export  default categoriesRoutes