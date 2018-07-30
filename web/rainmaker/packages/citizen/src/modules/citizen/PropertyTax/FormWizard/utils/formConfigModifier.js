const subCategoriesInOwnersType = ["INDIVIDUAL"]

const formOwnerDropdown = category => {
  const { name, code } = category
  return {
    label: name,
    value: code,
  }
}

export const getOwnerDetails = state => {
  const { OwnerShipCategory, SubOwnerShipCategory } = JSON.parse(JSON.stringify(state.common.generalMDMSDataById))
  const ownerShipdropDown = []
  debugger
  Object.keys(OwnerShipCategory).forEach((category) => {
    const categoryCode = OwnerShipCategory[category].code
    if (subCategoriesInOwnersType.indexOf(categoryCode) !== -1) {
      Object.keys(SubOwnerShipCategory)
        .filter(subCategory => categoryCode === SubOwnerShipCategory[subCategory].ownerShipCategory)
        .forEach(linkedCategory => {
          ownerShipdropDown.push(formOwnerDropdown(SubOwnerShipCategory[linkedCategory]))
        })
    } else {
      ownerShipdropDown.push(formOwnerDropdown(OwnerShipCategory[category]))
    }
  })
  return ownerShipdropDown
}
