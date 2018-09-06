import ownerInfo from "egov-ui-kit/config/forms/specs/PropertyTaxPay/ownerInfo"
import ownershipType from "egov-ui-kit/config/forms/specs/PropertyTaxPay/ownershipType"
import institutionAuthority from "egov-ui-kit/config/forms/specs/PropertyTaxPay/OwnerInformation/Institution/institutionAuthority"
import institutionDetails from "egov-ui-kit/config/forms/specs/PropertyTaxPay/OwnerInformation/Institution/institutionDetails"
import propertyAddress from "egov-ui-kit/config/forms/specs/PropertyTaxPay/propertyAddress"
import get from "lodash/get"
import cloneDeep from "lodash/cloneDeep"
import capitalize from "lodash/capitalize"
import { getPlotAndFloorFormConfigPath } from "egov-ui-kit/config/forms/specs/PropertyTaxPay/utils/assessInfoFormManager";
import set from "lodash/set"

const addData = (config, currentForm) => {
  let res = { ...config }
  Object.keys(config.fields).forEach((field)=> {
    const jsonPath = config.fields[field].jsonPath
    if (jsonPath) {
      let value = currentForm[jsonPath.substring(jsonPath.lastIndexOf(".") + 1, jsonPath.length)] || ""
      if (jsonPath.toLowerCase().indexOf("gender") !== -1) {
        value = capitalize(value) || "Male"
      } else if (jsonPath.toLowerCase().indexOf("document") !== -1) {
        value = get(currentForm, `documents[0].${jsonPath.substring(jsonPath.lastIndexOf(".") + 1, jsonPath.length)}`, "")
      }
      set(res, `fields.${field}.value`, value)
    }
  })
  delete res.name
  return res
}

export const getOwnerShipDetails = (property) => {
  const ownerShipForms = {
      "ownershipType": addData(cloneDeep(ownershipType), get(property, "propertyDetails[0]", {})),
    }
  return ownerShipForms
}

// export const getAllOwnerDetails = (property, isSingleOwner = false) => {
//   const ownerDataFromApi = get(property, "propertyDetails[0].owners", [])
//   let ownerForms = {}
//   ownerDataFromApi.forEach((ownerDetails, index) => {
//     ownerForms = {
//       ...ownerForms,
//       [isSingleOwner ? "ownerInfo" : `ownerInfo_${index}`]: addData(cloneDeep(ownerInfo), ownerDetails),
//     }
//   })
//   return ownerForms
// }

export const getAllOwnerDetails = (property, isSingleOwner = false) => {
  const ownerDataFromApi = get(property, "propertyDetails[0].owners", [])
  let ownerForms = {}
  ownerDataFromApi.forEach((ownerDetails, index) => {
    let singleownerDetails = addData(cloneDeep(ownerInfo), ownerDetails)
    singleownerDetails.fields.ownerRelationship.value = "father"
    ownerForms = {
      ...ownerForms,
      [isSingleOwner ? "ownerInfo" : `ownerInfo_${index}`]: singleownerDetails,
    }
  })
  return ownerForms
}

export const getpropertyAddressDetails = (property) => {
  let propertyAddressForm = {
    "propertyAddress": addData(cloneDeep(propertyAddress), get(property, "address", {}))
  }
  set(propertyAddressForm, "propertyAddress.fields.oldPID.value", get(property, "oldPropertyId", ""))
  set(propertyAddressForm, "propertyAddress.fields.city.value", get(property, "tenantId", ""))
  set(propertyAddressForm, "propertyAddress.fields.mohalla.value", get(property, "address.locality.code", ""))

  return propertyAddressForm
}

export const getInstituteDetails = (property) => {
  const instituteDetailsForms = {
    "institutionDetails": addData(cloneDeep(institutionDetails), get(property, "propertyDetails[0].institution", {})),
  }
  return instituteDetailsForms
}

export const getInstituteAuthority = (property) => {
  const instituteDataFromApi = get(property, "propertyDetails[0].owners", [])
  let instituteAuthorityForm = {}
  instituteDataFromApi.forEach((instituteDetails, index) => {
    if (!!instituteDetails.altContactNumber) {
      instituteAuthorityForm = {
        "institutionAuthority": addData(cloneDeep(institutionAuthority), instituteDetails),
      }
    }
  })
  set(instituteAuthorityForm, "institutionAuthority.fields.designation.value", get(property, "propertyDetails[0].institution.designation", ""))

  return instituteAuthorityForm
}

export const getAssesmentDetails = () => {
  return {"plotDetails":{"fields":{"occupancy":{"id":"assessment-occupancy","type":"singleValueList","value":"SELFOCCUPIED","numcols":4,"hintText":"Select","jsonPath":"Properties[0].propertyDetails[0].units[0].occupancyType","required":true,"errorText":"","dropDownData":[{"label":"Rented","value":"RENTED"},{"label":"Self-Occupied","value":"SELFOCCUPIED"},{"label":"Unoccupied","value":"UNOCCUPIED"}],"requiredmessage":"Required","floatingLabelText":"Occupancy"},"superArea":{"id":"assessment-super-area","type":"number","value":"2222","numcols":4,"pattern":{},"toolTip":true,"hintText":"Enter Super Built-up Area","jsonPath":"Properties[0].propertyDetails[0].buildUpArea","required":true,"ErrorText":"Enter a valid super area size","errorText":"","hideField":false,"errorStyle":{"bottom":-8,"zIndex":5,"position":"absolute"},"errorMessage":"Enter a valid super area size","toolTipMessage":"Total Carpet Area + Total balcony area + Total thickness of outer walls + Total common area (lift, stairs, lobby etc.)","requiredmessage":"Required","floatingLabelText":"Total Super Built-up Area (sq ft)"},"usageType":{"id":"assessment-usageType","type":"textfield","value":"Residential","numcols":4,"disabled":true,"jsonPath":"Properties[0].propertyDetails[0].units[0].usageCategoryMajor","required":true,"requiredmessage":"Required","floatingLabelText":"Unit Usage Type"},"annualRent":{"id":"assessment-annual-rent","type":"number","numcols":4,"pattern":{},"toolTip":true,"hintText":"Enter annual rent","jsonPath":"Properties[0].propertyDetails[0].units[0].arv","required":true,"ErrorText":"Enter a valid amount","hideField":true,"errorStyle":{"bottom":-8,"zIndex":5,"position":"absolute"},"toolTipMessage":"PT_TOTAL_ANNUAL_RENT_TOOLTIP_MESSAGE","requiredmessage":"Required","floatingLabelText":"Total Annual Rent (INR)"},"subUsageType":{"id":"assessment-subUsageType","type":"singleValueList","value":null,"numcols":4,"hintText":"Select","jsonPath":"Properties[0].propertyDetails[0].units[0].usageCategoryDetail","required":true,"hideField":true,"errorStyle":{"bottom":-8,"zIndex":5,"position":"absolute"},"dropDownData":[],"requiredmessage":"Required","floatingLabelText":"Sub Usage Type"}},"submit":{},"isFormValid":false},"basicInformation":{"action":"","fields":{"typeOfUsage":{"id":"typeOfUsage","type":"singleValueList","value":"RESIDENTIAL","hintText":"Select","jsonPath":"Properties[0].propertyDetails[0].usageCategoryMinor","required":true,"errorText":"","fullWidth":true,"dropDownData":[{"label":"Commercial","value":"COMMERCIAL"},{"label":"Industrial","value":"INDUSTRIAL"},{"label":"Institutional","value":"INSTITUTIONAL"},{"label":"Other Non-Residential","value":"OTHERS"},{"label":"Residential","value":"RESIDENTIAL"},{"label":"Mixed","value":"MIXED"}],"requiredmessage":"Required","floatingLabelText":"Property Usage Type"},"typeOfBuilding":{"id":"typeOfBuilding","type":"singleValueList","value":"SHAREDPROPERTY","hintText":"Select","jsonPath":"Properties[0].propertyDetails[0].propertySubType","required":true,"errorText":"","fullWidth":true,"dropDownData":[{"label":"Flat/Part of the building","value":"SHAREDPROPERTY"},{"label":"Independent Building","value":"INDEPENDENTPROPERTY"},{"label":"Vacant Land","value":"VACANT"}],"requiredmessage":"Required","floatingLabelText":"Property Type"}},"submit":{},"saveUrl":"","isFormValid":false,"redirectionRoute":""}}
}


export const convertRawDataToFormConfig = (property) => {
  let res = {}
  let ownerForms = {}
  let institutionAuthority = {}
  let institutionDetails = {}
  let ownerShipForm = getOwnerShipDetails(property)
  let propertyAddress = getpropertyAddressDetails(property)
  let assessmentForms = getAssesmentDetails()
  const ownershipType = get(ownerShipForm, "ownershipType.fields.typeOfOwnership.value", "")

  if (ownershipType === "MULTIPLEOWNERS" || ownershipType === "SINGLEOWNER") {
    ownerForms = getAllOwnerDetails(property, ownershipType === "SINGLEOWNER")
  } else if (ownershipType.toLowerCase().indexOf("insti") !== -1) {
    institutionAuthority = getInstituteAuthority(property)
    institutionDetails = getInstituteDetails(property)
    set(ownerShipForm, "ownershipType.fields.typeOfOwnership.value", get(property, "propertyDetails[0].ownershipCategory", ""))
  } else {
    //TODO
  }

  return {
    ...res,
    ...ownerForms,
    ...ownerShipForm,
    ...institutionAuthority,
    ...institutionDetails,
    ...propertyAddress,
    ...assessmentForms,
    selectedTabIndex: 3,
  }
}
