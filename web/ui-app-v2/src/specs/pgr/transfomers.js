import _ from "lodash";

const pgrTransfomer = data => {
  const fieldJsonPath = "nested.inner.canCode";
  let canCode = _.get(data, fieldJsonPath);
  canCode = canCode === "yes" ? true : canCode === "false" ? false : canCode;
  _.set(data, fieldJsonPath, canCode);
};

const pgrReverseTransformer = data => {
  const fieldJsonPath = "nested.inner.canCode";
  let canCode = _.get(data, fieldJsonPath);
  canCode = canCode == true ? "yes" : canCode == false ? "no" : canCode;
  _.set(data, fieldJsonPath, canCode);
};

const transformers = {
  BToVModelTransform: [pgrTransfomer],
  VToBModelTransform: [pgrReverseTransformer]
};

export default transformers;
