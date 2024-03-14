"use client"
import { title } from "@/components/primitives";
import { siteConfig } from "@/config/site";
import { Request } from "@/types";
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/table";
import axios from "axios";
import { useEffect, useState } from "react";

type UserProfile = {
    name: string;
    email: string;
    phoneNumber: string;
};

export default function SentRequests() {
    const [userRequests, setUserRequests] = useState<Request[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchUserRequests = async () => {
        setLoading(true);
        try {
            const response = await axios.get(
                siteConfig.server_url + "/request/my",
                {
                    params: {},
                    withCredentials: true,
                }
            );

            setUserRequests(response.data.data);
            setError(null);
        } catch (err) {
            console.error("Error fetching user posts:", err);
            setError("Error fetching user posts.");
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchUserRequests();
    }, []);

    return (
        <div>
            <div className="text-center"><h1 className={title()}>Sent Requests</h1></div>

            <p className="text-red-600 text-center text-lg p-2">{error}</p>

            {!loading ? <div className="p-2">
                <Table aria-label="Geddit Requests Table">
                    <TableHeader>
                        <TableColumn>Status</TableColumn>
                        <TableColumn>Source</TableColumn>
                        <TableColumn>Destination</TableColumn>
                        <TableColumn>Service</TableColumn>
                    </TableHeader>
                    <TableBody>
                        {userRequests.map((request, index) => (
                            <TableRow key={index}>
                                <TableCell>{request.status}</TableCell>
                                <TableCell>{request.post.source}</TableCell>
                                <TableCell>{request.post.destination}</TableCell>
                                <TableCell>{request.post.service}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div> :
                <p className="text-center text-xl m-2">
                    Loading...
                </p>}
        </div >
    );
}
