aws-ip-address-lookup
=======
[![Build Status](https://travis-ci.org/dutu/aws-ip-address-lookup.svg)](https://travis-ci.org/dutu/aws-ip-address-lookup) ![Dependencies Status](https://david-dm.org/dutu/aws-ip-address-lookup.svg)


**aws-ip-address-lookup** is a node.js module for looking up Amazon Web Services (AWS) IP address details.

See [AWS IP Address Ranges](http://docs.aws.amazon.com/general/latest/gr/aws-ip-ranges.html "AWS IP Address Ranges").


### Contents
* [Install](#install)
* [Use](#use)
* [ChangeLog](#changelog)
* [License](#license) 



# Install

    npm install aws-ip-address-lookup

# Use

### Example 1

```js
const AwsIPAddressLookup = require("aws-ip-address-lookup");
let awsIPAddressLookup = new AwsIPAddressLookup();
	
awsIPAddressLookup.lookup('54.255.183.252', function (err, details) {
  if (!err) {
    console.log(JSON.stringify(details));
  }
});
```

Result:
```js
{
  "ipAddress": "54.255.183.252",
  "ipPrefix": "54.255.0.0/16",
  "region": "ap-southeast-1",
  "service": "AMAZON"
}
```

### Example 2

```js
const AwsIPAddressLookup = require("aws-ip-address-lookup");
let awsIPAddressLookup = new AwsIPAddressLookup();
	
awsIPAddressLookup.lookup(['54.255.183.252', '127.0.0.1', '2620:0107:300f:0000:0000:0000:0000:0000'], (err, details) => {
  if (!err) {
    console.log(JSON.stringify(details));
  }
});
```

Result:
```js
[
  {
    ipAddress: "54.255.183.252",
    ipPrefix: "54.255.0.0/16",
    region: "ap-southeast-1",
    service: "AMAZON"
  },
  {
    ipAddress: "127.0.0.1",
    ipPrefix: "",
    region: "",
    service: ""
  },
  {
    ipAddress: "2620:0107:300f:0000:0000:0000:0000:0000",
    ipPrefix: "2620:107:300f::/64",
    region: "us-west-1",
    service: "AMAZON"
  }
]
```

# ChangeLog

**aws-ip-address-lookup** module adheres to [Semantic Versioning](http://semver.org/).

## [1.0.1] - 2017-04-15

### Changed:
- Update examples

## [1.0.0] - 2017-04-15

- First release

# License

[MIT](LICENSE)