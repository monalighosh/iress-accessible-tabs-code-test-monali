const showNotification = () => {
  let counter = 0;
  let notificationBanner = document.querySelector('.js-notification');

  const handleNotification = (e) => {
    const TAB = 9;
    if (counter === 1) return;

    if (e.keyCode == TAB) {
      counter++;
      notificationBanner.classList.add('is-visible');
    }
  };

  document.body.addEventListener('keydown', handleNotification);
};

export default showNotification;
