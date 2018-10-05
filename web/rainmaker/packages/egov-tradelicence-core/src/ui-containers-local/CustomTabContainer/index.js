import React from "react";
import RenderScreen from "mihy-ui-framework/ui-molecules/RenderScreen";
import CustomTab from "../../ui-molecules-local/CustomTab";
import { connect } from "react-redux";

class MultiItem extends React.Component {
  componentDidMount = () => {};

  render() {
    const {
      uiFramework,
      onFieldChange,
      onComponentClick,
      screenKey
    } = this.props;

    const transFormedProps = {
      ...this.props,
      tabs: this.props.tabs.map((tab, key) => {
        return {
          ...tab,
          tabContent: (
            <RenderScreen
              key={key}
              screenKey={screenKey}
              components={tab.tabContent}
              uiFramework={uiFramework}
              onFieldChange={onFieldChange}
              onComponentClick={onComponentClick}
            />
          )
        };
      })
    };
    return <CustomTab {...transFormedProps} />;
  }
}

const mapStateToProps = state => {
  const { screenConfiguration } = state;
  const { screenConfig, preparedFinalObject } = screenConfiguration;
  return { screenConfig, preparedFinalObject, state };
};

const mapDispatchToProps = dispatch => {
  return null;
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MultiItem);
