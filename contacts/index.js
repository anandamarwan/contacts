// const addContactsFormElement = document.getElementById("add-contact-form");
// const contactsContainerElement = document.getElementById("contact-container");

// function renderContacts() {
//   const contacts = loadContacts();

//   const queryString = window.location.search;
//   const params = new URLSearchParams(queryString);
//   const keyword = params.get("q");

//   const contactsToRender = keyword
//     ? searchContacts(contacts, keyword)
//     : contacts;

//   const contactItemElements = contactsToRender.map(
//     (contact) => `<li>
//     <a href="/contact/createcontact.html?id=${contact.id}">
//       <h2>${contact.fullName}</h2>
//       <p>${contact.email}</p>
//       <p>${contact.phone}</p>
//       <p>${contact.birthday}</p>
//     </a>
//     <div>
//       <button onclick="deleteContactById(${contact.id})">Delete</button>
//     </div>
//   </li>
//   `
//   );

//   const contactItems = contactItemElements.join("");
//   contactsContainerElement.innerHTML = contactItems;
// }

// function addContact(event) {
//   event.prefentdefault();

//   const contactFormData = new FormData(addContactsFormElement);

//   const contacts = loadContacts();

//   const newId = contacts.length ? contacts[contacts.length - 1].id + 1 : 1;

//   const newContact = {
//     fullName: contactFormData.get("fullName"),
//     email: contactFormData.get("email"),
//     phone: contactFormData.get("phone"),
//     birthday: contactFormData.get("birthday"),
//   };
// }

// addContactFormElement.addEventListener("submit", addContact);

// window.addEventListener("load", renderContacts);
