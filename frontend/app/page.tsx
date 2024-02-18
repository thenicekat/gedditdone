import { Link } from "@nextui-org/link";
import { button as buttonStyles } from "@nextui-org/theme";
import { title } from "@/components/primitives";

export default function Home() {
	return (
		<section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
			<div className="inline-block max-w-lg text-center justify-center">
				<h1 className={title({ color: "green", size: "md" })}>Geddit.&nbsp;</h1>
				<h1 className={title({
					size: "md"
				})} >
					Get things done.
				</h1>
			</div>

			<div className="flex gap-3 my-7">
				<Link
					isExternal
					href={"/login"}
					className={buttonStyles({ color: "primary", radius: "full", variant: "shadow", size: "lg" })}
				>
					Start Posting.
				</Link>
			</div>

			<div>
				<section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
					<div className="inline-block text-center justify-center">
						<p className="text-xl p-2 text-justify">
							As students, all of us are lazy. Due to immense distances between the hostels and the stores, it is often difficult to get things from various places in the campus. We often find it hard to reach out to friends who might be in the vicinity of the respective store in order to source the item and these actions require a lot of effort.

							We make it possible to connect with students who are in the particular store in order to procure the items required.
						</p>
					</div>
				</section>
			</div>
		</section>
	);
}
