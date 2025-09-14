'use client';

import { useNotifications, Notification } from '@/hooks/useNotifications';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';

interface NotificationToastProps {
  notification: Notification;
  onClose: (id: string) => void;
}

function NotificationToast({ notification, onClose }: NotificationToastProps) {
  const icons = {
    success: CheckCircle,
    error: AlertTriangle,
    info: Info,
    warning: AlertCircle,
  };

  const colors = {
    success: 'bg-green-500/10 border-green-500/20 text-green-300',
    error: 'bg-red-500/10 border-red-500/20 text-red-300',
    info: 'bg-blue-500/10 border-blue-500/20 text-blue-300',
    warning: 'bg-yellow-500/10 border-yellow-500/20 text-yellow-300',
  };

  const Icon = icons[notification.type];

  return (
    <div className={`p-4 rounded-lg border backdrop-blur-sm ${colors[notification.type]} animate-in slide-in-from-right duration-300`}>
      <div className="flex items-start space-x-3">
        <Icon className="h-5 w-5 mt-0.5 flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold">{notification.title}</p>
          <p className="text-sm opacity-90 mt-1">{notification.message}</p>
        </div>
        <button
          onClick={() => onClose(notification.id)}
          className="p-1 rounded hover:bg-white/10 transition-colors flex-shrink-0"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

export function NotificationContainer() {
  const { notifications, removeNotification } = useNotifications();

  if (notifications.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
      {notifications.map((notification) => (
        <NotificationToast
          key={notification.id}
          notification={notification}
          onClose={removeNotification}
        />
      ))}
    </div>
  );
}
