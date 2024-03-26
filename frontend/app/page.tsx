"use client"
import React from "react";
import { title } from "@/components/primitives";
import PostComponent from "@/components/Post";
import getGoogleOAuthUrl from "@/utils/getGoogleOAuthUrl";
import { Button } from "@nextui-org/button";
import axios from "axios";
import { siteConfig } from "@/config/site";
import { Post } from "@/types";
import { HttpCodes } from "@/types/HttpCodes";
import { PlusCircleIcon } from "@heroicons/react/24/solid";

axios.defaults.withCredentials = true;

export default function Home() {
	const [posts, setPosts] = React.useState<Post[]>([]);
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

							<Button
								className="w-full"
								color="success" variant="bordered" radius="sm" size="lg"
								onClick={
									() => {
										window.location.href = "/user/dashboard";
									}
								}>
								Dashboard
							</Button>
						</div>
						<div
							className="grid md:grid-cols-3 gap-3 mx-auto place-items-center w-full">
							{
								posts.map((post, index) => (
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
									/>
								))
							}
						</div>
					</>
			}
		</section >
	);
}
