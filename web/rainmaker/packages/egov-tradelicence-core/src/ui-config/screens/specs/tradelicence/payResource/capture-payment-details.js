import {
  getCommonGrayCard,
  getCommonSubHeader
} from "mihy-ui-framework/ui-config/screens/specs/utils";



const capturePaymentDetails = getCommonGrayCard({
  header: getCommonSubHeader("Capture Payment"),
  tabSection:{
    componentPath:"Tabs",
    props:{
      indicatorColor:"primary"
      textColor:"primary"
      fullWidth:true
    },
    children:{
      tabCash:{
        componentPath:"Tab",
        props:{
          label:"CASH"
        }
      },
      tabCheque:{
          componentPath:"Tab",
          props:{
            label:"Cheque"
          }
      },
      tabDD:{
          componentPath:"Tab",
          props:{
            label:"DD"
          }
      },
      tabCreditOrDebit:{
          componentPath:"Tab",
          props:{
            label:"Credit/Debit Card"
          }
      },
    }
  }
});

export default capturePaymentDetails;
