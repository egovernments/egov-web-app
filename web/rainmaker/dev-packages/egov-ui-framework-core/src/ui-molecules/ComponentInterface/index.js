import React from "react";
import LinearProgress from "../../ui-atoms/LinearSpinner";
import Loadable from "react-loadable";
import Item from "../../ui-atoms/Layout/Item";
import remoteComponents from "../../ui-config/commonConfig/remote-component-paths";
import get from "lodash/get";
import isEmpty from "lodash/isEmpty";
import find from "lodash/find";
import { localStorageGet } from "egov-ui-kit/utils/localStorageUtils";
class ComponentInterface extends React.Component {
  constructor(props) {
    super(props);
    this.state = { module: null };
  }
  componentDidMount() {
    const { componentPath, uiFramework, moduleName } = this.props;
    let LoadableComponent = null;
    const selfRunning =
      process.env.REACT_APP_SELF_RUNNING === "true" ? true : false;
    switch (uiFramework) {
      // case "carbon":
      //   LoadableComponent = Loadable({
      //     loader: () =>
      //       import("carbon-components-react").then(
      //         module => module[componentPath]
      //       ),
      //     loading: () => <LinearProgress />
      //   });
      //   break;
      case "custom-atoms":
        LoadableComponent = Loadable({
          loader: () =>
            import("../../ui-atoms").then(module => module[componentPath]),
          loading: () => <LinearProgress />
        });
        break;
      case "custom-molecules":
        LoadableComponent = Loadable({
          loader: () =>
            import("../../ui-molecules").then(module => module[componentPath]),
          loading: () => <LinearProgress />
        });
        break;
      case "custom-atoms-local":
        LoadableComponent = Loadable({
          loader: () =>
            !selfRunning
              ? remoteComponents(moduleName, "ui-atoms-local").then(
                  module => module[componentPath]
                )
              : import("ui-atoms-local").then(module => module[componentPath]),
          loading: () => <LinearProgress />
        });
        break;
      case "custom-molecules-local":
        LoadableComponent = Loadable({
          loader: () =>
            !selfRunning
              ? remoteComponents(moduleName, "ui-molecules-local").then(
                  module => module[componentPath]
                )
              : import("ui-molecules-local").then(
                  module => module[componentPath]
                ),
          loading: () => <LinearProgress />
        });
        break;
      case "custom-containers":
        LoadableComponent = Loadable({
          loader: () =>
            import("../../ui-containers").then(module => module[componentPath]),
          loading: () => <LinearProgress />
        });
        break;
      case "custom-containers-local":
        LoadableComponent = Loadable({
          loader: () =>
            !selfRunning
              ? remoteComponents(moduleName, "ui-containers-local").then(
                  module => module[componentPath]
                )
              : import("ui-containers-local").then(
                  module => module[componentPath]
                ),
          loading: () => <LinearProgress />
        });
        break;
      case "material-ui":
        LoadableComponent = Loadable({
          loader: () =>
            import("@material-ui/core").then(module => module[componentPath]),
          loading: () => <LinearProgress />
        });
        break;
      // case "remote-component":
      //   LoadableComponent = Loadable({
      //     loader: () =>
      //       import("egov-workflow/ui-containers").then(
      //         module => module[componentPath]
      //       ),
      //     loading: () => <LinearProgress />
      //   });
      // break;
    }
    this.setState({ module: LoadableComponent });
  }

  render() {
    const { module: Component } = this.state; // Assigning to new variable names @see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
    let {
      id,
      uiFramework,
      props,
      children,
      gridDefination,
      visible = true,
      roleDefination = {}
    } = this.props;

    // if (visible && !isEmpty(roleDefination)) {
    //   const splitList = get(roleDefination, "rolePath").split(".");
    //   const localdata = JSON.parse(localStorageGet(splitList[0]));
    //   const localRoles = get(
    //     localdata,
    //     splitList.slice(1).join("."),
    //     localdata
    //   );

    //   const roleCodes = localRoles.map(elem => {
    //     return get(elem, "code");
    //   });
    //   const roles = get(roleDefination, "roles");
    //   let found = roles.some(elem => roleCodes.includes(elem));
    //   visible = found;
    // }

    if (visible && !isEmpty(roleDefination)) {
      const splitList = get(roleDefination, "rolePath").split(".");
      const localdata = JSON.parse(localStorageGet(splitList[0]));
      const localRoles = get(
        localdata,
        splitList.slice(1).join("."),
        localdata
      );
      const roleCodes = localRoles.map(elem => {
        return get(elem, "code");
      });
      if (get(roleDefination, "roles")) {
        const roles = get(roleDefination, "roles");
        let found = roles.some(elem => roleCodes.includes(elem));
        visible = found;
      } else if (get(roleDefination, "action")) {
        const businessServiceData = JSON.parse(
          localStorageGet("businessServiceData")
        );
        const data = find(businessServiceData, { businessService: "NewTL" });
        const filteredData =
          data &&
          data.states.reduce((res, curr) => {
            if (
              curr &&
              curr.actions &&
              curr.actions.filter(
                item => item.action === get(roleDefination, "action")
              ).length > 0
            ) {
              const filteredAction = curr.actions.filter(
                item => item.action === get(roleDefination, "action")
              );

              filteredAction.forEach(item => res.push(item.roles));
            }

            return res;
          }, []);
        const roles = filteredData[0];
        let found = roles.some(elem => roleCodes.includes(elem));
        visible = found;
      }
    }

    if (gridDefination) {
      return (
        Component &&
        visible && (
          <Item {...gridDefination}>
            <Component id={`${uiFramework}-${id}`} {...props}>
              {children && children}
            </Component>
          </Item>
        )
      );
    } else {
      return (
        Component &&
        visible && (
          <Component id={`${uiFramework}-${id}`} {...props}>
            {children && children}
          </Component>
        )
      );
    }
  }
}

export default ComponentInterface;
