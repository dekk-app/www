import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import React, { useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Box, Center, Float } from "@react-three/drei";
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
		<>
			<color attach="background" args={[theme.palette.background.default]} />

			<Center>
				<Float floatIntensity={5} speed={2}>
					<group position={[-Math.sqrt(2) - 0.5, 0, 0]}>
						<Box
							material={material}
							args={[1, 3, 1]}
							rotation={[0, 0, Math.PI / 4]}
							position={[0, Math.sqrt(2) / 2, 0]}
						/>
						<Box
							material={material}
							args={[1, 3, 1]}
							rotation={[0, 0, Math.PI / -4]}
							position={[0, Math.sqrt(2) / -2, 0]}
						/>
					</group>
					<group position={[Math.sqrt(2) + 0.5, 0, 0]}>
						<Box
							material={material}
							args={[1, 3, 1]}
							rotation={[0, 0, Math.PI / -4]}
							position={[0, Math.sqrt(2) / 2, 0]}
						/>
						<Box
							material={material}
							args={[1, 3, 1]}
							rotation={[0, 0, Math.PI / 4]}
							position={[0, Math.sqrt(2) / -2, 0]}
						/>
					</group>
				</Float>
			</Center>
		</>
	);
}

export default function Template() {
	return (
		<>
			<AppBar elevation={0} color="transparent">
				<Toolbar sx={{ justifyContent: "center" }}>
					<Typography component="h1" variant="h5">
						Stay tuned
					</Typography>
				</Toolbar>
			</AppBar>

			<Canvas style={{ height: "100vh" }}>
				<ambientLight intensity={2} />
				<pointLight intensity={2} position={[0, 24, 4]} />
				<directionalLight intensity={2} position={[0, 12, 24]} />
				<group>
					<Scene />
				</group>
			</Canvas>
		</>
	);
}
