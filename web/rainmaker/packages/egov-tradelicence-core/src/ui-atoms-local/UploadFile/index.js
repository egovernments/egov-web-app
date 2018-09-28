import React from "react";
import Button from "@material-ui/core/Button";

const UploadFile = props => {
  const { classes, handleFileUpload, buttonProps, inputProps } = props;
  return (
    <div>
      <input
        accept="image/*"
        className={classes.input}
        id="contained-button-file"
        multiple
        type="file"
        onChange={handleFileUpload}
        {...inputProps}
      />
      <label htmlFor="contained-button-file">
        <Button component="span" className={classes.button} {...buttonProps}>
          UPLOAD FILE
        </Button>
      </label>
    </div>
  );
};

export default UploadFile;
