import * as _nextui_org_system from '@nextui-org/system';
import { HTMLNextUIProps } from '@nextui-org/system';
import { AriaTabPanelProps } from '@react-aria/tabs';
import { ValuesType } from './use-tabs.js';
import '@nextui-org/theme';
import '@nextui-org/react-utils';
import 'react';
import '@react-stately/tabs';
import '@nextui-org/aria-utils';
import 'framer-motion';

interface Props extends HTMLNextUIProps<"div"> {
    /**
     * The tab list state.
     */
    state: ValuesType["state"];
    /**
     * Component slots classes
     */
    slots: ValuesType["slots"];
    /**
     * User custom classnames
     */
    classNames?: ValuesType["classNames"];
}
type TabPanelProps = Props & AriaTabPanelProps;
/**
 * @internal
 */
declare const TabPanel: _nextui_org_system.InternalForwardRefRenderFunction<"div", TabPanelProps, never>;

export { TabPanelProps, TabPanel as default };
