import { As, RightJoinProps, PropsOf, InternalForwardRefRenderFunction } from './types.js';
import * as React from 'react';
import clsx from 'clsx';

declare function forwardRef<Component extends As, Props extends object, OmitKeys extends keyof any = never>(component: React.ForwardRefRenderFunction<any, RightJoinProps<PropsOf<Component>, Props> & {
    as?: As;
}>): InternalForwardRefRenderFunction<Component, Props, OmitKeys>;
declare const toIterator: (obj: any) => any;
declare const mapPropsVariants: <T extends Record<string, any>, K extends keyof T>(props: T, variantKeys?: K[] | undefined, removeVariantProps?: boolean) => readonly [T | Omit<T, K>, {} | Pick<T, K>];
declare const mapPropsVariantsWithCommon: <P extends Record<any, any>, VK extends keyof P, CK extends keyof P = never>(originalProps: P, variantKeys: VK[], commonKeys?: CK[] | undefined) => readonly [Omit<P, Exclude<VK, CK>>, Pick<P, VK>];
/**
 * Classnames utility
 */
declare const cn: typeof clsx;

export { cn, forwardRef, mapPropsVariants, mapPropsVariantsWithCommon, toIterator };
