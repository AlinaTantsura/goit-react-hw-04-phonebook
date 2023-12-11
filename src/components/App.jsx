import { useEffect, useState } from "react";
import Container from "./Container.styled";
import Contacts from "./Contacts/Contacts";
import Form from "./Form/Form";
import Filter from "./Filter/Filter";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

export const App = () => {
    const [contacts, setContacts] = useState([]);
    const [filter, setFilter] = useState('');

    useEffect(() => { 
        if (localStorage.getItem('contacts') && contacts.length === 0) {
            setContacts(JSON.parse(localStorage.getItem('contacts')));
            return;
        }
        localStorage.setItem('contacts', JSON.stringify(contacts));
    }, [contacts]);
    
    const filterContacts = contacts.filter(({ name }) => {
                return (name.toLowerCase().includes(filter.toLowerCase()));
    })
    
    const addNewContact = (obj) => {
        setContacts((prev) => {
            const isExist = prev.find((item) => (item.name === obj.name));
            if (isExist) {
                Notify.warning(`${obj.name} is already in your contacts`)
                return prev;
            }
            Notify.info(`New contact '${obj.name}' is successfully created`);
            return [...prev, obj]
        })
    }

    const handleChange = (event) => {
        setFilter(event.target.value);
    }

    const handleDelete = (event) => {
        const liId = event.target.parentElement.id;
        setContacts((prev) => {
            const objToDelete = prev.find((item) => item.id === liId)
             Notify.info(`The contact '${objToDelete.name}' is successfully deleted`)
         return prev.filter((item) => (item.id !== liId))
        })
    }
    

    return(
            <Container>
                <h1>Phonebook</h1>
                <Form addNewContact={addNewContact} />
           
                {contacts.length > 0 &&
                    <>
                    <h2>Contacts</h2>
                    <Filter inputInfo={filter} handleChange={handleChange} />
                    <Contacts contacts={filterContacts} handleDelete={handleDelete} />
                    </>
            }
            </Container>
        )
}