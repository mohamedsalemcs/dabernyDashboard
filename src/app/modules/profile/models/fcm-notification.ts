export interface FCMNotification {
  EntityId: string;
  NotificationType: string;
  RoutUrl: string;
  body: string;
  title: string;
  wasTapped: boolean;
}
