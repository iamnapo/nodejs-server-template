import express from "express";
import ky from "ky";
import { z } from "zod";
import { fromZodError } from "zod-validation-error";

const router = express.Router({ mergeParams: true });

router.get("/", (_, res) => {
	res.send({ message: "'sup bruh?" });
});

router.get("/cat/", async (_, res) => {
	const [{ url }] = await ky<[{ url: string }]>("https://api.thecatapi.com/v1/images/search").json();
	const cat = await ky(url).arrayBuffer();
	res.set("Content-Type", "image/jpeg").send(Buffer.from(cat));
});

router.get("/ping/", (_, res) => {
	res.send({ message: "pong" });
});

router.post("/ping-pong/", async (req, res) => {
	const inputSchema = z.object({
		message: z.enum(["ping", "pong"]),
	});
	const payload = await inputSchema.spa(req.body);
	if (payload.success) {
		const { message } = payload.data;
		res.send({ message: message === "ping" ? "pong" : "ping" });
	} else {
		res.status(400).send({
			message: "Invalid payload",
			details: fromZodError(payload.error).details,
		});
	}
});

export default router;
