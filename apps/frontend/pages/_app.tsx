import { AssessorContextProvider } from "@/modules/assessor";
import { AuthContextProvider } from "@/modules/auth";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<AuthContextProvider>
			<AssessorContextProvider>
				<Component {...pageProps} />
				<Toaster />
			</AssessorContextProvider>
		</AuthContextProvider>
	);
}

export default MyApp;
