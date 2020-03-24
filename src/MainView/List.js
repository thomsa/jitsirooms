import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MeetingRoom from "@material-ui/icons/MeetingRoom";

import { useHistory, useLocation } from "react-router-dom";
const useStyles = makeStyles(theme => ({
    root: {
        flex: "1",
        backgroundColor: theme.palette.background.paper,
        overflow: "auto"
    }
}));

export const SimpleList = ({ items }) => {
    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();
    return (
        <div className={classes.root}>
            {items && Object.keys(items).length === 0 && (
                <p>This space has no rooms yet. Create one!</p>
            )}

            {items && Object.keys(items).length > 0 && (
                <List aria-label="meeting room">
                    {Object.keys(items).map(key => {
                        return (
                            <ListItem
                                button
                                onClick={() => {
                                    history.push(`${location.pathname}/${key}`);
                                }}
                            >
                                <ListItemIcon>
                                    <MeetingRoom />
                                </ListItemIcon>
                                <ListItemText primary={items[key].name} />
                            </ListItem>
                        );
                    })}
                </List>
            )}
        </div>
    );
};
