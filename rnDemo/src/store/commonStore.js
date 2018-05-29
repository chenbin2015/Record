// user
import { observable, action } from 'mobx'

export default class CommonStore {
  @observable loading
  @observable list

  constructor() {
    this.loading = false
  }

  @action
  fetchData = async (url, params = {}, callback = () => {}) => {
    if (!url) {
      throw Error('You must set the url')
    }
    this.loading = true
    const res = await fetch(url, params, callback)
    const json = await res.json()
    this.loading = false
    return json
  }
}
