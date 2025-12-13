export type Status = "todo" | "in-progress" | "review" | "done";

export interface StatusType {
  label: Status;
  value: Status;
  isOpen: boolean;
}
