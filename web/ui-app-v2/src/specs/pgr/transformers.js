import _ from "lodash";

const pgrTransfomer = data => {
  const fieldJsonPath = "complaints.reopened";
  let canCode = _.get(data, fieldJsonPath);
  canCode = canCode === "yes" ? true : canCode === "false" ? false : canCode;
  _.set(data, fieldJsonPath, canCode);
};

const pgrReverseTransformer = data => {
  const fieldJsonPath = "complaints.reopened";
  let canCode = _.get(data, fieldJsonPath);
  canCode = canCode == true ? "yes" : canCode == false ? "no" : canCode;
  _.set(data, fieldJsonPath, canCode);
};

const transformers = {
  VToBModelTransform: [pgrTransfomer],
  BToVModelTransform: [pgrReverseTransformer]
};

export default transformers;
