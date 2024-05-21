import { ContractForm } from "@/components/contract-form/contract-form";
import { Hero } from "@/components/hero/hero";
import { LogIn } from "@/components/log-in/log-in";
import { Navbar } from "@/components/navbar/navbar";
import type { NextPage } from "next";

const Home: NextPage = () => {
	return (
		<>
			<Navbar />
			<main className="min-h-screen">
				<Hero />
				<ContractForm />
				<LogIn />
			</main>
		</>
	);
};

export default Home;
