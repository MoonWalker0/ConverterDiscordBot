const request = require('request');
module.exports = {
    requestUsername: function (msg, collected, client, channel) 
    { 
        var messages = require('./menu_printing');
        request.get(collected.first().attachments.first().attachment, function (error, response, body) 
        {
            if (!error && response.statusCode == 200) 
            { 
                try
                {
                    var participants = JSON.parse(body)["data"]["entityGroupMap"]["Participant:#"]["entities"]; 
                }
                catch(error)
                {
                    messages.jsonError(msg);
                    return;
                }

                var participantsString = "";
                var tableData = [];
                tableData.push(["Lp.", "Uczestnik"]);
                for(var i = 0 ; i < participants.length ; i ++)
                {   
                    tableData.push([(i+1).toString(), participants[`${i}`]["first_name"]]); 
                } 
                var arrayHandler = require('./table_handler');

                if(channel == "0")
                {
                    msg.channel.send(arrayHandler.buildTable(tableData, participants.length, 2));
                }
                else
                {
                    client.channels.cache.get(channel).send(arrayHandler.buildTable(tableData, participants.length, 2));
                }
 
            }
            else
            {
                messages.requestError(msg);
            }
        }); 
    },
    requestUsernameAndDeck: function (msg, collected, client, channel)
    {
        var messages = require('./menu_printing');
        request.get(collected.first().attachments.first().attachment, function (error, response, body) 
        {
            if (!error && response.statusCode == 200) 
            { 
                try
                {
                    var participants = JSON.parse(body)["data"]["entityGroupMap"]["Participant:#"]["entities"]; 
                    var decks = JSON.parse(body)["data"]["entityGroupMap"]["Deck:#"]["entities"];
                }
                catch(error)
                {
                    messages.jsonError(msg);
                    return;
                }

                var participantsString = "";
                var tableData = [];
                tableData.push(["Lp.", "Uczestnik", "Talia"]);
                for(var i = 0 ; i < participants.length ; i ++)
                {   
                    tableData.push([(i+1).toString(), participants[`${i}`]["first_name"], decks[`${i}`]["name"]]); 
                } 
                var arrayHandler = require('./table_handler');

                if(channel == "0")
                {                    
                    msg.channel.send(arrayHandler.buildTable(tableData, participants.length, 3));
                }
                else
                {
                    client.channels.cache.get(channel).send(arrayHandler.buildTable(tableData, participants.length, 3));
                }
 
            }
            else
            {
                messages.requestError(msg);
            }
        }); 
    }
};