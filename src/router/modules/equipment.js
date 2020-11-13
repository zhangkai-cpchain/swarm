/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const equipmentRouter = {
  path: '/equipment',
  component: Layout,
  meta: { title: '设备管理', icon: 'el-icon-video-camera', affix: true },
  children: [
    {
      path: 'index',
      component: () => import('@/views/equipment/index'),
      name: 'index',
      meta: { title: '设备管理', noCache: true }
    }
    // {
    //   path: 'group',
    //   component: () => import('@/views/equipment/group'),
    //   name: 'group',
    //   meta: { title: '设备分组' }
    // }
    // {
    //   path: 'history',
    //   component: () => import('@/views/equipment/history'),
    //   name: 'history',
    //   meta: { title: '历史数据' }
    // }
  ]
}

export default equipmentRouter
