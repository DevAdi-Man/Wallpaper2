import SafeAreaView from "@/src/components/safeAreaView"
import { ThemeText } from "@/src/components/themeText"
import { Space } from "@/src/components/space"
import { ManshonGrid } from "./components/manshonGrid"
import { useAuth } from "@/src/context/AuthContext"
import { useEffect } from "react"
import { useFavourites } from "../favorites/store/favourites"

export const Home = () => {
    const {user} = useAuth();
    const setUserId = useFavourites(state=> state.setUserId)
    const fetchFavoritet = useFavourites(state=>state.fetchFavorites)
    useEffect(()=>{
        if(user && user.$id){
            console.log("✅ Syncing User to Store:", user.$id);
            setUserId(user.$id);
            fetchFavoritet();
        }
    },[user])
    return (
        <SafeAreaView>
            <ThemeText variant="title" style={{ paddingHorizontal: 8 }}>Pixory</ThemeText>
            <Space height={16} />
            <ManshonGrid />
        </SafeAreaView>
    )
}
