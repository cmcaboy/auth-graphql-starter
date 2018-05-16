import React from 'react';

class AuthForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
    }
    
    onSubmit(event) {
        event.preventDefault();

        const { email, password } = this.state;

        this.props.onSubmit(email, password);
    }


        render() {
            return (
                <div className="row">
                    <form onSubmit={this.onSubmit.bind(this)} className="col s6">
                        <div className="input-field">
                            <input 
                                placeholder="email"
                                value={this.state.email}
                                onChange={e => this.setState({email:e.target.value})}
                            />
                        </div>
                        <div className="input-field">
                            <input 
                                type="password"
                                placeholder="password"
                                value={this.state.password}
                                onChange={e => this.setState({password:e.target.value})}
                            />
                        </div>
                        <button className="btn">Submit</button>
                    </form>
                </div>
            );
        }
    }

export default AuthForm;