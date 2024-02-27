"use client"
import { title } from "@/components/primitives";
import { Form, useForm } from "react-hook-form";
import { Input } from "@nextui-org/input";
import { Post } from "@/types";
import { useState } from "react";
import { Button } from "@nextui-org/button";
import { siteConfig } from "@/config/site";
import axios from "axios";

export default function CreatePost() {
	const { register, formState: { errors }, control } = useForm<Post>()

	const [message, setMessage] = useState<string | null>(null)
	const [error, setError] = useState<string | null>(null)

	const onSubmit = async (data: Post) => {
		try {
			const res = await axios.post(siteConfig.server_url + "/post/create", {
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

			if (res.status == 201) {
				setError(null)
				setMessage("Post created successfully.")
			} else if (res.status == 401) {
				window.location.href = "/"
			}
			else {
				setError(res.data.error || "There was an error creating your post.")
			}
		}
		catch (err) {
			console.error(err)
			setError("There was an error creating your post.")
		}
	}

	return (
		<div>
			<h1 className={title()}>Create Post</h1>

			<p className="text-red-600 text-center text-lg m-2">
				{
					error ||
					errors.authorName?.message ||
					(errors.costInPoints?.type == "pattern" && "Please enter a valid number for cost") ||
					(errors.costInPoints?.type == "max" && "You have exceeded max point limit of 7") ||
					(errors.costInPoints?.type == "min" && "You are below the min point threshold of 0") ||
					errors.destination?.message ||
					errors.source?.message ||
					errors.service?.message
				}
			</p>

			<p className="text-green-600 text-center text-lg m-2">{message}</p>

			<Form
				className="flex flex-col gap-3 m-3 w-full mx-auto p-4 rounded-lg shadow-md"
				onSubmit={({ data }: any) => {
					onSubmit(data)
				}}
				onError={() => {
					setMessage(null)
					setError("There was an error creating your post.")
				}}
				control={control}
			>
				<Input label="Source" variant="underlined" {...register("source", { required: true })} />
				<Input label="Destination" variant="underlined" {...register("destination", { required: true })} />
				<Input label="Service" variant="underlined" {...register("service", { required: true })} />
				<Input label="Cost In Points" variant="underlined" {...register("costInPoints", { required: true, pattern: /^[0-9]+$/, min: 0, max: 7 })} />

				<div className="justify-around w-full flex">
					<Button type="submit" className="align-middle md:w-1/2 w-full" variant="bordered">
						Create Post
					</Button>
				</div>
			</Form>
		</div>
	);
}
