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
  paddingTop: 27,
};

class Property extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // selected: null,
      dialogueOpen: false,
      items: [
        {
          primaryText: "Property Information",
          leftIcon: <Icon action="action" name="info" color="#484848" style={{ marginLeft: 0 }} />,
          nestedItems: [
            {
              secondaryText: <PropertyInformation />,
            },
          ],
        },
        {
          primaryText: "Payment Record",
          leftIcon: <Icon action="action" name="receipt" color="#484848" style={{ marginLeft: 0 }} />,
          nestedItems: [
            {
              primaryText: "2018 - 2019",
              route: "/receipt-dialogue",
            },
            {
              primaryText: "2017 - 2018",
              route: "/receipt-dialogue",
            },
            {
              primaryText: "Link Past Payments",
            },
          ],
        },
      ],
    };
  }

  componentDidMount = () => {
    const { location, addBreadCrumbs } = this.props;
    const { pathname } = location;
    const url = pathname && pathname.split("/").pop();
    url && addBreadCrumbs({ title: url, path: window.location.pathname });
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
    const { urls } = this.props;
    const { selected } = this.state;

    return (
      <Screen className="pt-home-screen">
        <BreadCrumbs url={urls} onClick={this.onBreadcrumbsClick} />
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
