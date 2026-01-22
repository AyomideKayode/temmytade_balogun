export const addEventOnElements = (elements, eventType, callback) => {
  elements.forEach((element) => {
    element.addEventListener(eventType, callback);
  });
};

export const initPreloader = () => {
  const loadingElement = document.querySelector('[data-loading]');
  if (!loadingElement) return;

  const handleLoad = () => {
    loadingElement.classList.add('loaded');
    document.body.classList.remove('active');
  };

  if (document.readyState === 'complete') {
    handleLoad();
  } else {
    window.addEventListener('load', handleLoad);
  }
};
