import { useState } from "react";
import { useAddContactMutation } from "../../redux/contactSlice";
import {
  ContactForm,
  ContactInput,
  ContactButton,
} from "./ContactFormContainer.styled";

export default function ContactFormContainer() {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  const [addContact] = useAddContactMutation();

  const handleChange = (e) => {
    switch (e.target.name) {
      case "name":
        setName(e.target.value);
        break;
      case "number":
        setNumber(e.target.value);
        break;
      default:
        return;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const contact = {
      name: e.target.name.value,
      number: e.target.number.value,
    };
    addContact(contact);
    setName("");
    setNumber("");
  };

  return (
    <ContactForm onSubmit={handleSubmit}>
      <p>Phonebook</p>
      <ContactInput
        onChange={handleChange}
        value={name}
        name="name"
        type="text"
      />
      <ContactInput
        onChange={handleChange}
        value={number}
        name="number"
        type="number"
      />
      <ContactButton type="submit">Add contact</ContactButton>
    </ContactForm>
  );
}
