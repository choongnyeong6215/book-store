import _ from "lodash";

interface IObjectLiteral {
    [key: string]: any;
}

export const snakeToCamel =(obj: IObjectLiteral): any => {
  if (_.isArray(obj)) {
    return obj.map((v) => snakeToCamel(v));
  }
  if (_.isObject(obj)) {
    return _.mapValues(
      _.mapKeys(obj, (v, k) => _.camelCase(k)),
      (v) => snakeToCamel(v),
    );
  }
  return obj;
}