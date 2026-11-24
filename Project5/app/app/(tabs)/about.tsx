import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

export default function AboutScreen() {
  return <SafeAreaView style={styles.screen}><View style={styles.card}>
    <Text style={styles.title}>About the App</Text>
    <Text style={styles.body}>Study Habit Tracker helps college students create course goals, record completed study time, and check their progress before a deadline.</Text>
    <Text style={styles.label}>Project 5 contribution</Text><Text style={styles.name}>Kamani Mccalla — Goal Setting</Text>
  </View></SafeAreaView>;
}

const styles = StyleSheet.create({
  screen: { backgroundColor: '#F8FAFC', flex: 1, padding: 24 }, card: { backgroundColor: '#FFFFFF', borderRadius: 18, marginTop: 24, padding: 24 },
  title: { color: '#172554', fontSize: 28, fontWeight: '800' }, body: { color: '#475569', fontSize: 16, lineHeight: 25, marginTop: 14 },
  label: { color: '#2563EB', fontSize: 13, fontWeight: '800', letterSpacing: 1, marginTop: 28, textTransform: 'uppercase' }, name: { color: '#172554', fontSize: 17, fontWeight: '700', marginTop: 8 },
});
