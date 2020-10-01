import React, { useState, useRef } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { useEffect } from 'react'
import { getAccount, deliveryMessage, getStatusMessage, deliveryBulk, calcBulkDelivery } from '../../../store/pushsms/actions'
import './App.scss';
import styles from './App.module.scss';
import { Input, Select, Button, Form } from 'antd';
import PhoneGroup from '../PhoneGroup'
import { getInfo } from '../../../store/reducers'
import { initialPhones } from '../../../store/amo/actions'
import { sms_count } from '../../../helpers/SMSInfo'


const App = ({
    isCalcBulk,
    isMessageSend,
    totalAmount,
    senderNames,
    phones,
    messageId,
    info,
    enoughMoney,
    getAccount,
    deliveryMessage,
    getStatusMessage,
    initialPhones,
    deliveryBulk,
    calcBulkDelivery
}) => {

    const [text, setText] = useState('');
    const [formWidget] = Form.useForm();
    // const smsInfo = new SMSInfo();
    const wrapperElement = useRef()

    window.initialPhones = initialPhones;

    useEffect(() => {
        getAccount();
    }, []);

    useEffect(() => {
        if (messageId) {
            getStatusMessage(messageId);
        }
    }, [messageId]);

    useEffect(() => {
        if (enoughMoney) {
            formWidget.validateFields().then(values => {
                calcBulkDelivery({ ...values, numbers: phones });
            });
        }
    }, [enoughMoney])

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
            if (phones.length > 1) {
                deliveryBulk({ ...values, numbers: values.phones });
            } else {
                deliveryMessage(values);
            }
        });
    }

    const handleCalc = () => {
        formWidget.validateFields().then(values => {
            calcBulkDelivery({ ...values, numbers: phones });
        });
    }

    return (
        <div ref={ wrapperElement } className={ styles.wrapper }>
            <div className={ styles.row }>
                Баланс: { totalAmount }
            </div>
            <Form
                form={ formWidget }
                onFinish={ sendMessage }
                layout='vertical'
            >
                <div className={ styles.row }>
                    <Form.Item
                        name='text'
                        rules={ [{ required: true, message: ' ' }] }
                    >
                        <Input.TextArea value={ text } placeholder='Сообщение' rows={ 6 } onChange={ handleText() } />
                    </Form.Item>
                    <span className={ styles.info_text }>
                        длина: { text.length } / ост. { sms_count(text).length } символов • { sms_count(text).total } смс
                    </span>
                </div>
                <div className={ styles.row }>
                    <Form.Item
                        name='sender_name'
                        label='Выберите отправителя'
                        initialValue='PUSHSMS.RU'
                    >
                        <Select
                            getPopupContainer={ () => wrapperElement.current }
                            placeholder='Выберите отправителя'
                            defaultActiveFirstOption
                            dropdownMatchSelectWidth
                        >
                            { senderNames.map((name, index) => {
                                return <Select.Option key={ index } value={ name }>{ name }</Select.Option>
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
                    { phones.length > 1 && text.length !== 0 &&
                        <Button style={ { margin: '0 0 10px 0' } } loading={ isCalcBulk }
                            type='dashed'
                            onClick={ handleCalc }
                            size='small'
                        >
                            Рассчитать стоимость
                            </Button>
                    }
                    <Form.Item>
                        <Button loading={ isMessageSend }
                            htmlType='submit'
                            type='primary'
                            size='small'
                        >
                            Отправить
                        </Button>
                    </Form.Item>
                </div>
                { info &&
                    <div className={ styles.row }>
                        <span className={ `${styles.status_text} ${styles[info.status]}` }>
                            { info.desc }.
                        </span>
                    </div>
                }
            </Form>
        </div>
    )
}

const mapState = (state) => {
    const { pushsms, amo } = state;

    return {
        ...pushsms,
        ...amo,
        info: getInfo(state)
    };
}

const mapDispatch = (dispatch) => {
    return bindActionCreators(
        {
            getAccount,
            deliveryMessage,
            getStatusMessage,
            initialPhones,
            calcBulkDelivery,
            deliveryBulk
        },
        dispatch
    )
}

export default connect(mapState, mapDispatch)(App);
