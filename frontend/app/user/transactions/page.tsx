"use client"
import { title } from "@/components/primitives";
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@nextui-org/table";
import {Chip} from "@nextui-org/chip"; 

export default function ShowTransactions() {
    const transactions = [
        {
            authorName: "Divyateja",
            source: "Mess 1",
            destination: "V335",
            service: "Pick up: Food",
            costInPoints: 2
        },
    ];
    return (
        <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
            <div className="inline-block max-w-lg text-center justify-center">
                <h1 className={title({ color: "green", size: "md" })}>Geddit.&nbsp;</h1>
                <h1 className={title({
                    size: "md"
                })} >
                    Transactions
                </h1>
            </div>

            <div>
                <Table aria-label="Example static collection table">
                    <TableHeader>
                        <TableColumn>Post content</TableColumn>
                        <TableColumn>Transaction Status</TableColumn>
                        <TableColumn>The guy who accepted it</TableColumn>
                        <TableColumn>Points</TableColumn>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell>Sus stuff</TableCell>
                            <TableCell><Chip color="success">Completed</Chip></TableCell>
                            <TableCell>Divyateja</TableCell>
                            <TableCell>2</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Useful stuff</TableCell>
                            <TableCell><Chip color="warning">In Progess</Chip></TableCell>
                            <TableCell>Divyateja</TableCell>
                            <TableCell>2</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Life stuff</TableCell>
                            <TableCell><Chip color="danger">Incomplete</Chip></TableCell>
                            <TableCell><Chip color="default">No Takers</Chip></TableCell>
                            <TableCell>2</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        </section>
    );
}
