const existingStorageData = async (tabs) => {
  let currentTab = tabs.pop();
  const storageList = document.getElementById("localStorageList");
  
  const res = await browser.tabs.sendMessage(currentTab.id, { method: "localStorage", });
  const storageData = res.data;
  
  for (let entry of storageData) {
    let listItem = document.createElement("li");
    let content = document.createTextNode(entry[0]);
    listItem.appendChild(content);
    storageList.appendChild(listItem);
  }
};

getCurrentTab().then(existingStorageData);

const existingTabs = async (tabs) => {
  let currentTab = tabs.pop();
  const domainCountElement = document.getElementById("existingTabs");
  const domainList = document.getElementById("existingTabsList");
  
  const res = await browser.tabs.sendMessage(currentTab.id, { method: "existingTabs", });
  
  const numberOfDomains = res.data[1][1];
  const domains = res.data[0][1];
  
  let content = document.createTextNode("Domains detected: " + numberOfDomains);
  domainCountElement.appendChild(content);
  domains.forEach((domain) => {
    let listItem = document.createElement("li");
    let content = document.createTextNode(domain);
    listItem.appendChild(content);
    domainList.appendChild(listItem);
  });
};

function getCurrentTab() {
  return browser.tabs.query({ currentWindow: true, active: true, });
}

getCurrentTab().then(existingTabs);

const existingCookies = (tabs) => {
const activeTab = tabs.pop();
const tabDomain = activeTab.url.split("/")[2];

let cookieCount = 0;
  const allCookiesPromise = browser.cookies.getAll({ url: activeTab.url, });

  allCookiesPromise.then((cookies) => {
    cookieCount = cookies.length;
    const externalCookiesList = document.getElementById("externalCookies");
    const internalCookiesList = document.getElementById("internalCookies");
    const cookiesCountElement = document.getElementById("cookies");
    
    if (cookieCount > 0) {
      const countContent = document.createTextNode(
        `${cookieCount} Cookies detected`
      );
      cookiesCountElement.appendChild(countContent);

      for (const cookie of cookies) {
        const listItem = document.createElement("li");
        let cookieContent;
        
        if (cookie.session) {
          cookieContent = document.createTextNode(`Session - ${cookie.name}`);
        } else {
          cookieContent = document.createTextNode(`Navigation - ${cookie.name}`);
        }
        
        listItem.appendChild(cookieContent);
        
        const isInternalDomain =
        cookie.domain === tabDomain || cookie.domain === `.${tabDomain}` || cookie.domain === `www.${tabDomain}` || cookie.domain === `www${tabDomain}` || `www.${cookie.domain}` === tabDomain || `www${cookie.domain}` === tabDomain || `.${cookie.domain}` === tabDomain;
        if (isInternalDomain) {
          internalCookiesList.appendChild(listItem);
        } else {
          externalCookiesList.appendChild(listItem);
        }
      }
    }
  });
};

getCurrentTab().then(existingCookies);

function detectHijacks() {
  const threats = [];
  const currentHost = window.location.hostname;

  Array.from(document.getElementsByTagName('a')).forEach((a) => {
    const href = a.getAttribute('href');
    if (href && !href.startsWith('#')) {
      const url = new URL(href, window.location.href);
      const { hostname } = url;
      if (hostname !== currentHost && !threats.includes(hostname)) {
        threats.push(hostname);
      }
    }
  });

  Array.from(document.getElementsByTagName('script')).forEach((s) => {
    const src = s.getAttribute('src');
    if (src) {
      const url = new URL(src, window.location.href);
      const { hostname } = url;
      if (hostname !== currentHost && !threats.includes(hostname)) {
        threats.push(hostname);
      }
    }
  });

  const threatsList = document.getElementById('hijackingVulnList');
  threatsList.innerHTML = '';

  if (threats.length) {
    threats.forEach((hostname) => {
      const listItem = document.createElement('li');
      listItem.textContent = hostname;
      threatsList.appendChild(listItem);
    });
  } else {
    const listItem = document.createElement('li');
    listItem.textContent = 'No threats detected';
    threatsList.appendChild(listItem);
  }

  return threats;
}

window.addEventListener('DOMContentLoaded', detectHijacks);