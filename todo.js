const toDoForm = document.querySelector(".js-toDoForm"),
	toDoInput = form.querySelector("input"),
	toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

function handleSubmit(event) {
	event.preventDefault();
	const currentValue = toDoInput.value;
}

function loadTodos() {
	const toDos = localStorage.getItem(TODOS_LS);
	if (toDos !== null) {
	}
}

function init() {
	loadTodos();
	toDoForm.addEventListener("submit", handleSubmit);
}

init();
