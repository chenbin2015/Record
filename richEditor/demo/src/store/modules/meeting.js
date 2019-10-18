import { getMeetingList, getMeetingById } from '@/api/meeting'

const GET_MEETING_LIST = 'GET_MEETING_LIST'
const GET_MEETING_BY_ID = 'GET_MEETING_BY_ID'
const meeting = {
  namespaced: true,
  state: {
    meetings: [],
    meeting: {}
  },
  mutations: {
    [GET_MEETING_LIST](state, list) {
      state.meetings = list
    },
    [GET_MEETING_BY_ID](state, meeting) {
      state.meeting = meeting
    }
  },
  actions: {
    // 获取会议列表
    getMeetingList({ commit }) {
      return getMeetingList()
        .then(res => {
          const { data } = res.data
          console.log(data)
          commit(GET_MEETING_LIST, data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 根据id获取会议详情
    getMeetingById({ commit }, id) {
      return getMeetingById(id)
        .then(res => {
          const { data } = res.data
          commit(GET_MEETING_BY_ID, data)
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  getters: {
    meetings: state => state.meetings,
    meeting: state => state.meeting
  }
}

export default meeting
