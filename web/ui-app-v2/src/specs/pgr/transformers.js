import _ from "lodash";

const pgrTransfomer = data => {
  const fieldJsonPath = "complaints.reopened";
  let complaintsReopened = _.get(data, fieldJsonPath);
  complaintsReopened =
    complaintsReopened === "yes"
      ? true
      : complaintsReopened === "false" ? false : complaintsReopened;
  _.set(data, fieldJsonPath, complaintsReopened);
};

const pgrReverseTransformer = data => {
  const fieldJsonPath = "complaints.reopened";
  let complaintsReopened = _.get(data, fieldJsonPath);
  complaintsReopened =
    complaintsReopened == true
      ? "yes"
      : complaintsReopened == false ? "no" : complaintsReopened;
  _.set(data, fieldJsonPath, complaintsReopened);
};

const transformers = {
  VToBModelTransform: [pgrTransfomer],
  BToVModelTransform: [pgrReverseTransformer]
};

export default transformers;
