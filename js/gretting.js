const form = document.querySelector(".js-form"),
	input = form.querySelector("input"),
	greeting = document.querySelector(".js-greetings");

const USER_LS = "currentUser",
	SHOWING_CN = "showing"; // 이 클래스 네임이 추가되어 있으면 display: block;이 된다. css파일에 설정되어 있음

function handleSubmit(event) {
	event.preventDefault();
	const currentValue = input.value;
	paintGreeting(currentValue);
	saveName(currentValue);
}

// 로컬 스토리지에 인풋 폼에 서 받아온 유저 이름을 입력한다. 그리고 이름이 유효하지 않으면 이름을 다시 묻고, 이름이 유효하면 그리팅을 그린다.
function loadName() {
	const currentUser = localStorage.getItem(USER_LS);
	if (currentUser === null || currentUser === "") {
		askForName();
	} else {
		paintGreeting(currentUser);
	}
}

function askForName() {
	form.classList.add(SHOWING_CN);
	form.addEventListener("submit", handleSubmit);
}

function paintGreeting(text) {
	form.classList.remove(SHOWING_CN); // showing 이라는 클래스 네임을 제거해서 안보이게 한다.
	greeting.classList.add(SHOWING_CN); // showing 이라는 클래스 네임을 추가해서 보이게 한다.
	greeting.innerText = `Hello, ${text}`;
}

function saveName(text) {
	localStorage.setItem(USER_LS, text);
}

function init() {
	loadName();
}

init();
