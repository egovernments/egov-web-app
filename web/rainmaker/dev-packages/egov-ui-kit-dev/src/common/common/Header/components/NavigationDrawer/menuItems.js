import React from "react";
import { Icon } from "components";
import Label from "egov-ui-kit/utils/translationNode";

const items = {
  citizen: {
    sections: {
      one: {
        items: [
          {
            primaryText: <Label label="CS_HOME_HOMEHEADER" />,
            route: "",
            leftIcon: <Icon action="action" name="home" />,
            style: {
              paddingBottom: "1px",
              paddingTop: "1px",
              borderLeft: "3px solid #00bbd3",
            },
            id: "header-home",
          },
          {
            primaryText: <Label label="CS_HOME_HEADER_PROFILE" />,
            route: "/user/profile",
            leftIcon: <Icon action="social" name="person" />,
            style: {
              paddingBottom: "3px",
              paddingTop: "3px",
            },
            id: "header-profile",
          },
          // {
          //   primaryText: <Label label="CS_HOME_HEADER_LANGUAGE" />,
          //   route: "/language-selection",
          //   leftIcon: <Icon action="action" name="language" />,
          //   style: {
          //     borderBottom: "none",
          //   },
          //   id: "header-language",
          // },
        ],
      },
      two: {
        items: [
          {
            primaryText: <Label label="CS_HOME_HEADER_CONTACT_US" />,
            route: "/contact-us",
            leftIcon: <Icon action="communication" name="call" />,
            style: {
              paddingBottom: "8px",
              paddingTop: "8px",
            },
            id: "header-contact-us",
          },
          {
            primaryText: <Label label="CS_HOME_HEADER_HOW_IT_WORKS" />,
            route: "/how-it-works",
            leftIcon: <Icon action="custom" name="help-circle" />,
            style: {
              paddingBottom: "2px",
              paddingTop: "2px",
            },
            id: "header-how-it-works",
          },
          {
            primaryText: <Label label="CORE_COMMON_LOGOUT" />,
            route: "/logout",
            leftIcon: <Icon action="action" name="power-settings-new" />,
            style: {
              borderBottom: "none",
              borderLeft: "red",
            },
            id: "header-logout",
          },
        ],
      },
    },
  },
  employee: {
    sections: {
      one: {
        items: [
          {
            primaryText: <Label label="CS_HOME_HOMEHEADER" />,
            route: "/all-complaints",
            leftIcon: <Icon action="action" name="home" />,
            style: {
              paddingBottom: "1px",
              paddingTop: "1px",
              borderLeft: "3px solid #00bbd3",
            },
            id: "header-home",
            renderForCSR: true,
          },
          {
            primaryText: <Label label="ES_CLOSED_COMPLAINTS_HEADER" />,
            route: "/closed-complaints",
            leftIcon: <Icon action="custom" name="file-check" />,
            id: "header-closed-complaint",
            renderForCSR: false,
          },
          {
            primaryText: <Label label="ES_EMPLOYEE_DIRECTORY_HEADER" />,
            route: "/employee-directory",
            leftIcon: <Icon action="communication" name="call" />,
            style: {
              paddingBottom: "2px",
              paddingTop: "2px",
            },
            id: "header-contact-us",
            renderForCSR: true,
          },

          {
            primaryText: <Label label="CS_HOME_HEADER_PROFILE" />,
            route: "/user/profile",
            leftIcon: <Icon action="social" name="person" />,
            style: {
              paddingBottom: "3px",
              paddingTop: "3px",
            },
            id: "header-profile",
            renderForCSR: true,
          },
          // {
          //   primaryText: <Label label="CS_HOME_HEADER_LANGUAGE" />,
          //   route: "/language-selection",
          //   leftIcon: <Icon action="action" name="language" />,
          //   style: {
          //     borderBottom: "none",
          //   },
          //   id: "header-language",
          //   renderForCSR: true,
          // },
        ],
      },
      two: {
        items: [
          {
            primaryText: <Label label="CORE_COMMON_LOGOUT" />,
            route: "/logout",
            leftIcon: <Icon action="action" name="power-settings-new" />,
            style: {
              borderBottom: "none",
              borderLeft: "red",
            },
            id: "header-logout",
            renderForCSR: true,
          },
        ],
      },
    },
  },
};

const renderMenuForCSR = (role, section) => {
  const menuForCSR = items[role].sections[section].items.filter((item) => {
    return item.renderForCSR === true;
  });
  return menuForCSR;
};

const menuItems = (role = "citizen", section = "one", isCSR) => {
  return isCSR ? renderMenuForCSR(role, section) : items[role].sections[section].items;
};

export default menuItems;
