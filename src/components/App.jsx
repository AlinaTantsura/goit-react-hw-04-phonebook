import { useEffect, useState } from "react";
import Container from "./Container.styled";
import Contacts from "./Contacts/Contacts";
import Form from "./Form/Form";
import Filter from "./Filter/Filter";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

export const App = () => {
    const [contacts, setContacts] = useState(null);
    const [filter, setFilter] = useState('');

    useEffect(() => {
        const localContacts = localStorage.getItem('contacts');
        if (localContacts) {
            setContacts(JSON.parse(localContacts));
        }
    }, []);

    useEffect(() => {
       contacts && localStorage.setItem('contacts', JSON.stringify(contacts))
    }, [contacts]);
    
    const filterContacts = () => {
        if (contacts) {
            return contacts.filter(({ name }) => {
                return (name.toLowerCase().includes(filter.toLowerCase()));})
        }
    }
    
    const addNewContact = (obj) => {
        contacts ? setContacts((prev) => {
                const isExist = prev.find((item) => (item.name === obj.name));
                if (isExist) {
                    Notify.warning(`${obj.name} is already in your contacts`)
                    return prev;
                }
                Notify.info(`New contact '${obj.name}' is successfully created`);
                return [...prev, obj]
            })
            : setContacts([obj]);
    }

    const handleChange = (event) => {
        setFilter(event.target.value);
    }

    const handleDelete = (event) => {
        const liId = event.target.parentElement.id;
        setContacts((prev) => {
            const objToDelete = prev.find((item) => item.id === liId)
             Notify.info(`The contact '${objToDelete.name}' is successfully deleted`)
            const filterAfterDelete = prev.filter((item) => (item.id !== liId)); 
            if (filterAfterDelete.length === 0) {
                localStorage.removeItem('contacts');
                return null
            }
            return filterAfterDelete;
        })
    }
    

    return(
            <Container>
                <h1>Phonebook</h1>
                <Form addNewContact={addNewContact} />
           
                {contacts &&
                    <>
                    <h2>Contacts</h2>
                    <Filter inputInfo={filter} handleChange={handleChange} />
                    <Contacts contacts={filterContacts()} handleDelete={handleDelete} />
                    </>
            }
            </Container>
        )
}