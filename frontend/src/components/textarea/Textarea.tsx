import { MutableRefObject } from 'react';
import { useState, forwardRef } from 'react';
import styles from './Textarea.module.scss';

interface RTMTextareaProps {
    initialValue?: string;
    placeholder?: string;
}

export const RTMTextarea = forwardRef(({
    initialValue = '',
    placeholder = '',
}: RTMTextareaProps, ref?: any) => {
    const [value, setValue] = useState(() => initialValue);

    return (
        <textarea
            placeholder={placeholder}
            className={styles.textarea}
            ref={ref}
            value={value}
            onChange={(event: any) => setValue(event.target.value)}></textarea>
    );
});
