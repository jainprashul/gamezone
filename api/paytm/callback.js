const qs = require('querystring');
const checksum_lib = require('./_utils/checksum');
const PaytmConfig = require('./_utils/config');

module.exports = (req, res) => {
    let body = '';
    req.on('data', (data) => {
        body += data;
    });

    req.on('end', () => {
        let html = '';
        let post_data = qs.parse(body);
        let url = '/api/paytm/txnstatus'
        let sendData = qs.stringify(post_data)

        // received params in callback
        console.log('Callback Response: ', post_data, "\n");
        // sessionStorage.setItem('tnx', value)
        
        html += "<b>Callback Response</b><br>";
        html += '<form method="post" action="' + url + '" name="paytm_form">'
        for (var x in post_data) {
            html += '<input name="' + x + '" value="' + post_data[x] + '">'
            // html += x + " => " + post_data[x] + "<br/>";
        }
        html += "</form>";
        
        // verify the checksum
        var checksumhash = post_data.CHECKSUMHASH;
        // delete post_data.CHECKSUMHASH;
        var result = checksum_lib.verifychecksum(post_data, PaytmConfig.key, checksumhash);
        console.log("Checksum Result => ", result, "\n");
        html += "<b>Checksum Result</b> => " + (result ? "True" : "False");
        html += "<br/><br/>";
        html += `<script type="text/javascript">window.sessionStorage.setItem("txndetails", '${sendData}'); window.location.href = "/account" ; </script>`

        // // Send Server-to-Server request to verify Order Status
        // var params = { "MID": PaytmConfig.mid, "ORDERID": post_data.ORDERID };

        // checksum_lib.genchecksum(params, PaytmConfig.key, function (err, checksum) {

        //     params.CHECKSUMHASH = checksum;
        //     post_data = 'JsonData=' + JSON.stringify(params);

        //     var options = {
        //         hostname: 'securegw-stage.paytm.in', // for staging
        //         // hostname: 'securegw.paytm.in', // for production
        //         port: 443,
        //         path: '/merchant-status/getTxnStatus',
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/x-www-form-urlencoded',
        //             'Content-Length': post_data.length
        //         }
        //     };

        //     // Set up the request
        //     var response = "";

        //     var post_req = http.request(options, function (post_res) {
        //         console.log(post_res);
                
        //         post_res.on('data', function (chunk) {
        //             response += chunk;
        //         });

        //         post_res.on('end', function () {
        //             console.log('S2S Response: ', response, "\n");

        //             var _result = JSON.parse(response);
        //             html += "<b>Status Check Response</b><br>";
        //             for (var x in _result) {
        //                 html += x + " => " + _result[x] + "<br/>";
        //             }

        //             res.writeHead(200, { 'Content-Type': 'text/html' });
        //             res.write(html);
        //             res.end();
        //         });
        //     });


            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(html);
            res.end();
        // });
    });
}