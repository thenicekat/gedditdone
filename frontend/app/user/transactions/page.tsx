"use client"
import { title } from "@/components/primitives";
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@nextui-org/table";
import { Chip } from "@nextui-org/chip";
import { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { siteConfig } from "@/config/site";
import { set } from "react-hook-form";

import { User, Post } from "@/types/index";

export default function ShowTransactions() {
    const [error, setError] = useState<string | null>(null);
    const [userData, setUserData] = useState<User | null>(null);
    const [userPosts, setUserPosts] = useState<Post[]>([]);
    
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
        <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
            <div className="inline-block max-w-lg text-center justify-center">
                <h1 className={title({ color: "green", size: "md" })}>Geddit.&nbsp;</h1>
                <p>{error}</p>
                <h1 className={title({
                    size: "md"
                })} >
                    Transactions
                </h1>
            </div>

            <div>
            <Table aria-label="Example static collection table">
                <TableHeader>
                    <TableColumn>Post content</TableColumn>
                    <TableColumn>The guy who accepted it</TableColumn>
                    <TableColumn>Points</TableColumn>
                </TableHeader>
                <TableBody>
                    {userPosts.map((post, index) => (
                        <TableRow key={index}>
                            <TableCell>{post.source} to {post.destination}</TableCell>
                            <TableCell>{post.author ? <Chip color="success">post.author.name</Chip> : <Chip color="default">Not accepted</Chip>}</TableCell>
                            <TableCell>{post.costInPoints}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
        </section>
    );
}
