import useDarkMode from "@/ions/hooks/dark-mode";
import { metal } from "@/ions/materials/metal";
import fragmentShader from "@/ions/shaders/particle.frag";
import vertexShader from "@/ions/shaders/particle.vert";
import { useStore } from "@/ions/store";
import { dark, light } from "@/ions/theme";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Slider from "@mui/material/Slider";
import Toolbar from "@mui/material/Toolbar";
import { circIn } from "@popmotion/easing";
import { useSpring } from "@react-spring/three";
import { useTexture } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
// Postprocessing
// import { Bloom, EffectComposer } from "@react-three/postprocessing";
// import { BlendFunction, BloomEffect, BloomEffectOptions } from "postprocessing";
import React, { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

function rotate<T>(items: T[], reverse?: boolean) {
	if (reverse) {
		items.push(items.shift());
	} else {
		items.unshift(items.pop());
	}
}

const size = 1024;
function Scene() {
	const page = useStore(state => state.page);
	const animating = useStore(state => state.animating);
	const particleSize = useStore(state => state.particleSize);
	const mode = useDarkMode();
	const theme = useMemo(() => (mode ? dark : light), [mode]);

	const textures = useTexture([
		"/images/_01.jpg",
		"/images/_02.jpg",
		"/images/_03.jpg",
		"/images/_04.jpg",
		"/images/_05.jpg",
	]);

	const plane = useRef<THREE.Points<THREE.PlaneBufferGeometry, THREE.ShaderMaterial>>(null);
	const images = useRef(textures);
	const progress = useRef(animating ? 1 : 0);
	// Postprocessing
	// const bloom = useRef<typeof BloomEffect>(null);

	const uniforms = useMemo(
		() => ({
			time: { value: 0 },
			progress: { value: 0 },
			particleSize: { value: particleSize },
			distortion: { value: 0 },
			texture1: { value: images.current[0] },
			texture2: { value: images.current[1] },
		}),
		[]
	);

	const styles = useSpring({
		progress: animating ? 1 : 0,
		config: { duration: 2500 },
		immediate: !animating,
		onRest({ finished }) {
			if (finished) {
				useStore.setState({
					animating: false,
				});
			}
		},
	});

	useFrame(({ clock }) => {
		metal.color = new THREE.Color(theme.palette.primary.main);
		plane.current.material.uniforms.particleSize.value = particleSize;
		if (
			animating &&
			// Bloom.current &&
			plane.current?.material &&
			"uniforms" in plane.current.material
		) {
			styles.progress.to(v => {
				progress.current = v;
			});
			// (bloom.current as BloomEffectOptions).intensity =
			//	easeInOut(Math.sin(Math.PI * progress.current)) * 10;
			plane.current.material.uniforms.time.value = clock.getElapsedTime();
			plane.current.material.uniforms.distortion.value =
				Math.sin(Math.PI * progress.current) * 2;
			plane.current.material.uniforms.progress.value = circIn(
				Math.sin((Math.PI * progress.current) / 2)
			);
		}
	});

	useEffect(() => {
		const animating = useStore.getState().animating;
		if (!animating && page > 0) {
			if (page > 1) {
				rotate(images.current, true);
				plane.current.material.uniforms.texture1.value = images.current[0];
				plane.current.material.uniforms.texture2.value = images.current[1];
			}

			useStore.setState({ animating: true });
		}
	}, [page]);

	return (
		<>
			<color attach="background" args={["black"]} />

			<points ref={plane}>
				<planeBufferGeometry
					args={[size, size, size / particleSize, size / particleSize]}
				/>
				<shaderMaterial
					vertexShader={vertexShader}
					fragmentShader={fragmentShader}
					uniforms={uniforms}
				/>
			</points>
		</>
	);
}

export default function Template() {
	const animating = useStore(state => state.animating);
	const particleSize = useStore(state => state.particleSize);
	return (
		<>
			<AppBar elevation={0} color="secondary">
				<Toolbar sx={{ justifyContent: "end" }}>
					<Box px={4} sx={{ flex: 1, display: "flex", alignItems: "center" }}>
						<Slider
							min={2}
							max={16}
							step={2}
							value={particleSize}
							onChange={(event_, value: number) => {
								useStore.setState({
									particleSize: value,
								});
							}}
						/>
					</Box>
					<IconButton
						disabled={animating}
						aria-label="next slide"
						onClick={() => {
							useStore.setState(state => ({
								page: state.page + 1,
							}));
						}}
					>
						<ArrowForwardIcon />
					</IconButton>
				</Toolbar>
			</AppBar>
			<Canvas
				style={{ height: "100vh" }}
				camera={{ position: [0, 0, 1000], near: 500, far: 1500 }}
			>
				<Scene />
			</Canvas>
		</>
	);
}
