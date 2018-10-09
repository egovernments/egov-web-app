import { getLabel } from "mihy-ui-framework/ui-config/screens/specs/utils";
import html2canvas from "html2canvas";
import pdfMake from "pdfmake/build/pdfmake";

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

const generatePdfAndDownload = action => {
  let target = document.querySelector("#custom-atoms-tradeReviewDetails");
  html2canvas(target, {
    onclone: function(clonedDoc) {
      clonedDoc.getElementById(
        "custom-atoms-tradeReviewDetails"
      ).style.display = "block";
    }
  }).then(canvas => {
    var data = canvas.toDataURL();
    var docDefinition = {
      content: [
        {
          image: data,
          width: 500
        }
      ]
    };
    if (action === "download") {
      pdfMake.createPdf(docDefinition).download("application_summary.pdf");
    } else if (action === "print") {
      pdfMake.createPdf(docDefinition).print();
    }
  });
};

export const applicationSuccessFooter = (applicationNumber, tenant) => {
  return getCommonApplyFooter({
    downloadFormButton: {
      componentPath: "Button",
      props: {
        variant: "outlined",
        color: "primary",
        style: {
          width: "290px",
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
          generatePdfAndDownload("download");
        }
      }
    },
    printFormButton: {
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
        printFormButtonLabel: getLabel({
          labelName: "PRINT CONFIRMATION FORM",
          labelKey: "TL_APPLICATION_BUTTON_PRINT_CONF"
        })
      },
      onClickDefination: {
        action: "condition",
        callBack: () => {
          generatePdfAndDownload("print");
        }
      }
    },
    collectPaymentButton: {
      componentPath: "Button",
      props: {
        variant: "contained",
        color: "primary",
        style: {
          width: "200px",
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
      }
    }
  });
};
