$(function(){
  $.get('https://steamul-scheduler.azurewebsites.net/api/announcement', function(d){
    if(d.text){
      $('#messageBody').html(d.text)
      $('#popup_down').show(1500);
    }
    })
})