import { Link, Stack } from 'expo-router';
import { SafeAreaView, StyleSheet, Text } from 'react-native';

export default function NotFoundScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ title: 'Page not found' }} />
      <Text style={styles.title}>This screen does not exist.</Text>
      <Link href="/" style={styles.link}>Return to the Home screen</Link>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', backgroundColor: '#F8FAFC', flex: 1, justifyContent: 'center', padding: 24 },
  title: { color: '#172554', fontSize: 22, fontWeight: '800' },
  link: { color: '#2563EB', fontSize: 16, fontWeight: '700', marginTop: 18 },
});
