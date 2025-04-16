import { useAuth } from '../../contexts/authContext';
import { View, Text, StyleSheet, FlatList, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const mockOperations = [
  { id: '1', title: 'Auto-clean completed', time: '2025-04-13 10:45' },
  { id: '2', title: 'Manual clean started', time: '2025-04-12 14:20' },
  { id: '3', title: 'System restarted', time: '2025-04-12 09:00' },
];

export default function Home() {
  const { user } = useAuth();
  const screenWidth = Dimensions.get('window').width;

  const chartData = {
    labels: ['10s', '20s', '30s', '40s', '50s', '60s'],
    datasets: [{ data: [1200, 1250, 1230, 1270, 1260, 1240] }],
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, {user?.email?.split('@')[0]}</Text>

      <Text style={styles.sectionTitle}>Machine RPM vs Time</Text>
      <LineChart
        data={chartData}
        width={screenWidth - 32}
        height={220}
        yAxisSuffix=" RPM"
        chartConfig={{
          backgroundColor: '#fff',
          backgroundGradientFrom: '#f5f5f5',
          backgroundGradientTo: '#f5f5f5',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(46, 134, 222, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: { borderRadius: 8 },
          propsForDots: { r: '4', strokeWidth: '2', stroke: '#2E86DE' },
        }}
        style={{ borderRadius: 8, marginVertical: 10 }}
      />

      <Text style={styles.sectionTitle}>Past Operations</Text>
      <FlatList
        data={mockOperations}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.operationItem}>
            <Text style={styles.opTitle}>{item.title}</Text>
            <Text style={styles.opTime}>{item.time}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  sectionTitle: { fontSize: 18, fontWeight: '600', marginTop: 20 },
  operationItem: {
    padding: 10,
    backgroundColor: '#eee',
    marginTop: 8,
    borderRadius: 8,
  },
  opTitle: { fontSize: 16, fontWeight: '500' },
  opTime: { fontSize: 12, color: '#555' },
});

