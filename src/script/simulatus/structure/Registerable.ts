export default abstract class Registerable {
    public static async register(): Promise<void> {
        throw new Error("Subclass must override static async register() method.");
    }
}