import {
  getCommonGrayCard,
  getCommonSubHeader,
  getCommonContainer,
  getLabelWithValue
} from "mihy-ui-framework/ui-config/screens/specs/utils";

export const getCancelDetails = () =>
  getCommonGrayCard({
    header: getCommonSubHeader({
      labelName: "Cancellation Details",
      labelKey: "TL_EMP_APPLICATION_CANC_DET"
    }),
    info: getCommonContainer({
      cancelledBy: getLabelWithValue(
        {
          labelName: "Cancelled By",
          labelKey: "TL_EMP_APPLICATION_CANC_BY"
        },
        {
          jsonPath:
            "Licenses[0].tradeLicenseDetail.additionalDetail.cancelledBy"
        }
      ),
      Comments: getLabelWithValue(
        {
          labelName: "Cancellation Comments",
          labelKey: "TL_EMP_APPLICATION_CANC_COM"
        },
        {
          jsonPath:
            "Licenses[0].tradeLicenseDetail.additionalDetail.cancelComments"
        }
      )
    })
  });
