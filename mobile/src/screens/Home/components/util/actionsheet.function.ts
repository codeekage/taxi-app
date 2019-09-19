export function execute(
  buttonIndex: number,
  buttonArray: string[],
  buttonFunction: object
) {
  const keys = Object.keys(buttonFunction)
  const func = Object.values(buttonFunction)
  if(buttonIndex === buttonArray.indexOf(keys[buttonIndex])){
    func[buttonIndex]()
  }else{
    console.error(`${keys[buttonIndex]} is not a Button`)
  }
}
