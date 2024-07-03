export const currenciesAndIcons = [
  {
    currencyCode: "INR",
    icon: "indian-rupee",
  },
  {
    currencyCode: "USD",
    icon: "dollar-sign",
  },
  {
    currencyCode: "EUR",
    icon: "euro",
  },
  {
    currencyCode: "GBP",
    icon: "pound-sterling",
  },
  {
    currencyCode: "JPY",
    icon: "japanese-yen",
  },
  {
    currencyCode: "CHF",
    icon: "swiss-franc",
  },
  {
    currencyCode: "RUB",
    icon: "russian-ruble",
  },
]

export const currencyCodes = currenciesAndIcons.map((i) => {
  return i.currencyCode
})

export const currencyIcons = currenciesAndIcons.map((i) => {
  return i.icon
})
