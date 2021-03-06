import { extendTheme, theme as base } from "@chakra-ui/react";
import { mode, StyleFunctionProps } from "@chakra-ui/theme-tools";

const theme = extendTheme({
	fonts: {
		heading: `Poppins, ${base.fonts?.heading}`,
		body: `Poppins, ${base.fonts?.body}`,
	},
	styles: {
		global: (props: StyleFunctionProps) => ({
			body: {
				bg: mode("#EEEEEE", "#323232")(props),
			},
		}),
	},
	components: {
		Divider: {
			variants: {
				solid: (props: StyleFunctionProps) => ({
					bg: mode("#B8B8B8", "#606060")(props),
					h: mode("1px", "0px")(props),
				}),
			},
		},
		Input: {
			variants: {
				filled: (props: StyleFunctionProps) => ({
					field: {
						bg: mode("#E0E0E0", "#424242")(props),
						_hover: { bg: mode("#E8E8E8", "#525252")(props) },
						_active: { bg: mode("#D8D8D8", "#606060")(props) },
					},
				}),
			},
		},
		Textarea: {
			variants: {
				filled: (props: StyleFunctionProps) => ({
					bg: mode("#E0E0E0", "#424242")(props),
					_hover: { bg: mode("#E8E8E8", "#525252")(props) },
					_active: { bg: mode("#D8D8D8", "#606060")(props) },
				}),
			},
		},
		Button: {
			variants: {
				solid: (props: StyleFunctionProps) => ({
					bg: mode("#E0E0E0", "#424242")(props),
					_hover: { bg: mode("#E8E8E8", "#525252")(props) },
					_active: { bg: mode("#D8D8D8", "#606060")(props) },
				}),
			},
			defaultProps: {
				size: { base: "sm", sm: "md" },
			},
		},
	},
});

export default theme;
