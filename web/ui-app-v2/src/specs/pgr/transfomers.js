const pgrTransfomer = data => {
  const clonedData = Object.assign(data);
  if (clonedData["canCode"] == "yes") {
    clonedData["canCode"] = true;
  } else {
    clonedData["canCode"] = false;
  }
  return clonedData;
};

const pgrReverseTransformer = data => {
  const clonedData = Object.assign(data);

  if (clonedData["canCode"] == true) {
    clonedData["canCode"] = "yes";
  } else {
    clonedData["canCode"] = "no";
  }
  return clonedData;
};

const transformers = {
  BToVModelTransform: [pgrTransfomer],
  VToBModelTransform: [pgrReverseTransformer]
};

export default transformers;
