import { Container } from "../container/container";

/* 
Simple component for hero
*/

export const Hero = () => (
	<Container classes="text-6xl py-[1.5em]">
		<h1 className="font-thin tracking-widest leading-normal uppercase">
			Contract
			<br />
			Caller
		</h1>
	</Container>
);
