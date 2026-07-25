require('dotenv').config();
const { 
  Client, 
  GatewayIntentBits, 
  Partials, 
  ActivityType
} = require('discord.js');
<<<<<<< HEAD
const { Player } = require('discord-player');
const { DefaultExtractors } = require('@discord-player/extractor');
=======
>>>>>>> main

const eventHandler = require('./handlers/eventHandler');

const client = new Client({ 
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.MessageContent
  ], 
  partials: [Partials.Channel] 
});

<<<<<<< HEAD
client.player = new Player(client);

client.once('ready', async (c) => {
  console.log(`✅ ${c.user.tag} is online.`);

  try {
    await client.player.extractors.loadMulti(DefaultExtractors);
    console.log('✅ Music extractors loaded.');
  } catch (err) {
    console.error('❌ Failed to load extractors:', err.message);
  }

=======
client.once('clientReady', (c) => {
  console.log(`✅ ${c.user.tag} is online.`);

>>>>>>> main
  client.user.setPresence({
    activities: [{
      name: '/help | kylan1940.netlify.app',
      type: ActivityType.Watching
    }],
    status: 'online' 
  });
});

eventHandler(client);

client.login(process.env.TOKEN);
