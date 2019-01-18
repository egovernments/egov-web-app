import React from "react";
import PropTypes from "prop-types";
import Icon from "@material-ui/core/Icon";
import Tooltip from "@material-ui/core/Tooltip";
import { getLocaleLabelsforTL } from "../../ui-config/screens/specs/utils";
import { transformById } from "../../ui-utils/commons";
const localizationLabels = JSON.parse(
  window.localStorage.getItem("localization_en_IN")
);

function SimpleTooltips(props) {
  const { val, icon, ...rest } = props;
  let transfomedKeys = transformById(localizationLabels, "code");
  let translatedLabel = getLocaleLabelsforTL(
    val.value,
    val.key,
    transfomedKeys
  );
  return (
    <div style={{ display: "inline-flex" }} {...rest}>
      <Tooltip title={translatedLabel}>
        <Icon
          style={{
            color: "rgba(0, 0, 0, 0.3799999952316284)",
            display: "inline"
          }}
        >
          {icon}
        </Icon>
      </Tooltip>
    </div>
  );
}

SimpleTooltips.propTypes = {
  classes: PropTypes.object.isRequired
};

export default SimpleTooltips;
