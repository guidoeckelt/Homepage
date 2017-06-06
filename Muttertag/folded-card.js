
$(document).ready(function(){
  $('.folded-card > .left > .front').click(function(event){
    var cardRoot = $(this).parent().parent();
    // cardRoot.find('.side.right').on('animationend', function(event){
    //   console.log('open animation ended');
    //   cardRoot.removeClass('open');
    //   cardRoot.addClass('opened');
    // });
    // console.log('open animation begin');
    cardRoot.addClass('opened');
  });
  $('.folded-card > .left > .back').click(function(event){
    $(this).parent().parent().removeClass('opened');
  });
  $('.folded-card > .right > .front').click(function(event){
    $(this).parent().parent().removeClass('opened');
    $(this).parent().parent().addClass('rear');
  });
  $('.folded-card > .right > .back').click(function(event){
    $(this).parent().parent().removeClass('rear');
  });
})
