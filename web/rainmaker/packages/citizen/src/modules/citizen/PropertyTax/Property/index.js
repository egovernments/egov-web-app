import React, { Component } from "react";
import { connect } from "react-redux";
import AssessmentList from "../common/AssessmentList";
import { Screen } from "modules/common";
import { Icon, BreadCrumbs } from "components";
import { addBreadCrumbs } from "egov-ui-kit/redux/app/actions";
import PropertyInformation from "./components/PropertyInformation";
import ReceiptDialog from "./components/ReceiptDialog";

const innerDivStyle = {
  paddingLeft: 50,
};

const IconStyle = {
  margin: "12px 0px 0px 0px",
};

class Property extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pathName: null,
      dialogueOpen: false,
      items: [
        {
          primaryText: "Property Information",
          leftIcon: <Icon action="action" name="info" color="#484848" style={IconStyle} />,
          nestedItems: [
            {
              secondaryText: <PropertyInformation />,
            },
          ],
        },
        {
          primaryText: "Assessment History",
          leftIcon: <Icon action="action" name="receipt" color="#484848" style={IconStyle} />,
          nestedItems: [
            {
              primaryText: "2018 - 2019",
              status: "Paid",
              // route: "/receipt-dialogue",
            },
            {
              primaryText: "2017 - 2018",
              status: "ACCESS & PAY",
            },
            {
              primaryText: "2016 - 2017",
              status: "Paid",
            },
            {
              primaryText: "2015 - 2016",
              status: "ACCESS & PAY",
            },
            {
              primaryText: "2014 - 2015",
              status: "ACCESS & PAY",
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

  // onBreadcrumbsClick = (index, path) => {
  //   const { history } = this.props;
  //   this.setState({
  //     selected: index,
  //   });
  //   history.push(path);
  // };

  closeReceiptDialogue = () => {
    this.setState({ dialogueOpen: false });
  };

  render() {
    const { urls, location, history } = this.props;
    let urlArray = [];
    const { pathname } = location;
    if (urls.length == 0 && localStorage.getItem("path") === pathname) {
      urlArray = JSON.parse(localStorage.getItem("breadCrumbObject"));
    }

    return (
      <Screen className="pt-home-screen">
        <BreadCrumbs url={urls.length > 0 ? urls : urlArray} pathname={pathname} history={history} />
        <AssessmentList onItemClick={this.onListItemClick} items={this.state.items} innerDivStyle={innerDivStyle} history={this.props.history} />
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
