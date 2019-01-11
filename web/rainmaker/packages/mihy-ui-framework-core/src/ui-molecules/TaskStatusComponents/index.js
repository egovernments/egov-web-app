import React from "react";
import { Grid, Typography } from "@material-ui/core";
import {
  LabelContainer,
  DownloadFileContainer
} from "mihy-ui-framework/ui-containers";
import { convertEpochToDate } from "mihy-ui-framework/ui-config/screens/specs/utils";
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
    <Grid container={true} sm={12}>
      <Grid item sm={2} style={{ paddingRight: 20 }}>
        <Typography variant="caption">
          <LabelContainer labelName="Date" labelKey="TL_DATE_LABEL" />
        </Typography>
        <Typography variant="body2">
          <LabelContainer
            labelName={convertEpochToDate(
              get(currentStatus, "auditDetails.lastModifiedTime")
            )}
          />
        </Typography>
      </Grid>
      <Grid item sm={2} style={{ paddingRight: 20 }}>
        <Typography variant="caption">
          <LabelContainer
            labelName="Updated By"
            labelKey="TL_UPDATED_BY_LABEL"
          />
        </Typography>
        <Typography variant="body2">
          <LabelContainer labelName={get(currentStatus, "assigner.name")} />
        </Typography>
      </Grid>
      <Grid item sm={2} style={{ paddingRight: 20 }}>
        <Typography variant="caption">
          <LabelContainer
            labelName="Status"
            labelKey="TL_COMMON_TABLE_COL_STATUS"
          />
        </Typography>
        <Typography variant="body2">
          <LabelContainer labelName={get(currentStatus, "state.state")} />
        </Typography>
      </Grid>
      <Grid item sm={3} style={{ paddingRight: 20 }}>
        <Typography variant="caption">
          <LabelContainer
            labelName="Current Owner"
            labelKey="TL_CURRENT_OWNER_LABEL"
          />
        </Typography>
        <Typography variant="body2">
          <LabelContainer labelName={get(currentStatus, "assignee.name")} />
        </Typography>
      </Grid>
      <Grid item sm={3} style={{ paddingRight: 20 }}>
        <Typography variant="caption">
          <LabelContainer
            labelName="Comments"
            labelKey="TL_APPROVAL_CHECKLIST_COMMENTS_LABEL"
          />
        </Typography>
        <Typography variant="body2">
          <LabelContainer labelName={get(currentStatus, "comment")} />
        </Typography>
      </Grid>
      {get(currentStatus, "documents") && (
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
