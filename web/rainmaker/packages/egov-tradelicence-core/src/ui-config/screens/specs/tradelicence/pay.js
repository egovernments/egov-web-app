import {
  getStepperObject,
  getCommonHeader,
  getCommonCard,
  getCommonTitle,
  getCommonParagraph,
  getLabel
} from "mihy-ui-framework/ui-config/screens/specs/utils";

import { footer } from "./payResource/footer";
import estimateDetails from "./payResource/estimate-details";
import g8Details from "./payResource/g8-details"
import capturePaymentDetails from "./payResource/capture-payment-details";

const header = getCommonHeader("Payment for New Trade License (2018-2019)");


const screenConfig = {
  uiFramework: "material-ui",
  name: "pay",
  components: {
    div: {
      uiFramework: "custom-atoms",
      componentPath: "Div",
      props: {
        className: "common-div-css"
      },
      children: {
        headerDiv:{
          uiFramework: "custom-atoms",
          componentPath: "Container",
          children:{
            header:{
              gridDefination:{
                xs:"12",
                sm:"10"
              },
              ...header
            }
          }
        },
        formwizardFirstStep: {
          uiFramework: "custom-atoms",
          componentPath: "Div",
          children: {
            paymentDetails:getCommonCard({
              header: getCommonTitle("Review your estimated fees and enter the payment collection details"),
              paragraph: getCommonParagraph(
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard Lorem Ipsum has been the industry's standard."
              ),
              estimateDetails,
              capturePaymentDetails,
              g8Details

            })


          }
        },
        footer
      }
    }
  }
};

export default screenConfig;
