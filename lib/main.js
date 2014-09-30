
var buttons = require('sdk/ui/button/action');
var tabs = require("sdk/tabs");
var prefs = require('sdk/simple-prefs').prefs;
var notifications = require("sdk/notifications");

var button = buttons.ActionButton({
  id: "ezproxy",
  label: "Load through ezproxy",
  icon: {
    "16": "./glyphicons_087_log_book.png",
    "32": "./icon-32.png",
    "64": "./icon-64.png"
  },
  onClick: handleClick
});


function handleClick(state) {
  var ezproxy_url = prefs['ezproxy.url'];
  if(ezproxy_url && ezproxy_url.length>0){
    tabs.open(ezproxy_url + "/login?url=" + tabs.activeTab.url);
  } else {
    notifications.notify({
      title: "Ezproxy URL is not configured!",
      text: "Please open the Addons menu item and configure Ezproxy"
    });
  }
}


