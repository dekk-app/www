uniform float time;
uniform float progress;
uniform sampler2D texture1;
uniform sampler2D texture2;
varying vec2 vUv;
varying vec3 vPosition;

void main() {
	vec4 t1 = texture2D(texture1, vUv);
	vec4 t2 = texture2D(texture2, vUv);
	vec4 finalTexture = mix(t1, t2, progress);
	gl_FragColor = finalTexture;
	if (gl_FragColor.r < 0.01 && gl_FragColor.g < 0.01 && gl_FragColor.b < 0.01) {
		discard;
	}
}
