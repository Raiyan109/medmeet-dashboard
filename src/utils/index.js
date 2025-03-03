const assetBaseUrl = "http://192.168.10.99:5010";
export const getAssetUrl = (pathName) => {
  return `${assetBaseUrl}${pathName}`;
};
