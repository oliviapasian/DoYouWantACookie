
//Most of the doc was done in css but there are a few poorly written javascript functions here to supplement lol
//Ths file primarily handles the transiitons in the introduction and timings as well as the cookies 

// references:
// // https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie (for document.cookie)
// // source for scroll animations: https://css-tricks.com/books/greatest-css-tricks/scroll-animation/ 
// // https://www.w3schools.com/howto/howto_js_tabs.asp (tabs used in tutorial)


let buttonContainer;
let collectedTime = '';

let delayScroll = 10000;

//joke array for the joke cookies :)
let jokes = [
  "Why couldn't the bicycle stand up by itself? It was two tired.",
  "How does a penguin build its house? Igloos it together.",
  "Why did the scarecrow win an award? Because he was outstanding in his field.",
  "I don't trust stairs. They're always up to something.",
  "I only know 25 letters of the alphabet. I don't know y.",
  "I used to play piano by ear, but now I use my hands.",
  "I’m reading a book on anti-gravity. It’s impossible to put down.",
  "I'm afraid for the calendar. Its days are numbered.",
  "What do you call a fish wearing a bowtie? Sofishticated.",
  "What’s orange and sounds like a parrot? A carrot!",
  "What do you call a pile of cats? A meow-ntain.",
  "What do you call a fish without an eye? Fsh.",
  "How do you organize a space party? You planet.",
  "Where do roses sleep at night? In their flowerbed.",
  "What’s a ballerina’s favorite number? Two-two."
];


function setup() {
  noCanvas();

  //making and styling button in intro for accepting "privacy policy"
  buttonContainer = document.getElementById('buttonContainer');

  let acceptButton = createButton('I AGREE');
  acceptButton.parent(buttonContainer);
  acceptButton.mousePressed(startDoc);
  acceptButton.style('background-color', '#bee85d');
  acceptButton.style('border', '2px solid #020d29');
  acceptButton.style('border-radius', '25px');
  acceptButton.style('font-family', 'barlow');
  acceptButton.style('font-size', '22px');
  acceptButton.style('font-weight', 'bold');
  acceptButton.style('padding', '10px');
  acceptButton.style('color', '#020d29');
  acceptButton.style('margin-top', '-10px');

  //populate with other informational cookies
  infoCookies();
}

function draw() {
  //empty since I'm not using p5's canvas
}

//prevent scrolling past intro intially
document.body.style.overflow = 'hidden';
setTimeout(() => {
  document.body.style.overflow = 'auto'; 
}, delayScroll);


function startDoc() {
  let currentTime = getTime();

  //cookie for the first button click to get time they arrived on site
  document.cookie = `Arrival=${currentTime}; path=/; max-age=3600`; // cookie expires in 1 hour
  console.log('cookie collected:', currentTime);

  collectedTime = currentTime;

  buttonContainer.classList.add("fadeout");

  let areYouSureText = document.getElementById('areYouSureText');
  areYouSureText.classList.add('fadeInOut');

  areYouSureText.addEventListener('animationend', () => {
    let collectedTimeText = document.getElementById('collectedTimeText');
    collectedTimeText.insertAdjacentHTML('beforeend', `<p id="introCookieColor"><b>You came onto the website at this time: <br> ${collectedTime}</b></p> <p>Wonder what else you agreed to...?</p>`);
    collectedTimeText.classList.add('fadeIn');

    collectedTimeText.addEventListener('animationend', () => {
      let introEnd = document.querySelector('.introduction');
      introEnd.classList.add('fadeout');

    }, { once: true });
  }, { once: true });
}

//getting formatted EST time
function getTime() {
  let timeOptions = {
    timeZone: 'America/New_York',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  };
  let formatter = new Intl.DateTimeFormat('en-US', timeOptions);
  return formatter.format(new Date());
}

function infoCookies(){
  let fact1 = `Fact 1 (open me!)`;  
  document.cookie = `${fact1}=${'A cookie cannot retrieve any other data from the user’s hard drive or transmit computer viruses or acquire email addresses. Each cookie is unique to the user’s web browser.'}; path=/; max-age=3600`;

  let fact2 = `Fact 2 (open me!)`;
  document.cookie = `${fact2}=${'The General Data Protection Regulation (GDPR) is a European law that protects the privacy and security of personal data. It has been in effect since May 25, 2018. The EU has promised to impose hefty penalties on organizations that fall short of GDPR compliance, which led to other regions creating similar laws and most websites incorporating privacy policy pop-ups out of caution.'}; path=/; max-age=3600`;

  let fact3 = `Fact 3 (open me!)`;
  document.cookie = `${fact3}=${'Some other things you can do to protect your information from malicious cookies are: Accept only necessary cookies, clear your browser cache regularly, delete cookies saved in your browser to protect you from unsecured or unknown websites, and ensure the websites on which you must accept cookies use an HTTPS domain and include a padlock in front of the URL.'}; path=/; max-age=3600`;
}

//selecting a random joke from the array and adding it as a new document.cookie
function randomJokeCookie() {
  let randomIndex = Math.floor(Math.random() * jokes.length);
  let randomJoke = jokes[randomIndex];
  let cookieTime = new Date().getTime();
  let cookieName = `Joke_${cookieTime}`;

  document.cookie = `${cookieName}=${randomJoke}; max-age=1200; path=/`; //every 20 mins they expire
  console.log('a joke cookie was added!');
}


//add a new joke cookie every 2min
setInterval(randomJokeCookie, 120000); // 120000ms = 2min


//for the scroll effects in the doc (this was from a source in references at start of file)
window.addEventListener('scroll', () => {
  document.body.style.setProperty('--scroll', window.scrollY / (document.body.offsetHeight - window.innerHeight));
}, false);


// tabs for cookie tutorial (template from W3Schools, linked at start of file)
document.getElementById("defaultOpen").click();

function openTab(evt, tabName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
}