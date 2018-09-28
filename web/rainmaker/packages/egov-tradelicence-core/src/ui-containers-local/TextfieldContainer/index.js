import React from "react";
import { connect } from "react-redux";
import { TextfieldWithIcon } from "mihy-ui-framework/ui-molecules";
import get from "lodash/get";

class TextFieldContainer extends React.Component {
  render() {
    let { label, placeholder, jsonPath, iconObj, value, ...rest } = this.props;
    return (
      <TextfieldWithIcon
        label={label}
        placeholder={placeholder}
        jsonPath={jsonPath}
        iconObj={iconObj}
        value={value}
        {...rest}
      />
    );
  }
}

const mapStateToProps = (state, ownprops) => {
  const { jsonPath, value } = ownprops;
  const { screenConfiguration } = state;
  const { preparedFinalObject } = screenConfiguration;
  console.log("first,,,", ownprops);
  const fieldValue = value ? value : get(preparedFinalObject, jsonPath);
  return { value:fieldValue };
};

export default connect(mapStateToProps)(TextFieldContainer);
