/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const chainRouter = {
  path: '/chain',
  component: Layout,
  redirect: 'noRedirect',
  name: 'Charts',
  meta: {
    title: '区块链',
    icon: 'el-icon-coin'
  },
  children: [
    {
      path: 'blocks',
      component: () => import('@/views/chain/blocks'),
      name: 'KeyboardChart',
      meta: { title: '区块查询', noCache: true }
    },
    {
      path: 'transactions',
      component: () => import('@/views/chain/transactions'),
      name: 'LineChart',
      meta: { title: '交易查询', noCache: true }
    }

    // {
    //   path: 'history',
    //   component: () => import('@/views/chain/history'),
    //   name: 'History',
    //   meta: { title: '历史数据', noCache: true }
    // }
  ]
}
export default chainRouter
