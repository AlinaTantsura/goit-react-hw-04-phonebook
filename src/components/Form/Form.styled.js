import styled from 'styled-components';

const FormStyled = styled.form(() => {
    return {
        border: 'solid 1px	#A9A9A9',
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
        padding: '10px',
        maxWidth: '400px',
        label: {
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            maxWidth: '200px',
            
        },
        
    }
})

export default FormStyled;