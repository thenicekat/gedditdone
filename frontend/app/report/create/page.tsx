"use client"
import { title } from "@/components/primitives";
import { Form, useForm } from "react-hook-form";
import { Input } from "@nextui-org/input";
import { Report } from "@/types";
import { useState, useEffect } from "react";
import { Button } from "@nextui-org/button";
import { siteConfig } from "@/config/site";
import axios from "axios";

export default function CreateReport() {
	const { register, formState: { errors }, control, reset } = useForm<String>()
    const [postId, setPostId] = useState("");
    useEffect(() => {
        // Check if window is available before accessing it
        if (typeof window !== 'undefined') {
          const params = new URLSearchParams(window.location.search);
          const postIdFound = params.get('value') as string ;
          if(postIdFound) {
            setPostId(postIdFound);
          }
          // Do something with postId

        //   const onSubmit = async (reason: string) => {
        //     try {
        //         const res = await axios.post(siteConfig.server_url + "/report/create", {
        //             reason: reason,
        //             postId: postId
        //         }, {
        //             withCredentials: true,
        //             headers: {
        //                 'Content-Type': 'application/json'
        //             }
        //         });
    
        //         if (res.status == 201) {
        //             setError(null)
        //             setMessage("Report created successfully.")
        //             window.location.href = "/post/details/" + res.data.data.postId
        //             reset()
        //         } else if (res.status == 401) {
        //             window.location.href = "/"
        //         }
        //         else {
        //             setError(res.data.error || "There was an error creating your report.")
        //         }
        //     }
        //     catch (err: any) {
        //         setError(err.response.data.message || "There was an error creating your report.")
        //     }
        // }
    
        }
      }, []);
	const [message, setMessage] = useState<string | null>(null)
	const [error, setError] = useState<string | null>(null)

	const onSubmit = async (reason: string) => {
		try {
			const res = await axios.post(siteConfig.server_url + "/report/create", {
				reason: reason as string,
                postId: postId
			}, {
				withCredentials: true,
				headers: {
					'Content-Type': 'application/json'
				}
			});

			if (res.status == 201) {
				setError(null)
				setMessage("Report created successfully.")
				window.location.href = "../../post/details/" + res.data.data.postId
				reset()
			} else if (res.status == 401) {
				window.location.href = "/"
			}
			else {
				setError(res.data.error || "There was an error creating your report.")
			}
		}
		catch (err: any) {
			setError( "There was an error creating your report.")
		}
	}

	return (
		<div>
			<h1 className={title()}>Create Report</h1>

			<p className="text-red-600 text-center text-xl m-2">
				{error}
			</p>

			<p className="text-green-600 text-center text-xl m-2">{message}</p>

			<Form
				className="flex flex-col gap-3 m-3 w-full mx-auto p-4 rounded-lg shadow-md"
                onSubmit = {( {data} : any) => {
                        onSubmit(data.reason)
                    }
                }
				onError={() => {
					setMessage(null)
					setError("There was an error creating your report.")
				}}
				control={control}
			>
				<Input label="Reason" variant="underlined" {...register("reason", { required: true })} />
				<div className="justify-around w-full flex">
					<Button type="submit" className="align-middle md:w-1/2 w-full" variant="bordered">
						Create Report
					</Button>
				</div>
			</Form>
		</div>
	);
}