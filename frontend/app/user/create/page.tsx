"use client"
import { title } from "@/components/primitives";
import { Form, FormSubmitHandler, SubmitHandler, useForm } from "react-hook-form";
import { Input } from "@nextui-org/input";
import { User } from "@/types";
import { useState } from "react";
import { Button } from "@nextui-org/button";
import { siteConfig } from "@/config/site";
import axios from "axios";

type FormData = {
	name: string
	phoneNumber: string
}

export default function CreateUser() {
	const { register, handleSubmit, formState: { errors }, control } = useForm<FormData>()

	const [message, setMessage] = useState<string | null>(null)
	const [error, setError] = useState<string | null>(null)
	const onSubmit = async (data: FormData) => {
		try {
			const res = await axios.post(siteConfig.server_url + "/user/signup", {
				name: data.name,
				phoneNumber: data.phoneNumber
			}, {
				headers: {
					'Content-Type': 'application/json'
				}
			});

			if (res.status == 201) {
				setError(null)
				setMessage("User created successfully.")
			} else {
				setError(res.data.error || "There was an error creating your profile.")
			}
		}
		catch (err) {
			console.error(err)
			setError("There was an error creating your profile.")
		}
	}

	return (
		<div>
			<h1 className={title()}>Sign up</h1>

			<Form
				className="flex flex-col gap-3 m-3 w-full mx-auto p-4 rounded-lg shadow-md"
				onSubmit={({ data }: any) => {
					console.log(data)
					onSubmit(data)
				}}
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
