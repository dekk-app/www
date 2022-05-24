import { dark } from "@/ions/theme";
import * as THREE from "three";

export const metal = new THREE.MeshStandardMaterial({
	color: dark.palette.primary.main,
	metalness: 0.8,
	roughness: 0.2,
	side: THREE.DoubleSide,
});
