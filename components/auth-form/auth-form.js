import styles from './auth-form.module.scss';
import {useState} from "react";
import {useFormik} from "formik";
import * as yup from 'yup';

const errors = {
    required: 'Поле не должно быть пустым',
    email: 'Ошибка при вводе e-mail',
    password: 'Слишком короткий пароль',
    publicKey: 'Неверный адрес'
};

const loginFields = [
    {name: 'email', type: 'text', label: 'E-mail', placeholder: 'example@itmo.ru'},
    {name: 'password', type: 'password', label: 'Пароль'}
];

const signupFields = [
    {name: 'firstName', type: 'text', label: 'Имя', placeholder: 'Иван'},
    {name: 'lastName', type: 'text', label: 'Фамилия', placeholder: 'Иванов'},
    {
        name: 'publicKey',
        type: 'text',
        label: 'Адрес Ropsten',
        placeholder: '0x69f6A16C6078b72D6E9C7A4eCA1a765C9A3FdF67'
    },
    {name: 'email', type: 'text', label: 'E-mail', placeholder: 'example@itmo.ru'},
    {name: 'password', type: 'password', label: 'Пароль'}
];

const validateLoginForm = yup.object({
    email: yup
        .string()
        .email(errors.email)
        .required(errors.required),
    password: yup
        .string()
        .required(errors.required)
});

const initLoginValues = {
    email: '',
    password: '',
};

const validateSignupForm = yup.object({
    firstName: yup
        .string()
        .required(errors.required),
    lastName: yup
        .string()
        .required(errors.required),
    email: yup
        .string()
        .email(errors.email)
        .required(errors.required),
    publicKey: yup
        .string()
        .matches(/^0x.{40}/, errors.publicKey)
        .required(errors.required)
        .length(42, errors.publicKey),
    password: yup
        .string()
        .required(errors.required)
});

const initSignupValues = {
    firstName: '',
    lastName: '',
    publicKey: '',
    email: '',
    password: '',
};

export const AuthForm = () => {

    const [isLoginForm, setFormType] = useState(true);

    const switchFormType = (e) => {
        e.target.parentElement.parentElement.reset();
        formik.resetForm();
        setFormType(!isLoginForm)
    };

    const formik = useFormik({
        initialValues: isLoginForm ? initLoginValues : initSignupValues,
        validationSchema: isLoginForm ? validateLoginForm : validateSignupForm,
        validateOnChange: false,
        onSubmit: (values) => {
            console.log(JSON.stringify(values, null, 2));
            window.location.reload();
        },
    });

    const formFields = (isLoginForm ? loginFields : signupFields).map((field, key) => {

        const {name, type, label, placeholder} = field;
        const error = formik.errors[name];

        return (
            <div
                className={`${styles['auth-form__content__group']} ${error && styles['auth-form__content__group-error']}`}
                key={key}>
                <label
                    htmlFor={name}
                    className={styles['auth-form__content__group__label']}>
                    {label}
                </label>
                <input
                    id={name}
                    type={type}
                    placeholder={placeholder}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`${styles['auth-form__content__group__input']} ${error && styles['auth-form__content__group__input-error']}`}/>
                <label className={styles['auth-form__content__group__error-label']}>
                    {error}
                </label>
            </div>
        )
    })

    return (
        <div className={styles['auth-form']}>
            <div className={styles['auth-form__header']}>
                <span>itmo.web3</span>
            </div>
            <form className={styles['auth-form__content']} onSubmit={formik.handleSubmit}>
                {formFields}
                <div className={styles['auth-form__content__info']}>
                    <span>
                        {isLoginForm ? 'Еще нет аккаунта?' : 'Уже зарегистрированы?'}
                    </span>
                    <div
                        className={styles['auth-form__content__info__link']}
                        onClick={switchFormType}>
                        {isLoginForm ? 'Зарегистрироваться' : 'Войти в аккаунт'}
                    </div>
                </div>
                <input
                    type='submit'
                    value={isLoginForm ? 'Вход' : 'Зарегистрироваться'}
                    onClick={formik.submitForm}/>
            </form>
        </div>
    )
}
