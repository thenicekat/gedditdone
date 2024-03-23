"use client"
import { title } from '@/components/primitives'
import { siteConfig } from '@/config/site'
import { Post, Request, User } from '@/types'
import { TicketIcon } from '@heroicons/react/24/solid'
import { Input } from '@nextui-org/input'
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/table'
import axios from 'axios'
import { Button } from "@nextui-org/button"
import React from 'react'
import { Form, useForm } from 'react-hook-form'
import { HttpCodes } from '@/types/HttpCodes'

type Props = {
    params: {
        slug: string
    }
}

const PostDetailsPage = ({ params }: Props) => {
    const [message, setMessage] = React.useState<string>("")
    const [error, setError] = React.useState<string>("")
    const [loading, setLoading] = React.useState<boolean>(true)

    const [postData, setPostData] = React.useState();

    const [postRequests, setPostRequests] = React.useState<Request[] & ({
        sender: User
    }) | never[]>([])

    const { register, handleSubmit, formState: { errors }, control, setValue, watch } = useForm();

    const fetchPostDetails = async () => {
        setLoading(true);
        try {
            const response = await axios.get(
                siteConfig.server_url + "/post/get?postId=" + params.slug,
                {
                    withCredentials: true,
                }
            );

            const postData = response.data.data;
            setValue("source", postData.source);
            setValue("destination", postData.destination);
            setValue("service", postData.service);
            setValue("costInPoints", postData.costInPoints);
            setPostData(postData);

            setPostRequests(postData.requests)
        } catch (err) {
            console.error("Error fetching post details:", err);
            setError("Error fetching post details.");
        }
        setLoading(false);
    }

    const acceptRequest = async (requestId: string) => {
        try {
            const response = await axios.post(
                siteConfig.server_url + "/request/accept",
                {
                    requestId: requestId
                },
                {
                    withCredentials: true,
                }
            );

            setMessage(response.data.message);
            fetchPostDetails();
        } catch (err: any) {
            console.error("Error accepting request:", err);
            setError(err.response.data.message || "Error accepting request.");
        }
    }

    React.useEffect(() => {
        if (params.slug) fetchPostDetails()
    }, [params])

    const onSubmit = async (data: Post) => {
		try {
			const res = await axios.post(siteConfig.server_url + "/post/update", {
                requestId: params.slug,
				source: data.source,
				destination: data.destination,
				service: data.service,
				costInPoints: data.costInPoints
			}, {
				withCredentials: true,
				headers: {
					'Content-Type': 'application/json'
				}
			});

			if (res.status == HttpCodes.OK) {
				setError("")
				setMessage("Post edited successfully.")
			} else if (res.status == HttpCodes.UNAUTHORIZED) {
				window.location.href = "/"
			}
			else {
				setError(res.data.error || "There was an error editing your post.")
			}
		}
		catch (err) {
			console.error(err)
			setError("There was an error editing your post.")
		}
	}
    const onDelete = async (data: Post) => {
		try {
			const res = await axios.post(siteConfig.server_url + "/post/delete", {
                requestId: params.slug,
				service: data.service,
			}, {
				withCredentials: true,
				headers: {
					'Content-Type': 'application/json'
				}
			});

			if (res.status == HttpCodes.OK) {
				setError("")
				setMessage("Post deleted successfully.")
			} else if (res.status == HttpCodes.UNAUTHORIZED) {
				window.location.href = "/"
			}
			else {
				setError(res.data.error || "There was an error deleting your post.")
			}
		}
		catch (err) {
			console.error(err)
			setError("There was an error deleting your post.")
		}
	}
    return (
        <div>
            <h1 className={title()}>Your Post</h1>

            <p className="text-red-600 text-center text-lg m-2">
                {
                    error
                    // || (errors.costInPoints?.type == "pattern" && "Please enter a valid number for cost")
                    // || (errors.costInPoints?.type == "max" && "You have exceeded max point limit of 7")
                    // || (errors.costInPoints?.type == "min" && "You are below the min point threshold of 0")
                    // || errors.destination?.message
                    // || errors.source?.message
                    // || errors.service?.message
                }
            </p>

            <p className="text-green-600 text-center text-lg m-2">{message}</p>

            {
                !loading ? <Form
                    className="flex flex-col gap-3 m-3 w-full mx-auto p-4 rounded-lg shadow-md"
                    onSubmit={({ data }: any) => {
                        onSubmit(data)
                    }}
                    onError={() => {
                        setMessage("")
                        setError("There was an error creating your post.")
                    }}
                    control={control}
                >
                    <Input label="Source" value={watch("source")} variant="underlined" {...register("source", { required: true })} />
                    <Input label="Destination" value={watch("destination")} variant="underlined" {...register("destination", { required: true })} />
                    <Input label="Service" value={watch("service")} variant="underlined" {...register("service", { required: true })} />
                    <Input label="Cost In Points" value={watch("costInPoints")} variant="underlined" {...register("costInPoints", { required: true, pattern: /^[0-9]+$/, min: 0, max: 7 })} />

                    <div className="justify-around w-full flex">
                    <Button type="submit" className="align-middle md:w-1/2 w-full" variant="bordered">
                        Edit Post
                    </Button>
                </div>

                    <div className="p-2">
                        <div className="m-4">
                        </div>
                        <Table aria-label="Requests Table">
                            <TableHeader>
                                <TableColumn>Name</TableColumn>
                                <TableColumn>Email</TableColumn>
                                <TableColumn>Phone</TableColumn>
                                <TableColumn>Status</TableColumn>
                                <TableColumn>Accept</TableColumn>
                            </TableHeader>
                            <TableBody>
                                {postRequests.map((request, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{request.sender.name}</TableCell>
                                        <TableCell>{request.sender.email}</TableCell>
                                        <TableCell>{request.sender.phoneNumber}</TableCell>
                                        <TableCell>{request.status}</TableCell>
                                        <TableCell
                                            onClick={() => acceptRequest(request.id)}
                                            className='cursor-pointer'>
                                            <TicketIcon className='w-5 h-5' />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </Form> : <p className="text-center text-xl m-2">
                    Loading...
                </p>
            }
        </div>
    )
}

export default PostDetailsPage
