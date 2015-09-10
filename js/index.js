$( function() {
  // init Isotope
  var $grid = $('.grid').isotope({
    itemSelector: '.work-item',
    layoutMode: 'fitRows'
  });
  
  // bind filter button click
  $('.filters-btn-group').on( 'click', 'button', function() {
    var filterValue = $( this ).attr('data-filter');
    filterValue = filterValue.split(' ') || filterValue.split(', ');
    $grid.isotope({ filter: filterValue[0] });
  });
  
  // change is-checked class on buttons
  $('.btn-group').each( function( i, buttonGroup ) {
    var $buttonGroup = $( buttonGroup );
    $buttonGroup.on( 'click', 'button', function() {
      $buttonGroup.find('.is-checked').removeClass('is-checked');
      $( this ).addClass('is-checked');
    });
  });
  
});