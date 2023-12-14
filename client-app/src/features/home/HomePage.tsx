import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { Container, Header, Segment, Image, Button } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import LoginForm from "../users/LoginForm";
import RegisterForm from "../users/RegisterForm";

export default observer(function HomePage() {
    const { userStore, modalStore } = useStore();
    return (
        <Segment inverted textAlign='center' vertical className='masthead'>
            <Container text>
                <Header as='h1' inverted>
                    <Image size='massive' src='/assets/soccer-ball.png' alt='logo' style={{ marginBottom: 12 }} />
                    Footbik
                </Header>
                {userStore.isLoggedIn ? (
                    <>
                        <Button as={Link} to='/posts' size='huge' inverted>
                            Перейти на футбольный портал
                        </Button>
                    </>
                ) : (
                    <>
                        <Button onClick={() => modalStore.openModal(<LoginForm />)} size='huge' inverted>
                            Логин
                        </Button>
                        <Button onClick={() => modalStore.openModal(<RegisterForm/>)} size='huge' inverted>
                            Регистрация
                        </Button>
                    </>
                )}
            </Container>
        </Segment>
    )
})