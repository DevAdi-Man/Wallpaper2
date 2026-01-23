import SafeAreaView from "@/src/components/safeAreaView";
import { Space } from "@/src/components/space";
import { ThemeIcons } from "@/src/components/themeIcons";
import { ThemeText } from "@/src/components/themeText";
import { CategoryItem, getSubcategoriesByParent } from "@/src/services/categoryServices";
import { AntDesign } from "@expo/vector-icons";
import { FlashList } from "@shopify/flash-list";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useEffect, useState, } from "react";
import { ActivityIndicator, Image, Pressable, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";

export default function CategoryParentScreen() {
    const { id, name } = useLocalSearchParams();
    const router = useRouter();
    const [subCategory, setSubCategory] = useState<CategoryItem[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const parentId = Array.isArray(id) ? id[0] : id;

    useEffect(() => {
        loadData()
    }, [parentId]);

    const loadData = async () => {
        try {
            const data = await getSubcategoriesByParent(parentId);
            setSubCategory(data)
        } catch (error) {
            console.error("This error in CategoryParentScreen", id);
            throw error
        } finally {
            setIsLoading(false)
        }
    }
    const renderItem = useCallback(({ item }: { item: CategoryItem }) => (
        <Pressable
            onPress={() => {
                router.push({
                    pathname: '/collection/[id]',
                    params: { id: item.id, name: item.name }
                })
            }}
            style={styles.cardContainer}
        >
            <View style={styles.imageWrapper}>
                <Image
                    source={{ uri: item.thumbnail }}
                    style={styles.image}
                    resizeMode="cover"
                />
            </View>
            <ThemeText variant="caption" style={styles.caption}>{item.name}</ThemeText>
        </Pressable>
    ), [router]);
    const keyExtractor = useCallback((item: CategoryItem) => item.id.toString(), []);

    if (isLoading) {
        return (
            <View style={styles.loader}>
                <ActivityIndicator size="large" style={{ marginTop: 50 }} />
            </View>
        )
    }
    return (
        <SafeAreaView>
            <View style={styles.headerContainer}>
                <Pressable onPress={() => router.back()} style={styles.backButton}>
                    <ThemeIcons IconsName={AntDesign} name="arrow-left" size={24} />
                </Pressable>
                <ThemeText variant="title" style={styles.title}>{name}</ThemeText>
            </View>
            <Space height={8} />
            <FlashList
                data={subCategory}
                numColumns={3}
                contentContainerStyle={styles.listContent}
                keyExtractor={keyExtractor}
                renderItem={renderItem}
            />
        </SafeAreaView>
    )
}
const styles = StyleSheet.create((theme) => ({
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        gap: 24
    },
    backButton: {
        padding: 4,
    },
    title: {
        flex: 1,
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.colors.background
    },
    listContent: {
        paddingHorizontal: 8,
        paddingBottom: 20
    },
    cardContainer: {
        flex: 1,
        margin: 6,
        alignItems: 'center'
    },
    imageWrapper: {
        width: '100%',
        aspectRatio: 1,
        borderRadius: 12,
        overflow: 'hidden',
        marginBottom: 6,
        backgroundColor: theme.colors.card
    },
    image: {
        width: '100%',
        height: '100%',
    },
    caption: {
        textAlign: 'center'
    }
}))
