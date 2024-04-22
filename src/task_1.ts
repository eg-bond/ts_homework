interface TotalPrisePropsT {
  price: number
  discount?: number
  isInstallment?: boolean
  months?: number
}

const totalPrice = ({
  price,
  discount = 0,
  isInstallment = false,
  months = 1,
}: TotalPrisePropsT): number => {
  let result = price - (price * discount) / 100

  if (isInstallment) {
    return result / months
  }

  return result
}

// test logs for totalPrice function
const price1 = totalPrice({ price: 100000 })
const price2 = totalPrice({ price: 100000, discount: 30 })
const price3 = totalPrice({ price: 100000, isInstallment: true, months: 6 })
const price4 = totalPrice({
  price: 100000,
  discount: 25,
  isInstallment: true,
  months: 12,
})

console.log(price1) // 100000
console.log(price2) // 70000
console.log(price3) // 16666.666666666667
console.log(price4) // 6250
