import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import React, { Suspense, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Center, Float, Text3D } from "@react-three/drei";
import * as THREE from "three";
import { dark, light } from "@/ions/theme";
import useDarkMode from "@/ions/hooks/dark-mode";

const material = new THREE.MeshStandardMaterial({
	color: dark.palette.primary.main,
	metalness: 1,
	roughness: 0.5,
	side: THREE.DoubleSide,
});

function Scene() {
	const mode = useDarkMode();
	const theme = useMemo(() => (mode ? dark : light), [mode]);
	useFrame(() => {
		material.color = new THREE.Color(theme.palette.primary.main);
	});
	return (
		<group>
			<color attach="background" args={[theme.palette.background.default]} />
			<Suspense fallback={null}>
				<Center>
					<Float floatIntensity={5} speed={2}>
						<Text3D font="/fonts/fira_04.json" scale={2} material={material}>
							404
						</Text3D>
					</Float>
				</Center>
			</Suspense>
		</group>
	);
}

export default function Template() {
	return (
		<>
			<AppBar elevation={0} color="transparent">
				<Toolbar sx={{ justifyContent: "center" }}>
					<Typography component="h1" variant="h5">
						Page not found
					</Typography>
				</Toolbar>
			</AppBar>

			<Canvas style={{ height: "100vh" }}>
				<ambientLight intensity={2} />
				<pointLight intensity={2} position={[0, 24, 4]} />
				<directionalLight intensity={2} position={[0, 12, 24]} />
				<Scene />
			</Canvas>
		</>
	);
}
