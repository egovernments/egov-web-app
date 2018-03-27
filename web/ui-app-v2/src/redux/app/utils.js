export const transformLocalizationLabels = (localizationLabels) => {
  return localizationLabels.reduce((result, item) => {
    result[item.code] = {
      message: item.message,
      module: item.module,
      locale: item.locale,
    };
    return result;
  }, {});
};

export const initLocalizationLabels = () => {
  let localizationLabels;
  if ("localization" in window.localStorage) {
    localizationLabels = localStorage.getItem("localization");
    try {
      localizationLabels = JSON.parse(localizationLabels);
      localizationLabels = transformLocalizationLabels(localizationLabels);
    } catch (error) {
      localizationLabels = {};
    }
  }
  return localizationLabels;
};
