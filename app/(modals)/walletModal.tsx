import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { colors, spacingX, spacingY } from '@/constants/themes'
import { horizontalScale, verticalScale } from '@/utils/style'
import ModalWrapper from '@/components/ModalWrapper'
import Header from '@/components/Header'
import BackButton from '@/components/BackButton'
import CustomText from '@/components/CustomText'
import Input from '@/components/Input'
import Button from '@/components/Button'
import { useAuth } from '@/contexts/authContext'
import { updateUser } from '@/services/userService'
import { useRouter } from 'expo-router'
import ImageUpload from '@/components/ImageUpload'
import { useState } from 'react'
import { WalletType } from '@/types'

const WalletModal = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [wallet, setWallet] = useState<WalletType>({
        name: "",
        image: null
    })

    const { user, updateUserData } = useAuth()
    const router = useRouter()

    const onSubmit = async() =>{
        let { name, image } = wallet
        if(!name.trim() || !image){
            return Alert.alert("User", "Please fill all the fields...!")
        }

        setIsLoading(true)
        const action = await updateUser(user?.uid as string, wallet)
        setIsLoading(false)

        if(action.success){
            updateUserData(user?.uid as string)
            router.back()
        } else {
            Alert.alert("User", action.msg)
        }
    }

    return (
        <ModalWrapper>
            <View style={styles.container}>
                <Header
                    title='New Wallet'
                    leftIcon={<BackButton/>}
                    style={{marginBottom: spacingY._10}}
                />
                <ScrollView contentContainerStyle={styles.form}>
                    <View style={styles.inputContainer}>
                        <CustomText color={colors.neutral200}>
                            Name
                        </CustomText>
                        <Input
                            onChangeText={(value) => setWallet({...wallet, name: value})}
                            value={wallet.name}
                            placeholder='Salary'
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <CustomText color={colors.neutral200}>Wallet Icon</CustomText>
                        <ImageUpload
                            file={wallet.image}
                            onSelect={(file) => setWallet({...wallet, image: file})}
                            onClear={() => setWallet({...wallet, image: null})}
                            placeholder='Upload Image'
                        />
                    </View>
                </ScrollView>
            </View>

            <View style={styles.footer}>
                <Button
                    onPress={onSubmit}
                    style={{flex: 1}}
                    loading={isLoading}
                >
                    <CustomText
                        color={colors.black}
                        fontWeight={'700'}
                    >
                        Add Wallet
                    </CustomText>
                </Button>
            </View>
        </ModalWrapper>
    )
}

export default WalletModal

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
    }
})