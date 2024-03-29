import updateUserPreferences from "../fetch/updateUserPreferences"


const displayGame = (gameData, URL) => {
    // insert randomly selected game inside html element
    let innerHTML = `
            <h1> Random Game </h1> 
            <p> We have selected a random game for you. <br>
                 </p>
            <div class="gameCard" id="gameCard">
                <div class='imageContainer'>
                    <img src="${gameData.image}" alt="">
                </div>
                <div class='gameDetails'>
                    <button id="dislikeBtn"> <span class="icon-thumbs-down" id="dislikeBtn"> </span></button>
                    <h3>${gameData.name}</h3> 
                    <button id="likeBtn" > <span class = "icon-heart" id="likeBtn"> </button>
                    <h4 class="gameId" id="gameId">${gameData.gameId}</h4> 
                </div> 
            </div> 
        `
    document.getElementById('mainContent').innerHTML = innerHTML
    const gameCard = document.querySelector('#gameCard')
    gameCard.addEventListener('click', async (element) => {
        //if clicked element is not gameCard, retrieve userId and gameId
        if (element.target != element.currentTarget) {
            let newUserPreferences = {
                userId: sessionStorage.getItem('id') || localStorage.getItem('id'),
                gameId: element.currentTarget.querySelector('h4').innerHTML,
                isLiked: null
            }
            // if likedBtn has been clicked set isLiked true else if dislikeBtn has been clicked set it to false
            if (element.target.id == "likeBtn") newUserPreferences.isLiked = true
            else if (element.target.id == "dislikeBtn") newUserPreferences.isLiked = false
            // do a fetch call to update User Game Preference with the like/dislike of the displayed game
            updateUserPreferences(newUserPreferences, URL)



        }
    })
}

export default displayGame