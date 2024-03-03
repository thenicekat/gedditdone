"use client"
import UpdateProfile from "./UpdateProfile";
import Transactions from "./Transactions";
import { Tab, Tabs } from "@nextui-org/tabs";
import { BanknotesIcon, UserIcon } from "@heroicons/react/24/solid";

type UserProfile = {
  name: string;
  email: string;
  phoneNumber: string;
};

export default function UserProfile() {
  return (
    <>
      <Tabs
        className="flex justify-center p-2"
        aria-label="Options" color="primary" variant="bordered">
        <Tab
          key="profile"
          title={
            <div className="flex items-center space-x-2">
              <UserIcon className="h-5 w-5" />
              <span>Profile</span>
            </div>
          }
        >
          <UpdateProfile />
        </Tab>

        <Tab
          key="myposts"
          title={
            <div className="flex items-center space-x-2">
              <BanknotesIcon className="h-5 w-5" />
              <span>Transactions</span>
            </div>
          }
        >
          <Transactions />
        </Tab>
      </Tabs>
    </>
  );
}
