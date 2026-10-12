import { useEffect, useRef } from "react";

const DEFAULT_CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$&*()-_+=/[]{};:<>.,0123456789";
const DEFAULT_FONT = "ui-monospace, 'SF Mono', 'JetBrains Mono', Menlo, Consolas, monospace";

function LetterGlitch({
	glitchColors,
	baseColor,
	characters = DEFAULT_CHARACTERS,
	fontFamily = DEFAULT_FONT,
	fontSize = 14,
	spacing = 0.6,
	density = 0.9,
	baseOpacity = 0.16,
	glitchAmount = 0.5,
	speed = 1,
	smooth = true,
	interactive = true,
	cursorRadius = 140,
	clickEffect = "tear",
	flow = 0.5,
	edgeFade = 0.12,
	centerFade = 0.58,
	intro = true,
	lightMode = false,
	backgroundColor,
	dpr,
	className = "",
	style,
}) {
	const containerRef = useRef(null);
	const wakeRef = useRef(null);
	const settings = {
		glitchColors: (glitchColors?.length ? glitchColors : lightMode ? ["#18181b", "#0f9f6e"] : ["#ffffff", "#61dca3"]).slice(0, 8),
		baseColor: baseColor || (lightMode ? "#18181b" : "#ffffff"),
		characters: characters || DEFAULT_CHARACTERS,
		fontFamily: fontFamily || DEFAULT_FONT,
		fontSize: Math.min(96, Math.max(6, fontSize)),
		spacing: Math.min(2, Math.max(0, spacing)),
		density: Math.min(1, Math.max(0, density)),
		baseOpacity: Math.min(1, Math.max(0, baseOpacity)),
		glitchAmount: Math.min(1, Math.max(0, glitchAmount)),
		speed: Math.max(0, speed),
		smooth,
		interactive,
		cursorRadius: Math.max(0, cursorRadius),
		clickEffect,
		flow: Math.min(1, Math.max(0, flow)),
		edgeFade: Math.min(0.5, Math.max(0, edgeFade)),
		centerFade: Math.min(1, Math.max(0, centerFade)),
		intro,
		backgroundColor,
		dpr: Math.min(2, Math.max(1, dpr || window.devicePixelRatio || 1)),
	};
	const settingsRef = useRef(settings);

	useEffect(() => {
		settingsRef.current = settings;
		wakeRef.current?.();
	});

	useEffect(() => {
		const container = containerRef.current;
		if (!container) return undefined;
		const canvas = document.createElement("canvas");
		const context = canvas.getContext("2d", { alpha: true });
		if (!context) return undefined;
		canvas.setAttribute("aria-hidden", "true");
		container.appendChild(canvas);

		const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		const pointer = { x: -1000, y: -1000, active: false };
		let cells = [];
		let columns = 0;
		let rows = 0;
		let cellWidth = 0;
		let cellHeight = 0;
		let frame = 0;
		let lastFrame = 0;
		let elapsed = 0;
		let visible = true;
		let mounted = true;
		const randomGlyph = settings => settings.characters[(Math.random() * settings.characters.length) | 0];

		const resize = () => {
			const settings = settingsRef.current;
			const bounds = container.getBoundingClientRect();
			const ratio = settings.dpr;
			canvas.width = Math.max(1, Math.round(bounds.width * ratio));
			canvas.height = Math.max(1, Math.round(bounds.height * ratio));
			canvas.style.width = `${bounds.width}px`;
			canvas.style.height = `${bounds.height}px`;
			context.setTransform(ratio, 0, 0, ratio, 0, 0);
			cellWidth = Math.max(4, settings.fontSize * (1 + settings.spacing));
			cellHeight = Math.max(5, settings.fontSize * (0.95 + settings.spacing));
			columns = Math.ceil(bounds.width / cellWidth) + 1;
			rows = Math.ceil(bounds.height / cellHeight) + 1;
			cells = Array.from({ length: columns * rows }, () => ({
				glyph: randomGlyph(settings),
				seed: Math.random(),
				heat: 0,
				color: 0,
			}));
			wake();
		};

		const setPointer = event => {
			const bounds = container.getBoundingClientRect();
			pointer.x = event.clientX - bounds.left;
			pointer.y = event.clientY - bounds.top;
			pointer.active = pointer.x >= 0 && pointer.y >= 0 && pointer.x <= bounds.width && pointer.y <= bounds.height;
			wake();
		};

		const handlePointerMove = event => {
			if (settingsRef.current.interactive) setPointer(event);
		};
		const handlePointerLeave = () => {
			pointer.active = false;
			wake();
		};

		const handlePointerDown = event => {
			const settings = settingsRef.current;
			if (!settings.interactive || settings.clickEffect === "none") return;
			setPointer(event);
			const column = Math.floor(pointer.x / cellWidth);
			const row = Math.floor(pointer.y / cellHeight);
			const paletteLength = settings.glitchColors.length;
			if (settings.clickEffect === "burst") {
				for (let index = 0; index < cells.length; index++) {
					const x = (index % columns) - column;
					const y = Math.floor(index / columns) - row;
					if (Math.hypot(x, y) < 18) {
						cells[index].heat = Math.max(cells[index].heat, 1 - Math.hypot(x, y) / 20);
						cells[index].glyph = randomGlyph(settings);
						cells[index].color = (Math.random() * paletteLength) | 0;
					}
				}
			} else {
				for (let offset = -2; offset <= 2; offset++) {
					const rowIndex = row + offset;
					if (rowIndex < 0 || rowIndex >= rows) continue;
					for (let columnIndex = 0; columnIndex < columns; columnIndex++) {
						const cell = cells[rowIndex * columns + columnIndex];
						if (Math.random() > 0.2 + 0.14 * Math.abs(offset)) continue;
						cell.heat = Math.max(cell.heat, 0.8 - Math.abs(offset) * 0.13);
						cell.glyph = randomGlyph(settings);
						cell.color = (Math.random() * paletteLength) | 0;
					}
				}
			}
			wake();
		};

		const draw = now => {
			frame = 0;
			if (!mounted || !visible || document.hidden) return;
			if (now - lastFrame < 32) {
				frame = window.requestAnimationFrame(draw);
				return;
			}
			const delta = lastFrame ? Math.min((now - lastFrame) / 1000, 0.05) : 1 / 60;
			lastFrame = now;
			const settings = settingsRef.current;
			elapsed += reducedMotion ? 0 : delta * settings.speed;
			const bounds = container.getBoundingClientRect();
			const width = bounds.width;
			const height = bounds.height;
			const palette = settings.glitchColors;
			context.clearRect(0, 0, width, height);
			if (settings.backgroundColor) {
				context.fillStyle = settings.backgroundColor;
				context.fillRect(0, 0, width, height);
			}
			context.font = `${settings.fontSize}px ${settings.fontFamily}`;
			context.textBaseline = "top";
			let hasHeat = false;

			for (let index = 0; index < cells.length; index++) {
				const cell = cells[index];
				const column = index % columns;
				const row = (index / columns) | 0;
				const x = column * cellWidth;
				const y = row * cellHeight;
				const centerX = x + cellWidth / 2;
				const centerY = y + cellHeight / 2;
				const dx = pointer.x - centerX;
				const dy = pointer.y - centerY;
				const distance = Math.hypot(dx, dy);

				if (!reducedMotion && settings.speed > 0 && Math.random() < delta * settings.speed * settings.glitchAmount * 0.32) {
					cell.heat = 0.45 + Math.random() * 0.55;
					cell.glyph = randomGlyph(settings);
					cell.color = (Math.random() * palette.length) | 0;
				}
				if (pointer.active && settings.interactive && distance < settings.cursorRadius && Math.random() < delta * 8) {
					cell.heat = Math.max(cell.heat, (1 - distance / settings.cursorRadius) ** 2);
					cell.glyph = randomGlyph(settings);
					cell.color = (Math.random() * palette.length) | 0;
				}
				cell.heat = Math.max(0, cell.heat - delta * (settings.smooth ? 1.8 : 5));
				if (cell.heat > 0.005) hasHeat = true;

				const wave = 0.5 + 0.5 * Math.sin(x * 0.008 + y * 0.012 - elapsed * 0.55);
				const flowOpacity = 1 - settings.flow + settings.flow * (0.25 + wave * 0.95);
				const introOpacity = settings.intro ? Math.min(1, elapsed / 1.4 + cell.seed * 0.25) : 1;
				const restOpacity = cell.seed < settings.density ? settings.baseOpacity * flowOpacity * introOpacity : 0;
				const edgeDistance = Math.min(centerX, centerY, width - centerX, height - centerY);
				const edgeOpacity = settings.edgeFade ? Math.min(1, edgeDistance / (Math.min(width, height) * settings.edgeFade)) : 1;
				const middleDistance = Math.hypot((centerX - width / 2) / (width * 0.37), (centerY - height / 2) / (height * 0.32));
				const middleOpacity = 1 - settings.centerFade * (1 - Math.min(1, middleDistance));
				const heat = Math.min(1, cell.heat);
				const opacity = Math.min(1, Math.max(restOpacity, heat) * edgeOpacity * middleOpacity);
				if (opacity < 0.005) continue;
				context.globalAlpha = opacity;
				context.fillStyle = heat > 0.02 ? palette[cell.color] : settings.baseColor;
				context.fillText(cell.glyph, x, y);
			}
			context.globalAlpha = 1;
			if (!reducedMotion && (settings.speed > 0 || hasHeat || pointer.active)) {
				frame = window.requestAnimationFrame(draw);
			}
		};

		function wake() {
			if (!frame && visible && !document.hidden) frame = window.requestAnimationFrame(draw);
		}
		wakeRef.current = wake;

		const resizeObserver = new ResizeObserver(resize);
		resizeObserver.observe(container);
		const intersectionObserver = new IntersectionObserver(([entry]) => {
			visible = entry.isIntersecting;
			if (visible) {
				lastFrame = 0;
				wake();
			}
			else {
				window.cancelAnimationFrame(frame);
				frame = 0;
			}
		});
		intersectionObserver.observe(container);
		const handleVisibility = () => {
			if (document.hidden) {
				window.cancelAnimationFrame(frame);
				frame = 0;
			} else {
				lastFrame = 0;
				wake();
			}
		};
		window.addEventListener("resize", resize);
		window.addEventListener("pointermove", handlePointerMove, { passive: true });
		window.addEventListener("pointerleave", handlePointerLeave);
		window.addEventListener("pointerdown", handlePointerDown, { passive: true });
		document.addEventListener("visibilitychange", handleVisibility);
		resize();

		return () => {
			mounted = false;
			wakeRef.current = null;
			window.cancelAnimationFrame(frame);
			resizeObserver.disconnect();
			intersectionObserver.disconnect();
			window.removeEventListener("resize", resize);
			window.removeEventListener("pointermove", handlePointerMove);
			window.removeEventListener("pointerleave", handlePointerLeave);
			window.removeEventListener("pointerdown", handlePointerDown);
			document.removeEventListener("visibilitychange", handleVisibility);
			canvas.remove();
		};
	}, []);

	return (
		<div
			ref={containerRef}
			className={`letter-glitch-backdrop ${className}`.trim()}
			style={style}
			aria-hidden="true"
		/>
	);
}

export default LetterGlitch;