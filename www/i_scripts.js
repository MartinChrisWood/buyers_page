// Script behind the home/index html file
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

// url = 'http://127.0.0.1:8080/properties'
agent_url = 'https://mypr-224015.appspot.com';
app_url = 'https://mypr-224014.appspot.com';

// Create a request variable and assign a new XMLHttpRequest Object to it.
// var request = new XMLHttpRequest();

// Open a new connection, using the GET request on the URL endpoint
// request.open('GET', 'http://127.0.0.1:8080/properties', true);

// Alternative, function for making cross-site requests using CORS
function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {
	
	// Set a request header
	//xhr.setRequestHeader('Access-Control-Allow-Origin', 'https://mypr-224015.appspot.com')
	
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

var request = createCORSRequest('GET', agent_url + '/properties');
if (!request) {
  throw new Error('CORS not supported');
}


request.onload = function () {
	// Begin accessing JSON data here
	var data = JSON.parse(this.response);
	
	// Check response code!
	if (request.status >= 200 && request.status < 400) {
		
		// Iterate through the objects in the returned JSON file
		data.properties.forEach(house => {
	
			// Log each property's title
			console.log(house.title);
			console.log(house.description);
			
			// Create a div with a card class
			const card = document.createElement('div');
			card.setAttribute('class', 'card');
			
			// Create a title (an h1, in JS speak), and set the text content to the film's title
			const h1 = document.createElement('h1');
			h1.textContent = house.title;
			
			// Create a paragraph (a p, in JS speak) and set the text content to the film's description
			const p = document.createElement('p');
			house.description = house.description.substring(0, 300);  // Limit the description to 300 characters
			p.textContent = `${house.description}...`;  // End with an ellipses - REF I DON'T KNOW WHAT THAT MEANS
			
			// Create a hyperlink to a property page
			var a = document.createElement('a');
			var linkText = document.createTextNode("Property details");
			a.appendChild(linkText);
			a.title = "Property details";
			a.href = app_url + "/property_page" + "?houseid=" + house.id;
			
			// Append the card to the container element
			container.appendChild(card);
			
			// Append the title and description (h1 and p) to the card
			card.appendChild(h1);
			card.appendChild(p);
			card.appendChild(a);
			
		});
		
	// If it's the wrong error code, report it
	} else {
		console.log('error');
	}
};

// Send request
request.send();




