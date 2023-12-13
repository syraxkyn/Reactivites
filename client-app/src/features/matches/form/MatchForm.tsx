import { useEffect, useState } from 'react'
import { Button, Header, Segment } from 'semantic-ui-react'
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import MySelectInput from '../../../app/common/form/MySelectInput';
import MyDateInput from '../../../app/common/form/MyDateInput';
import { MatchFormValues } from '../../../app/models/match';

export default observer(function MatchForm() {
    const { matchStore, teamStore } = useStore();
    const { selectedMatch, createMatch, updateMatch,
        loading, loadMatch, loadingInitial } = matchStore;
    const { loadTeams, teamRegistry, teams } = teamStore;
    let teamOptions: { text: string; value: string; }[]
    const { id } = useParams();
    const navigate = useNavigate()

    const [match, setMatch] = useState<MatchFormValues>(new MatchFormValues());

    const validationScheme = Yup.object({
        FirstTeamId: Yup.string().required('Необходимо выбрать первую команду').notOneOf([Yup.ref('SecondTeamId')], 'Команда не может играть сама с собой'),
        SecondTeamId: Yup.string().required('Необходимо выбрать вторую команду'),
        date: Yup.string().required('Выберите дату')
    })

    useEffect(() => {
        if (teamRegistry.size <= 1) loadTeams();teamOptions = teams.map(team => {
            return { text: team.name, value: team.id };
        }); 
        if (id) loadMatch(id).then(match => setMatch(new MatchFormValues(match)))
    }, [id, loadMatch, teamRegistry.size])

    function handleFormSubmit(match: MatchFormValues) {
        if (!match.id) {
            let newMatch = {
                ...match,
                firstTeamName: 'okay',
                secondTeamName: 'okay',
                id: uuid()
            };
            createMatch(newMatch).then(() => navigate(`/matches`))
        }
        else {
            updateMatch(match).then(() => navigate(`/matches/${match.id}`))
        }
    }
    
    if (teamStore.loadingInitial) return <LoadingComponent content='Загрузка команд...' />
    if (loadingInitial) return <LoadingComponent content='Загрузка матча...' />

    return (
        <Segment clearing>
            <Header content='Данные матча' color='teal' />
            <Formik
                validationSchema={validationScheme}
                enableReinitialize
                initialValues={match}
                onSubmit={values => handleFormSubmit(values)}>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                        <MySelectInput options={teamOptions} placeholder='Первая команда' name='FirstTeamId' />
                        <MySelectInput options={teamOptions} placeholder='Вторая команда' name='SecondTeamId' />
                        <MyDateInput
                            placeholderText='Дата матча'
                            name='date'
                            showTimeSelect
                            timeCaption='time'
                            dateFormat='MMMM d, yyyy h:mm aa'
                        />
                        <Button
                            disabled={isSubmitting || !dirty || !isValid}
                            loading={isSubmitting}
                            floated='right'
                            positive type='submit'
                            content='Submit'
                        />
                        <Button as={Link} to='/posts' floated='right' type='button' content='Cancel' />
                    </Form>
                )}
            </Formik>
        </Segment>
    )
})
