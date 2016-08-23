'use strict';

// Wit.ai parameters
//const WIT_TOKEN = process.env.WIT_TOKEN;
const WIT_TOKEN = "YVTD4SSYSXSSYNHGY3TZOG6PTQMP7UWF";
if (!WIT_TOKEN) {
  throw new Error('missing WIT_TOKEN');
}

// Messenger API parameters
const FB_PAGE_TOKEN = "EAAR8dpi5Ae4BANlcMZB1rK2zgS0pUDwDVZCgXA64T389NQl2ycT8KZBniXGgebFBq9N3honekW6kIzbWix4NX1pWLDeykpaDcs7AUYI6B4ZBWJkFfg83lFpmIXhBADWXhatEq9ZAXT61dnM2J7YVmvT4efglZCqFXOS5zT9ctpSgZDZD";

var FB_VERIFY_TOKEN = process.env.FB_VERIFY_TOKEN;
if (!FB_VERIFY_TOKEN) {
  FB_VERIFY_TOKEN = "just_do_it";
}

module.exports = {
  WIT_TOKEN: WIT_TOKEN,
  FB_PAGE_TOKEN: FB_PAGE_TOKEN,
  FB_VERIFY_TOKEN: FB_VERIFY_TOKEN,
};
