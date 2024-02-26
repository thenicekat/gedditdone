"use client"
import { title } from "@/components/primitives";
import { Form, SubmitHandler, useForm } from "react-hook-form";
import { Input } from "@nextui-org/input";
import { User } from "@/types";
import { useState } from "react";
import { Button } from "@nextui-org/button";
import { siteConfig } from "@/config/site";
import axios from "axios";


export default function CreatePost() {
	const { register, handleSubmit, formState: { errors }, control } = useForm<User>()

	const [message, setMessage] = useState<string | null>(null)
	const [error, setError] = useState<string | null>(null)

	const onSubmit: SubmitHandler<User> = async (data) => {
		const res = await axios.post(siteConfig.server_url + "/user/signup", {
			method: "POST",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});

		if (res.status == 201) {
			setError(null)
			setMessage("User created successfully.")
			console.log(res.data);
		} else {
			console.log(res.data)
			setError(res.data.error || "There was an error creating your profile.")
		}
	}

	return (
		<div>
			<h1 className={title()}>Sign up</h1>

			<Form
				className="flex flex-col gap-3 m-3 w-full mx-auto p-4 rounded-lg shadow-md"
				encType={'application/json'}
				onSubmit={handleSubmit(onSubmit)}
				onError={() => {
					setMessage(null)
					setError("There was an error creating your profile.")
				}}
				control={control}
			>
				<Input label="Name" variant="underlined" {...register("name", { required: true })} />
				<Input label="Phone Number" variant="underlined" {...register("phoneNumber", { required: true })} />

				<div className="justify-around w-full flex">
					<Button type="submit" className="align-middle md:w-1/2 w-full" variant="bordered">
						Create Profile
					</Button>
				</div>
			</Form>
		</div>
	);
}
