import React, { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    Input, Select, Button, Form, Checkbox, DatePicker, Calendar,
} from 'antd';
import moment from 'moment';
import Modal from 'antd/lib/modal/Modal';
import {
    getAccount, deliveryMessage, getStatusMessage, deliveryBulk, calcBulkDelivery, getTemplates, createTemplate, updateTemplate, deleteTemplate,
} from '../../../store/pushsms/actions';
import styles from './App.module.scss';
import PhoneGroup from '../PhoneGroup';
import { getInfo } from '../../../store/reducers';
import { addPhone, initialPhones } from '../../../store/amo/actions';
import { sms_count } from '../../../helpers/SMSInfo';
import Template from '../Template';

const App = ({
    isCalcBulk,
    isMessageSend,
    totalAmount,
    senderNames,
    phones,
    messageId,
    info,
    enoughMoney,
    templates,
    getAccount,
    deliveryMessage,
    getStatusMessage,
    initialPhones,
    deliveryBulk,
    calcBulkDelivery,
    getTemplates,
    createTemplate,
    updateTemplate,
    deleteTemplate,
    addPhone,
}) => {
    const [text, setText] = useState('');
    const [sheduledState, setSheduledState] = useState({
        isShow: false,
        isChecked: false,
    });
    const [showTemplates, setShowTemplates] = useState(false);
    const [formWidget] = Form.useForm();
    const wrapperElement = useRef();

    window.initialPhones = initialPhones;

    useEffect(() => {
        getAccount();
        getTemplates();
    }, []);

    useEffect(() => {
        Array.from(
            document.querySelectorAll('[data-pei-code="phone"] > div > input'),
        ).forEach(({ value }) => {
            if (value) {
                addPhone(value);
            }
        });
    }, []);

    useEffect(() => {
        if (messageId) {
            getStatusMessage(messageId);
        }
    }, [messageId]);

    useEffect(() => {
        if (enoughMoney) {
            formWidget.validateFields().then((values) => {
                calcBulkDelivery({ ...values, numbers: phones });
            });
        }
    }, [enoughMoney]);

    const handleText = () => (e) => setText(e.target.value);

    const validatorPhones = () => {
        if (phones.length > 0) {
            return Promise.resolve();
        }

        return Promise.reject('phones is required');
    };

    const sendMessage = () => {
        if (phones.length > 1) {
            formWidget.setFieldsValue({ phones });
        } else {
            formWidget.setFieldsValue({ phone: phones[0] });
        }

        formWidget.validateFields().then((values) => {
            if (phones.length > 1) {
                deliveryBulk({ ...values, numbers: values.phones });
            } else {
                deliveryMessage(values);
            }
        });
    };

    const handleCalc = () => {
        formWidget.validateFields().then((values) => {
            calcBulkDelivery({ ...values, numbers: phones });
        });
    };

    const openTemplates = () => {
        setShowTemplates(true);
    };

    const choiceTemplate = (id) => {
        const index = templates.findIndex((el) => el.id === id);

        formWidget.setFieldsValue({ text: templates[index].text });
    };

    const onCheckSheduled = (e) => {
        setSheduledState({
            ...sheduledState,
            isChecked: e.target.checked,
            isShow: !sheduledState.isChecked,
        });
    };

    const onCloseSheduled = () => {
        setSheduledState({
            ...sheduledState,
            isShow: true,
            isChecked: formWidget.getFieldValue('sheduled'),
        });
    };

    return (
        <div ref={wrapperElement} className={styles.wrapper}>
            <div className={styles.row}>
                Баланс:
                {' '}
                { totalAmount }
            </div>
            <Form
                form={formWidget}
                onFinish={sendMessage}
                layout="vertical"
            >
                <div className={styles.row}>
                    <Form.Item
                        name="templates"
                        label="Шаблоны"
                        initialValue=""
                    >
                        <Select
                            getPopupContainer={() => wrapperElement.current}
                            placeholder="Выберите шаблон"
                            defaultActiveFirstOption
                            dropdownMatchSelectWidth
                            allowClear
                            onChange={choiceTemplate}
                            dropdownRender={(originNode) => (
                                <div>
                                    { originNode }
                                    <div className={styles.link_wrapper}>
                                        { formWidget.getFieldValue('templates')
                                            ? <a onClick={openTemplates} className={styles.link}>Редактировать шаблон</a>
                                            : <a onClick={openTemplates} className={styles.link}>Создать шаблон</a>}
                                    </div>
                                </div>
                            )}
                        >
                            { templates.map(({ id, name }, index) => <Select.Option key={index} value={id}>{ name }</Select.Option>) }
                        </Select>
                    </Form.Item>
                </div>
                <div className={styles.row}>
                    <Form.Item
                        name="text"
                        rules={[{ required: true, message: ' ' }]}
                    >
                        <Input.TextArea value={text} placeholder="Сообщение" rows={6} onChange={handleText()} />
                    </Form.Item>
                    <span className={styles.info_text}>
                        длина:
                        {' '}
                        { text.length }
                        {' '}
                        / ост.
                        {' '}
                        { sms_count(text).length }
                        {' '}
                        символов •
                        {' '}
                        { sms_count(text).total }
                        {' '}
                        смс
                    </span>
                </div>
                <div className={styles.row}>
                    <Form.Item
                        name="sender_name"
                        label="Выберите отправителя"
                        initialValue="PUSHSMS.RU"
                    >
                        <Select
                            getPopupContainer={() => wrapperElement.current}
                            placeholder="Выберите отправителя"
                            defaultActiveFirstOption
                            dropdownMatchSelectWidth
                        >
                            { senderNames.map((name, index) => <Select.Option key={index} value={name}>{ name }</Select.Option>) }
                        </Select>
                    </Form.Item>
                </div>
                <div className={styles.row}>
                    <Checkbox
                        checked={sheduledState.isChecked}
                        onChange={onCheckSheduled}
                    >
                        Отложенная отправка
                    </Checkbox>
                </div>
                {sheduledState.isShow && (
                /* <Modal
                    visible={sheduledState.isShow}
                    footer={false}
                    centered
                    onCancel={onCloseSheduled}
                    getContainer={() => wrapperElement.current}
                > */
                    // <div className={styles.center}>
                    <Form.Item
                        name="sheduled"
                    >
                        <DatePicker
                            getPopupContainer={() => wrapperElement.current}
                            dropdownClassName={styles.datepicker}
                            popupStyle={{ left: '-175px' }}
                            showTime
                            showNow={false}
                            format="DD.MM.YYYY HH:mm"
                            disabledDate={(currentDate) => currentDate && currentDate < moment().endOf('second')}
                            disabledHours={() => Array.from(Array(moment().hours()).keys())}
                            disabledMinutes={() => Array.from(Array(moment().minutes() + 5).keys())}
                            onOk={onCloseSheduled}
                        />
                    </Form.Item>
                    // </div>
                // </Modal>
                // {/* // <div className={styles.row}> */}
                // {/* // </div> */}
                )}
                <div className={styles.row}>
                    <Form.Item
                        label={phones.length > 1 ? 'Доп. телефоны' : 'Номер'}
                        requiredMark="optional"
                        name={phones.length === 1 ? 'phone' : 'phones'}
                        rules={[{
                            required: true,
                            message: 'Введите номер',
                            validator: validatorPhones,
                        }]}
                    >
                        <PhoneGroup formWidget={formWidget} />
                    </Form.Item>
                </div>
                <div className={styles.row}>
                    { phones.length > 1 && text.length !== 0
                        && (
                            <Button
                                style={{ margin: '0 0 10px 0' }}
                                loading={isCalcBulk}
                                type="dashed"
                                onClick={handleCalc}
                                size="small"
                            >
                                Рассчитать стоимость
                            </Button>
                        )}
                    <Form.Item style={{ marginBottom: '0px' }}>
                        <Button
                            loading={isMessageSend}
                            htmlType="submit"
                            type="primary"
                            size="small"
                        >
                            Отправить
                        </Button>
                    </Form.Item>
                </div>
                { info
                    && (
                        <div className={styles.row}>
                            <span className={`${styles.status_text} ${styles[info.status]}`}>
                                { info.desc }
                                .
                            </span>
                        </div>
                    )}
            </Form>
            <Template
                isVisible={showTemplates}
                templates={templates}
                create={createTemplate}
                update={updateTemplate}
                remove={deleteTemplate}
                close={() => setShowTemplates(false)}
            />
        </div>
    );
};

const mapState = (state) => {
    const { pushsms, amo } = state;

    return {
        ...pushsms,
        ...amo,
        info: getInfo(state),
    };
};

const mapDispatch = (dispatch) => bindActionCreators(
    {
        getAccount,
        deliveryMessage,
        getStatusMessage,
        initialPhones,
        calcBulkDelivery,
        deliveryBulk,
        getTemplates,
        createTemplate,
        updateTemplate,
        deleteTemplate,
        addPhone,
    },
    dispatch,
);

export default connect(mapState, mapDispatch)(App);
