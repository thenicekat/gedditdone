// src/provider.tsx
import { I18nProvider } from "@react-aria/i18n";
import { RouterProvider } from "@react-aria/utils";
import { OverlayProvider } from "@react-aria/overlays";
import { jsx } from "react/jsx-runtime";
var NextUIProvider = ({
  children,
  locale = "en-US",
  navigate,
  ...otherProps
}) => {
  let contents = children;
  if (navigate) {
    contents = /* @__PURE__ */ jsx(RouterProvider, { navigate, children: contents });
  }
  return /* @__PURE__ */ jsx(I18nProvider, { locale, children: /* @__PURE__ */ jsx(OverlayProvider, { ...otherProps, children: contents }) });
};

export {
  NextUIProvider
};
