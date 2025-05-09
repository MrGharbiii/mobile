// src/utils/notifications.ts
import * as Notifications from 'expo-notifications';
import { NavigationProp } from '@react-navigation/native';

// Configure notification handler
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export const scheduleDailyReminder = async (time: Date) => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Daily Check-in Reminder",
      body: "Don't forget to log your daily health metrics!",
    },
    trigger: {
      hour: time.getHours(),
      minute: time.getMinutes(),
      repeats: true,
    },
  });
};

export const handleNotificationTap = (navigation: NavigationProp<any>) => {
  const subscription = Notifications.addNotificationResponseReceivedListener(
    (response) => {
      navigation.navigate('Measurements');
    }
  );

  return () => subscription.remove();
};

export const requestNotificationPermissions = async () => {
  const { status } = await Notifications.requestPermissionsAsync();
  return status === 'granted';
};

export const formatNotificationMessage = (type: 'reminder' | 'goal' | 'progress') => {
  const messages = {
    reminder: "Time to log your daily health metrics!",
    goal: "You're approaching your health goal!",
    progress: "Great progress on your health journey!"
  };
  return messages[type];
};