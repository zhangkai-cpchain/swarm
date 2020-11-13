export const socketUrl = process.env.VUE_APP_WEB_SOCKET || location.origin.replace('http', 'ws') + '/socket'
