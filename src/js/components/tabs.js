/**
 * Tab Component
 */

// Import utilities
import initialiser from '../initialiser.js';

class Tabs {
  constructor(config) {
    const { element, settings } = config;

    // Set module dom elements
    this.container = element;
    this.containerDataId = element.dataset.tabgroup;
    this.tabsBtns = [...element.querySelectorAll(settings.tabBtn)];
    this.tabsPanels = [...element.querySelectorAll(settings.tabPanel)];
    this.activeClass = settings.activeClass;
    this.hiddenClass = settings.hiddenClass;
  }

  // Initialisation Function
  init = () => {
    if (
      !this.container ||
      !this.tabsBtns ||
      !this.tabsBtns.length ||
      !this.tabsPanels ||
      !this.tabsPanels.length
    )
      return;

    window.addEventListener('load', this.handlePageLoad);

    this.tabsBtns.forEach((btn) => {
      btn.addEventListener('click', this.handleTabChange);
      btn.addEventListener('keydown', this.handleKeyPress);
    });
  };

  handlePageLoad = () => {
    const panelId = this.getPanelId();

    const selectedTab = this.tabsBtns.find(
      (tab) => tab.getAttribute('href') === panelId
    );

    this.setActiveTab(selectedTab);
    this.setActiveTabPanel(panelId);
    this.removeFocus();
  };

  removeFocus = () => {
    const activeTab = this.getCurrentActiveTab();
    activeTab.blur();
  };

  handleTabChange = (e) => {
    e.preventDefault();
    const panelId = e.target.getAttribute('href');
    this.setActiveTab(e.target);
    this.setActiveTabPanel(panelId);
    this.storeTabState(this.containerDataId, panelId);
  };

  handleKeyPress = (e) => {
    const LEFT_ARROW = 37;
    const UP_ARROW = 38;
    const RIGHT_ARROW = 39;
    const DOWN_ARROW = 40;
    const TAB = 9;
    const activeTab = this.getCurrentActiveTab();
    const activeTabPanel = this.getCurrentActiveTabPanel();

    switch (e.keyCode) {
      case LEFT_ARROW:
      case DOWN_ARROW:
        e.preventDefault();
        let previous = this.tabsBtns.indexOf(activeTab) - 1;
        previous = previous >= 0 ? previous : this.tabsBtns.length - 1;
        this.setActiveTab(this.tabsBtns[previous]);
        this.setActiveTabPanel(this.tabsBtns[previous].getAttribute('href'));
        break;

      case RIGHT_ARROW:
      case UP_ARROW:
        e.preventDefault();
        let next = this.tabsBtns.indexOf(activeTab) + 1;
        next = next < this.tabsBtns.length ? next : 0;
        this.setActiveTab(this.tabsBtns[next]);
        this.setActiveTabPanel(this.tabsBtns[next].getAttribute('href'));
        break;

      case TAB:
        e.preventDefault();
        activeTabPanel.focus();
        break;
    }
  };

  getPanelId = () => {
    let panelId;

    if (location.hash && location.hash.includes(this.containerDataId)) {
      panelId = location.hash;
    } else {
      panelId =
        sessionStorage.getItem(this.containerDataId) ||
        `#${this.getCurrentActiveTabPanel().id}`;
    }

    return panelId;
  };

  resetCurrentlyActiveTab = () => {
    const currentActiveTab = this.getCurrentActiveTab();

    if (currentActiveTab) {
      currentActiveTab.parentElement.classList.remove(this.activeClass);
      currentActiveTab.setAttribute('aria-selected', false);
      currentActiveTab.setAttribute('tabindex', -1);
    }
  };

  resetCurrentlyActiveTabPanel = () => {
    const currentActiveTabPanel = this.getCurrentActiveTabPanel();

    if (currentActiveTabPanel) {
      currentActiveTabPanel.classList.add(this.hiddenClass);
      currentActiveTabPanel.setAttribute('aria-hidden', true);
      currentActiveTabPanel.setAttribute('tabindex', -1);
    }
  };

  setActiveTab = (tab) => {
    this.resetCurrentlyActiveTab();
    tab.parentElement.classList.add(this.activeClass);
    tab.setAttribute('aria-selected', true);
    tab.setAttribute('tabindex', 0);
    tab.focus();
  };

  setActiveTabPanel = (panelId) => {
    this.resetCurrentlyActiveTabPanel();
    const panelTobeActivated = this.container.querySelector(panelId);
    panelTobeActivated.classList.remove(this.hiddenClass);
    panelTobeActivated.setAttribute('aria-hidden', false);
    panelTobeActivated.setAttribute('tabindex', 0);
  };

  storeTabState = (key, panelId) => {
    sessionStorage.setItem(key, panelId);
  };

  getCurrentActiveTabPanel = () => {
    const currentActiveTabPanel = this.tabsPanels.find(
      (panel) => !panel.classList.contains(this.hiddenClass)
    );

    return currentActiveTabPanel;
  };

  getCurrentActiveTab = () => {
    const currentActiveTab = this.tabsBtns.find((tab) =>
      tab.parentElement.classList.contains(this.activeClass)
    );

    return currentActiveTab;
  };
}

export default (settings) => initialiser(settings, Tabs);
