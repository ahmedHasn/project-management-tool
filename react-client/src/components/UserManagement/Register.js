import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createNewUser } from '../../actions/securityActions';
import classnames from 'classnames';

class Register extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      fullName: '',
      password: '',
      confirmPassword: '',
      errors: {}
    }
  }

  componentDidMount = () => {
    if (this.props.security.validToken) {
      this.props.history.push('/dashboard');
    }
  }
  

  componentWillReceiveProps(nextProps){
    if(nextProps.errors){
      this.setState({errors: nextProps.errors});
    }
  }

  onSubmit(e){
    e.preventDefault();
    const {username , fullName , password , confirmPassword } = this.state;
    const newUser = {
      username,
      fullName,
      password,
      confirmPassword,
    }
    this.props.createNewUser(newUser ,  this.props.history);
  }

  onChange(e){
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  

  render() {

    const {username , fullName , password , confirmPassword , errors} = this.state;

    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">Create your Account</p>
              <form onSubmit={this.onSubmit.bind(this)}>
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg",{'is-invalid': errors.fullName})}
                    placeholder="Full name"
                    name="fullName"
                    value={fullName}
                    onChange={this.onChange.bind(this)}
                  />
                  {errors.fullName && (
                    <div className="invalid-feedback">{errors.fullName}</div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    className={classnames("form-control form-control-lg",{'is-invalid': errors.username})}
                    placeholder="Email Address"
                    name="username"
                    value={username}
                    onChange={this.onChange.bind(this)}
                  />
                   {errors.username && (
                    <div className="invalid-feedback">{errors.username}</div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className={classnames("form-control form-control-lg",{'is-invalid': errors.password})}
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={this.onChange.bind(this)}
                  />
                   {errors.password && (
                    <div className="invalid-feedback">{errors.password}</div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className={classnames("form-control form-control-lg",{'is-invalid': errors.confirmPassword})}
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={this.onChange.bind(this)}
                  />
                   {errors.confirmPassword && (
                    <div className="invalid-feedback">{errors.confirmPassword}</div>
                  )}
                </div>
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  createNewUser: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  security: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  security: state.security,
  errors: state.errors
});

export default connect(mapStateToProps , {createNewUser})(Register);