function moveto2ndPage() {
    window.location.href = '/select_story';
}

var animation;

function genStory() {
    const selectedLanguage = document.getElementById('Language').value;
    const selectedGenre = document.getElementById('Genre').value;
    const narrationCheckbox = document.getElementById('narration');
    const shouldNarrate = narrationCheckbox.checked;

    animation = shouldNarrate;

    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/generate_story', true);
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            const storyTitle = response.title;
            const storyContent = response.content;
            const storyLink = response.link;

            // Redirect to the story_generation.html page with parameters
            const params = new URLSearchParams();
            params.set('storyTitle', storyTitle);
            params.set('storyContent', storyContent);
            params.set('storyLink', storyLink);
            params.set('shouldNarrate', shouldNarrate.toString());
            window.location.href = `/story_generation?${params.toString()}`;
        }
    };

    xhr.send(JSON.stringify({
        language: selectedLanguage,
        genre: selectedGenre,
        shouldNarrate: shouldNarrate.toString()
    }));

}






