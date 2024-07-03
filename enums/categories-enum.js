export const categoriesList = [
  {
    category: "Groceries",
    icon: "shopping-cart",
  },
  {
    category: "Rent/Mortgage",
    icon: "home",
  },
  {
    category: "Utilities",
    icon: "zap",
  },
  {
    category: "Transportation",
    icon: "car",
  },
  {
    category: "Entertainment",
    icon: "film",
  },
  {
    category: "Dining Out",
    icon: "coffee",
  },
  {
    category: "Health/Medical",
    icon: "heart",
  },
  {
    category: "Insurance",
    icon: "shield",
  },
  {
    category: "Education",
    icon: "book",
  },
  {
    category: "Savings/Investments",
    icon: "dollar-sign",
  },
  {
    category: "Personal Care",
    icon: "user",
  },
  {
    category: "Travel",
    icon: "plane",
  },
  {
    category: "Gifts/Donations",
    icon: "gift",
  },
  {
    category: "Clothing",
    icon: "shopping-bag",
  },
  {
    category: "Taxes",
    icon: "file-text",
  },
  {
    category: "Debt Payments",
    icon: "credit-card",
  },
  {
    category: "Subscriptions",
    icon: "play-circle",
  },
  {
    category: "Miscellaneous",
    icon: "more-horizontal",
  },
  {
    category: "Income",
    icon: "trending-up",
  },
]

export const categoriesNames = categoriesList.map((i) => {
  return i.category
})

export const categoriesIcons = categoriesList.map((i) => {
  return i.icon
})
