const countryMap = {
    "United States": "US",
    "Canada": "CA",
    "United Kingdom": "GB",
    "Australia": "AU",
    "India": "IN",
    "Germany": "DE",
    "France": "FR",
    "Japan": "JP",
    "China": "CN",
    "Brazil": "BR",
    "South Korea": "KR",
    "Mexico": "MX",
    "Italy": "IT",
    "Spain": "ES",
    "Netherlands": "NL",
    "Turkey": "TR",
    "Switzerland": "CH",
    "Saudi Arabia": "SA",
    "Sweden": "SE",
    "Poland": "PL",
    "Belgium": "BE",
    "Norway": "NO",
    "Austria": "AT",
    "UAE": "AE",
    "Indonesia": "ID",
    "Denmark": "DK",
    "Malaysia": "MY",
    "Singapore": "SG",
    "Philippines": "PH",
    "Finland": "FI",
    "Russia": "RU",
    "Portugal": "PT",
    "Hong Kong": "HK",
    "South Africa": "ZA",
    "Ireland": "IE",
    "Thailand": "TH",
    "Greece": "GR",
    "Argentina": "AR",
    "New Zealand": "NZ",
    "Egypt": "EG",
    "Vietnam": "VN",
    "Pakistan": "PK",
    "Peru": "PE",
    "Ukraine": "UA",
    "Qatar": "QA",
    "Romania": "RO",
    "Czech Republic": "CZ",
    "Hungary": "HU",
    "Chile": "CL",
    "Colombia": "CO",
    "Nigeria": "NG",
    "Bangladesh": "BD",
    "Belarus": "BY",
    "Azerbaijan": "AZ",
    "Sri Lanka": "LK",
    "Kenya": "KE",
    "Venezuela": "VE",
    "Ecuador": "EC",
    "Bulgaria": "BG",
};

function getCountryCode(countryName) {
    for (const [name, code] of Object.entries(countryMap)) {
        if (name === countryName) {
            return code;
        }
        else {
            return "IN";
        }
    }
}

function getCountryName(countryCode) {
    for (const [name, code] of Object.entries(countryMap)) {
        if (code === countryCode) {
            return name;
        }
    }
    return "Code not found";
}

export { getCountryCode, getCountryName };
