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

// src/components/image.ts
var image_exports = {};
__export(image_exports, {
  image: () => image
});
module.exports = __toCommonJS(image_exports);

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

// src/components/image.ts
var image = tv({
  slots: {
    wrapper: "relative shadow-black/5",
    zoomedWrapper: "relative overflow-hidden rounded-inherit",
    img: "relative z-10 opacity-0 shadow-black/5 data-[loaded=true]:opacity-100",
    blurredImg: [
      "absolute",
      "z-0",
      "inset-0",
      "w-full",
      "h-full",
      "object-cover",
      "filter",
      "blur-lg",
      "scale-105",
      "saturate-150",
      "opacity-30",
      "translate-y-1"
    ]
  },
  variants: {
    radius: {
      none: {},
      sm: {},
      md: {},
      lg: {},
      full: {}
    },
    shadow: {
      none: {
        wrapper: "shadow-none",
        img: "shadow-none"
      },
      sm: {
        wrapper: "shadow-small",
        img: "shadow-small"
      },
      md: {
        wrapper: "shadow-medium",
        img: "shadow-medium"
      },
      lg: {
        wrapper: "shadow-large",
        img: "shadow-large"
      }
    },
    isZoomed: {
      true: {
        img: ["object-cover", "transform", "hover:scale-125"]
      }
    },
    showSkeleton: {
      true: {
        wrapper: [
          "group",
          "relative",
          "overflow-hidden",
          "bg-content3 dark:bg-content2",
          "before:opacity-100",
          "before:absolute",
          "before:inset-0",
          "before:-translate-x-full",
          "before:animate-[shimmer_2s_infinite]",
          "before:border-t",
          "before:border-content4/30",
          "before:bg-gradient-to-r",
          "before:from-transparent",
          "before:via-content4",
          "dark:before:via-default-700/10",
          "before:to-transparent",
          "after:opacity-100",
          "after:absolute",
          "after:inset-0",
          "after:-z-10",
          "after:bg-content3",
          "dark:after:bg-content2"
        ],
        img: "opacity-0"
      }
    },
    disableAnimation: {
      true: {
        img: "transition-none"
      },
      false: {
        img: "transition-transform-opacity motion-reduce:transition-none !duration-300"
      }
    }
  },
  defaultVariants: {
    radius: "lg",
    shadow: "none",
    isZoomed: false,
    isBlurred: false,
    showSkeleton: false,
    disableAnimation: false
  },
  compoundSlots: [
    {
      slots: ["wrapper", "img", "blurredImg", "zoomedWrapper"],
      radius: "none",
      class: "rounded-none"
    },
    {
      slots: ["wrapper", "img", "blurredImg", "zoomedWrapper"],
      radius: "full",
      class: "rounded-full"
    },
    {
      slots: ["wrapper", "img", "blurredImg", "zoomedWrapper"],
      radius: "sm",
      class: "rounded-small"
    },
    {
      slots: ["wrapper", "img", "blurredImg", "zoomedWrapper"],
      radius: "md",
      class: "rounded-md"
    },
    {
      slots: ["wrapper", "img", "blurredImg", "zoomedWrapper"],
      radius: "lg",
      class: "rounded-large"
    }
  ]
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  image
});
