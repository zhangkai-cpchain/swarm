import { getUserId, getRole} from '@/utils/auth'
const getters = {
  sidebar: state => state.app.sidebar,
  size: state => state.app.size,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  id: state => { return state.user.id || getUserId() },
  introduction: state => state.user.introduction,
  roles: state => { return state.user.roles || getRole() },
  permissions: state => state.user.permissions,
  permission_routes: state => state.permission.routes,
  errorLogs: state => state.errorLog.logs
}
export default getters
