import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name="index" options={{ title: "Index" }} />
      <Stack.Screen name="MapScreen" options={{ title: "Map" }} />
    </Stack>
  );
}