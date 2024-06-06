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
    <a href="/contact/?id=${contact.id}">
    <div class="flex flex-row gap-20 hover:bg-sky-100 p-3">
    <h2>${contact.fullName}</h2>
    <p>${contact.email}</p>
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
