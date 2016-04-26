$(function(){ //
  var md = markdownit('commonmark', {});
  $('.markdown').each(function(){
    $(this).html(md.render('\n\n' + $(this).html()));
  });
});