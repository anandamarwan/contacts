// Get contact ID from the URL Search Params
// Example: localhost:5500/contact/?id=1

const contactContainerElement = document.getElementById("contact-container");

function getCurrentContactId() {
  const queryString = window.location.search;
  const params = new URLSearchParams(queryString);
  const id = Number(params.get("id"));

  return id;
}

function renderContactById() {
  const id = getCurrentContactId();
  const contact = loadContactById(id);

  if (!contact) {
    contactContainerElement.innerHTML = "<p>Contact not found</p>";
    return;
  }

  contactContainerElement.innerHTML = `
<h2>${contact.fullName}</h2>
<p>${contact.email}</p>
<p>${contact.phone}</p>
<p>${contact.birthday}</p>
<div>
  <button onclick="renderEditContactFormById(${contact.id})">Edit</button>
  <button onclick="deleteContactById(${contact.id})">Delete</button>
</div>
  `;
}

function renderEditContactFormById(id) {
  const contact = loadContactById(id);

  contactContainerElement.innerHTML = `
<form id="edit-contact-form" method="post">
  <div>
    <label for="full-name">Full name:</label>
    <input
      id="full-name"
      name="fullName"
      type="text"
      value="${contact.fullName}"
    />
  </div>
  <div>
    <label for="email">Email address:</label>
    <input
      id="email"
      name="email"
      type="email"
      value="${contact.email}"
    />
  </div>
  <div>
    <label for="phone">Phone number:</label>
    <input id="phone" name="phone" type="phone" 
    value="${contact.phone}"
    />
  </div>
  <div>
    <label for="birthday">birthday</label>
    <input id="birthday" name="birthday" 
    value="${contact.birthday}" />
  </div>
  <button type="submit">Save</button>
</form>`;

  const editContactFormElement = document.getElementById("edit-contact-form");

  editContactFormElement.addEventListener("submit", editContact);
}

function editContact(event) {
  event.preventDefault();
  const contactFormData = new FormData(event.target);

  const contacts = loadContacts();

  const newContact = {
    id: getCurrentContactId(),
    fullName: contactFormData.get("fullName"),
    email: contactFormData.get("email"),
    phone: contactFormData.get("phone"),
    birthday: Number(contactFormData.get("birthday")),
  };

  // Update by using map, to find by id, not adding a new one
  const updatedContacts = contacts.map((contact) => {
    if (contact.id === newContact.id) {
      return newContact;
    } else {
      return contact;
    }
  });

  saveContacts(updatedContacts);
  renderContactById();
}

function deleteContactById(id) {
  const contacts = loadContacts();

  const updatedContacts = contacts.filter(
    (contact) => contact.id !== Number(id)
  );

  saveContacts(updatedContacts);
  window.location.replace("/");
}

window.addEventListener("load", renderContactById);
