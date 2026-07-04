// Gradient color stops (position 0-1, color) shared between the main thread and the texture worker
export const gradientStops = [
	{ pos: 0.0, r: 30, g: 25, b: 45, a: 0.0 }, // transparent at center
	{ pos: 0.3, r: 30, g: 25, b: 45, a: 0.1 }, // faint background tint
	{ pos: 0.5, r: 30, g: 25, b: 45, a: 0.05 }, // fade out tint
	{ pos: 0.5, r: 70, g: 130, b: 220, a: 0.0 }, // blue starts transparent
	{ pos: 0.72, r: 70, g: 130, b: 220, a: 0.5 }, // blue peak
	{ pos: 0.85, r: 105, g: 105, b: 220, a: 0.35 }, // blue-violet transition
	{ pos: 0.95, r: 140, g: 80, b: 220, a: 0.3 }, // violet
	{ pos: 0.98, r: 180, g: 140, b: 235, a: 0.5 }, // light violet
	{ pos: 0.995, r: 250, g: 248, b: 255, a: 0.9 }, // white edge
	{ pos: 1.0, r: 250, g: 248, b: 255, a: 0.0 }, // fade out at edge
];

// Interpolate between gradient stops
export const getColorAtPosition = (t: number): { r: number; g: number; b: number; a: number } => {
	let lowStop = gradientStops[0];
	let highStop = gradientStops[gradientStops.length - 1];

	for (let i = 0; i < gradientStops.length - 1; i++) {
		if (t >= gradientStops[i].pos && t <= gradientStops[i + 1].pos) {
			lowStop = gradientStops[i];
			highStop = gradientStops[i + 1];
			break;
		}
	}

	const range = highStop.pos - lowStop.pos;
	const factor = range > 0 ? (t - lowStop.pos) / range : 0;

	return {
		r: Math.round(lowStop.r + (highStop.r - lowStop.r) * factor),
		g: Math.round(lowStop.g + (highStop.g - lowStop.g) * factor),
		b: Math.round(lowStop.b + (highStop.b - lowStop.b) * factor),
		a: lowStop.a + (highStop.a - lowStop.a) * factor,
	};
};
