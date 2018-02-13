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
    resolve(message);
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
    cities: [{ code: "BLR", name: "Bangalore" }, { code: "MYS", name: "Mysore" }]
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

