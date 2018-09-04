// get input value
const form = document.getElementById('registrar');
let formInput = document.querySelector('input');
const ul = document.getElementById('invitedList');

// add event handler on form submit
form.addEventListener('submit', (e) => {
  // prevent browser reload when form is submitted
  e.preventDefault();
  let formInputValue = formInput.value.toLowerCase();

  // check for empty string
  if (formInputValue === ''){
    formInput.placeholder = 'Please Type Something :(';
  } else {
    addInvitee(formInputValue);
    formInput.placeholder = 'Invite Someone Else';
  }
  // clear input field
  formInput.value = '';
});

// add user input to Invitees invitedList
function addInvitee(name){
  // create new li element
  console.log("name: ", name);
  const newLi = document.createElement('li');
  newLi.textContent = name;
  ul.appendChild(newLi);

  // add checkbox to li
  let checkbox = document.createElement('input');
  checkbox.type = 'checkbox';

  // create label, append checkbox to it and append it to li
  let label = document.createElement('label');
  label.textContent = 'Confirmed';
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

// add highlighted class

// remove clicked item from list
ul.addEventListener('click', (e)=> {
  if(e.target.tagName === 'BUTTON') {
    if(e.target.className === 'remove'){
      const li = e.target.parentNode;
      const ul = li.parentNode;
      ul.removeChild(li);
    } else if (e.target.className === 'edit') {
      // make label editable
    }
  }
})

// check if checkbox is true & assign classname
ul.addEventListener('change', (e)=> {
  if(e.target.checked){
    e.target.parentNode.parentNode.className = 'responded';
  } else { e.target.parentNode.parentNode.className = ''; }
});
