import * as z from "zod";

export const postPingPongSchema = z.object({
	message: z.enum(["ping", "pong"]),
});
