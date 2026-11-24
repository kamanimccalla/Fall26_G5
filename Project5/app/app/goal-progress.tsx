import { router, useLocalSearchParams } from 'expo-router';
import { Alert, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';

export default function GoalProgressScreen() {
  const params = useLocalSearchParams<{ course?: string; target?: string; deadline?: string }>();
  const course = params.course || 'Mathematics'; const target = params.target || '5'; const deadline = params.deadline || 'November 30';
  const completed = params.course ? 0 : 2; const percent = Math.min(100, Math.round((completed / Number(target || 1)) * 100));
  return <SafeAreaView style={styles.screen}><View style={styles.container}>
    <Text style={styles.eyebrow}>GOAL PROGRESS</Text><Text style={styles.course}>{course}</Text><Text style={styles.deadline}>Finish by {deadline}</Text>
    <View style={styles.progressCard}>
      <Text style={styles.percent}>{percent}%</Text><Text style={styles.complete}>complete</Text>
      <View style={styles.track}><View style={[styles.fill, { width: `${percent}%` }]} /></View>
      <View style={styles.stats}><View><Text style={styles.statNumber}>{completed}</Text><Text style={styles.statLabel}>hours completed</Text></View>
        <View style={styles.rightStat}><Text style={styles.statNumber}>{target}</Text><Text style={styles.statLabel}>target hours</Text></View></View>
    </View>
    <Pressable accessibilityRole="button" onPress={() => Alert.alert('Study session', 'Session logging will be connected to the shared database in the next sprint.')} style={({ pressed }) => [styles.primaryButton, pressed && styles.pressed]}><Text style={styles.primaryText}>Log Study Session</Text></Pressable>
    <Pressable accessibilityRole="button" onPress={() => router.replace('/')} style={({ pressed }) => [styles.secondaryButton, pressed && styles.pressed]}><Text style={styles.secondaryText}>Return Home</Text></Pressable>
  </View></SafeAreaView>;
}

const styles = StyleSheet.create({
  screen: { backgroundColor: '#EFF6FF', flex: 1 }, container: { padding: 24 }, eyebrow: { color: '#2563EB', fontSize: 13, fontWeight: '800', letterSpacing: 1.2, marginTop: 18 },
  course: { color: '#172554', fontSize: 32, fontWeight: '800', marginTop: 8 }, deadline: { color: '#64748B', fontSize: 16, marginTop: 6 },
  progressCard: { alignItems: 'center', backgroundColor: '#FFFFFF', borderRadius: 22, marginTop: 30, padding: 26 }, percent: { color: '#2563EB', fontSize: 48, fontWeight: '800' },
  complete: { color: '#64748B', fontSize: 15, marginTop: -3 }, track: { backgroundColor: '#E2E8F0', borderRadius: 8, height: 12, marginTop: 24, overflow: 'hidden', width: '100%' },
  fill: { backgroundColor: '#16A34A', borderRadius: 8, height: 12 }, stats: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 24, width: '100%' }, rightStat: { alignItems: 'flex-end' },
  statNumber: { color: '#172554', fontSize: 26, fontWeight: '800' }, statLabel: { color: '#64748B', fontSize: 12, marginTop: 3 }, primaryButton: { alignItems: 'center', backgroundColor: '#2563EB', borderRadius: 14, marginTop: 24, paddingVertical: 17 },
  primaryText: { color: '#FFFFFF', fontSize: 17, fontWeight: '800' }, secondaryButton: { alignItems: 'center', borderColor: '#2563EB', borderRadius: 14, borderWidth: 1.5, marginTop: 12, paddingVertical: 15 },
  secondaryText: { color: '#2563EB', fontSize: 16, fontWeight: '800' }, pressed: { opacity: 0.7 },
});
