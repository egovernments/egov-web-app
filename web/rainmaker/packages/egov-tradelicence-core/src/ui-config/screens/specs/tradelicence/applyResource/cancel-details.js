import {
  getCommonGrayCard,
  getCommonSubHeader,
  getCommonContainer,
  getLabelWithValue,
  getLabel
} from "mihy-ui-framework/ui-config/screens/specs/utils";

import { changeStep } from "./footer";

export const getCancelDetails = (isEditable = true) => {
  return getCommonGrayCard({
    header: getCommonSubHeader("Cancellation Details"),
    info: getCommonContainer({
      cancelledBy: getLabelWithValue("Cancelled By", "Sukhwinder Singh"),
      Comments: getLabelWithValue("Cancellation Comments", "lorel Ispum")
    })
  });
};
