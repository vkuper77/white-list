const { createSelector } = require("@reduxjs/toolkit");

export const getNotificationLeft  = createSelector((state) => state, (state) => state.notifications.find(n => n.position === 'left'))
export const getNotificationTop  = createSelector((state) => state, (state) => state.notifications.find(n => n.position === 'top'))