export type SiteConfig = typeof siteConfig;

export const siteConfig = {
	name: "Geddit",
	server_url: process.env.NEXT_PUBLIC_SERVER_URL,
	description: "Get things done.",
	navItems: [
		{ label: "Profile", href: "/user/profile" },
	],
	links: {
		github: "https://github.com/divyateja04/geddit",
	},
};
