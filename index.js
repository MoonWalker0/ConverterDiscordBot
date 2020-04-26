const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs')
const timeout = 30 * 1000;

client.on('ready', () => 
{
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async msg => {  
    if(msg.author.username != "ConverterBot" && msg.channel.type == "dm")
    {  
        var messages = require('./menu_printing');
        var carryOn = true;
        
        if(msg.content == "!help")
        {
            messages.fullHelp(msg);
        }
        else if(msg.content.startsWith("!start"))
        {  
            console.log(msg.attachments);
            console.log(msg.attachments.first().attachment);

            console.log(msg.content);
            var split = msg.content.split(' ');

            //Safety checks
            if(split.length != 3)
            {
                messages.messageSizeError(msg);
                messages.end(msg);
                return;
            }

            console.log(split[0]);
            console.log(split[1]);
            console.log(split[2]);
            var option = split[1];
            var selectedChannel = split[2];

            var letterNumber = /^[0-9a-zA-Z]+$/;
            if(!option.match(/^[0-9]+$/) || !selectedChannel.match(/^[0-9]+$/))
            {
                messages.notNumberError(msg);
                messages.end(msg);
                return;
            } 

            var handler = require('./json_handler');
            if(option == "1")
            {
                handler.requestUsername(msg, client, selectedChannel);
            }
            else if(option == "2")
            {
                handler.requestUsernameAndDeck(msg, client, selectedChannel);
            }
            else if(option == "3")
            {
                handler.requestParings(msg, client, selectedChannel);
            }
            else
            {
                messages.unknownItem(msg); 
                messages.end(msg); 
                return;

            }

            messages.end(msg); 
 
        }            
    } 
 });

client.login(process.env.BOT_TOKEN);