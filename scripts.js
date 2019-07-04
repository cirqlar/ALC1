(function app(window) {

  const form = document.getElementById('TodoForm');
  const formTitle = document.getElementById('TodoFormTitle');
  const formId = document.getElementById('formId');
  const submit = document.getElementById('TodoFormSubmit');
  const clear = document.getElementById('TodoFormClear');
  const todosDiv = document.getElementById('todos');
  const noTODOs = document.getElementById('noTODOs');

  form.addEventListener('submit', function(e) {
    const title = formTitle.value;

    if (formId.value == '') { // If new  TODO
      createTODO(title);
    } else {
      saveTODO(formId.value, title);
    }

    clearForm();
    e.preventDefault();
  });

  clear.addEventListener('click', clearForm);

  /**
  * @param {string} id The id of the TODO
  * @param {string} title The new TODO title
  */
  function saveTODO(id, title) {
    const todo = document.getElementById(id);
    todo.firstChild.innerHTML = title;
  }

  /**
   * @param {string} title The TODO Title
   */
  function createTODO(title) {
    // Remove NoTODOs
    if (todosDiv.children.length == 1) {
      noTODOs.style.display = 'none';
    }

    // Create Title
    const newTodoTitle = document.createElement('p');
    newTodoTitle.innerHTML = title;

    // Create Todo
    const newTodo = document.createElement('div');
    newTodo.className = 'todo';
    newTodo.id = 'todo' + Math.floor(Math.random() * 1005);

    // Create buttons and container
    const buttons = document.createElement('div');
    buttons.className = 'buttons';
    const delButton = document.createElement('button');
    delButton.innerHTML = 'Delete';
    delButton.setAttribute('data-todoID', newTodo.id);

    // Event listeners
    newTodoTitle.addEventListener('click', function(e) {
      e.stopPropagation();
    });
    newTodo.addEventListener('click', function(e) {
      editTodo(e.target.id);
    });
    delButton.addEventListener('click', function(e) {
      e.stopPropagation();
      deleteTodo(e.target.dataset['todoid']);
    });

    // Append Elements
    buttons.appendChild(delButton);

    newTodo.appendChild(newTodoTitle);
    newTodo.appendChild(buttons);

    todosDiv.appendChild(newTodo);
  }

  /**
   * @param {string} id The TODO id
   */
  function editTodo(id) {
    const todo = document.getElementById(id);
    formId.value = id;
    formTitle.value = todo.firstChild.innerHTML;
    submit.value = 'Edit';
    clear.style.display = 'inline';
    formTitle.focus();
  }

  /**
   * @param {string} id The todo ID
   */
  function deleteTodo(id) {
    const todo = document.getElementById(id);
    if (formId.value == id) { // Clear form if current TODO is being editted
      clearForm();
    }
    todosDiv.removeChild(todo);

    // Show noTODOs
    if (todosDiv.children.length == 1) {
      noTODOs.style.display = 'block';
    }

    formTitle.focus();
  }

  /**
   * @author: Me
   */
  function clearForm() {
    form.reset();
    formId.value = '';
    submit.value = 'Add';
    clear.style.display = 'none';
    formTitle.focus();
  }

  (function clean(node) {
    for (let n = 0; n < node.childNodes.length; n++) {
      const child = node.childNodes[n];
      if
      (
        child.nodeType === 8
        ||
        (child.nodeType === 3 && !/\S/.test(child.nodeValue))
      ) {
        node.removeChild(child);
        n--;
      } else if (child.nodeType === 1) {
        clean(child);
      }
    }
  })(document.body);
})(window);


