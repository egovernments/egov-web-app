import React, { Component } from "react";
import { BreadCrumbs, Icon } from "components";
import AssessmentList from "../common/AssessmentList";
import YearDialogue from "../common/YearDialogue";
import { Screen } from "modules/common";
import { connect } from "react-redux";
import { addBreadCrumbs } from "egov-ui-kit/redux/app/actions";
import Label from "egov-ui-kit/utils/translationNode";

const innerDivStyle = {
  paddingLeft: 50,
  borderBottom: "1px solid #e0e0e0",
};

const IconStyle = {
  margin: "12px 0px 0px 0px",
};

class AssessPay extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dialogueOpen: false,
      items: [
        {
          primaryText: <Label label="Add New Property" fontSize="16px" color="#484848" labelStyle={{ fontWeight: 500 }} />,
          route: "/date-dialogue",
          leftIcon: <Icon action="content" name="add" color="#484848" style={IconStyle} />,
        },
        {
          primaryText: <Label label="Search Property" fontSize="16px" color="#484848" labelStyle={{ fontWeight: 500 }} />,
          route: "/assess-pay/search-property",
          leftIcon: <Icon action="action" name="search" color="#484848" style={IconStyle} />,
        },
      ],
    };
  }

  componentDidMount = () => {
    const { addBreadCrumbs, title } = this.props;
    title && addBreadCrumbs({ title: title, path: window.location.pathname });
  };

  closeYearRangeDialogue = () => {
    this.setState({ dialogueOpen: false });
  };

  onListItemClick = (item, index) => {
    const { route } = item;

    let path = route && route.slice(1);

    switch (path) {
      case "date-dialogue":
        this.setState({
          dialogueOpen: true,
        });
        break;
      default:
        this.props.history.push(path);
        break;
    }
  };

  render() {
    const { urls, history } = this.props;

    return (
      <Screen>
        <BreadCrumbs url={urls} history={history} />
        <AssessmentList onItemClick={this.onListItemClick} innerDivStyle={innerDivStyle} items={this.state.items} history={this.props.history} />
        <YearDialogue open={this.state.dialogueOpen} closeDialogue={this.closeYearRangeDialogue} />
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
)(AssessPay);
