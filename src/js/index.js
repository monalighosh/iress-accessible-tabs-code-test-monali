// Import modules
import Tabs from './components/tabs.js';

// Import utilities
import showNotification from './showNotification.js';

Tabs({
  selector: '.js-tabs',
  tabBtn: '.js-tabs-nav-tab',
  tabPanel: '.js-tabs-panel',
  activeClass: 'is-active',
  hiddenClass: 'is-hidden',
});

showNotification();
