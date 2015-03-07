(function(ns){


  var ActionButton = require('sdk/ui/button/action').ActionButton
    , tabs = require("sdk/tabs")
    , prefs = require('sdk/simple-prefs').prefs
    , notifications = require("sdk/notifications")
    , self = require("sdk/self");


  var click_handler = function(state) {

      var ezproxy_url = prefs['ezproxy.url'];
      
      var ezproxy_newtab = prefs['ezproxy.newtab'];

      if(ezproxy_url && ezproxy_url.length>0){

	  if( ezproxy_url.match(/\$@/g) ){

	      if (ezproxy_newtab) {
		  tabs.open(ezproxy_url.replace(/\$@/g, tabs.activeTab.url));
	      }
	      else {
		  tabs.activeTab.url = ezproxy_url.replace(/\$@/g, tabs.activeTab.url);
	      }

	  } else {
	      if (ezproxy_newtab) {
		  tabs.open(ezproxy_url + "/login?url=" + tabs.activeTab.url);
	      }
	      else {
		  tabs.activeTab.url = ezproxy_url + "/login?url=" + tabs.activeTab.url;
	      }
	      
	  }

      } else {

	  notifications.notify({
              title: "EZproxy URL is not set!",
              text: "Click here to open the Add-ons tab where you can update EZproxy Helper's preferences",
              iconURL: self.data.url("study-32.png"),
              onClick: function(){
		  tabs.open("about:addons");
              }
	  });

      }
  }


  var button = ActionButton({
    id: "ezproxy",
    label: "Load through EZproxy",
    icon: {
      "16": "./study-16.png",
      "32": "./study-32.png",
      "64": "./study-64.png"
    },
    onClick: click_handler
  });
 

})({});

