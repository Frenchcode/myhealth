/* global $ */
$(document).ready(function () {
    let $searchWidget = $('#search_widget');
    let $searchBox    = $searchWidget.find('input[type=text]');
    let searchURL     = $searchWidget.attr('data-search-controller-url');
    let $clearButton  = $searchWidget.find('i.clear');

    $.widget('prestashop.psBlockSearchAutocomplete', $.ui.autocomplete, {
        _renderItem: function (ul, product) {
            let image = (product.cover) ? product.cover : prestashop.urls.no_picture_image;
            let $img = $('<img class="autocomplete-thumbnail" src="'+image.bySize.small_default.url+'">');
            return $("<li>")
                .append($("<a>")
                    .append($img)
                    .append($("<span>").html(product.name).addClass("product"))
                ).appendTo(ul)
                ;
        }
    });

    let isMobile = function() {
        return $(window).width() < 768;
    };
    let autocompletePosition = function() {
        return {
            my: 'right top',
            at: 'right bottom',
            of: isMobile() ? '.header-top' : '#search_widget',
        };
    };

    $searchBox.psBlockSearchAutocomplete({
        position: autocompletePosition(),
        source: function (query, response) {
            $.post(searchURL, {
                s: query.term,
                resultsPerPage: 10
            }, null, 'json')
                .then(function (resp) {
                    response(resp.products);
                })
                .fail(response);
        },
        select: function (event, ui) {
            let url = ui.item.url;
            window.location.href = url;
        },
    }).psBlockSearchAutocomplete("widget").addClass('searchbar-autocomplete');

    $(window).resize(function() {
        $searchBox.psBlockSearchAutocomplete({
            position: autocompletePosition(),
        });
        $searchBox.keyup();
    });

    $clearButton.click(function() {
        $searchBox.val("");
        $clearButton.hide();
    });

    $searchBox.keyup(function() {
        $clearButton.toggle($searchBox.val() !== "" && isMobile());
    });
});

// Get the elements
const searchContainer = document.querySelector('.search-container');
const searchIcon = document.getElementById('search-icon');
const closeIcon = document.getElementById('close-icon');
const searchInput = document.getElementById('search-input');


// Open the search input when search icon is clicked
searchIcon.addEventListener('click', () => {
    searchContainer.classList.add('active');
    searchInput.focus(); // Focus the input
});

// Close the search input when close icon is clicked
closeIcon.addEventListener('click', () => {
    searchContainer.classList.remove('active');
    searchInput.value = ''; // Optional: clear the input field when closed
});

// Close the search input when clicking outside the container
document.addEventListener('click', (e) => {
    if (!searchContainer.contains(e.target)) {
        searchContainer.classList.remove('active');
    }
});