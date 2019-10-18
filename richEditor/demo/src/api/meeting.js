import axios from 'axios'

function getMeetingList() {
  return axios({
    method: 'get',
    url: '/meeting/list'
  })
}

function getMeetingById(id) {
  return axios({
    method: 'get',
    url: `/meeting/getDetail?id=${id}`
  })
}

export { getMeetingList, getMeetingById }
