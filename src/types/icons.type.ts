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

type Fontisto = keyof typeof Fontisto.glyphMap;
type Ionicons = keyof typeof Ionicons.glyphMap;
type FontAwesome = keyof typeof FontAwesome.glyphMap;
type MaterialCommunityIcons = keyof typeof MaterialCommunityIcons.glyphMap
type FontAwesome6 = keyof typeof FontAwesome6.glyphMap;
type MaterialIcons = keyof typeof MaterialIcons.glyphMap;
type Entypo = keyof typeof Entypo.glyphMap;
type Feather = keyof typeof Feather.glyphMap;
type Octicons = keyof typeof Octicons.glyphMap
type AntDesign = keyof typeof AntDesign.glyphMap
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

export type AllIcons = AntDesign | Ionicons | FontAwesome | Octicons | Fontisto | FontAwesome6 | MaterialIcons | MaterialCommunityIcons | Entypo | Feather;

