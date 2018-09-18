"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _formSubmit = require("./formSubmit");

var _formSubmit2 = _interopRequireDefault(_formSubmit);

var _validation = require("./validation");

var _validation2 = _interopRequireDefault(_validation);

var _formHooks = require("./formHooks.js");

var _formHooks2 = _interopRequireDefault(_formHooks);

var _initField = require("./initField.js");

var _initField2 = _interopRequireDefault(_initField);

var _translateFieldText = require("./translateFieldText");

var _translateFieldText2 = _interopRequireDefault(_translateFieldText);

var _initForm = require("./initForm");

var _initForm2 = _interopRequireDefault(_initForm);

var _removeForm = require("./removeForm");

var _removeForm2 = _interopRequireDefault(_removeForm);

var _onSetField = require("./onSetField");

var _onSetField2 = _interopRequireDefault(_onSetField);

var _updateForm = require("./updateForm");

var _updateForm2 = _interopRequireDefault(_updateForm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var composedMiddleware = [_initForm2.default, _formHooks2.default, _initField2.default, _formSubmit2.default, _translateFieldText2.default, _validation2.default, _removeForm2.default, _onSetField2.default, _updateForm2.default];
exports.default = composedMiddleware;