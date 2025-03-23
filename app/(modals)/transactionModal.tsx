import { Trash2 } from 'lucide-react-native'
import { useAuth } from '@/contexts/authContext'
import { TransactionType, WalletType } from '@/types'
import { useEffect, useState } from 'react'
import { colors, spacingX, spacingY } from '@/styles/themes'
import { horizontalScale, verticalScale } from '@/utils/style'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { createUpdateWallet, deleteWallet } from '@/services/walletService'
import { Alert, ScrollView, StyleSheet, View } from 'react-native'

import Input from '@/components/Input'
import Header from '@/components/Header'
import Button from '@/components/Button'
import BackButton from '@/components/BackButton'
import CustomText from '@/components/CustomText'
import ImageUpload from '@/components/ImageUpload'
import ModalWrapper from '@/components/ModalWrapper'

const TransactionModal = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [transaction, setTransaction] = useState<TransactionType>({
        walletId: '',
        type: 'expense',
        amount: 0,
        description: '',
        category: '',
        date: new Date(),
        image: null
    })

    const { user, updateUserData } = useAuth()
    const router = useRouter()
    const params = useLocalSearchParams();

    const onPreviewTransaction = {
        id: params.id as string,
        name: params.name as string,
        image: typeof params.image === "string" ? JSON.parse(params.image) : null
    }

    const onSubmit = async() =>{
        // let { name, image } = transaction
        // if(!name.trim() || !image){
        //     return Alert.alert("transaction", "Please fill all the fields...!")
        // }
        // const walletData: WalletType = {
        //     name,
        //     image,
        //     uid: user?.uid
        // }
        // setIsLoading(true)

        // if(onPreviewTransaction?.id) {
        //     walletData.id = onPreviewTransaction?.id
        // }
        // const action = await createUpdateWallet(walletData)
        
        // setIsLoading(false)

        // if(action.success){
        //     router.back()
        // } else {
        //     Alert.alert("Wallet", action.msg)
        // }
    }

    const onDelete = async() =>{
        if(!onPreviewTransaction?.id) return

        setIsLoading(true)
        const action = await deleteWallet(onPreviewTransaction?.id)

        setIsLoading(false)
        if(action.success){
            router.back()
        } else {
            return Alert.alert("Wallet", action.msg)
        }
    }

    const showDeleteAlert = () =>{
        return Alert.alert(
            "Confirm",
            "Are you sure to delete this wallet? \nThis action will remove all transation on this wallet",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                }, {
                    text: "Delete this wallet",
                    onPress: () => onDelete(),
                    style: "destructive"
                }
            ]
        )
    }

    // useEffect(() => {
    //     if(onPreviewTransaction?.id){
    //         setTransaction({
    //             name: onPreviewTransaction?.name,
    //             image: onPreviewTransaction?.image
    //         })
    //     }
    // }, [])

    return (
        <ModalWrapper>
            <View style={styles.container}>
                <Header
                    title={`${onPreviewTransaction?.id ? 'Update' : 'New'} Transaction`}
                    leftIcon={<BackButton/>}
                    style={{marginBottom: spacingY._10}}
                />
                <ScrollView contentContainerStyle={styles.form}>
                    <View style={styles.inputContainer}>
                        <CustomText color={colors.neutral200}>
                            Name
                        </CustomText>
                        <Input
                            onChangeText={(value) => setTransaction({...transaction, name: value})}
                            value={transaction.name}
                            placeholder='Salary'
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <CustomText color={colors.neutral200}>Wallet Icon</CustomText>
                        <ImageUpload
                            file={transaction?.image}
                            onSelect={(file) => setTransaction({...transaction, image: file})}
                            onClear={() => setTransaction({...transaction, image: null})}
                            placeholder='Upload Image'
                        />
                    </View>
                </ScrollView>
            </View>

            <View style={styles.footer}>
            {
                onPreviewTransaction?.id && (
                    <Button
                        onPress={showDeleteAlert}
                        style={styles.deleteButton}
                        variant='delete'
                        isLoading={isLoading}
                    >
                        <Trash2
                            color={colors.white}
                        />
                    </Button>
                )
            }
                <Button
                    onPress={onSubmit}
                    style={{flex: 1}}
                    isLoading={isLoading}
                >
                    <CustomText
                        color={colors.black}
                        fontWeight={'700'}
                    >
                        {`${onPreviewTransaction?.id ? 'Update' : 'Add'} Transaction`}
                    </CustomText>
                </Button>
            </View>
        </ModalWrapper>
    )
}

export default TransactionModal

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'space-between',
        paddingHorizontal: spacingY._20,
    },
    footer:{
        flexDirection: 'row',
        gap: horizontalScale(12),
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: spacingX._20,
        paddingTop: spacingY._15,
        borderTopColor: colors.neutral700,
        marginBottom: spacingY._5,
        borderTopWidth: 1
    },
    form:{
        marginTop: spacingY._15,
        gap: spacingY._30
    },
    avatarContainer:{
        position: 'relative',
        alignSelf: 'center'
    },
    avatar:{
        width: verticalScale(130),
        height: verticalScale(130),
        alignSelf: 'center',
        borderRadius: 200,
        borderWidth: 1,
        borderColor: colors.neutral500
    },
    editIcon:{
        position: 'absolute',
        bottom: spacingY._5,
        right: spacingY._7,
        padding: spacingY._7,
        borderRadius: 100,
        backgroundColor: colors.neutral100,
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 4,
    },
    inputContainer:{
        gap: spacingY._10
    },
    deleteButton:{
        backgroundColor: colors.rose,
        paddingHorizontal: spacingX._15,
    }
})