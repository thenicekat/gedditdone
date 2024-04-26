"use client"
import { Switch } from "@nextui-org/switch";
import { Button } from "@nextui-org/button"
import axios from "axios";
import React, { useEffect, useState } from 'react';
import { Post, User, Report } from '@/types'
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/table'
import { siteConfig } from "@/config/site";
import { title } from "@/components/primitives";
import { Card, CardBody } from "@nextui-org/card";
import { CubeIcon, FlagIcon, PencilSquareIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { HttpCodes } from "@/types/HttpCodes";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/modal";
import { set } from "react-hook-form";
import { Input } from "@nextui-org/input";
import { DonutChart } from "@tremor/react";


axios.defaults.withCredentials = true;


const AdminHomepage = () => {
  const [amLoggedIn, setAmLoggedIn] = useState<boolean>(false);

  const [users, setUsers] = useState<User[] | never[]>([]);
  const [posts, setPosts] = useState<Post[] | never[]>([]);
  const [error, setError] = useState<string>("");
  const [reports, setReports] = useState<Report[] | never[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [message, setMessage] = useState<string>("");

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [deltaKarmaValue, setDeltaKarmaValue] = useState<number>(0);
  const [deltaKarmaUser, setDeltaKarmaUser] = useState<string>("");
  const [deltaKarmaCurrent, setDeltaKarmaCurrent] = useState<number>(0);

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

  const fetchReports = async () => {
    try {
      const response = await axios.get(siteConfig.server_url + '/report/allreports');
      setLoading(false);
      setReports(response.data.data);
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
    fetchReports();
  }, []);

  const closeReport = async (reportId: string) => {
    setError("");
    setMessage("Loading");
    try {
      const response = await axios.post(siteConfig.server_url + "/report/close",
        {
          reportId: reportId as string
        }
      );
      fetchReports();
      setMessage("");

    } catch (err: any) {
      setError(err.response.data.message || "Error closing report:" + err);
    }
  }

  const banUser = async (usermail: string) => {
    setError("")
    setMessage("Loading...")
    try {
      const response = await axios.put(siteConfig.server_url + `/admin/ban/${usermail}`);
      if (response.status == HttpCodes.UNAUTHORIZED) {
        window.location.href = "/";
        return;
      }
      fetchUsers();
      setMessage("");

    } catch (error: any) {
      setError(error.response.data.message || "Error occured");
      setMessage("")
    }
  }

  const changeUserRole = async (usermail: string, admin: boolean) => {
    setError("")
    setMessage("Loading...")
    try {
      if (admin) {
        await axios.put(siteConfig.server_url + `/admin/promote/${usermail}`);
        setMessage("User promoted to admin role")
        // Refresh users list after promoting
        const response = await axios.get(siteConfig.server_url + '/admin/allusers');
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
        const response = await axios.get(siteConfig.server_url + '/admin/allusers');
        if (response.status == HttpCodes.UNAUTHORIZED) {
          window.location.href = "/";
          return;
        }
        setUsers(response.data.data);
      }
    } catch (error: any) {
      setError(error.response.data.message || "Error occured");
      setMessage("")
    }
  }

  const deltaKarma = async (usermail: string, delta: number) => {
    setError("");
    setMessage("Loading...")
    try {
      const response = await axios.put(siteConfig.server_url + `/admin/deltaKarma/${usermail}`, {
        amount: Math.abs(delta),
        sign: delta > 0
      });

      if (response.status == HttpCodes.UNAUTHORIZED) {
        window.location.href = "/";
        return;
      }

      setMessage("Karma updated")
      fetchUsers();
    } catch (error: any) {
      setError(error.response.data.message || "Error occured");
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
              <span className="text-white text-xl font-semibold">{reports.length}</span>
            </div>

            <div className="flex items-center gap-6">
              <div>
                <div>
                  <span className="text-xs text-white">{reports.filter(report => report.status == "open").length}</span>
                </div>
                <span className="text-white text-xs">Open</span>
              </div>
              <div>
                <div>
                  <span className="text-xs text-white">{reports.filter(report => report.status == "closed").length}</span>
                </div>
                <span className="text-white text-xs">Closed</span>
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
      <div className="md:flex">
        <Card className="dark:bg-slate-700 md:mx-2 my-2 xl:max-w-sm rounded-xl w-full p-3">
          <DonutChart 
            data={
              [{
                Status: "Pending ",
                Posts: posts.filter(post => post.status == "open").length
              },
              {
                Status: "Closed ",
                Posts: posts.filter(post => post.status == "closed").length
              },
              {
                Status: "Completed ",
                Posts: posts.filter(post => post.status == "completed").length
              }]
            }
            index="Status"
            category="Posts"
            variant="donut"
            colors={[
              'white', 'black', '#6b7280']}
          />
        </Card>
        <Card className="bg-white md:mx-2 my-2 xl:max-w-sm rounded-xl w-full p-3">
          <DonutChart
            data={
              [{
                Role: "Default",
                Users: users.filter(user => user.role == "user").length
              },
              {
                Role: "Admin",
                Users: users.filter(user => user.role == "admin").length
              },
              {
                Role: "Banned",
                Users: users.filter(user => user.role == "banned").length
              }]
            }
            index="Role"
            category="Users"
            variant="donut"
            colors={[
              'white',
              'slate',
              'red'
            ]}
          />
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
            <TableColumn>Modify Karma</TableColumn>
            <TableColumn>Promote to admin role</TableColumn>
            <TableColumn>Ban user</TableColumn>
          </TableHeader>
          <TableBody>
            {users.map((u, index) => (
              <TableRow key={index}>
                <TableCell>{u.name}</TableCell>
                <TableCell>{u.email}</TableCell>
                <TableCell onClick={() => {
                  setDeltaKarmaUser(u.email);
                  setDeltaKarmaCurrent(u.karmaPoints);
                  onOpen()
                }}><span className="flex cursor-pointer">{u.karmaPoints} <PencilSquareIcon className="w-5 h-5 mx-3" /></span></TableCell>
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

      <Modal
        size={'xl'}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Change User Karma</ModalHeader>
              <ModalBody>
                <p>
                  You will be able to modify an user&apos;s karma using this feature
                </p>
                <p>
                  Email: {deltaKarmaUser}
                  <br />
                  Current Karma: {deltaKarmaCurrent}
                </p>
                <p>
                  <Input
                    type="number"
                    label="Change Karma"
                    value={deltaKarmaValue.toString()}
                    onChange={(e) => setDeltaKarmaValue(parseInt(e.target.value))}
                  />
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={() => {
                  deltaKarma(deltaKarmaUser, deltaKarmaValue);
                  onClose();
                }}>
                  Submit
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      {/* Reports Summary*/}
      {message && <p className="text-center text-xl m-2">{message}</p>}
      {error && <p className="text-red-600 text-center text-xl m-2">{error}</p>}
      <div className="md:mx-2 my-2">
        <Table aria-label="Reports Table">
          <TableHeader>
            <TableColumn>Reporter</TableColumn>
            <TableColumn>Post</TableColumn>
            <TableColumn>Reason</TableColumn>
            <TableColumn>Status</TableColumn>
          </TableHeader>
          <TableBody>
            {reports.map((u, index) => (
              <TableRow key={index}>
                <TableCell>{u.reporterEmail}</TableCell>
                <TableCell>{u.postId}</TableCell>
                <TableCell>{u.reason}</TableCell>
                <TableCell>
                  <Button onClick={() => closeReport(u.id)} isDisabled={u.status === "closed"} color="primary">
                    {u.status === 'closed' ? 'Closed' : 'Open'}
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


