import React, { useEffect, useState } from "react";
import { Table } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";

export default observer(function PlayerFilters() {
    const { teamStore } = useStore();
    const { loadTeams, teamRegistry, teams } = teamStore;
    console.log(teams);
    const sortedData = [...teams].sort((a, b) => a.points - b.points).reverse();

    useEffect(() => {
        if (teamRegistry.size <= 1) loadTeams();
    }, [teamRegistry.size,loadTeams])

    return (
        <Table celled>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Название команды</Table.HeaderCell>
                    <Table.HeaderCell>Забитые голы</Table.HeaderCell>
                    <Table.HeaderCell>Пропущенные голы</Table.HeaderCell>
                    <Table.HeaderCell>Очки</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {sortedData.map(({ id, name, scoredGoals, concededGoals, points }) => (
                    <Table.Row key={id}>
                        <Table.Cell>{name}</Table.Cell>
                        <Table.Cell>{scoredGoals}</Table.Cell>
                        <Table.Cell>{concededGoals}</Table.Cell>
                        <Table.Cell>{points}</Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table>
    );
})