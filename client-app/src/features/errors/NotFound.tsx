import { Link } from "react-router-dom";
import { Button, Header, Icon, Segment } from "semantic-ui-react";

export default function NotFound(){
    return (
        <Segment placeholder>
            <Header icon>
                <Icon name='search'/>
                Упс... не найдено
            </Header>
            <Segment.Inline>
                <Button as={Link} to='/posts'>
                    Вернуться на страницу новостей
                </Button>
            </Segment.Inline>
        </Segment>
    )
}