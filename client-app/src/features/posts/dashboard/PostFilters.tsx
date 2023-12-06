import React from "react";
import Calendar from "react-calendar";
import { Header, Menu } from "semantic-ui-react";

export default function PostFilters() {
    return (
        <>
            <Menu vertical size='large' style={{ width: '100', marginTop:28 }}>
                <Header icon='filter' attached color='teal' content='Filters' />
                <Menu.Item content='All posts' />
            </Menu>
            <Header />
            <Calendar/>
        </>
    )
}