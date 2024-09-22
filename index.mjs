import express from "express";
import morgan from 'morgan';
import cors from 'cors'

const app = express();
app.use(express.json());
app.use(cors(["http://localhost:3000", "127.0.0.1", "https://ewrer234234.appspot.app.com"]));

app.use(morgan('combined'));

app.use("/webhook", (req, res,) => {

  const params = req.body.sessionInfo.parameters;

  const { name, roomtype } = params;

  console.log("guest name: ", name.original);
//   console.log("Number of guests: ", numberofguests);
  console.log("Type of room: ", params.roomtype);


  const body = {
    detectIntentResponseId: '4dd48764-d86c-4d2c-a319-26447fa40e95',
    intentInfo: {
      lastMatchedIntent: 'projects/chatbotdemo-mykk/locations/us-central1/agents/0ceea8d4-84ab-407a-af7f-d01cd135841d/intents/c6585558-9cd8-458a-91a6-09081c27a309',
      displayName: 'confirmation.yes',
      confidence: 1
    },
    pageInfo: {
      currentPage: 'projects/chatbotdemo-mykk/locations/us-central1/agents/0ceea8d4-84ab-407a-af7f-d01cd135841d/flows/00000000-0000-0000-0000-000000000000/pages/a059d196-a603-41ba-bc0c-f4cd67602fb8',
      formInfo: {},
      displayName: 'Booking Confirmation Page'
    },
    sessionInfo: {
      session: 'projects/chatbotdemo-mykk/locations/us-central1/agents/0ceea8d4-84ab-407a-af7f-d01cd135841d/sessions/ec1130-477-ead-eb0-cf69558fb',
      parameters: { guestname: [Object], numberofguests: 2, roomtype: 'business' }
    },
    fulfillmentInfo: { tag: 'abc' },
    text: 'yes',
    languageCode: 'en'
  }


  res.send({
    "fulfillmentResponse": {
      "messages": [
        {
          "responseType": "RESPONSE_TYPE_UNSPECIFIED",
          "text": {
            "text": [
              `Dear ${name.original}, your booking of ${roomtype} room is confirmed. `
            ],
            "allowPlaybackInterruption": false
          }
        },
        // this is another optional reponse
        {
          "responseType": "RESPONSE_TYPE_UNSPECIFIED",
          "text": {
            "text": ["We wish you good stay."],
            "allowPlaybackInterruption": false
          }
        }
      ],
      "mergeBehavior": "MERGE_BEHAVIOR_UNSPECIFIED"
    }
  })
})

const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});