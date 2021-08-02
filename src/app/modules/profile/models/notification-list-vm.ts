import { NotificationTypesEnum } from "./notification-type-enum";

export interface NotificationListVm {
  id: number;
  userProfileId: number;
  userProfileImagePath: string;
  userFullName: string;
  createdAt: string;
  title: string;
  message: string;
  routeURL: string;
  isRead: boolean;
  isNotified: boolean;
  notificationType: NotificationTypesEnum;
  entityId: number;
}
