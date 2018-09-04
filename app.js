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
  // create new li element and add input as text content
  console.log("name: ", name);
  const newLi = document.createElement('li');
  const span = document.createElement('span');
  span.textContent = name;
  newLi.appendChild(span);
  ul.appendChild(newLi);

  // add checkbox to li
  let checkbox = document.createElement('input');
  checkbox.type = 'checkbox';

  // create label, append checkbox to it and append it to li
  let label = document.createElement('label');
  label.textContent = 'confirmed';
  label.appendChild(checkbox);
  newLi.appendChild(label);

  // add remove button
  const removeButton = document.createElement('button');
  removeButton.textContent = 'remove';
  removeButton.className = 'remove';
  newLi.appendChild(removeButton);

  // add edit button
  const editButton = document.createElement('button');
  editButton.textContent = 'edit';
  editButton.className = 'edit';
  newLi.appendChild(editButton);
}

// remove, save & edit clicked name
ul.addEventListener('click', (e)=> {
  if(e.target.tagName === 'BUTTON') {
    const li = e.target.parentNode;
    const ul = li.parentNode;
    const span = li.firstChild;
    const button = e.target;

    if(e.target.textContent === 'remove'){
      ul.removeChild(li);
    } else if (e.target.textContent === 'edit') {
      // make label editable
      const input = document.createElement('input');
      input.type = 'text';
      li.insertBefore(input, span);
      input.value = span.textContent;
      button.textContent = 'save';
      li.removeChild(span);
    } else if (e.target.textContent === 'save') {
      // save entry
      const input = li.firstChild;
      const span = document.createElement('span');
      span.textContent = input.value;
      li.insertBefore(span, input);
      button.textContent = 'edit';
      li.removeChild(input);
    }
  }
});

// check if checkbox is true & assign classname
ul.addEventListener('change', (e)=> {
  if(e.target.checked){
    e.target.parentNode.parentNode.className = 'responded';
  } else { e.target.parentNode.parentNode.className = ''; }
});
