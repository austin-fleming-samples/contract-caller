import { targetContractAbi } from "abi/target-contract-abi";

export const CONFIG = Object.freeze({
	network: "ropsten",
	contractAddress: "0x2116e5658f83a06d5A1E737FAE2b7c4287f93595",
	abi: targetContractAbi,
	rpcNodes: {
		ropsten:
			"https://thrumming-old-firefly.ropsten.discover.quiknode.pro/8ca14b0d25fe539ac5ec1794b2f90655c8c869f4/",
	},
});
