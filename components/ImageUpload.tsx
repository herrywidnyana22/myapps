import * as ImagePicker from 'expo-image-picker'

import { Image } from 'expo-image'
import { radius } from '@/styles/themes'
import { useTheme } from '@/contexts/themeContext'
import { Upload, X } from 'lucide-react-native'
import { getFilePath } from '@/services/imageService'
import { ImageUploadProps } from '@/types'
import { imageUpdaloadStyle } from '@/styles/styles'
import { View, TouchableOpacity } from 'react-native'
import { horizontalScale, verticalScale } from '@/utils/style'

import CustomText from './CustomText'
import { useState } from 'react'
import Loading from './Loading'

const ImageUpload = ({
    file = null,
    onSelect,
    onClear,
    containerStyle,
    imageStyle,
    placeholder,
    aspectRatio = [4, 3]
}: ImageUploadProps) => {
    const [isLoading, setIsLoading] = useState(false)
    const [ratioWidth, ratioHeight] = aspectRatio
    const selectedAspectRatio = ratioHeight / ratioWidth 
    const maxWidth = horizontalScale(150)
    const maxHeight = verticalScale(150)

    const { colors } = useTheme()
    const styles = imageUpdaloadStyle(colors)

    const onSelectImage = async() =>{
        setIsLoading(true)
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            aspect: aspectRatio,
            quality: 0.5,
        })
        

        if(!result.canceled){
            onSelect(result.assets[0])
        }

        setIsLoading(false)
    }

    return (
        <View>
        {
            !file && (
                <TouchableOpacity 
                    onPress={onSelectImage}
                    style={[styles.inputContainer, containerStyle && containerStyle]}
                >
                {
                    isLoading ? (
                        <Loading size={25} color={colors.primary} />
                    ) : (
                        <>
                            <Upload color={colors.neutral200} />
                            {placeholder && (
                                <CustomText size={15} color={colors.neutral200}>
                                    {placeholder}
                                </CustomText>
                            )}
                        </>
                    )
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
                        style={{
                            flex: 1,
                            width: maxWidth,
                            height: selectedAspectRatio == (3/4) 
                                ? maxHeight 
                                : (maxHeight / selectedAspectRatio),
                            borderRadius: radius._15
                        }}
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

