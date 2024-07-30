export const sleep = (time: number = 1000) => new Promise((resolve) => setTimeout(resolve, time))

export const toFixed = (number: number, precision: number = 2) => Number.parseFloat(number.toFixed(precision))
