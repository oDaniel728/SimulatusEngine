/**
 * Registerable.ts
 *
 * Auto-generated documentation comment for core/structure/Registerable.ts.
 */

/**
 * Registerable
 *
 * Abstract class for the engine.
 */
export default abstract class Registerable {
    public static async register(): Promise<void> {
        throw new Error("Subclass must override static async register() method.");
    }
}