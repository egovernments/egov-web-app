import {
  getCommonGrayCard,
  getCommonSubHeader,
  getCommonContainer,
  getLabelWithValue
} from "mihy-ui-framework/ui-config/screens/specs/utils";

export const getCancelDetails = (isEditable = true) => {
  return getCommonGrayCard({
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
        { jsonPath: "Sukhwinder Singh" }
      ),
      Comments: getLabelWithValue(
        {
          labelName: "Cancellation Comments",
          labelKey: "TL_EMP_APPLICATION_CANC_COM"
        },
        { jsonPath: "lorel Ispum" }
      )
    })
  });
};
