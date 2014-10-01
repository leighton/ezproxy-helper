(function(ns){


  var ActionButton = require('sdk/ui/button/action').ActionButton
    , tabs = require("sdk/tabs")
    , prefs = require('sdk/simple-prefs').prefs
    , notifications = require("sdk/notifications")
    , self = require("sdk/self");


  var click_handler = function(state) {

    var ezproxy_url = prefs['ezproxy.url'];

    if(ezproxy_url && ezproxy_url.length>0){

      tabs.open(ezproxy_url + "/login?url=" + tabs.activeTab.url);

    } else {

      notifications.notify({
        title: "Ezproxy URL is not configured!",
        text: "Click here to open the Addons tab where you can update EZproxy Helper's preferences",
        iconURL: self.data.url("study-32.png"),
        onClick: function(){
          tabs.open("about:addons");
        }
      });

    }
  }


  var button = ActionButton({
    id: "ezproxy",
    label: "Load through ezproxy",
    icon: {
      "16": "./study-16.png",
      "32": "./study-32.png",
      "64": "./study-64.png"
    },
    onClick: click_handler
  });
 

})({});

