import React, { memo, useState, useRef, useEffect } from 'react';
import styles from './PhoneGroup.module.scss';
import { Input, Tag, Form } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import getRandomKey from '../../../helpers/getRandomKey';
import validatePhone from '../../../helpers/validatePhone';


const PhoneGroup = memo(({ phones }) => {

    const [isShowInput, setIsShowInput] = useState(false);
    const [inputValue, setInputValue] = useState('')
    const inputElement = useRef();
    const [form] = Form.useForm();

    const changeInput = () => e => setInputValue(e.target.value);

    const showInput = () => {
        setIsShowInput(true);
    }

    useEffect(() => {
        if (isShowInput) {
            inputElement.current.focus()
        }
    }, [inputElement.current, isShowInput])

    const hideInput = () => setIsShowInput(false);

    const addPhone = (e) => {
        console.log(e);

        phones.push();
        hideInput();
        form.resetFields();
    }

    return (
        <div className={ styles.wrapper }>
            <div className={ styles.tags }>
                { phones.map(phone => {
                    return (
                        <Tag key={ getRandomKey() } closable>{ phone }</Tag>
                    );
                }) }
            </div>
            <div className={ styles.input }>
                { isShowInput ?
                    <Form form={ form } onFinish={ addPhone }>
                        <Form.Item
                            name='phone'
                            rules={ [
                                {
                                    required: true,
                                    pattern: /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{15}$/,
                                    message: 'Введите корректный номер'
                                }
                            ] }
                        >
                            <Input
                                ref={ inputElement }
                                placeholder='Введите номер'
                                value={ form.getFieldValue('phone') }
                                onChange={ e => form.setFieldsValue({ phone: validatePhone(e.target.value) }) }
                                onPressEnter={ form.submit }
                                onBlur={ hideInput }
                            />
                        </Form.Item>
                    </Form>
                    :
                    <Tag onClick={ showInput }>
                        <PlusOutlined /> Добавить номер
                    </Tag>
                }
            </div>
        </div>
    )
});

export default PhoneGroup;
