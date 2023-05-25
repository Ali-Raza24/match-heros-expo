import { ActivityIndicator, View } from "react-native"

export const Loader = ({ loading }) => {
    return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size={50} color="#2b87ff"
            animating={loading} />
    </View>
}