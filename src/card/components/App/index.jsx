import React, { useState } from 'react'
import { memo } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getAccesToken, refreshAccessToken } from '../../../store/auth/actions'
import { useEffect } from 'react'
import Cookie from '../../../helpers/Cookie';
import { getAccount } from '../../../store/pushsms/actions'
import styles from './App.module.scss';
import { Input, Select, Tag } from 'antd';
import getLeftSymbols from '../../../helpers/getLeftSymbols'
import getRandomKey from '../../../helpers/getRandomKey'
import PhoneGroup from '../PhoneGroup'

const App = memo(({
    accessToken, isAuth, totalAmount, senderNames,
    getAccesToken, refreshAccessToken, getAccount
}) => {

    const [text, setText] = useState('');
    const phones = ['8 800 555 35 35', '8 986 749 80 67'];

    const handleText = () => e => setText(e.target.value);

    // useEffect(() => {
    //     if (!isAuth) {
    //         const cookie = new Cookie();
    //         const refreshToken = cookie.get('refresh-token');

    //         if (refreshToken) {
    //             refreshAccessToken(refreshToken);
    //         } else {
    //             getAccesToken();
    //         }
    //     }
    // }, []);

    useEffect(() => {
        getAccount();
    }, [])

    return (
        <div className={ styles.wrapper }>
            <div className={ styles.row }>
                Баланс: { totalAmount }
            </div>
            <div className={ styles.row }>
                <Input.TextArea value={ text } placeholder='Сообщение' rows={ 6 } onChange={ handleText() } />
                <span className={ styles.info_text }>
                    длина: { text.length } / ост. { getLeftSymbols(text.length) } символов • { Math.trunc(text.length / 70) } смс
                </span>
            </div>
            <div className={ styles.row }>
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
            </div>
            <div className={ styles.row }>
                <PhoneGroup phones={ phones } />
            </div>
        </div>
    )
})

const mapState = (state) => {
    const { auth, pushsms } = state;

    return { ...auth, ...pushsms };
}

const mapDispatch = (dispatch) => {
    return bindActionCreators(
        { getAccesToken, refreshAccessToken, getAccount },
        dispatch
    )
}

export default connect(mapState, mapDispatch)(App);
