export const checkStatus = (res) => {
  if (res.status !== 200) {
    throw res;
  }
  return res;
};

// Process elastic search responses to the below format
// {count:121321,aggregations:{}}
export const processElasticResponse = (res, baseQueries) => {
  const { responses } = res.data;

  const parsedResponse = {};
  baseQueries.forEach((ele, index) => {
    const { query } = ele;
    const output = {};
    if (Object.hasOwnProperty.call(query, 'size')) {
      output.count = responses[index].hits.total;
      if (query.size > 0) output.elements = responses[index].hits.hits;
    }
    if (Object.hasOwnProperty.call(query, 'aggs')) {
      output.aggregations = responses[index].aggregations[Object.keys(query.aggs)[0]].buckets;
    }

    parsedResponse[ele.name] = output;
  });
  return parsedResponse;
};
