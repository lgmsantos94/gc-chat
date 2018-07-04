(function ($) {

  // Toggle global-chat
  $('.global-chat').on('click', '.js-toggle-global-chat', function () {
    $(this).toggleClass('is-active');
    $('.global-chat').toggleClass('is-active');
  });



  // Toggle chat sidebar list
  $('.chat-sidebar').on('click', '.js-toggle-chat-sidebar-list', function () {
    $(this).toggleClass('is-active').next('.chat-sidebar__list').slideToggle(250);
  });



  // Toggle chat sidebar width
  $('.chat-sidebar').on('click', '.js-toggle-chat-sidebar-width', function () {
    $('.chat-sidebar').toggleClass('is-open');
  });



  // Add chat to dock
  $('.chat-sidebar').on('click', '.js-add-chat-dock-item', function () {
    var $dock = $('.chat-dock__container');

    if ($('.chat-item').length === 5) {
      var $first_item = $dock.children('.chat-item').first();
      if ($first_item.hasClass('chat-item--lobby')) {
        $first_item.next().remove();
      } else {
        $first_item.remove();
      }
    }

    var path = 'templates/' + $(this).data('type') + '.html';
    $.get(path, function (data) {
      $dock.append(data);
    });
  });



  // Toggle chat dock window
  $('.chat-dock').on('click', '.js-toggle-chat-dock-window', function () {
    var $chat_item   = $(this).closest('.chat-item');
    var $chat_avatar = $chat_item.find('.chat-item__avatar .avatar');

    // Remove notification dot
    if ($chat_avatar.hasClass('avatar--notification')) {
      $chat_avatar.removeClass('avatar--notification');
    }

    $chat_item.toggleClass('is-open');
  });



  // Close chat dock conversation
  $('.chat-dock').on('click', '.js-close-chat-dock-item', function () {
    $(this).closest('.chat-item').remove();
  });



  // Send chat message with "Enter" and create a newline with "Shift+Enter"
  $('.chat-dock').on('keypress', '.chat-item__input', function (e) {
    if (e.which === 13 && !e.shiftKey) {
      $(this).closest('form')[0].reset(); // Clear form because there is no submit implementation
      e.preventDefault();
      return false;
    }
  });


  // Demo
  $('.js-demo-toggle-bg').click(function () {
    $('body').toggleClass('has-bg');
  });

  $('.js-demo-enter-lobby').click(function () {
    var $dock = $('.chat-dock__container');
    var $first_item = $dock.children('.chat-item').first();

    if ($first_item.hasClass('chat-item--lobby')) {
      return;
    }

    if ($('.chat-item').length === 5) {
      $first_item.remove();
    }

    $.get('templates/lobby.html', function (data) {
      $dock.prepend(data);
    });
  });

})(jQuery);
