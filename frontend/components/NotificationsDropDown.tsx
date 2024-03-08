"use client"
import {
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownSection,
    DropdownTrigger,
} from "@nextui-org/dropdown";
import React from "react";
import { NotificationIcon } from "./icons";
import { NavbarItem } from "@nextui-org/navbar";

export const NotificationsDropdown = () => {
    return (
        <Dropdown placement="bottom-end">

            <DropdownTrigger>
                <NavbarItem>
                    <NotificationIcon newNotifications={true} />
                </NavbarItem>
            </DropdownTrigger>

            <DropdownMenu className="w-80" aria-label="Notifications">
                <DropdownSection title="Notifications">
                    <DropdownItem
                        classNames={{
                            base: "py-2",
                            title: "text-base font-semibold",
                        }}
                        key="1"
                        description="Sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim."
                    >
                        📣 Edit your information
                    </DropdownItem>

                    <DropdownItem
                        key="2"
                        classNames={{
                            base: "py-2",
                            title: "text-base font-semibold",
                        }}
                        description="Sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim."
                    >
                        🚀 Say goodbye to paper receipts!
                    </DropdownItem>

                    <DropdownItem
                        key="3"
                        classNames={{
                            base: "py-2",
                            title: "text-base font-semibold",
                        }}
                        description="Sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim."
                    >
                        📣 Edit your information
                    </DropdownItem>
                </DropdownSection>
            </DropdownMenu>
        </Dropdown>
    );
};