// src/utils/notifications.ts
import * as Notifications from 'expo-notifications';
import { NavigationProp } from '@react-navigation/native';
import { MainTabParamList } from '../types/navigation';

// Configure notification handler
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true
  }),
});

export const showDailyReminder = async () => {
  await Notifications.presentNotificationAsync({
    title: "Daily Check-in Reminder",
    body: "Don't forget to log your daily health metrics!"
  });
};

export const handleNotificationTap = (navigation: NavigationProp<MainTabParamList>) => {
  const subscription = Notifications.addNotificationResponseReceivedListener(
    (response: Notifications.NotificationResponse) => {
      navigation.navigate('Measurements', { id: undefined });
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