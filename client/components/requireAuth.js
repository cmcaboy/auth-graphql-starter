import React, {Component} from 'react';
import {graphql} from 'react-apollo';
import currentUser from '../queries/currentUser';
import { hasHistory } from 'react-router';

export default (WrappedComponent) => {
    class RequireAuth extends Component {
        componentWillUpdate(nextProps) {
            console.log('loading: ',this.props.data.loading);
            console.log('user: ',this.props.data.user);
            if(!nextProps.data.loading && !nextProps.data.user) {
                hashHistory.push('/login');
            }
        }
        render() {
            return <WrappedComponent {...this.props} />
        }
    }
    
    graphql(currentUser)(RequireAuth);
}