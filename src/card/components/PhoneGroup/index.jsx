import React, {
    memo, useState, useRef, useEffect,
} from 'react';
import {
    Input, Tag, Form, Button,
} from 'antd';
import { PlusOutlined, EnterOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import getRandomKey from '../../../helpers/getRandomKey';
import styles from './PhoneGroup.module.scss';
import { addPhone, removePhone } from '../../../store/amo/actions';

const PhoneGroup = memo(({
    phones, formWidget, addPhone, removePhone,
}) => {
    const [isShowInput, setIsShowInput] = useState(false);
    const inputElement = useRef();
    const [formPhone] = Form.useForm();

    const changeInput = (e) => formPhone.setFieldsValue({ phone: e.target.value.replace(/[^\d | +]/g, '') });

    const showInput = () => {
        setIsShowInput(true);
    };

    const closeTag = (index) => () => {
        removePhone(index);
    };

    useEffect(() => {
        if (isShowInput) {
            inputElement.current.focus();
        }
    }, [inputElement.current, isShowInput]);

    const hideInput = () => setIsShowInput(false);

    const addTag = (data) => {
        hideInput();

        formPhone.validateFields().then((values) => {
            addPhone(data.phone);
            formWidget.setFieldsValue({ phones: [...phones, data.phone] });
        });

        formPhone.resetFields();
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.tags}>
                { phones.map((phone, index) => (
                    <Tag
                        className={styles.tag}
                        key={getRandomKey()}
                        closable
                        onClose={closeTag(index)}
                    >
                        { phone }
                    </Tag>
                )) }
            </div>
            <div className={styles.input}>
                { isShowInput
                    ? (
                        <Form form={formPhone} onFinish={addTag}>
                            <Form.Item
                                name="phone"
                                initialValue={8}
                                rules={[
                                    {
                                        required: true,
                                        pattern: /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{11}$/,
                                        message: 'Введите корректный номер',
                                    },
                                ]}
                            >
                                <Input
                                    ref={inputElement}
                                    value={formPhone.getFieldValue('phone')}
                                    onChange={changeInput}
                                    onPressEnter={formPhone.submit}
                                    onBlur={hideInput}
                                    suffix={<EnterOutlined />}
                                />
                            </Form.Item>
                        </Form>
                    )
                    : (
                        <Button type="dashed" size="small" onClick={showInput}>
                            <PlusOutlined />
                            {' '}
                            Добавить номер
                        </Button>
                    )}
            </div>
        </div>
    );
});

const mapState = (state) => {
    const { amo } = state;

    return { ...amo };
};

const mapDispatch = (dispatch) => bindActionCreators(
    { addPhone, removePhone },
    dispatch,
);

export default connect(mapState, mapDispatch)(PhoneGroup);
