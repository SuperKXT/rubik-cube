const rotation = {
	x: 0,
	y: 0,
};

const stopAnimation = (event) => {

	const cube = document.getElementById("cube");
	const isAnimation = cube.classList.contains("animate");

	if (isAnimation) {
		cube.classList.remove("animate");
		event.target.innerHTML = 'Start Animation';
	} else {
		cube.classList.add("animate");
		event.target.innerHTML = 'Stop Animation';
	}

}

const rotate = (direction) => {

	const cube = document.getElementById("cube");

	if (direction === 'left') {
		rotation.y = rotation.y - 90;
	}
	else if (direction === 'right') {
		rotation.y = rotation.y + 90;
	}
	else if (direction === 'up') {
		rotation.x = rotation.x - 90;
	}
	else if (direction === 'down') {
		rotation.x = rotation.x + 90;
	}

	cube.style.transform = `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`;

}

document.getElementById("stopButton").addEventListener("click", stopAnimation);

document.getElementById("rotateLeft").addEventListener("click", () => rotate("left"));
document.getElementById("rotateRight").addEventListener("click", () => rotate("right"));
document.getElementById("rotateUp").addEventListener("click", () => rotate("up"));
document.getElementById("rotateDown").addEventListener("click", () => rotate("down"));
