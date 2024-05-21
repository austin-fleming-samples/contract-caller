const styleSpecificClasses = {
	solid: "bg-primary-main text-white hover:bg-primary-muted",
	inverted: "bg-background-muted border-background-muted hover:bg-primary-main hover:text-white",
};

/* Generic button */

export const ActionButton = ({
	label,
	action,
	isDisabled = false,
	ariaLabel,
	style = "solid",
}: {
	label: string;
	action: () => Promise<any>;
	isDisabled?: boolean;
	ariaLabel?: string;
	style?: "solid" | "inverted";
}) => (
	<button
		aria-label={ariaLabel}
		disabled={isDisabled}
		className={
			"text-lg text-left whitespace-nowrap font-mono uppercase leading-none tracking-[0.2em] px-6 py-7 min-w-[16em] disabled:opacity-30 transition-colors duration-300 " +
			styleSpecificClasses[style]
		}
		onClick={(event) => {
			event.preventDefault();
			action();
		}}
	>
		{label}
	</button>
);
