
function submitCityName() {
    let input_element = document.getElementById("inputCityName");

    axios.get('https://api.teleport.org/api/urban_areas/slug:' + input_element.value.replace(/ /g, "-") + '/scores/')
    .then(response => {
    console.log(response.data);
    document.getElementById("search-container").classList.add("containerUp");

    let responseScore = document.getElementById("response-score");
    let responseSummary = document.getElementById("response-summary");
    let responseCategory = document.getElementById("response-category");

    responseScore.innerHTML = "";
    let cityName = document.getElementById("inputCityName").value.toUpperCase();
    spawnElement(responseScore, 'div', null, ["spawn-title"], cityName);
    let scoreContainer = spawnElement(responseScore, 'div', null, ["spawn-score-container"], null);
    spawnElement(scoreContainer, 'div', null, ["spawn-label"], 'SCORE');
    spawnElement(scoreContainer, 'div', null, ["spawn-score"], Math.round(response.data.teleport_city_score));
    
    
    responseSummary.innerHTML = "";
    spawnElement(responseSummary, 'div',null,["spawn-container"], response.data.summary);

    responseCategory.innerHTML = "";
    response.data.categories.forEach (category  => {
        let spawnCategory = spawnElement(responseCategory, 'div', 'color:black ' + category.color ,["spawn-category"], category.name + "<b>" + Math.round(category.score_out_of_10) + "</b>");
        let scoreBarContainer = spawnElement(spawnCategory, 'div', null, ["score-bar-container"], null);
        let scoreBar = spawnElement(scoreBarContainer, 'div', "width:" + (Math.round(category.score_out_of_10) * 10) + "%", ["score-bar"], null);
        if (category.score_out_of_10 == 10) {
            scoreBar.classList.add("score-bar-full");
            spawnCategory.style.color = "#fff";
        }
    });
    }).catch(
        function (error) {
            console.log('Show error notification!')
            document.getElementById("error-label").innerHTML = "City name not found";
            document.getElementById("error-label").classList.add("redColor");
        }
    )
}

 function spawnElement (parent_node, tag_name, style, classes, inner_html = null){
    var el = document.createElement(tag_name);
    el.innerHTML = inner_html;
    el.style = style;
    classes.forEach(classe => {
        el.classList.add(classe);
    });
    parent_node.appendChild(el);
    return el;
 }  





$( document ).ready(function() {

    /* Open Panel */
    $( ".hamburger" ).on('click', function() {
      $(".menu").toggleClass("menu--open");
    });

    $( "#inputCityName" ).on('input', function() {
        if (this.value == "") {
            document.getElementById("response-score").innerHTML = "";
            document.getElementById("response-summary").innerHTML = "";
            document.getElementById("response-category").innerHTML = "";
            document.getElementById("search-container").classList.remove("containerUp");
        }
        document.getElementById("error-label").innerHTML = "Enter city name";
        document.getElementById("error-label").classList.remove("redColor");
    });
    $("#inputCityName").on('keyup', function (e) {
        if (e.key === 'Enter' || e.keyCode === 13) {
            submitCityName()
        }
    });
});

 
