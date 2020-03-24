import { useFirebase } from "./useFirebase";
import uuid from "node-uuid";
import moment from "moment";

export const useChatSpace = () => {
    const { firebase } = useFirebase();
    const createSpace = name => {
        const newSpaceKey = firebase
            .database()
            .ref()
            .child("spaces")
            .push().key;

        var data = {};
        data["spaces/" + newSpaceKey] = { name, createdAt: moment.now() };
        firebase
            .database()
            .ref()
            .update(data);
        return newSpaceKey;
    };

    const getSpace = key => {
        return firebase.database().ref(`spaces/${key}`).once("value");
    };

    return {
        createSpace,
        getSpace
    };
};
