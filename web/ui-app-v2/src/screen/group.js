import React from "react";
import Field from "./field";
import {Card} from "../components";

const Group = ({ group }) => {
  return (
    <Card cardTitle = {group.label}>
     {
      group.fields.map((field, fieldIndex) => {
         return <Field key={fieldIndex} field={field} />
      })}
    </Card>
  );
};

export default Group;

