import { Input } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import React from 'react';
import styles from './TemplateDetails.module.scss';

const TemplateDetails = ({ state, setState }) => {
    const onInput = (type) => (e) => {
        setState({ ...state, [type]: e.target.value });
    };

    return (
        <div className={styles.wrapper}>
            <Input onInput={onInput('name')} className={styles.input} value={state.name} />
            <TextArea onInput={onInput('text')} rows={6} value={state.text} />
        </div>
    );
};

export default TemplateDetails;
