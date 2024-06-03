// storage.js

function saveContacts(contacts) {
  localStorage.setItem("contacts", JSON.stringify(contacts));
}

function loadContacts() {
  const contacts = localStorage.getItem("contacts");
  if (!contacts) {
    saveContacts([]);
  }

  try {
    return JSON.parse(contacts);
  } catch (error) {
    console.error("Failed to load contacts", error);
  }
}

function loadContactById(id) {
  const contacts = loadContacts();
  const contact = contacts.find((contact) => contact.id === id);

  return contact;
}
