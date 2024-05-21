import type { ReactNode } from "react";

/* Generic container to ensure consistent content width */

export const Container = ({
	children,
	classes = "",
	tag = "section",
}: {
	children: ReactNode;
	classes?: string;
	tag?: "section" | "div" | "header";
}) => {
	const Tag = tag;
	return <Tag className={`mx-auto w-full max-w-screen-lg px-8 ${classes}`}>{children}</Tag>;
};
