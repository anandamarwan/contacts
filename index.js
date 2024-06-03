const addContactFormElement = document.getElementById("add-contact-form");
const contactsContainerElement = document.getElementById("contacts-container");

function renderContacts() {
  const contacts = loadContacts();

  const queryString = window.location.search;
  const params = new URLSearchParams(queryString);
  const keyword = params.get("q");

  const contactsToRender = keyword
    ? searchContacts(contacts, keyword)
    : contacts;

  const contactItemElements = contactsToRender.map(
    (contact) => `<li>
  <a href="/contact/?id=${contact.id}">
    <h2>${contact.fullName}</h2>
    <p>${contact.email}</p>
    <p>${contact.phone}</p>
    <p>${contact.birthday}</p>
  </a>
  <div>
    <button onclick="deleteContactById(${contact.id})">Delete</button>
  </div>
</li>
`
  );

  const contactItems = contactItemElements.join("");
  contactsContainerElement.innerHTML = contactItems;
}

function addContact(event) {
  event.preventDefault();

  const contactFormData = new FormData(addContactFormElement);
  console.log(contactFormData);

  const contacts = loadContacts();

  const newId = contacts.length ? contacts[contacts.length - 1].id + 1 : 1;

  const newContact = {
    fullName: contactFormData.get("fullName"),
    email: contactFormData.get("email"),
    phone: contactFormData.get("phone"),
    birthday: contactFormData.get("birthday"),
  };
  const updatedContacts = [...contacts, newContact];
  saveContacts(updatedContacts);

  addContactFormElement.reset();
  renderContacts();
}

function deleteContactById(id) {
  const contacts = loadContacts();

  const updatedContacts = contacts.filter(
    (contact) => contact.id !== Number(id)
  );

  saveContacts(updatedContacts);
  renderContacts();
}

addContactFormElement.addEventListener("submit", addContact);

window.addEventListener("load", renderContacts);
