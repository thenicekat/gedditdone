import React from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { Link } from "@nextui-org/link";
import { Chip } from "@nextui-org/chip";
import { Post } from "@/types";

export default function PostComponent({
    author,
    source,
    destination,
    service,
    costInPoints
}: Post) {
    return (
        <Card className="min-w-md max-w-[400px] m-3">
            <CardHeader className="flex gap-3 flex-row">
                <img
                    src={`https://api.dicebear.com/7.x/notionists/svg?seed=${author.email}&size=40&radius=0&scale=200`}
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
                <Link
                    isExternal
                    showAnchorIcon
                    href={`tel:${author.phoneNumber}`}
                >
                    Request this geddit
                </Link>
                <Chip color="warning">{costInPoints} Points</Chip>
            </CardFooter>
        </Card>
    );
}
