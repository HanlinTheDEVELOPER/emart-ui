import Header from "@/components/header";
import Provider from "@/components/provider";
import { Container, CssBaseline } from "@mui/material";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { getAuth } from "./action";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "eMart",
	description: "Generated by create next app",
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const auth = await getAuth();
	return (
		<html lang="en">
			<body className={inter.className}>
				<Provider authentication={auth}>
						<Header />
					<Container>
						{children}
					</Container>
					<CssBaseline />
				</Provider>
			</body>
		</html>
	);
}
