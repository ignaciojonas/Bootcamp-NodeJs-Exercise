$(function () {
  $('#save').click(function(){
    if ($(this).hasClass('disabled')) return;
    var content = $('#editor').val();
    $.ajax({
      url:         '/doc/' + window.docId,
      type:        'PUT',
      contentType: 'application/json',
      data: JSON.stringify({
        content: content
      })
    }).done(function () {
      $('#save').addClass('disabled');
    });
  });
  $('#editor').bind('input propertychange', function(){
    $('#save').removeClass('disabled');
  });
});