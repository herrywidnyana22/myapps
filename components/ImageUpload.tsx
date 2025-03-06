import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { ImageUploadProps } from '@/types'
import { Upload, X, XCircle } from 'lucide-react-native'
import { colors, radius } from '@/constants/themes'
import CustomText from './CustomText'
import { horizontalScale, verticalScale } from '@/utils/style'
import { Image } from 'expo-image'
import { getFilePath } from '@/services/imageService'
import * as ImagePicker from 'expo-image-picker'

const ImageUpload = ({
    file = null,
    onSelect,
    onClear,
    containerStyle,
    imageStyle,
    placeholder
}: ImageUploadProps) => {

    const onSelectImage = async() =>{
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            aspect: [4, 3],
            quality: 0.5,
            allowsEditing: true
        })

        if(!result.canceled){
            onSelect(result.assets[0])
        }
    }

    return (
        <View>
        {
            !file && (
                <TouchableOpacity 
                    onPress={onSelectImage}
                    style={[styles.inputContainer, containerStyle && containerStyle]}
                >
                    <Upload color={colors.neutral200}/>
                    {
                        placeholder && 
                        <CustomText size={15}>{ placeholder }</CustomText>
                    }
                </TouchableOpacity>
            )
        }
        {
            file && (
                <View style={[styles.image, imageStyle && imageStyle]}>
                    <Image
                        source={getFilePath(file)}
                        contentFit='cover'
                        transition={100}
                        style={{flex: 1}}
                    />
                    <TouchableOpacity
                        onPress={onClear}
                        style={styles.deleteIcon}
                    >
                        <X 
                            size={20}
                            color={colors.rose}
                        />
                    </TouchableOpacity>
                </View>
            )
        }
        
        </View>
    )
}

export default ImageUpload

const styles = StyleSheet.create({
    inputContainer:{
        height: verticalScale(52),
        backgroundColor: colors.neutral700,
        borderRadius: radius._15,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
        borderWidth: 1,
        borderColor: colors.neutral500,
        borderStyle: 'dashed'
    },
    image:{
        height: horizontalScale(150),
        width: horizontalScale(150),
        borderRadius: radius._15,
        borderCurve: 'continuous',
        overflow: 'hidden'
    },
    deleteIcon:{
        position: 'absolute',
        top: horizontalScale(6),
        right: horizontalScale(6),
        shadowColor: colors.black,
        shadowOffset: {width: 0, height: 5},
        shadowOpacity: 1,
        shadowRadius: 10,
        borderRadius: '50%',
        backgroundColor: colors.neutral100,
        padding: 4
    }
})

