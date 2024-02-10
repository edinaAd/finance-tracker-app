import axios from 'axios';

export const addUserToFirestore = async (email: string, name: string, userId: string, authToken: string) => {
    try {
        const firestoreResponse = await axios.post(
            'https://firestore.googleapis.com/v1/projects/fir-tracker-6c099/databases/(default)/documents/users',
            {
                fields: {
                    email: { stringValue: email },
                    name: { stringValue: name },
                    userId: { stringValue: userId }
                }
            },
            {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            }
        );

        return firestoreResponse.data;
    } catch (error: any) {
        throw new Error('Error adding user to Firestore: ' + error.message);
    }
};