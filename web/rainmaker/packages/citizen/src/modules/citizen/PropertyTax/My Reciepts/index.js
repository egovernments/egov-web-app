import React, { Component } from "react";
import { Label, Icon } from "components";
import PTList from "../common/PTList";
import { Screen } from "modules/common";

class MyProperties extends Component {
  constructor(props) {
    super(props);
  }

  reciepts = [
      {
        name : "E2/14, Salunke Vihar",
        nestedItems =[
            {
            yearRangeOne : "2018-2019",
            yearRangeOne : "2017-2018"
            }
        ]
      },
      {
        name : "P-9.2, Tilak Nagar",
        years ={
            yearRangeOne : "2018-2019",
            yearRangeOne : "2017-2018"
        }
      }
    ];
//     initiallyOpen={true}
//     primaryTogglesNestedList={true}
//     nestedItems={[
//       <ListItem
//         key={1}
//         primaryText="Starred"
//         leftIcon={<ActionGrade />}
//       />,
//       <ListItem
//         key={2}
//         primaryText="Sent Mail"
//         leftIcon={<ContentSend />}
//         disabled={true}
//         nestedItems={[
//           <ListItem key={1} primaryText="Drafts" leftIcon={<ContentDrafts />} />,
//         ]}
//       />,
//       <ListItem
//         key={3}
//         primaryText="Inbox"
//         leftIcon={<ContentInbox />}
//         open={this.state.open}
//         onNestedListToggle={this.handleNestedListToggle}
//         nestedItems={[
//           <ListItem key={1} primaryText="Drafts" leftIcon={<ContentDrafts />} />,
//         ]}
//       />,
//     ]}
//   ];

  getListItems = (drafts) => {
    return drafts.map((draft, index) => {
      return {
        primaryText: <Label label={`${draft.name}(${draft.date})`} fontSize="16px" color="#484848" />,
        leftIcon: <Icon action="image" name="edit" />,
        nestedItems
      };
    });
  };

  render() {
    let { getListItems, drafts } = this;
    return (
      <Screen>
        <PTList items={getListItems(drafts)} nestedItems= label="Drafts" />
      </Screen>
    );
  }
}

export default MyProperties;
