"use client"
import { useEffect } from "react";
import { title } from "@/components/primitives";
import { Form, SubmitHandler, useForm, UseFormRegister } from "react-hook-form";
import { Input } from "@nextui-org/input";
import { useState } from "react";
import { Button } from "@nextui-org/button";
import axios from "axios";
import { siteConfig } from "@/config/site";
import { User, Post } from "@/types";
import { HttpCodes } from "@/types/HttpCodes";
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@nextui-org/table";
import { Chip } from "@nextui-org/chip";
import { Tabs, Tab } from "@nextui-org/tabs";
import { HandRaisedIcon, BanknotesIcon, CreditCardIcon } from '@heroicons/react/24/solid'

type UserProfile = {
    name: string;
    email: string;
    phoneNumber: string;
};

export default function MyPosts() {
    const [userPosts, setUserPosts] = useState<Post[]>([]);
    const [error, setError] = useState<string | null>(null);

    const fetchUserPosts = async () => {
        try {
            const response = await axios.get(
                siteConfig.server_url + "/post/my",
                {
                    params: {},
                    withCredentials: true,
                }
            );

            setUserPosts(response.data.data);
            setError(null);
        } catch (err) {
            console.error("Error fetching user posts:", err);
            setError("Error fetching user posts.");
        }
    };

    useEffect(() => {
        fetchUserPosts();
    }, []);

    return (
        <div>
            <h1 className={title()}>My Posts</h1>

            <p className="text-red-600 text-center text-lg p-2">{error}</p>

            <div className="p-2">

                <Table aria-label="Geddit Posts Table">
                    <TableHeader>
                        <TableColumn>Requirement</TableColumn>
                        <TableColumn>Service</TableColumn>
                        <TableColumn>Status</TableColumn>
                        <TableColumn>Points</TableColumn>
                    </TableHeader>
                    <TableBody>
                        {userPosts.map((post, index) => (
                            <TableRow key={index}>
                                <TableCell>{post.source} to {post.destination}</TableCell>
                                <TableCell>{post.service}</TableCell>
                                <TableCell>{post.author ? <Chip color="success">post.author.name</Chip> : <Chip color="default">Not accepted</Chip>}</TableCell>
                                <TableCell>{post.costInPoints}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div >
        </div >
    );
}
