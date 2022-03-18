
// @ts-check

type RotationDirection = 'left' | 'right' | 'up' | 'down';

interface RotationButtonElement extends HTMLButtonElement {
	dataset: DOMStringMap & {
		direction: RotationDirection,
	},
};

const rotation = {
	x: 0,
	y: 0,
};

const addCubePieces = () => {

	const cube = document.getElementById('cube');
	if (!cube) return;

	const cubeFaceTransformSuffix = 'translateZ(var(--cube-half))';
	const cubeFaceTransforms = [
		`${cubeFaceTransformSuffix}`,
		`rotateY(90deg) ${cubeFaceTransformSuffix}`,
		`rotateY(180deg) ${cubeFaceTransformSuffix}`,
		`rotateY(270deg) ${cubeFaceTransformSuffix}`,
		`rotateX(90deg) ${cubeFaceTransformSuffix}`,
		`rotateX(-90deg) ${cubeFaceTransformSuffix}`,
	] as const;

	const squareTransforms = [
		'translateX(calc(-1 * var(--piece-size))) translateY(calc(-1 * var(--piece-size)))',
		'translateY(calc(-1 * var(--piece-size)))',
		'translateX(var(--piece-size)) translateY(calc(-1 * var(--piece-size)))',
		'translateX(calc(-1 * var(--piece-size)))',
		'',
		'translateX(var(--piece-size))',
		'translateX(calc(-1 * var(--piece-size))) translateY(var(--piece-size))',
		'translateY(var(--piece-size))',
		'translateX(var(--piece-size)) translateY(var(--piece-size))',
	] as const;

	for (let index = 0; index < 54; index++) {

		const cubeFaceTransform = cubeFaceTransforms[Math.floor(index / 9)];
		const squareTransform = squareTransforms[(index % 9)];
		const transform = `${cubeFaceTransform} ${squareTransform}`;

		const cubePiece = document.createElement('div');
		cubePiece.classList.add('cube-piece');
		cubePiece.style.transform = transform;
		cubePiece.innerText = `${index + 1}`;

		cube.appendChild(cubePiece);

	}

};

const toggleAnimation = (event: MouseEvent) => {

	const cube = document.getElementById('cube');
	const target = event.target as (HTMLButtonElement | null);

	if (!cube || !target) return;

	const isAnimating = cube.classList.contains('animate');

	if (isAnimating) {
		cube.classList.remove('animate');
		target.innerHTML = 'Start Animation';
	} else {
		cube.classList.add('animate');
		target.innerHTML = 'Stop Animation';
	}

};

const toggleTheme = (event: MouseEvent) => {

	const target = event.target as (HTMLButtonElement | null);
	if (!target) return;

	if (document.body.classList.contains('dark')) {
		document.body.classList.remove('dark');
		target.innerHTML = 'Light';
	}
	else {
		document.body.classList.add('dark');
		target.innerHTML = 'Dark';
	}

};

const rotateCube = (event: Event) => {

	const cube = document.getElementById('cube');

	const isAnimating = !cube || cube.classList.contains('animate');

	const target = event.target as (RotationButtonElement | null);

	if (!cube || isAnimating || !target) return;

	const direction = target.dataset.direction;

	switch (direction) {
		case 'left': rotation.y = rotation.y - 90; break;
		case 'right': rotation.y = rotation.y + 90; break;
		case 'up': rotation.x = rotation.x - 90; break;
		case 'down': rotation.x = rotation.x + 90; break;
	}

	cube.style.transform = `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`;

};

if (window.onload) {
	window.onload = addCubePieces;
}
else {
	setTimeout(addCubePieces, 50);
}
document.getElementById('themeToggle')?.addEventListener('click', toggleTheme);
document.getElementById('animationToggle')?.addEventListener('click', toggleAnimation);
Array.from(document.getElementsByClassName('rotate-button')).forEach(
	cube => cube.addEventListener('click', rotateCube)
);