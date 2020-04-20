module.exports = {
    startMenu: function (msg) 
    {
        msg.channel.send("Proces uruchomiony!");   
    },
    stepOne: function (msg)
    {
        msg.channel.send("Co robimy? Możliwe opcje:");
        msg.channel.send("1 - Pobierz listę uczesntików.\n" +
                         "2 - Pobierz listę uczestników i talii.\n" +
                         "~~3 - Pobierz listę parringów.~~\n");
    },
    knownItem: function(msg)
    {
        msg.channel.send("Zrozumiałem! Poproszę o plik z JSONem.");
    },
    unknownItem: function(msg)
    {
        msg.channel.send("Odpowiedź poza kolejnością lub niezrozumiana.")
    },
    jsonError: function(msg)
    {
        msg.channel.send("Niepoprawny plik JSON.");
    },
    requestError: function(msg)
    {
        msg.channel.send("Błąd podczas procesowania załącznika.")
    },
    timeout: function (msg)
    {
        msg.channel.send("Przekroczono czas na reakcję.");
    },
    end: function(msg)
    {
        msg.channel.send("Koniec procesu.");
    },
    help: function(msg)
    {
        msg.channel.send("Wprowadź '!start', aby uruchomić bota.");
    }
  };
  