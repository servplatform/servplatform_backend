const recombee = require('recombee-api-client');

// Initialize client with name of your database and PUBLIC token
const client = new recombee.ApiClient('serv-platform-dev', 'dsOybgdgyyn1RNQ8vV4ntbUn1KyQpGl5oBr0D25TqI8K6KI73Mv1bXu3e98IZrpu');
//Interactions take Id of user and Id of item
client.send(new recombee.AddBookmark('user-13434', 'item-256'));

