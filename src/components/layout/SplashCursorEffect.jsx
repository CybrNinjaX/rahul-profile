import SplashCursor from "../SplashCursor";

function SplashCursorEffect() {
	return (
		<SplashCursor
			SIM_RESOLUTION={96}
			DYE_RESOLUTION={640}
			CAPTURE_RESOLUTION={320}
			DENSITY_DISSIPATION={3.8}
			VELOCITY_DISSIPATION={2.8}
			PRESSURE_ITERATIONS={14}
			CURL={2.5}
			SPLAT_RADIUS={0.13}
			SPLAT_FORCE={3600}
			SHADING={false}
			COLOR_UPDATE_SPEED={4}
			RAINBOW_MODE={false}
			COLOR="#80edc4"
		/>
	);
}

export default SplashCursorEffect;
