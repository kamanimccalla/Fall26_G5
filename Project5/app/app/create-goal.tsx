import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput } from 'react-native';

export default function CreateGoalScreen() {
  const [course, setCourse] = useState(''); const [hours, setHours] = useState(''); const [deadline, setDeadline] = useState('');
  const saveGoal = () => {
    const target = Number(hours);
    if (!course.trim() || !Number.isFinite(target) || target <= 0 || !deadline.trim()) {
      Alert.alert('Check your goal', 'Enter a course, a target greater than zero, and a deadline.'); return;
    }
    router.replace({ pathname: '/goal-progress', params: { course: course.trim(), target: String(target), deadline: deadline.trim() } });
  };
  return <SafeAreaView style={styles.safeArea}><KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.flex}>
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <Text style={styles.heading}>Create a study goal</Text><Text style={styles.intro}>Choose a course, study-hour target, and deadline.</Text>
      <Text style={styles.label}>Course name</Text><TextInput accessibilityLabel="Course name" onChangeText={setCourse} placeholder="Example: Biology" style={styles.input} value={course} />
      <Text style={styles.label}>Target study hours</Text><TextInput accessibilityLabel="Target study hours" keyboardType="decimal-pad" onChangeText={setHours} placeholder="Example: 5" style={styles.input} value={hours} />
      <Text style={styles.label}>Deadline</Text><TextInput accessibilityLabel="Deadline" onChangeText={setDeadline} placeholder="Example: December 10" style={styles.input} value={deadline} />
      <Pressable accessibilityRole="button" onPress={saveGoal} style={({ pressed }) => [styles.saveButton, pressed && styles.pressed]}><Text style={styles.saveText}>Save Goal</Text></Pressable>
      <Pressable accessibilityRole="button" onPress={() => router.back()} style={({ pressed }) => [styles.cancelButton, pressed && styles.pressed]}><Text style={styles.cancelText}>Cancel</Text></Pressable>
    </ScrollView>
  </KeyboardAvoidingView></SafeAreaView>;
}

const styles = StyleSheet.create({
  flex: { flex: 1 }, safeArea: { backgroundColor: '#F8FAFC', flex: 1 }, container: { padding: 24 }, heading: { color: '#172554', fontSize: 30, fontWeight: '800', marginTop: 12 },
  intro: { color: '#64748B', fontSize: 16, lineHeight: 24, marginBottom: 18, marginTop: 8 }, label: { color: '#334155', fontSize: 14, fontWeight: '700', marginBottom: 8, marginTop: 18 },
  input: { backgroundColor: '#FFFFFF', borderColor: '#CBD5E1', borderRadius: 12, borderWidth: 1, color: '#172554', fontSize: 16, paddingHorizontal: 16, paddingVertical: 15 },
  saveButton: { alignItems: 'center', backgroundColor: '#2563EB', borderRadius: 14, marginTop: 30, paddingVertical: 17 }, saveText: { color: '#FFFFFF', fontSize: 17, fontWeight: '800' },
  cancelButton: { alignItems: 'center', marginTop: 12, paddingVertical: 14 }, cancelText: { color: '#64748B', fontSize: 16, fontWeight: '700' }, pressed: { opacity: 0.7 },
});
