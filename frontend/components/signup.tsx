import React from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { Link } from "@nextui-org/link";
// import { Avatar } from "@nextui-org/avatar";
// import { Chip } from "@nextui-org/chip";
import { User } from "@/types";

export default function Signup({
    name,
    phoneNumber
}: User) {
    return (
        <Card className="min-w-md max-w-[400px] m-3">
            <Divider />
            <CardBody>
                <p>{name}</p>
                <p>{phoneNumber}</p>
            </CardBody>
            <Divider />
            <CardFooter
                className="justify-between">
                <Link
                    isExternal
                    showAnchorIcon
                    href="https://github.com/nextui-org/nextui"
                >
                    Signup
                </Link>
            </CardFooter>
        </Card>
    );
}
