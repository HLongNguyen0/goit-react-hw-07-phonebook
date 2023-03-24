import { useState } from "react";
import {
  useGetContactQuery,
  useAddContactMutation,
  useDeleteContactMutation,
} from "../../redux/contactSlice";
import {
  ContactList,
  ContactListElem,
  ContactListSearch,
  ContactListDelete,
} from "./ContactListContainer.styled";

export default function ContactListContainer() {
  const [search, setSearch] = useState("");

  const { data, error, isLoading } = useGetContactQuery();
  const [deleteContact, { isLoading: isUpdating }] = useDeleteContactMutation();

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <>
      <p>Contacts</p>
      <ContactListSearch
        onChange={handleChange}
        value={search}
        name="search"
        type="text"
      />
      <ContactList>
        {error && "Error"}
        {isLoading && "Wait..."}
        {data &&
          !isLoading &&
          data.map((contact) => {
            return (
              contact.name.toLowerCase().includes(search.toLowerCase()) && (
                <ContactListElem key={contact.id}>
                  {contact.name}: {contact.number}
                  <ContactListDelete
                    type="button"
                    onClick={() => deleteContact(contact.id)}
                    disabled={isUpdating}
                  >
                    Delete
                  </ContactListDelete>
                </ContactListElem>
              )
            );
          })}
      </ContactList>
    </>
  );
}
