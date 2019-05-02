"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.paymentSuccessFooter = exports.paymentFailureFooter = exports.approvalSuccessFooter = exports.applicationSuccessFooter = exports.gotoHomeFooter = exports.getRedirectionURL = undefined;

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _html2canvas = require("html2canvas");

var _html2canvas2 = _interopRequireDefault(_html2canvas);

var _jspdf = require("jspdf");

var _jspdf2 = _interopRequireDefault(_jspdf);

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _utils2 = require("../../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import generateReceipt from "../../utils/receiptPdf";
var getRedirectionURL = exports.getRedirectionURL = function getRedirectionURL() {
  var redirectionURL = (0, _utils2.ifUserRoleExists)("CITIZEN") ? "/fire-noc-citizen/home" : "/inbox";
  return redirectionURL;
};

// export const generatePdfAndDownload = (
//   state,
//   dispatch,
//   action,
//   applicationNumber,
//   tenant
// ) => {
//   dispatch(
//     toggleSnackbar(true, "Preparing confirmation form, please wait...", "info")
//   );
//   var iframe = document.createElement("iframe");
//   iframe.src =
//     window.origin +
//     `/fire-noc/search-preview?applicationNumber=${applicationNumber}&tenantId=${tenant}`;
//   var hasIframeLoaded = false,
//     hasEstimateLoaded = false;
//   iframe.onload = function(e) {
//     hasIframeLoaded = true;
//     if (hasEstimateLoaded) {
//       downloadConfirmationForm();
//     }
//   };
//   window.document.addEventListener("estimateLoaded", handleEvent, false);
//   function handleEvent(e) {
//     if (e.detail && iframe.contentDocument) {
//       hasEstimateLoaded = true;
//       if (hasIframeLoaded) {
//         downloadConfirmationForm();
//       }
//     }
//   }
//   function downloadConfirmationForm() {
//     let target = iframe.contentDocument.querySelector(
//       "#material-ui-NOCReviewDetails"
//     );
//     html2canvas(target).then(function(canvas) {
//       document.querySelector("#custom-atoms-iframeForPdf").removeChild(iframe);
//       var data = canvas.toDataURL("image/jpeg", 1);
//       var imgWidth = 200;
//       var pageHeight = 295;
//       var imgHeight = (canvas.height * imgWidth) / canvas.width;
//       var heightLeft = imgHeight;
//       var doc = new jsPDF("p", "mm");
//       var position = 0;

//       doc.addImage(data, "PNG", 5, 5 + position, imgWidth, imgHeight);
//       heightLeft -= pageHeight;

//       while (heightLeft >= 0) {
//         position = heightLeft - imgHeight;
//         doc.addPage();
//         doc.addImage(data, "PNG", 5, 5 + position, imgWidth, imgHeight);
//         heightLeft -= pageHeight;
//       }
//       if (action === "download") {
//         doc.save(`application_summary_${applicationNumber}.pdf`);
//       } else if (action === "print") {
//         doc.autoPrint();
//         window.open(doc.output("bloburl"), "_blank");
//       }
//     });
//   }

//   // To hide the iframe
//   iframe.style.cssText =
//     "position: absolute; opacity:0; z-index: -9999; width: 900px; height: 100%";
//   document.querySelector("#custom-atoms-iframeForPdf").appendChild(iframe);

//   // let iframe = document.querySelector("#custom-containers-local-iframe");
//   // let target = iframe.contentDocument.querySelector(
//   //   "#material-ui-tradeReviewDetails"
//   // );
//   // html2canvas(target, {
//   //   onclone: function(clonedDoc) {
//   //     clonedDoc.getElementById(
//   //       "material-ui-tradeReviewDetails"
//   //     ).style.display = "block";
//   //   }
//   // }).then(canvas => {
//   //   var data = canvas.toDataURL();
//   //   var docDefinition = {
//   //     content: [
//   //       {
//   //         image: data,
//   //         width: 500
//   //       }
//   //     ]
//   //   };
//   //   if (action === "download") {
//   //     pdfMake.createPdf(docDefinition).download("application_summary.pdf");
//   //   } else if (action === "print") {
//   //     pdfMake.createPdf(docDefinition).print();
//   //   }
//   // });
// };

var getCommonApplyFooter = function getCommonApplyFooter(children) {
  return {
    uiFramework: "custom-atoms",
    componentPath: "Div",
    props: {
      className: "apply-wizard-footer"
    },
    children: children
  };
};

//Function for go to home button
var gotoHomeFooter = exports.gotoHomeFooter = getCommonApplyFooter({
  gotoHome: {
    componentPath: "Button",
    props: {
      variant: "outlined",
      color: "primary",
      style: {
        minWidth: "200px",
        height: "48px",
        marginRight: "16px"
      }
    },
    children: {
      //downloadReceiptButtonLabel: getLabel
      goToHomeButtonLabel: (0, _utils.getLabel)({
        labelName: "GO TO HOME",
        labelKey: "NOC_COMMON_BUTTON_HOME"
      })
    },
    // Check this onClickDefinition later again
    onClickDefination: {
      action: "page_change",
      path: "" + getRedirectionURL()
    }
  }
});

//Function for application success(show those 3 buttons )
var applicationSuccessFooter = exports.applicationSuccessFooter = function applicationSuccessFooter(state, dispatch, applicationNumber, tenant) {
  return getCommonApplyFooter({
    downloadFormButton: {
      componentPath: "Button",
      props: {
        variant: "outlined",
        color: "primary",
        style: {
          minWidth: "290px",
          height: "48px",
          marginRight: "16px"
        }
      },
      children: {
        downloadFormButtonLabel: (0, _utils.getLabel)({
          labelName: "DOWNLOAD CONFIRMATION FORM",
          labelKey: "NOC_APPLICATION_BUTTON_DOWN_CONF"
        })
        // onClickDefination: {
        //   action: "condition",
        //   callBack: () => {
        //     generatePdfAndDownload(
        //       state,
        //       dispatch,
        //       "download",
        //       applicationNumber,
        //       tenant
        //     );
        //   }
        // }
      } },
    printFormButton: {
      componentPath: "Button",
      props: {
        variant: "outlined",
        color: "primary",
        style: {
          minWidth: "250px",
          height: "48px",
          marginRight: "16px"
        }
      },
      children: {
        printFormButtonLabel: (0, _utils.getLabel)({
          labelName: "PRINT CONFIRMATION FORM",
          labelKey: "NOC_APPLICATION_BUTTON_PRINT_CONF"
        })
        // onClickDefination: {
        //   action: "condition",
        //   callBack: () => {
        //     generatePdfAndDownload(
        //       state,
        //       dispatch,
        //       "print",
        //       applicationNumber,
        //       tenant
        //     );
        //   }
        // }
      } },
    // proceedToPaymentButton: {
    //   componentPath: "Button",
    //   props: {
    //     variant: "Contained",
    //     color: "primary",
    //     style: {
    //       minWidth: "200px",
    //       height: "48px",
    //       marginRight: "40px"
    //     }
    //   },
    //   children: {
    //     proceedToPaymentButtonLabel: getLabel({
    //       labelName: "Proceed to Payment",
    //       labelKey: "NOC_COMMON_BUTTON_PROCEEDTOPAYMENT"
    //     })
    //   },
    //   visible: true
    //   //Add onClickDefinition
    // },
    proceedToPaymentButton: {
      componentPath: "Button",
      props: {
        variant: "contained",
        color: "primary",
        style: {
          minWidth: "200px",
          height: "48px",
          marginRight: "40px"
        }
      },
      children: {
        proceedToPaymentButtonLabel: (0, _utils.getLabel)({
          labelName: "Proceed to payment",
          labelKey: "NOC_PROCEED_PAYMENT"
        })
      },
      //Add onClickDefination and RoleDefination later
      onClickDefination: {
        action: "page_change",
        path: process.env.REACT_APP_SELF_RUNNING === "true" ? "/egov-ui-framework/fire-noc/pay" : "/fire-noc/pay?applicationNumber=" + applicationNumber + "&tenantId=" + tenant + "&businessService=NOC"
      },
      roleDefination: {
        rolePath: "user-info.roles",
        action: "PAY",
        roles: ["TL_CEMP", "SUPERUSER"]
      }
    }
  });
};

//Function for approval footer buttons
var approvalSuccessFooter = exports.approvalSuccessFooter = getCommonApplyFooter({
  //Call gotoHome
  downloadLicenseButton: {
    componentPath: "Button",
    props: {
      variant: "outlined",
      color: "primary",
      style: {
        width: "250px",
        height: "48px",
        marginRight: "16px"
      }
    },
    children: {
      downloadLicenseButtonLabel: (0, _utils.getLabel)({
        labelName: "DOWNLOAD FIRE-NOC",
        labelKey: "NOC_APPROVAL_CHECKLIST_BUTTON_DOWN_LIC"
      })
      // onClickDefination: {
      //   action: "condition",
      //   callBack: (state, dispatch) => {
      //     generateReceipt(state, dispatch, "certificate_download");
      //   }
      // }
    } },
  printNOCButton: {
    componentPath: "Button",
    props: {
      variant: "contained",
      color: "primary",
      style: {
        width: "250px",
        height: "48px",
        marginRight: "40px"
      }
    },
    children: {
      printLicenseButtonLabel: (0, _utils.getLabel)({
        labelName: "PRINT FIRE-NOC",
        labelKey: "NOC_APPROVAL_CHECKLIST_PRINT_LIC"
      })
      // onClickDefination: {
      //   action: "condition",
      //   callBack: (state, dispatch) => {
      //     generateReceipt(state, dispatch, "certificate_print");
      //   }
      // }
    } }
});

//Function for payment failure(retry button)
var paymentFailureFooter = exports.paymentFailureFooter = function paymentFailureFooter(applicationNumber, tenant) {
  return getCommonApplyFooter({
    //Call gotoHome
    retryPayment: {
      componentPath: "Button",
      props: {
        variant: "contained",
        color: "primary",
        style: {
          minWidth: "200px",
          height: "48px",
          marginRight: "16px"
        }
      },
      children: {
        downloadReceiptButtonLabel: (0, _utils.getLabel)({
          labelName: "RETRY",
          labelKey: "NOC_PAYMENT_RETRY"
        })
        //Check this onclick later again
        // onClickDefination: {
        //   action: "page_change",
        //   path: `${getRedirectionURL}/pay?applicationNumber=${applicationNumber}&tenantId=${tenant}&businessService=TL`
        // }
      } }
  });
};

//Function for payment success(Show buttons for download and print receipts)
var paymentSuccessFooter = exports.paymentSuccessFooter = function paymentSuccessFooter() {
  return getCommonApplyFooter({
    //call gotoHome
    downloadReceiptButton: {
      componentPath: "Button",
      props: {
        variant: "outlined",
        color: "primary",
        style: {
          minWidth: "200px",
          height: "48px",
          marginRight: "16px"
        }
      },
      children: {
        downloadReceiptButtonLabel: (0, _utils.getLabel)({
          labelName: "DOWNLOAD RECEIPT",
          labelKey: "NOC_CONFIRMATION_BUTTON_DOWNLOAD_RECEIPT"
        })
        // onClickDefination: {
        //   action: "condition",
        //   callBack: (state, dispatch) => {
        //     generateReceipt(state, dispatch, "receipt_download");
        //   }
        // }
      } },
    printReceiptButton: {
      componentPath: "Button",
      props: {
        variant: "contained",
        color: "primary",
        style: {
          minWidth: "200px",
          height: "48px",
          marginRight: "40px"
        }
      },
      children: {
        printReceiptButtonLabel: (0, _utils.getLabel)({
          labelName: "PRINT RECEIPT",
          labelKey: "NOC_CONFIRMATION_BUTTON_PRINT_RECEIPT"
        })
        // onClickDefination: {
        //   action: "condition",
        //   callBack: (state, dispatch) => {
        //     generateReceipt(state, dispatch, "receipt_print");
        //   }
        // }
      } },
    gotoHome: {
      componentPath: "Button",
      props: {
        variant: "outlined",
        color: "primary",
        style: {
          minWidth: "200px",
          height: "48px",
          marginRight: "16px"
        }
      },
      children: {
        //downloadReceiptButtonLabel: getLabel
        goToHomeButtonLabel: (0, _utils.getLabel)({
          labelName: "GO TO HOME",
          labelKey: "NOC_COMMON_BUTTON_HOME"
        })
      },
      // Check this onClickDefinition later again
      onClickDefination: {
        action: "page_change",
        path: process.env.REACT_APP_SELF_RUNNING === "true" ? "/egov-ui-framework/fire-noc/search" : "/fire-noc/search"
      },
      visible: false
    }
  });
};

//Write a function using map to return buttons