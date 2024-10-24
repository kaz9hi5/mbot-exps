import {
  TextMessage,
  middleware,
  WebhookEvent,
  ClientConfig,
  Client,
} from '@line/bot-sdk';
import https from 'https';
import express, { Application, Request, Response } from 'express';
import Flatted from 'flatted';
import 'dotenv/config';
import fs from 'fs';
import logger from './logger.cjs';
import dispatchMessageEvent from './events.cjs';

const config = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN || '',
  channelSecret: process.env.CHANNEL_SECRET || '',
};
const option = {
  key: fs.readFileSync('.cert/privkey.pem'),
  cert: fs.readFileSync('.cert/fullchain.pem'),
};
const clientConfig: ClientConfig = config;
const client = new Client(clientConfig);
const app: Application = express();
const server = https.createServer(option,app);
app.use('/webhook', middleware(config));

// get/post handling
app.get('/', async (_: Request, res: Response<string>): Promise<void> => {
  res.status(200).send('dev. auth ok');
});
app.post('/webhook', async (req: Request, res: Response<string>): Promise<void> => {
  logger.info(`Destination:${req.body.destination}`);
  const events: WebhookEvent[] = req.body.events;
  logger.info(`EventsMsgCnt:${events.length}`);
  events.map(async (event: WebhookEvent) => {
    let reply = '';
    if (event.type === 'message') {
      logger.info(`Event:${Flatted.stringify(event.message)}`);
      reply = await dispatchMessageEvent(event);
      if (reply !== '') {
        const textMessage: TextMessage = {
          type: 'text',
          text: reply,
        };
        logger.info(`reply msg send:${Flatted.stringify(textMessage)}`);
        await client.replyMessage(
          event.replyToken,
          textMessage,
        ).catch((e: Error) => {
          logger.warn(e.message);
        });
      }
    }
  });
  res.status(200).send('success');
});

// Serverでlisten
server.listen(process.env.SVR_PORT);
logger.info('Server running Start');
