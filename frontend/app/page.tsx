import { title } from "@/components/primitives";
import Post from "@/components/Post";
import getGoogleOAuthUrl from "@/utils/getGoogleOAuthUrl";
import { Button } from "@nextui-org/button";
import axios from "axios";

axios.defaults.withCredentials = true;

export default function Home() {
	const posts = [
		{
			authorName: "Divyateja",
			source: "Mess 1",
			destination: "V335",
			service: "Pick up: Food",
			costInPoints: 2
		},
		{
			authorName: "Manan",
			source: "CP",
			destination: "V334",
			service: "Pick up: Laundry",
			costInPoints: 5
		},
		{
			authorName: "Uday",
			source: "New York",
			destination: "Los Angeles",
			service: "I need a ride from New York to Los Angeles.",
			costInPoints: 2
		},
		{
			authorName: "Prachi",
			source: "Los Angeles",
			destination: "New York",
			service: "I need a ride from Los Angeles to New York.",
			costInPoints: 2
		}
		,
		{
			authorName: "Adarsh",
			source: "Los Angeles",
			destination: "New York",
			service: "I need a ride from Los Angeles to New York.",
			costInPoints: 2
		}
	];

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

			<div className="flex flex-wrap gap-4 justify-center items-center">
				<Button color="primary" variant="bordered" radius="sm" size="lg">
					<a href={getGoogleOAuthUrl()}> Login with Google </a>
				</Button>
			</div>
			<div
				className="grid md:grid-cols-3 gap-4 m-4">
				{
					posts.map((post, index) => (
						<Post
							key={index}
							authorName={post.authorName}
							source={post.source}
							destination={post.destination}
							service={post.service}
							costInPoints={post.costInPoints}
						/>
					))
				}
			</div>
		</section>
	);
}
