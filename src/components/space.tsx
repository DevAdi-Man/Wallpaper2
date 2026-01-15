import { View } from "react-native"

type SpaceProps = {
    height?:number
    width?:number
}

export const Space: React.FC<SpaceProps> = ({
    height,
    width
}) => {
    return (
        <View style={{
            height,
            width
        }} />
    )
}
