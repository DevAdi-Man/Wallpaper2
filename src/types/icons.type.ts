import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Feather from '@expo/vector-icons/Feather';
import Entypo from '@expo/vector-icons/Entypo';
import Fontisto from '@expo/vector-icons/Fontisto';
import Octicons from '@expo/vector-icons/Octicons';
import { AntDesign } from "@expo/vector-icons";

type FontistoType = keyof typeof Fontisto.glyphMap;
type IoniconsType = keyof typeof Ionicons.glyphMap;
type FontAwesomeType = keyof typeof FontAwesome.glyphMap;
type MaterialCommunityIconsType = keyof typeof MaterialCommunityIcons.glyphMap
type FontAwesome6Type = keyof typeof FontAwesome6.glyphMap;
type MaterialIconsType = keyof typeof MaterialIcons.glyphMap;
type EntypoType = keyof typeof Entypo.glyphMap;
type FeatherType = keyof typeof Feather.glyphMap;
type OcticonsType = keyof typeof Octicons.glyphMap
type AntDesignType = keyof typeof AntDesign.glyphMap
export type IconComponent =
    | typeof Ionicons
    | typeof FontAwesome
    | typeof MaterialCommunityIcons
    | typeof FontAwesome6
    | typeof MaterialIcons
    | typeof Entypo
    | typeof Feather
    | typeof Fontisto
    | typeof Octicons
    | typeof AntDesign
    ;

export type AllIcons = AntDesignType | IoniconsType | FontAwesomeType | OcticonsType | FontistoType | FontAwesome6Type | MaterialIconsType | MaterialCommunityIconsType | EntypoType | FeatherType;

