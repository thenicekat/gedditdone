"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/utils.ts
var utils_exports = {};
__export(utils_exports, {
  cn: () => cn,
  forwardRef: () => forwardRef,
  mapPropsVariants: () => mapPropsVariants,
  mapPropsVariantsWithCommon: () => mapPropsVariantsWithCommon,
  toIterator: () => toIterator
});
module.exports = __toCommonJS(utils_exports);
var import_clsx = __toESM(require("clsx"));
var import_react = require("react");
function forwardRef(component) {
  return (0, import_react.forwardRef)(component);
}
var toIterator = (obj) => {
  return {
    ...obj,
    [Symbol.iterator]: function() {
      const keys = Object.keys(this);
      let index = 0;
      return {
        next: () => {
          if (index >= keys.length) {
            return { done: true };
          }
          const key = keys[index];
          const value = this[key];
          index++;
          return { value: { key, value }, done: false };
        }
      };
    }
  };
};
var mapPropsVariants = (props, variantKeys, removeVariantProps = true) => {
  if (!variantKeys) {
    return [props, {}];
  }
  const picked = variantKeys.reduce((acc, key) => {
    if (key in props) {
      return { ...acc, [key]: props[key] };
    } else {
      return acc;
    }
  }, {});
  if (removeVariantProps) {
    const omitted = Object.keys(props).filter((key) => !variantKeys.includes(key)).reduce((acc, key) => ({ ...acc, [key]: props[key] }), {});
    return [omitted, picked];
  } else {
    return [props, picked];
  }
};
var mapPropsVariantsWithCommon = (originalProps, variantKeys, commonKeys) => {
  const props = Object.keys(originalProps).filter((key) => !variantKeys.includes(key) || (commonKeys == null ? void 0 : commonKeys.includes(key))).reduce((acc, key) => ({ ...acc, [key]: originalProps[key] }), {});
  const variants = variantKeys.reduce(
    (acc, key) => ({ ...acc, [key]: originalProps[key] }),
    {}
  );
  return [props, variants];
};
var cn = import_clsx.default;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  cn,
  forwardRef,
  mapPropsVariants,
  mapPropsVariantsWithCommon,
  toIterator
});
