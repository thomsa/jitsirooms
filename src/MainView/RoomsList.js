import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import styled from "styled-components";
import { CreateSpaceForm } from "../+Components/CreateSpaceInput";
import { SimpleList } from "./List";
import { useChatRooms } from "../Firebase/useChatRooms";

import { useHistory, useLocation } from "react-router-dom";

const useStyles = makeStyles(theme => ({
    root: {
        flex: 1
    },
    paper: {
        padding: theme.spacing(6),
        textAlign: "left",
        color: theme.palette.text.secondary,
        marginRight: "50px",
        overflow: "visible",
        maxHeight: "calc(100vh - 100px)",
        display: "flex",
        flexDirection: "column"
    }
}));

const MyH1 = styled.h1`
`;

const SmallP = styled.p`
    font-size: small;
`;

const MyPaper = styled.div`
    box-shadow: 0 1px 3px 0 rgba(60, 64, 67, 0.302),
        0 4px 8px 3px rgba(60, 64, 67, 0.149);
    background: ${props => props.theme.palette.primary.main};
    color: #fff;
    font-weight: 500;
    transform: scale(1.05);
    z-index: 10;
    border-radius: 8px;
    height: 150px;
    margin: auto -50px;
    padding: 25px;
    display: flex;
    align-items: center;
`;

export const RoomsList = ({ rooms, spaceKey }) => {
    const classes = useStyles();
    const { createRoom } = useChatRooms();

    const history = useHistory();
    const location = useLocation();

    const onCreateOrSelectRoom = roomName => {
        if (filteredRooms && Object.keys(filteredRooms).length < 1) {
            const roomKey = createRoom(spaceKey, roomName);
            history.push(`${spaceKey}/${roomKey}`);
        }
    };

    const [filteredRooms, setFilteredRooms] = useState(rooms);
    const [filterValue, setFilterValue] = useState("");
    useEffect(() => {
        const result = [];
        rooms && Object.keys(rooms).forEach(key => {
            if (
                rooms[key].name
                    .toLowerCase()
                    .includes(filterValue.toLowerCase())
            ) {
                result[key] = rooms[key];
            }
        });
        setFilteredRooms(result);
    }, [rooms, filterValue]);

    return (
        <Grid
            className={classes.root}
            container
            justify="flex-end"
            alignItems="center"
        >
            <Grid item xs={12} sm={6}>
                <Card className={classes.paper}>
                    <MyH1 class="typewriter">Video Rooms</MyH1>
                    
                    <MyPaper>
                        <CreateSpaceForm
                            onFormSubmit={roomName =>
                                onCreateOrSelectRoom(roomName)
                            }
                            onInputChange={setFilterValue}
                            placeHolder={"Search or start a new room"}
                            canSubmit={
                                filteredRooms &&
                                Object.keys(filteredRooms).length < 1
                            }
                        ></CreateSpaceForm>
                    </MyPaper>
                    <SimpleList items={filteredRooms}></SimpleList>
                    <SmallP>
                        Powered by{" "}
                        <a href="https://jitsi.org/" target="_blank">
                            jitsi.org
                        </a>
                    </SmallP>
                </Card>
            </Grid>
        </Grid>
    );
};
