"use client"
import { title } from "@/components/primitives";
import { siteConfig } from "@/config/site";
import { Request } from "@/types";
import { Button } from "@nextui-org/button";
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/table";
import { Checkbox } from "@nextui-org/checkbox";
import axios from "axios";
import { useEffect, useState } from "react";

type UserProfile = {
    name: string;
    email: string;
    phoneNumber: string;
};

export default function PendingRequests() {
    const [userRequests, setUserRequests] = useState<Request[]>([]);
    const [completedRequests, setCompletedRequests] = useState<string[]>([]);
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
            setError("Error fetching user posts.");
        }
        setLoading(false);
    };

    const completeRequest = async (requestId: string) => {
        try {
            const response = await axios.put(
                siteConfig.server_url + "/request/complete/" + requestId,
                { withCredentials: true }
            );

            if (response.data.error === false) {
                setCompletedRequests(prevState => [...prevState, requestId]);
            }
        } catch (err: any) {
            setError(err.response.data.message || "Error completing request:" + err);
        }
    };

    useEffect(() => {
        fetchUserRequests();
    }, []);

    return (
        <div>
            <div className="text-center"><h1 className={title()}>Pending Requests</h1></div>

            <p className="text-red-600 text-center text-lg p-2">{error}</p>

            {!loading ? <div className="p-2">
                <Table aria-label="Geddit Requests Table">
                    <TableHeader>
                        <TableColumn>Status</TableColumn>
                        <TableColumn>Source</TableColumn>
                        <TableColumn>Destination</TableColumn>
                        <TableColumn>Service</TableColumn>
                        <TableColumn>Complete Task</TableColumn>
                    </TableHeader>
                    <TableBody>
                        {userRequests.map((request, index) => (
                            <TableRow key={index}>
                                <TableCell>{request.status}</TableCell>
                                <TableCell>{request.post.source}</TableCell>
                                <TableCell>{request.post.destination}</TableCell>
                                <TableCell>{request.post.service}</TableCell>
                                <TableCell>
                                    <Checkbox
                                        defaultSelected={request.status === 'completed'}
                                        isDisabled={request.status !== 'accepted'}
                                        onClick={() => completeRequest(request.id)}
                                    >
                                        Complete Task
                                    </Checkbox>
                                </TableCell>
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
