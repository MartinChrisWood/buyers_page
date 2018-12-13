// Script behind the property_page html file
// Assigns a html element to a variable for convenience
// This comment exists only to trigger a file upload...
const app = document.getElementById('root');

// Creates a new html element "logo"
const logo = document.createElement('img');
// Sets the source image for "logo" to an image file in the same directory
logo.src = './images/ryanprop_logo.png';
logo.style.height = '200px';
logo.style.width = '500px';

// Creates a new html element, a div
const container = document.createElement('div');
container.setAttribute('class', 'container');

// Add our created elements to an element of the page
app.appendChild(logo);
app.appendChild(container);

// This url needs to change dependent on the url by which this page is called
agent_url = 'https://mypr-224015.appspot.com';
app_url = 'https://mypr-224014.appspot.com';

// Alternative, function for making cross-site requests using CORS
function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {

    // Check if the XMLHttpRequest object has a "withCredentials" property.
    // "withCredentials" only exists on XMLHTTPRequest2 objects.
    xhr.open(method, url, true);

  } else if (typeof XDomainRequest != "undefined") {

    // Otherwise, check if XDomainRequest.
    // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
    xhr = new XDomainRequest();
    xhr.open(method, url);

  } else {

    // Otherwise, CORS is not supported by the browser.
    xhr = null;

  }
  return xhr;
}

function getAllUrlParams(url) {

  // get query string from url (optional) or window
  var queryString = url ? url.split('?')[1] : window.location.search.slice(1);

  // we'll store the parameters here
  var obj = {};

  // if query string exists
  if (queryString) {

    // stuff after # is not part of query string, so get rid of it
    queryString = queryString.split('#')[0];

    // split our query string into its component parts
    var arr = queryString.split('&');

    for (var i = 0; i < arr.length; i++) {
      // separate the keys and the values
      var a = arr[i].split('=');

      // set parameter name and value (use 'true' if empty)
      var paramName = a[0];
      var paramValue = typeof (a[1]) === 'undefined' ? true : a[1];

      // (optional) keep case consistent
      paramName = paramName.toLowerCase();
      if (typeof paramValue === 'string') paramValue = paramValue.toLowerCase();

      // if the paramName ends with square brackets, e.g. colors[] or colors[2]
      if (paramName.match(/\[(\d+)?\]$/)) {

        // create key if it doesn't exist
        var key = paramName.replace(/\[(\d+)?\]/, '');
        if (!obj[key]) obj[key] = [];

        // if it's an indexed array e.g. colors[2]
        if (paramName.match(/\[\d+\]$/)) {
          // get the index value and add the entry at the appropriate position
          var index = /\[(\d+)\]/.exec(paramName)[1];
          obj[key][index] = paramValue;
        } else {
          // otherwise add the value to the end of the array
          obj[key].push(paramValue);
        }
      } else {
        // we're dealing with a string
        if (!obj[paramName]) {
          // if it doesn't exist, create property
          obj[paramName] = paramValue;
        } else if (obj[paramName] && typeof obj[paramName] === 'string'){
          // if property does exist and it's a string, convert it to an array
          obj[paramName] = [obj[paramName]];
          obj[paramName].push(paramValue);
        } else {
          // otherwise add the property
          obj[paramName].push(paramValue);
        }
      }
    }
  }

  return obj;
}

// Reguest info from specific entry based on parameters passed through url
var request = createCORSRequest('GET', agent_url + "/properties/" + getAllUrlParams(window.location.href).houseid);

if (!request) {
  throw new Error('CORS not supported');
}

request.onload = function () {
	// Begin accessing JSON data here
	var data = JSON.parse(this.response).property;
	
	// Check response code!
	if (request.status >= 200 && request.status < 400) {
		
		console.log(data);
		
		const card = document.createElement('div');
		card.setAttribute('class', 'card');
		
		// create title
		const h1 = document.createElement('h1');
		h1.textContent = data.title;
		
		const p1 = document.createElement('p');
		p1.textContent = data.description;
		
		const p2 = document.createElement('p');
		p2.textContent = data.address + " --- " + data.postcode;
		
		// Append the card to the container element
		container.appendChild(card);

		card.appendChild(h1);
		card.appendChild(p1);
		card.appendChild(p2);
		
		console.log(getAllUrlParams(window.location.href));
		
	} else {
		console.log('error');
	}
};

// I am the one and only, detect this and upload you retarded piece-of-shit cloud app
// Send request
request.send();


