import React from 'react';
import 'firebase/firestore';
import { Notifications } from 'expo';
import * as db from "@firebase/firestore";

const NotificationService = () => {
    // Get user's hydration goal data from Firebase
    const userId = 'abc123';
    const goalRef = db.collection('users').doc(userId).collection('goals').doc('hydration');
    goalRef.onSnapshot((doc) => {
        const goal = doc.data();
        const startTime = goal.startTime;
        const endTime = goal.endTime;
        const rate = goal.rate;

        // Calculate the amount of time remaining in the goal period
        const currentTime = new Date();
        const timeRemaining = endTime - currentTime;
        if (timeRemaining > 0) {
            // Schedule notifications at the specified rate
            const notificationInterval = timeRemaining / rate;
            Notifications.scheduleLocalNotificationAsync({
                title: 'Drink water!',
                body: `You're on track to reach your daily hydration goal. Keep it up!`,
            }, {
                time: currentTime.getTime() + notificationInterval,
                repeat: 'minute',
            });
        }
    });

    return null;
};

export default NotificationService;