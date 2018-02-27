import React, { Component } from "react";
import { Card, TimeLine, List } from "../../../../components";
import ContentInbox from "material-ui/svg-icons/content/inbox";

// header={{
//   title:<div><ContentInbox/>COMPLAINT TIMELINE</div>
// }}

const items = [
  {
    primaryText: "COMLAINT TIMELINE",
    leftIcon: <ContentInbox />,
  },
];

class ComplaintTimeLine extends Component {
  render() {
    return (
      <div>
        <Card
          card={{
            style: {
              backgroundColor: "#ffffff",
            },
          }}
          textChildren={<List items={items} />}
        />
        <Card
          card={{
            style: {
              backgroundColor: "#ffffff",
            },
          }}
          textChildren={
            <TimeLine
              // divStyle={{ maxwidth: 380, maxheight: 400, margin: "auto" }}
              stepperProps={{
                activeStep: 0,
                orientation: "vertical",
              }}
              steps={[
                {
                  labelChildren: "Select campaign settings 1",
                  contentChildren: (
                    <p>
                      For each ad campaign that you create, you can control how much youre willing to spend on clicks and conversions, which networks
                      and geographical locations you want your ads to show on, and more.
                    </p>
                  ),
                },
                {
                  labelChildren: "Select campaign settings 2",
                  contentChildren: (
                    <p>
                      For each ad campaign that you create, you can control how much youre willing to spend on clicks and conversions, which networks
                      and geographical locations you want your ads to show on, and more.
                    </p>
                  ),
                },
                {
                  labelChildren: "Select campaign settings 3",
                  contentChildren: (
                    <p>
                      For each ad campaign that you create, you can control how much youre willing to spend on clicks and conversions, which networks
                      and geographical locations you want your ads to show on, and more.
                    </p>
                  ),
                },
              ]}
            />
          }
        />
      </div>
    );
  }
}

export default ComplaintTimeLine;
