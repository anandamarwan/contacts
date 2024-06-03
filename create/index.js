const addContactFormElement = document.getElementById("add-contact-form");

addContactFormElement.addEventListener("submit", addContact);

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

  // Redirect todashboard /  home page / landing
  window.location.href = "/";
}
