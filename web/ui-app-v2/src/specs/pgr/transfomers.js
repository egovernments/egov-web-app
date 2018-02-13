const pgrTransfomer = data => {
  const clonedData = Object.assign(data);
  clonedData["property"] = "some property";
  return clonedData;
};

const pgrReverseTransformer = data => {
  const clonedData = Object.assign(data);
  clonedData["property1"] = "some property 1";
  return clonedData;
};

const transformers = {
  BToVModelTransform: [pgrTransfomer],
  VToBModelTransform: [pgrReverseTransformer]
};

export default transformers;
