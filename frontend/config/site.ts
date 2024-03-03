export type SiteConfig = typeof siteConfig;

export const siteConfig = {
	name: "Geddit",
	server_url: process.env.NEXT_PUBLIC_SERVER_ENDPOINT,
	description: "Get things done.",
	navItems: [
		{ label: "Dashboard", href: "/user/dashboard" },
	],
	links: {
		github: "https://github.com/divyateja04/geddit",
	},
};
