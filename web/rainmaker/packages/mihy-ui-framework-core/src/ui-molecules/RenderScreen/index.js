import React from "react";
import isEmpty from "lodash/isEmpty";
import ComponentInterface from "../ComponentInterface";

const RenderScreen = ({
  components,
  uiFramework: rootFramework,
  onFieldChange,
  onComponentClick,
  screenKey
}) => {
  return components
    ? Object.keys(components).map(componentKey => {
        const {
          uiFramework,
          componentPath,
          componentJsonpath,
          jsonPath,
          props,
          onClickDefination,
          gridDefination,
          visible,
          type,
          roleDefination
        } = components[componentKey];
        let extraProps = jsonPath
          ? {
              onChange: e => {
                onFieldChange(
                  screenKey,
                  componentJsonpath,
                  "props.value",
                  e.target.value
                );
              }
            }
          : {};
        if (onClickDefination) {
          extraProps = {
            ...extraProps,
            onClick: e => {
              onComponentClick(onClickDefination, componentJsonpath);
            }
          };
        }
        if (type && type === "array") {
          extraProps = {
            ...extraProps,
            onFieldChange,
            onComponentClick,
            uiFramework: rootFramework,
            componentJsonpath,
            screenKey
          };
        }
        if (!isEmpty(components[componentKey].children)) {
          return (
            <ComponentInterface
              key={componentKey}
              id={componentKey}
              uiFramework={uiFramework || rootFramework}
              componentPath={componentPath}
              props={{ ...props, ...extraProps }}
              gridDefination={gridDefination}
              visible={visible}
              roleDefination={roleDefination}
            >
              <RenderScreen
                components={components[componentKey].children}
                onFieldChange={onFieldChange}
                onComponentClick={onComponentClick}
                uiFramework={rootFramework}
                screenKey={screenKey}
              />
            </ComponentInterface>
          );
        } else {
          return (
            <ComponentInterface
              key={componentKey}
              id={componentKey}
              uiFramework={uiFramework || rootFramework}
              componentPath={componentPath}
              props={{ ...props, ...extraProps }}
              gridDefination={gridDefination}
              visible={visible}
              roleDefination={roleDefination}
            />
          );
        }
      })
    : null;
};

export default RenderScreen;
