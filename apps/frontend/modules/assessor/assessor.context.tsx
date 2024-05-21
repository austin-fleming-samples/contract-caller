import { createContext, useContext } from "react";
import type { ReactNode } from "react";
import { initialAssessorState } from "./assessor.reducer";
import type { AssessorState } from "./assessor.reducer";
import { useAssessor } from "./assessor.hook";

const AssessorContext = createContext<AssessorState>(initialAssessorState);

export const AssessorContextProvider = ({ children }: { children: ReactNode }) => {
	const accessorState = useAssessor();

	return <AssessorContext.Provider value={accessorState}>{children}</AssessorContext.Provider>;
};

export const useAssessorContext = () => useContext(AssessorContext);
