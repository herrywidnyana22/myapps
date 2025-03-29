import { DeleteAlertType } from '@/types';
import { Alert } from 'react-native';



export const deleteAlert = ({
    title,
    desc,
    onConfirm,
}:DeleteAlertType) => {
    return Alert.alert(
        title,
        desc,
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
    )
}