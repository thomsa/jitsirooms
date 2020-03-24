import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Send from "@material-ui/icons/Send";

const useStyles = makeStyles(theme => ({
    root: {
        padding: "2px 4px",
        display: "flex",
        alignItems: "center",
        flex: 1
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1
    },
    iconButton: {
        padding: 10
    },
    divider: {
        height: 28,
        margin: 4
    }
}));

export const CreateSpaceForm = ({
    onFormSubmit,
    onInputChange,
    placeHolder,
    canSubmit
}) => {
    const classes = useStyles();
    const [inputValue, setInputValue] = useState("");

    return (
        <Paper
            component="form"
            onSubmit={event => {
                event.preventDefault();
                onFormSubmit(inputValue);
            }}
            className={classes.root}
        >
            <InputBase
                className={classes.input}
                placeholder={placeHolder}
                onChange={event => {
                    setInputValue(event.target.value);
                    onInputChange && onInputChange(event.target.value);
                }}
            />

            <Divider className={classes.divider} orientation="vertical" />
            <IconButton
                disabled={!canSubmit}
                color="primary"
                className={classes.iconButton}
                aria-label="directions"
                onClick={() => onFormSubmit(inputValue)}
            >
                <Send />
            </IconButton>
        </Paper>
    );
};
