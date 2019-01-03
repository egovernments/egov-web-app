import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Card } from "components";
import React from "react";
import "./index.css";

export const InboxData = ({ data }) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          {data.headers.map((item) => {
            return <TableCell className="inbox-data-table-headcell">{item}</TableCell>;
          })}
        </TableRow>
      </TableHead>
      <TableBody>
        {data.rows.map((row, i) => {
          return (
            <TableRow key={i} className="inbox-data-table-bodyrow">
              {row.map((item) => {
                if (item.subtext) {
                  return (
                    <TableCell className="inbox-data-table-bodycell">
                      <div className="inbox-cell-text">{item.text}</div>
                      <div className="inbox-cell-subtext">{item.subtext}</div>
                    </TableCell>
                  );
                } else if (item.badge) {
                  return (
                    <TableCell className="inbox-data-table-bodycell">
                      <span class="inbox-cell-badge-primary ">{item.text}</span>
                    </TableCell>
                  );
                } else {
                  return <TableCell className="inbox-data-table-bodycell">{item.text}</TableCell>;
                }
              })}
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export const Taskboard = ({ data }) => {
  return (
    <div>
      {data.map((item, i) => (
        <div className="col-sm-4">
          <Card
            className="inbox-card"
            key={i}
            textChildren={
              <div>
                <div className="head">{item.head}</div>
                <div className="body">{item.body}</div>
              </div>
            }
          />
        </div>
      ))}
    </div>
  );
};
