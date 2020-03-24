import React, { useEffect } from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import styled from "styled-components";
import Tooltip from "@material-ui/core/Tooltip";
import CopyIcon from "@material-ui/icons/FileCopy";
import MeetingRoom from "@material-ui/icons/MeetingRoom";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useParams, useHistory, useLocation } from "react-router-dom";
import { FormDialog } from "./+Components/Dialog";

import { useChatRooms } from "../Firebase/useChatRooms";
import { useChatSpace } from "../Firebase/useChatSpaces";
import { RoomsList } from "./RoomsList";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        flex: 1
    },
    appBar: {
        transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        flex: 0,
        position: "unset",
        color: "white"
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen
        })
    },
    menuButton: {
        marginRight: theme.spacing(2)
    },
    hide: {
        display: "none"
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0
    },
    drawerPaper: {
        width: drawerWidth
    },
    drawerHeader: {
        display: "flex",
        alignItems: "center",
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        justifyContent: "flex-end"
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        marginLeft: -drawerWidth,
        margin: "0px",
        padding: "0px"
    },
    contentShift: {
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen
        }),
        marginLeft: 240
    }
}));

const ContainerDiv = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    background: url("/bg.jpeg") no-repeat center center fixed;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
`;

const Main = styled.main`
    flex: 1;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    display: flex;
`;

const MyIconButton = styled(IconButton)`
    color: white;
`;

let prevSelectedRoom = null;
let api = null;
export const Container = () => {
    let { space: selectedSpace, room: selectedRoom } = useParams();
    const history = useHistory();
    const location = useLocation();
    const { createRoom } = useChatRooms();

    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(false);
    const { getSpace } = useChatSpace();

    const [spaceSnapshot, setSpaceSnapshot] = React.useState();

    const [rooms, setRooms] = React.useState();

    const getSpaces = () => {
        getSpace(selectedSpace).then(snapshot => {
            if (snapshot.val()) {
                console.log(snapshot.val());
                setRooms(snapshot && snapshot.val().rooms);
                setSpaceSnapshot(snapshot);
                setLoading(false);
            } else {
                setError(true);
                setLoading(false);
            }
        });
    };

    useEffect(() => {
        getSpaces();
    }, [selectedRoom]);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        if (spaceSnapshot && selectedRoom && rooms) {
            if(selectedRoom === prevSelectedRoom) {
                return;
            }
            prevSelectedRoom = selectedRoom;
            if (api) {
                api.dispose();
            }


            const timer = setTimeout(() => {
                const videoRootElement = document.querySelector("#video-root");

                const domain = "meet.jit.si";

                const options = {
                    roomName: `${spaceSnapshot && spaceSnapshot.val().name}_${
                        rooms[selectedRoom].name
                    }_${spaceSnapshot && spaceSnapshot.key}`,
                    parentNode: videoRootElement
                };

                api = new window.JitsiMeetExternalAPI(domain, options);
                api.addEventListener("videoConferenceLeft", event => {
                    history.replace(`/${spaceSnapshot.key}`);
                    api.dispose();
                    api = null;
                });
            }, 100);
            return () => clearTimeout(timer);
        }
    }, [spaceSnapshot, selectedRoom]);

    if (loading) {
        return <p> loading...</p>;
    }

    return (
        <ContainerDiv>
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                    color: "white"
                })}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(
                            classes.menuButton,
                            open && classes.hide
                        )}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        {spaceSnapshot && spaceSnapshot.val().name}{" "}
                        {rooms &&
                            rooms[selectedRoom] &&
                            `/ ${rooms[selectedRoom].name}`}
                        <Tooltip title="Copy Link" placement="right">
                            <CopyToClipboard text={window.location.href}>
                                <MyIconButton aria-label="copy">
                                    <CopyIcon />
                                </MyIconButton>
                            </CopyToClipboard>
                        </Tooltip>
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper
                }}
            >
                <div className={classes.drawerHeader}>
                    <FormDialog
                        onSave={roomName => {
                            createRoom(
                                spaceSnapshot && spaceSnapshot.key,
                                roomName
                            );

                            getSpaces();
                        }}
                    />
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === "ltr" ? (
                            <ChevronLeftIcon />
                        ) : (
                            <ChevronRightIcon />
                        )}
                    </IconButton>
                </div>
                <Divider />
                <List>
                    {rooms &&
                        Object.keys(rooms).map(key => {
                            return (
                                <ListItem
                                    button
                                    onClick={() => {
                                        console.log("path", `${location.pathname.split("/")[1]}/${key}`);
                                        history.push(
                                            `/${location.pathname.split("/")[1]}/${key}`
                                        );
                                    }}
                                >
                                    <ListItemIcon>
                                        <MeetingRoom />
                                    </ListItemIcon>
                                    <ListItemText primary={rooms[key].name} />
                                </ListItem>
                            );
                        })}
                </List>
            </Drawer>
            <Main>
                {!selectedRoom && (
                    <RoomsList
                        rooms={rooms}
                        spaceKey={spaceSnapshot && spaceSnapshot.key}
                    ></RoomsList>
                )}
                {selectedRoom && <div id="video-root"></div>}
            </Main>
        </ContainerDiv>
    );
};
