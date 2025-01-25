/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

function addGamesToPage(games) {
    // Loop through each game in the array
    for (let i = 0; i < games.length; i++) {
        const game = games[i]; // Access the current game object

        // Step 2: Create a new div element for the game card
        const gameCard = document.createElement("div");

        // Add the "game-card" class to the div
        gameCard.classList.add("game-card");

        // Step 3: Set the inner HTML of the game card using a template literal
        gameCard.innerHTML = `
            <img class="game-img" src="${game.img}" alt="${game.name}">
            <h3>${game.name}</h3>
            <p>${game.description}</p>
            <p>Pledged: $${game.pledged.toLocaleString()}</p>
        `;

        // Append the game card to the games-container
        gamesContainer.appendChild(gameCard);
    }
}

// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const totalContributions = GAMES_JSON.reduce((sum, game) => sum + game.backers, 0);

// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = `${totalContributions.toLocaleString()}`;

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");

// calculate the total amount raised using reduce
const totalRaised = GAMES_JSON.reduce((sum, game) => sum + game.pledged, 0);

// set inner HTML using a template literal
raisedCard.innerHTML = `$${totalRaised.toLocaleString()}`;

// grab number of games card
const gamesCard = document.getElementById("num-games");

// calculate the total number of games
const totalGames = GAMES_JSON.length;

// set the inner HTML with the total number of games
gamesCard.innerHTML = `${totalGames}`;

/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    const unfundedGames = GAMES_JSON.filter(game => game.pledged < game.goal);

    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(unfundedGames);
}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    const fundedGames = GAMES_JSON.filter(game => game.pledged >= game.goal);

    // use the function we previously created to add the funded games to the DOM
    addGamesToPage(fundedGames);
}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON);
}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// Grab the description container
const descriptionContainer = document.getElementById("description-container");

// Use filter or reduce to count the number of unfunded games
const unfundedGamesCount = GAMES_JSON.filter(game => game.pledged < game.goal).length;

// Log the result to test
console.log("Number of unfunded games:", unfundedGamesCount);

// Calculate the total money raised using reduce
const totalMoneyRaised = GAMES_JSON.reduce((sum, game) => sum + game.pledged, 0);

// Create a template string for the display text
const displayStr = `
    A total of $${totalMoneyRaised.toLocaleString()} has been raised for ${GAMES_JSON.length} games.
    Currently, ${unfundedGamesCount} game${unfundedGamesCount !== 1 ? "s" : ""} remain unfunded.
    We need your help to fund these amazing projects!
`;

// Log the string to verify
console.log(displayStr);

// Create a new <p> element to display the information
const descriptionParagraph = document.createElement("p");

// Set the content of the <p> element to the display string
descriptionParagraph.innerHTML = displayStr;

// Append the <p> element to the description container
descriptionContainer.appendChild(descriptionParagraph);


// create a string that explains the number of unfunded games using the ternary operator


// create a new DOM element containing the template string and append it to the description container

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

// Sort the games by pledged amount in descending order
const sortedGames = [...GAMES_JSON].sort((a, b) => b.pledged - a.pledged);

// Destructure the first and second games
const [firstGame, secondGame] = sortedGames;

// Grab the containers for the top two games
const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

// Create a new element for the most funded game
const firstGameElement = document.createElement("p");
firstGameElement.textContent = firstGame.name; // Add the name of the top funded game
firstGameContainer.appendChild(firstGameElement); // Append it to the firstGameContainer

// Create a new element for the second most funded game
const secondGameElement = document.createElement("p");
secondGameElement.textContent = secondGame.name; // Add the name of the second funded game
secondGameContainer.appendChild(secondGameElement); // Append it to the secondGameContainer

addGamesToPage(GAMES_JSON);