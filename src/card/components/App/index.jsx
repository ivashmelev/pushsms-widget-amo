import React from 'react'
import { memo } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getAccesToken, refreshAccessToken } from '../../../store/auth/actions'
import { useEffect } from 'react'
import Cookie from '../../../helpers/Cookie';
import { getAccount } from '../../../store/pushsms/actions'
import styles from './App.module.scss';

const App = memo(({
    accessToken, isAuth, totalAmount,
    getAccesToken, refreshAccessToken, getAccount
}) => {

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
            Баланс: { totalAmount }
        </div>
    )
})

const mapState = (state) => {
    const { accessToken, isAuth } = state.auth;
    const { totalAmount } = state.pushsms;

    return { accessToken, isAuth, totalAmount };
}

const mapDispatch = (dispatch) => {
    return bindActionCreators(
        { getAccesToken, refreshAccessToken, getAccount },
        dispatch
    )
}

export default connect(mapState, mapDispatch)(App);
