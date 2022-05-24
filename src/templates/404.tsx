import useDarkMode from "@/ions/hooks/dark-mode";
import { metal } from "@/ions/materials/metal";
import { dark, light } from "@/ions/theme";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Center, OrbitControls, Text3D } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import React, { Suspense, useMemo } from "react";
import * as THREE from "three";

function Scene() {
	const mode = useDarkMode();
	const theme = useMemo(() => (mode ? dark : light), [mode]);
	useFrame(() => {
		metal.color = new THREE.Color(theme.palette.primary.main);
	});
	return (
		<>
			<color attach="background" args={[theme.palette.background.default]} />
			<Suspense fallback={null}>
				<Center>
					<Text3D font="/fonts/fira_04.json" scale={2} material={metal}>
						404
					</Text3D>
				</Center>
			</Suspense>
		</>
	);
}

export default function Template() {
	return (
		<>
			<AppBar elevation={0} color="transparent">
				<Toolbar sx={{ justifyContent: "center" }}>
					<Typography component="h1" variant="h5">
						Warning: unknown universe
					</Typography>
				</Toolbar>
			</AppBar>
			<Canvas style={{ height: "100vh" }}>
				<ambientLight />
				<OrbitControls />
				<pointLight intensity={0.3} position={[0, 0, 10]} />
				<Scene />
			</Canvas>
		</>
	);
}
