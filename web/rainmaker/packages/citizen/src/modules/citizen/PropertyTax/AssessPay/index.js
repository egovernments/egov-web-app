import React, { Component } from "react";
import { BreadCrumbs, Icon } from "components";
import AssessmentList from "../common/AssessmentList";
import YearDialogue from "../common/YearDialogue";
import { Screen } from "modules/common";
import { connect } from "react-redux";
import { addBreadCrumbs } from "egov-ui-kit/redux/app/actions";

const innerDivStyle = {
  paddingLeft: 50,
  paddingTop: 18,
  paddingBottom: 0,
};

class AssessPay extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dialogueOpen: false,
      items: [
        // {
        //   primaryText: "My Properties",
        //   status: "Payment Pending",
        //   leftIcon: <Icon action="action" name="home" style={{ marginLeft: 0 }} />,

        //   nestedItems: [
        //     {
        //       primaryText: "EB-154, Maya Enclave, Harinagar",
        //     },
        //     {
        //       primaryText: "P-9/2, Balwinder Colony, Palwal Road, Indirapuram",
        //     },
        //   ],
        // },
        {
          primaryText: "Add New Property",
          route: "/date-dialogue",
          leftIcon: <Icon action="content" name="add" color="#484848" style={{ marginLeft: 0, marginTop: 3 }} />,
        },
        {
          primaryText: "Search Property",
          route: "/search-property",
          leftIcon: <Icon action="action" name="search" color="#484848" style={{ marginLeft: 0, marginTop: 3 }} />,
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
        {/* <Card
            textChildren={
              <div
                onClick={() => {
                  this.setState({ dialogueOpen: true });
                }}
                className="rainmaker-displayInline"
                style={{ paddingLeft: "14px", alignItems: "center", cursor: "pointer" }}
              >
                <Icon action="content" name="add" color="#767676" style={{ height: "30px", width: "30px" }} />
                <Label label="Add New Property" containerStyle={{ marginLeft: "30px" }} labelStyle={{ fontWeight: 500 }} fontSize="16px" />
              </div>
            }
          /> */}

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
