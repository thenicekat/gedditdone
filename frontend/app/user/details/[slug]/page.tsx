"use client"
import { title } from '@/components/primitives'
import { siteConfig } from '@/config/site'
import { Post, Request, User } from '@/types'
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/table'
import axios from 'axios'
import React from 'react'

type Props = {
    params: {
        slug: string
    }
}

const UserDetailsPage = ({ params }: Props) => {
    const [message, setMessage] = React.useState<string>("")
    const [error, setError] = React.useState<string>("")
    const [loading, setLoading] = React.useState<boolean>(true)

    const [userDetails, setUserDetails] = React.useState<
        User & { previousPosts: Post[], requests: Request[] }
        | null
    >(null)

    const fetchUserDetails = async () => {
        setLoading(true);
        try {
            const response = await axios.get(
                siteConfig.server_url + "/user/get/" + params.slug,
                {
                    withCredentials: true,
                }
            );

            const userData = response.data.data;
            setUserDetails(userData);
            setMessage("User details fetched successfully.")
            setLoading(false);
        } catch (err: any) {
            setLoading(false);
            setError(err.response.data.message || "Error fetching user details.");
        }
    }


    React.useEffect(() => {
        if (params.slug) fetchUserDetails()
    }, [params])

    return (
        <div>
            <h1 className={title()}>User Profile</h1>

            <p className="text-red-600 text-center text-xl m-2">
                {error}
            </p>

            <p className="text-green-600 text-center text-xl m-2">{message}</p>

            {
                !loading ?
                    <div className="p-2">
                        {
                            userDetails &&
                            <div className="flex flex-col gap-2 m-2">
                                <div className="flex flex-col gap-2">
                                    <img
                                        src={`https://api.dicebear.com/7.x/notionists/svg?seed=${userDetails.id}&size=50&radius=0`}
                                        className='rounded-full border-2 w-32 h-32 border-green-500 mx-auto'
                                        alt="avatar"
                                    />

                                    <p className='text-xl'>Name: {userDetails.name}</p>
                                    <p className='text-xl'>Karma Points: {userDetails.karmaPoints}</p>
                                </div>


                                {userDetails.previousPosts && <>
                                    <hr className='m-2' />
                                    <h1 className='text-xl'>Previous Posts: </h1>
                                    <Table aria-label="Previous Posts Table">
                                        <TableHeader>
                                            <TableColumn>Source</TableColumn>
                                            <TableColumn>Cost</TableColumn>
                                            <TableColumn>Destination</TableColumn>
                                            <TableColumn>Service</TableColumn>
                                            <TableColumn>Status</TableColumn>
                                        </TableHeader>
                                        <TableBody>
                                            {userDetails.previousPosts.map((post, index) => (
                                                <TableRow key={index}>
                                                    <TableCell>{post.source}</TableCell>
                                                    <TableCell>{post.costInPoints}</TableCell>
                                                    <TableCell>{post.destination}</TableCell>
                                                    <TableCell>{post.service}</TableCell>
                                                    <TableCell>{post.status}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table></>}


                                {userDetails.requests && <>
                                    <hr className='m-2' />
                                    <h1 className='text-xl'>Previous Requests: </h1>
                                    <Table aria-label="Previous Requests Table">
                                        <TableHeader>
                                            <TableColumn>Source</TableColumn>
                                            <TableColumn>Cost</TableColumn>
                                            <TableColumn>Destination</TableColumn>
                                            <TableColumn>Service</TableColumn>
                                            <TableColumn>Request Status</TableColumn>
                                        </TableHeader>
                                        <TableBody>
                                            {userDetails.requests.map((req, index) => (
                                                <TableRow key={index}>
                                                    <TableCell>{req.post.source}</TableCell>
                                                    <TableCell>{req.post.costInPoints}</TableCell>
                                                    <TableCell>{req.post.destination}</TableCell>
                                                    <TableCell>{req.post.service}</TableCell>
                                                    <TableCell>{req.status}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table></>}
                            </div>
                        }
                    </div>
                    : <p className="text-center text-xl m-2">
                        Loading...
                    </p>
            }
        </div >
    )
}

export default UserDetailsPage
