import { Button, Container, Menu, Image, Dropdown } from 'semantic-ui-react';
import { Link, NavLink } from 'react-router-dom';
import { useStore } from '../stores/store';

export default function NavBar() {
    const { userStore: { user, logout, isAdmin } } = useStore();
    return (
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item as={NavLink} to='/' header>
                    <img src="/assets/soccer-ball.png" alt="logo" style={{ marginRight: '10px' }} />
                </Menu.Item>
                <Menu.Item as={NavLink} to='/posts' name='Новости' />
                <Menu.Item as={NavLink} to='/teams' name='Команды' />
                <Menu.Item as={NavLink} to='/players' name='Игроки' />
                <Menu.Item as={NavLink} to='/matches' name='Матчи' />
                <Menu.Item as={NavLink} to='/errors' name='Errors' />
                <Menu.Item>
                    <Button as={NavLink} to='/createPost' positive content='Опубликовать новость' />
                </Menu.Item>
                {isAdmin ? (
                <Dropdown item text='Админ-панель'>
                    <Dropdown.Menu>
                        <Dropdown.Item as={NavLink} to='/createTeam' content='Создать команду' />
                        <Dropdown.Item as={NavLink} to='/createPlayer' content='Создать игрока' />
                        <Dropdown.Item as={NavLink} to='/createMatch' content='Создать матч' />
                    </Dropdown.Menu>
                </Dropdown>
                ):(null)}
                <Menu.Item position='right'>
                    <Image src={user?.image || '/assets/user.png'} avatar spaced='right' />
                    <Dropdown pointing='top left' text={user?.displayName}>
                        <Dropdown.Menu>
                            <Dropdown.Item as={Link} to={`/profile/${user?.username}`} text='My Profile' icon='user' />
                            <Dropdown.Item onClick={logout} text='Выход' icon='power' />
                        </Dropdown.Menu>
                    </Dropdown>
                </Menu.Item>
            </Container>
        </Menu>
    )
}