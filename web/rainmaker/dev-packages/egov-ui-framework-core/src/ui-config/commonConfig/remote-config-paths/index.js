const remoteConfigPath = (moduleName, path, screenKey) => {
  let config = {};
  switch (moduleName) {
    case "egov-tradelicence":
      config = require(`egov-tradelicence/ui-config/screens/specs/${path}/${screenKey}`)
        .default;
      break;

    default:
      break;
  }
  return config;
};

export default remoteConfigPath;
