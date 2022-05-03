import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import React from "react";

export default function Template() {
	return (
		<AppBar elevation={0} color="transparent">
			<Toolbar>
				<Typography component="h1" variant="h5">
					Dekk
				</Typography>
			</Toolbar>
		</AppBar>
	);
}
