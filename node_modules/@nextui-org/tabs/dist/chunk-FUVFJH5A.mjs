"use client";

// src/tab-panel.tsx
import { forwardRef } from "@nextui-org/system";
import { useDOMRef } from "@nextui-org/react-utils";
import { clsx } from "@nextui-org/shared-utils";
import { mergeProps } from "@react-aria/utils";
import { useTabPanel } from "@react-aria/tabs";
import { useFocusRing } from "@react-aria/focus";
import { jsx } from "react/jsx-runtime";
var TabPanel = forwardRef((props, ref) => {
  var _a, _b, _c;
  const { as, state, className, slots, classNames, ...otherProps } = props;
  const Component = as || "div";
  const domRef = useDOMRef(ref);
  const { tabPanelProps } = useTabPanel(props, state, domRef);
  const { focusProps, isFocused, isFocusVisible } = useFocusRing();
  const selectedItem = state.selectedItem;
  const content = (_a = selectedItem == null ? void 0 : selectedItem.props) == null ? void 0 : _a.children;
  const tabPanelStyles = clsx(classNames == null ? void 0 : classNames.panel, className, (_b = selectedItem == null ? void 0 : selectedItem.props) == null ? void 0 : _b.className);
  if (!content) {
    return null;
  }
  return /* @__PURE__ */ jsx(
    Component,
    {
      ref: domRef,
      "data-focus": isFocused,
      "data-focus-visible": isFocusVisible,
      ...mergeProps(tabPanelProps, focusProps, otherProps),
      className: (_c = slots.panel) == null ? void 0 : _c.call(slots, { class: tabPanelStyles }),
      "data-slot": "panel",
      children: content
    }
  );
});
TabPanel.displayName = "NextUI.TabPanel";
var tab_panel_default = TabPanel;

export {
  tab_panel_default
};
