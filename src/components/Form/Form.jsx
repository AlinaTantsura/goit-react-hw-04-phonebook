import { useState } from "react";
import { nanoid } from "nanoid";
import FormStyled from "./Form.styled";
import Button from "./Button.styled";
import Input from "./Input.styled";

const Form = ({addNewContact}) => {
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');

    const handleChange = (event) => {
        if (event.target.name === 'name') {
            setName(event.target.value);
        }
        else if (event.target.name === 'number') {
            setNumber(event.target.value)
        };
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        const name = form.elements.name.value;
        const num = form.elements.number.value;
        const id = nanoid();
        const obj = { name: name, number: num, id: id };
        addNewContact(obj);
        setName('');
        setNumber('');
        form.reset();
    }

    return (
        <FormStyled onSubmit={handleSubmit}>
        <label>
            Name
                    <Input
                        type="text"
                        name="name"
                        value={name}
                        onChange={handleChange}
                        required
                        pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                        title="Name must contain only letters" />
        </label>
        <label>
            Number
                    <Input
                        type="tel"
                        name="number"
                        value={number}
                        onChange={handleChange}
                        required
                        pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
                        title="'123-45-67'   Number must contain only numbers"/>
        </label>
        <Button type="submit">Add contact</Button>
    </FormStyled>
    )

}

export default Form;