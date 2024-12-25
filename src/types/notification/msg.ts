export interface MsgPayload {
  txt: string;
  type: "success" | "error";
  delay?: number;
}
