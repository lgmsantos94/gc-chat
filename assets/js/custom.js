(function ($) {

  // Toggle global-chat
  $('.c-global-chat').on('click', '.js-toggle-chat-sidebar', function () {
    $(this).toggleClass('is-active');
    $('.c-global-chat, .c-chat-sidebar').toggleClass('is-active');
  });



  // Toggle chat sidebar friend-list
  $('.c-chat-sidebar').on('click', '.js-toggle-chat-friend-list', function () {
    $(this).toggleClass('is-toggled').next('.c-chat-friend-list').slideToggle(250);
  });



  // Toggle chat sidebar width
  $('.c-chat-sidebar').on('click', '.js-toggle-chat-sidebar-width', function () {
    $('.c-chat-sidebar').toggleClass('is-open');
  });



  // Add chat to dock
  $('.c-chat-sidebar').on('click', '.js-add-chat-dock-window', function () {
    var $dockContainer = $('.c-chat-dock-container');

    if ($('.c-chat-window').length === 5) {
      var $firstWindow = $dockContainer.children('.c-chat-window').first();
      $firstWindow.hasClass('m-chat-window-lobby')
        ? $firstWindow.next().remove()
        : $firstWindow.remove();
    }

    var path = 'templates/window-' + $(this).data('type') + '.html';
    $.get(path, function (data) {
      $dockContainer.append(data);
    });
  });



  // Toggle chat dock window
  $('.c-chat-dock').on('click', '.js-toggle-chat-window', function () {
    var $chatWindow = $(this).closest('.c-chat-window');
    var $chatAvatar = $chatWindow.find('.c-chat-window-avatar .c-avatar');

    // Remove notification dot
    if ($chatAvatar.hasClass('m-avatar-badge')) {
      $chatAvatar.removeClass('m-avatar-badge');
    }

    $chatWindow.toggleClass('is-open');
  });



  // Close chat dock conversation
  $('.c-chat-dock').on('click', '.js-close-chat-window', function () {
    $(this).closest('.c-chat-window').fadeOut(50, function () {
      $(this).remove();
    });
  });



  // Send chat message with "Enter" and create a newline with "Shift+Enter"
  $('.c-chat-dock').on('keypress', '.c-chat-window-input', function (e) {
    if (e.which === 13 && !e.shiftKey) {
      $(this).closest('form')[0].reset(); // Clear form because there is no submit implementation
      e.preventDefault();
      return false;
    }
  });


  // Demo
  // -----------------------------------------------

  $('.js-demo-toggle-bg').click(function () {
    $('body').toggleClass('has-bg');
  });

  $('.js-demo-enter-lobby').click(function () {
    var $dockContainer = $('.c-chat-dock-container');
    var $firstItem = $dockContainer.children('.c-chat-window').first();

    if ($firstItem.hasClass('m-chat-window-lobby')) {
      return;
    }

    if ($('.c-chat-window').length === 5) {
      $firstItem.remove();
    }

    $.get('templates/window-lobby.html', function (data) {
      $dockContainer.prepend(data);
    });
  });

})(jQuery);
