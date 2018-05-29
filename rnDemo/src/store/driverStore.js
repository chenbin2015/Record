// user
import { observable, action } from 'mobx'
import fetchData from '../common/utils'
import CommonStore from './commonStore'

class DriverStore extends CommonStore {
  @observable num

  constructor() {
    super()
    this.num = 0
  }

  @action
  plus = () => {
    this.num += 1
  }

  @action
  getReactList = async () => {
    const res = await this.fetchData('https://cms.cekid.com/publish/998/newindex2017.json')
    if (res && res.data) {
      this.list = res.data.children
    }
  }
}

export default new DriverStore()
