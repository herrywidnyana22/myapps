import { useTheme } from '@/contexts/themeContext';
import { titleLineStyle } from '@/styles/styles';
import { View, Text } from 'react-native';

const TitleWithLine = ({ title }: { title?: string }) => {
    const { colors } = useTheme()
    const styles = titleLineStyle(colors)

    return (
        <>
            
            {
                title && 
                <>
                    <View style={styles.leftLine} />
                    <Text style={styles.title}>{title}</Text>
                </>
            }
            <View style={styles.rightLine} />
        </>
    )
}

export default TitleWithLine;