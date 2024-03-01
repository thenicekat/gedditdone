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

// src/components/breadcrumbs.ts
var breadcrumbs_exports = {};
__export(breadcrumbs_exports, {
  breadcrumbItem: () => breadcrumbItem,
  breadcrumbs: () => breadcrumbs
});
module.exports = __toCommonJS(breadcrumbs_exports);

// src/utils/classes.ts
var dataFocusVisibleClasses = [
  "outline-none",
  "data-[focus-visible=true]:z-10",
  "data-[focus-visible=true]:outline-2",
  "data-[focus-visible=true]:outline-focus",
  "data-[focus-visible=true]:outline-offset-2"
];

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

// src/components/breadcrumbs.ts
var breadcrumbItem = tv({
  slots: {
    base: "flex items-center",
    item: [
      "flex gap-1 items-center",
      "cursor-pointer",
      "whitespace-nowrap",
      "line-clamp-1",
      "outline-none",
      "tap-highlight-transparent",
      ...dataFocusVisibleClasses
    ],
    separator: "text-default-400 px-1"
  },
  variants: {
    color: {
      foreground: {
        item: "text-foreground/50",
        separator: "text-foreground/50"
      },
      primary: {
        item: "text-primary/80",
        separator: "text-primary/80"
      },
      secondary: {
        item: "text-secondary/80",
        separator: "text-secondary/80"
      },
      success: {
        item: "text-success/80",
        separator: "text-success/80"
      },
      warning: {
        item: "text-warning/80",
        separator: "text-warning/80"
      },
      danger: {
        item: "text-danger/80",
        separator: "text-danger/80"
      }
    },
    size: {
      sm: {
        item: "text-tiny"
      },
      md: {
        item: "text-small"
      },
      lg: {
        item: "text-medium"
      }
    },
    underline: {
      none: {
        item: "no-underline"
      },
      hover: {
        item: "hover:underline"
      },
      always: {
        item: "underline"
      },
      active: {
        item: "active:underline"
      },
      focus: {
        item: "focus:underline"
      }
    },
    isCurrent: {
      true: {
        item: "cursor-default"
      },
      false: {
        item: ["hover:opacity-80", "active:opacity-disabled"]
      }
    },
    isDisabled: {
      true: {
        item: "opacity-disabled pointer-events-none",
        separator: "opacity-disabled"
      }
    },
    disableAnimation: {
      false: {
        item: "transition-opacity"
      },
      true: {
        item: "transition-none"
      }
    }
  },
  defaultVariants: {
    size: "md",
    color: "foreground",
    underline: "hover",
    isDisabled: false,
    disableAnimation: false
  },
  compoundVariants: [
    {
      isCurrent: true,
      color: "foreground",
      class: {
        item: "text-foreground"
      }
    },
    {
      isCurrent: true,
      color: "primary",
      class: {
        item: "text-primary"
      }
    },
    {
      isCurrent: true,
      color: "secondary",
      class: {
        item: "text-secondary"
      }
    },
    {
      isCurrent: true,
      color: "success",
      class: {
        item: "text-success"
      }
    },
    {
      isCurrent: true,
      color: "warning",
      class: {
        item: "text-warning"
      }
    },
    {
      isCurrent: true,
      color: "danger",
      class: {
        item: "text-danger"
      }
    },
    {
      isCurrent: false,
      underline: "none",
      class: {
        item: "no-underline"
      }
    },
    {
      underline: ["hover", "always", "active", "focus"],
      class: "underline-offset-4"
    }
  ]
});
var breadcrumbs = tv({
  slots: {
    base: "",
    list: "flex flex-wrap list-none",
    ellipsis: "text-medium",
    separator: "text-default-400 px-1"
  },
  variants: {
    size: {
      sm: {},
      md: {},
      lg: {}
    },
    radius: {
      none: {
        list: "rounded-none"
      },
      sm: {
        list: "rounded-small"
      },
      md: {
        list: "rounded-medium"
      },
      lg: {
        list: "rounded-large"
      },
      full: {
        list: "rounded-full"
      }
    },
    variant: {
      solid: {
        list: "bg-default-100"
      },
      bordered: {
        list: "border-medium border-default-200 shadow-sm"
      },
      light: {}
    }
  },
  defaultVariants: {
    size: "md",
    radius: "sm",
    variant: "light"
  },
  compoundVariants: [
    {
      variant: ["solid", "bordered"],
      class: {
        list: "max-w-fit"
      }
    },
    {
      variant: ["solid", "bordered"],
      size: "sm",
      class: {
        list: "px-2 py-1"
      }
    },
    {
      variant: ["solid", "bordered"],
      size: "md",
      class: {
        list: "px-2.5 py-1.5"
      }
    },
    {
      variant: ["solid", "bordered"],
      size: "lg",
      class: {
        list: "px-3 py-2"
      }
    }
  ]
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  breadcrumbItem,
  breadcrumbs
});
