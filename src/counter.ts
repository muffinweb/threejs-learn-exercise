export function setupCounter(element: HTMLButtonElement) {
  var delimeter = 1;

  let counter = 0
  const setCounter = (count: number) => {
    counter = count
    element.innerHTML = `count is ${counter}`
  }

  const revertDelimeter = () => {
    delimeter = 1
  }

  element.addEventListener('click', () => {
    let delimeterInput = document.querySelector<HTMLInputElement>('#delimeter')?.value

    if(typeof delimeterInput == 'string'){
      if(delimeterInput.length > 0){
        delimeter = Number(delimeterInput)
      }else{
        revertDelimeter()
      }
    }else{
      revertDelimeter()
    }

    setCounter(counter + delimeter)
  })
  setCounter(0)
}
