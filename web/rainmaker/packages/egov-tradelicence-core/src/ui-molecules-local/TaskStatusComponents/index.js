import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { LabelContainer } from "mihy-ui-framework/ui-containers";
import DownloadFileContainer from "../../ui-containers-local/DownloadFileContainer";
import { convertEpochToDate } from "ui-config/screens/specs/utils";
import get from "lodash/get";

const data = [
  {
    name: "Aadharcarg.pdf",
    title: "Proof of identity",
    linkText: "View",
    link: ""
  },
  {
    name: "Pan.pdf",
    title: "Proof of identity",
    linkText: "View",
    link: ""
  }
];

const TaskStatusComponents = ({ currentStatus }) => {
  return (
    <Grid container={true} sm={12} style={{ marginLeft: 10 }}>
      <Grid item sm={2}>
        <Typography variant="caption">
          <LabelContainer labelName="Date" />
        </Typography>
        <Typography variant="body2">
          <LabelContainer
            labelName={convertEpochToDate(
              get(currentStatus, "auditDetails.lastModifiedTime")
            )}
          />
        </Typography>
      </Grid>
      <Grid item sm={2}>
        <Typography variant="caption">
          <LabelContainer labelName="Updated By" />
        </Typography>
        <Typography variant="body2">
          <LabelContainer labelName={get(currentStatus, "assigner.name")} />
        </Typography>
      </Grid>
      <Grid item sm={2}>
        <Typography variant="caption">
          <LabelContainer labelName="Status" />
        </Typography>
        <Typography variant="body2">
          <LabelContainer labelName={get(currentStatus, "state.state")} />
        </Typography>
      </Grid>
      <Grid item sm={3}>
        <Typography variant="caption">
          <LabelContainer labelName="Current Owner" />
        </Typography>
        <Typography variant="body2">
          <LabelContainer labelName={get(currentStatus, "assignee.name")} />
        </Typography>
      </Grid>
      <Grid item sm={3}>
        <Typography variant="caption">
          <LabelContainer labelName="Comments" />
        </Typography>
        <Typography variant="body2">
          <LabelContainer labelName={get(currentStatus, "comment")} />
        </Typography>
      </Grid>
      {get(currentStatus, "comment") && (
        <DownloadFileContainer
          documentData={data}
          className="review-documents"
          backgroundGrey={true}
        />
      )}
    </Grid>
  );
};

export default TaskStatusComponents;
