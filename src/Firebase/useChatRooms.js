import { useFirebase } from "./useFirebase";
import moment from "moment";

export const useChatRooms = () => {
    const { firebase } = useFirebase();

    const createRoom = (spaceId, roomName) => {
        if (!roomName) {
            console.log("empty name");
            return;
        }
        const spaceRef = firebase.database().ref(`spaces/${spaceId}/rooms`);
        const newspaceRef = spaceRef.push();
        newspaceRef.set({
            name: roomName,
            createdAt: moment.now()
        }, (error) => {
        })

        return newspaceRef.key;
    
    };

    return {
        createRoom
    };
};
