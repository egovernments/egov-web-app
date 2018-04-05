export const getComplaintTypeData = (categories) => {
  const groupedArr = groupSimilarCategory(Object.values(categories));
  var categoryList = [];
  categoryList = formCategories(groupedArr, categoryList);
  return categoryList;
};

const formCategories = (groupedArr, categoryList) => {
  groupedArr.map((item, index) => {
    var categoryObj = {
      id: index,
      text: item[0].keywords,
      nestedItems: [],
    };
    item.map((i, ind) => {
      var subCategoryObj = {
        id: i.serviceCode,
        text: i.serviceName,
        icon: { action: "custom", name: "accumulation-of-litter" },
      };
      categoryObj.nestedItems.push(subCategoryObj);
    });
    categoryList.push(categoryObj);
  });
  return categoryList;
};

const groupSimilarCategory = (categories) => {
  return groupBy(categories, "keywords");
};

const groupBy = (collection, property) => {
  var i = 0,
    val,
    index,
    values = [],
    result = [];
  for (; i < collection.length; i++) {
    val = collection[i][property];
    index = values.indexOf(val);
    if (index > -1) result[index].push(collection[i]);
    else {
      values.push(val);
      result.push([collection[i]]);
    }
  }
  return result;
};
