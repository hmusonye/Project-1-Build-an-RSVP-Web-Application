// get input value
const form = document.getElementById('registrar');
const formInput = document.querySelector('input');
const ul = document.getElementById('invitedList');

const mainDiv = document.querySelector('.main');
const div = document.createElement('div');
const filterLabel = document.createElement('label');
const filterCheckBox = document.createElement('input');
filterCheckBox.type = 'checkbox';
filterLabel.textContent = `Hide those who haven't responded`;

div.appendChild(filterLabel);
div.appendChild(filterCheckBox);

mainDiv.insertBefore(div, ul);

filterCheckBox.addEventListener('change', (e)=> {
  const UlListItems = ul.children;
  const isChecked = e.target.checked;

  if (isChecked){
    for(i=0; i<UlListItems.length; i++){
      if(UlListItems[i].className === 'responded'){
        UlListItems[i].style.display = '';
      }else{
        UlListItems[i].style.display = 'none';
        filterLabel.textContent = `Showing those who have responded`;
      }
    }
  }else{
    for(i=0; i<UlListItems.length; i++){
      UlListItems[i].style.display = '';
      filterLabel.textContent = `Hide those who haven't responded`;
    }
  }
});

// add event listener on form submit
form.addEventListener('submit', (e) => {
  // prevent browser reload when form is submitted
  e.preventDefault();
  let formInputValue = formInput.value.toLowerCase();

  // check for empty string
  if (formInputValue === ''){
    formInput.placeholder = 'Please type a name :(';
  } else {
    addInvitee(formInputValue);
    formInput.placeholder = 'Invite someone else';
  }
  // clear input field
  formInput.value = '';
});

// add user input to Invitees invitedList
function addInvitee(name){

  function createElement(elementName, property, value){
    let element = document.createElement(elementName);
    element[property] = value;
    return element;
  }

  function appendToLi(elementName, property, value){
    const element = createElement(elementName, property, value);
    newLi.appendChild(element);
    return element;
  }

  // create new li element and add input as text content
  const newLi = document.createElement('li');
  const span = document.createElement('span');
  span.textContent = name;
  newLi.appendChild(span);
  ul.appendChild(newLi);

  // add checkbox to li
  let checkbox = document.createElement('input');
  checkbox.type = 'checkbox';

  // create label, append checkbox to it and append it to li
  appendToLi('label', 'textContent', 'confirmed')
    .appendChild(createElement('input', 'type', 'checkbox'));

  // add remove button
  appendToLi('button', 'textContent', 'remove');

  // add edit button
  appendToLi('button', 'textContent', 'edit');

  return newLi;
}

// remove, save & edit clicked name
ul.addEventListener('click', (e)=> {
  if(e.target.tagName === 'BUTTON') {
    const li = e.target.parentNode;
    const ul = li.parentNode;
    const span = li.firstChild;
    const button = e.target;
    const buttonAction = e.target.textContent;
    const actions = {
      remove: () => ul.removeChild(li),
      edit: () => {
        const input = document.createElement('input');
        input.type = 'text';
        li.insertBefore(input, span);
        input.value = span.textContent;
        button.textContent = 'save';
        li.removeChild(span);
      },
      save: () => {
        const input = li.firstChild;
        const span = document.createElement('span');
        span.textContent = input.value;
        li.insertBefore(span, input);
        button.textContent = 'edit';
        li.removeChild(input);
      },
    };

    // select and run action in button's name
    actions[buttonAction]();
  }
});

// check if checkbox is true & assign classname
ul.addEventListener('change', (e)=> {
  if(e.target.checked){
    e.target.parentNode.parentNode.className = 'responded';
  } else { e.target.parentNode.parentNode.className = ''; }
});
