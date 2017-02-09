import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import ReduxModal from 'react-redux-modal'
import App from './containers/App'
import configureStore from './store/configureStore'

const store = configureStore()

render(
    <Provider store={store}>
        <div>
            <App />
            <ReduxModal />
        </div>
    </Provider>,
    document.getElementById('root')
)