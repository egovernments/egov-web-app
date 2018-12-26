import React, { Component } from "react";
import { Link } from "react-router-dom";
import Menu from "material-ui/Menu";
import MenuItem from "material-ui/MenuItem";
import { connect } from "react-redux";
import { Icon } from "components";
import get from "lodash/get";
import { split, orderBy, some } from "lodash";
import { fetchFromLocalStorage } from "egov-ui-kit/utils/commons";
import { TextFieldIcon } from "components";

import "./index.css";

const styles = {

  inputStyle: {
    color: "white !important",
    marginTop: "0px",
    marginLeft: "-10px",
  },
  fibreIconStyle: {
    height: "21px",
    width: "21px",
    margin: 0,
    position: "relative",
    fill: "rgba(0, 0, 0, 0.6)"
  },
  arrowIconStyle: {
    right: "-10px",
  },
  defaultMenuItemStyle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    marginLeft: 0,
    padding: 0,
    paddingLeft:0
  },
  inputIconStyle:{
    margin:"0",
    bottom:"15px",
    top:"auto",
    right:"6px"
  },
  textFieldStyle:{
    height:"auto",
  },
  inputStyle:{
    bottom:"5px",
    height:"auto",
    marginTop:0
  }
};

class ActionMenuComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
      path: "",
      menuItems: [],
      selectedMenuIndex: 0,
    };
    this.setWrapperRef = this.setWrapperRef.bind(this);
  }

  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  componentDidMount() {
     // for better reusability moving out
      this.initialMenuUpdate()
  }
  initialMenuUpdate(){
    let pathParam = {};
    let { actionListArr } = this.props;
    const menuPath = fetchFromLocalStorage("menuPath");
    pathParam = {
      path: "",
      parentMenu: true,
    };
    const url = get(window, "location.pathname")
      .split("/")
      .pop();
    if (url !== "landing-page" && menuPath) {
      const menupathArray = menuPath && menuPath.split(".");
      if (menupathArray && menupathArray.length > 1) {
        menupathArray.pop();
        pathParam = {
          path: menupathArray.join("."),
          parentMenu: false,
        };
      }
    }
    if (actionListArr) {
      this.menuChange(pathParam);
    }
  }
  componentWillReceiveProps(nextProps){
      if(nextProps && nextProps.activeRoutePath != this.props.activeRoutePath){
        this.initialMenuUpdate();
        this.setState({
        searchText:""
      })
      }
  }
  changeModulesActions(modules, items) {
    this.setState({
      modules,
      items,
    });
  }

  handleChange = (e) => {
    this.setState({
      searchText: e.target.value,
    });
  };
  addMenuItems = (path, splitArray, menuItems, index) => {
    let { role, actionListArr } = this.props;
    let actionList = actionListArr;

    if (splitArray.length > 1) {
      if (!some(menuItems, { name: splitArray[0] })) {
        menuItems.push({
          path: path != "" ? path + "." + splitArray[0] : "",
          name: splitArray[0],
          url: "",
          queryParams: actionList[index].queryParams,
          orderNumber: actionList[index].orderNumber,
          navigationURL: actionList[index].navigationURL,
          leftIcon: actionList[index].leftIcon,
        });
      }
    } else {
      menuItems.push({
        path: path != "" ? path + "." + splitArray[0] : "",
        name: actionList[index].displayName,
        url: actionList[index].url,
        queryParams: actionList[index].queryParams,
        orderNumber: actionList[index].orderNumber,
        navigationURL: actionList[index].navigationURL,
        leftIcon: actionList[index].leftIcon,
      });
    }
    menuItems = orderBy(menuItems, ["orderNumber"], ["asc"]);
    this.setState({
      menuItems,
      path,
    });
  };
  menuChange = (pathParam) => {
    let path = pathParam.path;
    let { role, actionListArr } = this.props;
    let actionList = actionListArr;
    let menuItems = [];

    for (var i = 0; i < (actionList && actionList.length); i++) {
      if (actionList[i].path !== "") {
        if (path && !path.parentMenu && actionList[i].path.startsWith(path + ".")) {
          let splitArray = actionList[i].path.split(path + ".")[1].split(".");
          this.addMenuItems(path, splitArray, menuItems, i);
        } else if (pathParam && pathParam.parentMenu && actionList[i].navigationURL) {
          let splitArray = actionList[i].path.split(".");
          this.addMenuItems(path, splitArray, menuItems, i);
        }
      }
    }
  };

  changeLevel = (path) => {
    let { searchText } = this.state;
    let { setRoute } = this.props;

    if (!path) {
      let pathParam = {
        path: "",
        parentMenu: true,
      };
      this.menuChange(pathParam);
      setRoute("/");
    } else {
      let splitArray = split(path, ".");
      var x = splitArray.slice(0, splitArray.length - 1).join(".");
      if (x != "" && splitArray.length > 1) {
        let pathParam = {
          path: x,
          parentMenu: false,
        };
        this.menuChange(pathParam);
      } else {
        let pathParam = {
          path: "",
          parentMenu: true,
        };
        this.menuChange(pathParam);
      }
    }
  };

  changeRoute = (route) => {
    let { setRoute } = this.props;
    setRoute(route);
  };

  render() {
    let { role, actionListArr,activeRoutePath,updateActiveRoute } = this.props;
    let { searchText, path, menuItems } = this.state;
    let { changeLevel, menuChange } = this;
    let actionList = actionListArr;
    let menuTitle = path.split('.');
    let activeItmem = localStorage.getItem("menuName");
    const showMenuItem = () => {
      // const navigationURL = window.location.href.split("/").pop();
      if (searchText.length == 0) {
        return menuItems.map((item, index) => {
          let iconLeft;
          if (item.leftIcon) {
            iconLeft = item.leftIcon.split(":");
          }
          if (!item.url) {
            return (
              <div className="sideMenuItem">
                <MenuItem
                  key={index}
                  innerDivStyle={styles.defaultMenuItemStyle}
                  style={{ whiteSpace: "initial" }}
                  leftIcon={
                    iconLeft &&
                    iconLeft.length == 2 && (
                      <Icon
                        name={iconLeft[1]}
                        action={iconLeft[0]}
                        color="rgba(0, 0, 0, 0.6000000238418579)"
                        style={
                            styles.fibreIconStyle
                        }
                        className={`iconClassHover material-icons whiteColor custom-style-for-${item.leftIcon.name}`}
                      />
                    )
                  }
                  primaryText={
                    <div className="menuStyle with-childs">
                      {item.name || ""}
                    </div>
                  }
                  rightIcon={
                    <Icon
                      name="chevron-right"
                      action="navigation"
                      color="rgba(0, 0, 0, 0.8700000047683716)"
                      className="iconClassHover material-icons whiteColor"
                      style={styles.arrowIconStyle}
                    />
                  }
                  onClick={() => {
                    let pathParam = {
                      path: !item.path ? item.name : item.path,
                      parentPath: false,
                    };
                    menuChange(pathParam);
                  }}
                />
              </div>
            );
          } else {
            if (item.navigationURL && item.navigationURL !== "newTab") {
              return (
                <Link
                  style={{ textDecoration: "none" }}
                  key={index}
                  to={item.navigationURL === "/" ? `${item.navigationURL}` : `/${item.navigationURL}`}
                >
                  <div className={`sideMenuItem ${activeItmem ==item.name ? "selected": "" }`}>
                    <MenuItem
                      innerDivStyle={styles.defaultMenuItemStyle}
                      style={{ whiteSpace: "initial" }}
                      key={index}
                      onClick={() => {
                      //  localStorage.setItem("menuPath", item.path);
                        updateActiveRoute(item.path,item.name)
                        document.title = item.name;
                        if (window.location.href.indexOf(item.navigationURL) > 0 && item.navigationURL.startsWith("integration")) {
                          window.location.reload();
                        }
                      }}
                      leftIcon={
                        iconLeft &&
                        iconLeft.length === 2 && (
                          <Icon
                            name={iconLeft[1]}
                            action={iconLeft[0]}
                            // fill="rgba(0, 0, 0, 0.6000000238418579)"
                            color="rgba(0, 0, 0, 0.6000000238418579)"
                            style={
                              styles.fibreIconStyle
                            }
                            className={`iconClassHover material-icons whiteColor custom-style-for-${item.leftIcon.name}`}
                          />
                        )
                      }
                      primaryText={
                        <div className="menuStyle">
                          {item.name || ""}
                        </div>
                      }
                    />
                  </div>
                </Link>
              );
            } else {
              return (
                <a href={item.url} target="_blank">
                  <div className="sideMenuItem">
                    <MenuItem
                      innerDivStyle={styles.defaultMenuItemStyle}
                      style={{ whiteSpace: "initial" }}
                      key={index}
                      onClick={() => {
                        localStorage.setItem("menuPath", item.path);
                        document.title = item.name;
                      }}
                      leftIcon={
                        iconLeft &&
                        iconLeft.length === 2 && (
                          <Icon
                            name={iconLeft[1]}
                            action={iconLeft[0]}
                            color="rgba(0, 0, 0, 0.6000000238418579)"
                            style={
                               styles.fibreIconStyle
                            }
                            className={`iconClassHover material-icons whiteColor custom-style-for-${item.leftIcon.name}`}
                          />
                        )
                      }
                      primaryText={
                        <div className="menuStyle">
                          {item.name || ""}
                        </div>
                      }
                    />
                  </div>
                </a>
              );
            }
          }
        });
      } else {
        return (
          actionList &&
          actionList.map((item, index) => {
            let iconLeft;
            if (item.leftIcon) {
              iconLeft = item.leftIcon.split(":");
            }
            if (item.path && item.url && item.displayName.toLowerCase().indexOf(searchText.toLowerCase()) > -1) {
              if (item.navigationURL) {
                return (
                  <Link
                    style={{ textDecoration: "none" }}
                    key={index}
                    to={item.navigationURL === "/" ? `${item.navigationURL}` : `/${item.navigationURL}`}
                  >
                    <div className="sideMenuItem">
                      <MenuItem
                        innerDivStyle={styles.defaultMenuItemStyle}
                        style={{ whiteSpace: "initial" }}
                        onClick={() => {
                          document.title = item.displayName;
                          updateActiveRoute(item.path,item.displayName)
                        }}
                        leftIcon={
                          iconLeft &&
                          iconLeft.length === 2 && (
                            <Icon
                              name={iconLeft[1]}
                              action={iconLeft[0]}
                              color={"rgba(0, 0, 0, 0.6000000238418579)"}
                              style={
                                styles.fibreIconStyle
                              }
                              className={`iconClassHover material-icons whiteColor custom-style-for-${item.leftIcon.name}`}
                            />
                          )
                        }
                        primaryText={
                          <div className="menuStyle">
                            {item.displayName || ""}
                          </div>
                        }
                      />
                    </div>
                  </Link>
                );
              }
            }
          })
        );
      }
    };

    return actionList ? (
      <div ref={this.setWrapperRef}>
        <div className="whiteColor" />
        <div className="menu-item-title">{menuTitle && menuTitle[menuTitle.length-1]}</div>
        <Menu
          disableAutoFocus={true}
          desktop={true}
          autoWidth={false}
          style={{ width: "100%" }}
          className="actionMenuMenu"
          menuItemStyle={{ paddingLeft: "0", width: "100%" }}
        >
          {!path && <TextFieldIcon value={searchText} hintText="Search" iconStyle={styles.inputIconStyle} inputStyle={styles.inputStyle} textFieldStyle={styles.textFieldStyle} onChange={(e)=>{this.handleChange(e)}}/> }
          {(path || searchText) && (
            <div
              className="pull-left whiteColor pointerCursor"
              onClick={() => {
                changeLevel(path);
              }}
            >
              <Icon name="arrow-back" action="navigation" color="rgba(0, 0, 0, 0.6000000238418579)" />
            </div>
          )}
          {path && (
            <div
              className="pull-right pointerCursor"
              onClick={() => {
                // changeLevel("");
                updateActiveRoute("Home","Home");
                this.changeRoute("/");
              }}
            >
              <Icon name="home" action="action" color="rgba(0, 0, 0, 0.6000000238418579)" />
            </div>
          )}

          <div className="clearfix" />

          <div style={{ paddingLeft: "-24px" }}>{showMenuItem()}</div>
        </Menu>
      </div>
    ) : null;
  }
}

const mapDispatchToProps = (dispatch) => ({
  handleToggle: (showMenu) => dispatch({ type: "MENU_TOGGLE", showMenu }),
  setRoute: (route) => dispatch({ type: "SET_ROUTE", route }),
});
export default connect(
  null,
  mapDispatchToProps
)(ActionMenuComp);
