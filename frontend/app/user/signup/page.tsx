"use client"
import { title } from "@/components/primitives";
import { Form, useForm } from "react-hook-form";
import { Input } from "@nextui-org/input";
import { User } from "@/types";
import { useState } from "react";
import { Button } from "@nextui-org/button";


export default function CreatePost() {
	const { register, formState: { errors }, control } = useForm<User>()

	const [message, setMessage] = useState<string | null>(null)
	const [error, setError] = useState<string | null>(null)

	return (
		<div>
			<h1 className={title()}>Sign up to Geddit</h1>
			{/* <p className="text-green-600 text-center text-lg">{message}</p> */}

			<Form
				className="flex flex-col gap-3 m-3 w-full mx-auto p-4 rounded-lg shadow-md"
				action="/api/posts/create"
				encType={'application/json'}
				onSuccess={async ({ response }) => {
					setError(null)
					const res = await response.json()
					setMessage(res.data.message || "Profile created successfully.")
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
