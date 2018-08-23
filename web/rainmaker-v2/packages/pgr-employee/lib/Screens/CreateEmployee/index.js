'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends4 = require('babel-runtime/helpers/extends');

var _extends5 = _interopRequireDefault(_extends4);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _RaisedButton = require('material-ui/RaisedButton');

var _RaisedButton2 = _interopRequireDefault(_RaisedButton);

var _translationNode = require('egov-ui-kit/utils/translationNode');

var _translationNode2 = _interopRequireDefault(_translationNode);

var _FlatButton = require('material-ui/FlatButton');

var _FlatButton2 = _interopRequireDefault(_FlatButton);

var _Tabs = require('material-ui/Tabs');

var _reactBootstrap = require('react-bootstrap');

var _Card = require('material-ui/Card');

var _RadioButton = require('material-ui/RadioButton');

var _TextField = require('material-ui/TextField');

var _TextField2 = _interopRequireDefault(_TextField);

var _SelectField = require('material-ui/SelectField');

var _SelectField2 = _interopRequireDefault(_SelectField);

var _MenuItem = require('material-ui/MenuItem');

var _MenuItem2 = _interopRequireDefault(_MenuItem);

var _FloatingActionButton = require('material-ui/FloatingActionButton');

var _FloatingActionButton2 = _interopRequireDefault(_FloatingActionButton);

var _Dialog = require('material-ui/Dialog');

var _Dialog2 = _interopRequireDefault(_Dialog);

var _Common = require('./components/Common');

var _AutoComplete = require('material-ui/AutoComplete');

var _AutoComplete2 = _interopRequireDefault(_AutoComplete);

var _api = require('./components/api');

var _api2 = _interopRequireDefault(_api);

require('./index.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var headerStyle = {
  backgroundColor: "#607d8b",
  color: "#fff",
  padding: "10px",
  fontWeight: "500",
  fontSize: "14px"
};

var labelStyle = {
  color: "#ffffff"
};

var containerStyle = {
  whiteSpace: "pre"
};

var textfieldLabelStyle = {
  fontSize: "20px"
};

var datePat = /^(((0[1-9]|[12]\d|3[01])\/(0[13578]|1[02])\/((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)\/(0[13456789]|1[012])\/((19|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])\/02\/((19|[2-9]\d)\d{2}))|(29\/02\/((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))))$/g;
var checkIfNoDup = function checkIfNoDup(employee, subObject) {
  if (employee['jurisdictions'].length === 0) return true;else {
    for (var i = 0; i < employee['jurisdictions'].length; i++) {
      if (employee['jurisdictions'][i] == subObject) return false;
    }
  }

  return true;
};

var validateDates = function validateDates(employee, subObject, editIndex) {
  if (subObject.isPrimary == 'true' || subObject.isPrimary == true) {
    for (var i = 0; i < employee['assignments'].length; i++) {
      if (employee['assignments'][i].isPrimary && (editIndex === '' || editIndex > -1 && i != editIndex)) {
        var subFromDate = new Date(subObject.fromDate.split('/')[1] + '/' + subObject.fromDate.split('/')[0] + '/' + subObject.fromDate.split('/')[2]).getTime();
        var fromDate = new Date(employee['assignments'][i].fromDate.split('/')[1] + '/' + employee['assignments'][i].fromDate.split('/')[0] + '/' + employee['assignments'][i].fromDate.split('/')[2]).getTime();
        var subToDate = new Date(subObject.toDate.split('/')[1] + '/' + subObject.toDate.split('/')[0] + '/' + subObject.toDate.split('/')[2]).getTime();
        var toDate = new Date(employee['assignments'][i].toDate.split('/')[1] + '/' + employee['assignments'][i].toDate.split('/')[0] + '/' + employee['assignments'][i].toDate.split('/')[2]).getTime();

        if (fromDate >= subFromDate && fromDate <= subToDate || toDate >= subFromDate && toDate <= subToDate || subFromDate >= fromDate && subFromDate <= toDate || subToDate >= fromDate && subToDate <= toDate) {
          return false;
        }
      }
    }
  }

  return true;
};

var getNameById = function getNameById(object, id) {
  if (!id) return '';
  for (var i = 0; i < object.length; i++) {
    if (id == object[i].id) return object[i].name || object[i].code;
  }
};

var checkRequiredFields = function checkRequiredFields(type, object) {
  var errorText = {};
  switch (type) {
    case 'assignment':
      if (!object.fromDate) {
        errorText['assignments.fromDate'] = (0, _Common.translate)('ui.framework.required');
      } else if (!object.toDate) {
        errorText['assignments.toDate'] = (0, _Common.translate)('ui.framework.required');
      } else if (!object.department) {
        errorText['assignments.department'] = (0, _Common.translate)('ui.framework.required');
      } else if (!object.designation) {
        errorText['assignments.designation'] = (0, _Common.translate)('ui.framework.required');
      } else if (!object.position) {
        errorText['assignments.position'] = (0, _Common.translate)('ui.framework.required');
      } else if ((object.hod == true || object.hod == 'true') && (!object.mainDepartments || object.mainDepartments && object.mainDepartments.length == 0)) {
        errorText['assignments.mainDepartments'] = (0, _Common.translate)('ui.framework.required');
      }
      break;
    case 'jurisdiction':
      if (!object.jurisdictionsType) {
        errorText['jurisdictions.jurisdictionsType'] = (0, _Common.translate)('ui.framework.required');
      } else if (!object.boundary) {
        errorText['jurisdictions.boundary'] = (0, _Common.translate)('ui.framework.required');
      }
      break;
    case 'serviceDet':
      if (!object.serviceInfo) {
        errorText['serviceHistory.serviceInfo'] = (0, _Common.translate)('ui.framework.required');
      } else if (!object.serviceFrom) {
        errorText['serviceHistory.serviceFrom'] = (0, _Common.translate)('ui.framework.required');
      }
      break;
    case 'probation':
      if (!object.designation) {
        errorText['probation.designation'] = (0, _Common.translate)('ui.framework.required');
      } else if (!object.declaredOn) {
        errorText['probation.declaredOn'] = (0, _Common.translate)('ui.framework.required');
      } else if (!object.orderDate) {
        errorText['probation.orderDate'] = (0, _Common.translate)('ui.framework.required');
      }
      break;
    case 'regular':
      if (!object.designation) {
        errorText['regularisation.designation'] = (0, _Common.translate)('ui.framework.required');
      } else if (!object.declaredOn) {
        errorText['regularisation.declaredOn'] = (0, _Common.translate)('ui.framework.required');
      } else if (!object.orderDate) {
        errorText['regularisation.orderDate'] = (0, _Common.translate)('ui.framework.required');
      }
      break;
    case 'edu':
      if (!object.qualification) {
        errorText['education.qualification'] = (0, _Common.translate)('ui.framework.required');
      } else if (!object.yearOfPassing) {
        errorText['education.yearOfPassing'] = (0, _Common.translate)('ui.framework.required');
      }
      break;
    case 'tech':
      if (!object.skill) {
        errorText['technical.skill'] = (0, _Common.translate)('ui.framework.required');
      }
      break;
    case 'dept':
      if (!object.test) {
        errorText['test.test'] = (0, _Common.translate)('ui.framework.required');
      } else if (!object.yearOfPassing) {
        errorText['test.yearOfPassing'] = (0, _Common.translate)('ui.framework.required');
      }
      break;
  }

  return errorText;
};

var hasFile = function hasFile(elements) {
  if (elements && elements.constructor == Array) {
    for (var i = 0; i < elements.length; i++) {
      if (elements[i].documents && elements[i].documents.constructor == Array) for (var j = 0; j < elements[i].documents.length; j++) {
        if (elements[i].documents[j].constructor == File) return true;
      }
    }
  }
  return false;
};

var isHavingPrimary = function isHavingPrimary(employee) {
  for (var i = 0; i < employee.assignments.length; i++) {
    if (employee.assignments[i].isPrimary == 'true' || employee.assignments[i].isPrimary == true) {
      return true;
    }
  }
  return false;
};

var makeAjaxUpload = function makeAjaxUpload(file, cb) {
  if (file.constructor == File) {
    var formData = new FormData();
    formData.append('jurisdictionId', localStorage.getItem('tenantId'));
    formData.append('module', 'HR');
    formData.append('file', file);

    _api2.default.commonApiPost('/filestore/v1/files', {}, formData).then(function (res) {
      cb(null, res);
    }, function (err) {
      cb('');
    });
  } else {
    cb(null, {
      files: [{
        fileStoreId: file
      }]
    });
  }
};

var uploadFiles = function uploadFiles(employee, cb) {
  var len = void 0;
  if (employee.user.photo && (0, _typeof3.default)(employee.user.photo) == 'object') {
    makeAjaxUpload(employee.user.photo[0], function (err, res) {
      if (err) {
        cb(err);
      } else {
        employee.user.photo = '' + res.files[0].fileStoreId;
        uploadFiles(employee, cb);
      }
    });
  } else if (employee.user.signature && (0, _typeof3.default)(employee.user.signature) == 'object') {
    makeAjaxUpload(employee.user.signature[0], function (err, res) {
      if (err) {
        cb(err);
      } else {
        employee.user.signature = '' + res.files[0].fileStoreId;
        uploadFiles(employee, cb);
      }
    });
  } else if (employee.documents && employee.documents.length && employee.documents[0].constructor == File) {
    (function () {
      var counter = employee.documents.length,
          breakout = 0;

      var _loop = function _loop(i, _len) {
        makeAjaxUpload(employee.documents[i], function (err, res) {
          if (breakout == 1) return;else if (err) {
            cb(err);
            breakout = 1;
          } else {
            counter--;
            employee.documents[i] = '' + res.files[0].fileStoreId;
            if (counter == 0 && breakout == 0) uploadFiles(employee, cb);
          }
        });
      };

      for (var i = 0, _len = employee.documents.length; i < _len; i++) {
        _loop(i, _len);
      }
    })();
  } else if (employee.assignments.length && hasFile(employee.assignments)) {
    (function () {
      var counter1 = employee.assignments.length,
          breakout = 0;

      var _loop2 = function _loop2(i) {
        var counter = employee.assignments[i].documents.length;

        var _loop3 = function _loop3(j, len1) {
          makeAjaxUpload(employee.assignments[i].documents[j], function (err, res) {
            if (breakout == 1) return;else if (err) {
              cb(err);
              breakout = 1;
            } else {
              counter--;
              employee.assignments[i].documents[j] = '' + res.files[0].fileStoreId;
              if (counter == 0 && breakout == 0) {
                counter1--;
                if (counter1 == 0 && breakout == 0) uploadFiles(employee, cb);
              }
            }
          });
        };

        for (var j = 0, len1 = employee.assignments[i].documents.length; j < len1; j++) {
          _loop3(j, len1);
        }
      };

      for (var i = 0; len = employee.assignments.length, i < len; i++) {
        _loop2(i);
      }
    })();
  } else if (employee.serviceHistory.length && hasFile(employee.serviceHistory)) {
    (function () {
      var counter1 = employee.serviceHistory.length,
          breakout = 0;

      var _loop4 = function _loop4(i) {
        var counter = employee.serviceHistory[i].documents.length;

        var _loop5 = function _loop5(j, len1) {
          makeAjaxUpload(employee.serviceHistory[i].documents[j], function (err, res) {
            if (breakout == 1) return;else if (err) {
              cb(err);
              breakout = 1;
            } else {
              counter--;
              employee.serviceHistory[i].documents[j] = '' + res.files[0].fileStoreId;
              if (counter == 0 && breakout == 0) {
                counter1--;
                if (counter1 == 0 && breakout == 0) uploadFiles(employee, cb);
              }
            }
          });
        };

        for (var j = 0, len1 = employee.serviceHistory[i].documents.length; j < len1; j++) {
          _loop5(j, len1);
        }
      };

      for (var i = 0; len = employee.serviceHistory.length, i < len; i++) {
        _loop4(i);
      }
    })();
  } else if (employee.probation.length && hasFile(employee.probation)) {
    (function () {
      var counter1 = employee.probation.length,
          breakout = 0;

      var _loop6 = function _loop6(i) {
        var counter = employee.probation[i].documents.length;

        var _loop7 = function _loop7(j, len1) {
          makeAjaxUpload(employee.probation[i].documents[j], function (err, res) {
            if (breakout == 1) return;else if (err) {
              cb(err);
              breakout = 1;
            } else {
              counter--;
              employee.probation[i].documents[j] = '' + res.files[0].fileStoreId;
              if (counter == 0 && breakout == 0) {
                counter1--;
                if (counter1 == 0 && breakout == 0) uploadFiles(employee, cb);
              }
            }
          });
        };

        for (var j = 0, len1 = employee.probation[i].documents.length; j < len1; j++) {
          _loop7(j, len1);
        }
      };

      for (var i = 0; len = employee.probation.length, i < len; i++) {
        _loop6(i);
      }
    })();
  } else if (employee.regularisation.length && hasFile(employee.regularisation)) {
    (function () {
      var counter1 = employee.regularisation.length,
          breakout = 0;

      var _loop8 = function _loop8(i) {
        var counter = employee.regularisation[i].documents.length;

        var _loop9 = function _loop9(j, len1) {
          makeAjaxUpload(employee.regularisation[i].documents[j], function (err, res) {
            if (breakout == 1) return;else if (err) {
              cb(err);
              breakout = 1;
            } else {
              counter--;
              employee.regularisation[i].documents[j] = '' + res.files[0].fileStoreId;
              if (counter == 0 && breakout == 0) {
                counter1--;
                if (counter1 == 0 && breakout == 0) uploadFiles(employee, cb);
              }
            }
          });
        };

        for (var j = 0, len1 = employee.regularisation[i].documents.length; j < len1; j++) {
          _loop9(j, len1);
        }
      };

      for (var i = 0; len = employee.regularisation.length, i < len; i++) {
        _loop8(i);
      }
    })();
  } else if (employee.technical.length && hasFile(employee.technical)) {
    (function () {
      var counter1 = employee.technical.length,
          breakout = 0;

      var _loop10 = function _loop10(i) {
        var counter = employee.technical[i].documents.length;

        var _loop11 = function _loop11(j, len1) {
          makeAjaxUpload(employee.technical[i].documents[j], function (err, res) {
            if (breakout == 1) return;else if (err) {
              cb(err);
              breakout = 1;
            } else {
              counter--;
              employee.technical[i].documents[j] = '' + res.files[0].fileStoreId;
              if (counter == 0 && breakout == 0) {
                counter1--;
                if (counter1 == 0 && breakout == 0) uploadFiles(employee, cb);
              }
            }
          });
        };

        for (var j = 0, len1 = employee.technical[i].documents.length; j < len1; j++) {
          _loop11(j, len1);
        }
      };

      for (var i = 0; len = employee.technical.length, i < len; i++) {
        _loop10(i);
      }
    })();
  } else if (employee.education.length && hasFile(employee.education)) {
    (function () {
      var counter1 = employee.education.length,
          breakout = 0;

      var _loop12 = function _loop12(i) {
        var counter = employee.education[i].documents.length;

        var _loop13 = function _loop13(j, len1) {
          makeAjaxUpload(employee.education[i].documents[j], function (err, res) {
            if (breakout == 1) return;else if (err) {
              cb(err);
              breakout = 1;
            } else {
              counter--;
              employee.education[i].documents[j] = '' + res.files[0].fileStoreId;
              if (counter == 0 && breakout == 0) {
                counter1--;
                if (counter1 == 0 && breakout == 0) uploadFiles(employee, cb);
              }
            }
          });
        };

        for (var j = 0, len1 = employee.education[i].documents.length; j < len1; j++) {
          _loop13(j, len1);
        }
      };

      for (var i = 0; len = employee.education.length, i < len; i++) {
        _loop12(i);
      }
    })();
  } else if (employee.test.length && hasFile(employee.test)) {
    (function () {
      var counter1 = employee.test.length,
          breakout = 0;

      var _loop14 = function _loop14(i) {
        var counter = employee.test[i].documents.length;

        var _loop15 = function _loop15(j, len1) {
          makeAjaxUpload(employee.test[i].documents[j], function (err, res) {
            if (breakout == 1) return;else if (err) {
              cb(err);
              breakout = 1;
            } else {
              counter--;
              employee.test[i].documents[j] = '' + res.files[0].fileStoreId;
              if (counter == 0 && breakout == 0) {
                counter1--;
                if (counter1 == 0 && breakout == 0) uploadFiles(employee, cb);
              }
            }
          });
        };

        for (var j = 0, len1 = employee.test[i].documents.length; j < len1; j++) {
          _loop15(j, len1);
        }
      };

      for (var i = 0; len = employee.test.length, i < len; i++) {
        _loop14(i);
      }
    })();
  } else {
    cb(null, employee);
  }
};

var getBoundaryValues = function getBoundaryValues(allBoundariesList, boundary, self, ind) {
  for (var i = 0; i < allBoundariesList.length; i++) {
    if (allBoundariesList[i].id == boundary) {
      return _react2.default.createElement(
        'tr',
        { key: ind },
        _react2.default.createElement(
          'td',
          null,
          allBoundariesList[i].boundaryType.name
        ),
        _react2.default.createElement(
          'td',
          null,
          allBoundariesList[i].name
        ),
        _react2.default.createElement(
          'td',
          null,
          self.state.screenType != 'view' && _react2.default.createElement('span', {
            className: 'glyphicon glyphicon-pencil',
            onClick: function onClick() {
              self.editModalOpen(ind, 'jurisdictions');
            }
          }),
          '\xA0\xA0',
          self.state.screenType != 'view' && _react2.default.createElement('span', {
            className: 'glyphicon glyphicon-trash',
            onClick: function onClick() {
              self.delModalOpen(ind, 'jurisdictions');
            }
          })
        )
      );
    }
  }
};

var assignmentsDefState = {
  fromDate: '',
  toDate: '',
  department: '',
  designation: '',
  position: '',
  isPrimary: false,
  fund: '',
  function: '',
  functionary: '',
  grade: '',
  hod: false,
  govtOrderNumber: '',
  documents: null
};
var jurisDefState = {
  jurisdictionsType: '',
  boundary: ''
};
var serviceDefState = {
  serviceInfo: '',
  serviceFrom: '',
  remarks: '',
  orderNo: '',
  documents: null
};
var probDefState = {
  designation: '',
  declaredOn: '',
  orderNo: '',
  orderDate: '',
  remarks: '',
  documents: null
};
var regDefState = {
  designation: '',
  declaredOn: '',
  orderNo: '',
  orderDate: '',
  remarks: '',
  documents: null
};
var eduDefState = {
  qualification: '',
  majorSubject: '',
  yearOfPassing: '',
  university: '',
  documents: null
};
var techDefState = {
  skill: '',
  grade: '',
  yearOfPassing: '',
  remarks: '',
  documents: null
};
var deptDefState = {
  test: '',
  yearOfPassing: '',
  remarks: '',
  documents: null
};

var Employee = function (_Component) {
  (0, _inherits3.default)(Employee, _Component);

  function Employee(props) {
    (0, _classCallCheck3.default)(this, Employee);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Employee.__proto__ || Object.getPrototypeOf(Employee)).call(this, props));

    _this.setInitialState = function (_state) {
      _this.setState(_state);
    };

    _this.loadBranches = function (id) {
      var self = _this;
      if (!id) self.setState({
        bankBranches: []
      });
      _api2.default.commonApiPost('egf-masters/bankbranches/_search', { bank: id }).then(function (res) {
        self.setState({
          bankBranches: res['bankBranches']
        });
      }, function (err) {
        self.setState({
          bankBranches: []
        });
      });
    };

    _this.loadBoundaries = function (id) {
      var self = _this;
      _api2.default.commonApiPost('egov-location/boundarys/getByBoundaryType', {
        boundaryTypeId: id
      }).then(function (res) {
        self.setState({
          boundaries: res['Boundary']
        });
      }, function (err) {});
    };

    _this.getDate = function (dateStr) {
      if (dateStr && typeof dateStr == 'string') {
        if (dateStr.indexOf('/') > -1) {
          var dateArr = dateStr.split('/');
          return new Date(dateArr[2], Number(dateArr[1]) - 1, dateArr[0]);
        } else if (dateStr.indexOf('-') > -1) {
          var dateArr = dateStr.split('-');
          return new Date(dateArr[0], Number(dateArr[1]) - 1, dateArr[2]);
        }
      } else return '';
    };

    _this.handleClose = function () {
      _this.setState({
        open: false
      });
    };

    _this.handleStateChange = function (e, parent, key, isRequired, pattern) {
      var self = _this;
      var val = e.target.value,
          errorTxt = isRequired && (typeof val === 'undefined' || val === '') ? (0, _Common.translate)('ui.framework.required') : pattern && val && !pattern.test(val) ? (0, _Common.translate)('ui.framework.patternMessage') : '';
      var hasAllReqFields = true;
      var allFields = Object.assign({}, self.state.subObject[parent]);
      allFields[key] = val;
      switch (self.state.modal) {
        case 'assignment':
          if (!allFields['fromDate'] || !allFields['toDate'] || !allFields['department'] || !allFields['designation'] || !allFields['position'] || allFields['hod'] == true && !allFields['mainDepartments']) hasAllReqFields = false;
          break;
        case 'jurisdiction':
          if (!allFields['jurisdictionsType'] || !allFields['boundary']) hasAllReqFields = false;
          break;
        case 'serviceDet':
          if (!allFields['serviceInfo'] || !allFields['serviceFrom']) hasAllReqFields = false;
          break;
        case 'probation':
        case 'regular':
          if (!allFields['designation'] || !allFields['declaredOn'] || !allFields['orderDate']) hasAllReqFields = false;
          break;
        case 'edu':
          if (!allFields['qualification'] || !allFields['yearOfPassing']) hasAllReqFields = false;
          break;
        case 'tech':
          if (!allFields['skill']) hasAllReqFields = false;
          break;
        case 'dept':
          if (!allFields['test'] || !allFields['yearOfPassing']) hasAllReqFields = false;
          break;
      }
      self.setState({
        subObject: (0, _defineProperty3.default)({}, parent, (0, _extends5.default)({}, self.state.subObject[parent], (0, _defineProperty3.default)({}, key, val))),
        isModalInvalid: errorTxt || !hasAllReqFields,
        errorText: (0, _extends5.default)({}, self.state.errorText, (0, _defineProperty3.default)({}, parent + '.' + key, errorTxt))
      }, function () {
        self.vacantposition(parent);
      });
    };

    _this.vacantposition = function (parent) {
      var self = _this;
      if (parent == 'assignments' && self.state.subObject[parent].designation && self.state.subObject[parent].department) {
        if (self.state.subObject[parent].isPrimary == 'true' || self.state.subObject[parent].isPrimary == true) {
          if (self.state.subObject[parent].fromDate) {
            _api2.default.commonApiPost('hr-masters/vacantpositions/_search', {
              departmentId: self.state.subObject[parent].department,
              designationId: self.state.subObject[parent].designation,
              asOnDate: self.state.subObject[parent].fromDate,
              pageSize: 100
            }).then(function (res) {
              self.setState({
                positionList: res['Position']
              });
            }, function (err) {});
          }
        } else {
          _api2.default.commonApiPost('hr-masters/positions/_search', {
            departmentId: self.state.subObject[parent].department,
            designationId: self.state.subObject[parent].designation,
            pageSize: 100
          }).then(function (res) {
            self.setState({
              positionList: res['Position']
            });
          }, function (err) {});
        }
      }
    };

    _this.editModalOpen = function (ind, type) {
      var dat = void 0;
      var self = _this;
      switch (type) {
        case 'assignments':
          dat = Object.assign({}, _this.props.Employee.assignments[ind]);
          if (dat.hod && dat.hod.length) {
            dat.mainDepartments = [];
            for (var i = 0; i < dat.hod.length; i++) {
              dat.mainDepartments.push(dat.hod[i]['department']);
            }
            dat.hod = true;
          }
          _this.setState({
            open: true,
            modal: 'assignment',
            errorText: {},
            editIndex: ind,
            subObject: {
              assignments: dat
            }
          }, function () {
            self.vacantposition('assignments');
          });
          break;
        case 'jurisdictions':
          dat = {};
          for (var i = 0; i < _this.state.allBoundariesList.length; i++) {
            if (_this.props.Employee.jurisdictions[ind] == _this.state.allBoundariesList[i].id) {
              dat['jurisdictionsType'] = _this.state.allBoundariesList[i].boundaryType.id + '';
              _this.loadBoundaries(dat['jurisdictionsType']);
              dat['boundary'] = _this.state.allBoundariesList[i].id;
              break;
            }
          }
          _this.setState({
            open: true,
            modal: 'jurisdiction',
            errorText: {},
            editIndex: ind,
            subObject: {
              jurisdictions: dat
            }
          });
          break;
        case 'serviceDet':
          dat = Object.assign({}, _this.props.Employee.serviceHistory[ind]);
          _this.setState({
            open: true,
            modal: 'serviceDet',
            errorText: {},
            editIndex: ind,
            subObject: {
              serviceHistory: dat
            }
          });
          break;
        case 'probation':
          dat = Object.assign({}, _this.props.Employee.probation[ind]);
          _this.setState({
            open: true,
            modal: 'probation',
            errorText: {},
            editIndex: ind,
            subObject: {
              probation: dat
            }
          });
          break;
        case 'regular':
          dat = Object.assign({}, _this.props.Employee.regularisation[ind]);
          _this.setState({
            open: true,
            modal: 'regular',
            errorText: {},
            editIndex: ind,
            subObject: {
              regularisation: dat
            }
          });
          break;
        case 'edu':
          dat = Object.assign({}, _this.props.Employee.education[ind]);
          _this.setState({
            open: true,
            modal: 'edu',
            errorText: {},
            editIndex: ind,
            subObject: {
              education: dat
            }
          });
          break;
        case 'tech':
          dat = Object.assign({}, _this.props.Employee.technical[ind]);
          _this.setState({
            open: true,
            errorText: {},
            modal: 'tech',
            editIndex: ind,
            subObject: {
              technical: dat
            }
          });
          break;
        case 'dept':
          dat = Object.assign({}, _this.props.Employee.jurisdictions[ind]);
          _this.setState({
            open: true,
            errorText: {},
            modal: 'dept',
            editIndex: ind,
            subObject: {
              test: dat
            }
          });
          break;
      }
    };

    _this.delModalOpen = function (ind, type) {
      switch (type) {
        case 'assignments':
          var assignments = Object.assign([], _this.props.Employee.assignments);
          assignments.splice(ind);
          _this.props.handleChange({ target: { value: assignments } }, 'assignments', false, '');
          break;
        case 'jurisdictions':
          var jurisdictions = Object.assign([], _this.props.Employee.jurisdictions);
          assignments.splice(ind);
          _this.props.handleChange({ target: { value: jurisdictions } }, 'jurisdictions', false, '');
          break;
        case 'serviceDet':
          var serviceHistory = Object.assign([], _this.props.Employee.serviceHistory);
          serviceHistory.splice(ind);
          _this.props.handleChange({ target: { value: serviceHistory } }, 'serviceHistory', false, '');
          break;
        case 'probation':
          var probation = Object.assign([], _this.props.Employee.probation);
          probation.splice(ind);
          _this.props.handleChange({ target: { value: probation } }, 'probation', false, '');
          break;
        case 'regular':
          var regularisation = Object.assign([], _this.props.Employee.regularisation);
          regularisation.splice(ind);
          _this.props.handleChange({ target: { value: regularisation } }, 'regularisation', false, '');
          break;
        case 'edu':
          var education = Object.assign([], _this.props.Employee.education);
          education.splice(ind);
          _this.props.handleChange({ target: { value: education } }, 'education', false, '');
          break;
        case 'tech':
          var _techDefState = Object.assign([], _this.props.Employee.techDefState);
          _techDefState.splice(ind);
          _this.props.handleChange({ target: { value: _techDefState } }, 'techDefState', false, '');
          break;
        case 'dept':
          var test = Object.assign([], _this.props.Employee.test);
          test.splice(ind);
          _this.props.handleChange({ target: { value: test } }, 'test', false, '');
          break;
      }
    };

    _this.submitModalData = function (e) {
      var editIndex = _this.state.editIndex,
          self = _this;

      var errorText = {};
      switch (_this.state.modal) {
        case 'assignment':
          errorText = checkRequiredFields('assignment', _this.state.subObject.assignments);

          if (Object.keys(errorText).length > 0) {
            return self.setState({ errorText: errorText });
          }

          if (self.getDate(_this.state.subObject.assignments.fromDate).getTime() > self.getDate(_this.state.subObject.assignments.toDate).getTime()) {
            return self.props.toggleSnackbarAndSetText(true, (0, _Common.translate)('employee.error.message.date'), false, true);
          }

          var assignments = Object.assign([], _this.props.Employee.assignments || []);
          var asst = (0, _extends5.default)({}, _this.state.subObject.assignments);
          if (asst.hod == 'true' || asst.hod == true) {
            asst.hod = [];
            for (var i = 0; i < asst.mainDepartments.length; i++) {
              asst.hod.push({ department: asst.mainDepartments[i] });
            }
          }

          delete asst.mainDepartments;
          if (!validateDates(_this.props.Employee, asst, editIndex)) {
            return _this.props.toggleSnackbarAndSetText(true, (0, _Common.translate)('employee.error.message.assignmentDate'), false, true);
          }

          if (_this.state.editIndex === '') assignments.push(asst);else assignments[editIndex] = Object.assign({}, asst);
          _this.props.handleChange({ target: { value: assignments } }, 'assignments', false, '');
          _this.setState({
            subObject: (0, _extends5.default)({}, _this.state.subObject, {
              assignments: Object.assign({}, assignmentsDefState)
            })
          });
          break;
        case 'jurisdiction':
          errorText = checkRequiredFields('jurisdiction', _this.state.subObject.jurisdictions);
          if (Object.keys(errorText).length > 0) {
            return self.setState({ errorText: errorText });
          }

          var jurisdictions = Object.assign([], _this.props.Employee.jurisdictions || []);
          var jst = _this.state.subObject.jurisdictions.boundary;
          if (!checkIfNoDup(_this.props.Employee, jst)) {
            return _this.props.toggleSnackbarAndSetText(true, (0, _Common.translate)('employee.error.message.dupAssignment'), false, true);
          }

          if (_this.state.editIndex === '') jurisdictions.push(jst);else jurisdictions[editIndex] = jst;
          _this.props.handleChange({ target: { value: jurisdictions } }, 'jurisdictions', false, '');
          _this.setState({
            subObject: (0, _extends5.default)({}, _this.state.subObject, {
              jurisdictions: Object.assign({}, jurisDefState)
            })
          });
          break;
        case 'serviceDet':
          errorText = checkRequiredFields('serviceDet', _this.state.subObject.serviceHistory);
          if (Object.keys(errorText).length > 0) {
            return self.setState({ errorText: errorText });
          }

          var serviceHistory = Object.assign([], _this.props.Employee.serviceHistory || []);
          if (_this.state.editIndex === '') {
            serviceHistory.push(_this.state.subObject.serviceHistory);
          } else {
            serviceHistory[editIndex] = Object.assign({}, _this.state.subObject.serviceHistory);
          }

          _this.props.handleChange({ target: { value: serviceHistory } }, 'serviceHistory', false, '');
          _this.setState({
            subObject: (0, _extends5.default)({}, _this.state.subObject, {
              serviceHistory: Object.assign({}, serviceDefState)
            })
          });
          break;
        case 'probation':
          errorText = checkRequiredFields('probation', _this.state.subObject.probation);
          if (Object.keys(errorText).length > 0) {
            return self.setState({ errorText: errorText });
          }

          var probation = Object.assign([], _this.props.Employee.probation || []);
          if (_this.state.editIndex === '') probation.push(_this.state.subObject.probation);else probation[editIndex] = Object.assign({}, _this.state.subObject.probation);
          _this.props.handleChange({ target: { value: probation } }, 'probation', false, '');
          _this.setState({
            subObject: (0, _extends5.default)({}, _this.state.subObject, {
              probation: Object.assign({}, probDefState)
            })
          });
          break;
        case 'regular':
          errorText = checkRequiredFields('regular', _this.state.subObject.regularisation);
          if (Object.keys(errorText).length > 0) {
            return self.setState({ errorText: errorText });
          }

          var regularisation = Object.assign([], _this.props.Employee.regularisation || []);
          if (_this.state.editIndex === '') regularisation.push(_this.state.subObject.regularisation);else regularisation[editIndex] = Object.assign({}, _this.state.subObject.regularisation);
          _this.props.handleChange({ target: { value: regularisation } }, 'regularisation', false, '');
          _this.setState({
            subObject: (0, _extends5.default)({}, _this.state.subObject, {
              regularisation: Object.assign({}, regDefState)
            })
          });
          break;
        case 'edu':
          errorText = checkRequiredFields('edu', _this.state.subObject.education);
          if (Object.keys(errorText).length > 0) {
            return self.setState({ errorText: errorText });
          }

          var education = Object.assign([], _this.props.Employee.education || []);
          if (_this.state.editIndex === '') education.push(_this.state.subObject.education);else education[editIndex] = Object.assign({}, _this.state.subObject.education);
          _this.props.handleChange({ target: { value: education } }, 'education', false, '');
          _this.setState({
            subObject: (0, _extends5.default)({}, _this.state.subObject, {
              education: Object.assign({}, eduDefState)
            })
          });
          break;
        case 'tech':
          errorText = checkRequiredFields('tech', _this.state.subObject.technical);
          if (Object.keys(errorText).length > 0) {
            return self.setState({ errorText: errorText });
          }

          var technical = Object.assign([], _this.props.Employee.technical || []);
          if (_this.state.editIndex === '') technical.push(_this.state.subObject.technical);else technical[editIndex] = Object.assign({}, _this.state.subObject.technical);
          _this.props.handleChange({ target: { value: technical } }, 'technical', false, '');
          _this.setState({
            subObject: (0, _extends5.default)({}, _this.state.subObject, {
              technical: Object.assign({}, techDefState)
            })
          });
          break;
        case 'dept':
          errorText = checkRequiredFields('dept', _this.state.subObject.test);
          if (Object.keys(errorText).length > 0) {
            return self.setState({ errorText: errorText });
          }

          var test = Object.assign([], _this.props.Employee.test || []);
          if (_this.state.editIndex === '') test.push(_this.state.subObject.test);else test[editIndex] = Object.assign({}, _this.state.subObject.test);
          _this.props.handleChange({ target: { value: test } }, 'test', false, '');
          _this.setState({
            subObject: (0, _extends5.default)({}, _this.state.subObject, {
              test: Object.assign({}, deptDefState)
            })
          });
          break;
      }

      _this.handleClose();
    };

    _this.renderContent = function () {
      var _React$createElement;

      var handleChange = _this.props.handleChange;

      var self = _this;
      var _self$state = self.state,
          subObject = _self$state.subObject,
          modal = _self$state.modal;


      switch (modal) {
        case 'assignment':
          return _react2.default.createElement(
            'form',
            null,
            _react2.default.createElement(
              'div',
              { className: 'row' },
              _react2.default.createElement(
                'div',
                { className: 'col-md-6 col-xs-12' },
                _react2.default.createElement(
                  'label',
                  null,
                  _react2.default.createElement(
                    'span',
                    { style: { fontWeight: 500 } },
                    (0, _Common.translate)('employee.Assignment.fields.primary'),
                    _react2.default.createElement(
                      'span',
                      { style: { color: '#FF0000' } },
                      ' *'
                    )
                  ),
                  ' '
                ),
                _react2.default.createElement(
                  _RadioButton.RadioButtonGroup,
                  {
                    name: (0, _Common.translate)('employee.Assignment.fields.primary'),
                    valueSelected: subObject.assignments.isPrimary,
                    onChange: function onChange(e, value) {
                      self.handleStateChange({ target: { value: value } }, 'assignments', 'isPrimary');
                    }
                  },
                  _react2.default.createElement(_RadioButton.RadioButton, { className: 'radio-button-style', value: true, label: _react2.default.createElement(_translationNode2.default, { label: 'employee.createPosition.groups.fields.outsourcepost.value1' }) }),
                  _react2.default.createElement(_RadioButton.RadioButton, { className: 'radio-button-style', value: false, label: _react2.default.createElement(_translationNode2.default, { label: 'employee.createPosition.groups.fields.outsourcepost.value2' }) })
                )
              ),
              _react2.default.createElement(
                'div',
                { className: 'col-md-6 col-xs-12' },
                _react2.default.createElement(_TextField2.default, { className: 'create-employee-text-field-cont',

                  floatingLabelStyle: {
                    color: '#696969',
                    fontSize: '20px',
                    'white-space': 'nowrap'

                  },
                  floatingLabelFixed: true,
                  hintText: '21/11/1993',
                  floatingLabelText: _react2.default.createElement(
                    'span',
                    null,
                    (0, _Common.translate)('employee.Assignment.fields.fromDate'),
                    _react2.default.createElement(
                      'span',
                      { style: { color: '#FF0000' } },
                      ' *'
                    )
                  ),
                  errorText: self.state.errorText['assignments.fromDate'],
                  value: subObject.assignments.fromDate,
                  onChange: function onChange(e) {
                    self.handleStateChange(e, 'assignments', 'fromDate', true, datePat);
                  }
                })
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'row' },
              _react2.default.createElement(
                'div',
                { className: 'col-md-6 col-xs-12' },
                _react2.default.createElement(_TextField2.default, { className: 'create-employee-text-field-cont',
                  floatingLabelStyle: {
                    color: '#696969',
                    fontSize: '20px',
                    whiteSpace: 'nowrap'

                  },
                  floatingLabelFixed: true,
                  hintText: '21/11/1993',
                  floatingLabelText: _react2.default.createElement(
                    'span',
                    null,
                    (0, _Common.translate)('employee.Assignment.fields.toDate'),
                    _react2.default.createElement(
                      'span',
                      { style: { color: '#FF0000' } },
                      ' *'
                    )
                  ),
                  errorText: self.state.errorText['assignments.toDate'],
                  value: subObject.assignments.toDate,
                  onChange: function onChange(e) {
                    self.handleStateChange(e, 'assignments', 'toDate', true, datePat);
                  }
                })
              ),
              _react2.default.createElement(
                'div',
                { className: 'col-md-6 col-xs-12' },
                _react2.default.createElement(
                  _SelectField2.default,
                  { className: 'create-employee-text-field-cont',
                    dropDownMenuProps: {

                      targetOrigin: { horizontal: 'left', vertical: 'bottom' }
                    },
                    errorText: self.state.errorText['assignments.department'],
                    floatingLabelStyle: {
                      color: '#696969',
                      fontSize: '20px',
                      'white-space': 'nowrap'

                    },
                    floatingLabelFixed: true,
                    floatingLabelText: _react2.default.createElement(
                      'span',
                      null,
                      (0, _Common.translate)('employee.Assignment.fields.department'),
                      _react2.default.createElement(
                        'span',
                        { style: { color: '#FF0000' } },
                        ' *'
                      )
                    ),
                    value: subObject.assignments.department,
                    onChange: function onChange(event, key, value) {
                      self.handleStateChange({ target: { value: value } }, 'assignments', 'department');
                    }
                  },
                  self.state.departments && self.state.departments.map(function (v, i) {
                    return _react2.default.createElement(_MenuItem2.default, { value: v.id, key: i, primaryText: v.name });
                  })
                )
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'row' },
              _react2.default.createElement(
                'div',
                { className: 'col-md-6 col-xs-12' },
                _react2.default.createElement(
                  _SelectField2.default,
                  { className: 'create-employee-text-field-cont',
                    dropDownMenuProps: {

                      targetOrigin: { horizontal: 'left', vertical: 'bottom' }
                    },
                    errorText: self.state.errorText['assignments.designation'],
                    floatingLabelStyle: {
                      color: '#696969',
                      fontSize: '20px',
                      'white-space': 'nowrap'

                    },
                    floatingLabelFixed: true,
                    floatingLabelText: _react2.default.createElement(
                      'span',
                      null,
                      (0, _Common.translate)('employee.Assignment.fields.designation'),
                      _react2.default.createElement(
                        'span',
                        { style: { color: '#FF0000' } },
                        ' *'
                      )
                    ),
                    value: subObject.assignments.designation,
                    onChange: function onChange(event, key, value) {
                      self.handleStateChange({ target: { value: value } }, 'assignments', 'designation');
                    }
                  },
                  self.state.designations && self.state.designations.map(function (v, i) {
                    return _react2.default.createElement(_MenuItem2.default, { value: v.id, key: i, primaryText: v.name });
                  })
                )
              ),
              _react2.default.createElement(
                'div',
                { className: 'col-md-6 col-xs-12' },
                _react2.default.createElement(_AutoComplete2.default, { className: 'create-employee-text-field-cont',
                  errorText: self.state.errorText['assignments.position'],
                  fullWidth: true,
                  floatingLabelStyle: {
                    color: '#696969',
                    fontSize: '20px',
                    'white-space': 'nowrap',
                    fontWeight: 500
                  },
                  floatingLabelFixed: true,
                  floatingLabelText: _react2.default.createElement(
                    'span',
                    null,
                    (0, _Common.translate)('employee.Assignment.fields.position'),
                    _react2.default.createElement(
                      'span',
                      { style: { color: '#FF0000' } },
                      ' *'
                    )
                  ),
                  filter: _AutoComplete2.default.caseInsensitiveFilter,
                  dataSource: self.state.positionList,
                  dataSourceConfig: _this.state.positionListConfig,
                  value: subObject.assignments.position,
                  onKeyUp: function onKeyUp(e) {
                    handleChange({ target: { value: '' } }, 'position', true, '');
                  },
                  onNewRequest: function onNewRequest(chosenRequest, index) {
                    var e = {
                      target: {
                        value: chosenRequest.id
                      }
                    };
                    self.handleStateChange(e, 'assignments', 'position');
                  }
                })
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'row' },
              _react2.default.createElement(
                'div',
                { className: 'col-md-6 col-xs-12' },
                _react2.default.createElement(
                  _SelectField2.default,
                  { className: 'create-employee-text-field-cont',
                    floatingLabelStyle: {
                      color: '#696969',
                      fontSize: '20px',
                      'white-space': 'nowrap'

                    },
                    floatingLabelFixed: true,
                    dropDownMenuProps: {

                      targetOrigin: { horizontal: 'left', vertical: 'bottom' }
                    },
                    floatingLabelText: (0, _Common.translate)('employee.Assignment.fields.grade'),
                    value: subObject.assignments.grade,
                    onChange: function onChange(event, key, value) {
                      self.handleStateChange({ target: { value: value } }, 'assignments', 'grade');
                    }
                  },
                  self.state.grades && self.state.grades.map(function (v, i) {
                    return _react2.default.createElement(_MenuItem2.default, { value: v.id, key: i, primaryText: v.name });
                  })
                )
              ),
              _react2.default.createElement(
                'div',
                { className: 'col-md-6 col-xs-12' },
                _react2.default.createElement(
                  _SelectField2.default,
                  { className: 'create-employee-text-field-cont',
                    floatingLabelStyle: {
                      color: '#696969',
                      fontSize: '20px',
                      'white-space': 'nowrap'

                    },
                    floatingLabelFixed: true,
                    dropDownMenuProps: {

                      targetOrigin: { horizontal: 'left', vertical: 'bottom' }
                    },
                    floatingLabelText: (0, _Common.translate)('wc.create.groups.fields.Funtion'),
                    value: subObject.assignments.function,
                    onChange: function onChange(event, key, value) {
                      self.handleStateChange({ target: { value: value } }, 'assignments', 'function');
                    }
                  },
                  self.state.functions && self.state.functions.map(function (v, i) {
                    return _react2.default.createElement(_MenuItem2.default, { value: v.id, key: i, primaryText: v.name });
                  })
                )
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'row' },
              _react2.default.createElement(
                'div',
                { className: 'col-md-6 col-xs-12' },
                _react2.default.createElement(
                  _SelectField2.default,
                  { className: 'create-employee-text-field-cont',
                    floatingLabelStyle: {
                      color: '#696969',
                      fontSize: '20px',
                      'white-space': 'nowrap'

                    },
                    floatingLabelFixed: true,
                    dropDownMenuProps: {

                      targetOrigin: { horizontal: 'left', vertical: 'bottom' }
                    },
                    floatingLabelText: (0, _Common.translate)('employee.Assignment.fields.functionary'),
                    value: subObject.assignments.functionary,
                    onChange: function onChange(event, key, value) {
                      self.handleStateChange({ target: { value: value } }, 'assignments', 'functionary');
                    }
                  },
                  self.state.functionaries && self.state.functionaries.map(function (v, i) {
                    return _react2.default.createElement(_MenuItem2.default, { value: v.id, key: i, primaryText: v.name });
                  })
                )
              ),
              _react2.default.createElement(
                'div',
                { className: 'col-md-6 col-xs-12' },
                _react2.default.createElement(
                  _SelectField2.default,
                  { className: 'create-employee-text-field-cont',
                    floatingLabelStyle: {
                      color: '#696969',
                      fontSize: '20px',
                      'white-space': 'nowrap'

                    },
                    floatingLabelFixed: true,
                    dropDownMenuProps: {

                      targetOrigin: { horizontal: 'left', vertical: 'bottom' }
                    },
                    floatingLabelText: (0, _Common.translate)('employee.Assignment.fields.fund'),
                    value: subObject.assignments.fund,
                    onChange: function onChange(event, key, value) {
                      self.handleStateChange({ target: { value: value } }, 'assignments', 'fund');
                    }
                  },
                  self.state.funds && self.state.funds.map(function (v, i) {
                    return _react2.default.createElement(_MenuItem2.default, { value: v.id, key: i, primaryText: v.name });
                  })
                )
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'row' },
              _react2.default.createElement(
                'div',
                { className: 'col-md-6 col-xs-12' },
                _react2.default.createElement(
                  'label',
                  { style: { fontWeight: 500 } },
                  (0, _Common.translate)('employee.Assignment.fields.hod') + ' ?',
                  _react2.default.createElement(
                    'span',
                    { style: { color: '#FF0000' } },
                    ' *'
                  )
                ),
                _react2.default.createElement(
                  _RadioButton.RadioButtonGroup,
                  {
                    name: (0, _Common.translate)('employee.Assignment.fields.hod'),
                    valueSelected: subObject.assignments.hod,
                    onChange: function onChange(e, value) {
                      self.handleStateChange({ target: { value: value } }, 'assignments', 'hod');
                    }
                  },
                  _react2.default.createElement(_RadioButton.RadioButton, { className: 'radio-button-style', value: true, label: _react2.default.createElement(_translationNode2.default, { label: 'employee.createPosition.groups.fields.outsourcepost.value1' }) }),
                  _react2.default.createElement(_RadioButton.RadioButton, { className: 'radio-button-style', value: false, label: _react2.default.createElement(_translationNode2.default, { label: 'employee.createPosition.groups.fields.outsourcepost.value2' }) })
                )
              ),
              _react2.default.createElement(
                'div',
                { className: 'col-md-6 col-xs-12' },
                subObject.assignments.hod && _react2.default.createElement(
                  _SelectField2.default,
                  { className: 'create-employee-text-field-cont',
                    floatingLabelStyle: {
                      color: '#696969',
                      fontSize: '20px',
                      'white-space': 'nowrap'

                    },
                    floatingLabelFixed: true,
                    dropDownMenuProps: {

                      targetOrigin: { horizontal: 'left', vertical: 'bottom' }
                    },
                    errorText: self.state.errorText['assignments.mainDepartments'],
                    floatingLabelText: _react2.default.createElement(
                      'span',
                      null,
                      (0, _Common.translate)('employee.Assignment.fields.department'),
                      _react2.default.createElement(
                        'span',
                        { style: { color: '#FF0000' } },
                        ' *'
                      )
                    ),
                    multiple: true,
                    value: subObject.assignments.mainDepartments,
                    onChange: function onChange(event, key, value) {
                      self.handleStateChange({ target: { value: value } }, 'assignments', 'mainDepartments');
                    }
                  },
                  self.state.departments && self.state.departments.map(function (v, i) {
                    return _react2.default.createElement(_MenuItem2.default, { value: v.id, key: i, primaryText: v.name });
                  })
                )
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'row' },
              _react2.default.createElement(
                'div',
                { className: 'col-md-6 col-xs-12' },
                _react2.default.createElement(_TextField2.default, (_React$createElement = { className: 'create-employee-text-field-cont'
                }, (0, _defineProperty3.default)(_React$createElement, 'className', 'create-employee-text-field-cont'), (0, _defineProperty3.default)(_React$createElement, 'floatingLabelStyle', {
                  color: '#696969',
                  fontSize: '20px',
                  'white-space': 'nowrap'

                }), (0, _defineProperty3.default)(_React$createElement, 'floatingLabelFixed', true), (0, _defineProperty3.default)(_React$createElement, 'floatingLabelText', (0, _Common.translate)('employee.Assignment.fields.govtOrderNumber')), (0, _defineProperty3.default)(_React$createElement, 'value', subObject.assignments.govtOrderNumber), (0, _defineProperty3.default)(_React$createElement, 'onChange', function onChange(e) {
                  self.handleStateChange(e, 'assignments', 'govtOrderNumber');
                }), _React$createElement))
              ),
              _react2.default.createElement(
                'div',
                { className: 'col-md-6 col-xs-12' },
                _react2.default.createElement(
                  'label',
                  { style: { marginTop: '20px', fontWeight: 500 } },
                  (0, _Common.translate)('employee.Assignment.fields.documents')
                ),
                _react2.default.createElement('input', { type: 'file' })
              )
            )
          );
        case 'jurisdiction':
          return _react2.default.createElement(
            'form',
            null,
            _react2.default.createElement(
              'div',
              { className: 'row' },
              _react2.default.createElement(
                'div',
                { className: 'col-md-6 col-xs-12' },
                _react2.default.createElement(
                  _SelectField2.default,
                  { className: 'create-employee-text-field-cont',
                    floatingLabelStyle: {
                      color: '#696969',
                      fontSize: '20px',
                      'white-space': 'nowrap'

                    },
                    floatingLabelFixed: true,
                    dropDownMenuProps: {

                      targetOrigin: { horizontal: 'left', vertical: 'bottom' }
                    },
                    errorText: self.state.errorText['jurisdictions.jurisdictionsType'],
                    floatingLabelText: _react2.default.createElement(
                      'span',
                      null,
                      (0, _Common.translate)('employee.Employee.fields.jurisdictionsType'),
                      _react2.default.createElement(
                        'span',
                        { style: { color: '#FF0000' } },
                        ' *'
                      )
                    ),
                    value: subObject.jurisdictions.jurisdictionsType,
                    onChange: function onChange(event, key, value) {
                      self.loadBoundaries(value);
                      self.handleStateChange({ target: { value: value } }, 'jurisdictions', 'jurisdictionsType');
                    }
                  },
                  self.state.boundarytypes && self.state.boundarytypes.map(function (v, i) {
                    return _react2.default.createElement(_MenuItem2.default, { value: v.id, key: i, primaryText: v.name });
                  })
                )
              ),
              _react2.default.createElement(
                'div',
                { className: 'col-md-6 col-xs-12' },
                _react2.default.createElement(
                  _SelectField2.default,
                  { className: 'create-employee-text-field-cont',
                    floatingLabelStyle: {
                      color: '#696969',
                      fontSize: '20px',
                      'white-space': 'nowrap'

                    },
                    floatingLabelFixed: true,
                    dropDownMenuProps: {

                      targetOrigin: { horizontal: 'left', vertical: 'bottom' }
                    },
                    errorText: self.state.errorText['jurisdictions.boundary'],
                    floatingLabelText: _react2.default.createElement(
                      'span',
                      null,
                      (0, _Common.translate)('employee.Employee.fields.jurisdictionsList'),
                      _react2.default.createElement(
                        'span',
                        { style: { color: '#FF0000' } },
                        ' *'
                      )
                    ),
                    value: subObject.jurisdictions.boundary,
                    onChange: function onChange(event, key, value) {
                      self.handleStateChange({ target: { value: value } }, 'jurisdictions', 'boundary');
                    }
                  },
                  self.state.boundaries && self.state.boundaries.map(function (v, i) {
                    return _react2.default.createElement(_MenuItem2.default, { value: v.id, key: i, primaryText: v.name });
                  })
                )
              )
            )
          );
        case 'serviceDet':
          return _react2.default.createElement(
            'form',
            null,
            _react2.default.createElement(
              'div',
              { className: 'row' },
              _react2.default.createElement(
                'div',
                { className: 'col-md-6 col-xs-12' },
                _react2.default.createElement(_TextField2.default, { className: 'create-employee-text-field-cont',
                  floatingLabelStyle: {
                    color: '#696969',
                    fontSize: '20px',
                    'white-space': 'nowrap'

                  },
                  floatingLabelFixed: true,
                  errorText: self.state.errorText['serviceHistory.serviceInfo'],
                  floatingLabelText: _react2.default.createElement(
                    'span',
                    null,
                    (0, _Common.translate)('employee.ServiceHistory.fields.ServiceEntryDescription'),
                    _react2.default.createElement(
                      'span',
                      { style: { color: '#FF0000' } },
                      ' *'
                    )
                  ),
                  value: subObject.serviceHistory.serviceInfo,
                  onChange: function onChange(e) {
                    self.handleStateChange(e, 'serviceHistory', 'serviceInfo');
                  }
                })
              ),
              _react2.default.createElement(
                'div',
                { className: 'col-md-6 col-xs-12' },
                _react2.default.createElement(_TextField2.default, {
                  className: 'create-employee-text-field-cont',
                  floatingLabelStyle: {
                    color: '#696969',
                    fontSize: '20px',
                    'white-space': 'nowrap'

                  },
                  floatingLabelFixed: true,
                  hintText: '21/11/1993',
                  floatingLabelText: _react2.default.createElement(
                    'span',
                    null,
                    (0, _Common.translate)('employee.ServiceHistory.fields.date'),
                    _react2.default.createElement(
                      'span',
                      { style: { color: '#FF0000' } },
                      ' *'
                    )
                  ),
                  errorText: self.state.errorText['serviceHistory.serviceFrom'],
                  value: subObject.serviceHistory.serviceFrom,
                  onChange: function onChange(e) {
                    self.handleStateChange(e, 'serviceHistory', 'serviceFrom', true, datePat);
                  }
                })
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'row' },
              _react2.default.createElement(
                'div',
                { className: 'col-md-6 col-xs-12' },
                _react2.default.createElement(_TextField2.default, { className: 'create-employee-text-field-cont',
                  floatingLabelStyle: {
                    color: '#696969',
                    fontSize: '20px',
                    'white-space': 'nowrap'

                  },
                  floatingLabelFixed: true,
                  floatingLabelText: (0, _Common.translate)('employee.ServiceHistory.fields.remarks'),
                  value: subObject.serviceHistory.remarks,
                  onChange: function onChange(e) {
                    self.handleStateChange(e, 'serviceHistory', 'remarks');
                  }
                })
              ),
              _react2.default.createElement(
                'div',
                { className: 'col-md-6 col-xs-12' },
                _react2.default.createElement(_TextField2.default, { className: 'create-employee-text-field-cont',
                  floatingLabelStyle: {
                    color: '#696969',
                    fontSize: '20px',
                    'white-space': 'nowrap'

                  },
                  floatingLabelFixed: true,
                  floatingLabelText: (0, _Common.translate)('employee.ServiceHistory.fields.orderNo'),
                  value: subObject.serviceHistory.orderNo,
                  onChange: function onChange(e) {
                    self.handleStateChange(e, 'serviceHistory', 'orderNo');
                  }
                })
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'row' },
              _react2.default.createElement(
                'div',
                { className: 'col-md-6 col-xs-12' },
                _react2.default.createElement(
                  'label',
                  { style: { marginTop: '20px', fontWeight: 500 } },
                  (0, _Common.translate)('employee.ServiceHistory.fields.documents')
                ),
                _react2.default.createElement('input', { type: 'file' })
              )
            )
          );
        case 'probation':
          return _react2.default.createElement(
            'form',
            null,
            _react2.default.createElement(
              'div',
              { className: 'row' },
              _react2.default.createElement(
                'div',
                { className: 'col-md-6 col-xs-12' },
                _react2.default.createElement(
                  _SelectField2.default,
                  { className: 'create-employee-text-field-cont',
                    dropDownMenuProps: {

                      targetOrigin: { horizontal: 'left', vertical: 'bottom' }
                    },
                    floatingLabelStyle: {
                      color: '#696969',
                      fontSize: '20px',
                      'white-space': 'nowrap'

                    },
                    floatingLabelFixed: true,
                    errorText: self.state.errorText['probation.designation'],
                    floatingLabelText: _react2.default.createElement(
                      'span',
                      null,
                      (0, _Common.translate)('employee.Assignment.fields.designation'),
                      _react2.default.createElement(
                        'span',
                        { style: { color: '#FF0000' } },
                        ' *'
                      )
                    ),
                    value: subObject.probation.designation,
                    onChange: function onChange(event, key, value) {
                      self.handleStateChange({ target: { value: value } }, 'probation', 'designation');
                    }
                  },
                  self.state.designations && self.state.designations.map(function (v, i) {
                    return _react2.default.createElement(_MenuItem2.default, { value: v.id, key: i, primaryText: v.name });
                  })
                )
              ),
              _react2.default.createElement(
                'div',
                { className: 'col-md-6 col-xs-12' },
                _react2.default.createElement(_TextField2.default, { className: 'create-employee-text-field-cont',

                  floatingLabelStyle: {
                    color: '#696969',
                    fontSize: '20px',
                    'white-space': 'nowrap'

                  },
                  floatingLabelFixed: true,
                  hintText: '21/11/1993',
                  floatingLabelText: _react2.default.createElement(
                    'span',
                    null,
                    (0, _Common.translate)('employee.ServiceHistory.fields.date'),
                    _react2.default.createElement(
                      'span',
                      { style: { color: '#FF0000' } },
                      ' *'
                    )
                  ),
                  errorText: self.state.errorText['probation.declaredOn'],
                  value: subObject.probation.declaredOn,
                  onChange: function onChange(e) {
                    self.handleStateChange(e, 'probation', 'declaredOn', true, datePat);
                  }
                })
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'row' },
              _react2.default.createElement(
                'div',
                { className: 'col-md-6 col-xs-12' },
                _react2.default.createElement(_TextField2.default, { className: 'create-employee-text-field-cont',

                  floatingLabelStyle: {
                    color: '#696969',
                    fontSize: '20px',
                    'white-space': 'nowrap'

                  },
                  floatingLabelFixed: true,
                  floatingLabelText: (0, _Common.translate)('employee.ServiceHistory.fields.orderNo'),
                  value: subObject.probation.orderNo,
                  onChange: function onChange(e) {
                    self.handleStateChange(e, 'probation', 'orderNo');
                  }
                })
              ),
              _react2.default.createElement(
                'div',
                { className: 'col-md-6 col-xs-12' },
                _react2.default.createElement(_TextField2.default, { className: 'create-employee-text-field-cont',

                  floatingLabelStyle: {
                    color: '#696969',
                    fontSize: '20px',
                    'white-space': 'nowrap'

                  },
                  floatingLabelFixed: true,
                  hintText: '21/11/1993',
                  floatingLabelText: _react2.default.createElement(
                    'span',
                    null,
                    (0, _Common.translate)('employee.Probation.fields.orderDate'),
                    _react2.default.createElement(
                      'span',
                      { style: { color: '#FF0000' } },
                      ' *'
                    )
                  ),
                  errorText: self.state.errorText['probation.orderDate'],
                  value: subObject.probation.orderDate,
                  onChange: function onChange(e) {
                    self.handleStateChange(e, 'probation', 'orderDate', true, datePat);
                  }
                })
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'row' },
              _react2.default.createElement(
                'div',
                { className: 'col-md-6 col-xs-12' },
                _react2.default.createElement(_TextField2.default, { className: 'create-employee-text-field-cont',

                  floatingLabelStyle: {
                    color: '#696969',
                    fontSize: '20px',
                    'white-space': 'nowrap'

                  },
                  floatingLabelFixed: true,
                  floatingLabelText: (0, _Common.translate)('employee.Probation.fields.remarks'),
                  value: subObject.probation.remarks,
                  onChange: function onChange(e) {
                    self.handleStateChange(e, 'probation', 'remarks');
                  }
                })
              ),
              _react2.default.createElement(
                'div',
                { className: 'col-md-6 col-xs-12' },
                _react2.default.createElement(
                  'label',
                  { style: { marginTop: '20px', fontWeight: 500 } },
                  (0, _Common.translate)('employee.Probation.fields.documents')
                ),
                _react2.default.createElement('input', { type: 'file', multiple: true })
              )
            )
          );
        case 'regular':
          return _react2.default.createElement(
            'form',
            null,
            _react2.default.createElement(
              'div',
              { className: 'row' },
              _react2.default.createElement(
                'div',
                { className: 'col-md-6 col-xs-12' },
                _react2.default.createElement(
                  _SelectField2.default,
                  { className: 'create-employee-text-field-cont',
                    floatingLabelStyle: {
                      color: '#696969',
                      fontSize: '20px',
                      'white-space': 'nowrap'

                    },
                    floatingLabelFixed: true,
                    dropDownMenuProps: {

                      targetOrigin: { horizontal: 'left', vertical: 'bottom' }
                    },
                    errorText: self.state.errorText['regularisation.designation'],
                    floatingLabelText: _react2.default.createElement(
                      'span',
                      null,
                      (0, _Common.translate)('employee.Assignment.fields.designation'),
                      _react2.default.createElement(
                        'span',
                        { style: { color: '#FF0000' } },
                        ' *'
                      )
                    ),
                    value: subObject.regularisation.designation,
                    onChange: function onChange(event, key, value) {
                      self.handleStateChange({ target: { value: value } }, 'regularisation', 'designation');
                    }
                  },
                  self.state.designations && self.state.designations.map(function (v, i) {
                    return _react2.default.createElement(_MenuItem2.default, { value: v.id, key: i, primaryText: v.name });
                  })
                )
              ),
              _react2.default.createElement(
                'div',
                { style: { backgroundColor: "red" }, className: 'col-md-6 col-xs-12' },
                _react2.default.createElement(_TextField2.default, { className: 'create-employee-text-field-cont',

                  floatingLabelStyle: {
                    color: '#696969',
                    fontSize: '20px',
                    'white-space': 'nowrap'

                  },
                  floatingLabelFixed: true,
                  hintText: '21/11/1993',
                  floatingLabelText: _react2.default.createElement(
                    'span',
                    null,
                    (0, _Common.translate)('employee.Regularisation.fields.declaredOn'),
                    _react2.default.createElement(
                      'span',
                      { style: { color: '#FF0000' } },
                      ' *'
                    )
                  ),
                  errorText: self.state.errorText['regularisation.declaredOn'],
                  value: subObject.regularisation.declaredOn,
                  onChange: function onChange(e) {
                    self.handleStateChange(e, 'regularisation', 'declaredOn', true, datePat);
                  }
                })
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'row' },
              _react2.default.createElement(
                'div',
                { className: 'col-md-6 col-xs-12' },
                _react2.default.createElement(_TextField2.default, { className: 'create-employee-text-field-cont',
                  floatingLabelStyle: {
                    color: '#696969',
                    fontSize: '20px',
                    'white-space': 'nowrap'

                  },
                  floatingLabelFixed: true,
                  floatingLabelText: (0, _Common.translate)('employee.Regularisation.fields.orderNo'),
                  value: subObject.regularisation.orderNo,
                  onChange: function onChange(e) {
                    self.handleStateChange(e, 'regularisation', 'orderNo');
                  }
                })
              ),
              _react2.default.createElement(
                'div',
                { className: 'col-md-6 col-xs-12' },
                _react2.default.createElement(_TextField2.default, { className: 'create-employee-text-field-cont',
                  floatingLabelStyle: {
                    color: '#696969',
                    fontSize: '20px',
                    'white-space': 'nowrap'

                  },
                  floatingLabelFixed: true,
                  hintText: '21/11/1993',
                  floatingLabelText: _react2.default.createElement(
                    'span',
                    null,
                    (0, _Common.translate)('employee.Regularisation.fields.orderDate'),
                    _react2.default.createElement(
                      'span',
                      { style: { color: '#FF0000' } },
                      ' *'
                    )
                  ),
                  errorText: self.state.errorText['regularisation.orderDate'],
                  value: subObject.regularisation.orderDate,
                  onChange: function onChange(e) {
                    self.handleStateChange(e, 'regularisation', 'orderDate', true, datePat);
                  }
                })
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'row' },
              _react2.default.createElement(
                'div',
                { className: 'col-md-6 col-xs-12' },
                _react2.default.createElement(_TextField2.default, { className: 'create-employee-text-field-cont',
                  floatingLabelStyle: {
                    color: '#696969',
                    fontSize: '20px',
                    'white-space': 'nowrap'

                  },
                  floatingLabelFixed: true,
                  floatingLabelText: (0, _Common.translate)('employee.Regularisation.fields.remarks'),
                  value: subObject.regularisation.remarks,
                  onChange: function onChange(e) {
                    self.handleStateChange(e, 'regularisation', 'remarks');
                  }
                })
              ),
              _react2.default.createElement(
                'div',
                { className: 'col-md-6 col-xs-12' },
                _react2.default.createElement(
                  'label',
                  { style: { marginTop: '20px', fontWeight: 500 } },
                  (0, _Common.translate)('employee.Regularisation.fields.documents')
                ),
                _react2.default.createElement('input', { type: 'file', multiple: true })
              )
            )
          );
        case 'edu':
          return _react2.default.createElement(
            'form',
            null,
            _react2.default.createElement(
              'div',
              { className: 'row' },
              _react2.default.createElement(
                'div',
                { className: 'col-md-6 col-xs-12' },
                _react2.default.createElement(_TextField2.default, { className: 'create-employee-text-field-cont',
                  errorText: self.state.errorText['education.qualification'],
                  floatingLabelStyle: {
                    color: '#696969',
                    fontSize: '20px',
                    'white-space': 'nowrap'

                  },
                  floatingLabelFixed: true,
                  floatingLabelText: _react2.default.createElement(
                    'span',
                    null,
                    (0, _Common.translate)('employee.EducationalQualification.fields.qualification'),
                    _react2.default.createElement(
                      'span',
                      { style: { color: '#FF0000' } },
                      ' *'
                    )
                  ),
                  value: subObject.education.qualification,
                  onChange: function onChange(e) {
                    self.handleStateChange(e, 'education', 'qualification');
                  }
                })
              ),
              _react2.default.createElement(
                'div',
                { className: 'col-md-6 col-xs-12' },
                _react2.default.createElement(_TextField2.default, { className: 'create-employee-text-field-cont',
                  floatingLabelStyle: {
                    color: '#696969',
                    fontSize: '20px',
                    'white-space': 'nowrap'

                  },
                  floatingLabelFixed: true,
                  floatingLabelText: (0, _Common.translate)('employee.EducationalQualification.fields.majorSubject'),
                  value: subObject.education.majorSubject,
                  onChange: function onChange(e) {
                    self.handleStateChange(e, 'education', 'majorSubject');
                  }
                })
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'row' },
              _react2.default.createElement(
                'div',
                { className: 'col-md-6 col-xs-12' },
                _react2.default.createElement(_TextField2.default, { className: 'create-employee-text-field-cont',
                  errorText: self.state.errorText['education.yearOfPassing'],
                  floatingLabelStyle: {
                    color: '#696969',
                    fontSize: '20px',
                    'white-space': 'nowrap'

                  },
                  floatingLabelFixed: true,
                  maxLength: '4',
                  floatingLabelText: _react2.default.createElement(
                    'span',
                    null,
                    (0, _Common.translate)('employee.EducationalQualification.fields.yearOfPassing'),
                    _react2.default.createElement(
                      'span',
                      { style: { color: '#FF0000' } },
                      ' *'
                    )
                  ),
                  value: subObject.education.yearOfPassing,
                  onChange: function onChange(e) {
                    if (e.target.value && !/^\d*$/g.test(e.target.value)) return;
                    self.handleStateChange(e, 'education', 'yearOfPassing');
                  }
                })
              ),
              _react2.default.createElement(
                'div',
                { className: 'col-md-6 col-xs-12' },
                _react2.default.createElement(_TextField2.default, { className: 'create-employee-text-field-cont',
                  floatingLabelStyle: {
                    color: '#696969',
                    fontSize: '20px',
                    'white-space': 'nowrap'

                  },
                  floatingLabelFixed: true,
                  floatingLabelText: (0, _Common.translate)('employee.EducationalQualification.fields.university'),
                  value: subObject.education.university,
                  onChange: function onChange(e) {
                    self.handleStateChange(e, 'education', 'university');
                  }
                })
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'row' },
              _react2.default.createElement(
                'div',
                { className: 'col-md-6 col-xs-12' },
                _react2.default.createElement(
                  'label',
                  { style: { marginTop: '20px', fontWeight: 500 } },
                  (0, _Common.translate)('employee.TechnicalQualification.fields.documents')
                ),
                _react2.default.createElement('input', { type: 'file', multiple: true })
              )
            )
          );
        case 'tech':
          return _react2.default.createElement(
            'form',
            null,
            _react2.default.createElement(
              'div',
              { className: 'row' },
              _react2.default.createElement(
                'div',
                { className: 'col-md-6 col-xs-12' },
                _react2.default.createElement(_TextField2.default, { className: 'create-employee-text-field-cont',
                  errorText: self.state.errorText['technical.skill'],
                  floatingLabelStyle: {
                    color: '#696969',
                    fontSize: '20px',
                    'white-space': 'nowrap'

                  },
                  floatingLabelFixed: true,
                  floatingLabelText: _react2.default.createElement(
                    'span',
                    null,
                    (0, _Common.translate)('employee.TechnicalQualification.fields.skill'),
                    _react2.default.createElement(
                      'span',
                      { style: { color: '#FF0000' } },
                      ' *'
                    )
                  ),
                  value: subObject.technical.skill,
                  onChange: function onChange(e) {
                    self.handleStateChange(e, 'technical', 'skill');
                  }
                })
              ),
              _react2.default.createElement(
                'div',
                { className: 'col-md-6 col-xs-12' },
                _react2.default.createElement(_TextField2.default, { className: 'create-employee-text-field-cont',
                  floatingLabelStyle: {
                    color: '#696969',
                    fontSize: '20px',
                    'white-space': 'nowrap'

                  },
                  floatingLabelFixed: true,
                  floatingLabelText: (0, _Common.translate)('employee.TechnicalQualification.fields.grade'),
                  value: subObject.technical.grade,
                  onChange: function onChange(e) {
                    self.handleStateChange(e, 'technical', 'grade');
                  }
                })
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'row' },
              _react2.default.createElement(
                'div',
                { className: 'col-md-6 col-xs-12' },
                _react2.default.createElement(_TextField2.default, { className: 'create-employee-text-field-cont',
                  floatingLabelStyle: {
                    color: '#696969',
                    fontSize: '20px',
                    'white-space': 'nowrap'

                  },
                  floatingLabelFixed: true,
                  maxLength: '4',
                  floatingLabelText: (0, _Common.translate)('employee.TechnicalQualification.fields.yearOfPassing'),
                  value: subObject.technical.yearOfPassing,
                  onChange: function onChange(e) {
                    if (e.target.value && !/^\d*$/g.test(e.target.value)) return;
                    self.handleStateChange(e, 'technical', 'yearOfPassing');
                  }
                })
              ),
              _react2.default.createElement(
                'div',
                { className: 'col-md-6 col-xs-12' },
                _react2.default.createElement(_TextField2.default, { className: 'create-employee-text-field-cont',
                  floatingLabelStyle: {
                    color: '#696969',
                    fontSize: '20px',
                    'white-space': 'nowrap'

                  },
                  floatingLabelFixed: true,
                  floatingLabelText: (0, _Common.translate)('employee.TechnicalQualification.fields.remarks'),
                  value: subObject.technical.remarks,
                  onChange: function onChange(e) {
                    self.handleStateChange(e, 'technical', 'remarks');
                  }
                })
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'row' },
              _react2.default.createElement(
                'div',
                { className: 'col-md-6 col-xs-12' },
                _react2.default.createElement(
                  'label',
                  { style: { marginTop: '20px', fontWeight: 500 } },
                  (0, _Common.translate)('employee.TechnicalQualification.fields.documents')
                ),
                _react2.default.createElement('input', { type: 'file', multiple: true })
              )
            )
          );
        case 'dept':
          return _react2.default.createElement(
            'form',
            null,
            _react2.default.createElement(
              'div',
              { className: 'row' },
              _react2.default.createElement(
                'div',
                { className: 'col-md-6 col-xs-12' },
                _react2.default.createElement(_TextField2.default, { className: 'create-employee-text-field-cont',
                  errorText: self.state.errorText['technical.skill'],
                  floatingLabelStyle: {
                    color: '#696969',
                    fontSize: '20px',
                    'white-space': 'nowrap'

                  },
                  floatingLabelFixed: true,
                  floatingLabelText: _react2.default.createElement(
                    'span',
                    null,
                    (0, _Common.translate)('employee.DepartmentalTest.fields.test'),
                    _react2.default.createElement(
                      'span',
                      { style: { color: '#FF0000' } },
                      ' *'
                    )
                  ),
                  value: subObject.test.test,
                  onChange: function onChange(e) {
                    self.handleStateChange(e, 'test', 'test');
                  }
                })
              ),
              _react2.default.createElement(
                'div',
                { className: 'col-md-6 col-xs-12' },
                _react2.default.createElement(_TextField2.default, { className: 'create-employee-text-field-cont',
                  errorText: self.state.errorText['technical.skill'],
                  floatingLabelStyle: {
                    color: '#696969',
                    fontSize: '20px',
                    'white-space': 'nowrap'

                  },
                  floatingLabelFixed: true,
                  maxLength: '4',
                  floatingLabelText: _react2.default.createElement(
                    'span',
                    null,
                    (0, _Common.translate)('employee.TechnicalQualification.fields.yearOfPassing'),
                    _react2.default.createElement(
                      'span',
                      { style: { color: '#FF0000' } },
                      ' *'
                    )
                  ),
                  value: subObject.test.yearOfPassing,
                  onChange: function onChange(e) {
                    if (e.target.value && !/^\d*$/g.test(e.target.value)) return;
                    self.handleStateChange(e, 'test', 'yearOfPassing');
                  }
                })
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'row' },
              _react2.default.createElement(
                'div',
                { className: 'col-md-6 col-xs-12' },
                _react2.default.createElement(_TextField2.default, { className: 'create-employee-text-field-cont',
                  floatingLabelStyle: {
                    color: '#696969',
                    fontSize: '20px',
                    'white-space': 'nowrap'

                  },
                  floatingLabelFixed: true,
                  floatingLabelText: (0, _Common.translate)('employee.TechnicalQualification.fields.remarks'),
                  value: subObject.test.remarks,
                  onChange: function onChange(e) {
                    self.handleStateChange(e, 'test', 'remarks');
                  }
                })
              ),
              _react2.default.createElement(
                'div',
                { className: 'col-md-6 col-xs-12' },
                _react2.default.createElement(
                  'label',
                  { style: { marginTop: '20px', fontWeight: 500 } },
                  (0, _Common.translate)('employee.TechnicalQualification.fields.documents')
                ),
                _react2.default.createElement('input', { type: 'file', multiple: true })
              )
            )
          );
      }
    };

    _this.getModalTitle = function () {
      switch (_this.state.modal) {
        case 'assignment':
          return _react2.default.createElement(_translationNode2.default, { fontSize: '24px', label: 'employee.field.assignments' });
        case 'jurisdiction':
          return _react2.default.createElement(_translationNode2.default, { fontSize: '24px', label: 'employee.Employee.fields.jurisdictions' });
        case 'serviceDet':
          return _react2.default.createElement(_translationNode2.default, { fontSize: '24px', label: 'employee.ServiceHistory.title' });
        case 'probation':
          return _react2.default.createElement(_translationNode2.default, { fontSize: '24px', label: 'employee.Probation.title' });
        case 'regular':
          return _react2.default.createElement(_translationNode2.default, { fontSize: '24px', label: 'employee.Regularisation.title' });
        case 'edu':
          return _react2.default.createElement(_translationNode2.default, { fontSize: '24px', label: 'employee.EducationalQualification.title' });
        case 'tech':
          return _react2.default.createElement(_translationNode2.default, { fontSize: '24px', label: 'employee.TechnicalQualification.title' });
        case 'dept':
          return _react2.default.createElement(_translationNode2.default, { fontSize: '24px', label: 'employee.DepartmentalTest.title' });
      }
    };

    _this.setModalOpen = function (type) {
      var _this$setState;

      _this.setState((_this$setState = {
        open: true,
        isModalInvalid: true,
        errorText: {},
        modal: type,
        boundaries: [],
        editIndex: ''
      }, (0, _defineProperty3.default)(_this$setState, 'errorText', {}), (0, _defineProperty3.default)(_this$setState, 'subObject', {
        assignments: Object.assign({}, assignmentsDefState),
        jurisdictions: Object.assign({}, jurisDefState),
        serviceHistory: Object.assign({}, serviceDefState),
        probation: Object.assign({}, probDefState),
        regularisation: Object.assign({}, regDefState),
        education: Object.assign({}, eduDefState),
        technical: Object.assign({}, techDefState),
        test: Object.assign({}, deptDefState)
      }), _this$setState));
    };

    _this.setInitDat = function (empObj, isUpdate) {
      var self = _this;
      _api2.default.commonApiPost('hr-masters/hrconfigurations/_search', {}).then(function (res) {
        var autoCode = false,
            autoUName = false;
        if (res && res['HRConfiguration'] && (res['HRConfiguration']['Autogenerate_employeecode'][0] == 'N' || typeof res['HRConfiguration']['Autogenerate_employeecode'] == 'undefined')) {} else {
          autoCode = true;
        }

        if (res && res['HRConfiguration'] && (res['HRConfiguration']['Autogenerate_username'][0] == 'N' || typeof res['HRConfiguration']['Autogenerate_username'] == 'undefined')) {} else {
          autoUName = true;
        }

        self.setState({
          autoCode: autoCode,
          autoUName: autoUName
        });

        self.props.setForm(empObj, isUpdate, autoCode, autoUName);
      }, function (err) {
        self.props.setForm(empObj, isUpdate, false, false);
      });
    };

    _this.initDat = function () {
      var self = _this;
      self.props.resetForm();
      self.setState({
        pathname: self.props.history.location.pathname,
        screenType: window.location.hash.indexOf('update') > -1 ? 'update' : window.location.hash.indexOf('view') > -1 ? 'view' : 'create'
      }, function () {
        if (self.state.screenType == 'update' || self.state.screenType == 'view') {
          _api2.default.commonApiPost('/hr-employee/employees/' + self.props.match.params.id + '/_search', {}).then(function (res) {
            for (var i = 0; i < res.Employee.assignments.length; i++) {
              res.Employee.assignments[i].fromServer = true;
            }

            if (res.Employee && res.Employee.user && res.Employee.user.dob && res.Employee.user.dob.indexOf('-') > -1) {
              var dobArr = res.Employee.user.dob.split('-');
              res.Employee.user.dob = dobArr[2] + '/' + dobArr[1] + '/' + dobArr[0];
            }

            self.setInitDat(res.Employee, self.state.screenType != 'view' ? true : false);

            if (['view', 'update'].indexOf(self.state.screenType) > -1 && res.Employee.bank) {
              self.loadBranches(res.Employee.bank);
            }
          }, function (err) {});
        } else {
          self.setInitDat({
            code: null,
            dateOfAppointment: '',
            dateOfJoining: '',
            dateOfRetirement: '',
            employeeStatus: '',
            recruitmentMode: '',
            recruitmentType: '',
            recruitmentQuota: '',
            retirementAge: '',
            dateOfResignation: '',
            dateOfTermination: '',
            employeeType: '',
            assignments: [],
            jurisdictions: [],
            motherTongue: '',
            religion: '',
            community: '',
            category: '',
            physicallyDisabled: false,
            medicalReportProduced: false,
            languagesKnown: [],
            maritalStatus: '',
            passportNo: null,
            gpfNo: null,
            bank: '',
            bankBranch: '',
            bankAccount: '',
            group: '',
            placeOfBirth: '',
            documents: [],
            serviceHistory: [],
            probation: [],
            regularisation: [],
            technical: [],
            education: [],
            test: [],
            user: {
              roles: [{
                code: 'EMPLOYEE',
                name: 'EMPLOYEE',
                tenantId: localStorage.getItem('tenantId')
              }],
              userName: null,
              name: '',
              gender: '',
              mobileNumber: '',
              emailId: '',
              altContactNumber: '',
              pan: '',
              aadhaarNumber: '',
              permanentAddress: '',
              permanentCity: '',
              permanentPinCode: '',
              correspondenceCity: '',
              correspondencePinCode: '',
              correspondenceAddress: '',
              active: true,
              dob: '',
              locale: '',
              signature: '',
              fatherOrHusbandName: '',
              bloodGroup: null,
              identificationMark: '',
              photo: '',
              type: 'EMPLOYEE',
              password: '12345678',
              tenantId: localStorage.getItem('tenantId')
            },
            tenantId: localStorage.getItem('tenantId')
          }, false);
        }
      });

      var count = 23,
          _state = {};
      var checkCountAndSetState = function checkCountAndSetState(key, res) {
        _state[key] = res;
        count--;
        if (count == 0) {
          self.setInitialState(_state);
          self.props.setLoadingStatus('hide');
        }
      };

      self.props.setLoadingStatus('loading');
      self.fetchURLData('/hr-masters/employeetypes/_search', {}, [], function (res) {
        checkCountAndSetState('employeetypes', res['EmployeeType']);
      });
      self.fetchURLData('hr-masters/positions/_search', {}, [], function (res) {
        checkCountAndSetState('allPosition', res['Position']);
      });
      self.fetchURLData('/hr-masters/hrstatuses/_search', { objectName: 'Employee Master' }, [], function (res) {
        checkCountAndSetState('statuses', res['HRStatus']);
      });
      self.fetchURLData('/hr-masters/groups/_search', {}, [], function (res) {
        checkCountAndSetState('groups', res['Group']);
      });
      self.fetchURLData('/egf-masters/banks/_search', {}, [], function (res) {
        checkCountAndSetState('banks', res['banks']);
      });
      self.fetchURLData('/egov-common-masters/categories/_search', {}, [], function (res) {
        checkCountAndSetState('categories', res['Category']);
      });
      self.fetchURLData('/hr-employee/maritalstatuses/_search', {}, [], function (res) {
        checkCountAndSetState('maritalstatuses', res['MaritalStatus']);
      });
      self.fetchURLData('/hr-employee/bloodgroups/_search', {}, [], function (res) {
        checkCountAndSetState('bloodgroups', res['BloodGroup']);
      });
      self.fetchURLData('/egov-common-masters/languages/_search', {}, [], function (res) {
        checkCountAndSetState('languages', res['Language']);
      });
      self.fetchURLData('/egov-common-masters/religions/_search', {}, [], function (res) {
        checkCountAndSetState('religions', res['Religion']);
      });
      self.fetchURLData('/hr-masters/recruitmentmodes/_search', {}, [], function (res) {
        checkCountAndSetState('recruitmentmodes', res['RecruitmentMode']);
      });
      self.fetchURLData('/hr-masters/recruitmenttypes/_search', {}, [], function (res) {
        checkCountAndSetState('recruitmenttypes', res['RecruitmentType']);
      });
      self.fetchURLData('/hr-masters/grades/_search', {}, [], function (res) {
        checkCountAndSetState('grades', res['Grade']);
      });
      self.fetchURLData('/egf-masters/funds/_search', {}, [], function (res) {
        checkCountAndSetState('funds', res['funds']);
      });
      self.fetchURLData('/egf-masters/functionaries/_search', {}, [], function (res) {
        checkCountAndSetState('functionaries', res['functionaries']);
      });
      self.fetchURLData('/egf-masters/functions/_search', {}, [], function (res) {
        checkCountAndSetState('functions', res['functions']);
      });
      self.fetchURLData('/egov-location/boundarytypes/getByHierarchyType', { hierarchyTypeName: 'ADMINISTRATION' }, [], function (res) {
        checkCountAndSetState('boundarytypes', res['BoundaryType']);
      });
      self.fetchURLData('hr-masters/designations/_search', {}, [], function (res) {
        checkCountAndSetState('designations', res['Designation']);
      });
      self.fetchURLData('egov-common-masters/departments/_search', {}, [], function (res) {
        checkCountAndSetState('departments', res['Department']);
      });
      self.fetchURLData('hr-masters/recruitmentquotas/_search', {}, [], function (res) {
        checkCountAndSetState('recruitmentquotas', res['RecruitmentQuota']);
      });
      self.fetchURLData('egov-common-masters/genders/_search', {}, [], function (res) {
        checkCountAndSetState('genders', res['Gender']);
      });
      self.fetchURLData('egov-common-masters/communities/_search', {}, [], function (res) {
        checkCountAndSetState('communities', res['Community']);
      });

      _api2.default.commonApiGet('egov-location/boundarys', {
        'Boundary.tenantId': localStorage.getItem('tenantId')
      }).then(function (res) {
        checkCountAndSetState('allBoundariesList', res['Boundary']);
      }, function (err) {
        checkCountAndSetState('allBoundariesList', []);
      });
    };

    _this.handleDateChange = function (type, date, isRequired) {
      var self = _this;
      var _date = new Date(date);
      var name = void 0;
      switch (type) {
        case 'dob':
          name = 'user.dob';
          break;
        case 'appointmentDate':
          name = 'dateOfAppointment';
          if (self.props.Employee.dateOfRetirement) {
            var dateParts1 = self.props.Employee.dateOfRetirement.split('/');
            var newDateStr = dateParts1[1] + '/' + dateParts1[0] + '/ ' + dateParts1[2];
            var date1 = new Date(newDateStr).getTime();
            if (date > date1) return self.props.toggleSnackbarAndSetText(true, (0, _Common.translate)('employee.error.message.appDate.retDate'), false, true);
          }

          if (self.props.Employee.dateOfTermination) {
            var dateParts1 = self.props.Employee.dateOfTermination.split('/');
            var newDateStr = dateParts1[1] + '/' + dateParts1[0] + '/ ' + dateParts1[2];
            var date1 = new Date(newDateStr).getTime();
            if (date > date1) return self.props.toggleSnackbarAndSetText(true, (0, _Common.translate)('employee.error.message.appDate.terDate'), false, true);
          }

          if (self.props.Employee.dateOfResignation) {
            var dateParts1 = self.props.Employee.dateOfResignation.split('/');
            var newDateStr = dateParts1[1] + '/' + dateParts1[0] + '/ ' + dateParts1[2];
            var date1 = new Date(newDateStr).getTime();
            if (date > date1) return self.props.toggleSnackbarAndSetText(true, (0, _Common.translate)('employee.error.message.appDate.regDate'), false, true);
          }

          if (self.props.Employee.dateOfJoining) {
            var dateParts1 = self.props.Employee.dateOfResignation.split('/');
            var newDateStr = dateParts1[1] + '/' + dateParts1[0] + '/ ' + dateParts1[2];
            var date1 = new Date(newDateStr).getTime();
            if (date > date1) return self.props.toggleSnackbarAndSetText(true, (0, _Common.translate)('employee.error.message.appDate.joinDate'), false, true);
          }
          break;
        case 'joiningDate':
          name = 'dateOfJoining';
          if (self.props.Employee.dateOfAppointment) {
            var dateParts1 = self.props.Employee.dateOfAppointment.split('/');
            var newDateStr = dateParts1[1] + '/' + dateParts1[0] + '/ ' + dateParts1[2];
            var date1 = new Date(newDateStr).getTime();
            if (date < date1) return self.props.toggleSnackbarAndSetText(true, (0, _Common.translate)('employee.error.message.appDate.joinDate'), false, true);
          }

          if (self.props.Employee.dateOfRetirement) {
            var dateParts1 = self.props.Employee.dateOfRetirement.split('/');
            var newDateStr = dateParts1[1] + '/' + dateParts1[0] + '/ ' + dateParts1[2];
            var date1 = new Date(newDateStr).getTime();
            if (date > date1) return self.props.toggleSnackbarAndSetText(true, (0, _Common.translate)('employee.error.message.retDate.joinDate'), false, true);
          }

          if (self.props.Employee.dateOfTermination) {
            var dateParts1 = self.props.Employee.dateOfTermination.split('/');
            var newDateStr = dateParts1[1] + '/' + dateParts1[0] + '/ ' + dateParts1[2];
            var date1 = new Date(newDateStr).getTime();
            if (date > date1) return self.props.toggleSnackbarAndSetText(true, (0, _Common.translate)('employee.error.message.joinDate.terDate'), false, true);
          }

          if (self.props.Employee.dateOfResignation) {
            var dateParts1 = self.props.Employee.dateOfTermination.split('/');
            var newDateStr = dateParts1[1] + '/' + dateParts1[0] + '/ ' + dateParts1[2];
            var date1 = new Date(newDateStr).getTime();
            if (date > date1) return self.props.toggleSnackbarAndSetText(true, (0, _Common.translate)('employee.error.message.joinDate.regDate'), false, true);
          }
          break;
        case 'retirementDate':
          name = 'dateOfRetirement';
          if (self.props.Employee.dateOfAppointment) {
            var dateParts1 = self.props.Employee.dateOfAppointment.split('/');
            var newDateStr = dateParts1[1] + '/' + dateParts1[0] + '/ ' + dateParts1[2];
            var date1 = new Date(newDateStr).getTime();
            if (date < date1) return self.props.toggleSnackbarAndSetText(true, (0, _Common.translate)('employee.error.message.appDate.retDate'), false, true);
          }
          if (self.props.Employee.dateOfJoining) {
            var dateParts1 = self.props.Employee.dateOfAppointment.split('/');
            var newDateStr = dateParts1[1] + '/' + dateParts1[0] + '/ ' + dateParts1[2];
            var date1 = new Date(newDateStr).getTime();
            if (date < date1) return self.props.toggleSnackbarAndSetText(true, (0, _Common.translate)('employee.error.message.retDate.joinDate'), false, true);
          }
          break;
        case 'terminationDate':
          name = 'dateOfTermination';
          if (self.props.Employee.dateOfAppointment) {
            var dateParts1 = self.props.Employee.dateOfAppointment.split('/');
            var newDateStr = dateParts1[1] + '/' + dateParts1[0] + '/ ' + dateParts1[2];
            var date1 = new Date(newDateStr).getTime();
            if (date < date1) return self.props.toggleSnackbarAndSetText(true, (0, _Common.translate)('employee.error.message.appDate.terDate'), false, true);
          }

          if (self.props.Employee.dateOfJoining) {
            var dateParts1 = self.props.Employee.dateOfJoining.split('/');
            var newDateStr = dateParts1[1] + '/' + dateParts1[0] + '/ ' + dateParts1[2];
            var date1 = new Date(newDateStr).getTime();
            if (date < date1) return self.props.toggleSnackbarAndSetText(true, (0, _Common.translate)('employee.error.message.joinDate.terDate'), false, true);
          }
          break;
        case 'resignationDate':
          name = 'dateOfResignation';
          if (self.props.Employee.dateOfAppointment) {
            var dateParts1 = self.props.Employee.dateOfAppointment.split('/');
            var newDateStr = dateParts1[1] + '/' + dateParts1[0] + '/ ' + dateParts1[2];
            var date1 = new Date(newDateStr).getTime();
            if (date < date1) return self.props.toggleSnackbarAndSetText(true, (0, _Common.translate)('employee.error.message.appDate.regDate'), false, true);
          }

          if (self.props.Employee.dateOfJoining) {
            var dateParts1 = self.props.Employee.dateOfJoining.split('/');
            var newDateStr = dateParts1[1] + '/' + dateParts1[0] + '/ ' + dateParts1[2];
            var date1 = new Date(newDateStr).getTime();
            if (date < date1) return self.props.toggleSnackbarAndSetText(true, (0, _Common.translate)('employee.error.message.joinDate.regDate'), false, true);
          }
          break;
      }

      if (name.indexOf('.') == -1) {
        self.props.handleChange({
          target: {
            value: ('0' + _date.getDate()).slice(-2) + '/' + ('0' + (_date.getMonth() + 1)).slice(-2) + '/' + _date.getFullYear()
          }
        }, name, isRequired || false, '');
      } else {
        var _split = name.split('.');
        self.props.handleChangeNextLevel({
          target: {
            value: ('0' + _date.getDate()).slice(-2) + '/' + ('0' + (_date.getMonth() + 1)).slice(-2) + '/' + _date.getFullYear()
          }
        }, _split[0], _split[1], isRequired || false, '');
      }
    };

    _this.createOrUpdate = function (e) {
      e.preventDefault();
      var employee = Object.assign({}, _this.props.Employee);
      var self = _this;
      if (employee.assignments.length == 0 || employee.jurisdictions.length == 0) {
        self.props.toggleSnackbarAndSetText(true, 'Please enter atleast one assignment and jurisdiction.');
      } else if (!isHavingPrimary(employee)) {
        self.props.toggleSnackbarAndSetText(true, 'Atleast one primary assignment is required.');
      } else {
        var __emp = Object.assign({}, employee);

        if (employee['jurisdictions'] && employee['jurisdictions'].length) {
          var empJuridictions = employee['jurisdictions'];
          employee['jurisdictions'] = [];
          for (var i = 0; i < empJuridictions.length; i++) {
            if ((0, _typeof3.default)(empJuridictions[i]) == 'object') employee['jurisdictions'].push(empJuridictions[i].boundary);else employee['jurisdictions'].push(empJuridictions[i]);
          }
        }

        if (employee['assignments'] && employee['assignments'].length) {
          for (var i = 0; i < employee['assignments'].length; i++) {
            if (employee['assignments'][i].hod == false) {
              employee['assignments'][i].hod = [];
            }
          }
        }

        if (employee.user && employee.user.dob && self.state.screenType == 'update' && employee.user.dob.indexOf('-') > -1) {
          var _date = employee.user.dob.split('-');
          employee.user.dob = _date[2] + '/' + _date[1] + '/' + _date[0];
        }

        self.props.setLoadingStatus('loading');
        uploadFiles(employee, function (err, emp) {
          if (err) {
            //Handle error
            self.props.setLoadingStatus('hide');
          } else {
            _api2.default.commonApiPost('/hr-employee/employees/' + (self.state.screenType == 'update' ? '_update' : '_create'), {}, { Employee: employee }).then(function (res) {
              self.props.setLoadingStatus('hide');
              self.props.toggleSnackbarAndSetText(true, self.state.screenType == 'update' ? 'Employee updated successfully.' : 'Employee created successfully.');
              setTimeout(function () {
                self.props.setRoute('/view/' + res.Employee.id);
                //window.location.reload();
              }, 1500);
            }, function (err) {
              self.props.setLoadingStatus('hide');
              self.props.toggleSnackbarAndSetText(true, err.message);
            });
          }
        });
      }
    };

    _this.state = {
      pathname: '',
      open: false,
      editIndex: '',
      isModalInvalid: true,
      autoCode: false,
      autoUName: false,
      modal: '',
      employeetypes: [],
      statuses: [],
      groups: [],
      banks: [],
      categories: [],
      maritalstatuses: [],
      bloodgroups: [],
      languages: [],
      religions: [],
      recruitmentmodes: [],
      recruitmenttypes: [],
      grades: [],
      funds: [],
      functionaries: [],
      functions: [],
      boundarytypes: [],
      designations: [],
      departments: [],
      recruitmentquotas: [],
      genders: [],
      communities: [],
      allBoundariesList: [],
      bankBranches: [],
      boundaries: [],
      positionList: [],
      positionListConfig: {
        text: 'name',
        value: 'id'
      },
      screenType: 'create',
      errorText: {},
      allPosition: [],
      subObject: {
        assignments: Object.assign({}, assignmentsDefState),
        jurisdictions: Object.assign({}, jurisDefState),
        serviceHistory: Object.assign({}, serviceDefState),
        probation: Object.assign({}, probDefState),
        regularisation: Object.assign({}, regDefState),
        education: Object.assign({}, eduDefState),
        technical: Object.assign({}, techDefState),
        test: Object.assign({}, deptDefState)
      }
    };
    return _this;
  }

  (0, _createClass3.default)(Employee, [{
    key: 'fetchURLData',
    value: function fetchURLData(url) {
      var query = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var defaultObject = arguments[2];
      var cb = arguments[3];

      _api2.default.commonApiPost(url, query).then(function (res) {
        cb(res);
      }, function (err) {
        cb(defaultObject);
      });
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.state.pathname != nextProps.history.location.pathname) {
        this.initDat();
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.initDat();
    }
  }, {
    key: 'renderEmployee',
    value: function renderEmployee() {
      var _React$createElement2;

      var _props = this.props,
          Employee = _props.Employee,
          fieldErrors = _props.fieldErrors,
          handleChange = _props.handleChange,
          handleChangeNextLevel = _props.handleChangeNextLevel;


      var self = this;
      return _react2.default.createElement(
        _Card.Card,
        { className: 'uiCard create-employee-card' },
        _react2.default.createElement(
          _Card.CardText,
          null,
          _react2.default.createElement(
            _reactBootstrap.Row,
            null,
            _react2.default.createElement(
              _reactBootstrap.Col,
              { xs: 12, sm: 4, md: 3, lg: 3 },
              self.state.screenType == 'view' ? _react2.default.createElement(
                'span',
                null,
                _react2.default.createElement(
                  'label',
                  null,
                  _react2.default.createElement(_translationNode2.default, { label: 'employee.Employee.fields.User.name', containerStyle: { display: "inline" }, fontSize: '20px' })
                ),
                _react2.default.createElement('br', null),
                _react2.default.createElement(
                  'label',
                  null,
                  Employee.user ? Employee.user.name : '-'
                )
              ) : _react2.default.createElement(_TextField2.default, { className: 'create-employee-text-field-cont',
                floatingLabelStyle: {
                  color: '#696969',
                  fontSize: '20px',
                  'white-space': 'nowrap'

                },
                floatingLabelFixed: true,
                floatingLabelText: _react2.default.createElement(
                  'span',
                  null,
                  _react2.default.createElement(_translationNode2.default, { fontSize: '20px', label: 'employee.Employee.fields.User.name', containerStyle: { display: "inline" } }),
                  _react2.default.createElement(
                    'span',
                    { style: { color: '#FF0000' } },
                    ' *'
                  )
                ),
                errorText: fieldErrors['user'] && fieldErrors['user']['name'],
                value: Employee.user ? Employee.user.name : '',
                onChange: function onChange(e) {
                  handleChangeNextLevel(e, 'user', 'name', true, '');
                }
              })
            ),
            _react2.default.createElement(
              _reactBootstrap.Col,
              {
                xs: 12,
                sm: 4,
                md: 3,
                lg: 3,
                style: {
                  display: self.state.screenType == 'create' && self.state.autoCode ? 'none' : 'block'
                }
              },
              self.state.screenType == 'view' ? _react2.default.createElement(
                'span',
                null,
                _react2.default.createElement(
                  'label',
                  null,
                  _react2.default.createElement(_translationNode2.default, { fontSize: '20px', label: 'employee.Employee.fields.code', containerStyle: { display: "inline" } })
                ),
                _react2.default.createElement('br', null),
                _react2.default.createElement(
                  'label',
                  null,
                  Employee.code || '-'
                )
              ) : _react2.default.createElement(_TextField2.default, { className: 'create-employee-text-field-cont',
                inputStyle: { color: '#5F5C57' },
                floatingLabelStyle: {
                  color: self.state.screenType == 'update' || self.state.autoCode ? '#A9A9A9' : '#696969',
                  fontSize: '20px'

                },
                floatingLabelFixed: true,
                floatingLabelText: _react2.default.createElement(
                  'span',
                  null,
                  _react2.default.createElement(_translationNode2.default, { fontSize: '20px', containerStyle: { display: "inline" }, label: 'employee.Employee.fields.code' }),
                  _react2.default.createElement(
                    'span',
                    { style: { color: '#FF0000' } },
                    ' *'
                  )
                ),
                errorText: fieldErrors['code'],
                value: Employee.code,
                onChange: function onChange(e) {
                  handleChange(e, 'code', true, '');
                },
                disabled: self.state.screenType == 'update' || self.state.autoCode
              })
            ),
            _react2.default.createElement(
              _reactBootstrap.Col,
              { xs: 12, sm: 4, md: 3, lg: 3 },
              self.state.screenType == 'view' ? _react2.default.createElement(
                'span',
                null,
                _react2.default.createElement(
                  'label',
                  null,
                  _react2.default.createElement(_translationNode2.default, { fontSize: '20px', label: 'employee.Employee.fields.employeeType' })
                ),
                _react2.default.createElement('br', null),
                _react2.default.createElement(
                  'label',
                  null,
                  getNameById(self.state.employeetypes, Employee.employeeType) || '-'
                )
              ) : _react2.default.createElement(
                'div',
                { ref: 'myField' },
                _react2.default.createElement(
                  _SelectField2.default,
                  { className: 'create-employee-text-field-cont',
                    floatingLabelStyle: {
                      color: '#696969',
                      fontSize: '20px',
                      'white-space': 'nowrap'

                    },
                    floatingLabelFixed: true,
                    dropDownMenuProps: {

                      targetOrigin: {
                        horizontal: 'left',
                        vertical: 'bottom'
                      }
                    },
                    floatingLabelText: _react2.default.createElement(
                      'span',
                      null,
                      _react2.default.createElement(_translationNode2.default, { fontSize: '20px', label: 'employee.Employee.fields.employeeType', containerStyle: { display: "inline" } }),
                      _react2.default.createElement(
                        'span',
                        { style: { color: '#FF0000' } },
                        ' *'
                      )
                    ),
                    errorText: fieldErrors['employeeType'],
                    value: Employee.employeeType,
                    onChange: function onChange(event, key, value) {
                      handleChange({ target: { value: value } }, 'employeeType', true, '');
                    }
                  },
                  self.state.employeetypes && self.state.employeetypes.map(function (v, i) {
                    return _react2.default.createElement(_MenuItem2.default, { value: v.id, key: i, primaryText: v.name });
                  })
                )
              )
            ),
            _react2.default.createElement(
              _reactBootstrap.Col,
              { xs: 12, sm: 4, md: 3, lg: 3 },
              self.state.screenType == 'view' ? _react2.default.createElement(
                'span',
                null,
                _react2.default.createElement(
                  'label',
                  null,
                  _react2.default.createElement(_translationNode2.default, { fontSize: '20px', label: 'employee.Employee.fields.employeeStatus' })
                ),
                _react2.default.createElement('br', null),
                _react2.default.createElement(
                  'label',
                  null,
                  getNameById(self.state.statuses, Employee.employeeStatus) || '-'
                )
              ) : _react2.default.createElement(
                _SelectField2.default,
                { className: 'create-employee-text-field-cont',
                  floatingLabelStyle: {
                    color: '#696969',
                    fontSize: '20px',
                    'white-space': 'nowrap'

                  },
                  floatingLabelFixed: true,
                  dropDownMenuProps: {

                    targetOrigin: { horizontal: 'left', vertical: 'bottom' }
                  },
                  floatingLabelText: _react2.default.createElement(
                    'span',
                    null,
                    _react2.default.createElement(_translationNode2.default, { fontSize: '20px', label: 'employee.Employee.fields.employeeStatus', containerStyle: { display: "inline" } }),
                    _react2.default.createElement(
                      'span',
                      { style: { color: '#FF0000' } },
                      ' *'
                    )
                  ),
                  errorText: fieldErrors['employeeStatus'],
                  value: Employee.employeeStatus,
                  onChange: function onChange(event, key, value) {
                    handleChange({ target: { value: value } }, 'employeeStatus', true, '');
                  }
                },
                self.state.statuses && self.state.statuses.map(function (v, i) {
                  return _react2.default.createElement(_MenuItem2.default, { value: v.id, key: i, primaryText: v.code });
                })
              )
            )
          ),
          self.state.screenType == 'view' && _react2.default.createElement('br', null),
          _react2.default.createElement(
            _reactBootstrap.Row,
            null,
            _react2.default.createElement(
              _reactBootstrap.Col,
              { xs: 12, sm: 4, md: 3, lg: 3 },
              self.state.screenType == 'view' ? _react2.default.createElement(
                'span',
                null,
                _react2.default.createElement(
                  'label',
                  null,
                  _react2.default.createElement(_translationNode2.default, { fontSize: '20px', label: 'employee.Employee.fields.group' })
                ),
                _react2.default.createElement('br', null),
                _react2.default.createElement(
                  'label',
                  null,
                  getNameById(self.state.groups, Employee.group) || '-'
                )
              ) : _react2.default.createElement(
                _SelectField2.default,
                { className: 'create-employee-text-field-cont',
                  floatingLabelStyle: {
                    color: '#696969',
                    fontSize: '20px',
                    'white-space': 'nowrap'

                  },
                  floatingLabelFixed: true,
                  dropDownMenuProps: {

                    targetOrigin: { horizontal: 'left', vertical: 'bottom' }
                  },
                  floatingLabelText: _react2.default.createElement(_translationNode2.default, { fontSize: '20px', label: 'employee.Employee.fields.group' }),
                  errorText: fieldErrors['group'],
                  value: Employee.group,
                  onChange: function onChange(event, key, value) {
                    handleChange({ target: { value: value } }, 'group', false, '');
                  }
                },
                self.state.groups && self.state.groups.map(function (v, i) {
                  return _react2.default.createElement(_MenuItem2.default, { value: v.id, key: i, primaryText: v.name });
                })
              )
            ),
            _react2.default.createElement(
              _reactBootstrap.Col,
              { xs: 12, sm: 4, md: 3, lg: 3 },
              self.state.screenType == 'view' ? _react2.default.createElement(
                'span',
                null,
                _react2.default.createElement(
                  'label',
                  null,
                  _react2.default.createElement(_translationNode2.default, { fontSize: '20px', label: 'employee.Employee.fields.dateOfBirth', containerStyle: { display: "inline" } })
                ),
                _react2.default.createElement('br', null),
                _react2.default.createElement(
                  'label',
                  null,
                  Employee.user ? Employee.user.dob : '-'
                )
              ) : _react2.default.createElement(_TextField2.default, { className: 'create-employee-text-field-cont',
                floatingLabelStyle: {
                  color: '#696969',
                  fontSize: '20px',
                  'white-space': 'nowrap'

                },
                floatingLabelFixed: true,
                hintText: '21/11/1993',
                floatingLabelText: _react2.default.createElement(
                  'span',
                  null,
                  _react2.default.createElement(_translationNode2.default, { fontSize: '20px', label: 'employee.Employee.fields.dateOfBirth', containerStyle: { display: "inline" } }),
                  _react2.default.createElement(
                    'span',
                    { style: { color: '#FF0000' } },
                    ' *'
                  )
                ),
                errorText: fieldErrors['user'] && fieldErrors['user']['dob'],
                value: Employee.user ? Employee.user.dob : '',
                onChange: function onChange(e) {
                  handleChangeNextLevel(e, 'user', 'dob', true, datePat);
                }
              })
            ),
            _react2.default.createElement(
              _reactBootstrap.Col,
              { xs: 12, sm: 4, md: 3, lg: 3 },
              self.state.screenType == 'view' ? _react2.default.createElement(
                'span',
                null,
                _react2.default.createElement(
                  'label',
                  null,
                  _react2.default.createElement(_translationNode2.default, { label: 'employee.Employee.fields.User.gender', fontSize: '20px' })
                ),
                _react2.default.createElement('br', null),
                _react2.default.createElement(
                  'label',
                  null,
                  Employee.user ? Employee.user.gender : '-'
                )
              ) : _react2.default.createElement(
                _SelectField2.default,
                { className: 'create-employee-text-field-cont',
                  floatingLabelStyle: {
                    color: '#696969',
                    fontSize: '20px',
                    'white-space': 'nowrap'

                  },
                  floatingLabelFixed: true,
                  dropDownMenuProps: {

                    targetOrigin: { horizontal: 'left', vertical: 'bottom' }
                  },
                  floatingLabelText: _react2.default.createElement(
                    'span',
                    null,
                    _react2.default.createElement(_translationNode2.default, { label: 'employee.Employee.fields.User.gender', fontSize: '20px', containerStyle: { display: "inline" } }),
                    _react2.default.createElement(
                      'span',
                      { style: { color: '#FF0000' } },
                      ' *'
                    )
                  ),
                  errorText: fieldErrors['user'] && fieldErrors['user']['gender'],
                  value: Employee.user ? Employee.user.gender : '',
                  onChange: function onChange(event, key, value) {
                    handleChangeNextLevel({ target: { value: value } }, 'user', 'gender', true, '');
                  }
                },
                self.state.genders && self.state.genders.map(function (v, i) {
                  return _react2.default.createElement(_MenuItem2.default, { value: v, key: i, primaryText: v });
                })
              )
            ),
            _react2.default.createElement(
              _reactBootstrap.Col,
              { xs: 12, sm: 4, md: 3, lg: 3 },
              self.state.screenType == 'view' ? _react2.default.createElement(
                'span',
                null,
                _react2.default.createElement(
                  'label',
                  null,
                  _react2.default.createElement(_translationNode2.default, { fontSize: '24px', label: 'employee.Employee.fields.maritalStatus' })
                ),
                _react2.default.createElement('br', null),
                _react2.default.createElement(
                  'label',
                  null,
                  Employee.maritalStatus || '-'
                )
              ) : _react2.default.createElement(
                _SelectField2.default,
                { className: 'create-employee-text-field-cont',
                  floatingLabelStyle: {
                    color: '#696969',
                    fontSize: '20px',
                    'white-space': 'nowrap'

                  },
                  floatingLabelFixed: true,
                  dropDownMenuProps: {

                    targetOrigin: { horizontal: 'left', vertical: 'bottom' }
                  },
                  floatingLabelText: _react2.default.createElement(
                    'span',
                    null,
                    _react2.default.createElement(_translationNode2.default, { fontSize: '24px', label: 'employee.Employee.fields.maritalStatus', containerStyle: { display: "inline" } }),
                    _react2.default.createElement(
                      'span',
                      { style: { color: '#FF0000' } },
                      ' *'
                    )
                  ),
                  errorText: fieldErrors['maritalStatus'],
                  value: Employee.maritalStatus,
                  onChange: function onChange(event, key, value) {
                    handleChange({ target: { value: value } }, 'maritalStatus', true, '');
                  }
                },
                self.state.maritalstatuses && self.state.maritalstatuses.map(function (v, i) {
                  return _react2.default.createElement(_MenuItem2.default, { value: v, key: i, primaryText: v });
                })
              )
            )
          ),
          self.state.screenType == 'view' && _react2.default.createElement('br', null),
          _react2.default.createElement(
            _reactBootstrap.Row,
            null,
            _react2.default.createElement(
              _reactBootstrap.Col,
              {
                xs: 12,
                sm: 4,
                md: 3,
                lg: 3,
                style: {
                  display: self.state.screenType == 'create' && self.state.autoUName ? 'none' : 'block'
                }
              },
              self.state.screenType == 'view' ? _react2.default.createElement(
                'span',
                null,
                _react2.default.createElement(
                  'label',
                  null,
                  _react2.default.createElement(_translationNode2.default, { fontSize: '20px', label: 'employee.Employee.fields.User.userName', containerStyle: { display: "inline" } })
                ),
                _react2.default.createElement('br', null),
                _react2.default.createElement(
                  'label',
                  null,
                  Employee.user ? Employee.user.userName : '-'
                )
              ) : _react2.default.createElement(_TextField2.default, (_React$createElement2 = { className: 'create-employee-text-field-cont',
                inputStyle: { color: '#5F5C57' },
                floatingLabelStyle: {
                  color: self.state.screenType == 'update' || self.state.autoUName ? '#A9A9A9' : '#696969',
                  fontSize: '20px'

                },
                floatingLabelFixed: true,
                floatingLabelText: _react2.default.createElement(
                  'span',
                  null,
                  _react2.default.createElement(_translationNode2.default, { label: 'employee.Employee.fields.User.userName', fontSize: '20px', containerStyle: { display: "inline" } }),
                  _react2.default.createElement(
                    'span',
                    { style: { color: '#FF0000' } },
                    ' *'
                  )
                ),
                errorText: fieldErrors['user'] && fieldErrors['user']['userName']
              }, (0, _defineProperty3.default)(_React$createElement2, 'errorText', fieldErrors['user.userName']), (0, _defineProperty3.default)(_React$createElement2, 'value', Employee.user ? Employee.user.userName : ''), (0, _defineProperty3.default)(_React$createElement2, 'onChange', function onChange(e) {
                handleChangeNextLevel(e, 'user', 'userName', true, '');
              }), (0, _defineProperty3.default)(_React$createElement2, 'disabled', self.state.screenType == 'update' || self.state.autoUName), _React$createElement2))
            ),
            _react2.default.createElement(
              _reactBootstrap.Col,
              { xs: 12, sm: 4, md: 3, lg: 3 },
              self.state.screenType == 'view' ? _react2.default.createElement(
                'span',
                null,
                _react2.default.createElement(
                  'label',
                  null,
                  _react2.default.createElement(
                    'span',
                    { style: { fontWeight: '500' } },
                    _react2.default.createElement(_translationNode2.default, { fontSize: '15px', label: 'employee.fields.isUserActive' }),
                    '?'
                  )
                ),
                _react2.default.createElement('br', null),
                _react2.default.createElement(
                  'label',
                  null,
                  Employee.user && [true, 'true'].indexOf(Employee.user.active) > -1 ? (0, _Common.translate)('employee.createPosition.groups.fields.outsourcepost.value1') : (0, _Common.translate)('employee.createPosition.groups.fields.outsourcepost.value2')
                )
              ) : _react2.default.createElement(
                'span',
                null,
                _react2.default.createElement(
                  'label',
                  { style: { fontSize: '15px', fontWeight: '500' } },
                  _react2.default.createElement(_translationNode2.default, { fontSize: '15px', label: 'employee.fields.isUserActive', containerStyle: { display: "inline" } }),
                  _react2.default.createElement(
                    'span',
                    { style: { color: '#FF0000' } },
                    ' *'
                  )
                ),
                _react2.default.createElement(
                  _RadioButton.RadioButtonGroup,
                  {
                    name: 'isActive',
                    valueSelected: Employee.user ? Employee.user.active : '',
                    onChange: function onChange(e, value) {
                      handleChangeNextLevel({ target: { value: value } }, 'user', 'active', true, '');
                    }
                  },
                  _react2.default.createElement(_RadioButton.RadioButton, { className: 'radio-button-style', value: true, label: _react2.default.createElement(_translationNode2.default, { label: 'employee.createPosition.groups.fields.outsourcepost.value1' }) }),
                  _react2.default.createElement(_RadioButton.RadioButton, { className: 'radio-button-style', value: false, label: _react2.default.createElement(_translationNode2.default, { label: 'employee.createPosition.groups.fields.outsourcepost.value2' }) })
                )
              )
            ),
            _react2.default.createElement(
              _reactBootstrap.Col,
              { xs: 12, sm: 4, md: 3, lg: 3 },
              self.state.screenType == 'view' ? _react2.default.createElement(
                'span',
                null,
                _react2.default.createElement(
                  'label',
                  null,
                  _react2.default.createElement(_translationNode2.default, { label: 'employee.Employee.fields.User.mobileNumber', containerStyle: { display: "inline" }, fontSize: '20px' })
                ),
                _react2.default.createElement('br', null),
                _react2.default.createElement(
                  'label',
                  null,
                  Employee.user ? Employee.user.mobileNumber : '-'
                )
              ) : _react2.default.createElement(_TextField2.default, { className: 'create-employee-text-field-cont',
                floatingLabelStyle: {
                  color: '#696969',
                  fontSize: '20px',
                  'white-space': 'nowrap'

                },
                floatingLabelFixed: true,
                maxLength: '10',
                floatingLabelText: _react2.default.createElement(
                  'span',
                  null,
                  _react2.default.createElement(_translationNode2.default, { label: 'employee.Employee.fields.User.mobileNumber', containerStyle: { display: "inline" }, fontSize: '20px' }),
                  _react2.default.createElement(
                    'span',
                    { style: { color: '#FF0000' } },
                    ' *'
                  )
                ),
                errorText: fieldErrors['user'] && fieldErrors['user']['mobileNumber'],
                value: Employee.user ? Employee.user.mobileNumber : '',
                onChange: function onChange(e) {
                  if (e.target.value && !/^\d*$/g.test(e.target.value)) return;
                  handleChangeNextLevel(e, 'user', 'mobileNumber', true, /^\d{10}$/);
                }
              })
            ),
            _react2.default.createElement(
              _reactBootstrap.Col,
              { xs: 12, sm: 4, md: 3, lg: 3 },
              self.state.screenType == 'view' ? _react2.default.createElement(
                'span',
                null,
                _react2.default.createElement(
                  'label',
                  null,
                  _react2.default.createElement(_translationNode2.default, { label: 'employee.Employee.fields.email', fontSize: '20px' })
                ),
                _react2.default.createElement('br', null),
                _react2.default.createElement(
                  'label',
                  null,
                  Employee.user ? Employee.user.emailId : '-'
                )
              ) : _react2.default.createElement(_TextField2.default, { className: 'create-employee-text-field-cont',
                floatingLabelStyle: {
                  color: '#696969',
                  fontSize: '20px',
                  'white-space': 'nowrap'

                },
                floatingLabelFixed: true,
                floatingLabelText: _react2.default.createElement(_translationNode2.default, { fontSize: '20px', label: 'employee.Employee.fields.email' }),
                errorText: fieldErrors['user'] && fieldErrors['user']['emailId'],
                type: 'email',
                value: Employee.user ? Employee.user.emailId : '',
                onChange: function onChange(e) {
                  handleChangeNextLevel(e, 'user', 'emailId', false, /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
                }
              })
            )
          ),
          self.state.screenType == 'view' && _react2.default.createElement('br', null),
          _react2.default.createElement(
            _reactBootstrap.Row,
            null,
            _react2.default.createElement(
              _reactBootstrap.Col,
              { xs: 12, sm: 4, md: 3, lg: 3 },
              self.state.screenType == 'view' ? _react2.default.createElement(
                'span',
                null,
                _react2.default.createElement(
                  'label',
                  null,
                  _react2.default.createElement(
                    'span',
                    { style: { fontWeight: '500' } },
                    _react2.default.createElement(_translationNode2.default, { fontSize: '20px', label: 'employee.Employee.fields.fatherSpouseName' })
                  )
                ),
                _react2.default.createElement('br', null),
                _react2.default.createElement(
                  'label',
                  null,
                  Employee.user ? Employee.user.fatherOrHusbandName : '-'
                )
              ) : _react2.default.createElement(_TextField2.default, { className: 'create-employee-text-field-cont',
                floatingLabelStyle: {
                  color: '#696969',
                  fontSize: '20px',
                  'white-space': 'nowrap'

                },
                floatingLabelFixed: true,
                floatingLabelText: _react2.default.createElement(_translationNode2.default, { fontSize: '20px', label: 'employee.Employee.fields.fatherSpouseName' }),
                errorText: fieldErrors['user'] && fieldErrors['user']['fatherOrHusbandName'],
                value: Employee.user ? Employee.user.fatherOrHusbandName : '',
                onChange: function onChange(e) {
                  handleChangeNextLevel(e, 'user', 'fatherOrHusbandName', false, '');
                }
              })
            ),
            _react2.default.createElement(
              _reactBootstrap.Col,
              { xs: 12, sm: 4, md: 3, lg: 3 },
              self.state.screenType == 'view' ? _react2.default.createElement(
                'span',
                null,
                _react2.default.createElement(
                  'label',
                  null,
                  _react2.default.createElement(_translationNode2.default, { label: 'employee.Employee.fields.User.birth', fontSize: '20px' })
                ),
                _react2.default.createElement('br', null),
                _react2.default.createElement(
                  'label',
                  null,
                  Employee.placeOfBirth || '-'
                )
              ) : _react2.default.createElement(_TextField2.default, { className: 'create-employee-text-field-cont',
                floatingLabelStyle: {
                  color: '#696969',
                  fontSize: '20px',
                  'white-space': 'nowrap'

                },
                floatingLabelFixed: true,
                floatingLabelText: _react2.default.createElement(_translationNode2.default, { label: 'employee.Employee.fields.User.birth', fontSize: '20px' }),
                errorText: fieldErrors['placeOfBirth'],
                value: Employee.placeOfBirth,
                onChange: function onChange(e) {
                  handleChange(e, 'placeOfBirth', false, '');
                }
              })
            ),
            _react2.default.createElement(
              _reactBootstrap.Col,
              { xs: 12, sm: 4, md: 3, lg: 3 },
              self.state.screenType == 'view' ? _react2.default.createElement(
                'span',
                null,
                _react2.default.createElement(
                  'label',
                  null,
                  _react2.default.createElement(_translationNode2.default, { label: 'employee.Employee.fields.User.bloodGroup', fontSize: '20px' })
                ),
                _react2.default.createElement('br', null),
                _react2.default.createElement(
                  'label',
                  null,
                  Employee.user ? Employee.user.bloodGroup : '-'
                )
              ) : _react2.default.createElement(
                _SelectField2.default,
                { className: 'create-employee-text-field-cont',
                  floatingLabelStyle: {
                    color: '#696969',
                    fontSize: '20px',
                    'white-space': 'nowrap'

                  },
                  floatingLabelFixed: true,
                  dropDownMenuProps: {

                    targetOrigin: { horizontal: 'left', vertical: 'bottom' }
                  },
                  floatingLabelText: _react2.default.createElement(_translationNode2.default, { label: 'employee.Employee.fields.User.bloodGroup', fontSize: '20px' }),
                  errorText: fieldErrors['user'] && fieldErrors['user']['bloodGroup'],
                  value: Employee.user ? Employee.user.bloodGroup : '',
                  onChange: function onChange(event, key, value) {
                    handleChangeNextLevel({ target: { value: value } }, 'user', 'bloodGroup', false, '');
                  }
                },
                self.state.bloodgroups && self.state.bloodgroups.map(function (v, i) {
                  return _react2.default.createElement(_MenuItem2.default, { value: v.id, key: i, primaryText: v.name });
                })
              )
            ),
            _react2.default.createElement(
              _reactBootstrap.Col,
              { xs: 12, sm: 4, md: 3, lg: 3 },
              self.state.screenType == 'view' ? _react2.default.createElement(
                'span',
                null,
                _react2.default.createElement(
                  'label',
                  null,
                  _react2.default.createElement(
                    'span',
                    { style: { fontWeight: '500' } },
                    _react2.default.createElement(_translationNode2.default, { fontSize: '20px', label: 'employee.Employee.fields.motherTongue' })
                  )
                ),
                _react2.default.createElement('br', null),
                _react2.default.createElement(
                  'label',
                  null,
                  getNameById(self.state.languages, Employee.motherTongue) || '-'
                )
              ) : _react2.default.createElement(
                _SelectField2.default,
                { className: 'create-employee-text-field-cont',
                  floatingLabelStyle: {
                    color: '#696969',
                    fontSize: '20px',
                    'white-space': 'nowrap'

                  },
                  floatingLabelFixed: true,
                  dropDownMenuProps: {

                    targetOrigin: { horizontal: 'left', vertical: 'bottom' }
                  },
                  floatingLabelText: _react2.default.createElement(_translationNode2.default, { fontSize: '20px', label: 'employee.Employee.fields.motherTongue' }),
                  errorText: fieldErrors['motherTongue'],
                  value: Employee.motherTongue,
                  onChange: function onChange(event, key, value) {
                    handleChange({ target: { value: value } }, 'motherTongue', false, '');
                  }
                },
                self.state.languages && self.state.languages.map(function (v, i) {
                  return _react2.default.createElement(_MenuItem2.default, { value: v.id, key: i, primaryText: v.name });
                })
              )
            )
          ),
          self.state.screenType == 'view' && _react2.default.createElement('br', null),
          _react2.default.createElement(
            _reactBootstrap.Row,
            null,
            _react2.default.createElement(
              _reactBootstrap.Col,
              { xs: 12, sm: 4, md: 3, lg: 3 },
              self.state.screenType == 'view' ? _react2.default.createElement(
                'span',
                null,
                _react2.default.createElement(
                  'label',
                  null,
                  _react2.default.createElement(
                    'span',
                    { style: { fontWeight: '500' } },
                    _react2.default.createElement(_translationNode2.default, { fontSize: '20px', label: 'employee.Employee.fields.religion' })
                  )
                ),
                _react2.default.createElement('br', null),
                _react2.default.createElement(
                  'label',
                  null,
                  getNameById(self.state.religions, Employee.religion) || '-'
                )
              ) : _react2.default.createElement(
                _SelectField2.default,
                { className: 'create-employee-text-field-cont',
                  floatingLabelStyle: {
                    color: '#696969',
                    fontSize: '20px',
                    'white-space': 'nowrap'

                  },
                  floatingLabelFixed: true,
                  dropDownMenuProps: {

                    targetOrigin: { horizontal: 'left', vertical: 'bottom' }
                  },
                  floatingLabelText: _react2.default.createElement(_translationNode2.default, { fontSize: '20px', label: 'employee.Employee.fields.religion' }),
                  errorText: fieldErrors['religion'],
                  value: Employee.religion,
                  onChange: function onChange(event, key, value) {
                    handleChange({ target: { value: value } }, 'religion', false, '');
                  }
                },
                self.state.religions && self.state.religions.map(function (v, i) {
                  return _react2.default.createElement(_MenuItem2.default, { value: v.id, key: i, primaryText: v.name });
                })
              )
            ),
            _react2.default.createElement(
              _reactBootstrap.Col,
              { xs: 12, sm: 4, md: 3, lg: 3 },
              self.state.screenType == 'view' ? _react2.default.createElement(
                'span',
                null,
                _react2.default.createElement(
                  'label',
                  null,
                  _react2.default.createElement(
                    'span',
                    { style: { fontWeight: '500' } },
                    _react2.default.createElement(_translationNode2.default, { fontSize: '20px', label: 'employee.Employee.fields.community' })
                  )
                ),
                _react2.default.createElement('br', null),
                _react2.default.createElement(
                  'label',
                  null,
                  getNameById(self.state.communities, Employee.community) || '-'
                )
              ) : _react2.default.createElement(
                _SelectField2.default,
                { className: 'create-employee-text-field-cont',
                  floatingLabelStyle: {
                    color: '#696969',
                    fontSize: '20px',
                    'white-space': 'nowrap'

                  },
                  floatingLabelFixed: true,
                  dropDownMenuProps: {

                    targetOrigin: { horizontal: 'left', vertical: 'bottom' }
                  },
                  floatingLabelText: _react2.default.createElement(_translationNode2.default, { fontSize: '20px', label: 'employee.Employee.fields.community' }),
                  errorText: fieldErrors['community'],
                  value: Employee.community,
                  onChange: function onChange(event, key, value) {
                    handleChange({ target: { value: value } }, 'community', false, '');
                  }
                },
                self.state.communities && self.state.communities.map(function (v, i) {
                  return _react2.default.createElement(_MenuItem2.default, { value: v.id, key: i, primaryText: v.name });
                })
              )
            ),
            _react2.default.createElement(
              _reactBootstrap.Col,
              { xs: 12, sm: 4, md: 3, lg: 3 },
              self.state.screenType == 'view' ? _react2.default.createElement(
                'span',
                null,
                _react2.default.createElement(
                  'label',
                  null,
                  _react2.default.createElement(
                    'span',
                    { style: { fontWeight: '500' } },
                    _react2.default.createElement(_translationNode2.default, { fontSize: '20px', label: 'employee.Employee.fields.category' })
                  )
                ),
                _react2.default.createElement('br', null),
                _react2.default.createElement(
                  'label',
                  null,
                  getNameById(self.state.categories, Employee.category) || '-'
                )
              ) : _react2.default.createElement(
                _SelectField2.default,
                { className: 'create-employee-text-field-cont',
                  floatingLabelStyle: {
                    color: '#696969',
                    fontSize: '20px',
                    'white-space': 'nowrap'

                  },
                  floatingLabelFixed: true,
                  dropDownMenuProps: {

                    targetOrigin: { horizontal: 'left', vertical: 'bottom' }
                  },
                  floatingLabelText: _react2.default.createElement(_translationNode2.default, { fontSize: '20px', label: 'employee.Employee.fields.category' }),
                  errorText: fieldErrors['category'],
                  value: Employee.category,
                  onChange: function onChange(event, key, value) {
                    handleChange({ target: { value: value } }, 'category', false, '');
                  }
                },
                self.state.categories && self.state.categories.map(function (v, i) {
                  return _react2.default.createElement(_MenuItem2.default, { value: v.id, key: i, primaryText: v.name });
                })
              )
            ),
            _react2.default.createElement(
              _reactBootstrap.Col,
              { xs: 12, sm: 4, md: 3, lg: 3 },
              self.state.screenType == 'view' ? _react2.default.createElement(
                'span',
                null,
                _react2.default.createElement(
                  'label',
                  null,
                  _react2.default.createElement(
                    'span',
                    { style: { fontWeight: '500' } },
                    _react2.default.createElement(_translationNode2.default, { fontSize: '15px', label: 'employee.Employee.fields.physicallyDisabled' })
                  )
                ),
                _react2.default.createElement('br', null),
                _react2.default.createElement(
                  'label',
                  null,
                  (0, _Common.translate)('employee.Employee.fields.physicallyDisabled') ? (0, _Common.translate)('employee.createPosition.groups.fields.outsourcepost.value1') : (0, _Common.translate)('employee.createPosition.groups.fields.outsourcepost.value2')
                )
              ) : _react2.default.createElement(
                'span',
                null,
                _react2.default.createElement(
                  'label',
                  { style: { fontSize: '15px', fontWeight: '500' } },
                  _react2.default.createElement(_translationNode2.default, { fontSize: '15px', label: 'employee.Employee.fields.physicallyDisabled' })
                ),
                _react2.default.createElement(
                  _RadioButton.RadioButtonGroup,
                  {
                    name: _react2.default.createElement(_translationNode2.default, { fontSize: '20px', label: 'employee.Employee.fields.physicallyDisabled' }),
                    valueSelected: Employee.physicallyDisabled,
                    onChange: function onChange(e, value) {
                      handleChange({ target: { value: value } }, 'physicallyDisabled', false, '');
                    }
                  },
                  _react2.default.createElement(_RadioButton.RadioButton, { className: 'radio-button-style', value: true, label: _react2.default.createElement(_translationNode2.default, { label: 'employee.createPosition.groups.fields.outsourcepost.value1' }) }),
                  _react2.default.createElement(_RadioButton.RadioButton, { className: 'radio-button-style', value: false, label: _react2.default.createElement(_translationNode2.default, { label: 'employee.createPosition.groups.fields.outsourcepost.value2 ' }) })
                )
              )
            )
          ),
          self.state.screenType == 'view' && _react2.default.createElement('br', null),
          _react2.default.createElement(
            _reactBootstrap.Row,
            null,
            _react2.default.createElement(
              _reactBootstrap.Col,
              { xs: 12, sm: 4, md: 3, lg: 3 },
              self.state.screenType == 'view' ? _react2.default.createElement(
                'span',
                null,
                _react2.default.createElement(
                  'label',
                  null,
                  _react2.default.createElement(_translationNode2.default, { fontSize: '15px', label: 'employee.Employee.fields.medicalReportProduced' })
                ),
                _react2.default.createElement('br', null),
                _react2.default.createElement(
                  'label',
                  null,
                  Employee.medicalReportProduced ? (0, _Common.translate)('employee.createPosition.groups.fields.outsourcepost.value1') : (0, _Common.translate)('employee.createPosition.groups.fields.outsourcepost.value2')
                )
              ) : _react2.default.createElement(
                'span',
                null,
                _react2.default.createElement(
                  'label',
                  { style: { fontSize: '15px', fontWeight: '500' } },
                  _react2.default.createElement(_translationNode2.default, { fontSize: '15px', label: 'employee.Employee.fields.medicalReportProduced' })
                ),
                _react2.default.createElement(
                  _RadioButton.RadioButtonGroup,
                  {
                    name: "medicalReportProduced",
                    valueSelected: Employee.medicalReportProduced,
                    onChange: function onChange(e, value) {
                      handleChange({ target: { value: value } }, 'medicalReportProduced', false, '');
                    }
                  },
                  _react2.default.createElement(_RadioButton.RadioButton, { className: 'radio-button-style', value: true, label: _react2.default.createElement(_translationNode2.default, { label: 'employee.createPosition.groups.fields.outsourcepost.value1' }) }),
                  _react2.default.createElement(_RadioButton.RadioButton, { className: 'radio-button-style', value: false, label: _react2.default.createElement(_translationNode2.default, { label: 'employee.createPosition.groups.fields.outsourcepost.value2' }) })
                )
              )
            ),
            _react2.default.createElement(
              _reactBootstrap.Col,
              { xs: 12, sm: 4, md: 3, lg: 3 },
              self.state.screenType == 'view' ? _react2.default.createElement(
                'span',
                null,
                _react2.default.createElement(
                  'label',
                  null,
                  _react2.default.createElement(_translationNode2.default, { fontSize: '20px', label: 'employee.Employee.fields.identification' })
                ),
                _react2.default.createElement('br', null),
                _react2.default.createElement(
                  'label',
                  null,
                  Employee.user ? Employee.user.identificationMark : '-'
                )
              ) : _react2.default.createElement(_TextField2.default, { className: 'create-employee-text-field-cont',
                floatingLabelStyle: {
                  color: '#696969',
                  fontSize: '20px',
                  'white-space': 'nowrap'

                },
                floatingLabelFixed: true,
                floatingLabelText: _react2.default.createElement(_translationNode2.default, { fontSize: '20px', label: 'employee.Employee.fields.identification' }),
                errorText: fieldErrors['user'] && fieldErrors['user']['identificationMark'],
                value: Employee.user ? Employee.user.identificationMark : '',
                onChange: function onChange(e) {
                  handleChangeNextLevel(e, 'user', 'identificationMark', false, '');
                }
              })
            ),
            _react2.default.createElement(
              _reactBootstrap.Col,
              { xs: 12, sm: 4, md: 3, lg: 3 },
              self.state.screenType == 'view' ? _react2.default.createElement(
                'span',
                null,
                _react2.default.createElement(
                  'label',
                  null,
                  _react2.default.createElement(_translationNode2.default, { fontSize: '20px', label: 'employee.Employee.fields.pan' })
                ),
                _react2.default.createElement('br', null),
                _react2.default.createElement(
                  'label',
                  null,
                  Employee.user ? Employee.user.pan : '-'
                )
              ) : _react2.default.createElement(_TextField2.default, { className: 'create-employee-text-field-cont',
                floatingLabelStyle: {
                  color: '#696969',
                  fontSize: '20px',
                  'white-space': 'nowrap'

                },
                floatingLabelFixed: true,
                floatingLabelText: _react2.default.createElement(_translationNode2.default, { fontSize: '20px', label: 'employee.Employee.fields.pan' }),
                hintText: 'DACPZ2154D',
                errorText: fieldErrors['user'] && fieldErrors['user']['pan'],
                value: Employee.user ? Employee.user.pan : '',
                onChange: function onChange(e) {
                  handleChangeNextLevel(e, 'user', 'pan', false, /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/);
                }
              })
            ),
            _react2.default.createElement(
              _reactBootstrap.Col,
              { xs: 12, sm: 4, md: 3, lg: 3 },
              self.state.screenType == 'view' ? _react2.default.createElement(
                'span',
                null,
                _react2.default.createElement(
                  'label',
                  null,
                  _react2.default.createElement(_translationNode2.default, { fontSize: '20px', label: 'employee.Employee.fields.passportNo' })
                ),
                _react2.default.createElement('br', null),
                _react2.default.createElement(
                  'label',
                  null,
                  Employee.passportNo || '-'
                )
              ) : _react2.default.createElement(_TextField2.default, { className: 'create-employee-text-field-cont',
                floatingLabelStyle: {
                  color: '#696969',
                  fontSize: '20px',
                  'white-space': 'nowrap'

                },
                floatingLabelFixed: true,
                floatingLabelText: _react2.default.createElement(_translationNode2.default, { fontSize: '20px', label: 'employee.Employee.fields.passportNo' }),
                errorText: fieldErrors['passportNo'],
                value: Employee.passportNo,
                onChange: function onChange(e) {
                  handleChange(e, 'passportNo', false, '');
                }
              })
            )
          ),
          self.state.screenType == 'view' && _react2.default.createElement('br', null),
          _react2.default.createElement(
            _reactBootstrap.Row,
            null,
            _react2.default.createElement(
              _reactBootstrap.Col,
              { xs: 12, sm: 4, md: 3, lg: 3 },
              self.state.screenType == 'view' ? _react2.default.createElement(
                'span',
                null,
                _react2.default.createElement(
                  'label',
                  null,
                  _react2.default.createElement(_translationNode2.default, { fontSize: '20px', label: 'employee.Employee.fields.gpfNo' })
                ),
                _react2.default.createElement('br', null),
                _react2.default.createElement(
                  'label',
                  null,
                  Employee.gpfNo || '-'
                )
              ) : _react2.default.createElement(_TextField2.default, { className: 'create-employee-text-field-cont',
                floatingLabelStyle: {
                  color: '#696969',
                  fontSize: '20px',
                  'white-space': 'nowrap'

                },
                floatingLabelFixed: true,
                floatingLabelText: _react2.default.createElement(_translationNode2.default, { fontSize: '20px', label: 'employee.Employee.fields.gpfNo' }),
                errorText: fieldErrors['gpfNo'],
                value: Employee.gpfNo,
                onChange: function onChange(e) {
                  handleChange(e, 'gpfNo', false, '');
                }
              })
            ),
            _react2.default.createElement(
              _reactBootstrap.Col,
              { xs: 12, sm: 4, md: 3, lg: 3 },
              self.state.screenType == 'view' ? _react2.default.createElement(
                'span',
                null,
                _react2.default.createElement(
                  'label',
                  null,
                  _react2.default.createElement(
                    'span',
                    { style: { fontWeight: '500' } },
                    _react2.default.createElement(_translationNode2.default, { label: 'employee.Employee.fields.User.aadhaarNumber', fontSize: '20px' })
                  )
                ),
                _react2.default.createElement('br', null),
                _react2.default.createElement(
                  'label',
                  null,
                  Employee.user ? Employee.user.aadhaarNumber : '-'
                )
              ) : _react2.default.createElement(_TextField2.default, { className: 'create-employee-text-field-cont',
                floatingLabelStyle: {
                  color: '#696969',
                  fontSize: '20px',
                  'white-space': 'nowrap'

                },
                floatingLabelFixed: true,
                maxLength: '12',
                floatingLabelText: _react2.default.createElement(_translationNode2.default, { fontSize: '20px', label: 'employee.Employee.fields.User.aadhaarNumber' }),
                errorText: fieldErrors['user'] && fieldErrors['user']['aadhaarNumber'],
                value: Employee.user ? Employee.user.aadhaarNumber : '',
                onChange: function onChange(e) {
                  if (e.target.value && !/^\d*$/g.test(e.target.value)) return;
                  handleChangeNextLevel(e, 'user', 'aadhaarNumber', false, /^\d{12}$/);
                }
              })
            ),
            _react2.default.createElement(
              _reactBootstrap.Col,
              { xs: 12, sm: 4, md: 3, lg: 3 },
              self.state.screenType == 'view' ? _react2.default.createElement(
                'span',
                null,
                _react2.default.createElement(
                  'label',
                  null,
                  _react2.default.createElement(_translationNode2.default, { fontSize: '20px', label: 'employee.Employee.fields.bank' })
                ),
                _react2.default.createElement('br', null),
                _react2.default.createElement(
                  'label',
                  null,
                  getNameById(self.state.banks, Employee.bank) || '-'
                )
              ) : _react2.default.createElement(
                _SelectField2.default,
                { className: 'create-employee-text-field-cont',
                  floatingLabelStyle: {
                    color: '#696969',
                    fontSize: '20px',
                    'white-space': 'nowrap'

                  },
                  floatingLabelFixed: true,
                  dropDownMenuProps: {

                    targetOrigin: { horizontal: 'left', vertical: 'bottom' }
                  },
                  floatingLabelText: _react2.default.createElement(_translationNode2.default, { fontSize: '20px', label: 'employee.Employee.fields.bank' }),
                  errorText: fieldErrors['bank'],
                  value: Employee.bank,
                  onChange: function onChange(event, key, value) {
                    self.loadBranches(value);
                    handleChange({ target: { value: value } }, 'bank', false, '');
                  }
                },
                self.state.banks && self.state.banks.map(function (v, i) {
                  return _react2.default.createElement(_MenuItem2.default, { value: v.id, key: i, primaryText: v.name });
                })
              )
            ),
            _react2.default.createElement(
              _reactBootstrap.Col,
              { xs: 12, sm: 4, md: 3, lg: 3 },
              self.state.screenType == 'view' ? _react2.default.createElement(
                'span',
                null,
                _react2.default.createElement(
                  'label',
                  null,
                  _react2.default.createElement(_translationNode2.default, { fontSize: '20px', label: 'employee.Employee.fields.bankBranch' })
                ),
                _react2.default.createElement('br', null),
                _react2.default.createElement(
                  'label',
                  null,
                  getNameById(self.state.bankBranches, Employee.bankBranch) || '-'
                )
              ) : _react2.default.createElement(
                _SelectField2.default,
                { className: 'create-employee-text-field-cont',
                  floatingLabelStyle: {
                    color: '#696969',
                    fontSize: '20px',
                    'white-space': 'nowrap'

                  },
                  floatingLabelFixed: true,
                  dropDownMenuProps: {

                    targetOrigin: { horizontal: 'left', vertical: 'bottom' }
                  },
                  floatingLabelText: _react2.default.createElement(_translationNode2.default, { fontSize: '20px', label: 'employee.Employee.fields.bankBranch' }),
                  errorText: fieldErrors['bankBranch'],
                  value: Employee.bankBranch,
                  onChange: function onChange(event, key, value) {
                    handleChange({ target: { value: value } }, 'bankBranch', false, '');
                  }
                },
                self.state.bankBranches && self.state.bankBranches.map(function (v, i) {
                  return _react2.default.createElement(_MenuItem2.default, { value: v.id, key: i, primaryText: v.name });
                })
              )
            )
          ),
          self.state.screenType == 'view' && _react2.default.createElement('br', null),
          _react2.default.createElement(
            _reactBootstrap.Row,
            null,
            _react2.default.createElement(
              _reactBootstrap.Col,
              { xs: 12, sm: 4, md: 3, lg: 3 },
              self.state.screenType == 'view' ? _react2.default.createElement(
                'span',
                null,
                _react2.default.createElement(
                  'label',
                  null,
                  _react2.default.createElement(
                    'span',
                    { style: { fontWeight: '500' } },
                    _react2.default.createElement(_translationNode2.default, { fontSize: '20px', label: 'employee.Employee.fields.bankAccount' })
                  )
                ),
                _react2.default.createElement('br', null),
                _react2.default.createElement(
                  'label',
                  null,
                  Employee.bankAccount
                )
              ) : _react2.default.createElement(_TextField2.default, { className: 'create-employee-text-field-cont',
                floatingLabelStyle: {
                  color: '#696969',
                  fontSize: '20px',
                  'white-space': 'nowrap'

                },
                floatingLabelFixed: true,
                floatingLabelText: _react2.default.createElement(_translationNode2.default, { fontSize: '20px', label: 'employee.Employee.fields.bankAccount' }),
                errorText: fieldErrors['bankAccount'],
                value: Employee.bankAccount,
                onChange: function onChange(e) {
                  if (e.target.value && !/^\d*$/g.test(e.target.value)) return;
                  handleChange(e, 'bankAccount', false, '');
                }
              })
            ),
            _react2.default.createElement(
              _reactBootstrap.Col,
              { xs: 12, sm: 4, md: 3, lg: 3 },
              self.state.screenType == 'view' ? _react2.default.createElement(
                'span',
                null,
                _react2.default.createElement(
                  'label',
                  null,
                  _react2.default.createElement(
                    'span',
                    { style: { fontWeight: '500' } },
                    _react2.default.createElement(_translationNode2.default, { label: 'employee.Employee.fields.User.mobileNumber', fontSize: '20px' })
                  )
                ),
                _react2.default.createElement('br', null),
                _react2.default.createElement(
                  'label',
                  null,
                  Employee.user ? Employee.user.altContactNumber : '-'
                )
              ) : _react2.default.createElement(_TextField2.default, { className: 'create-employee-text-field-cont',
                floatingLabelStyle: {
                  color: '#696969',
                  fontSize: '20px',
                  'white-space': 'nowrap'

                },
                floatingLabelFixed: true,
                maxLength: '10',
                floatingLabelText: _react2.default.createElement(_translationNode2.default, { fontSize: '20px', label: 'employee.Employee.fields.User.mobileNumber' }),
                errorText: fieldErrors['user'] && fieldErrors['user']['altContactNumber'],
                value: Employee.user ? Employee.user.altContactNumber : '',
                onChange: function onChange(e) {
                  if (e.target.value && !/^\d*$/g.test(e.target.value)) return;
                  handleChangeNextLevel(e, 'user', 'altContactNumber', false, /^\d{10}$/);
                }
              })
            ),
            _react2.default.createElement(_reactBootstrap.Col, { xs: 12, sm: 4, md: 3, lg: 3 }),
            _react2.default.createElement(_reactBootstrap.Col, { xs: 12, sm: 4, md: 3, lg: 3 })
          ),
          self.state.screenType == 'view' && _react2.default.createElement('br', null),
          _react2.default.createElement(
            _reactBootstrap.Row,
            null,
            _react2.default.createElement(
              _reactBootstrap.Col,
              { xs: 12, sm: 4, md: 3, lg: 3 },
              self.state.screenType == 'view' ? _react2.default.createElement(
                'span',
                null,
                _react2.default.createElement(
                  'label',
                  null,
                  _react2.default.createElement(_translationNode2.default, { fontSize: '20px', label: 'employee.Employee.fields.permanentAddress' })
                ),
                _react2.default.createElement('br', null),
                _react2.default.createElement(
                  'label',
                  null,
                  Employee.user ? Employee.user.permanentAddress : '-'
                )
              ) : _react2.default.createElement(_TextField2.default, { className: 'create-employee-text-field-cont',
                floatingLabelStyle: {
                  color: '#696969',
                  fontSize: '20px',
                  'white-space': 'nowrap'

                },
                floatingLabelFixed: true,
                floatingLabelText: _react2.default.createElement(_translationNode2.default, { fontSize: '20px', label: 'employee.Employee.fields.permanentAddress' }),
                errorText: fieldErrors['user'] && fieldErrors['user']['permanentAddress'],
                value: Employee.user ? Employee.user.permanentAddress : '',
                onChange: function onChange(e) {
                  handleChangeNextLevel(e, 'user', 'permanentAddress', false, '');
                }
              })
            ),
            _react2.default.createElement(
              _reactBootstrap.Col,
              { xs: 12, sm: 4, md: 3, lg: 3 },
              self.state.screenType == 'view' ? _react2.default.createElement(
                'span',
                null,
                _react2.default.createElement(
                  'label',
                  null,
                  _react2.default.createElement(_translationNode2.default, { fontSize: '20px', label: 'employee.Employee.fields.city' })
                ),
                _react2.default.createElement('br', null),
                _react2.default.createElement(
                  'label',
                  null,
                  Employee.user ? Employee.user.permanentCity : '-'
                )
              ) : _react2.default.createElement(_TextField2.default, { className: 'create-employee-text-field-cont',
                floatingLabelStyle: {
                  color: '#696969',
                  fontSize: '20px',
                  'white-space': 'nowrap'

                },
                floatingLabelFixed: true,
                floatingLabelText: _react2.default.createElement(_translationNode2.default, { fontSize: '20px', label: 'employee.Employee.fields.city' }),
                errorText: fieldErrors['user'] && fieldErrors['user']['permanentCity'],
                value: Employee.user ? Employee.user.permanentCity : '',
                onChange: function onChange(e) {
                  handleChangeNextLevel(e, 'user', 'permanentCity', false, '');
                }
              })
            ),
            _react2.default.createElement(
              _reactBootstrap.Col,
              { xs: 12, sm: 4, md: 3, lg: 3 },
              self.state.screenType == 'view' ? _react2.default.createElement(
                'span',
                null,
                _react2.default.createElement(
                  'label',
                  null,
                  _react2.default.createElement(_translationNode2.default, { fontSize: '20px', label: 'employee.Employee.fields.parmanentPinNumber' })
                ),
                _react2.default.createElement('br', null),
                _react2.default.createElement(
                  'label',
                  null,
                  Employee.user ? Employee.user.permanentPinCode : '-'
                )
              ) : _react2.default.createElement(_TextField2.default, { className: 'create-employee-text-field-cont',
                floatingLabelStyle: {
                  color: '#696969',
                  fontSize: '20px',
                  'white-space': 'nowrap'

                },
                floatingLabelFixed: true,
                floatingLabelText: _react2.default.createElement(_translationNode2.default, { fontSize: '20px', label: 'employee.Employee.fields.parmanentPinNumber' }),
                errorText: fieldErrors['user'] && fieldErrors['user']['permanentPinCode'],
                value: Employee.user ? Employee.user.permanentPinCode : '',
                onChange: function onChange(e) {
                  if (e.target.value && !/^\d*$/g.test(e.target.value)) return;
                  handleChangeNextLevel(e, 'user', 'permanentPinCode', false, '');
                }
              })
            ),
            _react2.default.createElement(_reactBootstrap.Col, { xs: 12, sm: 4, md: 3, lg: 3 })
          ),
          self.state.screenType == 'view' && _react2.default.createElement('br', null),
          _react2.default.createElement(
            _reactBootstrap.Row,
            null,
            _react2.default.createElement(
              _reactBootstrap.Col,
              { xs: 12, sm: 4, md: 3, lg: 3 },
              self.state.screenType == 'view' ? _react2.default.createElement(
                'span',
                null,
                _react2.default.createElement(
                  'label',
                  null,
                  _react2.default.createElement(_translationNode2.default, { fontSize: '20px', label: 'employee.Employee.fields.correspondenceAddress' })
                ),
                _react2.default.createElement('br', null),
                _react2.default.createElement(
                  'label',
                  null,
                  Employee.user ? Employee.user.correspondenceAddress : '-'
                )
              ) : _react2.default.createElement(_TextField2.default, { className: 'create-employee-text-field-cont',
                floatingLabelStyle: {
                  color: '#696969',
                  fontSize: '20px',
                  'white-space': 'nowrap'

                },
                floatingLabelFixed: true,
                floatingLabelText: _react2.default.createElement(_translationNode2.default, { fontSize: '20px', label: 'employee.Employee.fields.correspondenceAddress' }),
                errorText: fieldErrors['user'] && fieldErrors['user']['correspondenceAddress'],
                value: Employee.user ? Employee.user.correspondenceAddress : '',
                onChange: function onChange(e) {
                  handleChangeNextLevel(e, 'user', 'correspondenceAddress', false, '');
                }
              })
            ),
            _react2.default.createElement(
              _reactBootstrap.Col,
              { xs: 12, sm: 4, md: 3, lg: 3 },
              self.state.screenType == 'view' ? _react2.default.createElement(
                'span',
                null,
                _react2.default.createElement(
                  'label',
                  null,
                  _react2.default.createElement(_translationNode2.default, { fontSize: '20px', label: 'employee.Employee.fields.city' })
                ),
                _react2.default.createElement('br', null),
                _react2.default.createElement(
                  'label',
                  null,
                  Employee.user ? Employee.user.correspondenceCity : '-'
                )
              ) : _react2.default.createElement(_TextField2.default, { className: 'create-employee-text-field-cont',
                floatingLabelStyle: {
                  color: '#696969',
                  fontSize: '20px',
                  'white-space': 'nowrap'

                },
                floatingLabelFixed: true,
                floatingLabelText: _react2.default.createElement(_translationNode2.default, { fontSize: '20px', label: 'employee.Employee.fields.city' }),
                errorText: fieldErrors['user.correspondenceCity'],
                value: Employee.user ? Employee.user.correspondenceCity : '',
                onChange: function onChange(e) {
                  handleChangeNextLevel(e, 'user', 'correspondenceCity', false, '');
                }
              })
            ),
            _react2.default.createElement(
              _reactBootstrap.Col,
              { xs: 12, sm: 4, md: 3, lg: 3 },
              self.state.screenType == 'view' ? _react2.default.createElement(
                'span',
                null,
                _react2.default.createElement(
                  'label',
                  null,
                  _react2.default.createElement(_translationNode2.default, { fontSize: '20px', label: 'employee.Employee.fields.correspondencePinNumber' })
                ),
                _react2.default.createElement('br', null),
                _react2.default.createElement(
                  'label',
                  null,
                  Employee.user ? Employee.user.correspondencePinCode : '-'
                )
              ) : _react2.default.createElement(_TextField2.default, { className: 'create-employee-text-field-cont',
                floatingLabelStyle: {
                  color: '#696969',
                  fontSize: '20px',
                  'white-space': 'nowrap'

                },
                floatingLabelFixed: true,
                floatingLabelText: _react2.default.createElement(_translationNode2.default, { fontSize: '20px', label: 'employee.Employee.fields.correspondencePinNumber' }),
                errorText: fieldErrors['user'] && fieldErrors['user']['correspondencePinCode'],
                value: Employee.user ? Employee.user.correspondencePinCode : '',
                onChange: function onChange(e) {
                  if (e.target.value && !/^\d*$/g.test(e.target.value)) return;
                  handleChangeNextLevel(e, 'user', 'correspondencePinCode', false, '');
                }
              })
            ),
            _react2.default.createElement(_reactBootstrap.Col, { xs: 12, sm: 4, md: 3, lg: 3 })
          ),
          self.state.screenType == 'view' && _react2.default.createElement('br', null),
          _react2.default.createElement(
            _reactBootstrap.Row,
            null,
            _react2.default.createElement(
              _reactBootstrap.Col,
              { xs: 12, sm: 4, md: 3, lg: 3 },
              self.state.screenType == 'view' ? _react2.default.createElement(
                'span',
                null,
                _react2.default.createElement(
                  'label',
                  null,
                  _react2.default.createElement(_translationNode2.default, { fontSize: '20px', label: 'employee.Employee.fields.languagesKnown' })
                ),
                _react2.default.createElement('br', null),
                _react2.default.createElement(
                  'label',
                  null,
                  Employee.languagesKnown || '-'
                )
              ) : _react2.default.createElement(
                _SelectField2.default,
                { className: 'create-employee-text-field-cont',
                  floatingLabelStyle: {
                    color: '#696969',
                    fontSize: '20px',
                    'white-space': 'nowrap'

                  },
                  floatingLabelFixed: true,
                  dropDownMenuProps: {

                    targetOrigin: { horizontal: 'left', vertical: 'bottom' }
                  },
                  floatingLabelText: _react2.default.createElement(_translationNode2.default, { fontSize: '20px', label: 'employee.Employee.fields.languagesKnown' }),
                  errorText: fieldErrors['languagesKnown'],
                  multiple: true,
                  value: Employee.languagesKnown,
                  onChange: function onChange(event, key, value) {
                    handleChange({ target: { value: value } }, 'languagesKnown', false, '');
                  }
                },
                self.state.languages && self.state.languages.map(function (v, i) {
                  return _react2.default.createElement(_MenuItem2.default, { value: v.id, key: i, primaryText: v.name });
                })
              )
            ),
            _react2.default.createElement(
              _reactBootstrap.Col,
              { xs: 12, sm: 4, md: 3, lg: 3 },
              self.state.screenType == 'view' ? _react2.default.createElement(
                'span',
                null,
                _react2.default.createElement(
                  'label',
                  null,
                  _react2.default.createElement(_translationNode2.default, { fontSize: '20px', label: 'employee.Employee.fields.recruitmentMode' })
                ),
                _react2.default.createElement('br', null),
                _react2.default.createElement(
                  'label',
                  null,
                  Employee.recruitmentMode || '-'
                )
              ) : _react2.default.createElement(
                _SelectField2.default,
                { className: 'create-employee-text-field-cont',
                  floatingLabelStyle: {
                    color: '#696969',
                    fontSize: '20px',
                    'white-space': 'nowrap'

                  },
                  floatingLabelFixed: true,
                  dropDownMenuProps: {

                    targetOrigin: { horizontal: 'left', vertical: 'bottom' }
                  },
                  floatingLabelText: _react2.default.createElement(_translationNode2.default, { fontSize: '20px', label: 'employee.Employee.fields.recruitmentMode' }),
                  errorText: fieldErrors['recruitmentMode'],
                  value: Employee.recruitmentMode,
                  onChange: function onChange(event, key, value) {
                    handleChange({ target: { value: value } }, 'recruitmentMode', false, '');
                  }
                },
                self.state.recruitmentmodes && self.state.recruitmentmodes.map(function (v, i) {
                  return _react2.default.createElement(_MenuItem2.default, { value: v.id, key: i, primaryText: v.name });
                })
              )
            ),
            _react2.default.createElement(
              _reactBootstrap.Col,
              { xs: 12, sm: 4, md: 3, lg: 3 },
              self.state.screenType == 'view' ? _react2.default.createElement(
                'span',
                null,
                _react2.default.createElement(
                  'label',
                  null,
                  _react2.default.createElement(_translationNode2.default, { fontSize: '20px', label: 'employee.Employee.fields.recruitmentType' })
                ),
                _react2.default.createElement('br', null),
                _react2.default.createElement(
                  'label',
                  null,
                  Employee.recruitmentType || '-'
                )
              ) : _react2.default.createElement(
                _SelectField2.default,
                { className: 'create-employee-text-field-cont',
                  floatingLabelStyle: {
                    color: '#696969',
                    fontSize: '20px',
                    'white-space': 'nowrap'

                  },
                  floatingLabelFixed: true,
                  dropDownMenuProps: {

                    targetOrigin: { horizontal: 'left', vertical: 'bottom' }
                  },
                  floatingLabelText: _react2.default.createElement(_translationNode2.default, { fontSize: '20px', label: 'employee.Employee.fields.recruitmentType' }),
                  errorText: fieldErrors['recruitmentType'],
                  value: Employee.recruitmentType,
                  onChange: function onChange(event, key, value) {
                    handleChange({ target: { value: value } }, 'recruitmentType', false, '');
                  }
                },
                self.state.recruitmenttypes && self.state.recruitmenttypes.map(function (v, i) {
                  return _react2.default.createElement(_MenuItem2.default, { value: v.id, key: i, primaryText: v.name });
                })
              )
            ),
            _react2.default.createElement(
              _reactBootstrap.Col,
              { xs: 12, sm: 4, md: 3, lg: 3 },
              self.state.screenType == 'view' ? _react2.default.createElement(
                'span',
                null,
                _react2.default.createElement(
                  'label',
                  null,
                  _react2.default.createElement(_translationNode2.default, { fontSize: '20px', label: 'employee.Employee.fields.recruitmentQuota' })
                ),
                _react2.default.createElement('br', null),
                _react2.default.createElement(
                  'label',
                  null,
                  Employee.recruitmentQuota || '-'
                )
              ) : _react2.default.createElement(
                _SelectField2.default,
                { className: 'create-employee-text-field-cont',
                  floatingLabelStyle: {
                    color: '#696969',
                    fontSize: '20px',
                    'white-space': 'nowrap'

                  },
                  floatingLabelFixed: true,
                  dropDownMenuProps: {

                    targetOrigin: { horizontal: 'left', vertical: 'bottom' }
                  },
                  floatingLabelText: _react2.default.createElement(_translationNode2.default, { fontSize: '20px', label: 'employee.Employee.fields.recruitmentQuota' }),
                  errorText: fieldErrors['recruitmentQuota'],
                  value: Employee.recruitmentQuota,
                  onChange: function onChange(event, key, value) {
                    handleChange({ target: { value: value } }, 'recruitmentQuota', false, '');
                  }
                },
                self.state.recruitmentquotas && self.state.recruitmentquotas.map(function (v, i) {
                  return _react2.default.createElement(_MenuItem2.default, { value: v.id, key: i, primaryText: v.name });
                })
              )
            )
          ),
          self.state.screenType == 'view' && _react2.default.createElement('br', null),
          _react2.default.createElement(
            _reactBootstrap.Row,
            null,
            _react2.default.createElement(
              _reactBootstrap.Col,
              { xs: 12, sm: 4, md: 3, lg: 3 },
              self.state.screenType == 'view' ? _react2.default.createElement(
                'span',
                null,
                _react2.default.createElement(
                  'label',
                  null,
                  _react2.default.createElement(_translationNode2.default, { fontSize: '20px', label: 'employee.Employee.fields.dateOfAppointment' })
                ),
                _react2.default.createElement('br', null),
                _react2.default.createElement(
                  'label',
                  null,
                  Employee.dateOfAppointment
                )
              ) : _react2.default.createElement(_TextField2.default, { className: 'create-employee-text-field-cont',
                floatingLabelStyle: {
                  color: '#696969',
                  fontSize: '20px',
                  'white-space': 'nowrap'

                },
                floatingLabelFixed: true,
                hintText: '21/11/1993',
                floatingLabelText: _react2.default.createElement(
                  'span',
                  null,
                  _react2.default.createElement(_translationNode2.default, { fontSize: '20px', label: 'employee.Employee.fields.dateOfAppointment' }),
                  _react2.default.createElement(
                    'span',
                    { style: { color: '#FF0000' } },
                    ' *'
                  )
                ),
                errorText: fieldErrors['dateOfAppointment'],
                value: Employee.dateOfAppointment,
                onChange: function onChange(e) {
                  handleChange(e, 'dateOfAppointment', true, datePat);
                }
              })
            ),
            _react2.default.createElement(
              _reactBootstrap.Col,
              { xs: 12, sm: 4, md: 3, lg: 3 },
              self.state.screenType == 'view' ? _react2.default.createElement(
                'span',
                null,
                _react2.default.createElement(
                  'label',
                  null,
                  _react2.default.createElement(_translationNode2.default, { fontSize: '20px', label: 'employee.Employee.fields.dateOfJoining' })
                ),
                _react2.default.createElement('br', null),
                _react2.default.createElement(
                  'label',
                  null,
                  Employee.dateOfJoining || '-'
                )
              ) : _react2.default.createElement(_TextField2.default, { className: 'create-employee-text-field-cont',
                floatingLabelStyle: {
                  color: '#696969',
                  fontSize: '20px',
                  'white-space': 'nowrap'

                },
                floatingLabelFixed: true,
                hintText: '21/11/1993',
                floatingLabelText: _react2.default.createElement(_translationNode2.default, { fontSize: '20px', label: 'employee.Employee.fields.dateOfJoining' }),
                errorText: fieldErrors['dateOfJoining'],
                value: Employee.dateOfJoining,
                onChange: function onChange(e) {
                  handleChange(e, 'dateOfJoining', false, datePat);
                }
              })
            ),
            _react2.default.createElement(
              _reactBootstrap.Col,
              { xs: 12, sm: 4, md: 3, lg: 3 },
              self.state.screenType == 'view' ? _react2.default.createElement(
                'span',
                null,
                _react2.default.createElement(
                  'label',
                  null,
                  _react2.default.createElement(_translationNode2.default, { fontSize: '20px', label: 'employee.Employee.fields.retirementAge' })
                ),
                _react2.default.createElement('br', null),
                _react2.default.createElement(
                  'label',
                  null,
                  Employee.retirementAge || '-'
                )
              ) : _react2.default.createElement(_TextField2.default, { className: 'create-employee-text-field-cont',
                floatingLabelStyle: {
                  color: '#696969',
                  fontSize: '20px',
                  'white-space': 'nowrap'

                },
                floatingLabelFixed: true,
                type: 'number',
                floatingLabelText: _react2.default.createElement(_translationNode2.default, { fontSize: '20px', label: 'employee.Employee.fields.retirementAge' }),
                errorText: fieldErrors['retirementAge'],
                value: Employee.retirementAge,
                onChange: function onChange(e) {
                  handleChange(e, 'retirementAge', false, '');
                }
              })
            ),
            _react2.default.createElement(
              _reactBootstrap.Col,
              { xs: 12, sm: 4, md: 3, lg: 3 },
              self.state.screenType == 'view' ? _react2.default.createElement(
                'span',
                null,
                _react2.default.createElement(
                  'label',
                  null,
                  _react2.default.createElement(_translationNode2.default, { fontSize: '20px', label: 'employee.Employee.fields.dateOfRetirement' })
                ),
                _react2.default.createElement('br', null),
                _react2.default.createElement(
                  'label',
                  null,
                  Employee.dateOfRetirement || '-'
                )
              ) : _react2.default.createElement(_TextField2.default, { className: 'create-employee-text-field-cont',
                floatingLabelStyle: {
                  color: '#696969',
                  fontSize: '20px',
                  'white-space': 'nowrap'

                },
                floatingLabelFixed: true,
                hintText: '21/11/1993',
                floatingLabelText: _react2.default.createElement(_translationNode2.default, { fontSize: '20px', label: 'employee.Employee.fields.dateOfRetirement' }),
                errorText: fieldErrors['dateOfRetirement'],
                value: Employee.dateOfRetirement,
                onChange: function onChange(e) {
                  handleChange(e, 'dateOfRetirement', false, datePat);
                }
              })
            )
          ),
          self.state.screenType == 'view' && _react2.default.createElement('br', null),
          _react2.default.createElement(
            _reactBootstrap.Row,
            null,
            _react2.default.createElement(
              _reactBootstrap.Col,
              { xs: 12, sm: 4, md: 3, lg: 3 },
              self.state.screenType == 'view' ? _react2.default.createElement(
                'span',
                null,
                _react2.default.createElement(
                  'label',
                  null,
                  _react2.default.createElement(_translationNode2.default, { fontSize: '20px', label: 'employee.Employee.fields.dateOfTermination' })
                ),
                _react2.default.createElement('br', null),
                _react2.default.createElement(
                  'label',
                  null,
                  Employee.dateOfTermination || '-'
                )
              ) : _react2.default.createElement(_TextField2.default, { className: 'create-employee-text-field-cont',
                floatingLabelStyle: {
                  color: '#696969',
                  fontSize: '20px',
                  'white-space': 'nowrap'

                },
                floatingLabelFixed: true,
                hintText: '21/11/1993',
                floatingLabelText: _react2.default.createElement(_translationNode2.default, { fontSize: '20px', label: 'employee.Employee.fields.dateOfTermination' }),
                errorText: fieldErrors['dateOfTermination'],
                value: Employee.dateOfTermination,
                onChange: function onChange(e) {
                  handleChange(e, 'dateOfTermination', false, datePat);
                }
              })
            ),
            _react2.default.createElement(
              _reactBootstrap.Col,
              { xs: 12, sm: 4, md: 3, lg: 3 },
              self.state.screenType == 'view' ? _react2.default.createElement(
                'span',
                null,
                _react2.default.createElement(
                  'label',
                  null,
                  _react2.default.createElement(_translationNode2.default, { fontSize: '20px', label: 'employee.Employee.fields.dateOfResignation' })
                ),
                _react2.default.createElement('br', null),
                _react2.default.createElement(
                  'label',
                  null,
                  Employee.dateOfResignation || '-'
                )
              ) : _react2.default.createElement(_TextField2.default, { className: 'create-employee-text-field-cont',
                floatingLabelStyle: {
                  color: '#696969',
                  fontSize: '20px',
                  'white-space': 'nowrap'

                },
                floatingLabelFixed: true,
                hintText: '21/11/1993',
                floatingLabelText: _react2.default.createElement(_translationNode2.default, { fontSize: '20px', label: 'employee.Employee.fields.dateOfResignation' }),
                errorText: fieldErrors['dateOfResignation'],
                value: Employee.dateOfResignation,
                onChange: function onChange(e) {
                  handleChange(e, 'dateOfResignation', false, datePat);
                }
              })
            ),
            self.state.screenType != 'view' ? _react2.default.createElement(
              _reactBootstrap.Col,
              { xs: 12, sm: 4, md: 3, lg: 3 },
              _react2.default.createElement(_translationNode2.default, { fontSize: '15px', label: 'employee.Employee.fields.EmployeePhoto' }),
              _react2.default.createElement('input', { type: 'file' })
            ) : '',
            self.state.screenType != 'view' ? _react2.default.createElement(
              _reactBootstrap.Col,
              { xs: 12, sm: 4, md: 3, lg: 3 },
              _react2.default.createElement(
                'label',
                { style: { marginTop: '20px', fontWeight: "500" } },
                _react2.default.createElement(_translationNode2.default, { fontSize: '15px', label: 'employee.Employee.fields.EmployeeSignature' })
              ),
              _react2.default.createElement('input', { type: 'file' })
            ) : ''
          ),
          self.state.screenType == 'view' && _react2.default.createElement('br', null),
          _react2.default.createElement(
            _reactBootstrap.Row,
            null,
            self.state.screenType != 'view' ? _react2.default.createElement(
              _reactBootstrap.Col,
              { xs: 12, sm: 4, md: 3, lg: 3 },
              _react2.default.createElement(
                'label',
                { style: { marginTop: '20px', fontWeight: "500" } },
                _react2.default.createElement(_translationNode2.default, { fontSize: '15px', label: 'employee.Employee.fields.OtherAttachments' })
              ),
              _react2.default.createElement('input', { type: 'file', multiple: true })
            ) : ''
          )
        )
      );
    }
  }, {
    key: 'renderAssignment',
    value: function renderAssignment() {
      var _props2 = this.props,
          isFormValid = _props2.isFormValid,
          Employee = _props2.Employee,
          fieldErrors = _props2.fieldErrors,
          handleChange = _props2.handleChange,
          handleChangeNextLevel = _props2.handleChangeNextLevel;

      var self = this;
      var renderAssignmentBody = function renderAssignmentBody() {
        return self.props.Employee.assignments && self.props.Employee.assignments.length ? self.props.Employee.assignments.map(function (val, i) {
          return _react2.default.createElement(
            'tr',
            { key: i },
            _react2.default.createElement(
              'td',
              null,
              val.fromDate
            ),
            _react2.default.createElement(
              'td',
              null,
              val.toDate
            ),
            _react2.default.createElement(
              'td',
              null,
              getNameById(self.state.departments, val.department)
            ),
            _react2.default.createElement(
              'td',
              null,
              getNameById(self.state.designations, val.designation)
            ),
            _react2.default.createElement(
              'td',
              null,
              getNameById(self.state.allPosition, val.position)
            ),
            _react2.default.createElement(
              'td',
              null,
              val.isPrimary ? (0, _Common.translate)('employee.createPosition.groups.fields.outsourcepost.value1') : (0, _Common.translate)('employee.createPosition.groups.fields.outsourcepost.value2')
            ),
            _react2.default.createElement(
              'td',
              null,
              getNameById(self.state.funds, val.fund)
            ),
            _react2.default.createElement(
              'td',
              null,
              getNameById(self.state.functions, val.function)
            ),
            _react2.default.createElement(
              'td',
              null,
              getNameById(self.state.functionaries, val.functionary)
            ),
            _react2.default.createElement(
              'td',
              null,
              getNameById(self.state.grades, val.grade)
            ),
            _react2.default.createElement(
              'td',
              null,
              _react2.default.createElement(
                'ol',
                null,
                val.hod && val.hod.length ? val.hod.map(function (v, i) {
                  return _react2.default.createElement(
                    'li',
                    null,
                    getNameById(self.state.departments, v.department)
                  );
                }) : ''
              )
            ),
            _react2.default.createElement(
              'td',
              null,
              val.govtOrderNumber
            ),
            _react2.default.createElement(
              'td',
              null,
              val.documents && val.documents.length
            ),
            _react2.default.createElement(
              'td',
              null,
              self.state.screenType != 'view' && _react2.default.createElement('span', {
                className: 'glyphicon glyphicon-pencil',
                onClick: function onClick() {
                  self.editModalOpen(i, 'assignments');
                }
              }),
              '\xA0\xA0',
              self.state.screenType != 'view' && !val.fromServer && _react2.default.createElement('span', {
                className: 'glyphicon glyphicon-trash',
                onClick: function onClick() {
                  self.delModalOpen(i, 'assignments');
                }
              })
            )
          );
        }) : '';
      };
      return _react2.default.createElement(
        _Card.Card,
        { className: 'uiCard create-employee-card' },
        _react2.default.createElement(
          _Card.CardText,
          null,
          _react2.default.createElement(
            _reactBootstrap.Table,
            { bordered: true, responsive: true, className: 'table-striped' },
            _react2.default.createElement(
              'thead',
              null,
              _react2.default.createElement(
                'th',
                { style: headerStyle },
                _react2.default.createElement(_translationNode2.default, { fontSize: '12px', labelStyle: labelStyle, label: 'employee.Assignment.fields.fromDate' })
              ),
              _react2.default.createElement(
                'th',
                { style: headerStyle },
                _react2.default.createElement(_translationNode2.default, { fontSize: '12px', labelStyle: labelStyle, label: 'employee.Assignment.fields.toDate' })
              ),
              _react2.default.createElement(
                'th',
                { style: headerStyle },
                _react2.default.createElement(_translationNode2.default, { containerStyle: containerStyle, fontSize: '12px', labelStyle: labelStyle, label: 'employee.Assignment.fields.department' })
              ),
              _react2.default.createElement(
                'th',
                { style: headerStyle },
                _react2.default.createElement(_translationNode2.default, { containerStyle: containerStyle, fontSize: '12px', labelStyle: labelStyle, label: 'employee.Assignment.fields.designation' })
              ),
              _react2.default.createElement(
                'th',
                { style: headerStyle },
                _react2.default.createElement(_translationNode2.default, { containerStyle: containerStyle, fontSize: '12px', labelStyle: labelStyle, label: 'employee.Assignment.fields.position' })
              ),
              _react2.default.createElement(
                'th',
                { style: headerStyle },
                _react2.default.createElement(_translationNode2.default, { fontSize: '12px', labelStyle: labelStyle, label: 'employee.Assignment.fields.primary' })
              ),
              _react2.default.createElement(
                'th',
                { style: headerStyle },
                _react2.default.createElement(_translationNode2.default, { containerStyle: containerStyle, fontSize: '12px', labelStyle: labelStyle, label: 'employee.Assignment.fields.fund' })
              ),
              _react2.default.createElement(
                'th',
                { style: headerStyle },
                _react2.default.createElement(_translationNode2.default, { containerStyle: containerStyle, fontSize: '12px', labelStyle: labelStyle, label: 'employee.Assignment.fields.function' })
              ),
              _react2.default.createElement(
                'th',
                { style: headerStyle },
                _react2.default.createElement(_translationNode2.default, { containerStyle: containerStyle, fontSize: '12px', labelStyle: labelStyle, label: 'employee.Assignment.fields.functionary' })
              ),
              _react2.default.createElement(
                'th',
                { style: headerStyle },
                _react2.default.createElement(_translationNode2.default, { containerStyle: containerStyle, fontSize: '12px', labelStyle: labelStyle, label: 'employee.Assignment.fields.grade' })
              ),
              _react2.default.createElement(
                'th',
                { style: headerStyle },
                _react2.default.createElement(_translationNode2.default, { containerStyle: containerStyle, fontSize: '12px', labelStyle: labelStyle, label: 'employee.Assignment.fields.hod' })
              ),
              _react2.default.createElement(
                'th',
                { style: headerStyle },
                _react2.default.createElement(_translationNode2.default, { fontSize: '12px', labelStyle: labelStyle, label: 'employee.Assignment.fields.govtOrderNumber' })
              ),
              _react2.default.createElement(
                'th',
                { style: headerStyle },
                _react2.default.createElement(_translationNode2.default, { containerStyle: containerStyle, fontSize: '12px', labelStyle: labelStyle, label: 'employee.Assignment.fields.documents' })
              ),
              _react2.default.createElement(
                'th',
                { style: headerStyle },
                _react2.default.createElement(_translationNode2.default, { containerStyle: containerStyle, fontSize: '12px', labelStyle: labelStyle, label: 'reports.common.action' })
              )
            ),
            _react2.default.createElement(
              'tbody',
              null,
              renderAssignmentBody()
            )
          ),
          _react2.default.createElement(
            _reactBootstrap.Row,
            null,
            _react2.default.createElement(
              _reactBootstrap.Col,
              { xsOffset: 8, mdOffset: 10, xs: 4, md: 2, style: { textAlign: 'right' } },
              self.state.screenType != 'view' ? _react2.default.createElement(
                _FloatingActionButton2.default,
                {
                  style: { marginRight: 0 },
                  mini: true,
                  onClick: function onClick() {
                    self.setModalOpen('assignment');
                  }
                },
                _react2.default.createElement('span', { className: 'glyphicon glyphicon-plus' })
              ) : ''
            )
          )
        )
      );
    }
  }, {
    key: 'renderJurisdiction',
    value: function renderJurisdiction() {
      var _props3 = this.props,
          isFormValid = _props3.isFormValid,
          Employee = _props3.Employee,
          fieldErrors = _props3.fieldErrors,
          handleChange = _props3.handleChange,
          handleChangeNextLevel = _props3.handleChangeNextLevel;

      var self = this;
      var renderJurisdictionBody = function renderJurisdictionBody() {
        return self.props.Employee.jurisdictions && self.props.Employee.jurisdictions.length ? self.props.Employee.jurisdictions.map(function (val, i) {
          return getBoundaryValues(self.state.allBoundariesList, val, self, i);
        }) : '';
      };
      return _react2.default.createElement(
        _Card.Card,
        { className: 'uiCard create-employee-card' },
        _react2.default.createElement(
          _Card.CardText,
          null,
          _react2.default.createElement(
            _reactBootstrap.Table,
            { bordered: true, responsive: true, className: 'table-striped' },
            _react2.default.createElement(
              'thead',
              null,
              _react2.default.createElement(
                'th',
                { style: headerStyle },
                _react2.default.createElement(_translationNode2.default, { fontSize: '12px', label: 'employee.jurisdiction.fields.boundaryType', labelStyle: labelStyle })
              ),
              _react2.default.createElement(
                'th',
                { style: headerStyle },
                _react2.default.createElement(_translationNode2.default, { fontSize: '12px', label: 'employee.jurisdiction.fields.boundary', labelStyle: labelStyle })
              ),
              _react2.default.createElement(
                'th',
                { style: headerStyle },
                _react2.default.createElement(_translationNode2.default, { fontSize: '12px', label: 'reports.common.action', labelStyle: labelStyle })
              )
            ),
            _react2.default.createElement(
              'tbody',
              null,
              renderJurisdictionBody()
            )
          ),
          _react2.default.createElement(
            _reactBootstrap.Row,
            null,
            _react2.default.createElement(
              _reactBootstrap.Col,
              { xsOffset: 8, mdOffset: 10, xs: 4, md: 2, style: { textAlign: 'right' } },
              self.state.screenType != 'view' ? _react2.default.createElement(
                _FloatingActionButton2.default,
                {
                  style: { marginRight: 0 },
                  mini: true,
                  onClick: function onClick() {
                    self.setModalOpen('jurisdiction');
                  }
                },
                _react2.default.createElement('span', { className: 'glyphicon glyphicon-plus' })
              ) : ''
            )
          )
        )
      );
    }
  }, {
    key: 'renderService',
    value: function renderService() {
      var _props4 = this.props,
          isFormValid = _props4.isFormValid,
          Employee = _props4.Employee,
          fieldErrors = _props4.fieldErrors,
          handleChange = _props4.handleChange,
          handleChangeNextLevel = _props4.handleChangeNextLevel;

      var self = this;
      var renderServiceBody = function renderServiceBody(type) {
        switch (type) {
          case 'service':
            return self.props.Employee.serviceHistory && self.props.Employee.serviceHistory.length ? self.props.Employee.serviceHistory.map(function (val, i) {
              return _react2.default.createElement(
                'tr',
                { key: i },
                _react2.default.createElement(
                  'td',
                  null,
                  val.serviceInfo
                ),
                _react2.default.createElement(
                  'td',
                  null,
                  val.serviceFrom
                ),
                _react2.default.createElement(
                  'td',
                  null,
                  val.remarks
                ),
                _react2.default.createElement(
                  'td',
                  null,
                  val.orderNo
                ),
                _react2.default.createElement(
                  'td',
                  null,
                  val.documents && val.documents.length
                ),
                _react2.default.createElement(
                  'td',
                  null,
                  self.state.screenType != 'view' && _react2.default.createElement('span', {
                    className: 'glyphicon glyphicon-pencil',
                    onClick: function onClick() {
                      self.editModalOpen(i, 'serviceDet');
                    }
                  }),
                  '\xA0\xA0',
                  self.state.screenType != 'view' && _react2.default.createElement('span', {
                    className: 'glyphicon glyphicon-trash',
                    onClick: function onClick() {
                      self.delModalOpen(i, 'serviceDet');
                    }
                  })
                )
              );
            }) : '';
            break;
          case 'probation':
            return self.props.Employee.probation && self.props.Employee.probation.length ? self.props.Employee.probation.map(function (val, i) {
              return _react2.default.createElement(
                'tr',
                { key: i },
                _react2.default.createElement(
                  'td',
                  null,
                  getNameById(self.state.designations, val.designation)
                ),
                _react2.default.createElement(
                  'td',
                  null,
                  val.declaredOn
                ),
                _react2.default.createElement(
                  'td',
                  null,
                  val.orderNo
                ),
                _react2.default.createElement(
                  'td',
                  null,
                  val.orderDate
                ),
                _react2.default.createElement(
                  'td',
                  null,
                  val.remarks
                ),
                _react2.default.createElement(
                  'td',
                  null,
                  val.documents && val.documents.length
                ),
                _react2.default.createElement(
                  'td',
                  null,
                  self.state.screenType != 'view' && _react2.default.createElement('span', {
                    className: 'glyphicon glyphicon-pencil',
                    onClick: function onClick() {
                      self.editModalOpen(i, 'probation');
                    }
                  }),
                  '\xA0\xA0',
                  self.state.screenType != 'view' && _react2.default.createElement('span', {
                    className: 'glyphicon glyphicon-trash',
                    onClick: function onClick() {
                      self.delModalOpen(i, 'probation');
                    }
                  })
                )
              );
            }) : '';
            break;
          case 'regularization':
            return self.props.Employee.regularisation && self.props.Employee.regularisation.length ? self.props.Employee.regularisation.map(function (val, i) {
              return _react2.default.createElement(
                'tr',
                { key: i },
                _react2.default.createElement(
                  'td',
                  null,
                  val.designation
                ),
                _react2.default.createElement(
                  'td',
                  null,
                  val.declaredOn
                ),
                _react2.default.createElement(
                  'td',
                  null,
                  val.orderNo
                ),
                _react2.default.createElement(
                  'td',
                  null,
                  val.orderDate
                ),
                _react2.default.createElement(
                  'td',
                  null,
                  val.remarks
                ),
                _react2.default.createElement(
                  'td',
                  null,
                  val.documents && val.documents.length
                ),
                _react2.default.createElement(
                  'td',
                  null,
                  self.state.screenType != 'view' && _react2.default.createElement('span', {
                    className: 'glyphicon glyphicon-pencil',
                    onClick: function onClick() {
                      self.editModalOpen(i, 'regular');
                    }
                  }),
                  '\xA0\xA0',
                  self.state.screenType != 'view' && _react2.default.createElement('span', {
                    className: 'glyphicon glyphicon-trash',
                    onClick: function onClick() {
                      self.delModalOpen(i, 'regular');
                    }
                  })
                )
              );
            }) : '';
            break;
        }
      };

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          _Card.Card,
          { className: 'uiCard create-employee-card' },
          _react2.default.createElement(_Card.CardTitle, { title: _react2.default.createElement(_translationNode2.default, { fontSize: '24px', label: 'employee.ServiceHistory.title' }) }),
          _react2.default.createElement(
            _Card.CardText,
            null,
            _react2.default.createElement(
              _reactBootstrap.Table,
              { bordered: true, responsive: true, className: 'table-striped' },
              _react2.default.createElement(
                'thead',
                null,
                _react2.default.createElement(
                  'th',
                  { style: headerStyle },
                  _react2.default.createElement(_translationNode2.default, { fontSize: '12px', labelStyle: labelStyle, label: 'employee.ServiceHistory.fields.ServiceEntryDescription' })
                ),
                _react2.default.createElement(
                  'th',
                  { style: headerStyle },
                  _react2.default.createElement(_translationNode2.default, { fontSize: '12px', labelStyle: labelStyle, label: 'employee.ServiceHistory.fields.date' })
                ),
                _react2.default.createElement(
                  'th',
                  { style: headerStyle },
                  _react2.default.createElement(_translationNode2.default, { fontSize: '12px', labelStyle: labelStyle, label: 'employee.ServiceHistory.fields.remarks' })
                ),
                _react2.default.createElement(
                  'th',
                  { style: headerStyle },
                  _react2.default.createElement(_translationNode2.default, { fontSize: '12px', labelStyle: labelStyle, label: 'employee.ServiceHistory.fields.orderNo' })
                ),
                _react2.default.createElement(
                  'th',
                  { style: headerStyle },
                  _react2.default.createElement(_translationNode2.default, { fontSize: '12px', labelStyle: labelStyle, label: 'employee.ServiceHistory.fields.documents' })
                ),
                _react2.default.createElement(
                  'th',
                  { style: headerStyle },
                  _react2.default.createElement(_translationNode2.default, { fontSize: '12px', labelStyle: labelStyle, label: 'reports.common.action' })
                )
              ),
              _react2.default.createElement(
                'tbody',
                null,
                renderServiceBody('service')
              )
            ),
            _react2.default.createElement(
              _reactBootstrap.Row,
              null,
              _react2.default.createElement(
                _reactBootstrap.Col,
                { xsOffset: 8, mdOffset: 10, xs: 4, md: 2, style: { textAlign: 'right' } },
                self.state.screenType != 'view' ? _react2.default.createElement(
                  _FloatingActionButton2.default,
                  {
                    style: { marginRight: 0 },
                    mini: true,
                    onClick: function onClick() {
                      self.setModalOpen('serviceDet');
                    }
                  },
                  _react2.default.createElement('span', { className: 'glyphicon glyphicon-plus' })
                ) : ''
              )
            )
          )
        ),
        _react2.default.createElement(
          _Card.Card,
          { className: 'uiCard create-employee-card' },
          _react2.default.createElement(_Card.CardTitle, { title: _react2.default.createElement(_translationNode2.default, { fontSize: '12px', label: 'employee.Probation.title' }) }),
          _react2.default.createElement(
            _Card.CardText,
            null,
            _react2.default.createElement(
              _reactBootstrap.Table,
              { bordered: true, responsive: true, className: 'table-striped' },
              _react2.default.createElement(
                'thead',
                null,
                _react2.default.createElement(
                  'th',
                  { style: headerStyle },
                  _react2.default.createElement(_translationNode2.default, { fontSize: '12px', labelStyle: labelStyle, label: 'employee.Assignment.fields.designation' })
                ),
                _react2.default.createElement(
                  'th',
                  { style: headerStyle },
                  _react2.default.createElement(_translationNode2.default, { fontSize: '12px', labelStyle: labelStyle, label: 'employee.Probation.fields.declaredOn' })
                ),
                _react2.default.createElement(
                  'th',
                  { style: headerStyle },
                  _react2.default.createElement(_translationNode2.default, { fontSize: '12px', labelStyle: labelStyle, label: 'employee.Probation.fields.orderNo' })
                ),
                _react2.default.createElement(
                  'th',
                  { style: headerStyle },
                  _react2.default.createElement(_translationNode2.default, { fontSize: '12px', labelStyle: labelStyle, label: 'employee.Probation.fields.orderDate' })
                ),
                _react2.default.createElement(
                  'th',
                  { style: headerStyle },
                  _react2.default.createElement(_translationNode2.default, { fontSize: '12px', labelStyle: labelStyle, label: 'employee.Probation.fields.remarks' })
                ),
                _react2.default.createElement(
                  'th',
                  { style: headerStyle },
                  _react2.default.createElement(_translationNode2.default, { fontSize: '12px', labelStyle: labelStyle, label: 'employee.Probation.fields.documents' })
                ),
                _react2.default.createElement(
                  'th',
                  { style: headerStyle },
                  _react2.default.createElement(_translationNode2.default, { fontSize: '12px', labelStyle: labelStyle, label: 'reports.common.action' })
                )
              ),
              _react2.default.createElement(
                'tbody',
                null,
                renderServiceBody('probation')
              )
            ),
            _react2.default.createElement(
              _reactBootstrap.Row,
              null,
              _react2.default.createElement(
                _reactBootstrap.Col,
                { xsOffset: 8, mdOffset: 10, xs: 4, md: 2, style: { textAlign: 'right' } },
                self.state.screenType != 'view' ? _react2.default.createElement(
                  _FloatingActionButton2.default,
                  {
                    style: { marginRight: 0 },
                    mini: true,
                    onClick: function onClick() {
                      self.setModalOpen('probation');
                    }
                  },
                  _react2.default.createElement('span', { className: 'glyphicon glyphicon-plus' })
                ) : ''
              )
            )
          )
        ),
        _react2.default.createElement(
          _Card.Card,
          { className: 'uiCard create-employee-card' },
          _react2.default.createElement(_Card.CardTitle, { title: _react2.default.createElement(_translationNode2.default, { fontSize: '24px', label: 'employee.Regularisation.title' }) }),
          _react2.default.createElement(
            _Card.CardText,
            null,
            _react2.default.createElement(
              _reactBootstrap.Table,
              { bordered: true, responsive: true, className: 'table-striped' },
              _react2.default.createElement(
                'thead',
                null,
                _react2.default.createElement(
                  'th',
                  { style: headerStyle },
                  _react2.default.createElement(_translationNode2.default, { labelStyle: labelStyle, fontSize: '12px', label: 'employee.Assignment.fields.designation' })
                ),
                _react2.default.createElement(
                  'th',
                  { style: headerStyle },
                  _react2.default.createElement(_translationNode2.default, { labelStyle: labelStyle, fontSize: '12px', label: 'employee.Regularisation.fields.declaredOn' })
                ),
                _react2.default.createElement(
                  'th',
                  { style: headerStyle },
                  _react2.default.createElement(_translationNode2.default, { labelStyle: labelStyle, fontSize: '12px', label: 'employee.Probation.fields.orderNo' })
                ),
                _react2.default.createElement(
                  'th',
                  { style: headerStyle },
                  _react2.default.createElement(_translationNode2.default, { labelStyle: labelStyle, fontSize: '12px', label: 'employee.Probation.fields.orderDate' })
                ),
                _react2.default.createElement(
                  'th',
                  { style: headerStyle },
                  _react2.default.createElement(_translationNode2.default, { labelStyle: labelStyle, fontSize: '12px', label: 'employee.Probation.fields.remarks' })
                ),
                _react2.default.createElement(
                  'th',
                  { style: headerStyle },
                  _react2.default.createElement(_translationNode2.default, { labelStyle: labelStyle, fontSize: '12px', label: 'employee.Probation.fields.documents' })
                ),
                _react2.default.createElement(
                  'th',
                  { style: headerStyle },
                  _react2.default.createElement(_translationNode2.default, { labelStyle: labelStyle, fontSize: '12px', label: 'reports.common.action' })
                )
              ),
              _react2.default.createElement(
                'tbody',
                null,
                renderServiceBody('regularization')
              )
            ),
            _react2.default.createElement(
              _reactBootstrap.Row,
              null,
              _react2.default.createElement(
                _reactBootstrap.Col,
                { xsOffset: 8, mdOffset: 10, xs: 4, md: 2, style: { textAlign: 'right' } },
                self.state.screenType != 'view' ? _react2.default.createElement(
                  _FloatingActionButton2.default,
                  {
                    style: { marginRight: 0 },
                    mini: true,
                    onClick: function onClick() {
                      self.setModalOpen('regular');
                    }
                  },
                  _react2.default.createElement('span', { className: 'glyphicon glyphicon-plus' })
                ) : ''
              )
            )
          )
        )
      );
    }
  }, {
    key: 'renderOtherDetails',
    value: function renderOtherDetails() {
      var _props5 = this.props,
          isFormValid = _props5.isFormValid,
          Employee = _props5.Employee,
          fieldErrors = _props5.fieldErrors,
          handleChange = _props5.handleChange,
          handleChangeNextLevel = _props5.handleChangeNextLevel;

      var self = this;
      var renderOtherDetailsBody = function renderOtherDetailsBody(type) {
        switch (type) {
          case 'edu':
            return self.props.Employee.education && self.props.Employee.education.length ? self.props.Employee.education.map(function (val, i) {
              return _react2.default.createElement(
                'tr',
                { key: i },
                _react2.default.createElement(
                  'td',
                  null,
                  val.qualification
                ),
                _react2.default.createElement(
                  'td',
                  null,
                  val.majorSubject
                ),
                _react2.default.createElement(
                  'td',
                  null,
                  val.yearOfPassing
                ),
                _react2.default.createElement(
                  'td',
                  null,
                  val.university
                ),
                _react2.default.createElement(
                  'td',
                  null,
                  val.documents && val.documents.length
                ),
                _react2.default.createElement(
                  'td',
                  null,
                  self.state.screenType != 'view' && _react2.default.createElement('span', {
                    className: 'glyphicon glyphicon-pencil',
                    onClick: function onClick() {
                      self.editModalOpen(i, 'edu');
                    }
                  }),
                  '\xA0\xA0',
                  self.state.screenType != 'view' && _react2.default.createElement('span', {
                    className: 'glyphicon glyphicon-trash',
                    onClick: function onClick() {
                      self.delModalOpen(i, 'edu');
                    }
                  })
                )
              );
            }) : '';
            break;
          case 'tech':
            return self.props.Employee.technical && self.props.Employee.technical.length ? self.props.Employee.technical.map(function (val, i) {
              return _react2.default.createElement(
                'tr',
                { key: i },
                _react2.default.createElement(
                  'td',
                  null,
                  val.skill
                ),
                _react2.default.createElement(
                  'td',
                  null,
                  val.grade
                ),
                _react2.default.createElement(
                  'td',
                  null,
                  val.yearOfPassing
                ),
                _react2.default.createElement(
                  'td',
                  null,
                  val.remarks
                ),
                _react2.default.createElement(
                  'td',
                  null,
                  val.documents && val.documents.length
                ),
                _react2.default.createElement(
                  'td',
                  null,
                  self.state.screenType != 'view' && _react2.default.createElement('span', {
                    className: 'glyphicon glyphicon-pencil',
                    onClick: function onClick() {
                      self.editModalOpen(i, 'tech');
                    }
                  }),
                  '\xA0\xA0',
                  self.state.screenType != 'view' && _react2.default.createElement('span', {
                    className: 'glyphicon glyphicon-trash',
                    onClick: function onClick() {
                      self.delModalOpen(i, 'tech');
                    }
                  })
                )
              );
            }) : '';
            break;
          case 'dept':
            return self.props.Employee.test && self.props.Employee.test.length ? self.props.Employee.test.map(function (val, i) {
              return _react2.default.createElement(
                'tr',
                { key: i },
                _react2.default.createElement(
                  'td',
                  null,
                  val.test
                ),
                _react2.default.createElement(
                  'td',
                  null,
                  val.yearOfPassing
                ),
                _react2.default.createElement(
                  'td',
                  null,
                  val.remarks
                ),
                _react2.default.createElement(
                  'td',
                  null,
                  val.documents && val.documents.length
                ),
                _react2.default.createElement(
                  'td',
                  null,
                  self.state.screenType != 'view' && _react2.default.createElement('span', {
                    className: 'glyphicon glyphicon-pencil',
                    onClick: function onClick() {
                      self.editModalOpen(i, 'dept');
                    }
                  }),
                  '\xA0\xA0',
                  self.state.screenType != 'view' && _react2.default.createElement('span', {
                    className: 'glyphicon glyphicon-trash',
                    onClick: function onClick() {
                      self.delModalOpen(i, 'dept');
                    }
                  })
                )
              );
            }) : '';
            break;
        }
      };

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          _Card.Card,
          { className: 'uiCard create-employee-card' },
          _react2.default.createElement(_Card.CardTitle, { title: _react2.default.createElement(_translationNode2.default, { fontSize: '24px', label: 'employee.EducationalQualification.title' }) }),
          _react2.default.createElement(
            _Card.CardText,
            null,
            _react2.default.createElement(
              _reactBootstrap.Table,
              { bordered: true, responsive: true, className: 'table-striped' },
              _react2.default.createElement(
                'thead',
                null,
                _react2.default.createElement(
                  'th',
                  { style: headerStyle },
                  _react2.default.createElement(_translationNode2.default, { fontSize: '12px', labelStyle: labelStyle, label: 'employee.EducationalQualification.fields.qualification' })
                ),
                _react2.default.createElement(
                  'th',
                  { style: headerStyle },
                  _react2.default.createElement(_translationNode2.default, { fontSize: '12px', labelStyle: labelStyle, label: 'employee.EducationalQualification.fields.majorSubject' })
                ),
                _react2.default.createElement(
                  'th',
                  { style: headerStyle },
                  _react2.default.createElement(_translationNode2.default, { fontSize: '12px', labelStyle: labelStyle, label: 'employee.TechnicalQualification.fields.yearOfPassing' })
                ),
                _react2.default.createElement(
                  'th',
                  { style: headerStyle },
                  _react2.default.createElement(_translationNode2.default, { fontSize: '12px', labelStyle: labelStyle, label: 'employee.EducationalQualification.fields.university' })
                ),
                _react2.default.createElement(
                  'th',
                  { style: headerStyle },
                  _react2.default.createElement(_translationNode2.default, { fontSize: '12px', labelStyle: labelStyle, label: 'employee.EducationalQualification.fields.documents' })
                ),
                _react2.default.createElement(
                  'th',
                  { style: headerStyle },
                  _react2.default.createElement(_translationNode2.default, { fontSize: '12px', labelStyle: labelStyle, label: 'reports.common.action' })
                )
              ),
              _react2.default.createElement(
                'tbody',
                null,
                renderOtherDetailsBody('edu')
              )
            ),
            _react2.default.createElement(
              _reactBootstrap.Row,
              null,
              _react2.default.createElement(
                _reactBootstrap.Col,
                { xsOffset: 8, mdOffset: 10, xs: 4, md: 2, style: { textAlign: 'right' } },
                self.state.screenType != 'view' ? _react2.default.createElement(
                  _FloatingActionButton2.default,
                  {
                    style: { marginRight: 0 },
                    mini: true,
                    onClick: function onClick() {
                      self.setModalOpen('edu');
                    }
                  },
                  _react2.default.createElement('span', { className: 'glyphicon glyphicon-plus' })
                ) : ''
              )
            )
          )
        ),
        _react2.default.createElement(
          _Card.Card,
          { className: 'uiCard create-employee-card' },
          _react2.default.createElement(_Card.CardTitle, { title: _react2.default.createElement(_translationNode2.default, { fontSize: '24px', label: 'employee.TechnicalQualification.title' }) }),
          _react2.default.createElement(
            _Card.CardText,
            null,
            _react2.default.createElement(
              _reactBootstrap.Table,
              { bordered: true, responsive: true, className: 'table-striped' },
              _react2.default.createElement(
                'thead',
                null,
                _react2.default.createElement(
                  'th',
                  { style: headerStyle },
                  _react2.default.createElement(_translationNode2.default, { fontSize: '12px', labelStyle: labelStyle, label: 'employee.TechnicalQualification.fields.skill' })
                ),
                _react2.default.createElement(
                  'th',
                  { style: headerStyle },
                  _react2.default.createElement(_translationNode2.default, { fontSize: '12px', labelStyle: labelStyle, label: 'employee.TechnicalQualification.fields.grade' })
                ),
                _react2.default.createElement(
                  'th',
                  { style: headerStyle },
                  _react2.default.createElement(_translationNode2.default, { fontSize: '12px', labelStyle: labelStyle, label: 'employee.TechnicalQualification.fields.yearOfPassing' })
                ),
                _react2.default.createElement(
                  'th',
                  { style: headerStyle },
                  _react2.default.createElement(_translationNode2.default, { fontSize: '12px', labelStyle: labelStyle, label: 'employee.TechnicalQualification.fields.remarks' })
                ),
                _react2.default.createElement(
                  'th',
                  { style: headerStyle },
                  _react2.default.createElement(_translationNode2.default, { fontSize: '12px', labelStyle: labelStyle, label: 'employee.EducationalQualification.fields.documents' })
                ),
                _react2.default.createElement(
                  'th',
                  { style: headerStyle },
                  _react2.default.createElement(_translationNode2.default, { fontSize: '12px', labelStyle: labelStyle, label: 'reports.common.action' })
                )
              ),
              _react2.default.createElement(
                'tbody',
                null,
                renderOtherDetailsBody('tech')
              )
            ),
            _react2.default.createElement(
              _reactBootstrap.Row,
              null,
              _react2.default.createElement(
                _reactBootstrap.Col,
                { xsOffset: 8, mdOffset: 10, xs: 4, md: 2, style: { textAlign: 'right' } },
                self.state.screenType != 'view' ? _react2.default.createElement(
                  _FloatingActionButton2.default,
                  {
                    style: { marginRight: 0 },
                    mini: true,
                    onClick: function onClick() {
                      self.setModalOpen('tech');
                    }
                  },
                  _react2.default.createElement('span', { className: 'glyphicon glyphicon-plus' })
                ) : ''
              )
            )
          )
        ),
        _react2.default.createElement(
          _Card.Card,
          { className: 'uiCard create-employee-card' },
          _react2.default.createElement(_Card.CardTitle, { title: _react2.default.createElement(_translationNode2.default, { fontSize: '24px', label: 'employee.DepartmentalTest.title' }) }),
          _react2.default.createElement(
            _Card.CardText,
            null,
            _react2.default.createElement(
              _reactBootstrap.Table,
              { bordered: true, responsive: true, className: 'table-striped' },
              _react2.default.createElement(
                'thead',
                null,
                _react2.default.createElement(
                  'th',
                  { style: headerStyle },
                  _react2.default.createElement(_translationNode2.default, { fontSize: '12px', labelStyle: labelStyle, label: 'employee.DepartmentalTest.fields.test' })
                ),
                _react2.default.createElement(
                  'th',
                  { style: headerStyle },
                  _react2.default.createElement(_translationNode2.default, { fontSize: '12px', labelStyle: labelStyle, label: 'employee.TechnicalQualification.fields.yearOfPassing' }),
                  'n'
                ),
                _react2.default.createElement(
                  'th',
                  { style: headerStyle },
                  _react2.default.createElement(_translationNode2.default, { fontSize: '12px', labelStyle: labelStyle, label: 'employee.TechnicalQualification.fields.remarks' })
                ),
                _react2.default.createElement(
                  'th',
                  { style: headerStyle },
                  _react2.default.createElement(_translationNode2.default, { fontSize: '12px', labelStyle: labelStyle, label: 'employee.EducationalQualification.fields.documents' })
                ),
                _react2.default.createElement(
                  'th',
                  { style: headerStyle },
                  _react2.default.createElement(_translationNode2.default, { fontSize: '12px', labelStyle: labelStyle, label: 'reports.common.action' })
                )
              ),
              _react2.default.createElement(
                'tbody',
                null,
                renderOtherDetailsBody('dept')
              )
            ),
            _react2.default.createElement(
              _reactBootstrap.Row,
              null,
              _react2.default.createElement(
                _reactBootstrap.Col,
                { xsOffset: 8, mdOffset: 10, xs: 4, md: 2, style: { textAlign: 'right' } },
                self.state.screenType != 'view' ? _react2.default.createElement(
                  _FloatingActionButton2.default,
                  {
                    style: { marginRight: 0 },
                    mini: true,
                    onClick: function onClick() {
                      self.setModalOpen('dept');
                    }
                  },
                  _react2.default.createElement('span', { className: 'glyphicon glyphicon-plus' })
                ) : ''
              )
            )
          )
        )
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var self = this;
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'form',
          {
            onSubmit: function onSubmit(e) {
              self.createOrUpdate(e);
            }
          },
          _react2.default.createElement(
            _Tabs.Tabs,
            null,
            _react2.default.createElement(
              _Tabs.Tab,
              { label: _react2.default.createElement(_translationNode2.default, { labelStyle: labelStyle, label: 'employee.Employee.title' }), buttonStyle: { color: "#fff" } },
              _react2.default.createElement(
                'div',
                null,
                self.renderEmployee()
              )
            ),
            _react2.default.createElement(
              _Tabs.Tab,
              { label: _react2.default.createElement(_translationNode2.default, { labelStyle: labelStyle, label: 'employee.Assignment.title' }), buttonStyle: { color: "#fff" } },
              _react2.default.createElement(
                'div',
                null,
                self.renderAssignment()
              )
            ),
            _react2.default.createElement(
              _Tabs.Tab,
              { label: _react2.default.createElement(_translationNode2.default, { labelStyle: labelStyle, label: 'employee.Jurisdictions.title' }), buttonStyle: { color: "#fff" } },
              _react2.default.createElement(
                'div',
                null,
                self.renderJurisdiction()
              )
            ),
            _react2.default.createElement(
              _Tabs.Tab,
              { label: _react2.default.createElement(_translationNode2.default, { labelStyle: labelStyle, label: 'employee.service.title' }), buttonStyle: { color: "#fff" } },
              _react2.default.createElement(
                'div',
                null,
                self.renderService()
              )
            ),
            _react2.default.createElement(
              _Tabs.Tab,
              { label: _react2.default.createElement(_translationNode2.default, { labelStyle: labelStyle, label: 'employee.other.title' }), buttonStyle: { color: "#fff" } },
              _react2.default.createElement(
                'div',
                null,
                self.renderOtherDetails()
              )
            )
          ),
          _react2.default.createElement('br', null),
          _react2.default.createElement(
            'div',
            { style: { textAlign: 'center' } },
            self.state.screenType != 'view' ? _react2.default.createElement(_RaisedButton2.default, { type: 'submit', label: (0, _Common.translate)('ui.framework.submit'), primary: true, disabled: !self.props.isFormValid })
            // <div className="responsive-action-button-cont">
            //   <Button
            //     type="submit"
            //     className="responsive-action-button"
            //     primary={true}
            //     label={<Label buttonLabel={true} label="SUBMIT" />}
            //     fullWidth={true}
            //     disabled={!self.props.isFormValid}
            //     onClick={this.handleComplaintReassigned}
            //   />
            // </div>
            : ''
          )
        ),
        _react2.default.createElement(
          _Dialog2.default,
          {
            title: self.getModalTitle(),
            actions: [_react2.default.createElement(_FlatButton2.default, { label: (0, _Common.translate)('employee.Cancel.Button'), primary: true, onClick: self.handleClose }), _react2.default.createElement(_FlatButton2.default, {
              label: (0, _Common.translate)('employee.addedit.Button'),
              primary: true,
              keyboardFocused: true,
              disabled: self.state.isModalInvalid,
              onClick: self.submitModalData
            })],
            modal: false,
            open: self.state.open,
            onRequestClose: self.handleClose,
            autoScrollBodyContent: true
          },
          self.renderContent()
        )
      );
    }
  }]);
  return Employee;
}(_react.Component);

var mapStateToProps = function mapStateToProps(state) {
  return {
    Employee: state.formtemp.form,
    fieldErrors: state.formtemp.fieldErrors,
    isFormValid: state.formtemp.isFormValid
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    setForm: function setForm(data, isUpdate, codeAuto, unameAuto) {
      var requiredList = ['name', 'code', 'employeeType', 'dateOfAppointment', 'employeeStatus', 'maritalStatus', 'userName', 'mobileNumber', 'active', 'dob', 'gender'];
      if (codeAuto) requiredList.splice(requiredList.indexOf('code'), 1);
      if (unameAuto) requiredList.splice(requiredList.indexOf('userName'), 1);

      dispatch({
        type: 'SET_FORM',
        data: data,
        isFormValid: isUpdate ? true : false,
        fieldErrors: {},
        validationData: {
          required: {
            current: isUpdate ? Object.assign([], requiredList) : ['active'],
            required: Object.assign([], requiredList)
          },
          pattern: {
            current: [],
            required: []
          }
        }
      });
    },

    resetForm: function resetForm() {
      dispatch({ type: 'RESET_FORM' });
    },

    handleChange: function handleChange(e, property, isRequired, pattern) {
      dispatch({
        type: 'HANDLE_CHANGE',
        property: property,
        value: e.target.value,
        isRequired: isRequired,
        pattern: pattern
      });
    },

    handleChangeNextLevel: function handleChangeNextLevel(e, property, propertyOne, isRequired, pattern) {
      dispatch({
        type: 'HANDLE_CHANGE_NEXT_ONE',
        property: property,
        propertyOne: propertyOne,
        value: e.target.value,
        isRequired: isRequired,
        pattern: pattern
      });
    },

    setLoadingStatus: function setLoadingStatus(loadingStatus) {
      dispatch({ type: 'SET_LOADING_STATUS', loadingStatus: loadingStatus });
    },

    toggleDailogAndSetText: function toggleDailogAndSetText(dailogState, msg) {
      dispatch({ type: 'TOGGLE_DAILOG_AND_SET_TEXT', dailogState: dailogState, msg: msg });
    },

    toggleSnackbarAndSetText: function toggleSnackbarAndSetText(snackbarState, toastMsg) {
      dispatch({ type: 'TOGGLE_SNACKBAR_AND_SET_TEXT', snackbarState: snackbarState, toastMsg: toastMsg });
    },
    setRoute: function setRoute(route) {
      return dispatch({ type: 'SET_ROUTE', route: route });
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Employee);