import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BusinessScreen from "./screens/BusinessScreen";
import BusinessDetailScreen from "./screens/BusinessDetailScreen";

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Business">
                <Stack.Screen name="Business" component={BusinessScreen}/>
                <Stack.Screen name="BusinessDetail" component={BusinessDetailScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}