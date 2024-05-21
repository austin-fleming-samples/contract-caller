import { useAuthContext } from "@/modules/auth";
import { ActionButton } from "../action-button/action-button";
import { Container } from "../container/container";

/* 
This component handles the login and account info presentation logic.
*/

const formatAddress = (address: string) => `0x${address.slice(2).toUpperCase()}`;

export const LogIn = () => {
	const { connect, disconnect, connectionStatus, address, network, balance, errorMessage } =
		useAuthContext();

	return (
		<Container>
			<div className="pl-1 pt-8 flex flex-col items-start">
				<div className="flex flex-row gap-4 items-center">
					{(connectionStatus === "DISCONNECTED" || connectionStatus === "CONNECTING") && (
						<ActionButton
							label={connectionStatus === "CONNECTING" ? "connecting..." : "Log In"}
							ariaLabel="open login modal"
							action={connect}
							isDisabled={!!errorMessage || connectionStatus === "CONNECTING"}
						/>
					)}
					{connectionStatus === "CONNECTED" && (
						<ActionButton label="Log Out" style="inverted" action={disconnect} />
					)}

					{errorMessage && <span className="text-xs text-pink-900">{errorMessage}</span>}
				</div>

				<div className="grid grid-cols-[auto_auto] gap-x-4 gap-y-3 uppercase text-sm pt-6 pl-6">
					<span>Balance</span>
					<span className="font-bold">{balance || "-"}</span>

					<span>Address</span>
					<span className="font-bold normal-case">{address ? formatAddress(address) : "-"}</span>

					<span>Network</span>
					<span className="font-bold">{network || "-"}</span>
				</div>
			</div>
		</Container>
	);
};
