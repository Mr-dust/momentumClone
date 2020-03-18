const toDoForm = document.querySelector(".js-toDoForm"),
	toDoInput = toDoForm.querySelector("input"),
	toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

const toDos = [];

function saveToDos() {
	localStorage.setItem(TODOS_LS, JSON.stringify(toDos)); // localStorage에는 오직 string만 저장할 수 있다. JSOM.stringify 는 오브젝트를 JSON 형태의 스트링으로 변환한다.
}

function paintToDo(text) {
	const li = document.createElement("li");
	const delBtn = document.createElement("button");
	const span = document.createElement("span");
	const newId = toDos.length + 1;
	delBtn.innerText = "X";
	span.innerText = text;
	li.appendChild(delBtn);
	li.appendChild(span);
	toDoList.appendChild(li);
	li.id = newId;
	const toDoObj = {
		text: text,
		id: newId
	};
	toDos.push(toDoObj);
	saveToDos();
}

function handleSubmit(event) {
	event.preventDefault();
	const currentValue = toDoInput.value;
	paintToDo(currentValue);
	toDoInput.value = "";
}

// 페이지를 초기화할 때 localStorage에 있는 todo를 가져와서 내용이 있으면 그려준다.
function loadTodos() {
	const loadedToDos = localStorage.getItem(TODOS_LS);
	if (loadedToDos !== null) {
		const parsedToDos = JSON.parse(loadedToDos); // 스트링이었던 localStorage 데이터를 오브젝트 형태로 변환
		parsedToDos.forEach(function(toDo) {
			// array 에 있는 각 항목에 대해 각각 함수를 실행한다. 따로 함수를 만들지 않고 forEach 내부에 직접 함수를 만듬
			paintToDo(toDo.text);
		});
	}
}

function init() {
	loadTodos();
	toDoForm.addEventListener("submit", handleSubmit);
}

init();
