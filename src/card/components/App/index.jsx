import React from 'react'
import { memo } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getAccesToken, refreshAccessToken } from '../../../store/auth/actions'
import { useEffect } from 'react'
import Cookie from '../../../helpers/Cookie';

const App = memo(({ accessToken, isAuth, getAccesToken, refreshAccessToken }) => {

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
    }, []);

    return (
        <div>
            Баланс:
        </div>
    )
})

const mapState = (state) => {
    const { accessToken, isAuth } = state.auth;

    return { accessToken, isAuth };
}

const mapDispatch = (dispatch) => {
    return bindActionCreators(
        { getAccesToken, refreshAccessToken },
        dispatch
    )
}

export default connect(mapState, mapDispatch)(App);
