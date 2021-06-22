// Initialiser function to create multiple instances of each module
const initialiser = (settings, Module) => {
  if (!settings || !settings.selector) return false;

  const elements = document.querySelectorAll(settings.selector);

  if (!elements || !elements.length) return false;

  const instances = [...elements].map((element) => {
    const instance = new Module({ element, settings });
    instance.init();
    return instance;
  });

  return instances;
};

export default initialiser;
