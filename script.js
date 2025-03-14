$(window).on('load', function () {
    $('.loader').addClass('loaded');
    $('.loader__content').addClass('fade-out');
});

// Stop video when modal is closed
$('.modal').on('hidden.bs.modal', function () {
    var $video = $(this).find('video')[0];
    if ($video) {
        $video.pause();
        $video.currentTime = 0;
    }
});

// Open modal of searched movie
$('#searchButton').on('click', function () {
    var searchQuery = $('#searchInput').val().toLowerCase();
    var modals = {
        'your name': '#yourNameModal',
        'tom and jerry': '#tomAndJerryModal',
        'suzume': '#exampleModal',
        'kung fu panda': '#kungFuPandaModal'
    };
    if (modals[searchQuery]) {
        $(modals[searchQuery]).modal('show');
    } else {
        alert('Movie not found');
    }
});

// Continue watching from specified time
$('.continue-list .fa-play-circle').on('click', function () {
    var $modal = $($(this).data('target'));
    var $video = $modal.find('video')[0];
    var time = $(this).siblings('.continue-info').find('p:nth-child(2)').text();
    var timeParts = time.split('min');
    var minutes = parseInt(timeParts[0]);
    var seconds = parseInt(timeParts[1].replace('sec', '').trim());
    var startTime = (minutes * 60) + seconds;
    $modal.on('shown.bs.modal', function () {
        $video.currentTime = startTime;
        $video.play();
    });
});