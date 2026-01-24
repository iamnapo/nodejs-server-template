import { Router } from "express";
import { got } from "got";
import { flattenError } from "zod";

import { postPingPongSchema } from "#schemas/public.ts";

const router = Router({ mergeParams: true });

router.get("/", (_, res) => res.json({ message: "'sup bruh?" }));

router.get("/cat/", async (_, res) => {
	const [{ url }] = await got("https://api.thecatapi.com/v1/images/search").json<[{ url: string }]>();
	const cat = await got(url).buffer();
	return res.set("Content-Type", "image/jpeg").send(cat);
});

router.get("/ping/", (_, res) => res.json({ message: "pong" }));

router.post("/ping-pong/", async (req, res) => {
	const parsedSchema = await postPingPongSchema.spa(req.body);

	if (!parsedSchema.success) {
		return res.status(400).json({ message: "Invalid payload", details: flattenError(parsedSchema.error) });
	}

	const { message } = parsedSchema.data;

	return res.json({ message: message === "ping" ? "pong" : "ping" });
});

export default router;
