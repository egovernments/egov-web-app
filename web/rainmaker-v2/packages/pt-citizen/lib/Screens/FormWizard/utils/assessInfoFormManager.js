"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPlotAndFloorFormConfigPath = undefined;

var _form = require("egov-ui-kit/hocs/form");

var _form2 = _interopRequireDefault(_form);

var _GenericForm = require("../components/GenericForm");

var _GenericForm2 = _interopRequireDefault(_GenericForm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var combinationToFormkeyMapping = {
  "RESIDENTIAL-INDEPENDENTPROPERTY": {
    path: "PropertyTaxPay/ResidentialIndependantProperty",
    plotForm: (0, _form2.default)({ formKey: "plotDetails", path: "PropertyTaxPay/ResidentialIndependantProperty" })(_GenericForm2.default),
    floorForm: (0, _form2.default)({ formKey: "floorDetails", makeCopy: true, path: "PropertyTaxPay/ResidentialIndependantProperty" })(_GenericForm2.default),
    floorObject: { formKey: "floorDetails", makeCopy: true, copyName: "floorDetails", path: "PropertyTaxPay/ResidentialIndependantProperty" },
    hasPlot: true,
    hasFloor: true
  },
  "RESIDENTIAL-SHAREDPROPERTY": {
    path: "PropertyTaxPay/ResidentialSharedProperty",
    plotForm: (0, _form2.default)({ formKey: "plotDetails", path: "PropertyTaxPay/ResidentialSharedProperty" })(_GenericForm2.default),
    floorObject: { formKey: "floorDetails", makeCopy: true, copyName: "floorDetails", path: "PropertyTaxPay/ResidentialIndependantProperty" },
    hasPlot: true,
    hasFloor: false
  },
  "MIXED-INDEPENDENTPROPERTY": {
    path: "PropertyTaxPay/MixedIndependantProperty",
    plotForm: (0, _form2.default)({ formKey: "plotDetails", path: "PropertyTaxPay/MixedIndependantProperty" })(_GenericForm2.default),
    floorForm: (0, _form2.default)({ formKey: "floorDetails", makeCopy: true, path: "PropertyTaxPay/MixedIndependantProperty" })(_GenericForm2.default),
    floorObject: { formKey: "floorDetails", makeCopy: true, copyName: "floorDetails", path: "PropertyTaxPay/ResidentialIndependantProperty" },
    hasPlot: true,
    hasFloor: true
  },
  "MIXED-SHAREDPROPERTY": {
    path: "PropertyTaxPay/MixedSharedProperty",
    plotForm: (0, _form2.default)({ formKey: "plotDetails", path: "PropertyTaxPay/MixedSharedProperty" })(_GenericForm2.default),
    hasPlot: true,
    hasFloor: false
  },
  "COMMERCIAL-INDEPENDENTPROPERTY": {
    path: "PropertyTaxPay/CommercialIndependantProperty",
    plotForm: (0, _form2.default)({ formKey: "plotDetails", path: "PropertyTaxPay/CommercialIndependantProperty" })(_GenericForm2.default),
    floorForm: (0, _form2.default)({ formKey: "floorDetails", makeCopy: true, path: "PropertyTaxPay/CommercialIndependantProperty" })(_GenericForm2.default),
    floorObject: { formKey: "floorDetails", makeCopy: true, copyName: "floorDetails", path: "PropertyTaxPay/CommercialIndependantProperty" },
    hasPlot: true,
    hasFloor: true
  },
  "COMMERCIAL-SHAREDPROPERTY": {
    path: "PropertyTaxPay/CommercialSharedProperty",
    plotForm: (0, _form2.default)({ formKey: "plotDetails", path: "PropertyTaxPay/CommercialSharedProperty" })(_GenericForm2.default),
    floorForm: (0, _form2.default)({ formKey: "floorDetails", makeCopy: true, path: "PropertyTaxPay/CommercialSharedProperty" })(_GenericForm2.default),
    floorObject: { formKey: "floorDetails", makeCopy: true, copyName: "floorDetails", path: "PropertyTaxPay/CommercialSharedProperty" },
    hasPlot: true,
    hasFloor: true
  },
  "INDUSTRIAL-INDEPENDENTPROPERTY": {
    path: "PropertyTaxPay/IndustrialIndependantProperty",
    plotForm: (0, _form2.default)({ formKey: "plotDetails", path: "PropertyTaxPay/IndustrialIndependantProperty" })(_GenericForm2.default),
    floorForm: (0, _form2.default)({ formKey: "floorDetails", makeCopy: true, path: "PropertyTaxPay/IndustrialIndependantProperty" })(_GenericForm2.default),
    floorObject: { formKey: "floorDetails", makeCopy: true, copyName: "floorDetails", path: "PropertyTaxPay/IndustrialIndependantProperty" },
    hasPlot: true,
    hasFloor: true
  },
  "INDUSTRIAL-SHAREDPROPERTY": {
    path: "PropertyTaxPay/IndustrialSharedProperty",
    plotForm: (0, _form2.default)({ formKey: "plotDetails", path: "PropertyTaxPay/IndustrialSharedProperty" })(_GenericForm2.default),
    hasPlot: true,
    hasFloor: false
  },
  "INSTITUTIONAL-INDEPENDENTPROPERTY": {
    path: "PropertyTaxPay/InstitutionalIndependantProperty",
    plotForm: (0, _form2.default)({ formKey: "plotDetails", path: "PropertyTaxPay/InstitutionalIndependantProperty" })(_GenericForm2.default),
    floorForm: (0, _form2.default)({ formKey: "floorDetails", makeCopy: true, path: "PropertyTaxPay/InstitutionalIndependantProperty" })(_GenericForm2.default),
    floorObject: { formKey: "floorDetails", makeCopy: true, copyName: "floorDetails", path: "PropertyTaxPay/InstitutionalIndependantProperty" },
    hasPlot: true,
    hasFloor: true
  },
  "INSTITUTIONAL-SHAREDPROPERTY": {
    path: "PropertyTaxPay/InstitutionalSharedProperty",
    plotForm: (0, _form2.default)({ formKey: "plotDetails", path: "PropertyTaxPay/InstitutionalSharedProperty" })(_GenericForm2.default),
    hasPlot: true,
    hasFloor: false
  },
  "OTHER-INDEPENDENTPROPERTY": {
    path: "PropertyTaxPay/OtherIndependantProperty",
    plotForm: (0, _form2.default)({ formKey: "plotDetails", path: "PropertyTaxPay/OtherIndependantProperty" })(_GenericForm2.default),
    floorForm: (0, _form2.default)({ formKey: "floorDetails", makeCopy: true, path: "PropertyTaxPay/OtherIndependantProperty" })(_GenericForm2.default),
    floorObject: { formKey: "floorDetails", makeCopy: true, copyName: "floorDetails", path: "PropertyTaxPay/OtherIndependantProperty" },
    hasPlot: true,
    hasFloor: true
  },
  "OTHER-SHAREDPROPERTY": {
    path: "PropertyTaxPay/OtherSharedProperty",
    plotForm: (0, _form2.default)({ formKey: "plotDetails", path: "PropertyTaxPay/OtherSharedProperty" })(_GenericForm2.default),
    hasPlot: true,
    hasFloor: false
  },
  "PUBLICSPACE-INDEPENDENTPROPERTY": {
    path: "PropertyTaxPay/PublicSpaceIndependantProperty",
    plotForm: (0, _form2.default)({ formKey: "plotDetails", path: "PropertyTaxPay/PublicSpaceIndependantProperty" })(_GenericForm2.default),
    floorForm: (0, _form2.default)({ formKey: "floorDetails", makeCopy: true, path: "PropertyTaxPay/PublicSpaceIndependantProperty" })(_GenericForm2.default),
    floorObject: { formKey: "floorDetails", makeCopy: true, copyName: "floorDetails", path: "PropertyTaxPay/PublicSpaceIndependantProperty" },
    hasPlot: true,
    hasFloor: true
  },
  "COMMON-VACANT": {
    path: "PropertyTaxPay/CommonVacantLandProperty",
    plotForm: (0, _form2.default)({ formKey: "plotDetails", path: "PropertyTaxPay/CommonVacantLandProperty" })(_GenericForm2.default),
    hasPlot: true,
    hasFloor: false
  }
};

var getPlotAndFloorFormConfigPath = exports.getPlotAndFloorFormConfigPath = function getPlotAndFloorFormConfigPath(usage, propertyType) {
  return combinationToFormkeyMapping.hasOwnProperty(usage + "-" + propertyType) ? combinationToFormkeyMapping[usage + "-" + propertyType] : combinationToFormkeyMapping["COMMON-VACANT"];
};