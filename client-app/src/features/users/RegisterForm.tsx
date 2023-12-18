import { ErrorMessage, Form, Formik } from "formik";
import MyTextInput from "../../app/common/form/MyTextInput";
import { Button, Header } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";
import * as Yup from 'yup'
import ValidationError from "../errors/ValidationError";

export default observer(function RegisterForm() {
    const { userStore } = useStore();
    return (
        <Formik
            initialValues={{ displayName: '', username: '', email: '', password: '', error: null }}
            onSubmit={(values, { setErrors }) => userStore.register(values).catch(error =>
                setErrors({ error }))}
            validationSchema={Yup.object({
                displayName: Yup.string().required('Необходимо ввести отображаемое имя'),
                username: Yup.string().required('Необходимо ввести имя'),
                email: Yup.string().required('Необходимо ввести почту'),
                password: Yup.string().required('Необходимо ввести пароль')

            })}
        >
            {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (
                <Form className='ui form error' onSubmit={handleSubmit} autoComplete="off">
                    <Header as='h2' content='Регистрация на Footbik' color='teal' textAlign="center" />
                    <MyTextInput placeholder="Отображаемое имя" name='displayName' />
                    <MyTextInput placeholder="Имя" name='username' />
                    <MyTextInput placeholder="Email" name='email' />
                    <MyTextInput placeholder="Пароль" name='password' type='password' />
                    <ErrorMessage
                        name='error' render={() =>
                            <ValidationError errors={errors.error as unknown as string[]} />}
                    />
                    <Button
                        disabled={!isValid || !dirty || isSubmitting}
                        loading={isSubmitting} positive
                        content='Регистрация' type='submit' fluid />
                </Form>
            )}
        </Formik>
    )
})