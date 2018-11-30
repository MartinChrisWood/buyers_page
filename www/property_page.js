// NOTE TO SELF;  RETURNED JSON OBJECTS ARE NOT FLAT!!!

// Assigns a html element to a variable for convenience
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

// This url needs to change dependent on the url by which this page is called
url = 'http://127.0.0.1:8080/properties/1'

var request = createCORSRequest('GET', url);
if (!request) {
  throw new Error('CORS not supported');
}

request.onload = function () {
	// Begin accessing JSON data here
	var data = JSON.parse(this.response);
	
		// Check response code!
	if (request.status >= 200 && request.status < 400) {
		
		// Log each property's title
		console.log(data);
		//console.log(data.title);
		//console.log(data.description);
		
	} else {
		console.log('error');
	}
};

// Send request
request.send();
