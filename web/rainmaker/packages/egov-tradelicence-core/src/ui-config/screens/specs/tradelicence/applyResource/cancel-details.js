import {
  getCommonGrayCard,
  getCommonSubHeader,
  getCommonContainer,
  getLabelWithValue
} from "mihy-ui-framework/ui-config/screens/specs/utils";

export const getCancelDetails = (isEditable = true) => {
  return getCommonGrayCard({
    header: getCommonSubHeader("Cancellation Details"),
    info: getCommonContainer({
      cancelledBy: getLabelWithValue({
        textLabel: {
          label: "Cancelled By",
          labelKey: "TL_EMP_APPLICATION_CANC_BY"
        },
        jsonPath: "Sukhwinder Singh"
      }),
      Comments: getLabelWithValue({
        textLabel: {
          label: "Cancellation Comments",
          labelKey: "TL_EMP_APPLICATION_CANC_COM"
        },
        jsonPath: "lorel Ispum"
      })
    })
  });
};
