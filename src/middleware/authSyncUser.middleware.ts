import { createClerkClient } from "@clerk/backend";
import type { Context, Next } from "hono";
import prisma from "@/lib/prisma";
import { sendError } from "@/utils/response";
import type { AppEnv } from "@/types";

const clerk = createClerkClient({
    secretKey: process.env.CLERK_SECRET_KEY!,
});

export async function syncUser(c: Context<AppEnv>, next: Next) {
    const clerkUserId = c.get("clerkUserId");

    try {
        const clerkUser = await clerk.users.getUser(clerkUserId);
        const email = clerkUser.emailAddresses[0]?.emailAddress;

        if (!email) {
            return sendError(c, "Clerk user has no email", "UNAUTHORIZED", 401);
        }

        const fullName = [clerkUser.firstName, clerkUser.lastName]
            .filter(Boolean)
            .join(" ") || null;

        const user = await prisma.user.upsert({
            where: { email },
            update: { name: fullName ?? undefined },
            create: {
                email,
                name: fullName,
                password_hash: "clerk_managed",
                role: "OWNER",
            },
            select: { id: true, role: true, is_active: true },
        });

        if (!user.is_active) {
            return sendError(c, "Account is deactivated", "FORBIDDEN", 403);
        }

        c.set("userId", user.id);
        c.set("userRole", user.role);

        await next();
    } catch {
        return sendError(c, "Failed to sync user", "INTERNAL_ERROR", 500);
    }
}