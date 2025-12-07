import type { RouterConfig } from '@nuxt/schema'

// Code-based routing configuration
// Define all routes programmatically here
export default <RouterConfig>{
  routes: (_routes) => [
    {
      name: 'home',
      path: '/',
      component: () => import('~/pages/index.vue'),
    },
    {
      name: 'about',
      path: '/about',
      component: () => import('~/pages/about.vue'),
    },
    // Add more routes here as needed
    // Example nested routes:
    // {
    //   name: 'users',
    //   path: '/users',
    //   component: () => import('~/pages/users/index.vue'),
    //   children: [
    //     {
    //       name: 'user-profile',
    //       path: ':id',
    //       component: () => import('~/pages/users/[id].vue'),
    //     },
    //   ],
    // },
  ],
}
