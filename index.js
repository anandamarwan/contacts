const addContactFormElement = document.getElementById("add-contact-form");
const contactsContainerElement = document.getElementById("contacts-container");

function renderContacts() {
  const contacts = loadContacts();
  const keyword = new URLSearchParams(window.location.search).get("q");
  const contactsToRender = keyword
    ? searchContacts(contacts, keyword)
    : contacts;

  contactsContainerElement.innerHTML = contactsToRender
    .map(
      (contact) => `
    <li>
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
    )
    .join("");
}

function addContact(event) {
  event.preventDefault();

  const contactFormData = new FormData(addContactFormElement);
  const contacts = loadContacts();

  const newContact = {
    id: contacts.length ? contacts[contacts.length - 1].id + 1 : 1,
    fullName: contactFormData.get("fullName"),
    email: contactFormData.get("email"),
    phone: contactFormData.get("phone"),
    birthday: contactFormData.get("birthday"),
  };

  saveContacts([...contacts, newContact]);
  addContactFormElement.reset();
  renderContacts();
}

function deleteContactById(id) {
  const contacts = loadContacts();
  const updatedContacts = contacts.filter((contact) => contact.id !== id);

  saveContacts(updatedContacts);
  renderContacts();
}

function searchContacts(contacts, keyword) {
  return contacts.filter(
    (contact) =>
      contact.fullName.toLowerCase().includes(keyword.toLowerCase()) ||
      contact.email.toLowerCase().includes(keyword.toLowerCase()) ||
      contact.phone.toLowerCase().includes(keyword.toLowerCase())
  );
}

addContactFormElement.addEventListener("submit", addContact);
window.addEventListener("load", renderContacts);
