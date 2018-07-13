import React, { Component } from "react";
import { BreadCrumbs, Icon } from "components";
import AssessmentList from "../common/AssessmentList";
import YearDialogue from "./components/YearDialogue";
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
          route: "search-property",
          leftIcon: <Icon action="action" name="search" color="#484848" style={{ marginLeft: 0, marginTop: 3 }} />,
        },
      ],
    };
  }

  componentDidMount = () => {
    const { addBreadCrumTitle, title } = this.props;
    title && addBreadCrumTitle(title);
  };

  getYearList = () => {
    let today = new Date();
    let month = today.getMonth() + 1;
    let yearRange = [];
    var counter = 0;
    if (month <= 3) {
      return this.getLastFourYear(yearRange, today.getFullYear() - 1, counter);
    } else {
      return this.getLastFourYear(yearRange, today.getFullYear(), counter);
    }
  };

  getLastFourYear(yearRange, currentYear, counter) {
    if (counter < 4) {
      counter++;
      yearRange.push(`${currentYear}-${currentYear + 1}`);
      this.getLastFourYear(yearRange, currentYear - 1, counter);
    }
    return yearRange;
  }

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

  // getListItems = (items) => {
  //   return items.map((item, index) => {
  //     return {
  //       primaryText: <Label label={item.primaryText} fontSize="16px" color="#484848" labelStyle={{ fontWeight: 500 }} />,
  //       leftIcon: item.leftIcon,
  //       route: item.route,
  //       nestedItems:
  //         item.nestedItems &&
  //         item.nestedItems.map((nestedItem) => {
  //           return {
  //             primaryText: <Label label={nestedItem.primaryText} fontSize="16px" color="#484848" />,
  //           };
  //         }),
  //     };
  //   });
  // };

  render() {
    const { urls } = this.props;

    return (
      <Screen>
        <BreadCrumbs url={urls} />;
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
        {/* <PTList items={getListItems(items)} history={this.props.history} innerDivStyle={innerDivStyle} /> */}
        <AssessmentList onItemClick={this.onListItemClick} innerDivStyle={innerDivStyle} items={this.state.items} history={this.props.history} />
        <YearDialogue open={this.state.dialogueOpen} yearList={this.getYearList()} closeDialogue={this.closeYearRangeDialogue} />
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
)(AssessPay);
