import React, { useState } from 'react'
import { memo } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getAccesToken, refreshAccessToken } from '../../../store/auth/actions'
import { useEffect } from 'react'
import Cookie from '../../../helpers/Cookie';
import { getAccount, deliveryMessage, getStatusMessage } from '../../../store/pushsms/actions'
import styles from './App.module.scss';
import { Input, Select, Tag, Checkbox, DatePicker, Button, Form, message } from 'antd';
import getLeftSymbols from '../../../helpers/getLeftSymbols'
import getRandomKey from '../../../helpers/getRandomKey'
import PhoneGroup from '../PhoneGroup'
import { getInfo } from '../../../store/reducers'
import { getLead } from '../../../store/amo/actions'
import { getEntity, getIdEntity } from '../../../helpers/entity'

const App = memo(({
    isAuth, totalAmount, senderNames, phones, messageId, isMessageSend, info, sum,
    getAccesToken, refreshAccessToken, getAccount, deliveryMessage, getStatusMessage, getLead
}) => {

    const [text, setText] = useState('');
    const [formWidget] = Form.useForm();

    useEffect(() => {
        if (!isAuth) {
            const cookie = new Cookie();
            const refreshToken = cookie.get('refresh-token');

            if (refreshToken) {
                refreshAccessToken(refreshToken);
            } else {
                getAccesToken();
            }
        }

        if (isAuth) {

            const entity = getEntity();
            const id = getIdEntity();

            if (entity === 'leads' && id) {
                getLead(id)
            } else {
                console.log(entity, id);
            }
        }
    }, [isAuth]);


    useEffect(() => {
        getAccount();
    }, []);

    useEffect(() => {
        if (messageId) {
            getStatusMessage(messageId);
        }
    }, [messageId]);

    const handleText = () => e => setText(e.target.value);

    const validatorPhones = () => {
        if (phones.length > 0) {
            return Promise.resolve();
        }

        return Promise.reject('phones is required');
    }

    const sendMessage = () => {
        if (phones.length > 1) {
            formWidget.setFieldsValue({ phones });
        } else {
            formWidget.setFieldsValue({ phone: phones[0] });
        }

        formWidget.validateFields().then(values => {
            console.log(values);
            deliveryMessage(values);
        });
    }

    return (
        <div className={ styles.wrapper }>
            <div className={ styles.row }>
                Баланс: { totalAmount }
            </div>
            <Form
                form={ formWidget }
                onFinish={ sendMessage }
            >
                <div className={ styles.row }>
                    <Form.Item
                        name='text'
                        rules={ [{ required: true, message: ' ' }] }
                    >
                        <Input.TextArea value={ text } placeholder='Сообщение' rows={ 6 } onChange={ handleText() } />
                    </Form.Item>
                    <span className={ styles.info_text }>
                        длина: { text.length } / ост. { getLeftSymbols(text.length) } символов • { Math.trunc(text.length / 70) } смс
                    </span>
                </div>
                <div className={ styles.row }>
                    <Form.Item
                        name='sender_name'
                        label='Выберите отправителя'
                        initialValue='PUSHSMS.RU'
                    >
                        <Select
                            className={ styles.select }
                            placeholder='Выберите отправителя'
                            defaultActiveFirstOption
                            dropdownMatchSelectWidth
                        >
                            { senderNames.map(name => {
                                return <Select.Option key={ getRandomKey() } value={ name }>{ name }</Select.Option>
                            }) }
                        </Select>
                    </Form.Item>
                </div>
                <div className={ styles.row }>
                    <Form.Item
                        label={ phones.length > 1 ? 'Номера' : 'Номер' }
                        requiredMark='optional'
                        name={ phones.length === 1 ? 'phone' : 'phones' }
                        rules={ [{
                            required: true,
                            message: 'Введите номер',
                            validator: validatorPhones
                        }] }
                    >
                        <PhoneGroup formWidget={ formWidget } />
                    </Form.Item>
                </div>
                {/* <div className={ styles.row }>
                    <Checkbox>
                        Отложенная отправка
                    </Checkbox>
                </div>
                <div className={ styles.row }>
                    <Checkbox>
                        Отправка в дневное время
                    </Checkbox>
                </div>
                <div className={ styles.row }>
                    <DatePicker placeholder="Дата и время" showTime={ { format: 'HH:mm' } } format='DD.MM.YYYY HH:mm' />
                </div> */}
                <div className={ styles.row }>
                    <Form.Item>
                        <Button loading={ isMessageSend }
                            htmlType='submit'
                            type='primary'
                        >
                            Отправить
                        </Button>
                    </Form.Item>
                </div>
                { info &&
                    <div className={ styles.row }>
                        <span className={ `${styles.status_text} ${styles[info.status]}` }>
                            { info.desc }. { sum && `Стоимость: ${sum} руб.` }
                        </span>
                    </div>
                }
            </Form>
        </div>
    )
})

const mapState = (state) => {
    const { auth, pushsms, amo } = state;

    return {
        ...auth,
        ...pushsms,
        ...amo,
        info: getInfo(state)
    };
}

const mapDispatch = (dispatch) => {
    return bindActionCreators(
        { getAccesToken, refreshAccessToken, getAccount, deliveryMessage, getStatusMessage, getLead },
        dispatch
    )
}

export default connect(mapState, mapDispatch)(App);
