import { MessageEmbed } from 'discord.js';

export default function errorToEmbed(error: Error | ReferenceError): MessageEmbed {
  const msg = new MessageEmbed();
  msg.setColor('#ff0000');
  msg.setAuthor('Debugger');
  msg.setTitle('Uncatched Exception');
  msg.setDescription('`' + error.constructor.name + '`: ' + error.message);
  msg.addField('Stack', ('```\n' + error.stack + '\n```'), false);

  return msg;
}
