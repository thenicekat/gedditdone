"use client"
import { Switch } from "@nextui-org/switch";
import { Button } from "@nextui-org/button"
import axios from "axios";
import React, { useEffect, useState } from 'react';
import { User } from '@/types'
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/table'
import { siteConfig } from "@/config/site";
import { title } from "@/components/primitives";

axios.defaults.withCredentials = true;

const AdminHomepage = () => {
  const [users, setUsers] = useState<User[] | never[]>([]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(siteConfig.server_url + '/admin/home');
        setUsers(response.data.data);
        setLoading(false);
      } catch (error: any) {
        setError(error.response.data.message || "Error occured");
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const banUser = async (usermail: string) => {
    try {
      await axios.put(siteConfig.server_url + `/admin/ban/${usermail}`);
    } catch (error: any) {
      setError(error.response.data.message || "Error occured");
    }
  }

  const changeUserRole = async (usermail: string, admin: boolean) => {
    try {
      if (admin) {
        await axios.put(siteConfig.server_url + `/admin/promote/${usermail}`);

        // Refresh users list after promoting
        const response = await axios.get(siteConfig.server_url + '/admin/home');
        setUsers(response.data.data);
      }
      else {
        await axios.put(siteConfig.server_url + `/admin/demote/${usermail}`);

        // Refresh users list after promoting
        const response = await axios.get(siteConfig.server_url + '/admin/home');
        setUsers(response.data.data);
      }
    } catch (error: any) {
      setError(error.response.data.message || "error occured");
    }
  }

  return (
    <div>
      <h1 className={title()}>Admin Home</h1>

      {error && <p className="text-red-600 text-center text-xl m-2">{error}</p>}

      <div className="p-2">
        <Table aria-label="Users Table">
          <TableHeader>
            <TableColumn>User Name</TableColumn>
            <TableColumn>User Email</TableColumn>
            <TableColumn>Promote to admin role</TableColumn>
            <TableColumn>Ban user</TableColumn>
          </TableHeader>
          <TableBody>
            {users.map((u, index) => (
              <TableRow key={index}>
                <TableCell>{u.name}</TableCell>
                <TableCell>{u.email}</TableCell>
                <TableCell>
                  <Switch onChange={(event) => changeUserRole(u.email, event.target.checked)} isSelected={u.role === 'admin'} >
                    Admin role
                  </Switch>
                </TableCell>
                <TableCell>
                  <Button variant="bordered" onClick={() => banUser(u.email)}>
                    Ban
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default AdminHomepage;


