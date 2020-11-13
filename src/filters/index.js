// import parseTime, formatTime and set to filter
export { parseTime, formatTime } from '@/utils'

/**
 * Show plural label if time is plural number
 * @param {number} time
 * @param {string} label
 * @return {string}
 */
function pluralize (time, label) {
  if (time === 1) {
    return time + label
  }
  return time + label + 's'
}

/**
 * @param {number} time
 */
export function timeAgo (time) {
  const between = Date.now() / 1000 - Number(time) / 1000
  if (between < 60) {
    return pluralize(~~(between), ' secs')
  } else if (between < 3600) {
    return pluralize(~~(between / 60), ' mins')
  } else if (between < 86400) {
    return pluralize(~~(between / 3600), ' hour')
  } else {
    return pluralize(~~(between / 86400), ' day')
  }
}

/**
 * Number formatting
 * like 10000 => 10k
 * @param {number} num
 * @param {number} digits
 */
export function numberFormatter (num, digits) {
  const si = [
    { value: 1E18, symbol: 'E' },
    { value: 1E15, symbol: 'P' },
    { value: 1E12, symbol: 'T' },
    { value: 1E9, symbol: 'G' },
    { value: 1E6, symbol: 'M' },
    { value: 1E3, symbol: 'k' }
  ]
  for (let i = 0; i < si.length; i++) {
    if (num >= si[i].value) {
      return (num / si[i].value).toFixed(digits).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + si[i].symbol
    }
  }
  return num.toString()
}

/**
 * 10000 => "10,000"
 * @param {number} num
 */
export function toThousandFilter (num) {
  return (+num || 0).toString().replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
}

/**
 * Upper case first char
 * @param {String} string
 */
export function uppercaseFirst (string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export function txStatus (str) {
  const status = {
    VALID: '交易成功',
    NIL_ENVELOPE: '交易内容为空',
    BAD_PAYLOAD: '交易错误',
    BAD_COMMON_HEADER: '交易头错误',
    BAD_CREATOR_SIGNATURE: '创建者签名错误',
    INVALID_ENDORSER_TRANSACTION: '交易背书无效',
    INVALID_CONFIG_TRANSACTION: '交易配置无效',
    UNSUPPORTED_TX_PAYLOAD: '不支持的交易内容',
    BAD_PROPOSAL_TXID: '交易提案错误',
    DUPLICATE_TXID: '交易重复',
    ENDORSEMENT_POLICY_FAILURE: '背书策略校验失败',
    MVCC_READ_CONFLICT: 'MVCC（多版本控制）数据读取冲突',
    PHANTOM_READ_CONFLICT: 'Phantom 数据读取冲突（在范围查询时有可能出现此错误',
    UNKNOWN_TX_TYPE: '不支持的交易类型',
    TARGET_CHAIN_NOT_FOUND: '没有找到目标链',
    MARSHAL_TX_ERROR: '序列化交易失败',
    NIL_TXACTION: '执行步骤为空',
    EXPIRED_CHAINCODE: '链码过期',
    CHAINCODE_VERSION_CONFLICT: '链码版本冲突',
    BAD_HEADER_EXTENSION: '扩展头错误',
    BAD_CHANNEL_HEADER: '通道头错误',
    BAD_RESPONSE_PAYLOAD: '响应内容错误',
    BAD_RWSET: '读写集错误',
    ILLEGAL_WRITESET: '非法写入数据',
    INVALID_WRITESET: '写入数据无效',
    INVALID_CHAINCODE: '无效链码',
    NOT_VALIDATED: '验证失败',
    INVALID_OTHER_REASON: '其它原因导致的交易无效'
  }
  return status[str] || ''
}

export function obj2name (obj) {
  return obj.username || obj.name || ''
}

export function regStatus (str) {
  const status = {
    UNREGISTERED: '未注册',
    REGISTERED: '已注册'

  }
  return status[str] || ''
}

export function NodeStatus (str) {
  const status = {
    RUNNING: 'running',
    UNREACHABLE: 'unreachable'

  }
  return status[str] || ''
}
