import { StyleProp } from "react-native";
import { AllIcons, IconComponent } from "../types/icons.type";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useUnistyles } from "react-native-unistyles";
type SpecificIconProps = React.ComponentProps<typeof Ionicons>;
export interface ThemeIconsProp {
    IconsName: IconComponent
    name: AllIcons
    size?: number
    style?: StyleProp<SpecificIconProps['style']>
    color?: string
}

export const ThemeIcons: React.FC<ThemeIconsProp> = ({ IconsName, name, size, style,color }) => {
    const { theme } = useUnistyles();
    return (<IconsName name={name} size={size} color={color || theme.colors.primary} style={[style]} />);
}

