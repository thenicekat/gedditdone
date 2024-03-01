"use client";

// src/use-tabs.ts
import { mapPropsVariants } from "@nextui-org/system";
import { tabs } from "@nextui-org/theme";
import { useDOMRef } from "@nextui-org/react-utils";
import { clsx } from "@nextui-org/shared-utils";
import { filterDOMProps } from "@nextui-org/react-utils";
import { useMemo, useCallback } from "react";
import { useTabListState } from "@react-stately/tabs";
import { useTabList } from "@react-aria/tabs";
import { mergeProps } from "@react-aria/utils";
function useTabs(originalProps) {
  const [props, variantProps] = mapPropsVariants(originalProps, tabs.variantKeys);
  const {
    ref,
    as,
    className,
    classNames,
    children,
    disableCursorAnimation,
    shouldSelectOnPressUp = true,
    motionProps,
    ...otherProps
  } = props;
  const Component = as || "div";
  const shouldFilterDOMProps = typeof Component === "string";
  const domRef = useDOMRef(ref);
  const state = useTabListState({
    children,
    ...otherProps
  });
  const { tabListProps } = useTabList(otherProps, state, domRef);
  const slots = useMemo(
    () => tabs({
      ...variantProps,
      className
    }),
    [...Object.values(variantProps), className]
  );
  const baseStyles = clsx(classNames == null ? void 0 : classNames.base, className);
  const values = useMemo(
    () => ({
      state,
      slots,
      classNames,
      motionProps,
      listRef: domRef,
      shouldSelectOnPressUp,
      disableCursorAnimation,
      isDisabled: originalProps == null ? void 0 : originalProps.isDisabled,
      disableAnimation: originalProps == null ? void 0 : originalProps.disableAnimation
    }),
    [
      state,
      slots,
      domRef,
      motionProps,
      disableCursorAnimation,
      shouldSelectOnPressUp,
      originalProps == null ? void 0 : originalProps.disableAnimation,
      originalProps == null ? void 0 : originalProps.isDisabled,
      classNames
    ]
  );
  const getBaseProps = useCallback(
    (props2) => ({
      "data-slot": "base",
      className: slots.base({ class: clsx(baseStyles, props2 == null ? void 0 : props2.className) }),
      ...mergeProps(
        filterDOMProps(otherProps, {
          enabled: shouldFilterDOMProps
        }),
        props2
      )
    }),
    [baseStyles, otherProps, slots]
  );
  const getTabListProps = useCallback(
    (props2) => ({
      ref: domRef,
      "data-slot": "tabList",
      className: slots.tabList({ class: clsx(classNames == null ? void 0 : classNames.tabList, props2 == null ? void 0 : props2.className) }),
      ...mergeProps(tabListProps, props2)
    }),
    [domRef, tabListProps, classNames, slots]
  );
  return {
    Component,
    domRef,
    state,
    values,
    getBaseProps,
    getTabListProps
  };
}

export {
  useTabs
};
