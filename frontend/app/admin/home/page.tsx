"use client"
import { Switch } from "@nextui-org/switch";
import axios from "axios";
import React, { useEffect, useState } from 'react';
import { User } from '@/types'
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/table'
import { siteConfig } from "@/config/site";

axios.defaults.withCredentials = true;

const AdminHomepage = () => {
  const [users, setUsers] = useState<User[] | never[]>([]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true); // Add loading state
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(siteConfig.server_url+'/admin/home');
        // console.log(response.data.data);
        setUsers(response.data.data);
        setLoading(false);
      } catch (error) {
        setError("error occured");
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const changeUserRole = async (usermail: string, admin: boolean) => {
    try {
      if(admin){
      await axios.put(siteConfig.server_url + `/admin/promote/${usermail}`);
      // Refresh users list after promoting
      const response = await axios.get(siteConfig.server_url + '/admin/home');
      setUsers(response.data.data);
      }
      else{
        await axios.put(siteConfig.server_url + `/admin/demote/${usermail}`);
        // Refresh users list after promoting
        const response = await axios.get(siteConfig.server_url + '/admin/home');
        setUsers(response.data.data);
      }
    } catch (error) {
      setError("error occured");
    }
  }

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
                                    <TableRow key = {index}>
                                        <TableCell>{u.name}</TableCell>
                                        <TableCell>{u.email}</TableCell>
                                        <TableCell>
                                            {/* <Button onClick={() => promoteUser(u.email)} className='cursor-pointer' color="primary" variant="bordered">
                                              Select
                                            </Button> */}
                                            
                                            <Switch onChange={(event) => changeUserRole(u.email, event.target.checked)} isSelected={u.role==='admin'} >
                                                Admin role
                                            </Switch>
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


