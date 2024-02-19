"use client"
import { title } from "@/components/primitives";
import { Form, useForm } from "react-hook-form";
import { Input } from "@nextui-org/input";


export default function CreatePost() {
	const { register, control } = useForm()

	return (
		<div>
			<h1 className={title()}>Create Post</h1>
			{/* Form for creating a new form */}
			<Form
				className="flex flex-col gap-3 m-3 w-full mx-auto p-4 rounded-lg shadow-md"
				action="/api/posts/create"
				encType={'application/json'}
				onSuccess={() => {
					alert("Your application is updated.")
				}}
				onError={() => {
					alert("Submission has failed.")
				}}
				control={control}
			>
				<Input label="Source" variant="underlined" {...register("source", { required: true })} />
				<Input label="Destination" variant="underlined" {...register("destination", { required: true })} />
				<button>Submit</button>
			</Form>
		</div>
	);
}
