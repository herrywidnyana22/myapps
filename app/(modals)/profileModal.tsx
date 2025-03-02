import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { colors, spacingX, spacingY } from '@/constants/themes'
import { horizontalScale, verticalScale } from '@/utils/style'
import ModalWrapper from '@/components/ModalWrapper'
import Header from '@/components/Header'
import BackButton from '@/components/BackButton'
import { Image } from 'expo-image'
import { getAvatar } from '@/services/imageService'
import { Pencil } from 'lucide-react-native'
import CustomText from '@/components/CustomText'
import Input from '@/components/Input'
import { useEffect, useState } from 'react'
import { UserDataType } from '@/types'
import Button from '@/components/Button'
import { useAuth } from '@/contexts/authContext'

const ProfileModal = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [userData, setUserData] = useState<UserDataType>({
        name: "",
        image: null
    })

    const { user } = useAuth()

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

                        <TouchableOpacity style={styles.editIcon}>
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
        marginTop: spacingY._15
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