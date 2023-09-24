export const htmlDecode = (str: string) => {
  let txt = document.createElement('textarea')
  txt.innerHTML = str

  return txt.value
}

export const shuffleArray = <T>(arr: T[]) => {
  for (let i = arr.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}
