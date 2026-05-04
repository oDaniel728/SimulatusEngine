/**
 * SessionManager.ts
 *
 * Auto-generated documentation comment for core/engine/utils/SessionManager.ts.
 */

import Identifier from "core/structure/Identifier";
import Session from "./Session";

/**
 * SessionManager
 *
 * Class for the engine.
 */
export default class SessionManager {
    public static saveSession<T extends Record<string, any>>(session: Session<T>): void {
        try {
            const serialized = JSON.stringify(session.getData());
            localStorage.setItem(`simulatus_session_${session.id}`, serialized);
        } catch (error) {
            console.error("Error saving session:", error);
        }
    }

    public static loadSession<T extends Record<string, any>>(id: Identifier, defaultData: T): Session<T> | null {
        try {
            const serialized = localStorage.getItem(`simulatus_session_${id}`);
            if (!serialized) {
                return null;
            }
            const data = JSON.parse(serialized) as T;
            return new Session(id, data);
        } catch (error) {
            console.error("Error loading session:", error);
            return null;
        }
    }

    public static deleteSession(id: Identifier): void {
        try {
            localStorage.removeItem(`simulatus_session_${id}`);
        } catch (error) {
            console.error("Error deleting session:", error);
        }
    }

    public static getValue<T extends any>(id: Identifier, path: string): T | null {
        // path : "path.to.key"
        try {
            const serialized = localStorage.getItem(`simulatus_session_${id}`);
            if (!serialized) {
                return null;
            }
            const data = JSON.parse(serialized);
            const keys = path.split(".");
            let current: any = data;
            for (const key of keys) {
                if (current[key] === undefined) {
                    return null;
                }
                current = current[key];
            }
            return current as T;
        } catch (error) {
            console.error("Error getting session value:", error);
            return null;
        }
    }
}