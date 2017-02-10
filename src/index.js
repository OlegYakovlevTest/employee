import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
// import ReduxModal from 'react-redux-modal'
import App from './containers/App'
import { Authorization, List, Profile, NewEmployee } from './components';
import configureStore from './store/configureStore'
import $ from 'jquery';

$.ajaxSetup({
    beforeSend: function(xhr) {
        const token = localStorage.getItem('token');
        if (token) {
            xhr.setRequestHeader('Authorization', 'JWT ' + token);
        }
    }
});

const store = configureStore()

render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path='/' component={App}>
                <IndexRoute component={localStorage.getItem('currentUser') ? List : Authorization}/>
                <Route path='auth' component={Authorization} />
                <Route path='list' component={List} />
                <Route path='profile' component={Profile} />
                <Route path='new' component={NewEmployee} />
            </Route>
        </Router>
    </Provider>,
    document.getElementById('root')
)