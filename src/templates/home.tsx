import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import React, { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Box } from "@react-three/drei";
import * as THREE from "three";
import { dark, light } from "@/ions/theme";
import useDarkMode from "@/ions/hooks/dark-mode";
import { Group } from "three";

const material = new THREE.MeshStandardMaterial({
	color: dark.palette.primary.main,
	metalness: 1,
	roughness: 0.5,
	side: THREE.DoubleSide,
});
function Scene() {
	const mode = useDarkMode();
	const theme = useMemo(() => (mode ? dark : light), [mode]);
	const ref = useRef<Group>(null);
	useFrame(({ clock }) => {
		const time = clock.getElapsedTime();
		ref.current.rotation.y = Math.sin((Math.PI / 2) * time) / 10;
		ref.current.rotation.x = Math.cos((Math.PI / 2) * time) / 10;
		material.color = new THREE.Color(theme.palette.primary.main);
	});
	return (
		<group ref={ref}>
			<color attach="background" args={[theme.palette.background.default]} />
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
		</group>
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

			<Canvas style={{ minHeight: "100vh" }}>
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
