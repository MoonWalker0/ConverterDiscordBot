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
    stepTwo: function (msg)
    {
        msg.channel.send("Gdzie skierować wynik?\n"+
                         "Podaj ID kanału lub 0, aby wypisać tutaj.");
    },
    knownItem: function(msg)
    {
        msg.channel.send("Zrozumiałem!");
    },
    giveJSON: function(msg)
    {
        msg.channel.send("Proszę o plik z JSONem.");
    },
    unknownItem: function(msg)
    {
        msg.channel.send("Odpowiedź poza kolejnością lub niezrozumiana.");
    },
    idError: function(msg)
    {
        msg.channel.send("ID musi zawierać tylko cyfry.");
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
  