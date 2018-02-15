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
export const search = (url, params) => {
  const response =  {
    "complaints": {
      "code": "com-1",
      "name": "Complaint 1",
      "details": "Waste Stinking",
      "category": {
        "type": "Waste/Garbage",
        "subtype": "Plastic Waste"
      },
      "reopened": false
    }
  }


  return new Promise((resolve, reject) => {
    resolve(response);
  });
};

export const apiForm = (url, params) => {
  const data = {
    countries: [{ code: "IND", name: "India" }, { code: "US", name: "USA" }],
    cities: [
      { code: "BLR", name: "Bangalore" },
      { code: "MYS", name: "Mysore" }
    ],
    area: ["HSR Layout"],
    complaintCategory: [
      { code: "C1", name: "Waste/Garbage" },
      { code: "C2", name: "Electricity" }
    ],
    complaintSubCategory: [
      { code: "CS1", name: "Medical Waste" },
      { code: "CS2", name: "Plastic Waste" }
    ]

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
