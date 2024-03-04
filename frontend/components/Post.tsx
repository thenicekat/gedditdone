import React, { useState } from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { Link } from "@nextui-org/link";
import { Chip } from "@nextui-org/chip";
import { Post } from "@/types";
import { siteConfig } from "@/config/site";
import axios from "axios";
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/popover";
import { Button } from "@nextui-org/button";

export default function PostComponent({
    id,
    author,
    authorId,
    source,
    destination,
    service,
    costInPoints,
    request,
}: Post) {
    const [message, setMessage] = useState<string>("");

    const requestGeddit = async (postId: string) => {
        try {
            const response = await axios.post(
                siteConfig.server_url + "/request/create",
                {
                    postId,
                },
                {
                    withCredentials: true,
                }
            );
            setMessage(response.data.message);
        } catch (err: any) {
            setMessage(err.response.data.message || "Error requesting geddit.")
        }
    }

    return (
        <Card className="min-w-md max-w-[400px] m-3">
            <CardHeader className="flex gap-3 flex-row">
                <img
                    src={`https://api.dicebear.com/7.x/notionists/svg?seed=${author.email}&size=40&radius=0&scale=100`}
                    alt="avatar"
                />
                <div className="flex flex-col">
                    <p className="text-md">{source} to {destination}</p>
                    <p className="text-small text-default-500">{author.name}</p>
                </div>
            </CardHeader>
            <Divider />
            <CardBody>
                <p>{service}</p>
            </CardBody>
            <Divider />
            <CardFooter
                className="justify-between">
                <Popover placement="top">
                    <PopoverTrigger>
                        <Button
                            onClick={() => {
                                requestGeddit(id);
                            }}
                        >
                            Request this geddit
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent>
                        <div className="px-1 py-2">
                            <div className="text-small font-bold">{message}</div>
                        </div>
                    </PopoverContent>
                </Popover>

                <Chip color="warning">{costInPoints} Points</Chip>
            </CardFooter>
        </Card>
    );
}
