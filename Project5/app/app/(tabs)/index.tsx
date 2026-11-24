import { router } from 'expo-router';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

const colors = { navy: '#172554', blue: '#2563EB', green: '#16A34A', gray: '#64748B', white: '#FFFFFF' };

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.eyebrow}>STUDY HABIT TRACKER</Text>
        <Text style={styles.heading}>Build a better study routine.</Text>
        <Text style={styles.subheading}>Set a goal for each course, record your study time, and see how close you are to finishing.</Text>

        <View style={styles.summaryCard}>
          <View><Text style={styles.cardLabel}>WEEKLY TARGET</Text><Text style={styles.cardValue}>5 hours</Text></View>
          <View style={styles.progressBadge}><Text style={styles.progressNumber}>40%</Text><Text style={styles.progressText}>complete</Text></View>
        </View>

        <Text style={styles.sectionTitle}>Current goal</Text>
        <View style={styles.goalCard}>
          <View style={styles.goalHeader}>
            <View><Text style={styles.course}>Mathematics</Text><Text style={styles.deadline}>Deadline: November 30</Text></View>
            <Text style={styles.activeBadge}>ACTIVE</Text>
          </View>
          <View style={styles.track}><View style={styles.fill} /></View>
          <Text style={styles.hours}>2 of 5 hours completed</Text>
          <Pressable accessibilityRole="button" onPress={() => router.push('/goal-progress')} style={({ pressed }) => [styles.secondaryButton, pressed && styles.pressed]}>
            <Text style={styles.secondaryButtonText}>View Goal Progress</Text>
          </Pressable>
        </View>

        <Pressable accessibilityRole="button" onPress={() => router.push('/create-goal')} style={({ pressed }) => [styles.primaryButton, pressed && styles.pressed]}>
          <Text style={styles.primaryButtonText}>+ Create Goal</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F8FAFC' }, container: { padding: 24, paddingBottom: 48 },
  eyebrow: { color: colors.blue, fontSize: 13, fontWeight: '800', letterSpacing: 1.4, marginTop: 12 },
  heading: { color: colors.navy, fontSize: 34, fontWeight: '800', lineHeight: 40, marginTop: 10 },
  subheading: { color: colors.gray, fontSize: 16, lineHeight: 24, marginTop: 12 },
  summaryCard: { alignItems: 'center', backgroundColor: colors.navy, borderRadius: 20, flexDirection: 'row', justifyContent: 'space-between', marginTop: 28, padding: 22 },
  cardLabel: { color: '#BFDBFE', fontSize: 12, fontWeight: '700', letterSpacing: 1 }, cardValue: { color: colors.white, fontSize: 27, fontWeight: '800', marginTop: 5 },
  progressBadge: { alignItems: 'center', backgroundColor: '#1E3A8A', borderRadius: 50, height: 80, justifyContent: 'center', width: 80 },
  progressNumber: { color: colors.white, fontSize: 20, fontWeight: '800' }, progressText: { color: '#BFDBFE', fontSize: 11 },
  sectionTitle: { color: colors.navy, fontSize: 20, fontWeight: '800', marginBottom: 12, marginTop: 28 },
  goalCard: { backgroundColor: colors.white, borderColor: '#E2E8F0', borderRadius: 18, borderWidth: 1, padding: 20 },
  goalHeader: { flexDirection: 'row', justifyContent: 'space-between' }, course: { color: colors.navy, fontSize: 20, fontWeight: '800' }, deadline: { color: colors.gray, fontSize: 14, marginTop: 4 },
  activeBadge: { alignSelf: 'flex-start', backgroundColor: '#DCFCE7', borderRadius: 12, color: colors.green, fontSize: 11, fontWeight: '800', overflow: 'hidden', paddingHorizontal: 10, paddingVertical: 5 },
  track: { backgroundColor: '#E2E8F0', borderRadius: 8, height: 10, marginTop: 22, overflow: 'hidden' }, fill: { backgroundColor: colors.green, borderRadius: 8, height: 10, width: '40%' },
  hours: { color: colors.gray, fontSize: 13, marginTop: 8 }, primaryButton: { alignItems: 'center', backgroundColor: colors.blue, borderRadius: 14, marginTop: 20, paddingVertical: 17 },
  primaryButtonText: { color: colors.white, fontSize: 17, fontWeight: '800' }, secondaryButton: { alignItems: 'center', borderColor: colors.blue, borderRadius: 12, borderWidth: 1.5, marginTop: 20, paddingVertical: 13 },
  secondaryButtonText: { color: colors.blue, fontSize: 15, fontWeight: '700' }, pressed: { opacity: 0.7 },
});
