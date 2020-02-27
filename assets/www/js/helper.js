var Base64 = {
    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    encode: function(e) {
        var t = "";
        var n, r, i, s, o, u, a;
        var f = 0;
        e = Base64._utf8_encode(e);
        while (f < e.length) {
            n = e.charCodeAt(f++);
            r = e.charCodeAt(f++);
            i = e.charCodeAt(f++);
            s = n >> 2;
            o = (n & 3) << 4 | r >> 4;
            u = (r & 15) << 2 | i >> 6;
            a = i & 63;
            if (isNaN(r)) {
                u = a = 64
            } else if (isNaN(i)) {
                a = 64
            }
            t = t + this._keyStr.charAt(s) + this._keyStr.charAt(o) + this._keyStr.charAt(u) + this._keyStr.charAt(a)
        }
        return t
    },
    decode: function(e) {
        var t = "";
        var n, r, i;
        var s, o, u, a;
        var f = 0;
        e = e.replace(/[^A-Za-z0-9+/=]/g, "");
        while (f < e.length) {
            s = this._keyStr.indexOf(e.charAt(f++));
            o = this._keyStr.indexOf(e.charAt(f++));
            u = this._keyStr.indexOf(e.charAt(f++));
            a = this._keyStr.indexOf(e.charAt(f++));
            n = s << 2 | o >> 4;
            r = (o & 15) << 4 | u >> 2;
            i = (u & 3) << 6 | a;
            t = t + String.fromCharCode(n);
            if (u != 64) {
                t = t + String.fromCharCode(r)
            }
            if (a != 64) {
                t = t + String.fromCharCode(i)
            }
        }
        t = Base64._utf8_decode(t);
        return t
    },
    _utf8_encode: function(e) {
        var t = "";
        for (var n = 0; n < e.length; n++) {
            var r = e.charCodeAt(n);
            if (r < 128) {
                t += String.fromCharCode(r)
            } else if (r > 127 && r < 2048) {
                t += String.fromCharCode(r >> 6 | 192);
                t += String.fromCharCode(r & 63 | 128)
            } else {
                t += String.fromCharCode(r >> 12 | 224);
                t += String.fromCharCode(r >> 6 & 63 | 128);
                t += String.fromCharCode(r & 63 | 128)
            }
        }
        return t
    },
    _utf8_decode: function(e) {
        var t = "";
        var n = 0;
        var r = c1 = c2 = 0;
        while (n < e.length) {
            r = e.charCodeAt(n);
            if (r < 128) {
                t += String.fromCharCode(r);
                n++
            } else if (r > 191 && r < 224) {
                c2 = e.charCodeAt(n + 1);
                t += String.fromCharCode((r & 31) << 6 | c2 & 63);
                n += 2
            } else {
                c2 = e.charCodeAt(n + 1);
                c3 = e.charCodeAt(n + 2);
                t += String.fromCharCode((r & 15) << 12 | (c2 & 63) << 6 | c3 & 63);
                n += 3
            }
        }
        return t
    }
};
var secureKey = "a2dc2a99e649f147bcabc5a99bea7d96";

AppyTemplate.registerHelper('ewalletBalanceoption', function(item) {

if(pageData.pageId != "ecommerce")return "";
    var paymentMethod = item.paymentMethodKey;
    var page_name = "ecom"
    if((ewalletModel.getewalletAvailableStatus() == true || ewalletModel.getewalletAvailableStatus() == "true") && !Appyscript.checkLogin_ewallet()) {
        return '<p>Your Available Balance</p> <div class="ewalletbalance-btn" id = "ewalletsignin'+paymentMethod+'" onclick = "wallet_openloginPageforGuest(\''+paymentMethod+'\', \''+page_name+'\')"><b>Login to use your wallet balance</b> </div>';

    }else {
       return wallet_optionCheckbox(item);

    }

});


AppyTemplate.registerHelper('getICON', function(type) {
    var iconArray = {
        email: "icon-email",
        name: "iconz-user",
        phone: "iconz-phone1",
        text: "icon-edit",
        checkbox: "iconz-checkbox",
        textarea: "icon-edit",
        state: "iconz-location-3",
        country: "icon-map",
        gender: "iconz-family",
        date: "icon-calendar-4",
        radio: "icon-circle",
        select: "icon-listing",
        multiselect: "icon-listing",
        time: "icon-clock-4",
        uploadPicture: "iconz-upload",
        company: "iconz-briefcase",
        website: "icon-globe-3",
        emailEnquiryList: "icon-map",
        amount: "iconz-account",
        group: "icon-users-2",
		barcode: "icon-barcode",
        qrcode: "icon-qrcode"
    }
    return iconArray[type];
})

AppyTemplate.registerHelper("format_currency", function(currency) {
    //localStorage.setItem("currencySymbol",currency);
    var cur = data.currencySymbol;
    var key = currency;
    if (cur[key] == "" || cur[key] == undefined || cur[key] == "null") {
        localStorage.setItem("currencySymbol", key);
        return key+"&nbsp;";
    } else {
        localStorage.setItem("currencySymbol", cur[key]);
        return cur[key]+"&nbsp;";
    }

});

AppyTemplate.registerHelper('getPayment', function(type) {
    var iconArray = {
        cod:"appyicon-wallet",
        pu:"appyicon-wallet",
        obp:"iconz-phone1",
        paypal:"icon-paypal-1",
        card:"icon-credit-card-2",
        hubtel: "appyicon-hubtel",
        stripe:"appyicon-stripe",
        velocity: "appyicon-velocity",
        payu:"appyicon-payu-money",
        ewallet:"appyslim-ecommerce-wallet",
        payfast:"appyicon-pf-icon",
        mercadopago:"appyicon-mercadopago",
        mercado:"appyicon-mercadopago",
        authorize:"appyicon-authorize",
        braintree:"payement-breentree",
        boleto:"payement-boleto-new",
        pesapal:"payement-pesapal-1"
    }
    return iconArray[type];
})

var  countryArrayList = {
    "countryList": {
        "country": [
                    {
                    "shortname": "US",
                    "longname": "United States",
                    "displayName": "United States"
                    },

                    {
                     "shortname": "US",
                     "longname": "USA",
                     "displayName": "USA"
                     },
                     {
                    "shortname": "GB",
                    "longname": "United Kingdom",
                    "displayName": "United Kingdom"
                     },
                    {
                    "shortname": "AF",
                    "longname": "Afghanistan",
                    "displayName": "Afghanistan"
                    },
                    {
                    "shortname": "AX",
                    "longname": "Åland Islands",
                    "displayName": "Åland Islands"
                    },
                    {
                    "shortname": "AL",
                    "longname": "Albania",
                    "displayName": "Albania"
                    },
                    {
                    "shortname": "DZ",
                    "longname": "Algeria",
                    "displayName": "Algeria"
                    },
                    {
                    "shortname": "AS",
                    "longname": "American Samoa",
                    "displayName": "American Samoa"
                    },
                    {
                    "shortname": "AD",
                    "longname": "Andorra",
                    "displayName": "Andorra"
                    },
                    {
                    "shortname": "AO",
                    "longname": "Angola",
                    "displayName": "Angola"
                    },
                    {
                    "shortname": "AI",
                    "longname": "Anguilla",
                    "displayName": "Anguilla"
                    },
                    {
                    "shortname": "AQ",
                    "longname": "Antarctica",
                    "displayName": "Antarctica"
                    },
                    {
                    "shortname": "AG",
                    "longname": "Antigua and Barbuda",
                    "displayName": "Antigua and Barbuda"
                    },
                    {
                    "shortname": "AR",
                    "longname": "Argentina",
                    "displayName": "Argentina"
                    },
                    {
                    "shortname": "AM",
                    "longname": "Armenia",
                    "displayName": "Armenia"
                    },
                    {
                    "shortname": "AW",
                    "longname": "Aruba",
                    "displayName": "Aruba"
                    },
                    {
                    "shortname": "AU",
                    "longname": "Australia",
                    "displayName": "Australia"
                    },
                    {
                    "shortname": "AT",
                    "longname": "Austria",
                    "displayName": "Austria"
                    },
                    {
                    "shortname": "AZ",
                    "longname": "Azerbaijan",
                    "displayName": "Azerbaijan"
                    },
                    {
                    "shortname": "BS",
                    "longname": "Bahamas",
                    "displayName": "Bahamas"
                    },
                    {
                    "shortname": "BH",
                    "longname": "Bahrain",
                    "displayName": "Bahrain"
                    },
                    {
                    "shortname": "BD",
                    "longname": "Bangladesh",
                    "displayName": "Bangladesh"
                    },
                    {
                    "shortname": "BB",
                    "longname": "Barbados",
                    "displayName": "Barbados"
                    },
                    {
                    "shortname": "BY",
                    "longname": "Belarus",
                    "displayName": "Belarus"
                    },
                    {
                    "shortname": "BE",
                    "longname": "Belgium",
                    "displayName": "Belgium"
                    },
                    {
                    "shortname": "BZ",
                    "longname": "Belize",
                    "displayName": "Belize"
                    },
                    {
                    "shortname": "BJ",
                    "longname": "Benin",
                    "displayName": "Benin"
                    },
                    {
                    "shortname": "BM",
                    "longname": "Bermuda",
                    "displayName": "Bermuda"
                    },
                    {
                    "shortname": "BT",
                    "longname": "Bhutan",
                    "displayName": "Bhutan"
                    },
                    {
                    "shortname": "BO",
                    "longname": "Bolivia",
                    "displayName": "Bolivia"
                    },
                    {
                    "shortname": "BA",
                    "longname": "Bosnia and Herzegovina",
                    "displayName": "Bosnia and Herzegovina"
                    },
                    {
                    "shortname": "BW",
                    "longname": "Botswana",
                    "displayName": "Botswana"
                    },
                    {
                    "shortname": "BV",
                    "longname": "Bouvet Island",
                    "displayName": "Bouvet Island"
                    },
                    {
                    "shortname": "BR",
                    "longname": "Brazil",
                    "displayName": "Brazil"
                    },
                    {
                    "shortname": "IO",
                    "longname": "British Indian Ocean Territory",
                    "displayName": "British Indian Ocean Territory"
                    },
                    {
                    "shortname": "BN",
                    "longname": "Brunei Darussalam",
                    "displayName": "Brunei Darussalam"
                    },
                    {
                    "shortname": "BG",
                    "longname": "Bulgaria",
                    "displayName": "Bulgaria"
                    },
                    {
                    "shortname": "BF",
                    "longname": "Burkina Faso",
                    "displayName": "Burkina Faso"
                    },
                    {
                    "shortname": "BI",
                    "longname": "Burundi",
                    "displayName": "Burundi"
                    },
                    {
                    "shortname": "KH",
                    "longname": "Cambodia",
                    "displayName": "Cambodia"
                    },
                    {
                    "shortname": "CM",
                    "longname": "Cameroon",
                    "displayName": "Cameroon"
                    },
                    {
                    "shortname": "CA",
                    "longname": "Canada",
                    "displayName": "Canada"
                    },
                    {
                    "shortname": "CV",
                    "longname": "Cape Verde",
                    "displayName": "Cape Verde"
                    },
                    {
                    "shortname": "KY",
                    "longname": "Cayman Islands",
                    "displayName": "Cayman Islands"
                    },
                    {
                    "shortname": "CF",
                    "longname": "Central African Republic",
                    "displayName": "Central African Republic"
                    },
                    {
                    "shortname": "TD",
                    "longname": "Chad",
                    "displayName": "Chad"
                    },
                    {
                    "shortname": "CL",
                    "longname": "Chile",
                    "displayName": "Chile"
                    },
                    {
                    "shortname": "CN",
                    "longname": "China",
                    "displayName": "China"
                    },
                    {
                    "shortname": "CX",
                    "longname": "Christmas Island",
                    "displayName": "Christmas Island"
                    },
                    {
                    "shortname": "CC",
                    "longname": "Cocos (Keeling) Islands",
                    "displayName": "Cocos (Keeling) Islands"
                    },
                    {
                    "shortname": "CO",
                    "longname": "Colombia",
                    "displayName": "Colombia"
                    },
                    {
                    "shortname": "KM",
                    "longname": "Comoros",
                    "displayName": "Comoros"
                    },
                    {
                    "shortname": "CG",
                    "longname": "Congo",
                    "displayName": "Congo"
                    },
                    {
                    "shortname": "CD",
                    "longname": "Congo, The Democratic Republic of the",
                    "displayName": "Congo, The Democratic Republic of the"
                    },
                    {
                    "shortname": "CK",
                    "longname": "Cook Islands",
                    "displayName": "Cook Islands"
                    },
                    {
                    "shortname": "CR",
                    "longname": "Costa Rica",
                    "displayName": "Costa Rica"
                    },
                    {
                    "shortname": "CI",
                    "longname": "Côte D'Ivoire",
                    "displayName": "Côte D'Ivoire"
                    },
                    {
                    "shortname": "HR",
                    "longname": "Croatia",
                    "displayName": "Croatia"
                    },
                    {
                    "shortname": "CU",
                    "longname": "Cuba",
                    "displayName": "Cuba"
                    },
                    {
                    "shortname": "CY",
                    "longname": "Cyprus",
                    "displayName": "Cyprus"
                    },
                    {
                    "shortname": "CZ",
                    "longname": "Czech Republic",
                    "displayName": "Czech Republic"
                    },
                    {
                    "shortname": "DK",
                    "longname": "Denmark",
                    "displayName": "Denmark"
                    },
                    {
                    "shortname": "DJ",
                    "longname": "Djibouti",
                    "displayName": "Djibouti"
                    },
                    {
                    "shortname": "DM",
                    "longname": "Dominica",
                    "displayName": "Dominica"
                    },
                    {
                    "shortname": "DO",
                    "longname": "Dominican Republic",
                    "displayName": "Dominican Republic"
                    },
                    {
                    "shortname": "EC",
                    "longname": "Ecuador",
                    "displayName": "Ecuador"
                    },
                    {
                    "shortname": "EG",
                    "longname": "Egypt",
                    "displayName": "Egypt"
                    },
                    {
                    "shortname": "SV",
                    "longname": "El Salvador",
                    "displayName": "El Salvador"
                    },
                    {
                    "shortname": "GQ",
                    "longname": "Equatorial Guinea",
                    "displayName": "Equatorial Guinea"
                    },
                    {
                    "shortname": "ER",
                    "longname": "Eritrea",
                    "displayName": "Eritrea"
                    },
                    {
                    "shortname": "EE",
                    "longname": "Estonia",
                    "displayName": "Estonia"
                    },
                    {
                    "shortname": "ET",
                    "longname": "Ethiopia",
                    "displayName": "Ethiopia"
                    },
                    {
                    "shortname": "FK",
                    "longname": "Falkland Islands (Malvinas)",
                    "displayName": "Falkland Islands (Malvinas)"
                    },
                    {
                    "shortname": "FO",
                    "longname": "Faroe Islands",
                    "displayName": "Faroe Islands"
                    },
                    {
                    "shortname": "FJ",
                    "longname": "Fiji",
                    "displayName": "Fiji"
                    },
                    {
                    "shortname": "FI",
                    "longname": "Finland",
                    "displayName": "Finland"
                    },
                    {
                    "shortname": "FR",
                    "longname": "France",
                    "displayName": "France"
                    },
                    {
                    "shortname": "GF",
                    "longname": "French Guiana",
                    "displayName": "French Guiana"
                    },
                    {
                    "shortname": "PF",
                    "longname": "French Polynesia",
                    "displayName": "French Polynesia"
                    },
                    {
                    "shortname": "TF",
                    "longname": "French Southern Territories",
                    "displayName": "French Southern Territories"
                    },
                    {
                    "shortname": "GA",
                    "longname": "Gabon",
                    "displayName": "Gabon"
                    },
                    {
                    "shortname": "GM",
                    "longname": "Gambia",
                    "displayName": "Gambia"
                    },
                    {
                    "shortname": "GE",
                    "longname": "Georgia",
                    "displayName": "Georgia"
                    },
                    {
                    "shortname": "DE",
                    "longname": "Germany",
                    "displayName": "Germany"
                    },
                    {
                    "shortname": "GH",
                    "longname": "Ghana",
                    "displayName": "Ghana"
                    },
                    {
                    "shortname": "GI",
                    "longname": "Gibraltar",
                    "displayName": "Gibraltar"
                    },
                    {
                    "shortname": "GR",
                    "longname": "Greece",
                    "displayName": "Greece"
                    },
                    {
                    "shortname": "GL",
                    "longname": "Greenland",
                    "displayName": "Greenland"
                    },
                    {
                    "shortname": "GD",
                    "longname": "Grenada",
                    "displayName": "Grenada"
                    },
                    {
                    "shortname": "GP",
                    "longname": "Guadeloupe",
                    "displayName": "Guadeloupe"
                    },
                    {
                    "shortname": "GU",
                    "longname": "Guam",
                    "displayName": "Guam"
                    },
                    {
                    "shortname": "GT",
                    "longname": "Guatemala",
                    "displayName": "Guatemala"
                    },
                    {
                    "shortname": "GG",
                    "longname": "Guernsey",
                    "displayName": "Guernsey"
                    },
                    {
                    "shortname": "GN",
                    "longname": "Guinea",
                    "displayName": "Guinea"
                    },
                    {
                    "shortname": "GW",
                    "longname": "Guinea-Bissau",
                    "displayName": "Guinea-Bissau"
                    },
                    {
                    "shortname": "GY",
                    "longname": "Guyana",
                    "displayName": "Guyana"
                    },
                    {
                    "shortname": "HT",
                    "longname": "Haiti",
                    "displayName": "Haiti"
                    },
                    {
                    "shortname": "HM",
                    "longname": "Heard Island and McDonald Islands",
                    "displayName": "Heard Island and McDonald Islands"
                    },
                    {
                    "shortname": "VA",
                    "longname": "Holy See (Vatican City State)",
                    "displayName": "Holy See (Vatican City State)"
                    },
                    {
                    "shortname": "HN",
                    "longname": "Honduras",
                    "displayName": "Honduras"
                    },
                    {
                    "shortname": "HK",
                    "longname": "Hong Kong",
                    "displayName": "Hong Kong"
                    },
                    {
                    "shortname": "HU",
                    "longname": "Hungary",
                    "displayName": "Hungary"
                    },
                    {
                    "shortname": "IS",
                    "longname": "Iceland",
                    "displayName": "Iceland"
                    },
                    {
                    "shortname": "IN",
                    "longname": "India",
                    "displayName": "India"
                    },
                    {
                    "shortname": "ID",
                    "longname": "Indonesia",
                    "displayName": "Indonesia"
                    },
                    {
                    "shortname": "IR",
                    "longname": "Iran, Islamic Republic of",
                    "displayName": "Iran, Islamic Republic of"
                    },
                    {
                    "shortname": "IQ",
                    "longname": "Iraq",
                    "displayName": "Iraq"
                    },
                    {
                    "shortname": "IE",
                    "longname": "Ireland",
                    "displayName": "Ireland"
                    },
                    {
                    "shortname": "IM",
                    "longname": "Isle of Man",
                    "displayName": "Isle of Man"
                    },
                    {
                    "shortname": "IL",
                    "longname": "Israel",
                    "displayName": "Israel"
                    },
                    {
                    "shortname": "IT",
                    "longname": "Italy",
                    "displayName": "Italy"
                    },
                    {
                    "shortname": "JM",
                    "longname": "Jamaica",
                    "displayName": "Jamaica"
                    },
                    {
                    "shortname": "JP",
                    "longname": "Japan",
                    "displayName": "Japan"
                    },
                    {
                    "shortname": "JE",
                    "longname": "Jersey",
                    "displayName": "Jersey"
                    },
                    {
                    "shortname": "JO",
                    "longname": "Jordan",
                    "displayName": "Jordan"
                    },
                    {
                    "shortname": "KZ",
                    "longname": "Kazakhstan",
                    "displayName": "Kazakhstan"
                    },
                    {
                    "shortname": "KE",
                    "longname": "Kenya",
                    "displayName": "Kenya"
                    },
                    {
                    "shortname": "KI",
                    "longname": "Kiribati",
                    "displayName": "Kiribati"
                    },
                    {
                    "shortname": "KP",
                    "longname": "Korea, Democratic People's Republic of",
                    "displayName": "Korea, Democratic People's Republic of"
                    },
                    {
                    "shortname": "KR",
                    "longname": "Korea, Republic of",
                    "displayName": "Korea, Republic of"
                    },
                    {
                    "shortname": "KW",
                    "longname": "Kuwait",
                    "displayName": "Kuwait"
                    },
                    {
                    "shortname": "KG",
                    "longname": "Kyrgyzstan",
                    "displayName": "Kyrgyzstan"
                    },
                    {
                    "shortname": "LA",
                    "longname": "Lao People's Democratic Republic",
                    "displayName": "Lao People's Democratic Republic"
                    },
                    {
                    "shortname": "LV",
                    "longname": "Latvia",
                    "displayName": "Latvia"
                    },
                    {
                    "shortname": "LB",
                    "longname": "Lebanon",
                    "displayName": "Lebanon"
                    },
                    {
                    "shortname": "LS",
                    "longname": "Lesotho",
                    "displayName": "Lesotho"
                    },
                    {
                    "shortname": "LR",
                    "longname": "Liberia",
                    "displayName": "Liberia"

                    },
                    {
                    "shortname": "LY",
                    "longname": "Libyan Arab Jamahiriya",
                    "displayName": "Libyan Arab Jamahiriya"
                    },
                    {
                    "shortname": "LI",
                    "longname": "Liechtenstein",
                    "displayName": "Liechtenstein"
                    },
                    {
                    "shortname": "LT",
                    "longname": "Lithuania",
                    "displayName": "Lithuania"
                    },
                    {
                    "shortname": "LU",
                    "longname": "Luxembourg",
                    "displayName": "Luxembourg"
                    },
                    {
                    "shortname": "MO",
                    "longname": "Macao",
                    "displayName": "Macao"
                    },
                    {
                    "shortname": "MK",
                    "longname": "Macedonia, The Former Yugoslav Republic of",
                    "displayName": "Macedonia, The Former Yugoslav Republic of"
                    },
                    {
                    "shortname": "MG",
                    "longname": "Madagascar",
                    "displayName": "Madagascar"
                    },
                    {
                    "shortname": "MW",
                    "longname": "Malawi",
                    "displayName": "Malawi"
                    },
                    {
                    "shortname": "MY",
                    "longname": "Malaysia",
                    "displayName": "Malaysia"
                    },
                    {
                    "shortname": "MV",
                    "longname": "Maldives",
                    "displayName": "Maldives"
                    },
                    {
                    "shortname": "ML",
                    "longname": "Mali",
                    "displayName": "Mali"
                    },
                    {
                    "shortname": "MT",
                    "longname": "Malta",
                    "displayName": "Malta"
                    },
                    {
                    "shortname": "MH",
                    "longname": "Marshall Islands",
                    "displayName": "Marshall Islands"
                    },
                    {
                    "shortname": "MQ",
                    "longname": "Martinique",
                    "displayName": "Martinique"
                    },
                    {
                    "shortname": "MR",
                    "longname": "Mauritania",
                    "displayName": "Mauritania"
                    },
                    {
                    "shortname": "MU",
                    "longname": "Mauritius",
                    "displayName": "Mauritius"
                    },
                    {
                    "shortname": "YT",
                    "longname": "Mayotte",
                    "displayName": "Mayotte"
                    },
                    {
                    "shortname": "MX",
                    "longname": "Mexico",
                    "displayName": "Mexico"
                    },
                    {
                    "shortname": "FM",
                    "longname": "Micronesia, Federated States of",
                    "displayName": "Micronesia, Federated States of"
                    },
                    {
                    "shortname": "MD",
                    "longname": "Moldova, Republic of",
                    "displayName": "Moldova, Republic of"
                    },
                    {
                    "shortname": "MC",
                    "longname": "Monaco",
                    "displayName": "Monaco"
                    },
                    {
                    "shortname": "MN",
                    "longname": "Mongolia",
                    "displayName": "Mongolia"
                    },
                    {
                    "shortname": "ME",
                    "longname": "Montenegro",
                    "displayName": "Montenegro"
                    },
                    {
                    "shortname": "MS",
                    "longname": "Montserrat",
                    "displayName": "Montserrat"
                    },
                    {
                    "shortname": "MA",
                    "longname": "Morocco",
                    "displayName": "Morocco"
                    },
                    {
                    "shortname": "MZ",
                    "longname": "Mozambique",
                    "displayName": "Mozambique"
                    },
                    {
                    "shortname": "MM",
                    "longname": "Myanmar",
                    "displayName": "Myanmar"
                    },
                    {
                    "shortname": "NA",
                    "longname": "Namibia",
                    "displayName": "Namibia"
                    },
                    {
                    "shortname": "NR",
                    "longname": "Nauru",
                    "displayName": "Nauru"
                    },
                    {
                    "shortname": "NP",
                    "longname": "Nepal",
                    "displayName": "Nepal"
                    },
                    {
                    "shortname": "NL",
                    "longname": "Netherlands",
                    "displayName": "Netherlands"
                    },
                    {
                    "shortname": "AN",
                    "longname": "Netherlands Antilles",
                    "displayName": "Netherlands Antilles"
                    },
                    {
                    "shortname": "NC",
                    "longname": "New Caledonia",
                    "displayName": "New Caledonia"
                    },
                    {
                    "shortname": "NZ",
                    "longname": "New Zealand",
                    "displayName": "New Zealand"
                    },
                    {
                    "shortname": "NI",
                    "longname": "Nicaragua",
                    "displayName": "Nicaragua"
                    },
                    {
                    "shortname": "NE",
                    "longname": "Niger",
                    "displayName": "Niger"
                    },
                    {
                    "shortname": "NG",
                    "longname": "Nigeria",
                    "displayName": "Nigeria"
                    },
                    {
                    "shortname": "NU",
                    "longname": "Niue",
                    "displayName": "Niue"
                    },
                    {
                    "shortname": "NF",
                    "longname": "Norfolk Island",
                    "displayName": "Norfolk Island"
                    },
                    {
                    "shortname": "MP",
                    "longname": "Northern Mariana Islands",
                    "displayName": "Northern Mariana Islands"
                    },
                    {
                    "shortname": "NO",
                    "longname": "Norway",
                    "displayName": "Norway"
                    },
                    {
                    "shortname": "OM",
                    "longname": "Oman",
                    "displayName": "Oman"
                    },
                    {
                    "shortname": "PK",
                    "longname": "Pakistan",
                    "displayName": "Pakistan"
                    },
                    {
                    "shortname": "PW",
                    "longname": "Palau",
                    "displayName": "Palau"
                    },
                    {
                    "shortname": "PS",
                    "longname": "Palestinian Territory, Occupied",
                    "displayName": "Palestinian Territory, Occupied"
                    },
                    {
                    "shortname": "PA",
                    "longname": "Panama",
                    "displayName": "Panama"
                    },
                    {
                    "shortname": "PG",
                    "longname": "Papua New Guinea",
                    "displayName": "Papua New Guinea"
                    },
                    {
                    "shortname": "PY",
                    "longname": "Paraguay",
                    "displayName": "Paraguay"
                    },
                    {
                    "shortname": "PE",
                    "longname": "Peru",
                    "displayName": "Peru"
                    },
                    {
                    "shortname": "PH",
                    "longname": "Philippines",
                    "displayName": "Philippines"
                    },
                    {
                    "shortname": "PN",
                    "longname": "Pitcairn",
                    "displayName": "Pitcairn"
                    },
                    {
                    "shortname": "PL",
                    "longname": "Poland",
                    "displayName": "Poland"
                    },
                    {
                    "shortname": "PT",
                    "longname": "Portugal",
                    "displayName": "Portugal"
                    },
                    {
                    "shortname": "PR",
                    "longname": "Puerto Rico",
                    "displayName": "Puerto Rico"
                    },
                    {
                    "shortname": "QA",
                    "longname": "Qatar",
                    "displayName": "Qatar"
                    },
                    {
                    "shortname": "RE",
                    "longname": "Reunion",
                    "displayName": "Reunion"
                    },
                    {
                    "shortname": "RO",
                    "longname": "Romania",
                    "displayName": "Romania"
                    },
                    {
                    "shortname": "RU",
                    "longname": "Russian Federation",
                    "displayName": "Russian Federation"
                    },
                    {
                    "shortname": "RW",
                    "longname": "Rwanda",
                    "displayName": "Rwanda"
                    },
                    {
                    "shortname": "BL",
                    "longname": "Saint Barthélemy",
                    "displayName": "Saint Barthélemy"
                    },
                    {
                    "shortname": "SH",
                    "longname": "Saint Helena",
                    "displayName": "Saint Helena"
                    },
                    {
                    "shortname": "KN",
                    "longname": "Saint Kitts and Nevis",
                    "displayName": "Saint Kitts and Nevis"
                    },
                    {
                    "shortname": "LC",
                    "longname": "Saint Lucia",
                    "displayName": "Saint Lucia"
                    },
                    {
                    "shortname": "MF",
                    "longname": "Saint Martin",
                    "displayName": "Saint Martin"
                    },
                    {
                    "shortname": "PM",
                    "longname": "Saint Pierre and Miquelon",
                    "displayName": "Saint Pierre and Miquelon"
                    },
                    {
                    "shortname": "VC",
                    "longname": "Saint Vincent and the Grenadines",
                    "displayName": "Saint Vincent and the Grenadines"
                    },
                    {
                    "shortname": "WS",
                    "longname": "Samoa",
                    "displayName": "Samoa"
                    },
                    {
                    "shortname": "SM",
                    "longname": "San Marino",
                    "displayName": "San Marino"
                    },
                    {
                    "shortname": "ST",
                    "longname": "Sao Tome and Principe",
                    "displayName": "Sao Tome and Principe"
                    },
                    {
                    "shortname": "SA",
                    "longname": "Saudi Arabia",
                    "displayName": "Saudi Arabia"
                    },
                    {
                    "shortname": "SN",
                    "longname": "Senegal",
                    "displayName": "Senegal"
                    },
                    {
                    "shortname": "RS",
                    "longname": "Serbia",
                    "displayName": "Serbia"
                    },
                    {
                    "shortname": "SC",
                    "longname": "Seychelles",
                    "displayName": "Seychelles"
                    },
                    {
                    "shortname": "SL",
                    "longname": "Sierra Leone",
                    "displayName": "Sierra Leone"
                    },
                    {
                    "shortname": "SG",
                    "longname": "Singapore",
                    "displayName": "Singapore"
                    },
                    {
                    "shortname": "SK",
                    "longname": "Slovakia",
                    "displayName": "Slovakia"
                    },
                    {
                    "shortname": "SI",
                    "longname": "Slovenia",
                    "displayName": "Slovenia"
                    },
                    {
                    "shortname": "SB",
                    "longname": "Solomon Islands",
                    "displayName": "Solomon Islands"
                    },
                    {
                    "shortname": "SO",
                    "longname": "Somalia",
                    "displayName": "Somalia"
                    },
                    {
                    "shortname": "ZA",
                    "longname": "South Africa",
                    "displayName": "South Africa"
                    },
                    {
                    "shortname": "GS",
                    "longname": "South Georgia and the South Sandwich Islands",
                    "displayName": "South Georgia and the South Sandwich Islands"
                    },
                    {
                    "shortname": "ES",
                    "longname": "Spain",
                    "displayName": "Spain"
                    },
                    {
                    "shortname": "LK",
                    "longname": "Sri Lanka",
                    "displayName": "Sri Lanka"
                    },
                    {
                    "shortname": "SD",
                    "longname": "Sudan",
                    "displayName": "Sudan"
                    },
                    {
                    "shortname": "SR",
                    "longname": "Suriname",
                    "displayName": "Suriname"
                    },
                    {
                    "shortname": "SJ",
                    "longname": "Svalbard and Jan Mayen",
                    "displayName": "Svalbard and Jan Mayen"
                    },
                    {
                    "shortname": "SZ",
                    "longname": "Swaziland",
                    "displayName": "Swaziland"
                    },
                    {
                    "shortname": "SE",
                    "longname": "Sweden",
                    "displayName": "Sweden"
                    },
                    {
                    "shortname": "CH",
                    "longname": "Switzerland",
                    "displayName": "Switzerland"
                    },
                    {
                    "shortname": "SY",
                    "longname": "Syrian Arab Republic",
                    "displayName": "Syrian Arab Republic"
                    },
                    {
                    "shortname": "TW",
                    "longname": "Taiwan, Province Of China",
                    "displayName": "Taiwan, Province Of China"
                    },
                    {
                    "shortname": "TJ",
                    "longname": "Tajikistan",
                    "displayName": "Tajikistan"
                    },
                    {
                    "shortname": "TZ",
                    "longname": "Tanzania, United Republic of",
                    "displayName": "Tanzania, United Republic of"
                    },
                    {
                    "shortname": "TH",
                    "longname": "Thailand",
                    "displayName": "Thailand"
                    },
                    {
                    "shortname": "TL",
                    "longname": "Timor-Leste",
                    "displayName": "Timor-Leste"
                    },
                    {
                    "shortname": "TG",
                    "longname": "Togo",
                    "displayName": "Togo"
                    },
                    {
                    "shortname": "TK",
                    "longname": "Tokelau",
                    "displayName": "Tokelau"
                    },
                    {
                    "shortname": "TO",
                    "longname": "Tonga",
                    "displayName": "Tonga"
                    },
                    {
                    "shortname": "TT",
                    "longname": "Trinidad and Tobago",
                    "displayName": "Trinidad and Tobago"
                    },
                    {
                    "shortname": "TN",
                    "longname": "Tunisia",
                    "displayName": "Tunisia"
                    },
                    {
                    "shortname": "TR",
                    "longname": "Turkey",
                    "displayName": "Turkey"
                    },
                    {
                    "shortname": "TM",
                    "longname": "Turkmenistan",
                    "displayName": "Turkmenistan"
                    },
                    {
                    "shortname": "TC",
                    "longname": "Turks and Caicos Islands",
                    "displayName": "Turks and Caicos Islands"
                    },
                    {
                    "shortname": "TV",
                    "longname": "Tuvalu",
                    "displayName": "Tuvalu"
                    },
                    {
                    "shortname": "UG",
                    "longname": "Uganda",
                    "displayName": "Uganda"
                    },
                    {
                    "shortname": "UA",
                    "longname": "Ukraine",
                    "displayName": "Ukraine"
                    },
                    {
                    "shortname": "AE",
                    "longname": "United Arab Emirates",
                    "displayName": "United Arab Emirates"
                    },
                    {
                    "shortname": "UM",
                    "longname": "United States Minor Outlying Islands",
                    "displayName": "United States Minor Outlying Islands"
                    },
                    {
                    "shortname": "UY",
                    "longname": "Uruguay",
                    "displayName": "Uruguay"
                    },
                    {
                    "shortname": "UZ",
                    "longname": "Uzbekistan",
                    "displayName": "Uzbekistan"
                    },
                    {
                     "shortname": "GB",
                      "longname": "UK",
                      "displayName": "UK"
                     },
                    {
                    "shortname": "VU",
                    "longname": "Vanuatu",
                    "displayName": "Vanuatu"
                    },
                    {
                    "shortname": "VE",
                    "longname": "Venezuela",
                    "displayName": "Venezuela"
                    },
                    {
                    "shortname": "VN",
                    "longname": "Viet Nam",
                    "displayName": "Viet Nam"
                    },
                    {
                    "shortname": "VG",
                    "longname": "Virgin Islands, British",
                    "displayName": "Virgin Islands, British"
                    },
                    {
                    "shortname": "VI",
                    "longname": "Virgin Islands, U.S.",
                    "displayName": "Virgin Islands, U.S."
                    },
                    {
                    "shortname": "WF",
                    "longname": "Wallis And Futuna",
                    "displayName": "Wallis And Futuna"
                    },
                    {
                    "shortname": "EH",
                    "longname": "Western Sahara",
                    "displayName": "Western Sahara"
                    },
                    {
                    "shortname": "YE",
                    "longname": "Yemen",
                    "displayName": "Yemen"
                    },
                    {
                    "shortname": "ZM",
                    "longname": "Zambia",
                    "displayName": "Zambia"
                    },
                    {
                    "shortname": "ZW",
                    "longname": "Zimbabwe",
                    "displayName": "Zimbabwe"
                    }
                    ]
    },
    "countryList_pt": {
        "country": [
                    {
                    "shortname": "US",
                    "longname": "United States",
                    "displayName": "Estados Unidos"
                    },
                    {
                    "shortname": "US",
                    "longname": "USA",
                    "displayName": "EUA"
                    },
                    {
                    "shortname": "GB",
                    "longname": "United Kingdom",
                    "displayName": "Reino Unido"
                    },
                    {
                    "shortname": "AF",
                    "longname": "Afghanistan",
                    "displayName": "Afeganistão"
                    },
                    {
                    "shortname": "AX",
                    "longname": "Åland Islands",
                    "displayName": "Ilhas de Aland"
                    },
                    {
                    "shortname": "AL",
                    "longname": "Albania",
                    "displayName": "Albânia"
                    },
                    {
                    "shortname": "DZ",
                    "longname": "Algeria",
                    "displayName": "Algéria"
                    },
                    {
                    "shortname": "AS",
                    "longname": "American Samoa",
                    "displayName": "Samoa Americana"
                    },
                    {
                    "shortname": "AD",
                    "longname": "Andorra",
                    "displayName": "Andorra"
                    },
                    {
                    "shortname": "AO",
                    "longname": "Angola",
                     "displayName": "Angola"
                    },
                    {
                    "shortname": "AI",
                    "longname": "Anguilla",
                    "displayName": "Anguilla"
                    },
                    {
                    "shortname": "AQ",
                    "longname": "Antarctica",
                    "displayName": "Antártica"
                    },
                    {
                    "shortname": "AG",
                    "longname": "Antigua and Barbuda",
                    "displayName": "Antigua and Barbuda"
                    },
                    {
                    "shortname": "AR",
                    "longname": "Argentina",
                    "displayName": "Argentina"
                    },
                    {
                    "shortname": "AM",
                    "longname": "Armenia",
                    "displayName": "Armênia"
                    },
                    {
                    "shortname": "AW",
                    "longname": "Aruba",
                    "displayName": "Aruba"
                    },
                    {
                    "shortname": "AU",
                    "longname": "Australia",
                     "displayName": "Austrália"
                    },
                    {
                    "shortname": "AT",
                    "longname": "Austria",
                    "displayName": "Áustria"
                    },
                    {
                    "shortname": "AZ",
                    "longname": "Azerbaijan",
                    "displayName": "Azerbaijão"
                    },
                    {
                    "shortname": "BS",
                    "longname": "Bahamas",
                    "displayName": "Bahamas"
                    },
                    {
                    "shortname": "BH",
                    "longname": "Bahrain",
                    "displayName": "Bahrein"
                    },
                    {
                    "shortname": "BD",
                    "longname": "Bangladesh",
                    "displayName": "Bangladesh"
                    },
                    {
                    "shortname": "BB",
                    "longname": "Barbados",
                    "displayName": "Barbados"
                    },
                    {
                    "shortname": "BY",
                    "longname": "Belarus",
                    "displayName": "Belarus"
                    },
                    {
                    "shortname": "BE",
                    "longname": "Belgium",
                     "displayName": "Bélgica"
                    },
                    {
                    "shortname": "BZ",
                    "longname": "Belize",
                     "displayName": "Belize"
                    },
                    {
                    "shortname": "BJ",
                    "longname": "Benin",
                    "displayName": "Benim"
                    },
                    {
                    "shortname": "BM",
                    "longname": "Bermuda",
                    "displayName": "Bermuda"
                    },
                    {
                    "shortname": "BT",
                    "longname": "Bhutan",
                    "displayName": "Butão"
                    },
                    {
                    "shortname": "BO",
                    "longname": "Bolivia",
                    "displayName": "Bolívia"
                    },
                    {
                    "shortname": "BA",
                    "longname": "Bosnia and Herzegovina",
                       "displayName": "Bósnia e Herzegovina"
                    },
                    {
                    "shortname": "BW",
                    "longname": "Botswana",
                     "displayName": "Botsuana"
                    },
                    {
                    "shortname": "BV",
                    "longname": "Bouvet Island",
                    "displayName": "Ilha Bouvet"
                    },
                    {
                    "shortname": "BR",
                    "longname": "Brazil",
                     "displayName": "Brasil"
                    },
                    {
                    "shortname": "IO",
                    "longname": "British Indian Ocean Territory",
                    "displayName": "Território Britânico do Oceano Índico"
                    },
                    {
                    "shortname": "BN",
                    "longname": "Brunei Darussalam",
                     "displayName": "Brunei Darussalam"
                    },
                    {
                    "shortname": "BG",
                    "longname": "Bulgaria",
                     "displayName": "Bulgária"
                    },
                    {
                    "shortname": "BF",
                    "longname": "Burkina Faso",
                    "displayName": "Burkina Faso"
                    },
                    {
                    "shortname": "BI",
                    "longname": "Burundi",
                    "displayName": "Burundi"
                    },
                    {
                    "shortname": "KH",
                    "longname": "Cambodia",
                    "displayName": "Camboja"
                    },
                    {
                    "shortname": "CM",
                    "longname": "Cameroon",
                     "displayName": "Camarões"
                    },
                    {
                    "shortname": "CA",
                    "longname": "Canada",
                    "displayName": "Canadá"
                    },
                    {
                    "shortname": "CV",
                    "longname": "Cape Verde",
                    "displayName": "Cabo Verde"
                    },
                    {
                    "shortname": "KY",
                    "longname": "Cayman Islands",
                    "displayName": "Ilhas Cayman"
                    },
                    {
                    "shortname": "CF",
                    "longname": "Central African Republic",
                    "displayName": "República Centro-Africana"
                    },
                    {
                    "shortname": "TD",
                    "longname": "Chad",
                    "displayName": "Chade"
                    },
                    {
                    "shortname": "CL",
                    "longname": "Chile",
                     "displayName": "Chile"
                    },
                    {
                    "shortname": "CN",
                    "longname": "China",
                    "displayName": "China"
                    },
                    {
                    "shortname": "CX",
                    "longname": "Christmas Island",
                    "displayName": " Ilha do Natal"
                    },
                    {
                    "shortname": "CC",
                    "longname": "Cocos (Keeling) Islands",
                    "displayName": " Ilhas Cocos (Keeling) "
                    },
                    {
                    "shortname": "CO",
                    "longname": "Colombia",
                    "displayName": "Colômbia"
                    },
                    {
                    "shortname": "KM",
                    "longname": "Comoros",
                    "displayName": "Comores"
                    },
                    {
                    "shortname": "CG",
                    "longname": "Congo",
                    "displayName": "Congo"
                    },
                    {
                    "shortname": "CD",
                    "longname": "Congo, The Democratic Republic of the",
                    "displayName": "Congo, A República Democrática do"
                    },
                    {
                    "shortname": "CK",
                    "longname": "Cook Islands",
                    "displayName": "Ilhas Cook"
                    },
                    {
                    "shortname": "CR",
                    "longname": "Costa Rica",
                    "displayName": "Costa Rica"
                    },
                    {
                    "shortname": "CI",
                    "longname": "Côte D'Ivoire",
                    "displayName": "Costa do Marfim"
                    },
                    {
                    "shortname": "HR",
                    "longname": "Croatia",
                    "displayName": "Croácia"
                    },
                    {
                    "shortname": "CU",
                    "longname": "Cuba",
                    "displayName": "Cuba"
                    },
                    {
                    "shortname": "CY",
                    "longname": "Cyprus",
                    "displayName": "Chipre"
                    },
                    {
                    "shortname": "CZ",
                    "longname": "Czech Republic",
                    "displayName": "República Tcheca"
                    },
                    {
                    "shortname": "DK",
                    "longname": "Denmark",
                    "displayName": "Dinamarca"
                    },
                    {
                    "shortname": "DJ",
                    "longname": "Djibouti",
                    "displayName": "Jibuti"
                    },
                    {
                    "shortname": "DM",
                    "longname": "Dominica",
                    "displayName": "Dominica"
                    },
                    {
                    "shortname": "DO",
                    "longname": "Dominican Republic",
                    "displayName": "República Dominicana"
                    },
                    {
                    "shortname": "EC",
                    "longname": "Ecuador",
                    "displayName": "Equador"
                    },
                    {
                    "shortname": "EG",
                    "longname": "Egypt",
                    "displayName": "Egito"
                    },
                    {
                    "shortname": "SV",
                    "longname": "El Salvador",
                     "displayName": "El Salvador"
                    },
                    {
                    "shortname": "GQ",
                    "longname": "Equatorial Guinea",
                    "displayName": "Guinea Equatorial "
                    },
                    {
                    "shortname": "ER",
                    "longname": "Eritrea",
                    "displayName": "Eritrea"
                    },
                    {
                    "shortname": "EE",
                    "longname": "Estonia",
                    "displayName": "Estônia"
                    },
                    {
                    "shortname": "ET",
                    "longname": "Ethiopia",
                    "displayName": "Etiópia"
                    },
                    {
                    "shortname": "FK",
                    "longname": "Falkland Islands (Malvinas)",
                    "displayName": "Ilhas Falkland (Malvinas)"
                    },
                    {
                    "shortname": "FO",
                    "longname": "Faroe Islands",
                     "displayName": " Ilhas Faroé"
                    },
                    {
                    "shortname": "FJ",
                    "longname": "Fiji",
                    "displayName": "Fiji"
                    },
                    {
                    "shortname": "FI",
                    "longname": "Finland",
                     "displayName": "Finlândia"
                    },
                    {
                    "shortname": "FR",
                    "longname": "France",
                    "displayName": "França"
                    },
                    {
                    "shortname": "GF",
                    "longname": "French Guiana",
                     "displayName": "Guiana Francesa"
                    },
                    {
                    "shortname": "PF",
                    "longname": "French Polynesia",
                    "displayName": "Polinésia Francesa"
                    },
                    {
                    "shortname": "TF",
                    "longname": "French Southern Territories",
                    "displayName": "Terras Austrais e Antárticas Francesas"
                    },
                    {
                    "shortname": "GA",
                    "longname": "Gabon",
                    "displayName": "Gabão"
                    },
                    {
                    "shortname": "GM",
                    "longname": "Gambia",
                     "displayName": "Gâmbia"
                    },
                    {
                    "shortname": "GE",
                    "longname": "Georgia",
                    "displayName": "Geórgia"
                    },
                    {
                    "shortname": "DE",
                    "longname": "Germany",
                    "displayName": "Alemanha"
                    },
                    {
                    "shortname": "GH",
                    "longname": "Ghana",
                    "displayName": "Gana"
                    },
                    {
                    "shortname": "GI",
                    "longname": "Gibraltar",
                    "displayName": "Gibraltar"
                    },
                    {
                    "shortname": "GR",
                    "longname": "Greece",
                    "displayName": "Grécia"
                    },
                    {
                    "shortname": "GL",
                    "longname": "Greenland",
                    "displayName": "Groelândia"
                    },
                    {
                    "shortname": "GD",
                    "longname": "Grenada",
                    "displayName": "Granada"
                    },
                    {
                    "shortname": "GP",
                    "longname": "Guadeloupe",
                    "displayName": "Guadalupe"
                    },
                    {
                    "shortname": "GU",
                    "longname": "Guam",
                    "displayName": "Guam"
                    },
                    {
                    "shortname": "GT",
                    "longname": "Guatemala",
                    "displayName": "Guatemala"
                    },
                    {
                    "shortname": "GG",
                    "longname": "Guernsey",
                    "displayName": "Guernsey"
                    },
                    {
                    "shortname": "GN",
                    "longname": "Guinea",
                    "displayName": "Guiné"
                    },
                    {
                    "shortname": "GW",
                    "longname": "Guinea-Bissau",
                    "displayName": "Guiné-Bissau"
                    },
                    {
                    "shortname": "GY",
                    "longname": "Guyana",
                    "displayName": "Guiana"
                    },
                    {
                    "shortname": "HT",
                    "longname": "Haiti",
                    "displayName": "Haiti"
                    },
                    {
                    "shortname": "HM",
                    "longname": "Heard Island and McDonald Islands",
                    "displayName": " Ilhas Heard e McDonald"
                    },
                    {
                    "shortname": "VA",
                    "longname": "Holy See (Vatican City State)",
                    "displayName": "Cidade Estado do Vaticano"
                    },
                    {
                    "shortname": "HN",
                    "longname": "Honduras",
                    "displayName": "Honduras"
                    },
                    {
                    "shortname": "HK",
                    "longname": "Hong Kong",
                    "displayName": "Hong Kong"
                    },
                    {
                    "shortname": "HU",
                    "longname": "Hungary",
                    "displayName": "Hungria"
                    },
                    {
                    "shortname": "IS",
                    "longname": "Iceland",
                    "displayName": "Islândia"
                    },
                    {
                    "shortname": "IN",
                    "longname": "India",
                    "displayName": "Índia"
                    },
                    {
                    "shortname": "ID",
                    "longname": "Indonesia",
                    "displayName": "Indonésia"
                    },
                    {
                    "shortname": "IR",
                    "longname": "Iran, Islamic Republic of",
                    "displayName": "Irã, República Islâmica do"
                    },
                    {
                    "shortname": "IQ",
                    "longname": "Iraq",
                    "displayName": "Iraque"
                    },
                    {
                    "shortname": "IE",
                    "longname": "Ireland",
                    "displayName": "Irlanda"
                    },
                    {
                    "shortname": "IM",
                    "longname": "Isle of Man",
                    "displayName": "Ilha de Man"
                    },
                    {
                    "shortname": "IL",
                    "longname": "Israel",
                    "displayName": "Israel"
                    },
                    {
                    "shortname": "IT",
                    "longname": "Italy",
                    "displayName": "Itália"
                    },
                    {
                    "shortname": "JM",
                    "longname": "Jamaica",
                    "displayName": "Jamaica"
                    },
                    {
                    "shortname": "JP",
                    "longname": "Japan",
                    "displayName": "Japão"
                    },
                    {
                    "shortname": "JE",
                    "longname": "Jersey",
                    "displayName": "Jersey"
                    },
                    {
                    "shortname": "JO",
                    "longname": "Jordan",
                    "displayName": "Jordânia"
                    },
                    {
                    "shortname": "KZ",
                    "longname": "Kazakhstan",
                    "displayName": " Cazaquistão "
                    },
                    {
                    "shortname": "KE",
                    "longname": "Kenya",
                    "displayName": "Quênia"
                    },
                    {
                    "shortname": "KI",
                    "longname": "Kiribati",
                    "displayName": "Quiribati"
                    },
                    {
                    "shortname": "KP",
                    "longname": "Korea, Democratic People's Republic of",
                    "displayName": "Coréia, República Popular Democrática da (Norte)"
                    },
                    {
                    "shortname": "KR",
                    "longname": "Korea, Republic of",
                     "displayName": "Coréia, República da (Sul)"
                    },
                    {
                    "shortname": "KW",
                    "longname": "Kuwait",
                    "displayName": "Kuwait"
                    },
                    {
                    "shortname": "KG",
                    "longname": "Kyrgyzstan",
                     "displayName": "Quirguistão"
                    },
                    {
                    "shortname": "LA",
                    "longname": "Lao People's Democratic Republic",
                    "displayName": "Laos, República Popular Democrática de"
                    },
                    {
                    "shortname": "LV",
                    "longname": "Latvia",
                     "displayName": "Latávia"
                    },
                    {
                    "shortname": "LB",
                    "longname": "Lebanon",
                    "displayName": "Líbano"
                    },
                    {
                    "shortname": "LS",
                    "longname": "Lesotho",
                    "displayName": "Lesoto"
                    },
                    {
                    "shortname": "LR",
                    "longname": "Liberia",
                    "displayName": "Libéria"
                    },
                    {
                    "shortname": "LY",
                    "longname": "Libyan Arab Jamahiriya",
                    "displayName": "Líbia"
                    },
                    {
                    "shortname": "LI",
                    "longname": "Liechtenstein",
                    "displayName": "Liechtenstein"
                    },
                    {
                    "shortname": "LT",
                    "longname": "Lithuania",
                    "displayName": "Lituânia"
                    },
                    {
                    "shortname": "LU",
                    "longname": "Luxembourg",
                    "displayName": "Luxemburgo"
                    },
                    {
                    "shortname": "MO",
                    "longname": "Macao",
                    "displayName": "Macao"
                    },
                    {
                    "shortname": "MK",
                    "longname": "Macedonia, The Former Yugoslav Republic of",
                    "displayName": "Macedônia"
                    },
                    {
                    "shortname": "MG",
                    "longname": "Madagascar",
                    "displayName": "Madagascar"
                    },
                    {
                    "shortname": "MW",
                    "longname": "Malawi",
                     "displayName": "Malawi"
                    },
                    {
                    "shortname": "MY",
                    "longname": "Malaysia",
                     "displayName": "Malásia"
                    },
                    {
                    "shortname": "MV",
                    "longname": "Maldives",
                    "displayName": "Maldivas"
                    },
                    {
                    "shortname": "ML",
                    "longname": "Mali",
                    "displayName": "Mali"
                    },
                    {
                    "shortname": "MT",
                    "longname": "Malta",
                    "displayName": "Malta"
                    },
                    {
                    "shortname": "MH",
                    "longname": "Marshall Islands",
                     "displayName": "Ilhas Marshall "
                    },
                    {
                    "shortname": "MQ",
                    "longname": "Martinique",
                     "displayName": "Martinica"
                    },
                    {
                    "shortname": "MR",
                    "longname": "Mauritania",
                    "displayName": "Mauritânia"
                    },
                    {
                    "shortname": "MU",
                    "longname": "Mauritius",
                     "displayName": " Maurício"
                    },
                    {
                    "shortname": "YT",
                    "longname": "Mayotte",
                    "displayName": "Maiote"
                    },
                    {
                    "shortname": "MX",
                    "longname": "Mexico",
                    "displayName": "México"
                    },
                    {
                    "shortname": "FM",
                    "longname": "Micronesia, Federated States of",
                    "displayName": "Micronésia, Estados Federados da"
                    },
                    {
                    "shortname": "MD",
                    "longname": "Moldova, Republic of",
                    "displayName": "Moldávia"
                    },
                    {
                    "shortname": "MC",
                    "longname": "Monaco",
                    "displayName": "Mônaco"
                    },
                    {
                    "shortname": "MN",
                    "longname": "Mongolia",
                     "displayName": "Mongólia"
                    },
                    {
                    "shortname": "ME",
                    "longname": "Montenegro",
                    "displayName": "Montenegro"
                    },
                    {
                    "shortname": "MS",
                    "longname": "Montserrat",
                    "displayName": "Monserrate"
                    },
                    {
                    "shortname": "MA",
                    "longname": "Morocco",
                    "displayName": "Marrocos"
                    },
                    {
                    "shortname": "MZ",
                    "longname": "Mozambique",
                    "displayName": "Moçambique"
                    },
                    {
                    "shortname": "MM",
                    "longname": "Myanmar",
                    "displayName": "Myanmar (Birmânia)"
                    },
                    {
                    "shortname": "NA",
                    "longname": "Namibia",
                    "displayName": "Namíbia"
                    },
                    {
                    "shortname": "NR",
                    "longname": "Nauru",
                    "displayName": "Nauru"
                    },
                    {
                    "shortname": "NP",
                    "longname": "Nepal",
                    "displayName": "Nepal"
                    },
                    {
                    "shortname": "NL",
                    "longname": "Netherlands",
                    "displayName": "Holanda"
                    },
                    {
                    "shortname": "AN",
                    "longname": "Netherlands Antilles",
                    "displayName": "Antilhas Holandesas"
                    },
                    {
                    "shortname": "NC",
                    "longname": "New Caledonia",
                     "displayName": "Nova Caledônia"
                    },
                    {
                    "shortname": "NZ",
                    "longname": "New Zealand",
                    "displayName": "Nova Zelândia"
                    },
                    {
                    "shortname": "NI",
                    "longname": "Nicaragua",
                    "displayName": "Nicarágua"
                    },
                    {
                    "shortname": "NE",
                    "longname": "Niger",
                     "displayName": "Níger"
                    },
                    {
                    "shortname": "NG",
                    "longname": "Nigeria",
                    "displayName": "Nigéria"
                    },
                    {
                    "shortname": "NU",
                    "longname": "Niue",
                    "displayName": "Niuê"
                    },
                    {
                    "shortname": "NF",
                    "longname": "Norfolk Island",
                    "displayName": "Ilha Norfolk"
                    },
                    {
                    "shortname": "MP",
                    "longname": "Northern Mariana Islands",
                    "displayName": "Marianas Setentrionais"
                    },
                    {
                    "shortname": "NO",
                    "longname": "Norway",
                    "displayName": "Noruega"
                    },
                    {
                    "shortname": "OM",
                    "longname": "Oman",
                    "displayName": "Omã"
                    },
                    {
                    "shortname": "PK",
                    "longname": "Pakistan",
                     "displayName": "Paquistão"
                    },
                    {
                    "shortname": "PW",
                    "longname": "Palau",
                    "displayName": "Palau"
                    },
                    {
                    "shortname": "PS",
                    "longname": "Palestinian Territory, Occupied",
                    "displayName": "Palestina, Território Ocupado da"
                    },
                    {
                    "shortname": "PA",
                    "longname": "Panama",
                    "displayName": "Panamá"
                    },
                    {
                    "shortname": "PG",
                    "longname": "Papua New Guinea",
                    "displayName": "Papua Nova Guiné"
                    },
                    {
                    "shortname": "PY",
                    "longname": "Paraguay",
                    "displayName": "Paraguai"
                    },
                    {
                    "shortname": "PE",
                    "longname": "Peru",
                    "displayName": "Peru"
                    },
                    {
                    "shortname": "PH",
                    "longname": "Philippines",
                    "displayName": "Filipinas"
                    },
                    {
                    "shortname": "PN",
                    "longname": "Pitcairn",
                    "displayName": " Ilhas Picárnia "
                    },
                    {
                    "shortname": "PL",
                    "longname": "Poland",
                    "displayName": "Polônia"
                    },
                    {
                    "shortname": "PT",
                    "longname": "Portugal",
                    "displayName": "Portugal"
                    },
                    {
                    "shortname": "PR",
                    "longname": "Puerto Rico",
                    "displayName": "Porto Rico"
                    },
                    {
                    "shortname": "QA",
                    "longname": "Qatar",
                    "displayName": "Qatar"
                    },
                    {
                    "shortname": "RE",
                    "longname": "Reunion",
                    "displayName": "Reunião"
                    },
                    {
                    "shortname": "RO",
                    "longname": "Romania",
                    "displayName": "România"
                    },
                    {
                    "shortname": "RU",
                    "longname": "Russian Federation",
                    "displayName": "Rússia"
                    },
                    {
                    "shortname": "RW",
                    "longname": "Rwanda",
                    "displayName": "Ruanda"
                    },
                    {
                    "shortname": "BL",
                    "longname": "Saint Barthélemy",
                     "displayName": "São Bartolomeu"
                    },
                    {
                    "shortname": "SH",
                    "longname": "Saint Helena",
                    "displayName": "Santa Helena"
                    },
                    {
                    "shortname": "KN",
                    "longname": "Saint Kitts and Nevis",
                    "displayName": "São Cristóvão e Neves"
                    },
                    {
                    "shortname": "LC",
                    "longname": "Saint Lucia",
                    "displayName": "Santa Lucia"
                    },
                    {
                    "shortname": "MF",
                    "longname": "Saint Martin",
                    "displayName": "São Martinho (Saint Martin)"
                    },
                    {
                    "shortname": "PM",
                    "longname": "Saint Pierre and Miquelon",
                    "displayName": "São Pedro e Miquelão"
                    },
                    {
                    "shortname": "VC",
                    "longname": "Saint Vincent and the Grenadines",
                    "displayName": "São Vicente e Granadinas"
                    },
                    {
                    "shortname": "WS",
                    "longname": "Samoa",
                    "displayName": "Samoa"
                    },
                    {
                    "shortname": "SM",
                    "longname": "San Marino",
                    "displayName": "São Marino"
                    },
                    {
                    "shortname": "ST",
                    "longname": "Sao Tome and Principe",
                    "displayName": "São Tomé e Princípe"
                    },
                    {
                    "shortname": "SA",
                    "longname": "Saudi Arabia",
                    "displayName": "Árabia Saudita "
                    },
                    {
                    "shortname": "SN",
                    "longname": "Senegal",
                    "displayName": "Senegal"
                    },
                    {
                    "shortname": "RS",
                    "longname": "Serbia",
                    "displayName": "Sérvia"
                    },
                    {
                    "shortname": "SC",
                    "longname": "Seychelles",
                    "displayName": "Seychelles"
                    },
                    {
                    "shortname": "SL",
                    "longname": "Sierra Leone",
                    "displayName": "Serra Leoa"
                    },
                    {
                    "shortname": "SG",
                    "longname": "Singapore",
                     "displayName": "Cingapura"
                    },
                    {
                    "shortname": "SK",
                    "longname": "Slovakia",
                    "displayName": "Eslováquia"
                    },
                    {
                    "shortname": "SI",
                    "longname": "Slovenia",
                    "displayName": "Eslovênia"
                    },
                    {
                    "shortname": "SB",
                    "longname": "Solomon Islands",
                     "displayName": "Ilhas Salomão"
                    },
                    {
                    "shortname": "SO",
                    "longname": "Somalia",
                    "displayName": "Somália"
                    },
                    {
                    "shortname": "ZA",
                    "longname": "South Africa",
                    "displayName": "África do Sul"
                    },
                    {
                    "shortname": "GS",
                    "longname": "South Georgia and the South Sandwich Islands",
                     "displayName": " Ilhas Geórgia do Sul e Sandwich do Sul"
                    },
                    {
                    "shortname": "ES",
                    "longname": "Spain",
                    "displayName": "Espanha"
                    },
                    {
                    "shortname": "LK",
                    "longname": "Sri Lanka",
                    "displayName": "Sri Lanka"
                    },
                    {
                    "shortname": "SD",
                    "longname": "Sudan",
                     "displayName": "Sudão"
                    },
                    {
                    "shortname": "SR",
                    "longname": "Suriname",
                    "displayName": "Suriname"
                    },
                    {
                    "shortname": "SJ",
                    "longname": "Svalbard and Jan Mayen",
                    "displayName": "Svalbard e Jan Mayen"
                    },
                    {
                    "shortname": "SZ",
                    "longname": "Swaziland",
                    "displayName": "Suazilândia"
                    },
                    {
                    "shortname": "SE",
                    "longname": "Sweden",
                     "displayName": "Suécia"
                    },
                    {
                    "shortname": "CH",
                    "longname": "Switzerland",
                    "displayName": "Suíça"
                    },
                    {
                    "shortname": "SY",
                    "longname": "Syrian Arab Republic",
                    "displayName": "Síria, República Árabe da"
                    },
                    {
                    "shortname": "TW",
                    "longname": "Taiwan, Province Of China",
                    "displayName": "Taiwan, Província da China"
                    },
                    {
                    "shortname": "TJ",
                    "longname": "Tajikistan",
                    "displayName": "Tajiquistão"
                    },
                    {
                    "shortname": "TZ",
                    "longname": "Tanzania, United Republic of",
                     "displayName": "Tanzânia, República Unida da"
                    },
                    {
                    "shortname": "TH",
                    "longname": "Thailand",
                    "displayName": "Tailândia"
                    },
                    {
                    "shortname": "TL",
                    "longname": "Timor-Leste",
                     "displayName": "Timor-Leste"
                    },
                    {
                    "shortname": "TG",
                    "longname": "Togo",
                     "displayName": "Togo"
                    },
                    {
                    "shortname": "TK",
                    "longname": "Tokelau",
                    "displayName": "Toquelau"
                    },
                    {
                    "shortname": "TO",
                    "longname": "Tonga",
                    "displayName": "Tonga"
                    },
                    {
                    "shortname": "TT",
                    "longname": "Trinidad and Tobago",
                    "displayName": "Trinidad e Tobago"
                    },
                    {
                    "shortname": "TN",
                    "longname": "Tunisia",
                    "displayName": "Tunísia"
                    },
                    {
                    "shortname": "TR",
                    "longname": "Turkey",
                    "displayName": "Turquia"
                    },
                    {
                    "shortname": "TM",
                    "longname": "Turkmenistan",
                    "displayName": "Turcomenistão"
                    },
                    {
                    "shortname": "TC",
                    "longname": "Turks and Caicos Islands",
                    "displayName": "Ilhas Turcas e Caicos"
                    },
                    {
                    "shortname": "TV",
                    "longname": "Tuvalu",
                    "displayName": "Tuvalu"
                    },
                    {
                    "shortname": "UG",
                    "longname": "Uganda",
                    "displayName": "Uganda"
                    },
                    {
                    "shortname": "UA",
                    "longname": "Ukraine",
                    "displayName": "Ucrânia"
                    },
                    {
                    "shortname": "AE",
                    "longname": "United Arab Emirates",
                    "displayName": "Emirados Árabes Unidos"
                    },
                    {
                    "shortname": "UM",
                    "longname": "United States Minor Outlying Islands",
                    "displayName": "Ilhas Menores Distantes dos Estados Unidos"
                    },
                    {
                    "shortname": "UY",
                    "longname": "Uruguay",
                    "displayName": "Uruguai"
                    },
                    {
                    "shortname": "UZ",
                    "longname": "Uzbekistan",
                     "displayName": "Uzbequistão"
                    },
                    {
                    "shortname": "GB",
                    "longname": "UK",
                    "displayName": "Reino Unido"
                    },
                    {
                    "shortname": "VU",
                    "longname": "Vanuatu",
                    "displayName": "Vanuatu"
                    },
                    {
                    "shortname": "VE",
                    "longname": "Venezuela",
                    "displayName": "Venezuela"
                    },
                    {
                    "shortname": "VN",
                    "longname": "Viet Nam",
                    "displayName": "Vietnã"
                    },
                    {
                    "shortname": "VG",
                    "longname": "Virgin Islands, British",
                     "displayName": "Ilhas Virgens Britânicas"
                    },
                    {
                    "shortname": "VI",
                    "longname": "Virgin Islands, U.S.",
                    "displayName": "Ilhas Virgens Americanas."
                    },
                    {
                    "shortname": "WF",
                    "longname": "Wallis And Futuna",
                    "displayName": "Wallis e Futuna"
                    },
                    {
                    "shortname": "EH",
                    "longname": "Western Sahara",
                    "displayName": "Saara Ocidental"
                    },
                    {
                    "shortname": "YE",
                    "longname": "Yemen",
                    "displayName": "Iêmen"
                    },
                    {
                    "shortname": "ZM",
                    "longname": "Zambia",
                    "displayName": "Zâmbia"
                    },
                    {
                    "shortname": "ZW",
                    "longname": "Zimbabwe",
                    "displayName": "Zimbábue"
                    }
                    ]
    }
};

AppyTemplate.registerHelper('getCountry',function (type) {


                          var s = "";
                        //    s += '<option value="" disabled selected>Select Country</option>';
                          var _tempArr;
                          if(data.appData.lang==="pt"){
                            _tempArr=countryArrayList.countryList_pt.country;
                          }else{
                            _tempArr=countryArrayList.countryList.country;
                          }

                            $$.each(_tempArr, function(i, v){
                                    if(v.longname==type)
                                    {
                                    s += '<option selected="selected" value="'+v.longname+'"  id="'+v.shortname+'">'+v.displayName+'</option>';
                                    }
                                    else
                                    {
                                    s += '<option value="'+v.longname+'"  id="'+v.shortname+'">'+v.displayName+'</option>';
                                    }

                                    //s += '<option value="'+v.longname+'"  id="'+v.shortname+'">'+v.longname+'</option>';
                                    });

                           return s;
                            });

Appyscript.formSerialize = function() {
    var data = {
        "type": [],
        "value": [],
        "label": [],
        "error": [],
        "jsonInputField": []
    }

    var timeRegex = /^([0]?[1-9]|1[0-2]):([0-5]\d)\s?(AM|PM)$/i;
    var prev_value = "";
    var prev_label = "";
    var customField = $$(".customField");
    if (signupView) {
        customField = $$('.page[data-page="signup-page"]').find(".customField");
    }
    signupView = false;

    if (AppyTemplate.global.customFieldFlag == "1") {
        customField = $$(".customField");
    }
    customField.each(function() {
        var thisType = $$(this).attr("type");
        var thisMandatory = parseInt($$(this).attr("mandatory"));
        var thisValue = $$(this).find("input").eq(0).val();
        var thisLabel = $$(this).find("input").eq(0).attr("placeholder");
        var thisFieldID = $$(this).attr("ctype"); //Added by tushar on 2 Aug,2017 for custom sign up and profile

        var thisError = 0;
        var dateSplit;
        if (thisType == "date") {
            if (thisMandatory && thisValue != "") {

                if (thisValue.indexOf("/") != -1) {

                    var d = thisValue.split("/");


                     if(AppyTemplate.global.defaultDateFormat=="MM/dd/yyyy")
                                        {
                                         dateSplit = [d[0], d[1], d[2]].join('/');
                                        }
                                        else
                                        {  dateSplit = [d[1], d[0], d[2]].join('/');
                                        }




                    if (isNaN(Date.parse(dateSplit)))
                    //if(isNaN(Date.parse(thisValue)))
                    {
                        thisError = 1;
                    }
                }
            } else if (thisMandatory && thisValue == "") {
                thisError = 1;
            }
        }
        if (thisType == "time") {
            if (thisMandatory || thisValue != "") {
                if (!timeRegex.test(thisValue)) {
                    thisError = 1;
                }
            }
        }
        if (thisType == "email") {
            if (thisMandatory || thisValue != "") {
                if (!Appyscript.validateEmail(thisValue)) {
                    thisError = 1;
                }
            }
        }
        if (thisType == "state" || thisType == "name") {
            if (thisMandatory) {
                if (thisValue.trim() == "") {
                    thisError = 1;
                }
                if (!Appyscript.checkNameState(thisValue)) {
                    //  thisError = 1;
                }
            }

        }

        if (thisType == "phone") {
           if(AppyPieNative.isLocationEnabled()) {
            Appyscript.setCountryCodeByLocation();
            }
            setTimeout(function () {
            if (thisMandatory || thisValue != "") {

                if (!Appyscript.validatePhone(thisValue)) {
                    thisError = 1;
                }
                 var str1= localStorage.messengercountry;
                 if(str1)
                 {
                  thisValue = str1.concat(thisValue);
                 }
                 else
                 {
                 thisValue=thisValue;
                 }

                   console.log("thisValue========"+thisValue);
            }
            },0);
        }

        if (thisType == "text") {
            if (thisMandatory) {
                if (thisValue.trim() == "") {
                    thisError = 1;
                }
            }
        }


        if (thisType == "textarea") {
            thisValue = $$(this).find("textarea").eq(0).val();
            thisLabel = $$(this).find("textarea").eq(0).attr("placeholder");
            if (thisMandatory) {
                if (thisValue.trim() == "") {
                    thisError = 1;
                }
            }
        }

        if (thisType == "gender" || thisType == "country" || thisType == "select" || thisType == "emailEnquiryList") {
            thisValue = $$(this).find("select").eq(0).val();
            thisLabel = $$(this).find("select").eq(0).attr("placeholder");
            if (thisMandatory) {
                if (thisValue == "0") {
                    thisError = 1;
                }
            }
        }

        if (thisType == "category") {
            thisValue = $$(this).find("select").eq(0).val();
            thisLabel = $$(this).find("select").eq(0).attr("placeholder");
            if (thisMandatory) {
                if (thisValue == "0") {
                    thisError = 1;
                }
            }
            if (thisValue != "0") {

   if (thisValue != "0") {
							if($(this).find("select")[0]) {
									var selectedIndex = $(this).find("select")[0].selectedIndex;
									thisValue = $(this).find("select option").eq(selectedIndex).text();
							}
					}
                prev_value = thisValue;
                prev_label = thisLabel;
            }
        }

        if (thisType == "listPrice") {
            thisValue = $$(this).find("select").eq(0).val();
            thisLabel = $$(this).find("select").eq(0).attr("placeholder");
            if (thisMandatory) {
                if (thisValue == "") {
                    thisError = 1;
                }
            }

               if (thisValue != "0") {
							if($(this).find("select")[0]) {
						   var selectedIndex = $(this).find("select")[0].selectedIndex;
									thisValue = $(this).find("select option").eq(selectedIndex).text();
							}
					}
        }

          if (thisType == "formchoice") {
              thisLabel = $$(this).find("select").eq(0).attr("placeholder");
              console.log("thisLabel ==" + thisLabel);
              var selectArray = [];
              $$(this).find("select").eq(0).find("option").each(function() {
                  if (this.selected) {
                      selectArray.push(this.label)
                  };
              })
              console.log("selectArray ==" + selectArray);
              thisValue = selectArray.join(",");
               console.log("formchoice thisValue == " + thisValue);
              if (thisMandatory) {
                  if (thisValue == "0" || thisValue == thisLabel) {
                      thisError = 1;
                  }
              }
          }

        if (thisType == "multiselect") {
            thisLabel = $$(this).find("select").eq(0).attr("placeholder");
            var selectArray = [];
            $$(this).find("select").eq(0).find("option").each(function() {
                if (this.selected) {
                    selectArray.push(this.value)
                };
            })
            thisValue = selectArray.join(", ");

            if (thisMandatory) {
                if (selectArray.length == 0) {
                    thisError = 1;
                }
            }
        }

        if (thisType == "group") {
            thisLabel = $$(this).find("select").eq(0).attr("placeholder").replace("*", "");
            //   thisLabel = $('select option:selected').text();
            thisValue = $$(this).find("select").val();
            console.log("group thisValue ==" + thisValue);
            console.log("group thisLabel ==" + thisLabel);
            if (thisMandatory) {
                if (thisValue == "0") {
                    thisError = 1;
                }
            }
        }


if(thisType == "barcode")
                            {
                            if(thisMandatory)
                            {
                            if(thisValue.trim() == "")
                            {
                            thisError = 1;
                            }
                            }
                            }

                            if(thisType == "qrcode")
                            {
                            if(thisMandatory)
                            {
                            if(thisValue.trim() == "")
                            {
                            thisError = 1;
                            }
                            }
                            }


        if (thisType == "checkbox") {
            var checkboxArray = [];
            thisLabel = $$(this).find(".label-head").text();
            $$(this).find("input").each(function() {
                if (this.checked) {
                    checkboxArray.push($$(this).val());
                }
            })
            thisValue = checkboxArray.join("####");
            if (thisMandatory) {
                if (checkboxArray.length == 0) {
                    thisError = 1;
                }
            }
        }

        if (thisType == "radio") {
            thisLabel = $$(this).find(".label-head").text();
            thisValue = "";
            var thisRadio = $$(this);
            $$(this).find("input").each(function() {
                if (this.checked) {
                    if ($$(this).parent().is(".other")) {
                        thisValue = thisRadio.find("input[type='text']").val();
                    } else {
                        thisValue = $$(this).val();
                    }
                }
            })
            if (thisMandatory) {
                if (thisValue == "") {
                    thisError = 1;
                }
            }
        }

        if (thisType == "uploadPicture") {

        if($$(this).find("#fileUpload_fb").length)
          // var fileQuery=localStorage.getItem("customFile");
          {
          var fileArray=[];

                       input = $$(this).find(".formBuilderFileUpload")[0];
                          if (!input) {
                          if (thisMandatory)
                              thisError = 1;
                          }
                          else if (!input.files) {
                          if (thisMandatory)
                             thisError = 1;
                          }
                          else if (!input.files[0]) {
                          if (thisMandatory)
                             thisError = 1;
                          }else{
                        thisLabel="File"
                     //   thisValue=$$(this).find(".formBuilderFileUpload")[0].files[0].name;
                        thisValue=$$(this).find(".formBuilderFileUpload")[0].files[0].name.replace(/ /g, '_');
                          var file= $$(this).find(".formBuilderFileUpload").prop('files')[0];
                         // var fileTest=$(".formBuilderFileUpload")[0].files[0]
                          fileFormBuilderArray.push(file);
                         }
                         }else{
                         if (AppyTemplate.global.customFieldFlag == "1") {
                                              thisLabel = "Upload File";
                                              if (thisMandatory) {
                                              if (thisValue.trim() == "") {
                                              thisError = 1;
                                              }
                                              }
                                              } else {

                                              thisValue = "uploadPicture";
                                              thisLabel = $$(this).find(".select-file font").attr("data-val");
                                              try {
                                              thisValue = $$(this).find(".select-file font").attr("file-exit");
                                              if (thisValue) {
                                              var n = thisValue.lastIndexOf("/");
                                              thisValue = thisValue.substring(n + 1);
                                              console.log("Selected Image: " + thisValue);
                                              }

                                              if (thisMandatory) {
                                              if (thisValue.length == 0) {
                                              thisError = 1;
                                              }
                                              }
                                              } catch (err) {
                                              thisError = 1;
                                              }
                                              }
                         }
        // thisValue  = dataURItoBlob(fileQuery);

//            if (AppyTemplate.global.customFieldFlag == "1") {
//                thisLabel = "Upload File";
//                if (thisMandatory) {
//                    if (thisValue.trim() == "") {
//                        thisError = 1;
//                    }
//                }
//            } else {
//
//                thisValue = "uploadPicture";
//                thisLabel = $$(this).find(".select-file font").attr("data-val");
//                try {
//                    thisValue = $$(this).find(".select-file font").attr("file-exit");
//                    if (thisValue) {
//                        var n = thisValue.lastIndexOf("/");
//                        thisValue = thisValue.substring(n + 1);
//                        console.log("Selected Image: " + thisValue);
//                    }
//
//                    if (thisMandatory) {
//                        if (thisValue.length == 0) {
//                            thisError = 1;
//                        }
//                    }
//                } catch (err) {
//                    thisError = 1;
//                }
//            }

        }


        if (thisType == "subCategory" || thisType == "subCategoryPrice") {
            thisValue = $$(this).find("select").eq(0).val();
            thisLabel = $$(this).find("select").eq(0).attr("placeholder");
            if ($$(this).find("select").eq(0).is(".show")) {
                if (thisMandatory) {
                    if (thisValue == "0") {
                        thisError = 1;
                    }
                }
                if (thisValue != "0") {
                    thisValue = prev_value + " -> " + $$(this).find("select option[value='" + thisValue + "']").text();
                }
            }
        }

        if (thisType == "subCategory" || thisType == "subCategoryPrice") {
            if ($$(this).find("select").eq(0).is(".show")) {

                if (thisValue == "0") {
                    thisValue = "";
                }
                data.type.push(thisType);
                data.value.push(thisValue);
                data.label.push(prev_label);
                data.error.push(thisError);
                console.log(thisValue)
                if (thisValue != undefined || thisValue != null ) {

                    var extractNameFromValue = thisValue.split("/login/");

                    var length = extractNameFromValue.length;

                    if (thisType == "uploadPicture" && length > 1) {
                        data.jsonInputField.push({
                            "fieldId": thisFieldID,
                            "fieldType": thisType,
                            "fieldLebal": prev_label,
                            "fieldValue": extractNameFromValue[1]
                        });
                    } else {
                        data.jsonInputField.push({
                            "fieldId": thisFieldID,
                            "fieldType": thisType,
                            "fieldLebal": prev_label,
                            "fieldValue": thisValue
                        });
                    }

                }
            }
        } else {
            if (thisValue == "0") {
                thisValue = "";
            }
            data.type.push(thisType);
            data.value.push(thisValue);
            data.label.push(thisLabel);
            data.error.push(thisError);

            console.log(thisValue)

            if (thisValue != undefined || thisValue != null) {

                var extractNameFromValue = thisValue.split("/login/");

                var length = extractNameFromValue.length;

                if (thisType == "uploadPicture" && length > 1) {
                    data.jsonInputField.push({
                        "fieldId": thisFieldID,
                        "fieldType": thisType,
                        "fieldLebal": thisLabel,
                        "fieldValue": extractNameFromValue[1]
                    });
                } else {
                    data.jsonInputField.push({
                        "fieldId": thisFieldID,
                        "fieldType": thisType,
                        "fieldLebal": thisLabel,
                        "fieldValue": thisValue
                    });
                }
//                    data.jsonInputField.push({
//                        "fieldId": thisFieldID,
//                        "fieldType": thisType,
//                        "fieldLebal": thisLabel,
//                        "fieldValue": thisValue
//                    });
            }
        }

    });
    if(formBuilderData != undefined){
        if(formBuilderData.identifire == "app" && formBuilderData.payStatus == 1){
            data.type.push("paymentMethod");
            data.value.push(formBuilderData.amount);
            data.label.push("velocity");
        }
    }
    return data;
}
var globaldatecorrectformat;
Appyscript.formSettings = function() {
    setTimeout(function() {
        $$("li[type='date']").each(function() {
            var thisR = $$(this);
            thisR.find("input").attr("type", "text");
            thisR.append('<input type="date" class="date-hit">');
            thisR.find("input").eq(1).change(function() {
                if ($$(this).val() == "") {
                    thisR.find("input").eq(0).val("");
                } else {
                    var current = new Date();
                    var currenttime = (current.toLocaleTimeString().split(" "))[0];
                    var a = new Date($$(this).val()+" 00:00");
                    globaldatecorrectformat = $$(this).val();
                    console.log("globaldatecorrectformat=====  " + globaldatecorrectformat);
                    var temp = $$(this).val().split('-');
                    var dateformat = parseInt(temp[1]) + '/' + parseInt(temp[2]) + '/' + temp[0];
                    var currentdate = new Date(dateformat + ' ' + currenttime);

                    if (currentdate == "Invalid Date") {
                        currentdate = a;
                    }



//                    console.log("currentdateee =====" + currentdate);
//
//                    if(data.appData.lang =="sa")
//                    {
//                    var convertedDate = dateformat;
//                    }
//                    else
//                    {
//                    var convertedDate = changeToDefaultFormatDate(a);
//                    }
                    var convertedDate = changeToDefaultFormatDate(a);

                    thisR.find("input").eq(0).val(convertedDate);


//                    navigator.globalization.dateToString(
//                        currentdate,
//                        function(dateformatt) {
//                            thisR.find("input").eq(0).val(dateformatt.value);
//                        },
//                        function() {
//                            console.log('Error getting dateString\n');
//                        }, {
//                            formatLength: 'medium',
//                            selector: 'date'
//                        }
//                    );
                    if (!isNaN(dateformat.charAt(0))) {
                        // thisR.find("input").eq(0).val(a.getUTCDate() + "/" + (a.getUTCMonth()+1) + "/"+a.getUTCFullYear());
                    } else {
                        // thisR.find("input").eq(0).val((a.getUTCMonth()+1)  + "/" + a.getUTCDate() + "/"+a.getUTCFullYear());

                    }
                }
            })
        })
        $$("li[type='time']").each(function() {
            var thisR = $$(this);
            thisR.find("input").attr("type", "text");
            thisR.append('<input type="time" class="time-hit">');
            thisR.find("input").eq(1).change(function() {
                if ($$(this).val() == "") {
                    thisR.find("input").eq(0).val("");
                } else {
                    if (formBuilderData != undefined && formBuilderData.appScheduleFormat != undefined && formBuilderData.appScheduleFormat) {
                        thisR.find("input").eq(0).val($$(this).val());
                    } else {
                        var a = $$(this).val().split(":");
                        var h = a[0] % 12 || 12;
                        var ampm = a[0] < 12 ? "AM" : "PM";
                        thisR.find("input").eq(0).val(h + ":" + a[1] + " " + ampm);
                    }

                }
            })
        })

        $$("li[type='radio']").each(function() {
            var thisR = $$(this);
            thisR.find("label").click(function() {
                thisR.find("label").each(function() {
                    $$(this).find("input")[0].checked = false;
                })
                $$(this).find("input")[0].checked = true;
            })
        })

        $$("li[type='category']").each(function() {
            var thisR = $$(this);
            thisR.find("ul li").attr("data-rel", thisR.find("ul").attr("index")).attr("mandatory", thisR.find("ul").attr("mandatory")).insertAfter(thisR);
            thisR.find("ul").remove();
        })

        $$("li[type='multiselect']").find("select").change(multiSelectChange);

        $$("li[type='subCategory'],li[type='subCategoryPrice']").hide();

        $$("li[type='category'] select").change(function() {
            var thisID = $$(this).attr("id");
            var thisRel = $$(this).attr("data-rel");
            var next = $$(this).parent().parent()[0].nextSibling;
            if ($$(this).val() == "0") {
                $$(next).hide().find("select").removeClass("show");
            } else {
                var categoryData = formBuilderData.customData[$$(this).attr("id")].category;
                //var a = '<option value="0">Select</option>';
                var a = '';
                $$.each(categoryData.list[$$(this).val().replace("item", "")].subcat, function(index, value) {
                    if (thisRel == "subcat") {
                        a += '<option value="' + value.subCatName + '">' + value.subCatName + '</option>';
                    }
                    if (thisRel == "subcatPrice") {
                        a += '<option value="' + value.price + '">' + value.subCatName + ' (' + formBuilderData.defaultCurrency + ' ' + value.price + ')</option>';
                    }
                })
                $$(next).find(".label").text($$(this).find("option").eq($$(this)[0].selectedIndex).text());
                $$(next).show().find("select").addClass("show").html(a);
            }
            changePriceData();
        })

        function changePriceData() {
            var amount = 0;
            var value;
            $$("li[type='listPrice'] select").each(function() {
                value = $$(this).val() || 0;
                if (parseInt(value) != 0) {
                    amount += parseFloat(value);
                }
            })
            $$("li[type='subCategoryPrice'] select").each(function() {
                value = $$(this).val() || 0;
                if ($$(this).is(".show")) {
                    if ((parseInt(value) != 0)) {
                        amount += parseFloat(value);
                    }
                }
            })
            subOptionAmount = amount;
            //$$("#amount").val(amount)
            // $$("#amount").val(amount).attr("totalAmt", amount);


        }

        $$("li[type='listPrice'] select").on("change", changePriceData);
        $$("li[type='subCategoryPrice'] select").on("change", changePriceData);
        changePriceData();

    }, 200)
}


AppyTemplate.registerHelper('formatDate', function(date, options) {
    /*
    date = new Date(date);
    var months = ('Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec').split(' ');
    var time=  date.getHours() + ":" +  date.getMinutes() + ":" +  date.getSeconds();
    var newData=[ date.getDate(date),months[date.getMonth(date)], date.getFullYear(), time];
    return newData[options];
    */

    var a = date.split(/[^0-9]/);
    var d = new Date(a[0], a[1] - 1, a[2], a[3], a[4], a[5]);
    date = d;
    var months = ('Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec').split(' ');
    //var time = date.getHours() + ":" +  date.getMinutes() + ":" +  date.getSeconds();
    var time = date.toTimeString().split(" ")[0];
    var newData = [date.getDate(date), months[date.getMonth(date)], date.getFullYear(), time];

    return newData[options];
});

AppyTemplate.registerHelper('root_Compare', function(a, operator, b, options) {
    var match = false;
    if ((operator === '==' && a == b) || (operator === '===' && a === b) || (operator === '!==' && a !== b) || (operator === '!=' && a != b) || (operator === '>' && a > b) || (operator === '<' && a < b) || (operator === '>=' && a >= b) || (operator === '<=' && a <= b) || (operator === '||' && a != b) || (operator === '&&' && a != b)) {
        match = true;
    }
    if (match) return options.fn(this);
    else return options.inverse(this);
});


AppyTemplate.registerHelper('youtubeID', function(youtubeurl, options) {
    if(youtubeurl != undefined && youtubeurl != "undefined")
    {
    result = youtubeurl.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);
    var youtubeurlID = "";
    if (result) {
        youtubeurlID = result[1];
        if (youtubeurlID.indexOf("/") != -1) {
            youtubeurlID = youtubeurlID.split("/");
            youtubeurlID = youtubeurlID[1];
        }
    }
    return youtubeurlID;
    }
    else
    {
    var youtubeurlID ="";
    return youtubeurlID
    }
});

AppyTemplate.registerHelper('formateKM', function(num, options) {
    num = parseInt(num);
    if (num > 999999) {
        return (num / 1000000).toFixed(1) + "M";
    } else {
        if (num > 999) {
            return (num / 1000).toFixed(1) + "K";
        } else {
            return num;
        }
    }
});


function kFormatter(num) {

}

/*
 * To check mandatory form data
 * return true if no fields are blank/left.
 * Made by Mohsin
 */
Appyscript.getCustomFormData = function() {
    var customData = Appyscript.formSerialize();
    customData.flag = true;
    $$.each(customData.error, function(index, value) {
        if (value && customData.flag) {
            $$(".customField").eq(index).addClass("error");
            customData.flag = false;
            var checkErrorValidation = Appyscript.getCustomFormErrorTypeValidation(customData, index);
            if (checkErrorValidation == true) {
                if (formBuilderData) {
                    Appyscript.alert(AppyTemplate.global.commonLanguageSetting.mandatory_fields_cant_be_left_blank);
                } else {
                    Appyscript.alert("Please enter mandatory field properly.");
                }
                return customData;

            } else {}

        }
    });
   // customData.flag = cfb_validateFiles();
    return customData;
}

Appyscript.getCustomFormErrorTypeValidation = function(customData, index) {

    if (customData.type[index] == "phone") {
        Appyscript.alert(AppyTemplate.global.commonLanguageSetting.please_enter_valid_number_dir);
        return false;
    } else if (customData.type[index] == "name") {
        Appyscript.alert(AppyTemplate.global.commonLanguageSetting.signup_entername_alert);
        return false;
    } else if (customData.type[index] == "email") {
        Appyscript.alert(AppyTemplate.global.commonLanguageSetting.Sign_up_email);
        return false;
    }
    return true;
}

Appyscript.getCustomFormSignUpErrorTypeValidation = function(customData, index, loginLanguagSetting) {

    if (customData.type[index] == "phone") {

        Appyscript.alert(loginLanguagSetting.languageSetting.mandatory_fields_cant_be_left_blank);
        return false;
    } else if (customData.type[index] == "name") {
        Appyscript.alert(loginLanguagSetting.languageSetting.mandatory_fields_cant_be_left_blank);
        return false;
    } else if (customData.type[index] == "email") {
        if (customData.value[index] == "") {
            Appyscript.alert(loginLanguagSetting.languageSetting.mandatory_fields_cant_be_left_blank);
        } else if (!Appyscript.validateEmail(customData.value[index])) {
            Appyscript.alert(loginLanguagSetting.languageSetting.Sign_up_email);
        }

        return false;
    }
    return true;
}
var signupView = false;
Appyscript.getCustomFormDataSignup = function() {
    signupView = true;
    var customData = Appyscript.formSerialize();
    console.log("===== custom data : " + JSON.stringify(customData));
    customData.flag = true;

    $$.each(customData.error, function(index, value) {
        if (value && customData.flag) {

            $$('.page[data-page="signup-page"]').find(".customField").eq(index).addClass("error");
            customData.flag = false;
            var checkErrorValidation = Appyscript.getCustomFormSignUpErrorTypeValidation(customData, index, loginLanguagSetting);

            if (checkErrorValidation == true) {

                /*if(formBuilderData)
                {

                  Appyscript.alert(formBuilderData.submissionErrorMsg);
                }
                else
                {
                   Appyscript.alert("Please enter mandatory field properly.");
                }*/
                if (loginLanguagSetting != null) {
                    Appyscript.alert(loginLanguagSetting.languageSetting.mandatory_fields_cant_be_left_blank);
                }

                return customData;

            }

        }
    });



    return customData;
}

/*
 * To add image in FormData
 * Create new instance of imageFD at the end of every data submission, set flag false and index 1.
 * Made by Mohsin
 */
var imageFD = new FormData();
var imageFDFlag = false;
var imageIndex = 1;
var savedImageFD = new FormData();

Appyscript.selectedFile = function(a, filef, filename) {
    /*
 if(a.files[0])
 {
  imageFDFlag=true;
  $$(a).parent().find("font").text(a.files[0].name);
     imageFD.append("myfile"+(imageIndex), a.files[0]);
     imageFD.append("imageName"+(imageIndex++), a.files[0].name);
     savedImageFD.append("myfile"+(imageIndex), a.files[0]);
     savedImageFD.append("imageName"+(imageIndex++), a.files[0].name);
 }
  */
    // var file=AppyPieNative.getFileForm(filef);
    // console.log("File Detail :"+file);
    imageFDFlag = true;
    $$(a).parent().find("font").text(filename).attr("file-exit", filef);
    imageFD.append("myfile" + (imageIndex), filef);
    imageFD.append("imageName" + (imageIndex++), filename);
    savedImageFD.append("myfile" + (imageIndex), filef);
    savedImageFD.append("imageName" + (imageIndex++), filename);


}

/*
 * Convert string with separated by comma to json data with index value
 * Made by Mohsin
 */

Appyscript.convertStringToJson = function(str) {
    var jsonData = {};
    for (var i = 0; i < str.length; i++) {

//        if (str[i] != undefined)
//            jsonData[i] = str[i].split("####").join(",");
 if (str[i] != undefined)
           jsonData[i] = str[i]
    }
    return jsonData;
}

/*
 * To check email is valid or not
 * return true or false
 * Made by Mohsin
 */
Appyscript.validateEmail = function(emailId) {
    var emailRegex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return emailRegex.test(emailId);
}


/*To check phone is valid or not
 * return true or false*/
Appyscript.validatePhone = function(phoneno) {
    // var emailRegex = /^(?!.*-.*-.*-)(?=(?:\d{8,10}$)|(?:(?=.{9,11}$)[^-]*-[^-]*$)|(?:(?=.{10,12}$)[^-]*-[^-]*-[^-]*$)  )[\d-]+$/;
    //return emailRegex.test(phoneno);
    if (phoneno.length >= 1)
        return phoneno;
}

/*
 * To check date must not be a previous date.
 * return true or false
 * Made by Mohsin
 */
//Appyscript.validateDate=function(date){
//    var current = new Date();
//        var currentdate = current.toLocaleDateString();
//        var currenttime = current.toLocaleTimeString();
//         var entereddatefinal=new Date(date+' '+currenttime);
//
//         if(entereddatefinal=="Invalid Date")
//                                {
//               entereddatefinal=currentdate;
//         return true;
//
//           }
//          else{
//
//
//        var entereddate = entereddatefinal.toLocaleDateString();
//        if (Date.parse(entereddate) >= Date.parse(currentdate))
//        return true;
//}
//        return false;
//
//}



Appyscript.validateDate = function(date) {
    var current = new Date();
    var currentdate = current.toLocaleDateString();
    var currenttime = current.toLocaleTimeString();
    var entereddatefinal = new Date(date + ' ' + currenttime);
    var entereddate = entereddatefinal.toLocaleDateString();
    if (entereddatefinal == "Invalid Date") {
        /* var temp=globaldatecorrectformat.split('-');
          var dateformat=parseInt(temp[2])+'/'+parseInt(temp[1])+'/'+temp[0];
         */
        entereddatefinal = new Date(globaldatecorrectformat + ' ' + currenttime);

    }
    // if (Date.parse(entereddate) >= Date.parse(currentdate))
    if (Date.parse(entereddatefinal) >= Date.parse(current)) {
        return true;
    }
    return false;
}




//encrption and decryption functions
function d2h(d) {
    return d.toString(16);
}

function h2d(h) {
    return parseInt(h, 16);
}

function stringToHex(tmp) {
    var str = '',
        i = 0,
        tmp_len = tmp.length,
        c;

    for (; i < tmp_len; i += 1) {
        c = tmp.charCodeAt(i);
        str += d2h(c) + ' ';
    }
    return str;
}

function hexToString(tmp) {
    var arr = tmp.split(' '),
        str = '',
        i = 0,
        arr_len = arr.length,
        c;

    for (; i < arr_len; i += 1) {
        c = String.fromCharCode(h2d(arr[i]));
        str += c;
    }

    return str;
}

function EncryptOrDecrypt(type, string) {

    var newString = "";
    if (type.toLowerCase() == "encrypt") {
        var encodedString = Base64.encode(string);
        //var encodedString = window.btoa(string);
        newString = encodedString.concat(secureKey);
        var strToHex = stringToHex(newString);
        return strToHex;
    } else if (type.toLowerCase() == "decrypt") {
        var decodedString = hexToString(string);
        if (decodedString.indexOf(secureKey) != -1) {
            newString = decodedString.replace(secureKey, "");
            newString = Base64.decode(newString);
            //newString = window.atob(newString);
            return newString;
        }
    } else {
        return false;
    }
}

function ReturnHexDataWithSpace(data) {
    var s = data;
    var L = s.length;
    L = (L % 2) ? 'a' + s.charAt(L - 1) : '';
    var M = s.match(/(.{2})/g);
    if (M) s = M.join(' ') + L;

    return s;
}

AppyTemplate.registerPartial('innerBackground', '{{#if @global.styleAndNavigation.background}}{{#root_Compare @global.styleAndNavigation.backgroundType "==" "color"}}<div  class="background-image" style="background-color:{{@global.styleAndNavigation.background}}"></div>{{/root_Compare}}{{#root_Compare @global.styleAndNavigation.backgroundType "==" "image"}}<div class="background-image portrait" style="background-image:url({{@global.styleAndNavigation.background}})"></div><div class="background-image landscape" style="background-image:url({{@global.styleAndNavigation.ipadBackground}})"></div>{{/root_Compare}}<div class="background-theme {{@global.style.appTheme}}"></div>{{/if}}');

AppyTemplate.registerPartial('mainBackground', '{{#root_Compare @global.style.backgroundType "!==" "bganimation"}}' +
    '{{#root_Compare @global.style.backgroundType "==" "custom_image"}}' +
    '<div  class="background-image portrait" style="background-image:url({{@global.style.appBackground[0]}})"></div>' +
    '<div class="background-image landscape" style="background-image:url({{@global.style.appIpadBackground[0]}})"></div>' +
    '{{else}}' +
    '<div class="background-image" style="' +
    '{{#root_Compare @global.style.backgroundType "==" "custom_color"}}' +
    'background-color:{{@global.style.appBackground[0]}}' +
    '{{/root_Compare}}' +
    '{{#root_Compare @global.style.backgroundType "==" "library_image"}}' +
    'background-image:url({{@global.style.appBackground[0]}})' +
    '{{/root_Compare}}"></div>' +
    '{{/root_Compare}}' +
    '{{else}}' +
    '{{#@global.style.appBackground}}' +
    '<img src="{{this}}" />' +
    '{{/@global.style.appBackground}}' +
    '{{/root_Compare}}' +
    '<div class="background-theme {{@global.style.appTheme}}"></div>');


/*AppyTemplate.registerPartial('errorpage','{{#if @root.styleAndNavigation}}'+
                             '<div class="msg-container">'+
                             '{{#js_compare "this.iconType === \'img\' "}}<img src="{{errorIcon}}" class="imgIcon">'+
                             '{{else}}'+
                             '<span class="icon {{errorIcon}}" style="color: {{@root.styleAndNavigation.content[2]}}; border-color:{{@root.styleAndNavigation.content[2]}};">  </span>'+
                             '{{/js_compare}}'+
                             '{{#if heading}}<h2 clas="{{@root.styleAndNavigation.heading[1]}}" style="color: {{@root.styleAndNavigation.heading[2]}};">{{heading}}</h2>  {{/if}}'+
                             '<h2 class="{{@root.styleAndNavigation.content[1]}}" style="color: {{@root.styleAndNavigation.content[2]}};">{{errortext}}</h2>'+
                             '</div>'+
                             '{{else}}'+
                            ' <div class="msg-container">'+
                             '{{#js_compare "this.iconType === \'img\' "}}<img src="{{errorIcon}}" class="imgIcon">'+
                             '{{else}}'+
                             '<span class="icon {{errorIcon}}" style="color:{{@global.style.pageIconColor}}; font-family:{{@global.style.appPageFont}};">  </span>'+
                              '{{/js_compare}}'+
                             '{{#if heading}}<h2 class="{{@global.style.appPageShsize}}" style="color:{{@global.style.pageTextColor}}; font-family:{{@global.style.appPageFont}};">{{heading}}</h2>  {{/if}}'+
                             '<h2 class="{{@global.style.appPageCsize}}" style="color:{{@global.style.pageTextColor}}; font-family:{{@global.style.appPageFont}};">{{errortext}}</h2>'+
                             '</div>{{/if}}');*/


AppyTemplate.registerPartial('errorpage', ' <div class="msg-container">' +
    '{{#js_compare "this.iconType === \'img\' "}}<img src="{{errorIcon}}" class="imgIcon">' +
    '{{else}}' +
    '<span class="icon {{errorIcon}}" style="color: {{@global.styleAndNavigation.content[2]}};">  </span>' +
    '{{/js_compare}}' +
    '' +
    '' +
    '</div>');

Appyscript.getPayPalHtml = function(paymentType, paypalId, amount, currency, requestId, successUrl, notifyUrl) {
    var click, type;
    if (paymentType == "yearly") {
        type = "Y";
        click = "-subscriptions";
    } else if (paymentType == "monthly") {
        type = "M";
        click = "-subscriptions";
    } else {
        type = "";
        click = "";
    }

    var url_prefix = "";
    if (paypalId == "amitjs_1300292032_biz@live.com" || paypalId == "himanshut@onsinteractive.com" || paypalId == "murli@appypie.com" || paypalId == "shubham@onsinteractive.com") {
        url_prefix = "https://www.sandbox.";
    } else {
        url_prefix = "https://www.";
    }

    var paymentFor = 'Payment for ' + window.data.appData.appName + '(' + window.data.appData.appId + ')';
    var paypalIdHtml = '<!DOCTYPE HTML><html><body onload="ClickButtonPaypal();"><form action="' + url_prefix + 'paypal.com/cgi-bin/webscr" method="post"><!-- Identify your business so that you can collect the payments. --><input type="hidden" name="business" value="' + paypalId + '">';
    var paypalAddFormHtml = '<!-- Specify a Buy Now button. -->' +
        '<input type="hidden" name="cmd" value="_xclick' + click + '">' +
        '<input type="hidden" name="lc" value="' + data.appData.paypalLang + '">' +
        '<!-- Specify details about the item that buyers will purchase. -->' +
        '<input type="hidden" name="item_name" value="' + paymentFor + '">' +
        '<input type="hidden" name="amount" value="' + amount + '">' +
        '<input type="hidden" name="a3" value="' + amount + '">' +
        '<input type="hidden" name="p3" value="1">' +
        '<input type="hidden" name="t3" value="' + type + '">' +
        '<input type="hidden" name="src" value="1">' +
        '<input type="hidden" name="currency_code" value="' + currency + '">' +
        '<input type="hidden" name="quantity" value="1">' +
        '<input type="hidden" name="custom" value="' + requestId + '">';

    var PaypalUrlFormHtml = '<!-- URL --><input type="hidden" name="return" value="' + successUrl + '" /><input type="hidden" name="cancel_return" value="https://gauravpaypal.com/" /><input type="hidden" name="notify_url" value="' + notifyUrl + '" /><!-- Display the payment button. --><input type="image" src="https://www.paypalobjects.com/webstatic/mktg/logo/pp_cc_mark_37x23.jpg" name="submit" id="submit" alt="PayPal - The safer, easier way to pay online!"><img alt="" border="0" src="' + url_prefix + 'paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1"></form><script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script><script>function ClickButtonPaypal(){$(\'#submit\').trigger(\'click\');}</script></body></html>';

    return (paypalIdHtml + paypalAddFormHtml + PaypalUrlFormHtml);
}

/*PayFast*/
Appyscript.getPayFastHtml = function(paymentType, merchantId, merchantKey, amount, currency, requestId, successUrl, cancelUrl, notifyUrl, payFastUsername, payFastEmail, payFastproductName, payFastproductDescrip) {
    var click, type;
    if (paymentType == "yearly") {
        type = "Y";
        click = "-subscriptions";
    } else if (paymentType == "monthly") {
        type = "M";
        click = "-subscriptions";
    } else {
        type = "";
        click = "";
    }

    var url_prefix = "";
    if (merchantId == "10005646" || merchantId == "10007323") {
        url_prefix = "https://sandbox.payfast.co.za";
        // https://sandbox.payfast.co.za/eng/process
    } else {
        url_prefix = "https://www.payfast.co.za";
    }

    var paymentFor = 'Payment for ' + window.data.appData.appName + '(' + window.data.appData.appId + ')';
    var paypalIdHtml = '<!DOCTYPE HTML><html><body onload="ClickButtonPayFast();"><form action="' + url_prefix + '/eng/process" method="post"><!-- Identify your business so that you can collect the payments. --><input name="merchant_id" type="hidden" value="' + merchantId + '" /><input name="merchant_key" type="hidden" value="' + merchantKey + '" />';

    var paypalAddFormHtml = '<!-- Specify a Buy Now button. -->' +
        '<!-- Specify details about the item that buyers will purchase. -->' +
        '<input name="name_first" value="' + payFastUsername + '"  type="hidden"/>' +
        '<input name="name_last"  type="hidden" placeholder="Last Name" />' +
        '<input name="email_address" value="' + payFastEmail + '" type="hidden"/>' +
        '<input name="m_payment_id" type="hidden" value="8542"/>' +
        '<input name="amount" type="hidden" value="' + amount + '"/>' +
        '<input name="item_name" type="hidden"value="' + payFastproductName + '"/>' +
        '<input name="item_description" type="hidden" value="' + payFastproductDescrip + '"/>' +
        '<input type="hidden" name="custom" value="' + requestId + '">';

    var PaypalUrlFormHtml = '<!-- URL --><input type="hidden" name="return_url" value="' + successUrl + '" /><input name="cancel_url" type="hidden" value="' + cancelUrl + '" /><input type="hidden" name="notify_url" value="' + notifyUrl + '" /><!-- Display the payment button. --><input type="image" src="{URL}/images/subscribe_btn.png" name="submit" id="submit" alt="PayFast - The safer, easier way to pay online!"><img alt="" border="0" src="' + url_prefix + 'paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1"></form><script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script><script>function ClickButtonPayFast(){$(\'#submit\').trigger(\'click\');}</script></body></html>';
    console.log("paypalAddFormHtml      " + PaypalUrlFormHtml);
    return (paypalIdHtml + paypalAddFormHtml + PaypalUrlFormHtml);
}

Appyscript.validateCardType = function(cardNo) {

    if (/^5[1-5]/.test(cardNo)) {
        return "mastercard";
    }
    if (/^4/.test(cardNo)) {
        return "visa";
    } else if (/^3[47]/.test(cardNo)) {
        return "american";
    } else if (/^(5018|5020|5038|6304|6759|676[1-3])/.test(cardNo)) {
        return "maestro";
    } else if (/^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)/.test(cardNo)) {
        return "discover";
    } else if (/^30[0-5]/.test(cardNo)) {
        return "dinnerclub";
    } else {
        return "";
    }
}


Appyscript.numberlength = function() {
    if (this.value.length > this.maxLength)
        this.value = this.value.slice(0, this.maxLength);
}

Appyscript.numberValidation = function() {
    function isNumeric(evt) {
        var theEvent = evt || window.event;
        var key = theEvent.keyCode || theEvent.which;
        key = String.fromCharCode(key);
        var regex = /[0-9.+]|\-/;
        if (!regex.test(key)) {
            theEvent.returnValue = false;
            if (theEvent.preventDefault) theEvent.preventDefault();
        }
    }
    return isNumeric(event);
}

Appyscript.onlyNumberValidation = function() {
    function isOnlyNumeric(evt) {
        var theEvent = evt || window.event;
        var key = theEvent.keyCode || theEvent.which;
        key = String.fromCharCode(key);
        var regex = /[0-9]/;
        if (!regex.test(key)) {
            theEvent.returnValue = false;
            if (theEvent.preventDefault) theEvent.preventDefault();
        }
    }
    return isOnlyNumeric(event);
}

Appyscript.keyValidation = function() {
    function isKey(evt) {
        var theEvent = evt || window.event;
        var key = theEvent.keyCode || theEvent.which;
        key = String.fromCharCode(key);
        var regex = /[0-9a-zA-Z]/;
        if (!regex.test(key)) {
            theEvent.returnValue = false;
            if (theEvent.preventDefault) theEvent.preventDefault();
        }
    }
    return isKey(event);
}

Appyscript.checkNameState = function(str) {
    var regex = /^([a-zA-Z ]+)$/;
    return regex.test(str);
}

$$(document).on('input', '.numberlength', Appyscript.numberlength);
$$(document).on('keypress', '.numberValidation', Appyscript.numberValidation);
$$(document).on('keypress', '.onlyNumberValidation', Appyscript.onlyNumberValidation);
$$(document).on('keypress', '.specialKey', Appyscript.keyValidation);


Appyscript.clickHome = function() {
    Appyscript.popupClose()
    setTimeout(function() {
        if (folderPage) {


            if(data.home.length==1)
            {
            mainView.router.back();}
            else
            {
            mainView.router.back();
                        return false;
            }

        }
        if (AppyTemplate.global.style.layout == "slidemenu") {
            if (AppyTemplate.global.style.autoLoadFirstPage == "YES") {
                var strList = "news|services|socialnetwork|ecommerce|foodordering|dating|hyperlocal|foodcourt|messenger|accommodation|fitness|forum|dinein|ewallet|demanddelivery";
                if ((strList.indexOf(pageId) == -1) && !globalPage) {
                    var thisClick = $$(".app_navigation_slidemenu a").eq(0);
                    pageId = thisClick.data('productid');
                    pageIdentifie = thisClick.data('productIdentifier');
                    Appyscript.pageData(pageId, pageIdentifie);
                } else {
                    var thisClick = $$(".app_navigation_slidemenu a").eq(0);
                    if ((strList.indexOf(thisClick.data('productid')) == -1) && !globalPage) {
                        autoFirstPage = true;
                    } else {
                        autoFirstPage = false;
                    }
                    Appyscript.openSlide();
                    /*pageId = "mainPage";
                    Appyscript.layoutPage('layout/slidemenu.html',{context: {title: data.appData.headerBarTitle, home:data}});
                    $$('#layoutCSS').attr('href','css/slidemenu.css');
                    Appyscript.params.swipePanelActiveArea=0;*/
                }
            } else {
                Appyscript.openSlide();
            }
        }
         else if (AppyTemplate.global.style.layout == "slidemenu3d") {
            if (AppyTemplate.global.style.autoLoadFirstPage == "YES") {
                var strList = "news|services|socialnetwork|ecommerce|foodordering|dating|hyperlocal|foodcourt|messenger|accommodation|fitness|forum|dinein|ewallet|demanddelivery";
                if ((strList.indexOf(pageId) == -1) && !globalPage) {
                    var thisClick = $$(".app_navigation_slidemenu3d a").eq(0);
                    pageId = thisClick.data('productid');
                    pageIdentifie = thisClick.data('productIdentifier');
                    Appyscript.pageData(pageId, pageIdentifie);
                } else {
                    var thisClick = $$(".app_navigation_slidemenu3d a").eq(0);
                    if ((strList.indexOf(thisClick.data('productid')) == -1) && !globalPage) {
                        autoFirstPage = true;
                    } else {
                        autoFirstPage = false;
                    }
                    Appyscript.openSlide();
                    /*pageId = "mainPage";
                    Appyscript.layoutPage('layout/slidemenu.html',{context: {title: data.appData.headerBarTitle, home:data}});
                    $$('#layoutCSS').attr('href','css/slidemenu.css');
                    Appyscript.params.swipePanelActiveArea=0;*/
                }
            } else {
                Appyscript.openSlide();
            }
        }
        else if (AppyTemplate.global.style.layout == "bottom") {
            for (var i = 0; i < (mainView.history.length - 1); i++) {
                mainView.router.back({
                    ignoreCache: true,
                    animatePages: false
                })
            }
            if (AppyTemplate.global.style.autoLoadFirstPage == "YES") {
                var strList = "news|services|socialnetwork|ecommerce|foodordering|dating|hyperlocal|foodcourt|messenger|accommodation|fitness|forum|dinein|ewallet|demanddelivery|coupondirectory";
                if ((strList.indexOf(pageId) == -1) && !globalPage) {

                    if(!AppyTemplate.global.mergeAppsBackButton){
                     var thisClick = $$(".toolbar .app_navigation_bottom a").eq(0);
                    }else{
                     var thisClick = $$(".toolbar .app_navigation_bottom a").eq(1);
                    }
                    pageId = thisClick.data('productid');
                    pageIdentifie = thisClick.data('productIdentifier');
                    Appyscript.pageData(pageId, pageIdentifie);
                } else {
                    if(!AppyTemplate.global.mergeAppsBackButton){
                    var thisClick = $$(".toolbar .app_navigation_bottom a").eq(0);
                   }else{
                    var thisClick = $$(".toolbar .app_navigation_bottom a").eq(1);
                   }
                    if ((strList.indexOf(thisClick.data('productid')) == -1) && !globalPage) {
                        autoFirstPage = true;
                    } else {
                        globalPage = false;
                        autoFirstPage = false;
                    }
                    pageId = "mainPage";
                    Appyscript.layoutPage('layout/bottom.html', {
                        context: {
                            title: data.appData.headerBarTitle,
                            home: newdata
                        }
                    });
                    $$('#layoutCSS').attr('href', 'css/bottom.css');
                }
            }
             else {
                globalPage = false;
                pageId = "mainPage";
                Appyscript.layoutPage('layout/bottom.html', {
                    context: {
                        title: data.appData.headerBarTitle,
                        home: newdata
                    }
                }, false);
                $$('#layoutCSS').attr('href', 'css/bottom.css');
            }
        } else {
            mainView.router.back();
        }
    }, 100)
}




Appyscript.openSlide = function() {
    navigationAnimationSlide();
    if (data.appData.lang == 'sa') {
        Appyscript.openPanel('right');
    } else {
        Appyscript.openPanel('left');

    }
}



AppyTemplate.registerHelper('validString', function(value) {
    if (value) {
        console.log(value);
        value = value.replace(/<br\s*\/?>/mg, "");
        return value;
    } else {
        return "";
    }
    return "";
});


//for check compare two string
AppyTemplate.registerHelper('ifCond', function(v1, v2, options) {
    if (v1 === v2) {
        return options.fn(this);
    }
    return options.inverse(this);
});


function b64toBlob(b64Data, contentType, sliceSize) {
    contentType = contentType || '';
    sliceSize = sliceSize || 512;

    var byteCharacters = atob(b64Data);
    var byteArrays = [];

    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        var slice = byteCharacters.slice(offset, offset + sliceSize);

        var byteNumbers = new Array(slice.length);
        for (var i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        var byteArray = new Uint8Array(byteNumbers);

        byteArrays.push(byteArray);
    }

    var blob = new Blob(byteArrays, {
        type: contentType
    });
    console.log("blob blob::" + JSON.stringify(blob));
    return blob;
}


function getRandomNumber() {
    return Math.floor(Math.random() * 100000000000);
}

function multiSelectChange() {
    var thisSelect = $$(this);
    var thisInput = thisSelect.parent().find("input");
    var value = [];
    var text = [];
    thisSelect.find("option").each(function() {
        if (this.selected) {
            value.push($$(this).attr("value"));
            text.push($$(this).text());
        }
    })
    thisInput.attr("data-value", value.join(",")).val(text.join(","));
}

Appyscript.onPageInit('paymentPage', function(page) {
    setTimeout(function() {
        if (checkLayout()) {
            var strList = "news|services|socialnetwork|ecommerce|foodordering|dating|hyperlocal|foodcourt|forum|dinein|ewallet|demanddelivery";
            if (strList.indexOf(pageId) != -1) {
                $$(".toolbar").addClass("toolbar-hidden");
                $$(mainView.pagesContainer).addClass("no-toolbar").removeClass("toolbar-through");
                if ($$(mainView.pagesContainer).hasClass('bottom_height')) {
                    $$(mainView.pagesContainer).removeClass("bottom_height");
                }
            }
        }
    }, 600);
})
var currenyCodeArray = ["JPY", "CNY", "SDG", "RON", "MKD", "MXN", "CAD",
    "ZAR", "AUD", "NOK", "ILS", "ISK", "SYP", "LYD", "UYU", "YER", "CSD",
    "EEK", "THB", "IDR", "LBP", "AED", "BOB", "QAR", "BHD", "HNL", "HRK",
    "COP", "ALL", "DKK", "MYR", "SEK", "RSD", "BGN", "DOP", "KRW", "LVL",
    "VEF", "CZK", "TND", "KWD", "VND", "JOD", "NZD", "PAB", "CLP", "PEN",
    "GBP", "DZD", "CHF", "RUB", "UAH", "ARS", "SAR", "EGP", "INR", "PYG",
    "TWD", "TRY", "BAM", "OMR", "SGD", "MAD", "BYR", "NIO", "HKD", "LTL",
    "SKK", "GTQ", "BRL", "EUR", "HUF", "IQD", "CRC", "PHP", "SVC", "LKR", "PLN",
    "TMT",
];
AppyTemplate.registerHelper('currenyCodeArrayHelper', function(abc) {

    var currencyArray = currenyCodeArray.reverse();
    htmlString = "";
    for (var i = 0; i < currencyArray.length; i++) {
        htmlString = htmlString + "<option value=" + currencyArray[i] + "  label=" + currencyArray[i] + ">" + currencyArray[i] + "  </option>"
    }
    return htmlString;
});

/*Manoj Kumar for hardware back button in bottom layout*/
$$(document).on('click', '.backWebsite', function() {

    Appyscript.hideWebViewFragment();
    isOpenFragmentWithBottom = false;


});

$$(document).on('click', '.fragmentPage', function() {

    if (isOpenFragmentWithBottom) {
        Appyscript.showWebViewFragment();
    }



});


AppyTemplate.registerPartial('slideBackground', '<style id="slideBackground">{{#root_Compare @global.style.backgroundType "==" "custom_image"}}' +
    '@media screen and (orientation:portrait) { body.slidemenu {background-image:url({{@global.style.appBackground[0]}}) }}' +
    '@media screen and (orientation:landscape) { body.slidemenu {background-image:url({{@global.style.appIpadBackground[0]}}) }}' +
    '{{else}}' +
    'body.slidemenu {' +
    '{{#root_Compare @global.style.backgroundType "==" "custom_color"}}' +
    'background-color:{{@global.style.appBackground[0]}}' +
    '{{/root_Compare}}' +
    '{{#root_Compare @global.style.backgroundType "==" "library_image"}}' +
    'background-image:url({{@global.style.appBackground[0]}})' +
    '{{/root_Compare}} }' +
    '{{/root_Compare}}</style>');


AppyTemplate.registerHelper('getNavigation', function(layout, menu) {
    //console.log(layout, menu);
    var htmlString = "";
    var backIcon = "icon-left-open-2";
    var menuIcon = "appyicon-sort-down";
    var iconColor = AppyTemplate.global.style.headerBarIconColor;

    if (('slidemenu|slidemenu3d').indexOf(layout) != -1) {
        backIcon = "icon-menu";
        if (AppyTemplate.global.setting.homeButtonStatus) {
            menuIcon = "icon-angle-double-down";
        } else {
            menuIcon = "icon-menu";
        }
    } else {
        backIcon = "icon-left-open-2";
    }

    var clickArea = "";
    var clickHome = "Appyscript.clickHome()";
    if (pageId == "services") {
        clickArea = "Appyscript.openMenuPage('menu')";
    }
    if (pageId == "news") {
        clickArea = "Appyscript.popupPage('news-menu')";
    }
    if (pageId == "ecommerce") {
        clickArea = "Appyscript.popupPage('ecommerce-menu')"
    }
    if (pageId == "foodordering") {
        clickArea = "Appyscript.popupPage('foodordering-menu')";
    }
    if (pageId == "dating") {
        clickArea = "Appyscript.popupPage('dating-menu')";
        clickHome = "Appyscript.datingmainmenu()";

    }
    if (pageId == "hyperlocal") {
        clickArea = "Appyscript.openHyperLocalMenuPage('menu')";
    }
    if (pageId == "foodcourt") {
        clickArea = "Appyscript.popupPage('foodcourt-menu')";
    }
    if(pageId == "dinein") {
        clickArea = "Appyscript.popupPage('dinein-menu')";
       }
    if (pageId == "socialnetwork") {
        clickArea = "Appyscript.popupPage('socialnetwork-menu')";
    }
    if (pageId == "accommodation") {
        clickArea = "Appyscript.popupPage('accommodation-menu')";
        clickHome = "Appyscript.hotelhomescreen()";
     }
     if (pageId == "forum") {
             clickArea = "Appyscript.openForumMenuPage()";
         }

    if (pageId == "coupondirectory") {
        clickArea = "Appyscript.opencoupondirectoryMenuPage('coupon-directoryMenu')";
    }
    if (pageId == "demanddelivery") {
        clickArea = "Appyscript.demanddeliverymenu('menu')";
    }



    if (globalPage) {
        if (pageData.pageId == "realestate") {
            clickArea = "Appyscript.openMenuPageEstate('menu')";
            if (pageData.list.length > 1) {
                backIcon = "icon-left-open-2";
                clickHome = "globalPage=false;mainView.router.back();";
            }
        }
        if (pageIdentifie.indexOf("event") != -1) {
            clickArea = "Appyscript.popupPage('customevent-menu')";
            customEventClass = "customEventTrue";
            if (pageData.list.length >= 1) {
                backIcon = "icon-left-open-2";
                clickHome = "globalPage=false;mainView.router.back();";
            }
        }
    }


    if (folderPage) {
        backIcon = "icon-left-open-2";
    }




    if (AppyTemplate.global.setting.homeButtonStatus) {
        htmlString += '<a class="link back" style="color:' + iconColor + ';" onclick="' + clickHome + '"><i class="icon ' + backIcon + '"></i></a>';
        htmlString += '<a href="" class="link menu-down" style="color:' + iconColor + ';" onclick="' + clickArea + '"><i class="icon ' + menuIcon + '"></i></a>';
    } else {
        htmlString += '<a href="" class="link menu-down" style="color:' + iconColor + ';" onclick="' + clickArea + '"><i class="icon ' + menuIcon + '"></i></a>';
    }
    /*
	{{#if @global.setting.homeButtonStatus}}

        	{{#root_Compare @global.style.layout "==" "slidemenu"}}
	        <i class="icon icon-menu"></i>
            {{else}}
            {{#root_Compare @global.style.layout "==" "slidemenu3d"}}
            <i class="icon icon-menu"></i>
            {{else}}

            {{/root_Compare}}
            {{/root_Compare}}
        </a>
        {{/if}}

		 <a href="" class="link menu-down" style="color:{{@global.style.headerBarIconColor}};" onclick="Appyscript.openMenuPage('menu')">
        	{{#root_Compare @global.style.layout "==" "slidemenu"}}
            {{#if @global.setting.homeButtonStatus}}
            <i class="icon icon-angle-double-down"></i>
            {{else}}
            <i class="icon icon-menu"></i>
            {{/if}}
            {{else}}
            {{#root_Compare @global.style.layout "==" "slidemenu3d"}}
            {{#if @global.setting.homeButtonStatus}}
            <i class="icon icon-angle-double-down"></i>
            {{else}}
            <i class="icon icon-menu"></i>
            {{/if}}
            {{else}}
            <i class="icon appyicon-sort-down"></i>
            {{/root_Compare}}
            {{/root_Compare}}
        </a>

	*/
    return htmlString;
})


AppyTemplate.registerHelper('getSlideBack', function(mode) {
    var iconColor = AppyTemplate.global.style.headerBarIconColor;
    var backClass = "";
    if (mode == "common") {
        if (!AppyTemplate.global.innerLayout) {
            backClass = "bottomBack";
        }
    } else {
         if (!folderPage) {
            backClass = "bottomBack";
        }
    }

    if (pageId == "services" || pageId == "realestate" || pageId == "hyperlocal" || pageId == "coupon" || pageId == "folder" || pageId == "event" ) {
        if (AppyTemplate.global.dirMode) {
            backClass += " dirBack";
        }
    }



    var htmlString = '<a href="index" class="link back ' + backClass + '" style="color:' + iconColor + ';"><i class="icon icon-left-open-2"></i></a>';

    if (pageId == "coupon") {

       htmlString = '<a href="index"  onclick="goBackfromcouponPage()" class="link back ' + backClass + '" style="color:' + iconColor + ';"><i class="icon icon-left-open-2"></i></a>';

        }
    if (AppyTemplate.global.style.layout == 'slidemenu' || AppyTemplate.global.style.layout == 'slidemenu3d') {
        htmlString = '<a onclick="Appyscript.openSlide()" style="color:' + iconColor + ';"><i class="icon icon-menu"></i></a>';
      //  htmlString = '<a href="index"  onclick="goBackfromcouponPage()" class="link back" style="color:' + iconColor + ';"><i class="icon icon-left-open-2"></i></a>';
    }
    if ((AppyTemplate.global.style.layout == 'slidemenu' || AppyTemplate.global.style.layout == 'slidemenu3d') && isGlobalPlusCodeRequest  ) {
           htmlString = '<a href="index"  onclick="goBackfromcouponPage()" class="link back ' + backClass + '" style="color:' + iconColor + ';"><i class="icon icon-left-open-2"></i></a>';
  }
    return htmlString;
})


AppyTemplate.registerHelper('getSlideRightBack', function(mode) {
    var iconColor = AppyTemplate.global.style.headerBarIconColor;

    var layoutList = "slidemenu|slidemenu3d";
    var layout = AppyTemplate.global.style.layout;
    var htmlString = "";
    if ((folderPage && layoutList.indexOf(layout) != -1)) {
        htmlString = '<a href="index" class="link back" style="color:' + iconColor + ';"><i class="icon icon-left-open-2"></i></a>';
    }
    if (AppyTemplate.global.innerLayout) {
        htmlString = '<a href="index" class="link back" style="color:' + iconColor + ';"><i class="icon icon-left-open-2"></i></a>';
    }
    return htmlString;
})



function checkLayout() {
    var layoutList = "bottom|slidemenu|slidemenu3d";
    var layout = AppyTemplate.global.style.layout;
    if (layoutList.indexOf(layout) == -1) {
        return false;
    } else {
        return true;
    }
}

$$(document).on('input', '.autoScroll', textAutoScroll);
$$(document).on('keypress', '.autoScroll', textAutoScroll);

function textAutoScroll() {
    var scrollRang = 0;
    if ($$(this).attr("scroll-rang")) {
        scrollRang = parseInt($$(this).attr("scroll-rang"));
    }
    var activePage = $$(mainView.activePage.container).find(".page-content")[0];
    activePage.scrollTop = this.offsetTop - $$(this).height() - scrollRang;
}

Appyscript.slidelogOut = function() {
    if (AppyTemplate.global.style.layout == "slidemenu" || AppyTemplate.global.style.layout == "slidemenu3d") {
        var strList = "news|services|socialnetwork|ecommerce|foodordering|dating|hyperlocal|foodcourt|messenger|accommodation|fitness|forum|dinein|ewallet|demanddelivery";
        if (data.login.autoLogin == "true") {
            if ((strList.indexOf(pageId) == -1) && !globalPage) {} else {
                pageId = "mainPage";
                Appyscript.layoutPage('layout/' + AppyTemplate.global.style.layout + '.html', {
                    context: {
                        title: data.appData.headerBarTitle,
                        home: data
                    }
                });
                $$('#layoutCSS').attr('href', 'css/' + AppyTemplate.global.style.layout + '.css');
                //Appyscript.params.swipePanelActiveArea=0;
            }
        } else {
            if (pageData.autoLogin == "YES") {
                if ((strList.indexOf(pageId) == -1) && !globalPage) {} else {
                    pageId = "mainPage";
                    Appyscript.layoutPage('layout/' + AppyTemplate.global.style.layout + '.html', {
                        context: {
                            title: data.appData.headerBarTitle,
                            home: data
                        }
                    });
                    $$('#layoutCSS').attr('href', 'css/' + AppyTemplate.global.style.layout + '.css');
                    //Appyscript.params.swipePanelActiveArea=0;
                }
            } else {}
        }
    }
}


function languageCodeProtocol()
{

  var languageCodeArray = '{"fr":"fr","pt":"pt","sa":"ar","es":"es","de":"de","cn":"zh-hans","nl":"de","jp":"ja","it":"it","ru":"el"}';
  var lanCode=data.appData.lang;

  var jsoObj = JSON.parse(languageCodeArray);

  var protocol=jsoObj[lanCode];

 if(typeof protocol === "undefined")
 {
   return "www";
 }
 else
 {
   return protocol;
 }

}

//radical : this function formats price with commas x : string
function formatPriceGlobal(x){
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

//Error Page Created By D
function errorPageIconError(titlename, iconname, textstr,hypernoImg,inner) {
    var errorheader = {};
    errorheader.title = titlename;
    errorheader.errorIcon = iconname;
    errorheader.errortext = textstr;
    errorheader.hyperNoImg = hypernoImg;
    errorheader.inner = inner?1:0;
    $$.get("pages/common-error.html", function(template) {
           var compiledTemplate = AppyTemplate.compile(template);
           var html = compiledTemplate(errorheader);
           Keyboard.hide();
           mainView.router.load({
                                content: html,
                                animatePages: true
                                });
           });
}

//--------------TimePicker According To Format ----//

function intializeTimePicker(identifier,format,valueToBeFilled){

    var _ColoumArray;
    var today=new Date();
    var _defaultValue;

    if(valueToBeFilled==""){
        _defaultValue=new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: (format=="24_hour" ? false :true) });
    }else{
        _defaultValue=valueToBeFilled;
    }
     var _timeConvension ;
    var _timeSplit=_defaultValue.split(":");
    if(_timeSplit[1])
    {
     _timeConvension=_timeSplit[1].split(" ");
    }
    var _valueArr=[];
    switch(format){
        case '24_hour':
            _valueArr=defaultValue= [_timeSplit[0],_timeSplit[1]] ;
           _ColoumArray= [
                        //Hours
                           {
                           values: (function () {
                                    var arr = [];
                                    for (var i = 0; i <= 23; i++) {
                                        if(i<10){
                                        arr.push("0"+i);
                                        }else{
                                        arr.push(i);
                                        }
                                    }
                                    return arr;
                                    })(),
                           },
                           // Divider
                           {
                           divider: true,
                           content: ':'
                           },
                           // Minutes
                           {
                           values: (function () {
                                    var arr = [];
                                    for (var i = 0; i <= 59; i++) {
                                        arr.push(i < 10 ? '0' + i : i);
                                    }
                                    return arr;
                                    })(),
                           }
                        ]
        break;
        case '12_hour':
              if(_timeConvension)
              {
             _valueArr=[ (_timeSplit[0].toString().length==1?"0"+_timeSplit[0]:_timeSplit[0]),(_timeConvension[0].toString().length==1?"0"+_timeConvension[0]:_timeConvension[0]),_timeConvension[1]] ;

               }
               else
               {
                _valueArr=[ (_timeSplit[0].toString().length==1?"0"+_timeSplit[0]:_timeSplit[0])] ;

               }
            _ColoumArray= [
                       //Hours
                       {
                       values: (function () {
                                var arr = [];
                                for (var i = 1; i <= 12; i++) {
                                    if(i<10){
                                    arr.push("0"+i);
                                    }else{
                                    arr.push(i);
                                    }
                                }
                                return arr;
                                })(),
                       },
                       // Divider
                       {
                       divider: true,
                       content: ':'
                       },
                       // Minutes
                       {
                       values: (function () {
                                var arr = [];
                                for (var i = 0; i <= 59; i++) { arr.push(i < 10 ? '0' + i : i); }
                                return arr;
                                })(),
                       },
                       {
                       values: ["AM", "PM"],
                       }
                    ]
            break;
        }

        var timePicker = Appyscript.picker ({
                                        input: '#'+identifier,
                                        toolbar: true,
                                        rotateEffect: true,
                                        value: _valueArr,
                                        formatValue: function (p, values, displayValues)
                                        {
                                            return  values[0] + ':' + values[1]+(values.length==3?" "+values[2]:"");
                                        },
                                        cols: _ColoumArray
                                        });
}



//--------------------Helper for converting date into dateformat provided by manifest


AppyTemplate.registerHelper('convertToDateFormatManifest',function (value) {

    var _defaultDateFormat=data.defaultDateFormat.toLowerCase();
    var _monthArr=data.monthLang;
    var _currentDate= new Date(value);
    var _convertedDate;

    var _dateValue = _currentDate.getDate();
    var _monthValue = parseInt(_currentDate.getMonth() + 1 ); //January is 0!
    var _yearValue = _currentDate.getFullYear();

    _dateValue= (_dateValue.toString().length==1?"0"+_dateValue:_dateValue);
    _monthValue = (_monthValue.toString().length==1?"0"+_monthValue:_monthValue);

    var _occurenceOfM=((_defaultDateFormat.split("m")).length - 1);

    //Replace Months
    if(_occurenceOfM==2){
     _convertedDate = _defaultDateFormat.replace("mm",_monthValue);
    }else{
     _convertedDate = _defaultDateFormat.replace("mmm",_monthArr[parseInt(_monthValue) - 1]);
    }

    //Replace Date
    _convertedDate = _convertedDate.replace("dd",_dateValue);
    //Replace Year
    _convertedDate = _convertedDate.replace("yyyy",_yearValue).replace("yy",_yearValue.toString().substring(2,4));
    return _convertedDate;
})


AppyTemplate.registerHelper('httpsUrl', function(value) {

var _value = value.split("://");
    if(_value.length>1 && _value[0] == "http"){
    value = "https://"+_value[1];
    }

    return value;

})


AppyTemplate.registerHelper('getDateStr', function(str) {
    if(str == "") {return ""; }
    var tmpD = new Date(str);

    return ewalletUtility.getDateWithFormat("dd MMM yyyy", (tmpD.getTime() / 1000)) + ", " + ewalletUtility.getDayStr(tmpD.getDay());

});

AppyTemplate.registerHelper('ewalletAmountHelper', function(str, pageStr) {
    if(str === "" || str === null ) {return "0"; }
    var amountStr = currencyFomatter(parseFloat(str));
    amountStr = (amountStr != undefined && amountStr != "undefined" && amountStr != null && (amountStr + "").length > 0) ? amountStr : str;

    if(pageStr == "ecom") {

      return  ((data.languageSetting.msg_availableBalance != undefined && data.languageSetting.msg_availableBalance != null && data.languageSetting.msg_availableBalance.length > 0) ? data.languageSetting.msg_availableBalance :"Your available balance amount") + " " + ewalletModel.getcurrencySymbol() + amountStr;

    }

    return ewalletModel.getcurrencySymbol() + amountStr;

});

AppyTemplate.registerHelper('remainingbalance', function(str) {
    return "("+ewalletModel.getcurrencySymbol()+"0 "+((data.languageSetting.msg_availableBalanceAfterOreder != undefined && data.languageSetting.msg_availableBalanceAfterOreder != null && data.languageSetting.msg_availableBalanceAfterOreder.length > 0) ? data.languageSetting.msg_availableBalanceAfterOreder :"WIll Be Available After place order")+")";

});

Appyscript.isFunction = function(functionToCheck) {
    return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
}

Appyscript.removeFirstChar = function(string){
    return string.substr(1);

}

Appyscript.ewalletAvailable = function() {
    var ewalletStatus = false;

    for(var i = 0; i < data.home.length; i++) {
        if( data.home[i].pageid == "ewallet") {
            ewalletStatus = true;
            break;
        }

    }

    return ewalletStatus;

}

Appyscript.checkLogin_ewallet = function() {
    var userid = localStorage.getItem("userId")

    if (userid != undefined && userid != '') {
        return true;
    } else {
        return false;
    }

}


AppyTemplate.registerHelper('getNavigationEwalletProfile',function (mode) {
    var iconColor = AppyTemplate.global.style.headerBarIconColor;
    var backClass = "";
    if(mode == "common") {
        if(!AppyTemplate.global.innerLayout) {
            backClass = "bottomBack";
        }
    }
    else {
        if (!folderPage) {
            backClass = "bottomBack";
        }
    }

    if(pageId == "services" || pageId == "realestate" || pageId == "hyperlocal" || pageId == "coupon" || pageId == "folder") {
        if(AppyTemplate.global.dirMode) {
            backClass +=" dirBack";
        }
    }
    var htmlString = '<a href="index" class="link back '+backClass+'" style="color:'+iconColor+';"><i class="icon icon-left-open-2"></i></a>';
    if(AppyTemplate.global.style.layout == 'slidemenu' || AppyTemplate.global.style.layout == 'slidemenu3d') {
        htmlString = '<a onclick="Appyscript.openSlide()" style="color:' + iconColor + ';"><i class="icon icon-menu"></i></a>';

    // htmlString = '<a href="index" class="link back '+backClass+'" style="color:'+iconColor+';"><i class="icon icon-left-open-2"></i></a>';
    }
    if ((AppyTemplate.global.style.layout == 'slidemenu' || AppyTemplate.global.style.layout == 'slidemenu3d') && isGlobalPlusCodeRequest  ) {
       htmlString = '<a href="index"  onclick="goBackfromcouponPage()" class="link back ' + backClass + '" style="color:' + iconColor + ';"><i class="icon icon-left-open-2"></i></a>';
    }

    if(AppyTemplate.global.style.layout == "bottom") {
        htmlString = '<a class="link back" style="color:'+iconColor+';" onclick="Appyscript.clickHome()"><i class="icon icon-left-open-2"></i></a>';

    }

    return htmlString;
});

Appyscript.getcurrencySymbol = function(currencyName) {
    if(data.currencySymbol != undefined && currencyName != undefined && currencyName != "undefined" && currencyName.length > 0) {
        return data.currencySymbol[currencyName.toUpperCase()];

    }

    return "$";

}

function wallet_availabilitywithOtherpayment(str) {
    if(Appyscript.checkLogin_ewallet() && ewalletModel.getewalletAvailableStatus() && ewalletModel.getbalanceAmount() > 0 && parseFloat(str) > parseFloat(ewalletModel.getbalanceAmount())) {
        return "block";

    }

    return "none";

}

function wallet_remainingBalance() {
    return "("+ewalletModel.getcurrencySymbol()+"0 "+((data.languageSetting.msg_availableBalanceAfterOreder != undefined && data.languageSetting.msg_availableBalanceAfterOreder != null && data.languageSetting.msg_availableBalanceAfterOreder.length > 0) ? data.languageSetting.msg_availableBalanceAfterOreder :"WIll Be Available After place order")+")";

}

AppyTemplate.registerHelper('availabilityewalletWithotherPayment', function(str) {
   var tmp =  (localStorage.getItem("productList") != undefined && localStorage.getItem("productList") != "undefined" && localStorage.getItem("productList").length > 0) ? JSON.parse(localStorage.getItem("productList")) : undefined;

    if(str != "ewallet" ) {
       return "block";

    }

    if( tmp != undefined && str == "ewallet" && ewalletModel.getewalletAvailableStatus() && ewalletModel.getbalanceAmount() > 0 && parseFloat(tmp.maxGrandTotalStoreAmount) <= parseFloat(ewalletModel.getbalanceAmount()) ) {
        return "block";

    }

    return "none";

});
function wallet_optionCheckbox(item) {
    var productData = JSON.parse(localStorage.getItem("productList"))

    var displayType = wallet_availabilitywithOtherpayment(productData.maxGrandTotalStoreAmount);
    var remainingbalance = wallet_remainingBalance()

    var str = ewalletModel.getbalanceAmount()
    var amountStr = currencyFomatter(parseFloat(str));
    amountStr = ewalletModel.getcurrencySymbol() + ((amountStr != undefined && amountStr != "undefined" && amountStr != null && (amountStr + "").length > 0) ? amountStr : str);

    return '<p style="display:'+displayType+'">Your Available Balance</p> <div class="ewalletbalance-btn" style="display:'+displayType+'" id="ewalletbalance'+item.paymentMethodKey+'"> <label class="save-card" style="text-align:left;"> <input type="checkbox">Use your <b>'+amountStr+' Wallet Pay balance</b></label> </div>';

}



function changeToDefaultFormatDate(date){

    var selectedDate = new Date(date);

    var _defaultDateFormat=data.defaultDateFormat.toLowerCase();
    var _monthArr=data.monthLang;
    var _convertedDate;

    var _dateValue =  selectedDate.getDate();
    var _monthValue = selectedDate.getMonth()+1;
    var _yearValue = selectedDate.getFullYear();

    _dateValue= (_dateValue.toString().length==1?"0"+_dateValue:_dateValue);
    _monthValue = (_monthValue.toString().length==1?"0"+_monthValue:_monthValue);

    var _occurenceOfM=((_defaultDateFormat.split("m")).length - 1);

    //Replace Months
    if(_occurenceOfM==2){
         _convertedDate = _defaultDateFormat.replace("mm",_monthValue);
    }else if (_occurenceOfM==1){
         _convertedDate = _defaultDateFormat.replace("m",_monthValue);
    }else{
     _convertedDate = _defaultDateFormat.replace("mmm",_monthArr[parseInt(_monthValue)- 1]);
    }

    //Replace Date
    _convertedDate = _convertedDate.replace("dd",_dateValue);
    //Replace Year
    _convertedDate = _convertedDate.replace("yyyy",_yearValue).replace("yy",_yearValue.toString().substring(2,4));
    return _convertedDate;
}



function velocitySearchFunction(a){
    var number = $$("#cnumberVel").val();
    var selectedIndex = checkCardValidation(number);


    var re = {
        Visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
        MasterCard: /^5[1-5][0-9]{14}$/,
        AmericanExpress: /^3[47][0-9]{13}$/,
        Discover: /^6(?:011|5[0-9]{2})[0-9]{12}$/
    }

    re.hasOwnProperty(selectedIndex) ?  $$("#velocityCardType").val(selectedIndex) :  $$("#velocityCardType").val("Select");

}

function checkCardValidation(number){
     var re = {
        Visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
        MasterCard: /^5[1-5][0-9]{14}$/,
        AmericanExpress: /^3[47][0-9]{13}$/,
        Discover: /^6(?:011|5[0-9]{2})[0-9]{12}$/
    }

    for(var key in re) {
        if(re[key].test(number)) {
            return key
        }
    }
}

AppyTemplate.registerHelper('checkPercent', function(variable) {
                            var digitCheck = variable * 100;
                            digitCheck = Math.ceil(digitCheck * 100) / 100
      return digitCheck;
 });

function copyToClipboardGlobal(copiedText) {
    if (Appyscript.device.android) {
        copyPlusCode(document.getElementById("promoID"));
        Appyscript.showToast("Successfully Copied", 0);
    } else {
          window.location = "windowalertwithcopy:" + copiedText +"pluscodecopySuccessfully Copied";
    }
}