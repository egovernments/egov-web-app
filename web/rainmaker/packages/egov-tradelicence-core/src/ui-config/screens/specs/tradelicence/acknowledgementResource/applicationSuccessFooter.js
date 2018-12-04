import { getLabel } from "mihy-ui-framework/ui-config/screens/specs/utils";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { toggleSnackbarAndSetText } from "mihy-ui-framework/ui-redux/app/actions";

const getCommonApplyFooter = children => {
  return {
    uiFramework: "custom-atoms",
    componentPath: "Div",
    props: {
      className: "apply-wizard-footer"
    },
    children
  };
};

const generatePdfAndDownload = (
  state,
  dispatch,
  action,
  applicationNumber,
  tenant
) => {
  dispatch(
    toggleSnackbarAndSetText(
      true,
      "Preparing confirmation form, please wait...",
      "info"
    )
  );
  var iframe = document.createElement("iframe");
  iframe.src =
    window.origin +
    `/employee-tradelicence/mihy-ui-framework/tradelicence/search-preview?applicationNumber=${applicationNumber}&tenantId=${tenant}`;
  iframe.onload = function(e) {
    // note: this assumes html2canvas v5+
    window.document.addEventListener("estimateLoaded", handleEvent, false);
    function handleEvent(e) {
      if (e.detail && iframe.contentDocument) {
        let target = iframe.contentDocument.querySelector(
          "#material-ui-tradeReviewDetails"
        );
        html2canvas(target).then(function(canvas) {
          document
            .querySelector("#custom-atoms-iframeForPdf")
            .removeChild(iframe);
          var data = canvas.toDataURL("image/jpeg", 1);
          var imgWidth = 200;
          var pageHeight = 295;
          var imgHeight = (canvas.height * imgWidth) / canvas.width;
          var heightLeft = imgHeight;
          var doc = new jsPDF("p", "mm");
          var position = 0;

          doc.addImage(data, "PNG", 5, 5 + position, imgWidth, imgHeight);
          heightLeft -= pageHeight;

          while (heightLeft >= 0) {
            position = heightLeft - imgHeight;
            doc.addPage();
            doc.addImage(data, "PNG", 5, 5 + position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
          }
          if (action === "download") {
            doc.save(`application_summary_${applicationNumber}.pdf`);
          } else if (action === "print") {
            doc.autoPrint();
            window.open(doc.output("bloburl"), "_blank");
          }
        });
      }
    }
  };
  // To hide the iframe
  iframe.style.cssText =
    "position: absolute; opacity:0; z-index: -9999; width: 900px; height: 100%";
  document.querySelector("#custom-atoms-iframeForPdf").appendChild(iframe);

  // let iframe = document.querySelector("#custom-containers-local-iframe");
  // let target = iframe.contentDocument.querySelector(
  //   "#material-ui-tradeReviewDetails"
  // );
  // html2canvas(target, {
  //   onclone: function(clonedDoc) {
  //     clonedDoc.getElementById(
  //       "material-ui-tradeReviewDetails"
  //     ).style.display = "block";
  //   }
  // }).then(canvas => {
  //   var data = canvas.toDataURL();
  //   var docDefinition = {
  //     content: [
  //       {
  //         image: data,
  //         width: 500
  //       }
  //     ]
  //   };
  //   if (action === "download") {
  //     pdfMake.createPdf(docDefinition).download("application_summary.pdf");
  //   } else if (action === "print") {
  //     pdfMake.createPdf(docDefinition).print();
  //   }
  // });
};

export const applicationSuccessFooter = (
  state,
  dispatch,
  applicationNumber,
  tenant
) => {
  //const baseURL = getBaseURL();
  return getCommonApplyFooter({
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
        downloadReceiptButtonLabel: getLabel({
          labelName: "GO TO HOME",
          labelKey: "TL_COMMON_BUTTON_HOME"
        })
      },
      onClickDefination: {
        action: "page_change",
        path: `/mihy-ui-framework/tradelicence/search`
      }
    },
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
        downloadFormButtonLabel: getLabel({
          labelName: "DOWNLOAD CONFIRMATION FORM",
          labelKey: "TL_APPLICATION_BUTTON_DOWN_CONF"
        })
      },
      onClickDefination: {
        action: "condition",
        callBack: () => {
          generatePdfAndDownload(
            state,
            dispatch,
            "download",
            applicationNumber,
            tenant
          );
        }
      }
    },
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
        printFormButtonLabel: getLabel({
          labelName: "PRINT CONFIRMATION FORM",
          labelKey: "TL_APPLICATION_BUTTON_PRINT_CONF"
        })
      },
      onClickDefination: {
        action: "condition",
        callBack: () => {
          generatePdfAndDownload(
            state,
            dispatch,
            "print",
            applicationNumber,
            tenant
          );
        }
      }
    },
    collectPaymentButton: {
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
        collectPaymentButtonLabel: getLabel({
          labelName: "COLLECT PAYMENT",
          labelKey: "TL_COLLECT_PAYMENT"
        })
      },
      onClickDefination: {
        action: "page_change",
        path: `/mihy-ui-framework/tradelicence/pay?applicationNumber=${applicationNumber}&tenantId=${tenant}&businessService=TL`
      },
      roleDefination: {
        rolePath: "user-info.roles",
        roles: ["TL_CEMP"]
      }
    },
    proceedToPay: {
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
        collectPaymentButtonLabel: getLabel({
          labelName: "PROCEED TO PAYMENT",
          labelKey: "TL_PROCEED_PAYMENT"
        })
      },
      onClickDefination: {
        action: "page_change",
        path: `/mihy-ui-framework/tradelicense-citizen/pay?applicationNumber=${applicationNumber}&tenantId=${tenant}&businessService=TL`
      },
      roleDefination: {
        rolePath: "user-info.roles",
        roles: ["CITIZEN"]
      }
    }
  });
};
