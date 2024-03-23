"use client"
import { title } from "@/components/primitives";
import { Button } from "@nextui-org/button";
import axios from "axios";
import React, { useEffect, useState } from 'react';
import { User } from '@/types'
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/table'
import { siteConfig } from "@/config/site";
import { HttpCodes } from "@/types/HttpCodes";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { TicketIcon } from '@heroicons/react/24/solid'

axios.defaults.withCredentials = true;

const AdminHomepage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(siteConfig.server_url+'/admin/home');
        setUsers(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUsers();
  }, []);

  const promoteUser = async (usermail: string) => {
    try {
      await axios.put(siteConfig.server_url + `/admin/promote/${usermail}`);
      // Refresh users list after promoting
      const response = await axios.get(siteConfig.server_url + '/admin/home');
      setUsers(response.data.data);
    } catch (error) {
      // setError(error.response.data.message);
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Admin Homepage</h1>
      {error && <p>{error}</p>}
      <div className="p-2">
                        <Table aria-label="Users Table">
                            <TableHeader>
                                <TableColumn>User Name</TableColumn>
                                <TableColumn>User Email</TableColumn>
                                <TableColumn>Promote to admin role</TableColumn>
                            </TableHeader>
                            <TableBody>
                                {users.map((u, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{u.name}</TableCell>
                                        <TableCell>{u.email}</TableCell>
                                        <TableCell
                                            onClick={() => promoteUser(u.email)}
                                            className='cursor-pointer'>
                                            <TicketIcon className='w-5 h-5' />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
    </div>
  );
};

export default AdminHomepage;


