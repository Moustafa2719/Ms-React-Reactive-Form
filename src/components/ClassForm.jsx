import React from 'react';

import {
    FormGroup,
    FormControl,
    Validators,
    BaseValidator
} from 'ms-react-reactive-form';

class ClassForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loginForm: new FormGroup({
                email: new FormControl("", [Validators.required()]),
                password: new FormControl("", [Validators.required(), Validators.pattern(/[0-9]/)]),
                age: new FormControl("", [Validators.min(2), Validators.max(20)])
            })
        };
    }

    save = (event) => {
        event.preventDefault();

        const { loginForm } = this.state;

        let validate = new BaseValidator(loginForm);
        let res = validate.result(validate.form.controls);
        this.updateForm(res.form.controls);


        if (res.form.validity) {
            console.log(res.payload);
        } else {
            console.log(res.form)
        }
    };

    changeHandler = (event) => {
        const { loginForm } = this.state;
        const { name, value } = event.target;
        loginForm.controls[name].setValue(value);

        this.updateForm(loginForm.controls);
    };

    resetPassword = () => {
        const { loginForm } = this.state;
        loginForm.controls.password.setValue("");
        this.updateForm(loginForm.controls);
    };

    removeAgeValidators = () => {
        const { loginForm } = this.state;
        loginForm.controls.age.removeValidators([Validators.min(), Validators.max(), Validators.required()]);
        this.updateForm(loginForm.controls);
    };

    setAgeToRequired = () => {
        const { loginForm } = this.state;
        loginForm.controls.age.setValidators([Validators.required()]);
        this.updateForm(loginForm.controls);
    };

    updateForm = (controls) => {
        this.setState(prev => {
            return {
                ...prev,
                loginForm: new FormGroup(controls)
            }
        });
    };

    render() {
        const { loginForm: { controls } } = this.state;

        return (
            <form onSubmit={this.save}>
                <h1>Class Form</h1>
                <div>
                    <input
                        name="email"
                        id="email"
                        placeholder="email"
                        value={controls.email.value}
                        onChange={this.changeHandler}
                    />
                    {
                        controls.email.validity === false &&
                        <span>Email is Required</span>
                    }
                </div>

                <div>
                    <input
                        name="password"
                        id="password"
                        placeholder="password"
                        value={controls.password.value}
                        onChange={this.changeHandler}
                    />

                    {
                        controls.password.validity === false &&
                        <span>
                            {
                                controls.password.errors.required &&
                                <span>Password is Required</span>
                            }

                            {
                                controls.password.errors.pattern &&
                                <span>Password pattern error</span>
                            }
                        </span>
                    }
                </div>

                <div>
                    <input
                        name="age"
                        id="age"
                        placeholder="age"
                        value={controls.age.value}
                        onChange={this.changeHandler}
                    />
                    {
                        controls.age.validity === false &&
                        <span>
                            {
                                controls.age.errors.required &&
                                <span>Age is Required</span>
                            }

                            {
                                controls.age.errors.min &&
                                <span>Min Age is 2</span>
                            }

                            {
                                controls.age.errors.max &&
                                <span>Max Age is 20</span>
                            }
                        </span>
                    }
                </div>

                <div>
                    <button type="button" onClick={this.resetPassword}>Reset Password</button>
                </div>
                <div>
                    <button type="button" onClick={this.removeAgeValidators}>Remove Age Validators</button>
                </div>
                <div>
                    <button type="button" onClick={this.setAgeToRequired}>Set Age to Required</button>
                </div>
                <div>
                    <button>Save</button>
                </div>
            </form>
        )
    }
}

export default ClassForm;