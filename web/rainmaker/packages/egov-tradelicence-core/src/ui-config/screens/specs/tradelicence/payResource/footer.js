import { getLabel } from "mihy-ui-framework/ui-config/screens/specs/utils";
import get from "lodash/get";
import cloneDeep from "lodash/cloneDeep";
import { httpRequest } from "ui-utils/api";
import { getQueryArg } from "mihy-ui-framework/ui-utils/commons";
import { setRoute } from "mihy-ui-framework/ui-redux/app/actions";

const moveToSuccess = (href, dispatch) => {
  const applicationNo = getQueryArg(href, "applicationNumber");
  const tenantId = getQueryArg(href, "tenantId");
  const purpose = "pay";
  const status = "success";
  dispatch(
    setRoute(
      `/mihy-ui-framework/tradelicence/acknowledgement?purpose=${purpose}&status=${status}&applicationNumber=${applicationNo}&tenantId=${tenantId}`
    )
  );
};

const callBackForPay = async (state, dispatch) => {
  const { href } = window.location;
  const ReceiptDataTemp = get(
    state.screenConfiguration.preparedFinalObject,
    "ReceiptTemp[0]"
  );
  let finalReceiptData = cloneDeep(ReceiptDataTemp);

  let ReceiptBody = {
    Receipt: []
  };

  ReceiptBody.Receipt.push(finalReceiptData);

  console.log(ReceiptBody);
  try {
    await httpRequest(
      "post",
      "collection-services/receipts/_create",
      "_create",
      [],
      ReceiptBody,
      [],
      {}
    );
    moveToSuccess(href, dispatch);
  } catch (e) {
    console.log(e);
  }
};

export const getCommonApplyFooter = children => {
  return {
    uiFramework: "custom-atoms",
    componentPath: "Div",
    props: {
      className: "apply-wizard-footer"
    },
    children
  };
};

export const footer = getCommonApplyFooter({
  submitButton: {
    componentPath: "Button",
    props: {
      variant: "contained",
      color: "primary",
      style: {
        width: "200px",
        height: "48px",
        marginRight: "45px"
      }
    },
    children: {
      submitButtonLabel: getLabel({
        labelName: "Submit",
        labelKey: "TL_COMMON_BUTTON_SUBMIT"
      }),
      submitButtonIcon: {
        uiFramework: "custom-atoms",
        componentPath: "Icon",
        props: {
          iconName: "keyboard_arrow_right"
        }
      }
    },
    onClickDefination: {
      action: "condition",
      callBack: callBackForPay
    }
  }
});
