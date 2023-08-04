async function websiteUp(url) {
	// TODO Fix CORS
	try {
		const response = await fetch(url, { method: 'options' });
		return response.ok;
	} catch (error) {
		console.error(`An error occurred while checking the URL '${url}': ${error.message}`);
	}
}

async function check(destination, container, dot, message, button) {
	dot.className = 'dot orange';
	message.textContent = 'Checking availability...';
	button.style.visibility = 'hidden';

	const destinationUp = await websiteUp(destination);

	if (destinationUp) {
		console.log('Destination is back up');

		dot.className = 'dot green';
		message.textContent = 'URL is back online.';
		button.textContent = "Go to URL.";
		button.onclick = function () {
			window.location.href = destination;
		};
	} else {
		dot.className = 'dot red';
		message.textContent = 'URL is still down.';
		button.textContent = "Check again.";
		button.onclick = function () {
			check(destination, container, dot, message, button);
		};
	}
	button.style.visibility = 'visible';
}

function createCheckButton(destination) {
	const dot = document.createElement('span');
	const message = document.createElement('span');
	const button = document.createElement('button');

	const container = document.getElementById('checkContainer');
	container.appendChild(dot);
	container.appendChild(message);
	container.appendChild(button);

	check(destination, container, dot, message, button);
}

function createTryAgainButton(destination) {
	const button = document.createElement('button');
	button.textContent = 'Try Again';
	button.onclick = function () {
		window.location.href = destination;
	}

	document.getElementById('checkContainer').appendChild(button);
}

function checkDestination() {
    const url = window.location.search;
    const searchParams = new URLSearchParams(url);
    const destination = searchParams.get('destination');

    if (destination) {
        createTryAgainButton(destination);
    }
}

checkDestination();