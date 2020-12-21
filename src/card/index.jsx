import React from 'react';
import ReactDOM from 'react-dom';
import { ConfigProvider } from 'antd';
import { Provider } from 'react-redux';
import ruRu from 'antd/lib/locale/ru_RU';
import App from './components/App';
import store from '../store/reducers';
import './index.less';

ReactDOM.render(
    <ConfigProvider locale={ruRu}>
        <Provider store={store}>
            <App />
        </Provider>
    </ConfigProvider>,
    document.getElementById('root'),
);
