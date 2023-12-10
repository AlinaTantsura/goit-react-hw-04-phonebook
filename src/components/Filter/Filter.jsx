import Input from "components/Form/Input.styled";

const Filter = ({ inputInfo, handleChange }) => {
    return (
        <div>
        <p>Find contacts by name</p>
            <Input type="text" name="filter" value={inputInfo.filter} onChange={handleChange} />       
        </div>
    )
}

export default Filter;