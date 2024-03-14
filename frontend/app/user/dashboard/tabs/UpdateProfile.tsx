"use client"
import { useEffect } from "react";
import { title } from "@/components/primitives";
import { Form, set, SubmitHandler, useForm, UseFormRegister } from "react-hook-form";
import { Input } from "@nextui-org/input";
import { useState } from "react";
import { Button } from "@nextui-org/button";
import axios from "axios";
import { siteConfig } from "@/config/site";
import { User, Post } from "@/types";
import { HttpCodes } from "@/types/HttpCodes";

type UserProfile = {
    name: string;
    email: string;
    phoneNumber: string;
};

export default function UpdateProfile() {
    const { register, handleSubmit, formState: { errors }, control, setValue, watch } = useForm();

    const [message, setMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchUserData = async () => {
        setLoading(true);
        try {
            const response = await axios.get(
                siteConfig.server_url + "/user/get",
                {
                    params: {},
                    withCredentials: true,
                }
            );
            const userData = response.data.data;

            setValue("name", userData.name);
            setValue("phoneNumber", userData.phoneNumber);
            setError(null);
        } catch (err) {
            console.error("Error fetching user data:", err);
            setMessage(null);
            setError("Error fetching user data.");
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    const onSubmit = async (data: User) => {
        try {
            const res = await axios.post(
                siteConfig.server_url + "/user/update",
                {
                    name: data.name,
                    phoneNumber: data.phoneNumber
                },
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (res.status == HttpCodes.ACCEPTED) {
                setError(null)
                setMessage("User updated successfully.")
            } else {
                setError(res.data.error || "There was an error in updating profile.")
            }

            setMessage(res.data.message || "Profile updated successfully.");
            setError(null);
        } catch (err) {
            setMessage(null);
            setError("There was an error updating your profile.");
        }
    };

    return (
        <div>
            <div className="text-center"><h1 className={title()}>User Profile</h1></div>

            <p className="text-green-600 text-center text-lg">{message}</p>
            <p className="text-red-600 text-center text-lg">{error}</p>

            {!loading ? <Form
                className="flex flex-col gap-3 m-3 w-full mx-auto p-4 rounded-lg shadow-md"
                onSubmit={({ data }: any) => {
                    onSubmit(data)
                }}
                onError={() => {
                    setMessage(null)
                    setError("There was an error updating your profile.")
                }}
                control={control}
            >
                <Input label="Name" variant="underlined" value={watch('name')} {...register("name", { required: true })} />
                <Input label="Phone Number" variant="underlined" value={watch("phoneNumber")} {...register("phoneNumber", { required: true, pattern: /^[0-9]+$/ })} />

                <div className="justify-around w-full flex">
                    <Button type="submit" className="align-middle md:w-1/2 w-full" variant="bordered">
                        Update Profile
                    </Button>
                </div>
            </Form> :
                <p className="text-center text-xl m-2">
                    Loading...
                </p>}
        </div>
    );
}