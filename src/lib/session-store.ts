/**
 * In-memory session store for generated excuses.
 * The excuse text is NEVER sent to the client before payment.
 * Key = sessionId (UUID), Value = { excuse, paid, createdAt }
 *
 * For production, replace with Redis or a database.
 */

interface Session {
    excuse: string;
    paid: boolean;
    createdAt: number;
}

const sessions = new Map<string, Session>();

const SESSION_TTL_MS = 15 * 60 * 1000; // 15 minutes

/** Periodically clean up expired sessions */
function cleanup() {
    const now = Date.now();
    for (const [id, session] of sessions) {
        if (now - session.createdAt > SESSION_TTL_MS) {
            sessions.delete(id);
        }
    }
}

// Run cleanup every 5 minutes
if (typeof setInterval !== "undefined") {
    setInterval(cleanup, 5 * 60 * 1000);
}

export function createSession(id: string, excuse: string): void {
    sessions.set(id, { excuse, paid: false, createdAt: Date.now() });
}

export function getSession(id: string): Session | undefined {
    return sessions.get(id);
}

export function markAsPaid(id: string): boolean {
    const session = sessions.get(id);
    if (!session) return false;
    session.paid = true;
    return true;
}

export function deleteSession(id: string): void {
    sessions.delete(id);
}

export function isSessionPaid(id: string): boolean {
    return sessions.get(id)?.paid ?? false;
}
