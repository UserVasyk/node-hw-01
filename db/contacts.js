const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactsPath, "utf8");
  return JSON.parse(data);
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  return contacts.find((contact) => contact.id === contactId);
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const newContacts = await contacts.filter(
    (contact) => contact.id !== contactId
  );
  await updateContacts(newContacts);
}

async function addContact(contact) {
  const contacts = await listContacts();
  const newContact = { ...contact, id: nanoid() };
  console.log("You added new contact: ", newContact);
  contacts.push(newContact);
  await updateContacts(contacts);
}

function updateContacts(contacts) {
  return fs.writeFile(contactsPath, JSON.stringify(contacts), "utf8");
}
module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
