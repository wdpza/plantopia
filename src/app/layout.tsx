import type { Metadata } from "next";
import "./globals.css";

import { Montserrat } from "next/font/google";
import BottomNav from "@/components/layout/BottomNav";
import Topbar from "@/components/layout/TopBar";

// Tailwind v4 CSS-first — we define font via CSS variable, not theme.extend
const montserrat = Montserrat({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-montserrat",
});

export const metadata: Metadata = {
	title: "Plant App",
	description: "A world of plant discovery.",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" className={montserrat.variable}>
			<body
				className="font-sans min-h-screen flex flex-col text-neutral-900 bg-neutral-100"
				style={{
					backgroundAttachment: "fixed",
				}}
			>
				<Topbar />
				<main className="flex-1 overflow-y-auto">
					{children}
				</main>
				<BottomNav />
			</body>
		</html>
	);
}
