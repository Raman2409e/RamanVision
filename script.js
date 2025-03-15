$(window).on('load', function () {
    $('.loader').addClass('loaded');
    $('.loader__content').addClass('fade-out');

    // Load continue watching list from local storage
    var continueList = JSON.parse(localStorage.getItem('continueList')) || [];
    continueList.forEach(function(item) {
        $('.continue-list').append(item);
    });

    // Ensure only the latest three items are shown
    if ($('.continue-list li').length > 3) {
        $('.continue-list li').slice(3).remove();
    }
});

// Stop video when modal is closed and save current time
$('.modal').on('hidden.bs.modal', function () {
    var $video = $(this).find('video')[0];
    if ($video) {
        var currentTime = $video.currentTime;
        $video.pause();
        $video.currentTime = 0;

        // Update continue-info with the current time
        var minutes = Math.floor(currentTime / 60);
        var seconds = Math.floor(currentTime % 60);
        var timeString = minutes + 'min ' + seconds + 'sec';
        var modalId = $(this).attr('id');
        var $continueItem = $('.continue-list .fa-play-circle[data-target="#' + modalId + '"]').closest('li');

        if ($continueItem.length) {
            $continueItem.find('.continue-info p:nth-child(2)').text(timeString);
        } else {
            var movieTitle = $(this).find('.modal-title').text().replace('Watching ', '');
            var movieImage = getDefaultImage(movieTitle); // Use a default image if poster is not available
            var newItem = `
                <li>
                    <img src="${movieImage}" alt="${movieTitle}">
                    <div class="continue-info">
                        <p>${movieTitle}</p>
                        <p>${timeString}</p>
                    </div>
                    <i class="fa fa-play-circle" data-target="#${modalId}"></i>
                </li>
            `; 
            $('.continue-list').prepend(newItem);

            // Ensure only the latest three items are shown
            if ($('.continue-list li').length > 3) {
                $('.continue-list li').last().remove();
            }

            // Save continue watching list to local storage
            var continueList = [];
            $('.continue-list li').each(function() {
                continueList.push($(this).prop('outerHTML'));
            });
            localStorage.setItem('continueList', JSON.stringify(continueList));
        }
    }
});

// Function to get default image based on movie title
function getDefaultImage(title) {
    var images = {
        'Scooby-doo': './images/Scooby-doo.jpg',
        'Tom and Jerry': './images/tom-and-jerry.jpg',
        'Suzume': './images/suzume.jpg',
        // Correct image for Kung Fu Panda
        'Kung fu Panda':'./images/default.jpg'
        
    };
    return images[title] || './images/default.jpg';
}

// Open modal of searched movie
$('#searchButton').on('click', function () {
    var searchQuery = $('#searchInput').val().toLowerCase();
    var modals = {
        'scooby-doo': '#yourNameModal',
        'tom and jerry': '#tomAndJerryModal',
        'suzume': '#exampleModal',
        'kung fu panda': '#kungFuPandaModal',
        'avengers endgame': '#ae'
    };
    if (modals[searchQuery]) {
        $(modals[searchQuery]).modal('show');
    } else {
        alert('Movie not found');
    }
});

// Continue watching from specified time
$(document).on('click', '.continue-list .fa-play-circle', function () {
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
    $modal.modal('show');
});

// Start featured video from the beginning
$('.featured .btn').on('click', function () {
    var $modal = $($(this).data('target'));
    var $video = $modal.find('video')[0];
    $modal.on('shown.bs.modal', function () {
        $video.currentTime = 0;
        $video.play();
    });
    $modal.modal('show');
});

// Start suggestions video from the beginning
$('.suggestions .btn').on('click', function () {
    var $modal = $($(this).data('target'));
    var $video = $modal.find('video')[0];
    $modal.on('shown.bs.modal', function () {
        $video.currentTime = 0;
        $video.play();
    });
    $modal.modal('show');
});

$(document).ready(function () {
    // Load continue watching list from local storage
    var continueList = JSON.parse(localStorage.getItem('continueList')) || [];
    $('#continueList').empty();
    continueList.forEach(function (item) {
        $('#continueList').append(item);
    });
});