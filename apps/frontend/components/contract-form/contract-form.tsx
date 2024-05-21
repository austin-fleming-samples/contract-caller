import { useAssessorContext } from "@/modules/assessor";
import { ActionButton } from "../action-button/action-button";
import { Container } from "../container/container";

/* 
This component handles the contract interactions.
*/

export const ContractForm = () => {
	const {
		lastNumberString,
		loadLastNumber,
		requestNextNumber,
		contract,
		contractAddress,
		pendingNextNumber,
	} = useAssessorContext();

	// TODO: separate dumb from container
	return (
		<Container classes="flex flex-col gap-2">
			<span className="text-xs uppercase h-[2em] flex flex-row items-center leading-none self-end">
				{contract && contractAddress ? (
					<>
						connected to contract{" "}
						<span
							onClick={() => navigator.clipboard.writeText(contractAddress)}
							className="h-full bg-white text-black px-[1em] flex flex-row items-center justify-center ml-[1em] cursor-pointer hover:bg-slate-100 "
						>
							{`0x...${contractAddress.slice(-4)}`}
							<img
								className="ml-[0.5em] w-[1em] h-[1em]"
								alt="click to copy icon"
								src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAAbUlEQVRIiWNgGE7Am4GB4QkDA8N/MjFB8JgCw4mygGiFpAAmahtIigXkxsljBgYGT2wGogcRJXHyiBgLyI0TFH0DGgejFoxaMFIsYEFiM9LCggENoidQmpyK5zExlnsykFeiPmJgYPAgxoKhAQAobmMW+E0ohwAAAABJRU5ErkJggg=="
							/>
						</span>
					</>
				) : (
					"not connected to contract"
				)}
			</span>

			<div className="w-full bg-white p-1 flex flex-row items-center">
				{lastNumberString ? (
					<ActionButton
						isDisabled={!contract || pendingNextNumber}
						label={pendingNextNumber ? "submitting..." : "Next Number"}
						action={requestNextNumber}
					/>
				) : (
					<ActionButton
						isDisabled={!contract}
						label="Get Last Number"
						action={loadLastNumber}
						style={!contract ? "inverted" : "solid"}
					/>
				)}
				<div
					id="current-number"
					className="w-full text-lg px-[1.5em] py-[0.75em] font-mono bg-white flex flex-row justify-center"
				>
					<span className="w-full text-center leading-none tracking-widest">
						{lastNumberString || "-"}
					</span>
				</div>
			</div>
		</Container>
	);
};
