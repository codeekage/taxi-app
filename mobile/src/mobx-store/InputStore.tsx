import { observable, computed, action } from 'mobx'

export default class InputStore {
  @observable input: any
  @observable resultType: any;
  @observable userData : any


  @action setUserInput(payload: any) {
    const { key, value } = payload
    this.input = {
      [key]: value,
    }
    console.log(this.input)
  }

  @action toggleSearchResult(payload: any) {
    if (payload === 'pickUp') {
      this.resultType = {
        pickUp: true,
        dropOff: false,
      }
    }

    if (payload === 'dropOff') {
      this.resultType = {
        pickUp: false,
        dropOff: true,
      }
    }

    console.log(this.resultType)
  }

  @computed get userInput() {
    return this.userData /* = this.resultType.pickUp ? this.input.pickUp : this.input.dropOff */
  }
}
