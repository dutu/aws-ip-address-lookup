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



# Install #

    npm install aws-ip-address-lookup

# Use #

### Example 1

```js
const Aws-ip-address-lookup = require("aws-ip-address-lookup");
var aws-ip-address-lookup = new Aws-ip-address-lookup();
	
aws-ip-address-lookup.lookup('54.255.183.252', function (err, details) {
  if (!err) {
    console.log(JSON.strigify(details));
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



# ChangeLog

**aws-ip-address-lookup** module adheres to [Semantic Versioning](http://semver.org/) for versioning.


# License #

[MIT](LICENSE)