import { Alert } from 'react-native';

export const showDeleteAlert = (onConfirm: () => void) => {
    Alert.alert(
        "Confirm",
        "Are you sure to delete this transaction? \nThis action can be undone",
        [
            {
                text: "Cancel",
                style: "cancel",
            },
            {
                text: "Delete this transaction",
                onPress: onConfirm,
                style: "destructive",
            },
        ]
    );
};