export interface ConfirmDialog {
  acceptText: string;
  rejectText: string;
  warningText?: string;
  title: string;
  message: string;
  defaultToCancel?: boolean;
}
