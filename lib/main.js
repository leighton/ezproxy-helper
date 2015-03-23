(function(ns){


  var ActionButton = require('sdk/ui/button/action').ActionButton
    , tabs = require("sdk/tabs")
    , prefs = require('sdk/simple-prefs').prefs
    , notifications = require("sdk/notifications")
    , self = require("sdk/self");

  /**
   *  @return function which understands how to open a url
   */
  var create_url_opener = function(using_new_tab){

    return function open_url(url){
      (using_new_tab) ? tabs.open(url) : tabs.activeTab.url = url;
    };

  };

  /**
   * @return function which maps a url into an ezproxy url
   */
  var create_url_mapper = function(ezproxy_url){

    return function map_url(url){
      return (ezproxy_url.match(/\$@/g))
        ? ezproxy_url.replace(/\$@/g, url) : ezproxy_url + "/login?url=" + url
    };

  };


  var click_handler = function(state) {

    var ezproxy_url = prefs['ezproxy.url'] || ""
      , ezproxy_newtab = prefs['ezproxy.newtab'];

    if (ezproxy_url.length==0) {

      notifications.notify({
        title: "EZproxy URL is not set!",
        text: "Click here to open the Add-ons tab where you can update EZproxy Helper's preferences",
        iconURL: self.data.url("icons/study-32.png"),
        onClick: function(){
          tabs.open("about:addons");
        }
      });

    } else {

      var open_url = create_url_opener(ezproxy_newtab);
      var map_url  = create_url_mapper(ezproxy_url);

      open_url(map_url(tabs.activeTab.url));

    }

  };


  var button = ActionButton({
    id: "ezproxy",
    label: "Load through EZproxy",
    icon: {
      "16": "./icons/study-16.png",
      "32": "./icons/study-32.png",
      "64": "./icons/study-64.png"
    },
    onClick: click_handler
  });


})({});

