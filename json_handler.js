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
    },

    requestParings: function (msg, collected, client, channel) 
    { 
        var messages = require('./menu_printing');
        request.get(collected.first().attachments.first().attachment, function (error, response, body) 
        {
            if (!error && response.statusCode == 200) 
            { 
                try
                {
                    var participants = JSON.parse(body)["data"]["entityGroupMap"]["Participant:#"]["entities"]; 
                    var currentRound = JSON.parse(body)["data"]["entityGroupMap"]["Tournament:#"]["entities"]["0"]["current_round"];
                    var matchesInfo = JSON.parse(body)["data"]["entityGroupMap"]["Match:#"]["entities"];
                    var matches = JSON.parse(body)["data"]["entityGroupMap"]["MatchParticipant:#"]["entities"]; 
                }
                catch(error)
                {
                    messages.jsonError(msg); 
                    return;
                }
 
                //Collect full array of players [player_id][player_name][score = 0]
                var participantsArr = [];
                for(var i = 0 ; i < participants.length ; i ++)
                {   
                    participantsArr.push([participants[`${i}`]["pk"], participants[`${i}`]["first_name"], 0]); 
                } 

                //Collect [match_id][round] array
                var matchesArr = [];
                for(var i = 0 ; i < matchesInfo.length ; i ++)
                {
                    matchesArr.push([matchesInfo[`${i}`]["pk"], matchesInfo[`${i}`]["round"]]); 
                } 

                //Iterate throught matches add score if not current round OR start logging if current round
                var tableData = [];
                tableData.push(["Lp.", "Gracz 1", "Gracz 2", "Wynik gracza 1", "Wynik gracza 2"]);
                var currentMatchIndex = 1;  
                for(var i = 0 ; i < matches.length ; i ++)
                {    
                    //Match match's id with its round
                    var tempRound;
                    for(var j = 0 ; j < matchesArr.length ; j++)
                    { 
                        if(matchesArr[j][0] == matches[`${i}`]["match_pk"])
                        {
                            tempRound = matchesArr[j][1];
                            break;
                        }
                    }  

                    //Current round - do not calculate score - just log
                    if(tempRound == currentRound)
                    {
                        var tempGracz1, tempGracz2;
                        var tempScore1, tempScore2;

                        //Get whole pair na add to table
                        for(var j = 0 ; j < participantsArr.length ; j++)
                        {
                            if(participantsArr[j][0] == matches[`${i}`]["participant_pk"])
                            {
                                tempGracz1 = participantsArr[j][1];
                                tempScore1 = participantsArr[j][2].toString() + ":" + Math.abs(participantsArr[j][2] - currentRound).toString();
                            }
                            if(participantsArr[j][0] == matches[`${i+1}`]["participant_pk"])
                            {
                                tempGracz2 = participantsArr[j][1];
                                tempScore2 = participantsArr[j][2] + ":" + Math.abs(participantsArr[j][2] - currentRound).toString();
                            }
                        }

                        tableData.push([currentMatchIndex.toString(), 
                                        tempGracz1,
                                        tempGracz2,
                                        tempScore1,
                                        tempScore2]);
                        currentMatchIndex++; 
                        i++;
                    }
                    //Previous round - add previous score
                    else
                    { 
                        for(var j = 0 ; j < participantsArr.length ; j++)
                        {  
                            if(participantsArr[j][0] == matches[`${i}`]["participant_pk"])
                            { 
                                participantsArr[j][2] += matches[`${i}`]["points_earned"]; 
                                break;
                            }
                        }
                    }
                } 

                var arrayHandler = require('./table_handler');
                
                if(channel == "0")
                {
                    msg.channel.send(arrayHandler.buildTable(tableData, currentMatchIndex, 5));
                }
                else
                {
                    client.channels.cache.get(channel).send(arrayHandler.buildTable(tableData, currentMatchIndex, 5));
                }
 
            }
            else
            {
                messages.requestError(msg);
            }
        }); 
    },
};