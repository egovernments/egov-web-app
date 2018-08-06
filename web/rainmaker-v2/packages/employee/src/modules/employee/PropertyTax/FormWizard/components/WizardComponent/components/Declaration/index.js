import React from "react";
import { Dialog, Button } from "components";
import Label from "egov-ui-kit/utils/translationNode";

const Declaration = ({ open, closeDialogue,selected,updateIndex }) => {
  return (
    <Dialog
      open={open}
      children={[
        <div style={{ margin: 16 }}>
          <Label label="DECLATION" color="#484848" fontSize="20px" />
          <Label
            label="I hereby declare that the information I shall provide in the form herein to the property tax department of my local municipality, is
            accurate to the best of my knowledge."
            color="#767676"
            containerStyle={{ margin: "8px 0px" }}
          />
          <div className="text-right">
            <Button
              label={<Label buttonLabel={true} label="AGREE & CONTINUE" fontSize="12px" />}
              primary={true}
              style={{
                height: 40,
                lineHeight: "auto",
                minWidth: "inherit",
              }}
              onClick={(e)=>{
                updateIndex(selected+1)
              }}
            />
          </div>
        </div>,
      ]}
      bodyStyle={{ backgroundColor: "#ffffff" }}
      isClose={false}
      onRequestClose={closeDialogue}
      contentStyle={{ width: "35%" }}
    />
  );
};

export default Declaration;
