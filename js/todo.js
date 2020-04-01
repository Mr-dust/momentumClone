const toDoForm = document.querySelector(".js-toDoForm"),
	toDoInput = toDoForm.querySelector("input"),
	toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

let toDos = [];

function deleteToDo(event) {
	// html에서 버튼을 지운다
	const btn = event.target;
	const li = btn.parentNode; // 버튼의 부모 노드를 가져온다.
	toDoList.removeChild(li);
	// doDos 배열에서 방금 클릭한 버튼의 부모 li와 아이디가 같지 않은 것들만 필터링한다.
	const cleanToDos = toDos.filter(function(toDo) {
		return toDo.id !== parseInt(li.id); // li.id가 string 이므로 int로 변환해서 비교한다.
	});
	toDos = cleanToDos; // toDos 배열을 필터링된 새로운 배열로 교체한다.
	saveToDos(); // 교체된 toDos 배열을 localStorage에 저장하는 함수 호출
}

// toDo의 내용과 id를 객체로 저장한다.
function saveToDos() {
	localStorage.setItem(TODOS_LS, JSON.stringify(toDos)); // localStorage에는 오직 string만 저장할 수 있다. JSOM.stringify 는 오브젝트를 JSON 형태의 스트링으로 변환한다.
}

function paintToDo(text) {
	// 부모가 될 li엘리먼트 처리
	const li = document.createElement("li"); // 부모가 될 li 엘리먼트를 만든다.
	toDoList.appendChild(li);
	const newId = toDos.length + 1; // li의 id로 사용할 번호 처리. 배열의 위치 +1을 id로 삼는다. 0부터 시작하니까...
	li.id = newId; // li의 id를 할당한다.

	// toDo의 내용 처리
	const span = document.createElement("span"); // span 엘리먼트를 만든다.
	span.innerText = `${text} `; // span 엘리먼트의 toDo의 내용으로 채운다.
	li.appendChild(span); // span을 li의 자식으로 붙인다.

	// del 버튼 처리
	const delBtn = document.createElement("button"); // del버튼을 만든다.
	delBtn.innerText = "X"; // del 버튼에 X라는 텍스트 추가
	li.appendChild(delBtn); // del 버튼을 li의 자식으로 붙인다.
	delBtn.addEventListener("click", deleteToDo); // 지우기를 처리할 수 있도록 del 버튼에 click 이벤트 리스너를 붙인다.

	// toDo 오브젝트 처리
	const toDoObj = {
		text: text,
		id: newId
	};
	toDos.push(toDoObj);
	saveToDos();
}

function handleSubmit(event) {
	event.preventDefault(); // 불필요한 동작이 발생하지 않도록 기본적인 이벤트 처리를 막는다.
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
