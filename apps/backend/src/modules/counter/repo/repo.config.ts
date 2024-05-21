import { ethers } from "ethers";
import { counterAbi } from "./repo.abi";

export const REPO_CONFIG = {
	abi: counterAbi,
	contractAddress: "0x2116e5658f83a06d5A1E737FAE2b7c4287f93595",
	network: "ropsten",
	rpcProvider: new ethers.providers.JsonRpcProvider(
		"https://thrumming-old-firefly.ropsten.discover.quiknode.pro/8ca14b0d25fe539ac5ec1794b2f90655c8c869f4/",
		"ropsten",
	),
};
