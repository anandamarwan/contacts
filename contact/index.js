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
  <main class="bg-white">
  <div>
  <button onclick="renderEditContactFormById(${contact.id})" class="p-2.5 bg-blue-700 hover:bg-blue-500 text-white rounded-full">Edit</button>
  <button onclick="deleteContactById(${contact.id})">🗑️</button>
  </div>
  <h2 class="text-3xl">${contact.fullName}</h2>
  <div class="p-2 bg-gray-400 rounded-lg text-sm">
  <h3>Contacts details</h3>
  <p>✉︎ ${contact.email}</p>
  <p>☎️ ${contact.phone}</p>
  <p>🎂 ${contact.birthday}</p>
  </div>
  </main>

  `;
}

function renderEditContactFormById(id) {
  const contact = loadContactById(id);

  contactContainerElement.innerHTML = `
<form id="edit-contact-form" method="post">
<div class="flex justify-end">
<button type="submit" class="p-2.5 bg-blue-700 hover:bg-blue-500 text-white rounded-full">Save</button>
</div>
  <div>
    <label for="full-name">Full Name</label>
    <input
      id="full-name"
      name="fullName"
      type="text"
      class="bg-gray-100 w-96 p-4 rounded-lg"
      value="${contact.fullName}"
    />
  </div>
  <div>
    <label for="email">Email</label>
    <input
      id="email"
      name="email"
      type="email"
      class="bg-gray-100 w-96 p-4 rounded-lg"
      value="${contact.email}"
    />
  </div>
  <div>
    <label for="phone">Phone</label>
    <input id="phone" name="phone" type="phone" 
    class="bg-gray-100 w-96 p-4 rounded-lg"
    value="${contact.phone}"
    />
  </div>
  <div>
    <label for="birthday">Birthday</label>
    <input id="birthday" name="birthday" 
    type="date"
    class="bg-gray-100 w-96 p-4 rounded-lg"
    value="${contact.birthday}" />
  </div>
  
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
    birthday: contactFormData.get("birthday"),
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
