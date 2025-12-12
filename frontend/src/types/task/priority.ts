export type Priorities = "Low" | "Medium" | "High";

export interface Priority {
  label: Priorities;
  value: Priorities;
  isOpen: boolean;
}
