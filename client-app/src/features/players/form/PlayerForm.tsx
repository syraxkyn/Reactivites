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
import { PlayerFormValues } from '../../../app/models/player';
import MySelectInput from '../../../app/common/form/MySelectInput';
import { positionOptions } from '../../../app/common/options/positionOptions';
import teamStore from '../../../app/stores/teamStore';

export default observer(function PlayerForm() {
    const { playerStore, teamStore } = useStore();
    const { createPlayer, updatePlayer, loadPlayer, loadingInitial } = playerStore;
    const { loadTeams, teamRegistry, teams } = teamStore;
    let teamOptions: { text: string; value: string; }[]
    const { id } = useParams();
    const navigate = useNavigate()

    const [player, setPlayer] = useState<PlayerFormValues>(new PlayerFormValues());

    const validationSchemeForCreation = Yup.object({
        name: Yup.string().required('The name is required'),
        position: Yup.string().required('The position is required'),
        TeamId: Yup.string().required('The team is required')
    })

    const validationSchemeForUpdating = Yup.object({
        name: Yup.string().required('The name is required'),
        goals: Yup.string().required('The goals is required'),
        assists: Yup.string().required('The assists is required')
    })

    useEffect(() => {
        if (teamRegistry.size <= 1) loadTeams(); teamOptions = teams.map(team => {
            return { text: team.name, value: team.id };
        });
        if (id) loadPlayer(id).then(player => setPlayer(new PlayerFormValues(player)))
    }, [id, loadPlayer, teamRegistry.size])

    function handleFormSubmit(player: PlayerFormValues) {
        if (!player.id) {
            let newPlayer = {
                ...player,
                id: uuid()
            };
            createPlayer(newPlayer).then(() => navigate(`/players/${newPlayer.id}`))
        }
        else {
            updatePlayer(player).then(() => navigate(`/players/${player.id}`))
        }
    }

    if (teamStore.loadingInitial) return <LoadingComponent content='Loading teams...' />
    if (loadingInitial) return <LoadingComponent content='Loading player...' />

    return (
        <Segment clearing>
            <Header content='Player Details' color='teal' />
            { id==null ? (
                <Formik
                    validationSchema={validationSchemeForCreation}
                    enableReinitialize
                    initialValues={player}
                    onSubmit={values => handleFormSubmit(values)}>
                    {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                        <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                            <MyTextInput name='name' placeholder='name' />
                            <MySelectInput options={positionOptions} placeholder='Position' name='position' />
                            <MySelectInput options={teamOptions} placeholder='Team' name='TeamId' />
                            <Button
                                disabled={isSubmitting || !dirty || !isValid}
                                loading={isSubmitting}
                                floated='right'
                                positive type='submit'
                                content='Submit'
                            />
                            <Button as={Link} to='/players' floated='right' type='button' content='Cancel' />
                        </Form>
                    )}
                </Formik>
            ):
            (
                <Formik
                    validationSchema={validationSchemeForUpdating}
                    enableReinitialize
                    initialValues={player}
                    onSubmit={values => handleFormSubmit(values)}>
                    {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                        <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                            <MyTextInput name='name' placeholder='name' />
                            <MyTextInput name='goals' placeholder='goals'/>
                            <MyTextInput name='assists' placeholder='assists'/>
                            <Button
                                disabled={isSubmitting || !dirty || !isValid}
                                loading={isSubmitting}
                                floated='right'
                                positive type='submit'
                                content='Submit'
                            />
                            <Button as={Link} to='/players' floated='right' type='button' content='Cancel' />
                        </Form>
                    )}
                </Formik>
            )
            }
        </Segment>
    )
})
