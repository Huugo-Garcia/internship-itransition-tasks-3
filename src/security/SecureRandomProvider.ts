import crypto from 'crypto';

export class SecureRandomProvider {

    // Generate a secure random 256-bit (32-byte) hex key
    generateKey(): string {
        return crypto.randomBytes(32).toString('hex');
    }


    // Generate a cryptographically secure random number
    // Ensure uniform distribution
    generateRandomNumber(max: number): number {
        if (max <= 0) {
            throw new Error('Max must be a positive number');
        }

        const range = 256;
        const limit = Math.floor(range / max) * max;
        let random: number;

        do {
            random = crypto.randomBytes(1)[0]; // Get a random byte
        } while (random >= limit); // Discard if it's outside the range

        return random % max; // Return the random number in the range [0, max)
    }

    // Computes HMAC using SHA-256 of a value with the given key
    computeHmac(key: string, value: number): string {
        return crypto.createHmac('sha256', Buffer.from(key, 'hex')).update(value.toString()).digest('hex');
    }
}