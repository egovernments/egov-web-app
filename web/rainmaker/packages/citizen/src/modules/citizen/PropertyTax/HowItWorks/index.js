import React, { Component } from "react";
import { Card, BreadCrumbs } from "components";
import Screen from "egov-ui-kit/common/common/Screen";
import Label from "egov-ui-kit/utils/translationNode";
import { List, ListItem } from "material-ui/List";
import { connect } from "react-redux";
import { addBreadCrumbs } from "egov-ui-kit/redux/app/actions";
import "../PTHome/index.css";
import "./index.css";

const genericInnerdivStyle = {
  paddingLeft: 0,
};

class HowItWorks extends Component {
  listItems = [
    {
      question: "What is a Property?",
      answer: [{ text: "Property refers to land or buildings within the context of Property Tax." }],
    },
    {
      question: "Why do I have to pay Property Tax?",
      answer: [
        {
          text:
            "Property Tax is levied by your local municipal government to fund development and maintenance of your city and provide services to the city's citizens. ",
        },
      ],
    },
    {
      question: "What is a Property Tax Assessment?",
      answer: [
        {
          text:
            "An assessment is a declaration of the details of a particular Property to your local municipal government for a particular year. The payable Property Tax is calculated based on these details. An Assessment is completed when your Municipality receives the full payment of your Property Tax.",
        },
      ],
    },
    {
      question: "What is the difference between Existing Property ID & Property Tax Assessment ID?",
      answer: [
        {
          text:
            "Existing Property ID has been assigned to you by your local municipal government prior to your using this platform to pay your Property Taxes. Property Tax Assessment ID is a new ID being assigned to identify your property. ",
        },
      ],
    },
    {
      question: "What is the difference between floor and unit?",
      answer: [
        {
          text:
            "All rooms and areas in a building on the same level are said to be on the same floor. In a floor, each portion with a different usage or occupancy is an independent unit.",
        },
      ],
    },
    {
      question: "What is an assessment No?",
      answer: [{ text: "A unique ID to identify your Property Tax Assessment for a particular year." }],
    },
    {
      question: "How is my Property Tax calculated?",
      answer: [
        { text: "Your Property Tax is calculated as per the rates stipulated by the Department of Local Government for the state of Punjab." },
      ],
    },
    {
      question: "What happens when I do not pay the complete amount?",
      answer: [
        {
          text:
            "If your Property Tax for a particular year is not fully paid, you are liable to incur additional charges in the form of penalties and interest which is payable to your local municipal government.",
        },
      ],
    },
    {
      question: "What should I do if i have assessed and paid with incorrect details by mistake?",
      answer: [
        { text: "You can re-assess your property. This option is available in your Assessment History in your list of properties (My properties). " },
      ],
    },
    {
      question: "When do I need to re-assess for my property?",
      answer: [
        {
          text:
            "If any of the property details have been entered incorrectly in your assessment or if there is any change in your property details (Built area, ownership etc)",
        },
      ],
    },
    {
      question: "Do I have to fill the form every year to assess and pay my Property Tax?",
      answer: [
        {
          text:
            "No. The system saves a version of your property with the latest property details you have entered. If there are any changes, they can be made.",
        },
      ],
    },
    {
      question: "Can I assess and pay property tax for a property that does not belong to me?",
      answer: [{ text: "Yes. But keep in mind that Payment of Property tax does not serve as a proof of ownership of the property." }],
    },
  ];

  componentDidMount() {
    const { addBreadCrumbs, title } = this.props;
    title && addBreadCrumbs({ title: title, path: window.location.pathname });
  }

  renderList = (items) => {
    return (
      <List style={{ padding: 0 }}>
        {items.map((item, index) => {
          return (
            <ListItem
              innerDivStyle={index !== 0 ? { ...genericInnerdivStyle, borderTop: "solid 1px #e0e0e0" } : genericInnerdivStyle}
              nestedListStyle={{ padding: "0 0 16px 0" }}
              primaryText={<Label dark={true} label={item.question} fontSize={16} />}
              nestedItems={item.answer.map((nestedItem) => {
                return <ListItem primaryText={<Label fontSize={16} label={nestedItem.text} />} innerDivStyle={{ padding: 0 }} />;
              })}
            />
          );
        })}
      </List>
    );
  };

  render() {
    const { renderList, listItems } = this;
    const { urls, history } = this.props;
    return (
      <Screen>
        <BreadCrumbs url={urls} history={history} />
        <div className="form-without-button-cont-generic">
          <Card className="how-it-works-card" textChildren={renderList(listItems)} />
        </div>
      </Screen>
    );
  }
}

const mapStateToProps = (state) => {
  const { common, app } = state;
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
)(HowItWorks);
