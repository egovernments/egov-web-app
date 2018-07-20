import React from "react";
import { TableUi } from "components";
import { Card, Button, Label } from "components";

const columnData = [
  { id: "index", numeric: true, disablePadding: false, label: "S.No" },
  { id: "name", numeric: false, disablePadding: true, label: "Owner Name" },
  { id: "propertyId", numeric: false, disablePadding: false, label: "Property Tax Assessment ID" },
  { id: "oldPropertyId", numeric: false, disablePadding: false, label: "Old Property ID" },
  { id: "address", numeric: false, disablePadding: false, label: "Address" },
  { id: "action", numeric: false, disablePadding: false, label: "Action" },
];

const PropertyTable = ({ tableData }) => {
  return (
    <div className="form-without-button-cont-generic">
      <Card
        textChildren={
          <div>
            <Label
              label={"Property Search Result"}
              className="property-search-table-heading"
              labelStyle={{
                fontFamily: "Roboto",
                fontSize: "16px",
                fontWeight: 500,
                letterSpacing: "0px",
                textAlign: "left",
                color: "#484848",
              }}
            />
            <TableUi
              rowCheckBox={false}
              orderBy={"index"}
              columnData={columnData}
              rowData={tableData}
              ActionOnRow={<Button className={"search-table-assess-pay-btn"} label={"Assess & Pay"} />}
            />
          </div>
        }
      />
    </div>
  );
};

export default PropertyTable;
