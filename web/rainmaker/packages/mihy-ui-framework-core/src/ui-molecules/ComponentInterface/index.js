import React from "react";
import LinearProgress from "../../ui-atoms/LinearSpinner";
import Loadable from "react-loadable";
import Item from "../../ui-atoms/Layout/Item";

import get from "lodash/get";
import isEmpty from "lodash/isEmpty";

class ComponentInterface extends React.Component {
  constructor(props) {
    super(props);
    this.state = { module: null };
  }
  componentDidMount() {
    const { componentPath, uiFramework } = this.props;
    let LoadableComponent = null;
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
            import("ui-atoms-local").then(module => module[componentPath]),
          loading: () => <LinearProgress />
        });
        break;
      case "custom-molecules-local":
        LoadableComponent = Loadable({
          loader: () =>
            import("ui-molecules-local").then(module => module[componentPath]),
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
            import("ui-containers-local").then(module => module[componentPath]),
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

    if (visible && !isEmpty(roleDefination)) {
      const splitList = get(roleDefination, "rolePath").split(".");
      const localdata = JSON.parse(localStorage.getItem(splitList[0]));
      const localRoles = get(
        localdata,
        splitList.slice(1).join("."),
        localdata
      );

      const roleCodes = localRoles.map(elem => {
        return get(elem, "code");
      });
      const roles = get(roleDefination, "roles");
      let found = roles.some(elem => roleCodes.includes(elem));
      visible = found;
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
