"use client"
import { title } from "@/components/primitives";
import { Form, useForm } from "react-hook-form";
import { Input } from "@nextui-org/input";
import { useState } from "react";
import { Button } from "@nextui-org/button";

export default function UserProfile() {
  const { register, formState: { errors }, control } = useForm();

  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  return (
    <div>
      <h1 className={title()}>User Profile</h1>

      <p className="text-green-600 text-center text-lg">{message}</p>

      <Form
        className="flex flex-col gap-3 m-3 w-full mx-auto p-4 rounded-lg shadow-md"
        action="/api/user/update-profile"
        encType={'application/json'}
        onSuccess={async ({ response }) => {
          setError(null);
          const res = await response.json();
          setMessage(res.data.message || "Profile updated successfully.");
        }}
        onError={() => {
          setMessage(null);
          setError("There was an error updating your profile.");
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
