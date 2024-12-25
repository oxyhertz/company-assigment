export const SHOW_MSG = "show-msg";
import type { MsgPayload } from "@/types/notification/msg";

interface Events {
  [SHOW_MSG]: MsgPayload;
}

type Listener<T> = (data: T) => void;

function createEventEmitter<EventsMap>() {
  const listenersMap: {
    [K in keyof EventsMap]?: Array<Listener<EventsMap[K]>>;
  } = {};

  return {
    on<K extends keyof EventsMap>(
      evName: K,
      listener: Listener<EventsMap[K]>
    ): () => void {
      if (listenersMap[evName]) {
        listenersMap[evName] = [...listenersMap[evName], listener];
      } else {
        listenersMap[evName] = [listener];
      }
      return () => {
        if (listenersMap[evName]) {
          listenersMap[evName] = listenersMap[evName].filter(
            (func) => func !== listener
          );
        }
      };
    },
    emit<K extends keyof EventsMap>(evName: K, data: EventsMap[K]): void {
      if (!listenersMap[evName]) return;
      listenersMap[evName].forEach((listener) => listener(data));
    },
  };
}

export const eventBus = createEventEmitter<Events>();

export function showUserMsg(msg: MsgPayload): void {
  eventBus.emit(SHOW_MSG, msg);
}

export function showSuccessMsg(txt: string): void {
  showUserMsg({ txt, type: "success" });
}

export function showErrorMsg(txt: string): void {
  showUserMsg({ txt, type: "error" });
}
