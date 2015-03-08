// @namespace   Mush
// @grant       unsafeWindow
// @require     lib/jquery-1.11.1.min.js
// @require     lib/Gettext.js
// @resource    css:jgrowl lib/jquery.jgrowl.css
// @resource    jgrowl lib/jquery.jgrowl.js
// @resource    mush lib/Mush.js

// ==UserScript==
// @name       MushHacks
// @version    0.01
// @grant      GM_xmlhttpRequest
// @grant      GM_addStyle
// @match      http://mush.twinoid.com/*
// @match      http://mush.twinoid.com/#
// jshint multistr: true
// @require http://code.jquery.com/jquery-latest.js
// @downloadURL https://raw.githubusercontent.com/insoln/mush/master/MushHacks.user.js
// ==/UserScript==

GM_addStyle('\
  .tid_editorContent {visibility: visible}\
'}
