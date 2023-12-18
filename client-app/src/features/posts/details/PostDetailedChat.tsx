import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react'
import { Segment, Header, Comment, Loader } from 'semantic-ui-react'
import { useStore } from '../../../app/stores/store';
import { Link } from 'react-router-dom';
import { Formik, Form, FieldProps, Field } from 'formik';
import * as Yup from 'yup'
import { formatDistanceToNow } from 'date-fns';

interface Props {
    postId: string;
}

export default observer(function PostDetailedChat({ postId }: Props) {
    const { commentStore } = useStore();
    const [canSubmit, setCanSubmit] = useState(true);
    console.log(canSubmit);
    useEffect(() => {
        if (postId) {
            commentStore.createHubConnection(postId)
        }
        return () => {
            commentStore.clearComments();
        }
    }, [commentStore, postId])

    return (
        <>
            <Segment
                textAlign='center'
                attached='top'
                inverted
                color='teal'
                style={{ border: 'none' }}
            >
                <Header>Прокомментируйте данную новость</Header>
            </Segment>
            <Segment attached clearing>
                <Formik
                    onSubmit={(values, { resetForm }) => {
                        setCanSubmit(false);
                        commentStore.addComment(values).then(() => resetForm()).then(() => {
                            setTimeout(() => {
                                setCanSubmit(true);
                            }, 5000);
                        });
                    }}
                    initialValues={{ body: '' }}
                    validationSchema={Yup.object({
                        body: Yup.string().required()
                            .required('Это поле обязательно для заполнения')
                            .matches(/^.*\S.*$/, 'Строка не может состоять только из пробелов')
                            .max(100, 'Максимальная длина 100 символов')
                    })}
                >
                    {({ isSubmitting, isValid, handleSubmit }) => (
                        <Form className='ui form'>
                            <Field name='body'>
                                {(props: FieldProps) => (
                                    <div style={{ position: 'relative' }}>
                                        <Loader active={isSubmitting} />
                                        <textarea
                                            disabled={!canSubmit}
                                            placeholder='Введите свое сообщение (Enter для отправки, SHIFT + enter для новой линии)'
                                            rows={2}
                                            {...props.field}
                                            onKeyDown={e => {
                                                if (e.key === 'enter' && e.shiftKey) {
                                                    return;
                                                }
                                                if (e.key === 'Enter' && !e.shiftKey) {
                                                    e.preventDefault();
                                                    const textarea = e.target as HTMLTextAreaElement;
                                                    const value = textarea.value;
                                                    const selectionStart = textarea.selectionStart || 0;
                                                    const selectionEnd = textarea.selectionEnd || 0;
                                                    const before = value.substring(0, selectionStart);
                                                    const after = value.substring(selectionEnd);
                                                    const newValue = `${before}\n${after}`;

                                                    if (!newValue.includes('\n\n')) {
                                                        isValid && handleSubmit();
                                                    }
                                                }
                                            }}
                                        />
                                    </div>
                                )}
                            </Field>
                        </Form>
                    )}
                </Formik>
                <Comment.Group style={{ maxHeight: '400px', overflowY: 'auto' }}>
                    {commentStore.comments.map(comment => (
                        <Comment key={comment.id}>
                            <Comment.Avatar src='/assets/user.png' />
                            {/* Заменить когда картинки буду добавлять <Comment.Avatar src={comment.image || '/assets/user.png' }/> */}
                            <Comment.Content>
                                <Comment.Author as={Link} to={`/profiles/${comment.username}`}>
                                    {comment.displayName}
                                </Comment.Author>
                                <Comment.Metadata>
                                    <div>{formatDistanceToNow(comment.createdAt)} ago</div>
                                </Comment.Metadata>
                                <Comment.Text style={{ whiteSpace: 'pre-wrap' }}>{comment.body}</Comment.Text>
                            </Comment.Content>
                        </Comment>
                    ))}


                </Comment.Group>
            </Segment>
        </>

    )
})