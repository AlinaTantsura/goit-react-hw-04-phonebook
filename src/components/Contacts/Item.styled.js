import styled from 'styled-components';

const Item = styled.li(() => {
    return {
        marginBottom: '15px',
        button: {
            marginLeft: '15px',
        }
    }
});

export default Item;