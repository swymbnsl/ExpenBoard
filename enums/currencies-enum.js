export const currenciesAndIcons = [
  {
    currencyCode: "INR",
    icon: "₹",
  },
  {
    currencyCode: "USD",
    icon: "$",
  },
  {
    currencyCode: "EUR",
    icon: "€",
  },
  {
    currencyCode: "GBP",
    icon: "£",
  },
  {
    currencyCode: "JPY",
    icon: "¥",
  },
  {
    currencyCode: "CHF",
    icon: "₣",
  },
  {
    currencyCode: "RUB",
    icon: "₽",
  },
]

export const currencyCodes = currenciesAndIcons.map((i) => {
  return i.currencyCode
})

export const currencyIcons = currenciesAndIcons.map((i) => {
  return i.icon
})
