import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import styled from "styled-components";
import { CreateSpaceForm } from "../+Components/CreateSpaceInput";
import { useChatSpace } from "../Firebase/useChatSpaces";

import { useHistory} from "react-router-dom";

const useStyles = makeStyles(theme => ({
    root: {
        flex: 1
    },
    paper: {
        padding: theme.spacing(6),
        textAlign: "left",
        color: theme.palette.text.secondary,
        marginRight: "50px",
        overflow: "visible"
    }
}));

const ContainerRoot = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    background: url("/bg.jpeg") no-repeat center center fixed;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
`;

const MyH1 = styled.h1`
    margin: 0 auto;
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

export const Home = () => {
    const classes = useStyles();
    const history = useHistory();
    const { createSpace } = useChatSpace();

    const onCreateSpace = (name) => {
        const key = createSpace(name);
        history.push(`/${key}`);
    }
    return (
        <>
            <ContainerRoot>
                <Grid
                    className={classes.root}
                    container
                    justify="flex-end"
                    alignItems="center"
                >
                    <Grid item xs={12} sm={6}>
                        <Card className={classes.paper}>
                            <MyH1 class="typewriter">JitsiRooms</MyH1>
                            <h2>Video Chat With Rooms</h2>
                            <p>
                                Create or join a space where you can add and
                                easily switch between multiple video chat rooms.
                                To join an existing space you have to paste the
                                URL of the space to the browserbar.
                            </p>
                            <MyPaper>
                                <CreateSpaceForm
                                    onFormSubmit={onCreateSpace}
                                    canSubmit={true}
                                    placeHolder={"Name of the Workspace"}
                                ></CreateSpaceForm>
                            </MyPaper>
                            <SmallP>
                                Powered by{" "}
                                <a href="https://jitsi.org/" target="_blank">
                                    jitsi.org
                                </a>
                            </SmallP>
                        </Card>
                    </Grid>
                </Grid>
            </ContainerRoot>
        </>
    );
};
