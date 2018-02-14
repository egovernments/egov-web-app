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
  return new Promise((resolve, reject) => {
    params["location"]["code"] = "abcd1234";
    resolve(params);
  });
};

export const search = (url, params) => {
  const response = {
    name: "Varun",
    country: "India",
    canCode: "yes"
  };

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
      { code: "C1", name: "Complaint Type 1" },
      { code: "C2", name: "Complaint Type 2" }
    ],
    complaintSubCategory: [
      { code: "CS1", name: "Complaint SubType 1" },
      { code: "CS2", name: "Complaint SubType 2" }
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
