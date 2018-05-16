import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import query from '../queries/currentUser';
import mutation from '../mutations/Logout';
import { Link } from 'react-router';


class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    onLogoutClick() {
        this.props.mutate({
            refetchQueries: [{query}]
        });
    }

    renderButtons() {
        const {loading,user} = this.props.data;
        if(loading) { return <div />; }

        if(user) {
            // We are only using an anchor tag for 
            // styling purposes
            return (
                <li>
                    <a onClick={this.onLogoutClick.bind(this)}>
                        Logout
                    </a>
                </li>
            )
        } else {
            return (
                <div>
                    <li>
                        <Link to="/signup">
                            Signup
                        </Link>
                    </li>
                    <li>
                        <Link to="/login">
                            Login
                        </Link>
                    </li>
                </div>
            );
        }
    }

    render() {
        console.log(this.props.data);
        return (
            <nav>
                <div className="nav-wrapper">
                    <Link to="/" className="brand-logo left">
                        Home
                    </Link>
                    <ul className="right">
                        {this.renderButtons()}
                    </ul>
                </div>
            </nav>
        );
    }
}


// This will cause the results of the query to show up
// on this.props.data. 
export default graphql(mutation)(
    graphql(query)(Header)
);