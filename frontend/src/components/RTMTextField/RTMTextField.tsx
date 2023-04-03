import { TextField, TextFieldProps } from '@mui/material';

const RTMTextField = ({ id, name, label, ...props }: TextFieldProps) => {
    return (
        <TextField
            id={id}
            name={name || id}
            label={label || id}
            margin='normal'
            fullWidth
            {...props}
        />
    );
};

export default RTMTextField;
