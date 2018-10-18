const input = $('#input');//grabs the user search input field
input.keypress((e) => {
    if (e.keyCode === 13) {
        newSearch();
    }
});

    function newSearch() {
    const resultsDiv = $('#results');
    resultsDiv.html('<img src="./giphy.webp" alt="loading" class="loading">');
    const fragment = document.createDocumentFragment();

    function handleSuccess() {
        const searchTerm = search;
        const data = JSON.parse(this.responseText);
        console.log(data);
        if(data.total){
                    const images = data.hits;
                    if (data.hits) {
                        for (let image of images) {
                            const img = image.largeImageURL;
                            const template = `<a href='${img}' title='click to view full image' target='_blank'><img src=${img} alt='Image of ${searchTerm}' class='thumbnail'></a>`
                            $(fragment).append(template);
                        }
                        resultsDiv.html('');
                        resultsDiv.append(fragment);
                    } else {
                        alert(`Could not find Images of ${searchTerm}`);
                    }
                }
        else {
            resultsDiv.html(`<p class='err'>Sorry! Couldn\'t find what you\'re looking for. Make sure you spell it right, or try something different\!</p>`);
        }
    }

    function handleError() {
        $('#results').html(`<p class='err'>An error occurred</p>`);
    }

    const search = $('#input').val();//the user's search term
    const searchFor = encodeURIComponent(search);
    const apiKey = '2141397-162a6e6ca9ba4b3fe3cff850d';
    const asyncRequestObject = new XMLHttpRequest();


    const url = `https://cors-anywhere.herokuapp.com/pixabay.com/api/?key=${apiKey}&q='${searchFor}'&image_type=photo&per_page=35`;
    const method = 'GET';
    asyncRequestObject.open(method, url);
    asyncRequestObject.onload = handleSuccess;
    asyncRequestObject.onerror = handleError;
    asyncRequestObject.send();

};