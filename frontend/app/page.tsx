"use client"
import React from "react";
import { title } from "@/components/primitives";
import PostComponent from "@/components/Post";
import getGoogleOAuthUrl from "@/utils/getGoogleOAuthUrl";
import { Button } from "@nextui-org/button";
import { Select, SelectItem } from "@nextui-org/select";
import axios from "axios";
import { siteConfig } from "@/config/site";
import { Post } from "@/types";
import { HttpCodes } from "@/types/HttpCodes";
import { ArchiveBoxIcon, BookmarkIcon, HomeIcon, PlusCircleIcon, UserIcon } from "@heroicons/react/24/solid";
import MyPosts from "./tabs/MyPosts";
import SentRequests from "./tabs/SentRequests";
import { Tab, Tabs } from "@nextui-org/tabs";

axios.defaults.withCredentials = true;

export default function Home() {
	const [posts, setPosts] = React.useState<Post[]>([]);

	const [sources, setSources] = React.useState<string[]>([]);
	const [sourceSelected, setSourceSelected] = React.useState<string>("");

	const [destinations, setDestinations] = React.useState<string[]>([]);
	const [destinationSelected, setDestinationSelected] = React.useState<string>("");

	const [amLoggedIn, setAmLoggedIn] = React.useState(false);

	React.useEffect(() => {
		axios.get(siteConfig.server_url + "/post/all")
			.then((res) => {
				if (res.status == HttpCodes.UNAUTHORIZED) {
					setAmLoggedIn(false);
					return;
				}

				if (res.status == HttpCodes.OK) {
					setAmLoggedIn(true);
					setPosts(res.data.data);
					setDestinations(Array.from(new Set(res.data.data.map((post: { destination: string; }) => post.destination))));
					setSources(Array.from(new Set(res.data.data.map((post: { source: string; }) => post.source))));

				} else if (res.status == HttpCodes.INTERNAL_SERVER_ERROR) {
					console.error(res.data.message);
				}
			})
			.catch((err) => {
				console.error(err);
			})
	}, []);


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

			{
				!amLoggedIn ?
					<div className="flex flex-wrap gap-4 justify-center items-center">
						<Button color="success" variant="bordered" radius="sm" size="lg"
							onClick={
								() => {
									window.location.href = getGoogleOAuthUrl();
								}
							}>
							Login with Google
						</Button>
					</div>
					:
					<>
						<div className="flex flex-wrap gap-4 justify-center items-center">
							<Button className="w-full hidden md:block"
								color="success" variant="bordered" radius="sm" size="lg"
								onClick={
									() => {
										window.location.href = "/post/create";
									}
								}>
								Create a Post
							</Button>

							<div
								className="z-10 w-14 fixed bottom-0 right-0 m-4 text-green-500 cursor-pointer md:hidden"
								onClick={
									() => {
										window.location.href = "/post/create";
									}
								}>
								<PlusCircleIcon />
							</div>
						</div>

						<div className="w-full">
							<Tabs
								className="flex justify-center p-2"
								aria-label="Options"
								size="lg"
								color="success"
								variant="bordered">
								<Tab
									key="posts"
									title={
										<div className="flex items-center space-x-2">
											<HomeIcon className="h-5 w-5" />
											<span>Posts</span>
										</div>
									}
								>
									<>
										<div className="flex justify-center">
											<Select
												label="Select Source"
												className="max-w-xs m-2"
												onChange={(e: any) => setSourceSelected(e.target.value)}
											>
												{sources.map((src: string) => (
													<SelectItem key={src} value={src} >
														{src}
													</SelectItem>
												))}
											</Select>
											<Select
												label="Select Destination"
												className="max-w-xs m-2"
												onChange={(e: any) => setDestinationSelected(e.target.value)}
											>
												{destinations.map((dest: string) => (
													<SelectItem key={dest} value={dest} >
														{dest}
													</SelectItem>
												))}
											</Select>
										</div>
										<div
											className="grid md:grid-cols-3 gap-3 mx-auto place-items-center w-full">
											{posts
												.filter(post => (sourceSelected == "" || post.source == sourceSelected) && (destinationSelected == "" || post.destination == destinationSelected))
												.map((post, index) => (
													<PostComponent
														key={index}
														id={post.id}
														author={post.author}
														source={post.source}
														destination={post.destination}
														service={post.service}
														costInPoints={post.costInPoints}
														authorId={post.authorId}
														request={post.request}
														status={post.status} />
												))}
										</div>
									</>
								</Tab>

								<Tab
									key="myposts"
									title={
										<div className="flex items-center space-x-2">
											<BookmarkIcon className="h-5 w-5" />
											<span>My Posts</span>
										</div>
									}
								>
									<MyPosts />
								</Tab>

								<Tab
									key="sentrequests"
									title={
										<div className="flex items-center space-x-2">
											<ArchiveBoxIcon className="h-5 w-5" />
											<span>Sent Requests</span>
										</div>
									}
								>
									<SentRequests />
								</Tab>
							</Tabs>
						</div>
					</>
			}
		</section >
	);
}
