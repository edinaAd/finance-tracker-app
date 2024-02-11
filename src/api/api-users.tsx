import axios from 'axios';

export const addUserToFirestore = async (email: string, name: string, userId: string, authToken: string) => {
    try {
        const firestoreResponse = await axios.post(
            `https://firestore.googleapis.com/v1/projects/fir-tracker-6c099/databases/(default)/documents/users?documentId=${userId}`,
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

export const fetchIncomes = async (userId: string, authToken: string) => {
    try {
        const response = await axios.get(
            `https://firestore.googleapis.com/v1/projects/fir-tracker-6c099/databases/(default)/documents/users/${userId}/incomes`,
            {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            }
        );

        return response.data;
    } catch (error: any) {
        throw new Error('Error fetching incomes: ' + error.message);
    }
};

export const fetchExpenses = async (userId: string, authToken: string) => {
    try {
        const response = await axios.get(
            `https://firestore.googleapis.com/v1/projects/fir-tracker-6c099/databases/(default)/documents/users/${userId}/expenses`,
            {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            }
        );

        return response.data;
    } catch (error: any) {
        throw new Error('Error fetching incomes: ' + error.message);
    }
}