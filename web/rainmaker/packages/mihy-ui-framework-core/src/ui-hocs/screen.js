import React from "react";
import { connect } from "react-redux";
import {
  initScreen,
  handleScreenConfigurationFieldChange,
  submitForm
} from "../ui-redux/screen-configuration/actions";
import { setRoute } from "../ui-redux/app/actions";
import isEmpty from "lodash/isEmpty";
import get from "lodash/get";
import { addComponentJsonpath } from "../ui-utils";
import $ from "jquery";
import cloneDeep from "lodash/cloneDeep";

const screenHoc = ({
  path = "",
  screenKey,
  hasOwnConfig = false,
  screenConfig: defaultScreenConfig,
  hasRemoteConfig = false,
  ...rest
}) => Screen => {
  class ScreenWrapper extends React.Component {
    constructor(props) {
      super(props);
      const { initScreen } = props;
      this.screenConfig = {};
      try {
        const getConfig = (path, screenKey) => {
          return require(`ui-config/screens/specs/${path}/${screenKey}`)
            .default;
        };
        if (hasOwnConfig) {
          this.screenConfig = defaultScreenConfig || {};
        } else if (hasRemoteConfig) {
          // const url=`http://rawgit.com/muralim4242/mihy-repo/master/packages/ui-client-app/src/ui-config/screens/specs/${path}/${screenKey}.js`;
          // $.getScript(url, function( data, textStatus, jqxhr ) {
          //     console.log( data ); // Data returned
          //     console.log( textStatus ); // Success
          //     console.log( jqxhr.status ); // 200
          //     console.log( "Load was performed." );
          // });
          this.screenConfig = getConfig(path, screenKey);
        } else {
          this.screenConfig = getConfig(path, screenKey);
        }
        if (!isEmpty(this.screenConfig)) {
          addComponentJsonpath(this.screenConfig.components);
        }
        initScreen(screenKey, cloneDeep(this.screenConfig));
      } catch (error) {
        // the error is assumed to have occured due to absence of config; so ignore it!
        console.log(error);
      }
    }

    handleScreenConfigurationFieldChange = (
      screenKey,
      componentJsonpath,
      property,
      value
    ) => {
      const { handleScreenConfigurationFieldChange } = this.props;
      handleScreenConfigurationFieldChange(
        screenKey,
        componentJsonpath,
        property,
        value
      );
    };

    onClick = (onClickDefination, componentJsonpath = "") => {
      switch (onClickDefination.action) {
        case "submit":
          const { submitForm } = this.props;
          const {
            method,
            endPoint,
            purpose,
            redirectionUrl,
            bodyObjectsJsonPaths,
            queryObjectJsonPath
          } = onClickDefination;
          submitForm(
            screenKey,
            method,
            endPoint,
            purpose,
            redirectionUrl,
            bodyObjectsJsonPaths || {},
            queryObjectJsonPath || []
          );
          break;
        case "condition":
          const { state, dispatchAction } = this.props;
          const { callBack } = onClickDefination;
          if (typeof callBack === "function") {
            callBack(state, dispatchAction);
          }
          break;
        case "page_change":
          const { setRoute } = this.props;
          const { path } = onClickDefination;
          setRoute(path);
          break;
        default:
      }
    };

    render() {
      const { screenConfig, toast, spinner } = this.props;
      const {
        [screenKey]: currentScreenConfig,
        preparedFinalObject
      } = screenConfig;
      if (currentScreenConfig) {
        const { handleScreenConfigurationFieldChange, onClick } = this;
        const { uiFramework, components, name } = currentScreenConfig;
        return (
          <Screen
            uiFramework={uiFramework}
            screenKey={screenKey}
            components={components}
            screenKey={name}
            onFieldChange={handleScreenConfigurationFieldChange}
            onComponentClick={onClick}
            preparedFinalObject={preparedFinalObject}
            toast={toast}
            spinner={spinner}
          />
        );
      } else {
        return null;
      }
    }
  }

  const mapStateToProps = state => {
    const { screenConfiguration, app } = state;
    const { toast, spinner } = app;
    const { screenConfig, preparedFinalObject } = screenConfiguration;
    return { screenConfig, preparedFinalObject, state, toast, spinner };
  };

  const mapDispatchToProps = dispatch => {
    return {
      handleScreenConfigurationFieldChange: (
        screenKey,
        componentJsonpath,
        property,
        value
      ) =>
        dispatch(
          handleScreenConfigurationFieldChange(
            screenKey,
            componentJsonpath,
            property,
            value
          )
        ),
      submitForm: (
        screenKey,
        method,
        endpoint,
        action,
        bodyObjectsJsonPaths = [],
        queryObjectJsonPath = []
      ) =>
        dispatch(
          submitForm(
            screenKey,
            method,
            endpoint,
            action,
            bodyObjectsJsonPaths,
            queryObjectJsonPath
          )
        ),
      initScreen: (screenKey, screenConfig) =>
        dispatch(initScreen(screenKey, screenConfig)),
      dispatchAction: dispatch,
      setRoute: path => dispatch(setRoute(path))
    };
  };

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(ScreenWrapper);
};

export default screenHoc;
