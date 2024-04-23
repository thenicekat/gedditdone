"use client"
import { Switch } from "@nextui-org/switch";
import { Button } from "@nextui-org/button"
import axios from "axios";
import React, { useEffect, useState } from 'react';
import { Post, User } from '@/types'
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/table'
import { siteConfig } from "@/config/site";
import { title } from "@/components/primitives";
import { Card, CardBody } from "@nextui-org/card";
import { CubeIcon, FlagIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { HttpCodes } from "@/types/HttpCodes";
import { set } from "react-hook-form";

axios.defaults.withCredentials = true;

const AdminHomepage = () => {
  const [amLoggedIn, setAmLoggedIn] = useState<boolean>(false);

  const [users, setUsers] = useState<User[] | never[]>([]);
  const [posts, setPosts] = useState<Post[] | never[]>([]);
  const [error, setError] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(true);
  const [message, setMessage] = useState<string>("");

  const fetchUsers = async () => {
    try {
      const response = await axios.get(siteConfig.server_url + '/admin/allusers');
      if (response.status == HttpCodes.UNAUTHORIZED) {
        window.location.href = "/";
        return;
      }
      setUsers(response.data.data);
      setLoading(false);
    } catch (error: any) {
      setError(error.response.data.message || "Error occured");
      setLoading(false);
    }
  };

  const fetchPosts = async () => {
    axios.get(siteConfig.server_url + "/admin/allposts")
      .then((res) => {
        if (res.status == HttpCodes.UNAUTHORIZED) {
          window.location.href = "/";
        }

        if (res.status == HttpCodes.OK) {
          setAmLoggedIn(true);
          setPosts(res.data.data);
        } else if (res.status == HttpCodes.INTERNAL_SERVER_ERROR) {
          console.error(res.data.message);
        }
      })
      .catch((err) => {
        console.error(err);
      })
  }

  useEffect(() => {
    fetchUsers();
    fetchPosts();
  }, []);

  const banUser = async (usermail: string) => {
    setMessage("Loading...")
    try {
      const response = await axios.put(siteConfig.server_url + `/admin/ban/${usermail}`);
      if (response.status == HttpCodes.UNAUTHORIZED) {
        window.location.href = "/";
        return;
      }
      setMessage(response.data.message);
      fetchUsers()
    } catch (error: any) {
      setError(error.response.data.message || "Error occured");
      setMessage("")
    }
  }

  const changeUserRole = async (usermail: string, admin: boolean) => {
    setMessage("Loading...")
    try {
      if (admin) {
        await axios.put(siteConfig.server_url + `/admin/promote/${usermail}`);
        setMessage("User promoted to admin role")
        // Refresh users list after promoting
        const response = await axios.get(siteConfig.server_url + '/admin/');
        if (response.status == HttpCodes.UNAUTHORIZED) {
          window.location.href = "/";
          return;
        }
        setUsers(response.data.data);
      }
      else {
        await axios.put(siteConfig.server_url + `/admin/demote/${usermail}`);
        setMessage("User demoted to default role")
        // Refresh users list after promoting
        const response = await axios.get(siteConfig.server_url + '/admin/');
        if (response.status == HttpCodes.UNAUTHORIZED) {
          window.location.href = "/";
          return;
        }
        setUsers(response.data.data);
      }
    } catch (error: any) {
      setError(error.response.data.message || "error occured");
      setMessage("")
    }
  }

  return (
    <div>
      <h1 className={title()}>Admin Home</h1>

      <Link href={'/'}><h2 className="md:mx-2 my-2 text-lg underline">Go to dashboard</h2></Link>

      <div className="md:flex">

        {/* Users Card */}
        <Card className="md:mx-2 my-2 xl:max-w-sm bg-primary rounded-xl shadow-md p-3 w-full">
          <CardBody className="py-5">
            <div className="flex gap-2.5">
              <UserCircleIcon className="w-6 h-6" />
              <div className="flex flex-col">
                <span className="text-white">Number of Users</span>
              </div>
            </div>
            <div className="flex gap-2.5 py-2 items-center">
              <span className="text-white text-xl font-semibold">{users.length}</span>
            </div>

            <div className="flex items-center gap-6">
              <div>
                <div>
                  <span className="text-xs text-white">{users.filter(user => user.role == "user").length}</span>
                </div>
                <span className="text-white text-xs">Default</span>
              </div>
              <div>
                <div>
                  <span className="text-xs text-white">{users.filter(user => user.role == "admin").length}</span>
                </div>
                <span className="text-white text-xs">Admins</span>
              </div>
              <div>
                <div>
                  <span className="text-xs text-white">{users.filter(user => user.role == "banned").length}</span>
                </div>
                <span className="text-white text-xs">Banned</span>
              </div>
            </div>

          </CardBody>
        </Card>

        {/* Reports Card */}
        <Card className="md:mx-2 my-2 xl:max-w-sm bg-secondary rounded-xl shadow-md p-3 w-full">
          <CardBody className="py-5">
            <div className="flex gap-2.5">
              <FlagIcon className="w-6 h-6" />
              <div className="flex flex-col">
                <span className="text-white">Number of Reports</span>
              </div>
            </div>
            <div className="flex gap-2.5 py-2 items-center">
              <span className="text-white text-xl font-semibold">{users.length}</span>
            </div>

            <div className="flex items-center gap-6">
              <div>
                <div>
                  <span className="text-xs text-white">{users.filter(user => user.role == "user").length}</span>
                </div>
                <span className="text-white text-xs">Pending</span>
              </div>
              <div>
                <div>
                  <span className="text-xs text-white">{users.filter(user => user.role == "admin").length}</span>
                </div>
                <span className="text-white text-xs">Completed</span>
              </div>
              <div>
                <div>
                  <span className="text-xs text-white">{users.filter(user => user.role == "banned").length}</span>
                </div>
                <span className="text-white text-xs">Irrelevant</span>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Posts Card */}
        <Card className="md:mx-2 my-2 xl:max-w-sm bg-red-400 rounded-xl shadow-md p-3 w-full">
          <CardBody className="py-5">
            <div className="flex gap-2.5">
              <CubeIcon className="w-6 h-6" />
              <div className="flex flex-col">
                <span className="text-white">Number of Posts</span>
              </div>
            </div>
            <div className="flex gap-2.5 py-2 items-center">
              <span className="text-white text-xl font-semibold">{posts.length}</span>
            </div>

            <div className="flex items-center gap-6">
              <div>
                <div>
                  <span className="text-xs text-white">{posts.filter(post => post.status == "open").length}</span>
                </div>
                <span className="text-white text-xs">Pending</span>
              </div>
              <div>
                <div>
                  <span className="text-xs text-white">{posts.filter(post => post.status == "closed").length}</span>
                </div>
                <span className="text-white text-xs">Closed</span>
              </div>
              <div>
                <div>
                  <span className="text-xs text-white">{posts.filter(post => post.status == "completed").length}</span>
                </div>
                <span className="text-white text-xs">Completed</span>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* User Summary */}
      {message && <p className="text-center text-xl m-2">{message}</p>}
      {error && <p className="text-red-600 text-center text-xl m-2">{error}</p>}
      <div className="md:mx-2 my-2">
        <Table aria-label="Users Table">
          <TableHeader>
            <TableColumn>Name</TableColumn>
            <TableColumn>Email</TableColumn>
            <TableColumn>Karma</TableColumn>
            <TableColumn>Promote to admin role</TableColumn>
            <TableColumn>Ban user</TableColumn>
          </TableHeader>
          <TableBody>
            {users.map((u, index) => (
              <TableRow key={index}>
                <TableCell>{u.name}</TableCell>
                <TableCell>{u.email}</TableCell>
                <TableCell>{u.karmaPoints}</TableCell>
                <TableCell>
                  <Switch onChange={(event) => changeUserRole(u.email, event.target.checked)} isSelected={u.role === 'admin'} >
                    Admin role
                  </Switch>
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    onClick={() => banUser(u.email)}
                  >
                    {u.role === 'banned' ? 'Unban' : 'Ban'}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div >
  )
}

export default AdminHomepage;


