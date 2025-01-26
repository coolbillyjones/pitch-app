export default {
	async fetch(request, env, ctx) {
		async function getData() {
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

			return Response.json(response.text)
		}

		async function analyzeData(){
			const userSpeech = getData()
			// const userText = [
			// 	{"word":"Hello,","start":0.5799999833106995,"end":1},
			// 	{"word":"it","start":1,"end":1.100000023841858},
			// 	{"word":"is","start":1.100000023841858,"end":1.2200000286102295},
			// 	{"word":"a","start":1.2200000286102295,"end":1.3200000524520874},
			// 	{"word":"good","start":1.3200000524520874,"end":1.4600000381469727},
			// 	{"word":"day","start":1.4600000381469727,"end":1.659999966621399},
			// 	{"word":"for","start":1.659999966621399,"end":1.8600000143051147},
			// 	{"word":"me","start":1.8600000143051147,"end":1.9800000190734863},
			// 	{"word":"to","start":1.9800000190734863,"end":2.0999999046325684},
			// 	{"word":"teach","start":2.0999999046325684,"end":2.4000000953674316},
			// 	{"word":"you","start":2.4000000953674316,"end":2.5999999046325684},
			// 	{"word":"the","start":2.5999999046325684,"end":2.819999933242798},
			// 	{"word":"sound","start":2.819999933242798,"end":3.0399999618530273},
			// 	{"word":"of","start":3.0399999618530273,"end":3.2799999713897705},
			// 	{"word":"my","start":3.2799999713897705,"end":3.440000057220459},
			// 	{"word":"voice.","start":3.440000057220459,"end":4.179999828338623},
			// 	{"word":"You","start":4.179999828338623,"end":4.239999771118164},
			// 	{"word":"have","start":4.239999771118164,"end":4.360000133514404},
			// 	{"word":"learned","start":4.360000133514404,"end":4.519999980926514},
			// 	{"word":"what","start":4.519999980926514,"end":4.739999771118164},
			// 	{"word":"I","start":4.739999771118164,"end":4.860000133514404},
			// 	{"word":"look","start":4.860000133514404,"end":5.059999942779541},
			// 	{"word":"like","start":5.059999942779541,"end":5.28000020980835},
			// 	{"word":"now","start":5.28000020980835,"end":5.539999961853027},
			// 	{"word":"you","start":5.539999961853027,"end":5.679999828338623},
			// 	{"word":"can","start":5.679999828338623,"end":5.840000152587891},
			// 	{"word":"hear","start":5.840000152587891,"end":6},
			// 	{"word":"what","start":6,"end":6.139999866485596},
			// 	{"word":"I","start":6.139999866485596,"end":6.260000228881836},
			// 	{"word":"sound","start":6.260000228881836,"end":6.5},
			// 	{"word":"like.","start":6.5,"end":7.400000095367432},
			// 	{"word":"The","start":7.400000095367432,"end":7.5},
			// 	{"word":"sound","start":7.5,"end":7.71999979019165},
			// 	{"word":"of","start":7.71999979019165,"end":7.880000114440918},
			// 	{"word":"my","start":7.880000114440918,"end":8.020000457763672},
			// 	{"word":"voice","start":8.020000457763672,"end":8.34000015258789},
			// 	{"word":"will","start":8.34000015258789,"end":8.460000038146973},
			// 	{"word":"help","start":8.460000038146973,"end":8.640000343322754},
			// 	{"word":"the","start":8.640000343322754,"end":8.779999732971191},
			// 	{"word":"transcription","start":8.779999732971191,"end":9.140000343322754},
			// 	{"word":"service","start":9.140000343322754,"end":9.600000381469727},
			// 	{"word":"to","start":9.600000381469727,"end":9.760000228881836},
			// 	{"word":"recognize","start":9.760000228881836,"end":10.119999885559082},
			// 	{"word":"my","start":10.119999885559082,"end":10.319999694824219},
			// 	{"word":"unique","start":10.319999694824219,"end":10.619999885559082},
			// 	{"word":"voice","start":10.619999885559082,"end":10.960000038146973},
			// 	{"word":"in","start":10.960000038146973,"end":11.239999771118164},
			// 	{"word":"the","start":11.239999771118164,"end":11.380000114440918},
			// 	{"word":"future.","start":11.380000114440918,"end":12.5},
			// 	{"word":"Training","start":12.5,"end":12.699999809265137},
			// 	{"word":"will","start":12.699999809265137,"end":12.920000076293945},
			// 	{"word":"provide","start":12.920000076293945,"end":13.199999809265137},
			// 	{"word":"a","start":13.199999809265137,"end":13.380000114440918},
			// 	{"word":"better","start":13.380000114440918,"end":13.579999923706055},
			// 	{"word":"experience","start":13.579999923706055,"end":14.0600004196167},
			// 	{"word":"with","start":14.0600004196167,"end":14.279999732971191},
			// 	{"word":"greater","start":14.279999732971191,"end":14.5},
			// 	{"word":"accuracy","start":14.5,"end":15.039999961853027},
			// 	{"word":"when","start":15.039999961853027,"end":15.260000228881836},
			// 	{"word":"talking","start":15.260000228881836,"end":15.579999923706055},
			// 	{"word":"or","start":15.579999923706055,"end":15.819999694824219},
			// 	{"word":"dictating.","start":15.819999694824219,"end":16.68000030517578},
			// 	{"word":"Thank","start":16.68000030517578,"end":16.799999237060547},
			// 	{"word":"you","start":16.799999237060547,"end":17.020000457763672},
			// 	{"word":"and","start":17.020000457763672,"end":17.280000686645508},
			// 	{"word":"goodbye.","start":17.280000686645508,"end":18.15999984741211}
			// ]
			const message = `Please analyze the tone of my speech, commenting on confidence, hesitation, and filler words used. Provide feedback on areas that can be improved, the speech is: ${userSpeech}`
			console.log(message)
	
			const messages = [
				{role: "system", content: "You are a speech teacher helping the user improve their speech skills using a speech they give you. For example, if they use filler words like 'umm' or 'uhh' then tell them, etc. "},
				{
					role: "user",
					content: `${message}`
				}
			]
	
			const analyzedSpeech = await env.AI.run("@cf/meta/llama-3.3-70b-instruct-fp8-fast", { messages })
	
			
	
			return Response.json({ analyzedSpeech });
		}
		const result = analyzeData()

		console.log(result)
		return result
	},
};