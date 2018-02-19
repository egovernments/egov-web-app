import React from "react";
import Field from "./field";
import { Card } from "../components";

const Group = ({ group, moduleAction }) => {
  return (
    <Card cardTitle={group.label}>
      {group.fields.map((field, fieldIndex) => {
        return (
          <Field moduleAction={moduleAction} key={fieldIndex} field={field} />
        );
      })}
    </Card>
  );
};

export default Group;
