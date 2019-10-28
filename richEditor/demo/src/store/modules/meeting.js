import { getMeetingList, getMeetingById } from '@/api/meeting'

const GET_MEETING_LIST = 'GET_MEETING_LIST'
const GET_MEETING_BY_ID = 'GET_MEETING_BY_ID'
const ADD_NEW_LINE = 'ADD_NEW_LINE'
const DELETE_LINE_BY_INDEX = 'DELETE_LINE_BY_INDEX'
const SELECT_ONE_LINE = 'SELECT_ONE_LINE' // 选择一行，用于高亮
const MODIFY_ONE_LINE = 'MODIFY_ONE_LINE' // 修改一行，用于修改内容
const SHOW_PREVIEW = 'SHOW_PREVIEW' // 显示预览控制
const SET_AUTHOR = 'SET_AUTHOR' // 设置当前行的作者
const meeting = {
  namespaced: true,
  state: {
    meetings: [],
    meeting: {},
    showPreview: false
  },
  mutations: {
    [GET_MEETING_LIST](state, list) {
      state.meetings = list
    },
    [GET_MEETING_BY_ID](state, meeting) {
      state.meeting = meeting
    },
    [ADD_NEW_LINE](state, meeting) {
      state.meeting = meeting
    },
    [DELETE_LINE_BY_INDEX](state, meeting) {
      state.meeting = meeting
    },
    [SELECT_ONE_LINE](state, meeting) {
      state.meeting = meeting
    },
    [MODIFY_ONE_LINE](state, meeting) {
      state.meeting = meeting
    },
    [SHOW_PREVIEW](state, showPreview) {
      console.log('showPreview1111:', showPreview)
      state.showPreview = showPreview
    },
    [SET_AUTHOR](state, meeting) {
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
          data.info = data.info.map(item => {
            item.hightlight = false
            return item
          })
          let authors = []
          data.info.forEach(item => {
            if (!authors.includes(item.author)) {
              authors.push(item.author)
            }
          })
          data.authors = authors
          commit(GET_MEETING_BY_ID, data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 添加一行
    addNewLine({ commit, state }, { currentLineIndex, data }) {
      const { meeting } = state
      meeting.info.splice(currentLineIndex + 1, 0, data)
      commit(ADD_NEW_LINE, meeting)
    },
    // 删除一行
    deleteNewLine({ commit, state }, currentLineIndex) {
      const { meeting } = state
      meeting.info.splice(currentLineIndex, 1)
      commit(DELETE_LINE_BY_INDEX, meeting)
    },
    // 选择一行
    selectOneLine({ commit, state }, currentLineIndex) {
      const { meeting } = state
      meeting.info.forEach((item, index) => {
        if (index === currentLineIndex) {
          item.hightlight = true
        } else {
          item.hightlight = false
        }
      })
      console.log('currentLineIndex:', currentLineIndex)
      commit(SELECT_ONE_LINE, meeting)
    },
    // 修改一行
    modifyOneLine({ commit, state }, payload) {
      const { meeting } = state
      meeting.info.forEach((item, index) => {
        if (index === payload.currentLineIndex) {
          item.content = payload.newContent
        }
      })
      commit(SELECT_ONE_LINE, meeting)
    },
    // 设置预览状态
    setIsPreview({ commit }, showPreview) {
      commit(SHOW_PREVIEW, showPreview)
    },
    // 设置当前行的作者
    setAuthor({ commit, state }, payload) {
      const { meeting } = state
      meeting.info.forEach((item, index) => {
        if (index === payload.currentLineIndex) {
          item.author = payload.author
        }
      })
      commit(SET_AUTHOR, meeting)
    }
  },
  getters: {
    meetings: state => state.meetings,
    meeting: state => state.meeting
  }
}

export default meeting
