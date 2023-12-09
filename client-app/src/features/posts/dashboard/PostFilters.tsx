import React from "react";
import Calendar from "react-calendar";
import { Header, Menu } from "semantic-ui-react";

export default function PostFilters() {
    return (
        <>
            <Header style={{ width: '100', marginTop:28 }}/>
            <Calendar />
        </>
    )
}