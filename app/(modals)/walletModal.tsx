import { Trash2 } from 'lucide-react-native'
import { useAuth } from '@/contexts/authContext'
import { spacingY } from '@/styles/themes'
import { WalletType } from '@/types'
import { useEffect, useState } from 'react'
import { Alert, ScrollView, View } from 'react-native'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { createUpdateWallet, deleteWallet } from '@/services/walletService'

import Input from '@/components/Input'
import Header from '@/components/Header'
import Button from '@/components/Button'
import BackButton from '@/components/BackButton'
import CustomText from '@/components/CustomText'
import ImageUpload from '@/components/ImageUpload'
import ModalWrapper from '@/components/ModalWrapper'
import { useTheme } from '@/contexts/themeContext'
import { walletModalStyle } from '@/styles/modals/modalStyles'

const WalletModal = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [wallet, setWallet] = useState<WalletType>({
        name: "",
        image: null
    })

    const { user } = useAuth()
    const router = useRouter()
    const params = useLocalSearchParams()

    const { colors } = useTheme()
    const styles = walletModalStyle(colors)

    const selectedWallet = {
        id: params.id as string,
        name: params.name as string,
        image: typeof params.image === "string" ? JSON.parse(params.image) : null
    }

    const onSubmit = async() =>{
        let { name, image } = wallet
        if(!name.trim() || !image){
            return Alert.alert("Wallet", "Please fill all the fields...!")
        }
        const walletData: WalletType = {
            name,
            image,
            uid: user?.uid
        }
        setIsLoading(true)

        if(selectedWallet?.id) {
            walletData.id = selectedWallet?.id
        }
        const action = await createUpdateWallet(walletData)
        
        setIsLoading(false)

        if(action.success){
            router.back()
        } else {
            Alert.alert("Wallet", action.msg)
        }
    }

    const onDelete = async() =>{
        if(!selectedWallet?.id) return

        setIsLoading(true)
        const action = await deleteWallet(selectedWallet?.id)

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

    useEffect(() => {
        if(selectedWallet?.id){
            setWallet({
                name: selectedWallet?.name,
                image: selectedWallet?.image
            })
        }
    }, [])

    return (
        <ModalWrapper>
            <View style={styles.container}>
                <Header
                    title={`${selectedWallet?.id ? 'Update' : 'New'} Wallet`}
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
                            file={wallet?.image}
                            onSelect={(file) => setWallet({...wallet, image: file})}
                            onClear={() => setWallet({...wallet, image: null})}
                            placeholder='Upload Image'
                        />
                    </View>
                </ScrollView>
            </View>

            <View style={styles.footer}>
            {
                selectedWallet?.id && (
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
                        {`${selectedWallet?.id ? 'Update' : 'Add'} Wallet`}
                    </CustomText>
                </Button>
            </View>
        </ModalWrapper>
    )
}

export default WalletModal