const api = (url, params) => {
  const data = {
    countries: [{ key: "India", value: "India" }, { key: "USA", value: "USA" }],
    cities: {
      India: [
        { key: "Bangalore", value: "Bangalore" },
        { key: "Delhi", value: "Delhi" }
      ],
      USA: [
        { key: "California", value: "California" },
        { key: "New York", value: "New York" }
      ]
    }
  };

  return new Promise((resolve, reject) => {
    resolve(data[params]);
  });
};

export default api;
