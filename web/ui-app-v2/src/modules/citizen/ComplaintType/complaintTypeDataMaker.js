import complaintsDataSet from "./complaintsDataSet";
import set from "lodash/set";

export const getComplaintTypeData = (categories) => {
  var categoryList = getAllServeceDefsInObj(categories);
  var nestedCategoryList = getNestedObjFormat(categoryList, complaintsDataSet.categoryTypes);
  return nestedCategoryList;
};

const getNestedObjFormat = (categoryList, categoryTypes) => {
  categoryList.map((item) => {
    var index = categoryTypes.dataSet.findIndex((x) => x.id === item.parent);
    if (index > -1) {
      var jP = item.jsonPath.replace(item.jsonPath.split(".")[0], `dataSet[${index}]`);
      set(categoryTypes, jP, item);
    } else {
      categoryTypes.dataSet.push(item);
    }
  });
  return categoryTypes.dataSet;
};

const formJsonPath = (menuPath) => {
  var jsonPath = menuPath.split("[")[0];
  if (menuPath.length > 0) {
    var indexArr = menuPath.match(/\[.*?\]/g);
    indexArr.length &&
      indexArr.map((ind) => {
        jsonPath = jsonPath + ".nestedItems" + ind;
      });
  }
  return jsonPath;
};

const getAllServeceDefsInObj = (categories) => {
  var categoryList = [];
  Object.values(categories).map((item, index) => {
    var catObj = {
      id: item.serviceCode,
      text: item.serviceCode,
      nestedItems: [],
      icon: { action: "custom", name: "accumulation-of-litter" },
      parent: item.menuPath.split("[").shift(),
      jsonPath: formJsonPath(item.menuPath),
    };
    categoryList.push(catObj);
  });
  return categoryList;
};
