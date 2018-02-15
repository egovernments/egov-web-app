export const api = (url, params) => {
  const data = {
    countries: [{ key: "India", value: "India" }, { key: "USA", value: "USA" }],
    cities: []
    // cities: {
    //   India: [
    //     { key: "Bangalore", value: "Bangalore" },
    //     { key: "Delhi", value: "Delhi" }
    //   ],
    //   USA: [
    //     { key: "California", value: "California" },
    //     { key: "New York", value: "New York" }
    //   ]
    // }
  };

  return new Promise((resolve, reject) => {
    resolve(data[params]);
  });
};

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
      details: "Waste Stinking",
      category: {
        type: "Waste/Garbage",
        subtype: "Plastic Waste"
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
