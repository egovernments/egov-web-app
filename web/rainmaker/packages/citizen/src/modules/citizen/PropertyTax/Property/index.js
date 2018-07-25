import React, { Component } from "react";
import { connect } from "react-redux";
import Label from "egov-ui-kit/utils/translationNode";
import AssessmentList from "../common/AssessmentList";
import { Screen } from "modules/common";
import { Icon, BreadCrumbs } from "components";
import { addBreadCrumbs } from "egov-ui-kit/redux/app/actions";
import PropertyInformation from "./components/PropertyInformation";
import ReceiptDialog from "./components/ReceiptDialog";

const innerDivStyle = {
  paddingLeft: 50,
  borderBottom: "1px solid #e0e0e0",
};

const IconStyle = {
  margin: "12px 0px 0px 0px",
};

const listItemStyle = {
  padding: "0px 20px",
  borderWidth: "10px 10px 0px",
};

class Property extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pathName: null,
      dialogueOpen: false,
      items: [
        {
          primaryText: <Label label="Property Information" fontSize="16px" color="#484848" labelStyle={{ fontWeight: 500 }} />,
          leftIcon: <Icon action="action" name="info" color="#484848" style={IconStyle} />,
          nestedItems: [
            {
              secondaryText: <PropertyInformation />,
            },
          ],
        },
        {
          primaryText: <Label label="Assessment History" fontSize="16px" color="#484848" labelStyle={{ fontWeight: 500 }} />,
          leftIcon: <Icon action="action" name="receipt" color="#484848" style={IconStyle} />,
          nestedItems: [
            {
              primaryText: <Label label="2018 - 2019" fontSize="16px" color="#484848" containerStyle={{ padding: "10px 0" }} />,
              status: "Paid",
              receipt: true,
            },
            {
              primaryText: <Label label="2017 - 2018" fontSize="16px" color="#484848" containerStyle={{ padding: "10px 0" }} />,
              status: "ACCESS & PAY",
            },
            {
              primaryText: <Label label="2016 - 2017" fontSize="16px" color="#484848" containerStyle={{ padding: "10px 0" }} />,
              status: "Paid",
              receipt: true,
            },
            {
              primaryText: <Label label="2015 - 2016" fontSize="16px" color="#484848" containerStyle={{ padding: "10px 0" }} />,
              status: "ACCESS & PAY",
            },
            {
              primaryText: <Label label="2014 - 2015" fontSize="16px" color="#484848" containerStyle={{ padding: "10px 0" }} />,
              status: "ACCESS & PAY",
            },
            {
              primaryText: <Label label="VIEW ALL ASSESSMENTS" fontSize="16px" color="#fe7a51" labelStyle={{ fontWeight: 500 }} />,
            },
          ],
        },
      ],
    };
  }

  componentDidMount = () => {
    const { location, addBreadCrumbs } = this.props;
    const { pathname } = location;
    if (!(localStorage.getItem("path") === pathname)) {
      const url = pathname && pathname.split("/").pop();
      url && addBreadCrumbs({ title: url, path: window.location.pathname });
    }
  };

  onListItemClick = (item, index) => {
    const { route } = item;

    let path = route && route.slice(1);

    switch (path) {
      case "receipt-dialogue":
        this.setState({
          dialogueOpen: true,
        });
        break;
      default:
        this.props.history.push(path);
        break;
    }
  };

  closeReceiptDialogue = () => {
    this.setState({ dialogueOpen: false });
  };

  render() {
    const { urls, location, history } = this.props;
    let urlArray = [];
    const { pathname } = location;
    if (urls.length === 0 && localStorage.getItem("path") === pathname) {
      urlArray = JSON.parse(localStorage.getItem("breadCrumbObject"));
    }

    return (
      <Screen>
        <BreadCrumbs url={urls.length > 0 ? urls : urlArray} pathname={pathname} history={history} />
        <AssessmentList
          onItemClick={this.onListItemClick}
          items={this.state.items}
          innerDivStyle={innerDivStyle}
          listItemStyle={listItemStyle}
          history={this.props.history}
        />
        <ReceiptDialog open={this.state.dialogueOpen} closeDialogue={this.closeReceiptDialogue} />
      </Screen>
    );
  }
}

const mapStateToProps = ({ app }) => {
  const { urls } = app;
  return { urls };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addBreadCrumbs: (url) => dispatch(addBreadCrumbs(url)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Property);
