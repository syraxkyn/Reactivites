import React from "react";
import Calendar from "react-calendar";
import { Header, Menu } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";

export default observer(function PlayerFilters() {
    const { playerStore: { predicate, setPredicate } } = useStore();
    return (
        <>
            <Menu vertical size='large' style={{ width: '100' }}>
                <Header icon='futbol' attached color='teal' content='Позиция' />
                <Menu.Item
                    content='Все игроки'
                    active={predicate.has('All')}
                    onClick={() => setPredicate('All', 'true')}
                />
                <Menu.Item
                    content="Нападающий"
                    active={predicate.get('Position') == "attacker"}
                    onClick={() => setPredicate('Attacker', 'true')}
                />
                <Menu.Item
                    content="Полузащитник"
                    active={predicate.get('Position') == "midfielder"}
                    onClick={() => setPredicate('Midfielder', 'true')}
                />
                <Menu.Item
                    content="Защитник"
                    active={predicate.get('Position') == "defender"}
                    onClick={() => setPredicate('Defender', 'true')}
                />
                <Menu.Item
                    content="Вратарь"
                    active={predicate.get('Position') == "goalkeeper"}
                    onClick={() => setPredicate('Goalkeeper', 'true')}
                />
            </Menu>
            <Header style={{ width: '100', marginTop: 28 }} />
        </>
    )
})