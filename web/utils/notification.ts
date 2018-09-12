import { BehaviorSubject } from 'rxjs';

export const supported = () =>
  'Notification' in window &&
  'serviceWorker' in navigator &&
  'PushManager' in window;

let permission: BehaviorSubject<NotificationPermission> | undefined;
export const createPermissionObserver = () => {
  permission = new BehaviorSubject(Notification.permission);
  return permission.asObservable();
};

export const getPermission = () => {
  if (permission) {
    return permission.getValue();
  }

  createPermissionObserver();
  return permission!.getValue();
};

export const requestPermission = () => {
  if (!permission) {
    createPermissionObserver();
  }
  return Notification.requestPermission().then(status => {
    permission!.next(status);
    return status;
  });
};

export const sendTestPush = () => {
  return new Notification('Push test');
};
