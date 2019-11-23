$(function () {

  function buildHTML(message) {
    image = (message.image) ? `<img class= "lower-message__image" src=${message.image} >` : "";
      var html =
        `<div class="message" data-message-id= "${message.id}">
            <div class="upper-message">
              <div class="upper-message__user-name">
                ${message.user_name}
              </div>
              <div class="upper-message__date">
                ${message.date}
              </div>
            </div>
            <div class="lower-message">
              <p class="lower-message__content">
                ${message.content}
              </p>
            </div>
            ${image}
          </div>`
    return html;
  }

  // function scrollBottom() {
  //   var target = $('.message').last();
  //   var position = target.offset().top + $('.messages').scrollTop();
  //   $('.messages').animate({
  //     scrollTop: position
  //   }, 300, 'swing');
  // }

$('#new_message').on('submit', function (e) {
  e.preventDefault();
  var message = new FormData(this);
  var url = $(this).attr('action');
  
  $.ajax({
    url: url,
    type: "POST",
    data: message,
    dataType: 'json',
    processData: false,
    contentType: false
  })
  .done(function(data) {
    let html = buildHTML(data);
    $('.messages').append(html);
    $(".form__submit").prop('disabled', false);
    $('#new_message')[0].reset();
    // scrollBottom();
    $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight }, 'fast');
  })
    .fail(function(){
      alert("メッセージ送信に失敗しました");
    });
});
});


 