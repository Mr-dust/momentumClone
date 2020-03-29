const API_KEY = "f6e2ffc33fcc53e53382092736814945";
const COORDS = "coords";

function saveCoords(coordsObj) {
	localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

// 경도와 위도를 읽어온 후에 saveCoords() 함수를 실행한다.
function handleGeoSuccess(position) {
	const latitude = position.coords.latitude;
	const longitude = position.coords.longitude;
	const coordsObj = {
		latitude, // js의 오브젝트에 카와 값의 변수명이 같을 경우에는 이렇게 줄여서 적을 수 있다. latitude : latitude; 와 같은 뜻이다.
		longitude
	};
	saveCoords(coordsObj);
}

function handleGeoError() {
	console.log("Cant access geo location");
}

function askForCoords() {
	navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError); // navition 이라는 객체에서 처리한다.
}

// loclaStorage에 Coordinate(좌표) 정보가 있는지 확인한 후 없으면 좌표 정보를 가져오고 있으면 날씨 정보를 가져온다.
function loadCoords() {
	const loadedCoords = localStorage.getItem(COORDS);
	if (loadedCoords === null) {
		askForCoords();
	} else {
		// getWeather
	}
}

function init() {
	loadCoords();
}

init();
