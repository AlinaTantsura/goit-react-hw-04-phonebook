import { Component } from "react";
import { nanoid } from "nanoid";
import FormStyled from "./Form.styled";
import Button from "./Button.styled";
import Input from "./Input.styled";

class Form extends Component{
    state = {
        name: '',
        number: '',
    }
 
    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }
    handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        const name = form.elements.name.value;
        const num = form.elements.number.value;
        const id = nanoid();
        const obj = { name: name, number: num, id: id };
        this.props.addNewContact(obj);
        this.setState({ name: '', number: '' });
        form.reset();
    }
    

    render() {
        return (
        <FormStyled onSubmit={this.handleSubmit}>
        <label>
            Name
                    <Input
                        type="text"
                        name="name"
                        value={this.state.name}
                        onChange={this.handleChange}
                        required
                        pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                        title="Name must contain only letters" />
        </label>
        <label>
            Number
                    <Input
                        type="tel"
                        name="number"
                        value={this.state.number}
                        onChange={this.handleChange}
                        required
                        pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
                        title="'123-45-67'   Number must contain only numbers"/>
        </label>
        <Button type="submit">Add contact</Button>
    </FormStyled>
    )
    }
}

export default Form;