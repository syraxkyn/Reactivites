import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react'
import { Segment, Header, Comment, Loader } from 'semantic-ui-react'
import { useStore } from '../../../app/stores/store';
import { Link } from 'react-router-dom';
import { Formik, Form, FieldProps, Field } from 'formik';
import * as Yup from 'yup'
import { formatDistanceToNow } from 'date-fns';

interface Props {
    matchId: string;
}

export default observer(function MatchDetailedChat({ matchId }: Props) {
    const { messageStore } = useStore();
    const [canSubmit, setCanSubmit] = useState(true);

    useEffect(() => {
        if (matchId) {
            messageStore.createHubConnection(matchId)
        }
        return () => {
            messageStore.clearComments();
        }
    }, [messageStore, matchId])

    return (
        <>
            <Segment
                textAlign='center'
                attached='top'
                inverted
                color='teal'
                style={{ border: 'none' }}
            >
                <Header>Отправьте сообщение</Header>
            </Segment>
            <Segment attached clearing>
                <Formik
                    onSubmit={(values, { resetForm }) => {
                        setCanSubmit(false);
                        messageStore.addMessage(values).then(() => resetForm()).then(() => {
                            setTimeout(() => {
                                setCanSubmit(true);
                            }, 5000);
                        });
                    }}
                    initialValues={{ body: '' }}
                    validationSchema={Yup.object({
                        body: Yup.string()
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
                <Comment.Group>
                    {messageStore.messages.map(message => (
                        <Comment key={message.id}>
                            <Comment.Avatar src='/assets/user.png' />
                            {/* Заменить когда картинки буду добавлять <Comment.Avatar src={comment.image || '/assets/user.png' }/> */}
                            <Comment.Content>
                                <Comment.Author as={Link} to={`/profiles/${message.username}`}>
                                    {message.displayName}
                                </Comment.Author>
                                <Comment.Metadata>
                                    <div>{formatDistanceToNow(message.createdAt)} ago</div>
                                </Comment.Metadata>
                                <Comment.Text style={{ whiteSpace: 'pre-wrap' }}>{message.body}</Comment.Text>
                            </Comment.Content>
                        </Comment>
                    ))}


                </Comment.Group>
            </Segment>
        </>

    )
})