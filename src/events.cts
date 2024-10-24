import {
  MessageEvent,
  ImageEventMessage,
  ClientConfig,
  Client,
} from '@line/bot-sdk';
import path from 'path';
import fs from 'fs';
import 'dotenv/config';
import logger from './logger.cjs';

const config = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN || '',
  channelSecret: process.env.CHANNEL_SECRET || '',
};
const clientConfig: ClientConfig = config;
const client = new Client(clientConfig);

const dispatchMessageEvent = async (event: MessageEvent): Promise<string> => {
  let reply: string = '';
  switch (event.message.type) {
  case 'text':
    reply = event.message.text;
    break;
  case 'image': {
    const imageMsg: ImageEventMessage = {
      type: 'image',
      contentProvider: event.message.contentProvider,
      quoteToken: '',
      id: event.message.id,
    };
    const ret = await downloadImageContent(
      imageMsg,
      path.join(process.env.IMGF_DL_DIR || '',`${event.message.id}.jpg`)
    );
    if (ret === 'ok') {
      reply = '保存しました';
    }
    //`${process.env.BASE_URL}/downloaded/${id}.jpg`;
    break;
  }
  case 'audio':
  case 'video':
  case 'sticker':
  case 'location':
    logger.warn('ouch! ignore msg type');
    break;
  }
  return reply;
};
const downloadImageContent = async (msg: ImageEventMessage,dl_path: string): Promise<string> => {
  const stream = await client.getMessageContent(msg.id);
  return new Promise((resolve, reject) => {
    const writable = fs.createWriteStream(dl_path);
    writable
      .on('end', () => {
        logger.warn('DL success!');
        resolve('ok');
      })
      .on('error', () => {
        logger.warn('ouch! DL error');
        reject;
      });
    stream.pipe(writable);
  });
};

export default dispatchMessageEvent;
