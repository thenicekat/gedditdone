"use client"
import { title } from "@/components/primitives";
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@nextui-org/table";
import { Chip } from "@nextui-org/chip";
import { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { siteConfig } from "@/config/site";
import { set } from "react-hook-form";

interface UserData {
    id: string;
    name: string;
    email: string;
    phoneNumber: string;
    karmaPoints: number;
    posts: Post[];
    requests: Request[];
}

interface Post {
    id: string;
    authorId: string;
    costInPoints: number;
    source: string;
    destination: string;
    service: string;
    requests: Request[];
}

interface Request {
    id: string;
    status: string;
    senderId: string;
    postId: string;
}

export default function ShowTransactions() {
    const transactions = [
        {
            authorName: "Divyateja",
            source: "Mess 1",
            destination: "V335",
            service: "Pick up: Food",
            costInPoints: 2
        },
    ];

    const [error, setError] = useState<string | null>(null);
    const [userData, setUserData] = useState<UserData | null>(null);

    const fetchUserData = async () => {
        try {
            const response = await axios.get(
                siteConfig.server_url + "/user/transactions",
                {
                    params: {},
                    withCredentials: true,
                }
            );

            setUserData(response.data.data);
            setError(null);
        } catch (err) {
            console.error("Error fetching user data:", err);
            setError("Error fetching user data.");
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    return (
        <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
            <div className="inline-block max-w-lg text-center justify-center">
                <h1 className={title({ color: "green", size: "md" })}>Geddit.&nbsp;</h1>
                {userData && (
                    <>
                        <p>ID: {userData.id}</p>
                        <p>Name: {userData.name}</p>
                        <p>Email: {userData.email}</p>
                        <p>Phone Number: {userData.phoneNumber}</p>
                        <p>Karma Points: {userData.karmaPoints}</p>
                        <p>Posts: {userData.posts.length}</p>
                        <p>Requests: {userData.requests.length}</p>
                    </>
                )}
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
                        <TableColumn>Transaction Status</TableColumn>
                        <TableColumn>The guy who accepted it</TableColumn>
                        <TableColumn>Points</TableColumn>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell>Sus stuff</TableCell>
                            <TableCell><Chip color="success">Completed</Chip></TableCell>
                            <TableCell>Divyateja</TableCell>
                            <TableCell>2</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Useful stuff</TableCell>
                            <TableCell><Chip color="warning">In Progess</Chip></TableCell>
                            <TableCell>Divyateja</TableCell>
                            <TableCell>2</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Life stuff</TableCell>
                            <TableCell><Chip color="danger">Incomplete</Chip></TableCell>
                            <TableCell><Chip color="default">No Takers</Chip></TableCell>
                            <TableCell>2</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        </section>
    );
}
