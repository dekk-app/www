import createTheme from "@mui/material/styles/createTheme";
import { TypographyOptions } from "@mui/material/styles/createTypography";

const typography: TypographyOptions = {
	fontFamily:
		'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
};

export const dark = createTheme({
	palette: {
		mode: "dark",
		primary: {
			main: "#663399",
		},
		secondary: {
			main: "#993366",
		},
	},
	typography,
});

export const light = createTheme({
	palette: {
		mode: "light",
		primary: {
			main: "#663399",
		},
		secondary: {
			main: "#993366",
		},
	},
	typography,
});
