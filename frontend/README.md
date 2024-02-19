# Geddit - Frontend

## Technologies Used

-   [Next.js 13](https://nextjs.org/docs/getting-started)
-   [NextUI v2](https://nextui.org/)
-   [Tailwind CSS](https://tailwindcss.com/)
-   [Tailwind Variants](https://tailwind-variants.org)
-   [TypeScript](https://www.typescriptlang.org/)
-   [Framer Motion](https://www.framer.com/motion/)
-   [next-themes](https://github.com/pacocoursey/next-themes)

## Template Layout

```
export default function AboutLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
			<div className="inline-block max-w-lg text-center justify-center">
				{children}
			</div>
		</section>
	);
}

```

## How to Use

### Use the template with create-next-app

To create a new project based on this template using `create-next-app`, run the following command:

```bash
npx create-next-app -e https://github.com/nextui-org/next-app-template
```

### Install dependencies

```bash
npm install
```

### Run the development server

```bash
npm run dev
```

## License

Licensed under the [MIT license](https://github.com/nextui-org/next-app-template/blob/main/LICENSE).
