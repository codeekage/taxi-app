import { observable, action, computed } from 'mobx'

export default class ComponentStore {
  @observable fabAction: boolean = true
  @observable sideBarToggled: boolean = false

  @computed get isActive() {
    return this.fabAction
  }

  @action setFabActive() {
    this.fabAction = !this.fabAction
  }

  @computed get isToggled() {
    return this.sideBarToggled
  }

  @action setSideToggle() {
    this.sideBarToggled = !this.sideBarToggled
  }
}
