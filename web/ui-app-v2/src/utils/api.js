export const postData = (url, params) => {
  const message = `Data posted to ${url} with ${JSON.stringify(params)}`;
  console.log(message);
  return new Promise((resolve, reject) => {
    params["complaints"]["code"] = "com-1";
    resolve(params);
  });
};

// do a reverse transformation
export const searchApi = (url, params) => {
  const response = {
    complaints: {
      code: "com-1",
      name: "Complaint 1",
      details: "Waste Thrown Around",
      category: {
        type: "C1",
        subtype: "CS2"
      },
      reopened: false
    }
  };

  return new Promise((resolve, reject) => {
    resolve(response);
  });
};

export const apiForm = (url, params) => {
  let data;

  switch (url) {
    case "http://somedatasource.com/category":
      data = [
        { code: "C1", name: "Waste/Garbage" },
        { code: "C2", name: "Electricity" }
      ];
      break;
    case "http://somedatasource.com/category?categoryType=C1":
      data = [
        { code: "CS1", name: "Medical Waste" },
        { code: "CS2", name: "Solid Waste" }
      ];
      break;
    case "http://somedatasource.com/category?categoryType=C2":
      data = [
        { code: "CS3", name: "Radioactive Waste" },
        { code: "CS4", name: "Nuclear Waste" }
      ];
      break;
    default:
      break;
  }

  return new Promise((resolve, reject) => {
    resolve(data);
  });
};
