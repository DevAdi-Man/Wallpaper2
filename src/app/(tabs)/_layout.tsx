import { CustomeTabBar } from "@/src/components/customeTabsBar";
import { Tabs } from "expo-router";

export default function BottomTabsLayout() {
    return (
        <Tabs screenOptions={{ headerShown: false }} tabBar={(prop) => <CustomeTabBar {...prop} />} >
            <Tabs.Screen name="index" options={{title:'Home'}}/>
            <Tabs.Screen name="profile" options={{title:'Profile'}}/>
            <Tabs.Screen name="favorites" options={{title:'Favorites'}}/>
            <Tabs.Screen name="categories" options={{title:'Categories'}}/>
        </Tabs>
    );
};
