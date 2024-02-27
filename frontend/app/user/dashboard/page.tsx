"use client"
import { useEffect } from "react";
import { title } from "@/components/primitives";
import { Form, useForm } from "react-hook-form";
import { Input } from "@nextui-org/input";
import { useState } from "react";
import { Button } from "@nextui-org/button";
import axios from "axios";

type FormData = {
    name: string;
    email: string;
    phone: string;
  };
  
  type UserProfile = {
    name: string;
    email: string;
    phone: string;
  };

export default function UserProfile() {
  const { register, handleSubmit, formState: { errors }, control, setValue } = useForm();

  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Function to fetch user data
  const fetchUserData = async () => {
    try {
      const response = await axios.get("/api/user/get"); 
      const userData = response.data; 

      // Set values for the form fields
      setValue("name", userData.name);
      setValue("email", userData.email);
      setValue("phone", userData.phone);

      setMessage("User data loaded successfully.");
      setError(null);
    } catch (err) {
      setMessage(null);
      setError("Error fetching user data.");
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []); 

  const onSubmit = async (data:UserProfile) => {
    try {
      const response = await axios.post("/api/user/update", data); 
      const res = response.data;

      setMessage(res.data.message || "Profile updated successfully.");
      setError(null);
    } catch (err) {
      setMessage(null);
      setError("There was an error updating your profile.");
    }
  };

  return (
    <div>
      <h1 className={title()}>User Profile</h1>

      <p className="text-green-600 text-center text-lg">{message}</p>

      <Form
        className="flex flex-col gap-3 m-3 w-full mx-auto p-4 rounded-lg shadow-md"
        onSubmit={({ data }: any) => {
					console.log(data)
					onSubmit(data)
				}}
        control={control}
      >
        <Input label="Name" variant="underlined" {...register("name", { required: true })} />
        <Input label="Email" variant="underlined" {...register("email", { required: true, pattern: /^\S+@\S+$/i })} />
        <Input label="Phone Number" variant="underlined" {...register("phone", { required: true, pattern: /^[0-9]+$/ })} />

        <div className="justify-around w-full flex">
          <Button type="submit" className="align-middle md:w-1/2 w-full" variant="bordered">
            Update Profile
          </Button>
        </div>
      </Form>
    </div>
  );
}
