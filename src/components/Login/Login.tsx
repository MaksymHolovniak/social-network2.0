import React, {FC} from "react";
import {required} from "../../utils/validators/validators";
import s from './Login.module.css'
import {useSelector} from "react-redux";
import {login} from "../../redux/auth-reducer";
import {Navigate} from "react-router-dom";
import {ErrorMessage, Field, Formik, useFormik} from "formik";
import {validateRequired} from "../../validators/validators";
import {useAppDispatch} from "../../types/types";
import {getCaptchaUrl, getError, getIsAuth} from "../../redux/auth-selectors";
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import * as yup from 'yup';


type FormPropsType = {
    onSubmit: (values: ValuesType) => void
    error: string | null
    captchaUrl: string | null
}

type ValuesType = { email: string, password: string, rememberMe: boolean, captcha: string }
const LoginForm: FC<FormPropsType> = (props) => {
    const validationSchema = yup.object().shape({
        email: yup.string().required('Enter a valid email'),
        password: yup.string().required('Enter a password')
    });

    const formik = useFormik({
        initialValues: {email: '', password: '', rememberMe: false, captcha: ''},
        validationSchema: validationSchema,
        validateOnChange: false,
        onSubmit: (values) => { props.onSubmit(values) }

    })

    type FieldType = {
        username?: string;
        password?: string;
        remember?: string;
    };

    return (
        <div>
            {/*  <Formik onSubmit={props.onSubmit} initialValues={{email: '', password: '', rememberMe: false, captcha: ''}}>
                {({isSubmitting}) => (
                    <Form className={s.formLogin}>
                        <h1 className={s.loginTitle}>Sign Up</h1>
                        <div className={s.formSummaryError}>{props.error}</div>
                        <div className={s.formLoginBlock}><Field placeholder={'Email'} name={"email"}
                                                                 validate={validateRequired}
                                                                 className={s.formLoginInput}/>
                            <ErrorMessage name="email" component="div" className={s.validationError}/>
                        </div>
                        <div className={s.formLoginBlock}><Field placeholder={'Password'} name={"password"}
                                                                 validate={validateRequired} type="password"
                                                                 className={s.formLoginInput}/>
                            <ErrorMessage name="password" component="div" className={s.validationError}/>
                        </div>

                        {props.captchaUrl &&
                            <div className={s.formLoginCaptcha}><Field placeholder="Symbols from image" name={'captcha'}
                                                                       validate={[required]}
                                                                       className={s.formLoginInput}/>
                                <img src={props.captchaUrl}/></div>}
                        <button className={s.loginButton} type={"submit"} disabled={isSubmitting}>Login</button>
                        <div><Field component={'input'} name={"rememberMe"} type={'checkbox'}
                                    className={s.LoginCheckBox}/><span className={s.CheckBoxText}>Remember me</span>
                        </div>
                    </Form>

                )}
            </Formik> */}



            <Form onFinish={formik.handleSubmit} className={s.formLogin} layout="vertical" style={{ maxWidth: 600 }} autoComplete="off">
                <Form.Item help = { formik.errors.email ? formik.errors.email : "" } validateStatus = { formik.errors.email ? 'error' : 'success'}>
                    <Input prefix={<MailOutlined />} rootClassName={s.formLoginInput} placeholder = 'Email' id="email" name="email" value={formik.values.email} onChange={formik.handleChange} onBlur={() => formik.validateField("email")} ></Input>
                </Form.Item>
                <Form.Item help = { formik.errors.password ? formik.errors.password : "" } validateStatus = { formik.errors.password ? 'error' : 'success'}>
                <Input.Password prefix={<LockOutlined />} rootClassName={s.formLoginInput} placeholder = 'Password'  id="password" name="password" value={formik.values.password} onChange={formik.handleChange} onBlur={() => formik.validateField("password")}></Input.Password>
                </Form.Item>
                <Form.Item>
                <Checkbox id="rememberMe" name="rememberMe" value={formik.values.rememberMe} onChange={formik.handleChange}>Remember me</Checkbox>
                </Form.Item>
                <Button rootClassName={s.loginButton} shape="round" type="primary" htmlType="submit" danger>Submit</Button>
            </Form>
        </div>
    )
}

type PropsType = {}
const Login: FC<PropsType> = (props) => {
    const isAuth = useSelector(getIsAuth)
    const captchaUrl = useSelector(getCaptchaUrl)
    const error = useSelector(getError)
    const dispatch = useAppDispatch()
    const onSubmit = (values: ValuesType) => {
        dispatch(login(values.email, values.password, values.rememberMe, values.captcha));
    }

    if (isAuth) {
        return <Navigate to='/profile'/>
    }

    return (
        <div className={s.login}>
            <LoginForm onSubmit={onSubmit} captchaUrl={captchaUrl} error={error}/>
        </div>
    )
}

export default Login