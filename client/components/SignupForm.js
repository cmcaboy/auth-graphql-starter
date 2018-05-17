import React from 'react';
import AuthForm from './AuthForm';
import {graphql} from 'react-apollo';
import mutation from '../mutations/Singup';
import { hashHistory } from 'react-router';
import query from '../queries/CurrentUser';

class SignupForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { errors: [] }
    }

    componentWillUpdate(nextProps) {
        // this.props - current props
        // nextProps - the new props after the component
        // rerenders
        console.log(this.props,nextProps);
        if(!this.props.data.user && nextProps.data.user) {
            // redirect to dashboard
            hashHistory.push('/dashboard');
        }
    }

    onSubmit({ email, password }) {
        this.props.mutate({
            variables: {email,password},
            refetchQueries: [{query}]
        }).catch(e => {
            const errors = e.graphQLErrors.map(error => error.message);
            this.setState({errors})
        })
    }

    render() {
        return (
            <div>
                <h3>Sign Up</h3>
                <AuthForm errors={this.state.errors} onSubmit={this.onSubmit.bind(this)} />
            </div>
        );
    }
}

export default graphql(query)(
    graphql(mutation)(SignupForm)
)