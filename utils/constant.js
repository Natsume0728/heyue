export const ROLE_TYPES = {
  DUBBER: 'dubber',
  CHANNEL: 'channel',
  EMPLOYER: 'employer',
  BACKSTAGE: 'backstage',
}

export const STAR_LIST = [
  {
    label: '全部',
    value: -1
  },
  {
    label: '一星',
    value: 1
  },
  {
    label: '二星',
    value: 2
  },
  {
    label: '三星',
    value: 3
  },
  {
    label: '四星',
    value: 4
  },
  {
    label: '五星',
    value: 5
  }
]

// UNAPPROVED(0,"未审核"),
// PROGRESS(1,"进行中"),
// TRANSACTION(2,"交易中"),
// COMPLETED(3,"已完成");
export const taskStatusList = [
  {
    taskStatus: 0,
    taskStatusName: "未审核",
  },
  {
    taskStatus: 1,
    taskStatusName: "进行中",
  },
  {
    taskStatus: 2,
    taskStatusName: "交易中",
  },
  {
    taskStatus: 3,
    taskStatusName: "已完成",
  },
]

// 性别
export const SEX_TYPES = [
  {
    label: '全部',
    value: -1
  },
  {
    label: '男',
    value: 1
  },
  {
    label: '女',
    value: 2
  },
]

export const defaultUserImgUrl = 'https://voice-public-1316021820.cos.ap-beijing.myqcloud.com/11451675951082_.pic_hd.jpg'

export const MAIN_LOGO_URL = 'https://voice-public-1316021820.cos.ap-beijing.myqcloud.com/9961675867389_.pic.jpg'