import { ThemeIcons } from "@/src/components/themeIcons"
import { ThemeText } from "@/src/components/themeText"
import { AntDesign } from "@expo/vector-icons"
import { FlashList } from "@shopify/flash-list"
import { Pressable, View } from "react-native"
import { StyleSheet } from "react-native-unistyles"
import { Image } from 'expo-image';
import { useRouter } from "expo-router"
import { CategoryGroup } from "@/src/services/categoryServices"
interface CategorySectionProps extends CategoryGroup {
    onPress?: () => void
}

export const CategorySection: React.FC<CategorySectionProps> = ({ groupName, onPress, items }) => {
    const router = useRouter()
    return (
        <View>
            <View style={styles.headerContainer}>
                <ThemeText variant="body" style={styles.groupNameText}>{groupName}</ThemeText>
                <Pressable onPress={onPress} style={styles.headerPressable} >
                    <ThemeText variant="caption" style={styles.moreText}>More</ThemeText>
                    <ThemeIcons IconsName={AntDesign} name={"right"} size={18} />
                </Pressable>
            </View>
            <FlashList
                data={items}
                numColumns={3}
                renderItem={({ item }) => (
                    <Pressable onPress={() => {
                        router.push({
                            pathname: '/collection/[id]',
                            params: {
                                id: item.id,
                                name: item.name
                            }
                        })
                    }} style={styles.gridItem}>
                        <View style={styles.imageContainer}>
                            <Image
                                source={{ uri: item.thumbnail }}
                                style={styles.image}
                                contentFit="cover"
                            />
                        </View>
                        <ThemeText style={styles.captionName} variant="caption" >
                            {item.name}
                        </ThemeText>
                    </Pressable>
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create((theme, rt) => ({
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 4
    },
    headerPressable: {
        flexDirection: 'row',
        gap: 4,
        alignItems: 'center'
    },
    groupNameText: {
        fontSize: rt.fontScale * 24
    },
    moreText: {
        fontSize: rt.fontScale * 16
    },
    gridItem: {
        width: rt.screen.width / 3,
        height: rt.screen.width / 2,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 4
    },
    imageContainer: {
        width: '80%',
        height: '80%',
        borderRadius: 12,
        overflow: 'hidden',
        marginBottom: 8,
        backgroundColor: theme.colors.card,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    captionName: {
        fontSize: rt.fontScale * 15
    }
}))
