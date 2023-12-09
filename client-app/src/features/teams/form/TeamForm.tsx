import { useEffect, useState } from 'react'
import { Button, Header, Segment } from 'semantic-ui-react'
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import MyTextInput from '../../../app/common/form/MyTextInput';
import { TeamFormValues } from '../../../app/models/team';

export default observer(function TeamForm() {
    const { teamStore } = useStore();
    const { selectedTeam, createTeam, updateTeam,
        loading, loadTeam, loadingInitial } = teamStore;
    const { id } = useParams();
    const navigate = useNavigate()

    const [post, setPost] = useState<TeamFormValues>(new TeamFormValues());

    const validationScheme = Yup.object({
        name: Yup.string().required('The name is required')
    })

    useEffect(() => {
        if (id) loadTeam(id).then(team => setPost(new TeamFormValues(team)))
    }, [id, loadTeam])

    function handleFormSubmit(post: TeamFormValues) {
        if (!post.id) {
            let newTeam = {
                ...post,
                id: uuid()
            };
            createTeam(newTeam).then(() => navigate(`/teams/${newTeam.id}`))
        }
        // else {
        //     updateTeam(team).then(() => navigate(`/teams/${team.id}`))
        // }
    }

    if (loadingInitial) return <LoadingComponent content='Loading team...' />

    return (
        <Segment clearing>
            <Header content='Team Details' color='teal' />
            <Formik
                validationSchema={validationScheme}
                enableReinitialize
                initialValues={post}
                onSubmit={values => handleFormSubmit(values)}>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                        <MyTextInput name='name' placeholder='name' />
                        <Button
                            disabled={isSubmitting || !dirty || !isValid}
                            loading={isSubmitting}
                            floated='right'
                            positive type='submit'
                            content='Submit'
                        />
                        <Button as={Link} to='/teams' floated='right' type='button' content='Cancel' />
                    </Form>
                )}
            </Formik>
        </Segment>
    )
})
