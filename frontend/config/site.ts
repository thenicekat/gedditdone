export type SiteConfig = typeof siteConfig;

export const siteConfig = {
	name: "Geddit",
	server_url: "http://localhost:5000",
	description: "Get things done.",
	navItems: [
		{
			href: "/login",
			label: "Login"
		}
	],
	links: {
		github: "https://github.com/divyateja04/geddit",
	},
};
