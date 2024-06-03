const contactsContainerElement = document.getElementById("contacts-container");

window.addEventListener("load", renderContacts);

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
      <h2>${contact.fullName}</h2>
      <p>${contact.email}</p>
      <p>${contact.phone}</p>
      <p>${contact.birthday}</p>
      <div>
        <button onclick="deleteContactById(${contact.id})">Delete</button>
      </div>
    </li>
  `
    )
    .join("");
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
