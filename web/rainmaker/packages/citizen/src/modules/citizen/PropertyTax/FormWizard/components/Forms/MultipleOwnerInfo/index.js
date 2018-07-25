import React from "react";
import { Icon } from "components";

const titleStyle = {
  display: "flex",
  alignItems: "center",
};

const getTitle = (length) => (
  <div className="pt-ownerinfo-title" style={titleStyle}>
    <span>
      <Icon action="social" name="person" />
    </span>
    <span style={{ marginLeft: 4 }}>Owner-{length}</span>
  </div>
);

const MultipleOwnerInfoHOC = ({ handleRemoveOwner, addOwner, ownerDetails, disabled }) => (
  <div>
    {ownerDetails.map((Data, index) => (
      <Data.Component
        key={index}
        cardTitle={getTitle(index + 1)}
        deleteBtn={ownerDetails.length > 1}
        handleRemoveOwner={(formId, formKey) => {
          handleRemoveOwner(formId, formKey);
        }}
        formId={index}
        disabled={disabled}
      />
    ))}
    <div className="pt-add-owner-btn" onClick={addOwner}>
      + Add Owner
    </div>
  </div>
);

export default MultipleOwnerInfoHOC;
