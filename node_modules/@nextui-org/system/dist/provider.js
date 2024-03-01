"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/provider.tsx
var provider_exports = {};
__export(provider_exports, {
  NextUIProvider: () => NextUIProvider
});
module.exports = __toCommonJS(provider_exports);
var import_i18n = require("@react-aria/i18n");
var import_utils = require("@react-aria/utils");
var import_overlays = require("@react-aria/overlays");
var import_jsx_runtime = require("react/jsx-runtime");
var NextUIProvider = ({
  children,
  locale = "en-US",
  navigate,
  ...otherProps
}) => {
  let contents = children;
  if (navigate) {
    contents = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_utils.RouterProvider, { navigate, children: contents });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_i18n.I18nProvider, { locale, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_overlays.OverlayProvider, { ...otherProps, children: contents }) });
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  NextUIProvider
});
