import { Component } from "react";
import Container from "./Container.styled";
import Contacts from "./Contacts/Contacts";
import Form from "./Form/Form";
import Filter from "./Filter/Filter";
import { Notify } from 'notiflix/build/notiflix-notify-aio';


export class App extends Component{
    state = {
        contacts: [],
        filter: '',
    }
    componentDidMount() {
        if (localStorage.getItem('contacts')) {
            this.setState({contacts: JSON.parse(localStorage.getItem('contacts'))})
        }
        
    }

    componentDidUpdate(_, prevState) {
        if (prevState.contacts.length < this.state.contacts.length) {
            localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
        }
        else if (prevState.contacts.length !== this.state.contacts.length) {
            localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
        }
    }
  
    addNewContact = (obj) => {
        this.setState((prev) => { 
            const isExist = prev.contacts.find((item) => (item.name === obj.name));
            if (isExist) { 
                Notify.warning(`${obj.name} is already in your contacts`)
                return;
            }
            Notify.info(`New contact '${obj.name}' is successfully created`);
            return {contacts: [...prev.contacts, obj] };
        })
    }
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        })
    }
    handleDelete = (event) => {
        const liId = event.target.parentElement.id;
        this.setState((prev) => { 
            const objToDelete = prev.contacts.find((item) => item.id === liId)
             Notify.info(`The contact '${objToDelete.name}' is successfully deleted`)
         return {contacts: prev.contacts.filter((item) => (item.id !== liId))}
        })


    }
    
    render() {
        const filterContacts = this.state.contacts.filter(({ name }) => {
                return (name.toLowerCase().includes(this.state.filter.toLowerCase()));
        })
        return(
            <Container>
                <h1>Phonebook</h1>
                <Form addNewContact={this.addNewContact} />
           
                {this.state.contacts.length > 0 &&
                    <>
                    <h2>Contacts</h2>
                    <Filter inputInfo={this.state} handleChange={this.handleChange} />
                    <Contacts contacts={filterContacts} handleDelete={ this.handleDelete} />
                    </>
            }
            </Container>
        )
    }
}