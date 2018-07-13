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
    const { location, addBreadCrumTitle } = this.props;
    const { pathname } = location;
    const url = pathname && pathname.split("/").pop();
    url && addBreadCrumTitle(url);
  };

  onTitleClick = () => {
    const { location, addBreadCrumTitle } = this.props;
    const { pathname } = location;
    const url = pathname && pathname.split("/").pop();
    url && addBreadCrumTitle(url);
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
    const { urls } = this.props;
    const { onTitleClick } = this;

    return (
      <Screen className="pt-home-screen">
        <BreadCrumbs url={urls} onTitleClick={onTitleClick} />
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
    addBreadCrumTitle: (url) => dispatch(addBreadCrumbs(url)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Property);
