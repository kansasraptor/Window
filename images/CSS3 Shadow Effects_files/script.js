// Global Variables
var rand;
var data;
var adSize;
var country;
var category;
var time;
var cookieSet;
var groupsSet;
var mandsCampaign;
var catCookie;
var prodCookie;
var products;
var prod1;
var prod2;
var prod3;
var prependParam;
var self = this;
var _jvxAd = _jvxAd || jvxAd;
var viewport = "Desktop";
var adSize = parent.layoutObj.matchLayoutDim;
var intro = document.getElementById('intro');
var mainAd = document.getElementById('main-ad');
var genericAd = document.getElementById('generic-ad');
var genericAdBg = document.getElementById('generic-bg');
var int_bg = document.getElementById('intro-bg');
var int_over = document.getElementsByClassName('intro-overlay')[0];
var lWrap = document.getElementById('logo-wrap');
var t1 = document.getElementById('t1');
var cont = document.getElementById('container');
var head = document.getElementsByTagName( "head" )[0];
var body = document.getElementsByTagName( "body" )[0];
var css = document.createElement( "link" );
var imgForError = document.createElement( "img" );
var img = document.createElement( "img" );
var hasOwnProperty = Object.prototype.hasOwnProperty;
var cMacro = parent.getParameterValue(parent.window.location.href, "cMacro"), cMacro = ((typeof cMacro !== "undefined") && cMacro != ""  && cMacro != null) ? cMacro : "";
var customCookieVal;

// Run on load
(function() {
	intro.style.opacity = "0";
	mainAd.style.opacity = "0"; // to ensure that these elementss are not visible on ad load.

	delivery = document.getElementsByClassName('p-delivery');
	for (var i = 0; i < delivery.length; i++) {
		delivery[i].style.display = "none";
	} // Do not show delivery information.

	// Find Ad Size then execute funcitons
	css.href = "style-"+adSize+".css";
	css.rel = "stylesheet";
	head.appendChild(css);

	// Waiting for stylesheet to load before executing next function
	// https://www.viget.com/articles/js-201-run-a-function-when-a-stylesheet-finishes-loading
	imgForError.onerror = function () {
		document.body.removeChild(imgForError);
	};

	body.appendChild(imgForError);
	imgForError.src = "style-"+adSize+".css";
}());

// Start Ad animation sequence
function startAd() {
	int_bg.style.opacity = "0";
	intro.style.opacity = "1";

	setTimeout(function() {
		int_bg.style.opacity = "1";
	}, 500);

	setTimeout(function() {
		int_over.className += " anim";
		t1.className = "anim";
		lWrap.className = "anim";
	}, 1e3);

	setTimeout(function() {
		intro.className = "anim";
		mainAd.style.opacity = "1";

		// Initiate UnSlider
		jQuery(document).ready(function($) {
			$('.slider').unslider({
				// nav: false,
				autoplay: true,
				arrows: true
			});
		});
	}, 2e3);
}

function isEmpty(obj) {
	// null and undefined are "empty"
	if (obj == null) return true;

	// Assume if it has a length property with a non-zero value
	// that that property is correct.
	if (obj.length > 0)    return false;
	if (obj.length === 0)  return true;

	// Otherwise, does it have any properties of its own?
	// Note that this doesn't handle
	// toString and valueOf enumeration bugs in IE < 9
	for (var key in obj) {
		if (hasOwnProperty.call(obj, key)) return false;
	}
	return true;
}

function shuffle(array) {
	var currentIndex = array.length, temporaryValue, randomIndex;

	// While there remain elements to shuffle...
	while (0 !== currentIndex) {

		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		// And swap it with the current element.
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;
}

function initiate(){
	data = jvxAd.getDynamicData();
	time = dynamicData["time:time.local-time"];

	// console.log(data);
	cookieSet = dynamicData["cookieData:cookieData.jvxdynsl-isSet"];
	groupsSet = dynamicData["cookieData:cookieData.jvxdynsl-isSet_groups"];

	mandsCampaign = mandsCampaign || self || {};
	mandsCampaign.defaults = {
		country: (function()
		{
			return (typeof ap_DataSignal1 !== "undefined") ? ap_DataSignal1 : "US";
		}()),
		adSize: parent.layoutObj.matchLayoutDim,
		category_default: "women",
	};

	// Grab correct cookie groups for Cat and Prod
	switch (self.defaults.country) {
		case "US":
			catCookie = dynamicData["cookieData:cookieData.jvxdynsl_group1"]; // Catergory Group
			prodCookie = dynamicData["cookieData:cookieData.jvxdynsl_group2"]; // Product Group
			// console.log("Accessing specific group cookie data for " + self.defaults.country);
			// console.log(catCookie);
			// console.log(prodCookie);
			break;

		case "AU":
			catCookie = dynamicData["cookieData:cookieData.jvxdynsl_group5"]; // Catergory Group
			prodCookie = dynamicData["cookieData:cookieData.jvxdynsl_group6"]; // Product Group
			// console.log("Accessing specific group cookie data for " + self.defaults.country);
			// console.log(catCookie);
			// console.log(prodCookie);
			break;

		case "CA":
			catCookie = dynamicData["cookieData:cookieData.jvxdynsl_group3"]; // Catergory Group
			prodCookie = dynamicData["cookieData:cookieData.jvxdynsl_group4"]; // Product Group
			// console.log("Accessing specific group cookie data for " + self.defaults.country);
			// console.log(catCookie);
			// console.log(prodCookie);
			break;

		case "IE":
			catCookie = dynamicData["cookieData:cookieData.jvxdynsl_group9"]; // Catergory Group
			prodCookie = dynamicData["cookieData:cookieData.jvxdynsl_group1"]; // Product Group
			// console.log("Accessing specific group cookie data for " + self.defaults.country);
			// console.log(catCookie);
			// console.log(prodCookie);
			break;

		case "NZ":
			catCookie = dynamicData["cookieData:cookieData.jvxdynsl_group7"]; // Catergory Group
			prodCookie = dynamicData["cookieData:cookieData.jvxdynsl_group8"]; // Product Group
			// console.log("Accessing specific group cookie data for " + self.defaults.country);
			// console.log(catCookie);
			// console.log(prodCookie);
			break;
	}

	if (catCookie!==undefined) {
		catSplit = catCookie.split(',');
		category = catSplit[0].match(/([\w]+)/);
	}

	if (prodCookie === undefined) {
		products = [];
	} else {
		products = prodCookie.split(',');
	}

	switch (self.defaults.country) {
		case "US":
			var women_defaults = ['T010100A', 'T383148C', 'T010321W', 'T383220', 'T014704B', 'T016228T', 'T018127Z', 'T010336A', 'T023995', 'T383306'];
			var kids_defaults = ['T711460', 'T721456B', 'T721489B', 'T721530E', 'T723678G', 'T741001G', 'T741796G', 'T742078F', 'T742102Z', 'T742121T'];
			break;

		case "AU":
			var women_defaults = ['T598606', 'T598506', 'T597202J', 'T596281W', 'T596102M', 'T436225B', 'T436298', 'T434945R', 'T434529K', 'T434293'];
			var kids_defaults = ['T785954', 'T787491G', 'T872677I', 'T873135D', 'T873160A', 'T885547D', 'T920414M', 'T924202T', 'T925409W', 'T926604B'];
			break;

		case "CA":
			var women_defaults = ['T491249', 'T491254', 'T597568J', 'T598058', 'T613601B', 'T699598J', 'T699594J', 'T699592J', 'T698692J', 'T691876J'];
			var kids_defaults = ['T879284Y', 'T879281Y', 'T879299Y', 'T881322I', 'T881534S', 'T884633A', 'T925207W', 'T926419B', 'T926624B', 'T929504J'];
			break;

		case "IE":
			var women_defaults = ['T016155V', 'T023839','T383437J', 'T410675','T417456D', 'T422982D', 'T010608U', 'T421704', 'T422962D', 'T435618', 'T493298E'];
			var kids_defaults = ['T884030A', 'T884265C', 'T884839D', 'T884875J', 'T887050D', 'T923421V', 'T929301D', 'T929511J', 'T929603J', 'T927630L'];
			break;

		case "NZ":
			var women_defaults = ['T596404', 'T596656', 'T597562J', 'T599047D', 'T599807', 'T014010E', 'T016018N', 'T019126V', 'T513609', 'T513642'];
			var kids_defaults = ['T723056W', 'T743100M', 'T743108L', 'T743374V', 'T747425J', 'T749501Z', 'T749555G', 'T749703M', 'T761030', 'T761235L'];
			break;
	}

	// Check if cookie is set
	if (cookieSet === "false" || catCookie === undefined ) {
		genericAdLoad();
		return false
	}

	// Begin Ad
	startAd();

	// Change Intro Image depending on Cat
	switch (category[0]) {
		case "kids":
			int_bg.src = "bg-intro-kids-"+adSize+".jpg";
			break;
		case "women":
			int_bg.src = "bg-intro-women-"+adSize+".jpg";
			break;

		default:
			int_bg.src = "bg-intro-women-"+adSize+".jpg";
	}

	// End CHANGE

	// Change Background Colour Depending on Time of Day
	switch (true) {
		case time > "00:00:00" && time < "05:59:59":
			container.style.backgroundColor = "#c9e7f2";
			int_over.style.backgroundColor = "#c9e7f2";
			break;

		case time > "06:00:00" && time < "11:59:59":
			container.style.backgroundColor = "#FFF";
			int_over.style.backgroundColor = "#FFF";
			break;

		case time > "12:00:00" && time < "16:59:59":
			container.style.backgroundColor = "#f9e0e3";
			int_over.style.backgroundColor = "#f9e0e3";
			break;

		case time > "17:00:00" && time < "23:59:59":
			container.style.backgroundColor = "#ddd5be";
			int_over.style.backgroundColor = "#ddd5be";
			break;
	}
	// END COLOUR CHANGE

	// Fire Trackers
	impTrackers();


	// Build Ad
	switch (true) {
		case products.length === 0:
			// console.log("0 products - so 3 picked from " +category[0]+ " category");

			if (category[0] === "women" || category[0] === '7B') {
				shuffle(women_defaults);
				prod1 = women_defaults[0];
				prod2 = women_defaults[1];
				prod3 = women_defaults[2];

			} else {
				shuffle(kids_defaults);
				prod1 = kids_defaults[0];
				prod2 = kids_defaults[1];
				prod3 = kids_defaults[2];
			}

			break;

		case products.length === 1:
			prod1 = prodCookie;
			// console.log("Only 1 product - Get 2 from " + category[0] + " defaults");

			if (category[0] === "women" || category[0] === '7B') {
				shuffle(women_defaults);
				prod2 = women_defaults[0];
				prod3 = women_defaults[1];
			} else {
				shuffle(kids_defaults);
				prod2 = kids_defaults[0];
				prod3 = kids_defaults[1];
			}
			break;

		case products.length === 2:
			prod1 = products[0];
			prod2 = products[1];
			// console.log("Only 2 products - Get 1 from " + category[0] + " defaults");

			if (category[0] === "women" || category[0] === '7B') {
				shuffle(women_defaults);
				prod3 = women_defaults[0];
			} else {
				shuffle(kids_defaults);
				prod3 = kids_defaults[0];
			}
			break;

		case products.length >= 3:
			threeProducts = products.slice(0,3);
			prod1 = threeProducts[0];
			prod2 = threeProducts[1];
			prod3 = threeProducts[2];
			// console.log("We got 3 product cookies so show 3 products BOOM");

			break;
	}

	console.log("Product 1 = " + prod1);
	console.log("Product 2 = " + prod2);
	console.log("Product 3 = " + prod3);

	//jvxAd.recordEventByName(prod1, 0);
	//jvxAd.recordEventByName(prod2, 0);
	//jvxAd.recordEventByName(prod3, 0);

	// Code added to fire product impressions for reporting
	var prod1Tracker = new Image();
	prod1Tracker.src = "//evs.jivox.com/jivox/serverAPIs/saveImpression.php?campaignId=95033&siteId=" + siteId + "&es_pId=" + placementId + "&adUnitType=" + adUnitType + "&clickThrough=30000000&es_eName=Product_Imp&es_cgName="+prod1+"";

	var prod2Tracker = new Image();
	prod2Tracker.src = "//evs.jivox.com/jivox/serverAPIs/saveImpression.php?campaignId=95033&siteId=" + siteId + "&es_pId=" + placementId + "&adUnitType=" + adUnitType + "&clickThrough=30000000&es_eName=Product_Imp&es_cgName="+prod2+"";

	var prod3Tracker = new Image();
	prod3Tracker.src = "//evs.jivox.com/jivox/serverAPIs/saveImpression.php?campaignId=95033&siteId=" + siteId + "&es_pId=" + placementId + "&adUnitType=" + adUnitType + "&clickThrough=30000000&es_eName=Product_Imp&es_cgName="+prod3+"";

	var allProdTracker = new Image();
	allProdTracker.src = "//evs.jivox.com/jivox/serverAPIs/saveImpression.php?campaignId=95033&siteId=" + siteId + "&es_pId=" + placementId + "&adUnitType=" + adUnitType + "&clickThrough=30000000&es_eName=All_Product_Imp&es_cgName="+prod1+"_"+prod2+"_"+prod3+"";



	//Create and drop custom cookie

	function createCookie(name,value,days) {
		if (days) {
			var date = new Date();
			date.setTime(date.getTime()+(days*24*60*60*1000));
			var expires = "; expires="+date.toGMTString();
		}
		else var expires = "";
		document.cookie = name+"="+value+expires+"; path=/";
	}

	(function onDynamicDataLoad() {
		jvxAd.getDynamicService(["MandS_" + self.defaults.country + ":MandS_" + self.defaults.country], ["ap_MandS_" + self.defaults.country + "=" + prod1 + "," + prod2 + "," + prod3], "panels");

		panels = function(result) {
			if (isEmpty(result)) {
				// console.log(result);
				genericAdLoad();

				// console.log("object is empty load generic ad");
				return false;
			} else {
				console.log(result);

				var db1 = result["MandS_" + self.defaults.country + ":MandS_" + self.defaults.country][0];
				var db2 = result["MandS_" + self.defaults.country + ":MandS_" + self.defaults.country][1];
				var db3 = result["MandS_" + self.defaults.country + ":MandS_" + self.defaults.country][2];

				if ((db1 === undefined && db2 === undefined) || (db2 === undefined && db3 === undefined) || (db1 === undefined && db3 === undefined))
				{
					genericAdLoad();
					console.log("More than 1 product has no info DB value");
					return false;
				}

				console.log(db1 + " After DB check");
				console.log(db2 + " After DB check");
				console.log(db3 + " After DB check");

				if (db1 === undefined) {
					defaultsPanel(1);
				} else {
					// Get Panel Images
					document.getElementsByClassName('p-image')[0].getElementsByTagName('img')[0].src = db1.product_image;
					// Get Panel Headings
					document.getElementsByClassName('p-heading')[0].innerHTML = db1.product_title;
					// Get CTA Clickthroughs
					// fullCTA1 = decodeURIComponent(cMacro) + prependParam + db1.product_url + appendParam;
					fullCTA1 = decodeURIComponent(cMacro) + strtTrbParam + Math.random() + endTrbParam + prependParam + db1.product_url + appendParam;

					console.log(fullCTA1);
					// Apply CTA URLs onto panels
					$('#cta_url_1').on("click", function(e){
						e.stopPropagation();
						jvxAd.openClickThrough(fullCTA1);

						//Code to track custom clicks for reporting
						var prod1Tracker = new Image();
						prod1Tracker.src = "//evs.jivox.com/jivox/serverAPIs/saveImpression.php?campaignId=95033&siteId=" + siteId + "&es_pId=" + placementId +  "&adUnitType=" + adUnitType + "&clickThrough=10000000&es_eName=Product_Click&es_cgName="+prod1+"";

						var allProdTracker = new Image();
						allProdTracker.src = "//evs.jivox.com/jivox/serverAPIs/saveImpression.php?campaignId=95033&siteId=" + siteId + "&es_pId=" + placementId +  "&adUnitType=" + adUnitType + "&clickThrough=10000000&es_eName=All_Product_Click&es_cgName="+prod1+"_"+prod2+"_"+prod3+"";


					});


					//Code to track custom clicks for reporting

					$('#cta_url_2').on("click", function(e){
						e.stopPropagation();
						var prod2Tracker = new Image();
						prod2Tracker.src = "//evs.jivox.com/jivox/serverAPIs/saveImpression.php?campaignId=95033&siteId=" + siteId + "&es_pId=" + placementId +  "&adUnitType=" + adUnitType + "&clickThrough=10000000&es_eName=Product_Click&es_cgName="+prod2+"";

						var allProdTracker = new Image();
						allProdTracker.src = "//evs.jivox.com/jivox/serverAPIs/saveImpression.php?campaignId=95033&siteId=" + siteId + "&es_pId=" + placementId +  "&adUnitType=" + adUnitType + "&clickThrough=10000000&es_eName=All_Product_Click&es_cgName="+prod1+"_"+prod2+"_"+prod3+"";

					});



					$('#cta_url_3').on("click", function(e){
						e.stopPropagation();
						var prod3Tracker = new Image();
						prod3Tracker.src = "//evs.jivox.com/jivox/serverAPIs/saveImpression.php?campaignId=95033&siteId=" + siteId + "&es_pId=" + placementId +  "&adUnitType=" + adUnitType + "&clickThrough=10000000&es_eName=Product_Click&es_cgName="+prod3+"";

						var allProdTracker = new Image();
						allProdTracker.src = "//evs.jivox.com/jivox/serverAPIs/saveImpression.php?campaignId=95033&siteId=" + siteId + "&es_pId=" + placementId +  "&adUnitType=" + adUnitType + "&clickThrough=10000000&es_eName=All_Product_Click&es_cgName="+prod1+"_"+prod2+"_"+prod3+"";

					});


					//Code to track custom clicks for reporting ends

				}

				if (db2 === undefined) {
					defaultsPanel(2);
				} else {
					// Get Panel Images
					document.getElementsByClassName('p-image')[1].getElementsByTagName('img')[0].src = db2.product_image;
					// Get Panel Headings
					document.getElementsByClassName('p-heading')[1].innerHTML = db2.product_title;
					// Get CTA Clickthroughs
					// fullCTA2 = decodeURIComponent(cMacro) + prependParam + db2.product_url + appendParam;
					fullCTA2 = decodeURIComponent(cMacro) + strtTrbParam + Math.random() + endTrbParam + prependParam + db2.product_url + appendParam;

					console.log(fullCTA2);
					// Apply CTA URLs onto panels
					$('#cta_url_2').on("click", function(e){
						e.stopPropagation();
						jvxAd.openClickThrough(fullCTA2);
					});
				}

				if (db3 === undefined) {
					defaultsPanel(3);
				} else {
					// Get Panel Images
					document.getElementsByClassName('p-image')[2].getElementsByTagName('img')[0].src = db3.product_image;
					// Get Panel Headings
					document.getElementsByClassName('p-heading')[2].innerHTML = db3.product_title;
					// Get CTA Clickthroughs
					// fullCTA3 = decodeURIComponent(cMacro) + prependParam + db3.product_url + appendParam;
					fullCTA3 = decodeURIComponent(cMacro) + strtTrbParam + Math.random() + endTrbParam + prependParam + db3.product_url + appendParam;


					console.log(fullCTA3);
					// Apply CTA URLs onto panels
					$('#cta_url_3').on("click", function(e){
						e.stopPropagation();
						jvxAd.openClickThrough(fullCTA3);
					});
				}
			}
		}

		//Code to drop the Custom Cookie with campaign details
		customCookieVal = prod1+"_"+prod2+"_"+prod3;
		createCookie("jvxMSCustomCookie",customCookieVal,30);

	}());

	// Generic Ad Load
	function genericAdLoad() {
		impTrackers();
		jvxAd.recordEventByName("Generic Ad Load", 0);

		intro.style.display = "none";
		mainAd.style.display = "none";

		genericAd.style.display = "block";
		genericAdBg.src = "generic-"+adSize+".jpg";

		if (self.defaults.country === 'IE') {
			genericURL = "https://www.marksandspencer."+self.defaults.country.toLowerCase();
		} else {
			genericURL = "https://www.marksandspencerlondon.com/"+self.defaults.country.toLowerCase();
		}

		// full_genericURL = decodeURIComponent(cMacro) + prependParam + genericURL + appendParam;

		full_genericURL = decodeURIComponent(cMacro) + strtTrbParam + Math.random() + endTrbParam + prependParam + genericURL + appendParam;

		// console.log(full_genericURL);

		$('#generic-ad').on("click", function(e){
			e.stopPropagation();
			jvxAd.openClickThrough( full_genericURL );
			jvxAd.recordEventByName("Generic Ad Load Clickthrough", 1);
		}); // Clickthrough
	}

	// On single DB error create needed panel
	function defaultsPanel(panelNo) {
		jvxAd.recordEventByName("Created Default Panel", 0);
		switch (panelNo) {
			case 1:
				if (category[0] === "women") {
					shuffle(women_defaults);
					var prod = women_defaults[0];
				} else {
					shuffle(kids_defaults);
					var prod = kids_defaults[0];
				}
				break;

			case 2:
				if (category[0] === "women") {
					shuffle(women_defaults);
					var prod = women_defaults[0];
				} else {
					shuffle(kids_defaults);
					var prod = kids_defaults[0];
				}
				break;

			case 3:
				if (category[0] === "women") {
					shuffle(women_defaults);
					var prod = women_defaults[0];
				} else {
					shuffle(kids_defaults);
					var prod = kids_defaults[0];
				}
				break;
		}

		jvxAd.getDynamicService("MandS_" + mandsCampaign.defaults.country + ":MandS_" + mandsCampaign.defaults.country, "ap_MandS_" + mandsCampaign.defaults.country + "=" + prod, "panel");

		panel = function(result){
			var db = result["MandS_" + mandsCampaign.defaults.country + ":MandS_" + mandsCampaign.defaults.country][0];

			if (db === undefined) {
				genericAdLoad();

				return false;
			}

			if (panelNo === 1) {
				document.getElementsByClassName('p-image')[0].getElementsByTagName('img')[0].src = db.product_image;
				document.getElementsByClassName('p-heading')[0].innerHTML = db.product_title;

				fullCTA1 = decodeURIComponent(cMacro) + strtTrbParam + Math.random() + endTrbParam + prependParam + db.product_url + appendParam;

				$('#cta_url_1').on("click", function(e){
					e.stopPropagation();
					jvxAd.openClickThrough(fullCTA1);
				});
				// console.log("panel 1 made");
			}

			if (panelNo === 2) {
				document.getElementsByClassName('p-image')[1].getElementsByTagName('img')[0].src = db.product_image;
				document.getElementsByClassName('p-heading')[1].innerHTML = db.product_title;
				fullCTA2 = decodeURIComponent(cMacro) + strtTrbParam + Math.random() + endTrbParam + prependParam + db.product_url + appendParam;

				$('#cta_url_2').on("click", function(e){
					e.stopPropagation();
					jvxAd.openClickThrough(fullCTA2);
				});
				// console.log("panel 2 made");
			}

			if (panelNo === 3) {
				document.getElementsByClassName('p-image')[2].getElementsByTagName('img')[0].src = db.product_image;
				document.getElementsByClassName('p-heading')[2].innerHTML = db.product_title;
				fullCTA3 = decodeURIComponent(cMacro) + strtTrbParam + Math.random() + endTrbParam + prependParam + db.product_url + appendParam;

				$('#cta_url_3').on("click", function(e){
					e.stopPropagation();
					jvxAd.openClickThrough(fullCTA3);
				});
				// console.log("panel 3 made");
			}
		}
	}

	// Trackers
	function impTrackers() {
		jvxAd.recordEventByName("Grab Country impression & click trackers", 0);

		switch (self.defaults.country) {
			case "US":
				switch (self.defaults.adSize) {
					case "300x250":
						switch (viewport) {
							case "Desktop":
								strtTrbParam = "https://us-gmtdmp.mookie1.com/t/v2/activity?tagid=V2_91244&src.rand=";
								endTrbParam = "&redirect_url=";
								prependParam = "https://ad.doubleclick.net/ddm/clk/304850675;132223379;f?";
								appendParam = "%3Fextid=ret_XAXIS_dsp_300x250_US_en";

								img.src = "https://ad.doubleclick.net/ddm/ad/N8061.1308838.XAXIS.COM/B9755902.132223379;sz=1x1;ord=[timestamp];dc_lat=;dc_rdid=;tag_for_child_directed_treatment=?";
								img.width = "1";
								img.height = "1";
								img.alt = "DCM Impression Tracker";
								body.appendChild(img);
								break;
						}
						break;
					case "160x600":
						switch (viewport) {
							case "Desktop":
								strtTrbParam = "https://us-gmtdmp.mookie1.com/t/v2/activity?tagid=V2_91244&src.rand=";
								endTrbParam = "&redirect_url=";
								prependParam = "https://ad.doubleclick.net/ddm/clk/304857097;132211760;b?";
								appendParam = "%3Fextid=ret_XAXIS_dsp_160x600_US_en";

								img.src = "https://ad.doubleclick.net/ddm/ad/N8061.1308838.XAXIS.COM/B9755902.132211760;sz=1x1;ord=[timestamp];dc_lat=;dc_rdid=;tag_for_child_directed_treatment=?";
								img.width = "1";
								img.height = "1";
								img.alt = "DCM Impression Tracker";
								body.appendChild(img);
								break;
						}
						break;
				}
				break;

			case "AU":
				switch (adSize) {
					case "300x250":
						switch (viewport) {
							case "Desktop":
								strtTrbParam = "https://au-gmtdmp.mookie1.com/t/v2/activity?tagid=V2_91586&src.rand=";
								endTrbParam = "&redirect_url=";
								prependParam = "https://ad.doubleclick.net/ddm/clk/304851817;132224645;b?";
								appendParam = "%3Fextid=ret_XAXIS_dsp_300X250_AU_en";

								img.src = "https://ad.doubleclick.net/ddm/ad/N8061.1308838.XAXIS.COM/B9749569.132224645;sz=1x1;ord=[timestamp];dc_lat=;dc_rdid=;tag_for_child_directed_treatment=?";
								img.width = "1";
								img.height = "1";
								img.alt = "DCM Impression Tracker";
								body.appendChild(img);
								break;
						}
						break;
					case "160x600":
						switch (viewport) {
							case "Desktop":
								strtTrbParam = "https://au-gmtdmp.mookie1.com/t/v2/activity?tagid=V2_91586&src.rand=";
								endTrbParam = "&redirect_url=";
								prependParam = "https://ad.doubleclick.net/ddm/clk/304858215;132209480;a?";
								appendParam = "%3Fextid=ret_XAXIS_dsp_160x600_AU_en";

								img.src = "https://ad.doubleclick.net/ddm/ad/N8061.1308838.XAXIS.COM/B9749569.132209480;sz=1x1;ord=[timestamp];dc_lat=;dc_rdid=;tag_for_child_directed_treatment=?";
								img.width = "1";
								img.height = "1";
								img.alt = "DCM Impression Tracker";
								body.appendChild(img);
								break;
						}
						break;
				}
				break;

			case "CA":
				switch (adSize) {
					case "300x250":
						switch (viewport) {
							case "Desktop":
								strtTrbParam = "https://ca-gmtdmp.mookie1.com/t/v2/activity?tagid=V2_91238&src.rand=";
								endTrbParam = "&redirect_url=";
								prependParam = "https://ad.doubleclick.net/ddm/clk/304858202;132225023;n?";
								appendParam = "%3Fextid=ret_XAXIS_dsp_300X250_CA_en";

								img.src = "https://ad.doubleclick.net/ddm/ad/N8061.1308838.XAXIS.COM/B9755891.132225023;sz=1x1;ord=[timestamp];dc_lat=;dc_rdid=;tag_for_child_directed_treatment=?";
								img.width = "1";
								img.height = "1";
								img.alt = "DCM Impression Tracker";
								body.appendChild(img);
								break;
						}
						break;
					case "160x600":
						switch (viewport) {
							case "Desktop":
								strtTrbParam = "https://ca-gmtdmp.mookie1.com/t/v2/activity?tagid=V2_91238&src.rand=";
								endTrbParam = "&redirect_url=";
								prependParam = "https://ad.doubleclick.net/ddm/clk/304858414;132223819;d?";
								appendParam = "%3Fextid=ret_XAXIS_dsp_160x600_CA_en";

								img.src = "https://ad.doubleclick.net/ddm/ad/N8061.1308838.XAXIS.COM/B9755891.132223819;sz=1x1;ord=[timestamp];dc_lat=;dc_rdid=;tag_for_child_directed_treatment=?";
								img.width = "1";
								img.height = "1";
								img.alt = "DCM Impression Tracker";
								body.appendChild(img);
								break;
						}
						break;
				}
				break;

			case "NZ":
				switch (adSize) {
					case "300x250":
						switch (viewport) {
							case "Desktop":
								strtTrbParam = "https://nz-gmtdmp.mookie1.com/t/v2/activity?tagid=V2_91592&src.rand=";
								endTrbParam = "&redirect_url=";
								prependParam = "https://ad.doubleclick.net/ddm/clk/304851906;132224658;e?";
								appendParam = "%3Fextid=ret_XAXIS_dsp_300X250_NZ_en";

								img.src = "https://ad.doubleclick.net/ddm/ad/N8061.1308838.XAXIS.COM/B9759073.132224658;sz=1x1;ord=[timestamp];dc_lat=;dc_rdid=;tag_for_child_directed_treatment=?";
								img.width = "1";
								img.height = "1";
								img.alt = "DCM Impression Tracker";
								body.appendChild(img);
								break;
						}
						break;
					case "160x600":
						switch (viewport) {
							case "Desktop":
								strtTrbParam = "https://nz-gmtdmp.mookie1.com/t/v2/activity?tagid=V2_91592&src.rand=";
								endTrbParam = "&redirect_url=";
								prependParam = "https://ad.doubleclick.net/ddm/clk/304857852;132210788;j?";
								appendParam = "%3Fextid=ret_XAXIS_dsp_160x600_NZ_en";

								img.src = "https://ad.doubleclick.net/ddm/ad/N8061.1308838.XAXIS.COM/B9759073.132210788;sz=1x1;ord=[timestamp];dc_lat=;dc_rdid=;tag_for_child_directed_treatment=?";
								img.width = "1";
								img.height = "1";
								img.alt = "DCM Impression Tracker";
								body.appendChild(img);
								break;
						}
						break;
				}
				break;

			case "IE":
				switch (adSize) {
					case "300x250":
						switch (viewport) {
							case "Desktop":
								strtTrbParam = "https://gb-gmtdmp.mookie1.com/t/v2/activity?tagid=V2_91232&src.rand=";
								endTrbParam = "&redirect_url=";
								prependParam = "https://ad.doubleclick.net/ddm/clk/307055084;134449565;i?";
								appendParam = "%3Fextid=ret_XAXIS_dsp_300x250_IE_en";

								img.src = "https://ad.doubleclick.net/ddm/ad/N8061.1308838.XAXIS.COM/B10010057.134449565;sz=1x1;ord=[timestamp];dc_lat=;dc_rdid=;tag_for_child_directed_treatment=?";
								img.width = "1";
								img.height = "1";
								img.alt = "DCM Impression Tracker";
								body.appendChild(img);
								break;
						}
						break;
					case "160x600":
						switch (viewport) {
							case "Desktop":
								strtTrbParam = "https://gb-gmtdmp.mookie1.com/t/v2/activity?tagid=V2_91232&src.rand=";
								endTrbParam = "&redirect_url=";
								prependParam = "https://ad.doubleclick.net/ddm/clk/307055548;134447386;m?";
								appendParam = "%3Fextid=ret_XAXIS_dsp_160x600_IE_en";

								img.src = "https://ad.doubleclick.net/ddm/ad/N8061.1308838.XAXIS.COM/B10010057.134447386;sz=1x1;ord=[timestamp];dc_lat=;dc_rdid=;tag_for_child_directed_treatment=?";
								img.width = "1";
								img.height = "1";
								img.alt = "DCM Impression Tracker";
								body.appendChild(img);
								break;
						}
						break;
				}
				break;
		}
	}
}
// 0
