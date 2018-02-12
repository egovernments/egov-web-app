import React from "react";
import Field from "./field";

const Group = ({ group }) => {
  return (
    <div className="row">
      {group.fields.map((field, fieldIndex) => {
        return <Field key={fieldIndex} field={field} />;
      })}
    </div>
  );
};

export default Group;
