
import { Image } from 'expo-image'
import { Pencil } from 'lucide-react-native'
import { useAuth } from '@/contexts/authContext'
import { spacingY } from '@/styles/themes'
import { useTheme } from '@/contexts/themeContext'
import { getAvatar } from '@/services/imageService'
import { useRouter } from 'expo-router'
import { updateUser } from '@/services/userService'
import { UserDataType } from '@/types'
import { verticalScale } from '@/utils/style'
import { profileModalStyle } from '@/styles/modals/modalStyles'
import { useEffect, useState } from 'react'
import { Alert, ScrollView, TouchableOpacity, View } from 'react-native'

import * as ImagePicker from 'expo-image-picker'

import Input from '@/components/Input'
import Header from '@/components/Header'
import Button from '@/components/Button'
import CustomText from '@/components/CustomText'
import BackButton from '@/components/BackButton'
import ModalWrapper from '@/components/ModalWrapper'

const ProfileModal = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [userData, setUserData] = useState<UserDataType>({
        name: "",
        image: null
    })

    const { user, updateUserData } = useAuth()
    const router = useRouter()

    const { colors } = useTheme()
    const styles = profileModalStyle(colors)

    useEffect(() =>{
        setUserData({
            name: user?.name || "",
            image: user?.image || null
        })
    }, [user])

    const onSubmit = async() =>{
        let { name, image } = userData
        if(!name.trim()){
            return Alert.alert("User", "Please fill all the fields...!")
        }

        setIsLoading(true)
        const action = await updateUser(user?.uid as string, userData)
        setIsLoading(false)

        if(action.success){
            updateUserData(user?.uid as string)
            router.back()
        } else {
            Alert.alert("User", action.msg)
        }
    }

    const onSelectImage = async() =>{
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            aspect: [4, 3],
            quality: 0.5
        })

        if(!result.canceled){
            setUserData({...userData, image: result.assets[0]})
        }
    }

    return (
        <ModalWrapper>
            <View style={styles.container}>
                <Header
                    title='Update Profile'
                    leftIcon={<BackButton/>}
                    style={{marginBottom: spacingY._10}}
                />
                <ScrollView contentContainerStyle={styles.form}>
                    <View style={styles.avatarContainer}>
                        <Image
                            source={getAvatar(userData.image)}
                            contentFit='cover'
                            transition={100}
                            style={styles.avatar}
                        />

                        <TouchableOpacity 
                            onPress={onSelectImage}
                            style={styles.editIcon}
                        >
                            <Pencil
                                size={verticalScale(20)}
                                color={colors.neutral800}
                            />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.inputContainer}>
                        <CustomText color={colors.neutral200}>
                            Name
                        </CustomText>
                        <Input
                            onChangeText={(value) => setUserData({...userData, name: value})}
                            value={userData.name}
                            placeholder='Name'
                        />
                    </View>
                </ScrollView>
            </View>

            <View style={styles.footer}>
                <Button
                    onPress={onSubmit}
                    style={{flex: 1}}
                    isLoading={isLoading}
                >
                    <CustomText
                        color={colors.black}
                        fontWeight={'700'}
                    >
                        Update
                    </CustomText>
                </Button>
            </View>
        </ModalWrapper>
    )
}

export default ProfileModal