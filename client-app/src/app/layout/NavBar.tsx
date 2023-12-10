import { Button, Container, Menu, Image, Dropdown } from 'semantic-ui-react';
import { Link, NavLink } from 'react-router-dom';
import { useStore } from '../stores/store';

export default function NavBar() {
    const { userStore: { user, logout } } = useStore();
    return (
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item as={NavLink} to='/' header>
                    <img src="/assets/soccer-ball.png" alt="logo" style={{ marginRight: '10px' }} />
                </Menu.Item>
                <Menu.Item as={NavLink} to='/posts' name='Posts' />
                <Menu.Item as={NavLink} to='/teams' name='Teams' />
                <Menu.Item as={NavLink} to='/players' name='Players' />
                <Menu.Item as={NavLink} to='/errors' name='Errors' />
                <Menu.Item>
                    <Button as={NavLink} to='/createPost' positive content='Create Post' />
                </Menu.Item>
                <Menu.Item>
                    <Button as={NavLink} to='/createTeam' positive content='Create Team' />
                </Menu.Item>
                <Menu.Item>
                    <Button as={NavLink} to='/createPlayer' positive content='Create Player' />
                </Menu.Item>
                <Menu.Item position='right'>
                    <Image src={user?.image || '/assets/user.png'} avatar spaced='right' />
                    <Dropdown pointing='top left' text={user?.displayName}>
                        <Dropdown.Menu>
                            <Dropdown.Item as={Link} to={`/profile/${user?.username}`} text='My Profile' icon='user' />
                            <Dropdown.Item onClick={logout} text='Logout' icon='power' />
                        </Dropdown.Menu>
                    </Dropdown>
                </Menu.Item>
            </Container>
        </Menu>
    )
}