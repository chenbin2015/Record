// home
import { observable, action } from 'mobx'

class ShipperStore {
  @observable text // 注册变量，使其成为可检测的
  @observable num

  constructor() {
    this.num = 0 // 初始化变量，可以定义默认值
    this.text = `Hello, this is homePage!!!`
    this.list = []
  }

  @action
  plus = () => {
    this.num += 1
  }

  @action
  minus = async () => {
    const res = await fetch('https://www.reddit.com/r/reactjs.json')
    const json = await res.json()
    console.log('json:', json)
    this.list = json.data.children
    console.log('this.list:', this.list)
  }
}

export default new ShipperStore()
