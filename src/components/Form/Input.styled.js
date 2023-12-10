import styled from 'styled-components';

const Input = styled.input(() => {
    return {
        padding: '4px',
        border: 'solid 1px #D3D3D3',
        borderRadius: '3px',
        '&:focus': {
            outline: 'none',
            border:'solid 2px #808080',
        }
    }
});

export default Input;