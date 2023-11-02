const validIntX = (value: string, x = 4): boolean => {
  return new RegExp(`^\\d{0,${x}}$`).test(value)
}

const validDecimalXtoY = (value: string, x = 7, y = 2): boolean => {
  return new RegExp(`^[1-9]{0,${x}}(?:\\.[0-9]{1,${y}})?$`).test(value)
}

export {
  validIntX,
  validDecimalXtoY
}