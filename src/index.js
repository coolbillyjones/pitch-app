/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export default {
	async fetch(request, env, ctx) {
		const res = await fetch(
			"https://github.com/Azure-Samples/cognitive-services-speech-sdk/raw/master/samples/cpp/windows/console/samples/enrollment_audio_katie.wav"
		)
		const blob = await res.arrayBuffer()

		const input = {
			audio: [... new Uint8Array(blob)],
		}

		const response = await env.AI.run(
			"@cf/openai/whisper", 
			input
		)

		

		return Response.json({ input: { audio: [] }, response});
	},
}
