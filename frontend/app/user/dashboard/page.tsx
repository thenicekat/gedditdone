"use client"
import UpdateProfile from "./tabs/UpdateProfile";
import MyPosts from "./tabs/MyPosts";
import { Tab, Tabs } from "@nextui-org/tabs";
import { UserIcon, ArchiveBoxIcon, BookmarkIcon } from "@heroicons/react/24/solid";
import SentRequests from "./tabs/SentRequests";

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
              <BookmarkIcon className="h-5 w-5" />
              <span>My Posts</span>
            </div>
          }
        >
          <MyPosts />
        </Tab>

        <Tab
          key="sentrequests"
          title={
            <div className="flex items-center space-x-2">
              <ArchiveBoxIcon className="h-5 w-5" />
              <span>Sent Requests</span>
            </div>
          }
        >
          <SentRequests />
        </Tab>
      </Tabs>
    </>
  );
}
