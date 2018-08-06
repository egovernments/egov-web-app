"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getOwnerInfoFormConfigPath = undefined;

var _form = require("egov-ui-kit/hocs/form");

var _form2 = _interopRequireDefault(_form);

var _GenericForm = require("../components/GenericForm");

var _GenericForm2 = _interopRequireDefault(_GenericForm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var combinationToFormkeyMapping = {
  Institution: {
    ownerForm: (0, _form2.default)({ formKey: "institutionDetails", path: "PropertyTaxPay/OwnerInformation/Institution" })(_GenericForm2.default)
  }
};

var getOwnerInfoFormConfigPath = exports.getOwnerInfoFormConfigPath = function getOwnerInfoFormConfigPath(typeOfOwner) {
  return combinationToFormkeyMapping.hasOwnProperty(typeOfOwner) ? combinationToFormkeyMapping[typeOfOwner] : null;
};