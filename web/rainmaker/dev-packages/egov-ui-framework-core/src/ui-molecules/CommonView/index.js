import React from "react";
import RenderScreen from "../RenderScreen";
import { SnackbarContainer } from "../../ui-containers";
import LoadingIndicator from "../../ui-molecules/LoadingIndicator";
import "./index.css";

class CommonView extends React.Component {
  render() {
    const {
      components,
      uiFramework,
      onFieldChange,
      onComponentClick,
      preparedFinalObject,
      screenKey,
      toast,
      spinner
    } = this.props;
    const { errorType, message, open } = toast;
    return (
      <div>
        <RenderScreen
          components={components}
          uiFramework={uiFramework}
          onFieldChange={onFieldChange}
          onComponentClick={onComponentClick}
          preparedFinalObject={preparedFinalObject}
          screenKey={screenKey}
        />
        {open && (
          <SnackbarContainer
            variant={errorType}
            message={message}
            open={open}
          />
        )}
        {spinner && <LoadingIndicator />}
      </div>
    );
  }
}

export default CommonView;
