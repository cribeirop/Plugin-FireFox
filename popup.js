const getLinks = () => {
    const elementsToCheck = ["link", "img", "script", "iframe", "source", "embed"];
    const selector = elementsToCheck.join(",");
    const elementsFound = document.querySelectorAll(selector);
    const urls = Array.from(elementsFound).map((element) => element.href || element.src);
    
    return { urls: urls, count: urls.length, };
  };
  
  browser.runtime.onMessage.addListener((request, _, sendResponse) => {
    if (request.method === "localStorage") {
      sendResponse({ data: Object.entries(content), });
    } else if (request.method === "existingTabs") {
      sendResponse({ data: Object.entries(getLinks()), });
    }
    return true;
  });
  