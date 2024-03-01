import React from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { Link } from "@nextui-org/link";
import { Avatar } from "@nextui-org/avatar";
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
            <CardHeader className="flex gap-3">
                <Avatar isBordered radius="lg" name={author.name} />
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
