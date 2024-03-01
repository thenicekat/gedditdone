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

// src/components/drip.ts
var drip_exports = {};
__export(drip_exports, {
  drip: () => drip
});
module.exports = __toCommonJS(drip_exports);

// src/utils/tv.ts
var import_tailwind_variants = require("tailwind-variants");

// src/types.ts
var spacingScaleKeys = [
  "0",
  "xs",
  "sm",
  "md",
  "lg",
  "xl",
  "2xl",
  "3xl",
  "4xl",
  "5xl",
  "6xl",
  "7xl",
  "8xl",
  "9xl",
  "1",
  "2",
  "3",
  "3.5",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "20",
  "24",
  "28",
  "32",
  "36",
  "40",
  "44",
  "48",
  "52",
  "56",
  "60",
  "64",
  "72",
  "80",
  "96"
];
var mappedSpacingScaleKeys = spacingScaleKeys.map((key) => `unit-${key}`);

// src/utils/tv.ts
var COMMON_UNITS = ["small", "medium", "large"];
var tv = (options, config) => {
  var _a, _b, _c;
  return (0, import_tailwind_variants.tv)(options, {
    ...config,
    twMerge: (_a = config == null ? void 0 : config.twMerge) != null ? _a : true,
    twMergeConfig: {
      ...config == null ? void 0 : config.twMergeConfig,
      theme: {
        ...(_b = config == null ? void 0 : config.twMergeConfig) == null ? void 0 : _b.theme,
        opacity: ["disabled"],
        spacing: ["divider", "unit", ...mappedSpacingScaleKeys],
        borderWidth: COMMON_UNITS,
        borderRadius: COMMON_UNITS
      },
      classGroups: {
        ...(_c = config == null ? void 0 : config.twMergeConfig) == null ? void 0 : _c.classGroups,
        shadow: [{ shadow: COMMON_UNITS }],
        "font-size": [{ text: ["tiny", ...COMMON_UNITS] }],
        "bg-image": ["bg-stripe-gradient"],
        "min-w": [
          {
            "min-w": ["unit", ...mappedSpacingScaleKeys]
          }
        ],
        "min-h": [
          {
            "min-h": ["unit", ...mappedSpacingScaleKeys]
          }
        ]
      }
    }
  });
};

// src/components/drip.ts
var drip = tv({
  base: ["absolute", "will-change-transform", "bg-current", "rounded-full", "animate-drip-expand"]
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  drip
});
