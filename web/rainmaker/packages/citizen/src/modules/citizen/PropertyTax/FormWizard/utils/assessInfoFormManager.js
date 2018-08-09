import formHoc from "egov-ui-kit/hocs/form";
import GenericForm from "../components/GenericForm";

const combinationToFormkeyMapping = {
  "RESIDENTIAL-INDEPENDENTPROPERTY": {
    path: "PropertyTaxPay/ResidentialIndependantProperty",
    plotForm: formHoc({ formKey: "plotDetails", path: "PropertyTaxPay/ResidentialIndependantProperty" })(GenericForm),
    floorForm: formHoc({ formKey: "floorDetails", makeCopy: true, path: "PropertyTaxPay/ResidentialIndependantProperty" })(GenericForm),
    floorObject: { formKey: "floorDetails", makeCopy: true, copyName: "floorDetails", path: "PropertyTaxPay/ResidentialIndependantProperty" },
    hasPlot: true,
    hasFloor: true,
  },
  "RESIDENTIAL-SHAREDPROPERTY": {
    path: "PropertyTaxPay/ResidentialSharedProperty",
    plotForm: formHoc({ formKey: "plotDetails", path: "PropertyTaxPay/ResidentialSharedProperty" })(GenericForm),
    floorObject: { formKey: "floorDetails", makeCopy: true, copyName: "floorDetails", path: "PropertyTaxPay/ResidentialIndependantProperty" },
    hasPlot: true,
    hasFloor: false,
  },
  "MIXED-INDEPENDENTPROPERTY": {
    path: "PropertyTaxPay/MixedIndependantProperty",
    plotForm: formHoc({ formKey: "plotDetails", path: "PropertyTaxPay/MixedIndependantProperty" })(GenericForm),
    floorForm: formHoc({ formKey: "floorDetails", makeCopy: true, path: "PropertyTaxPay/MixedIndependantProperty" })(GenericForm),
    floorObject: { formKey: "floorDetails", makeCopy: true, copyName: "floorDetails", path: "PropertyTaxPay/MixedIndependantProperty" },
    hasPlot: true,
    hasFloor: true,
  },
  "MIXED-SHAREDPROPERTY": {
    path: "PropertyTaxPay/MixedSharedProperty",
    plotForm: formHoc({ formKey: "plotDetails", path: "PropertyTaxPay/MixedSharedProperty" })(GenericForm),
    hasPlot: true,
    hasFloor: false,
  },
  "COMMERCIAL-INDEPENDENTPROPERTY": {
    path: "PropertyTaxPay/CommercialIndependantProperty",
    plotForm: formHoc({ formKey: "plotDetails", path: "PropertyTaxPay/CommercialIndependantProperty" })(GenericForm),
    floorForm: formHoc({ formKey: "floorDetails", makeCopy: true, path: "PropertyTaxPay/CommercialIndependantProperty" })(GenericForm),
    floorObject: { formKey: "floorDetails", makeCopy: true, copyName: "floorDetails", path: "PropertyTaxPay/CommercialIndependantProperty" },
    hasPlot: true,
    hasFloor: true,
  },
  "COMMERCIAL-SHAREDPROPERTY": {
    path: "PropertyTaxPay/CommercialSharedProperty",
    plotForm: formHoc({ formKey: "plotDetails", path: "PropertyTaxPay/CommercialSharedProperty" })(GenericForm),
    hasPlot: true,
    hasFloor: false,
  },
  "INDUSTRIAL-INDEPENDENTPROPERTY": {
    path: "PropertyTaxPay/IndustrialIndependantProperty",
    plotForm: formHoc({ formKey: "plotDetails", path: "PropertyTaxPay/IndustrialIndependantProperty" })(GenericForm),
    floorForm: formHoc({ formKey: "floorDetails", makeCopy: true, path: "PropertyTaxPay/IndustrialIndependantProperty" })(GenericForm),
    floorObject: { formKey: "floorDetails", makeCopy: true, copyName: "floorDetails", path: "PropertyTaxPay/IndustrialIndependantProperty" },
    hasPlot: true,
    hasFloor: true,
  },
  "INDUSTRIAL-SHAREDPROPERTY": {
    path: "PropertyTaxPay/IndustrialSharedProperty",
    plotForm: formHoc({ formKey: "plotDetails", path: "PropertyTaxPay/IndustrialSharedProperty" })(GenericForm),
    hasPlot: true,
    hasFloor: false,
  },
  "RELIGIOUS-INDEPENDENTPROPERTY": {
    path: "PropertyTaxPay/ReligiousIndependantProperty",
    plotForm: formHoc({ formKey: "plotDetails", path: "PropertyTaxPay/ReligiousIndependantProperty" })(GenericForm),
    floorForm: formHoc({ formKey: "floorDetails", makeCopy: true, path: "PropertyTaxPay/ReligiousIndependantProperty" })(GenericForm),
    floorObject: { formKey: "floorDetails", makeCopy: true, copyName: "floorDetails", path: "PropertyTaxPay/ReligiousIndependantProperty" },
    hasPlot: true,
    hasFloor: true,
  },
  "RELIGIOUS-SHAREDPROPERTY": {
    path: "PropertyTaxPay/ReligiousSharedProperty",
    plotForm: formHoc({ formKey: "plotDetails", path: "PropertyTaxPay/ReligiousSharedProperty" })(GenericForm),
    hasPlot: true,
    hasFloor: false,
  },
  "INSTITUTIONAL-INDEPENDENTPROPERTY": {
    path: "PropertyTaxPay/InstitutionalIndependantProperty",
    plotForm: formHoc({ formKey: "plotDetails", path: "PropertyTaxPay/InstitutionalIndependantProperty" })(GenericForm),
    floorForm: formHoc({ formKey: "floorDetails", makeCopy: true, path: "PropertyTaxPay/InstitutionalIndependantProperty" })(GenericForm),
    floorObject: { formKey: "floorDetails", makeCopy: true, copyName: "floorDetails", path: "PropertyTaxPay/InstitutionalIndependantProperty" },
    hasPlot: true,
    hasFloor: true,
  },
  "INSTITUTIONAL-SHAREDPROPERTY": {
    path: "PropertyTaxPay/InstitutionalSharedProperty",
    plotForm: formHoc({ formKey: "plotDetails", path: "PropertyTaxPay/InstitutionalSharedProperty" })(GenericForm),
    hasPlot: true,
    hasFloor: false,
  },
  "OTHERS-INDEPENDENTPROPERTY": {
    path: "PropertyTaxPay/OtherIndependantProperty",
    plotForm: formHoc({ formKey: "plotDetails", path: "PropertyTaxPay/OtherIndependantProperty" })(GenericForm),
    floorForm: formHoc({ formKey: "floorDetails", makeCopy: true, path: "PropertyTaxPay/OtherIndependantProperty" })(GenericForm),
    floorObject: { formKey: "floorDetails", makeCopy: true, copyName: "floorDetails", path: "PropertyTaxPay/OtherIndependantProperty" },
    hasPlot: true,
    hasFloor: true,
  },
  "OTHERS-SHAREDPROPERTY": {
    path: "PropertyTaxPay/OtherSharedProperty",
    plotForm: formHoc({ formKey: "plotDetails", path: "PropertyTaxPay/OtherSharedProperty" })(GenericForm),
    hasPlot: true,
    hasFloor: false,
  },
  "PUBLICSPACES-INDEPENDENTPROPERTY": {
    path: "PropertyTaxPay/PublicSpaceIndependantProperty",
    plotForm: formHoc({ formKey: "plotDetails", path: "PropertyTaxPay/PublicSpaceIndependantProperty" })(GenericForm),
    floorForm: formHoc({ formKey: "floorDetails", makeCopy: true, path: "PropertyTaxPay/PublicSpaceIndependantProperty" })(GenericForm),
    floorObject: { formKey: "floorDetails", makeCopy: true, copyName: "floorDetails", path: "PropertyTaxPay/PublicSpaceIndependantProperty" },
    hasPlot: true,
    hasFloor: true,
  },
  "PUBLICSPACES-SHAREDPROPERTY": {
    path: "PropertyTaxPay/PublicSpaceSharedProperty",
    plotForm: formHoc({ formKey: "plotDetails", path: "PropertyTaxPay/PublicSpaceSharedProperty" })(GenericForm),
    hasPlot: true,
    hasFloor: false,
  },
  "COMMON-VACANT": {
    path: "PropertyTaxPay/CommonVacantLandProperty",
    plotForm: formHoc({ formKey: "plotDetails", path: "PropertyTaxPay/CommonVacantLandProperty" })(GenericForm),
    hasPlot: true,
    hasFloor: false,
  },
};

export const getPlotAndFloorFormConfigPath = (usage, propertyType) => {
  return combinationToFormkeyMapping.hasOwnProperty(`${usage}-${propertyType}`)
    ? combinationToFormkeyMapping[`${usage}-${propertyType}`]
    : combinationToFormkeyMapping["COMMON-VACANT"];
};
