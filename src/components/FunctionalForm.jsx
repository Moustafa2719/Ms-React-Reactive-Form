import React, { useState } from 'react';

import {
    FormGroup,
    FormControl,
    Validators,
    BaseValidator
} from 'ms-react-reactive-form';

const FunctionalForm = () => {
    const form = new FormGroup({
        email: new FormControl("", [Validators.required()]),
        password: new FormControl("", [Validators.required(), Validators.pattern(/[0-9]/)]),
        age: new FormControl("", [Validators.min(2), Validators.max(20)])
    });

    const [loginForm, updateLoginForm] = useState(form);

    const save = (event) => {
        event.preventDefault();

        let validate = new BaseValidator(loginForm);
        let res = validate.result(validate.form.controls);
        updateForm(res.form.controls);


        if (res.form.validity) {
            console.log(res.payload);
        } else {
            console.log(res.form)
        }
    };

    const changeHandler = (event) => {
        const { name, value } = event.target;
        loginForm.controls[name].setValue(value);

        updateForm(loginForm.controls);
    };

    const resetPassword = () => {
        loginForm.controls.password.setValue("");
        updateForm(loginForm.controls);
    };

    const removeAgeValidators = () => {
        loginForm.controls.age.removeValidators([Validators.min(), Validators.max(), Validators.required()]);
        updateForm(loginForm.controls);
    };

    const setAgeToRequired = () => {
        loginForm.controls.age.setValidators([Validators.required()]);
        updateForm(loginForm.controls);
    };

    const updateForm = (controls) => {
        let update = new FormGroup(controls);
        updateLoginForm(update);
    };

    return (
        <form onSubmit={save}>
            <h1>Functioal Form</h1>
            <div>
                <input
                    name="email"
                    id="email"
                    placeholder="email"
                    value={loginForm.controls.email.value}
                    onChange={changeHandler}
                />
                {
                    loginForm.controls.email.validity === false &&
                    <span>Email is Required</span>
                }
            </div>

            <div>
                <input
                    name="password"
                    id="password"
                    placeholder="password"
                    value={loginForm.controls.password.value}
                    onChange={changeHandler}
                />

                {
                    loginForm.controls.password.validity === false &&
                    <span>
                        {
                            loginForm.controls.password.errors.required &&
                            <span>Password is Required</span>
                        }

                        {
                            loginForm.controls.password.errors.pattern &&
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
                    value={loginForm.controls.age.value}
                    onChange={changeHandler}
                />
                {
                    loginForm.controls.age.validity === false &&
                    <span>
                        {
                            loginForm.controls.age.errors.required &&
                            <span>Age is Required</span>
                        }

                        {
                            loginForm.controls.age.errors.min &&
                            <span>Min Age is 2</span>
                        }

                        {
                            loginForm.controls.age.errors.max &&
                            <span>Max Age is 20</span>
                        }
                    </span>
                }
            </div>

            <div>
                <button type="button" onClick={resetPassword}>Reset Password</button>
            </div>
            <div>
                <button type="button" onClick={removeAgeValidators}>Remove Age Validators</button>
            </div>
            <div>
                <button type="button" onClick={setAgeToRequired}>Set Age to Required</button>
            </div>
            <div>
                <button>Save</button>
            </div>
        </form>
    )
}

export default FunctionalForm;