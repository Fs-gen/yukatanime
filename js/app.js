let audio;
let playlist;
let tracks;
let current;

$(document).ready(function() {
    $('#loading').hide();
    init();
});

function init() {
    fetch('./songs.json')
        .then(response => response.json())
        .then(json =>
            $.each(json, function(i, item) {
                $('ul').append('<li><a id="list-song" href="' + item.source + '" >' + item.title + '</a></li>')
            })
        )
    current = 0;
    audio = $('audio');
    playlist = $('#playlist');
    tracks = playlist.find('li a');
    len = tracks.length - 1;
    // audio[0].volume = .10;
    audio[0].load();
    audio[0].play();

    $('#playlist').on('click', '#list-song', function(e) {
        e.preventDefault();
        link = $(this);
        current = link.parent().index();
        $('#loading').show();
        run(link, audio[0]);
    });

    audio[0].addEventListener('ended', function(e) {

        console.log(current);
        $('#loading').show();
        if (current == len) {
            current = 0;
            link = playlist.find('a')[0];
        } else {
            link = playlist.find('a')[current];
        }
        current++;
        run($(link), audio[0]);
    });
}

function run(link, player) {
    player.src = link.attr('href');
    par = link.parent();
    par.addClass('active').siblings().removeClass('active');
    audio[0].load();
    audio[0].play();
}

function onloaded() {
    console.log('loaded');
    $('#loading').hide();
}