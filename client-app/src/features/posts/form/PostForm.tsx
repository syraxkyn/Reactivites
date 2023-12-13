import { useEffect, useState } from 'react'
import { Button, Header, Segment } from 'semantic-ui-react'
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { PostFormValues } from '../../../app/models/post';
import { v4 as uuid } from 'uuid';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import MyTextInput from '../../../app/common/form/MyTextInput';
import MyTextArea from '../../../app/common/form/MyTextArea';

export default observer(function PostForm() {
    const { postStore } = useStore();
    const { selectedPost, createPost, updatePost,
        loading, loadPost, loadingInitial } = postStore;
    const { id } = useParams();
    const navigate = useNavigate()

    const [post, setPost] = useState<PostFormValues>(new PostFormValues());

    const validationScheme = Yup.object({
        title: Yup.string().required('Необходимо ввести заголовок новости'),
        text: Yup.string().required('Необходимо ввести текст новости'),
        // date: Yup.string().required()
    })

    useEffect(() => {
        if (id) loadPost(id).then(post => setPost(new PostFormValues(post)))
    }, [id, loadPost])

    function handleFormSubmit(post: PostFormValues) {
        if (!post.id) {
            let newPost = {
                ...post,
                date: new Date(), // Это устанавливает текущую дату и время
                id: uuid()
            };
            createPost(newPost).then(() => navigate(`/posts/${newPost.id}`))
        }
        else {
            updatePost(post).then(() => navigate(`/posts/${post.id}`))
        }
    }

    if (loadingInitial) return <LoadingComponent content='Загрузка новости...' />

    return (
        <Segment clearing>
            <Header content='Детали публикации' color='teal' />
            <Formik
                validationSchema={validationScheme}
                enableReinitialize
                initialValues={post}
                onSubmit={values => handleFormSubmit(values)}>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                        <MyTextInput name='title' placeholder='Заголовок' />
                        <MyTextArea rows={3} placeholder='Текст' name='text' />
                        <Button
                            disabled={isSubmitting || !dirty || !isValid}
                            loading={isSubmitting}
                            floated='right'
                            positive type='submit'
                            content='Опубликовать'
                        />
                        <Button as={Link} to='/posts' floated='right' type='button' content='Отмена' />
                    </Form>
                )}
            </Formik>
        </Segment>
    )
})
