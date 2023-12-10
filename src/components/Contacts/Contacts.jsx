import Button from "components/Form/Button.styled";
import Item from "./Item.styled";

const Contacts = ({contacts, handleDelete}) =>{
    return (
        <ul>
            {contacts.map(({ name, id, number }) => (<Item key={id} id={id}>{name}: {number}   
            <Button type='button' onClick={handleDelete}>Delete</Button> </Item>
            ))}
        </ul>
    )
}

export default Contacts;