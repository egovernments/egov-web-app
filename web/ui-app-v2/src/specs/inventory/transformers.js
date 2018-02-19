import _ from "lodash";

const pgrTransfomer = data => {
  const fieldJsonPath = "stores[0].active";
  let complaintsReopened = _.get(data, fieldJsonPath);
  complaintsReopened =
    complaintsReopened === "yes"
      ? true
      : complaintsReopened === "false" ? false : complaintsReopened;
  _.set(data, fieldJsonPath, complaintsReopened);
};

const pgrReverseTransformer = data => {
  const fieldJsonPath = "stores[0].active";
  let complaintsReopened = _.get(data, fieldJsonPath);
  complaintsReopened =
    complaintsReopened == true
      ? "Yes"
      : complaintsReopened == false ? "No" : complaintsReopened;
  _.set(data, fieldJsonPath, complaintsReopened);
};

const transformers = {
  VToBModelTransform: [pgrTransfomer],
  BToVModelTransform: [pgrReverseTransformer]
};

export default transformers;
