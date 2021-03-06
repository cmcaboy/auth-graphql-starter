import React from 'react';
import AuthForm from './AuthForm';
import mutation from '../mutations/Login';
import { graphql } from 'react-apollo';
import query from '../queries/CurrentUser';
import { hashHistory } from 'react-router';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { errors: [] };
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

    onSubmit({email,password}) {
        this.props.mutate({
            variables: { email, password },
            refetchQueries: [{ query }]
        }).catch(e => { 
            const errors = e.graphQLErrors.map(error => error.message)
            this.setState({errors})
        })
    }

    render() {
        return (
            <div>
                <h3>Login</h3>
                <AuthForm 
                    errors={this.state.errors} 
                    onSubmit={this.onSubmit.bind(this)} 
                />
            </div>
        );
    }
}

export default graphql(query)(
    graphql(mutation)(LoginForm)
);