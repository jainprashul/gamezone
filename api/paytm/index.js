const PaytmConfig = require('./_utils/config');
const checksum_lib = require('./_utils/checksum');
const qs = require('querystring');

module.exports = (req, res) => {

    let body = '';
    req.on('data', (data) => {
        body += data;
    })
    req.on('end', () => {
        let post_data = qs.parse(body);

        var paytmParams = {
            "MID": PaytmConfig.mid,
            "WEBSITE": PaytmConfig.website,
            "INDUSTRY_TYPE_ID": PaytmConfig.industryType,
            "CHANNEL_ID": PaytmConfig.channel,
            "ORDER_ID": "ORDER_" + Date.now(),
            "CUST_ID": "USER_001",
            'EMAIL': post_data.email,
            'MOBILE_NO': post_data.mobile,
            "TXN_AMOUNT": post_data.amt,
            'PAYMENT_TYPE_ID': "UPI",

            "CALLBACK_URL": `http://${req.headers.host}/api/paytm/callback`,
        };
        // res.send('Paytm SEnd Initiale')


        checksum_lib.genchecksum(paytmParams, PaytmConfig.key, function (err, checksum) {

            /* for Staging */
            var url = "https://securegw-stage.paytm.in/order/process";

            /* for Production */
            // var url = "https://securegw.paytm.in/order/process";

            /* Prepare HTML Form and Submit to Paytm */
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write('<html>');
            res.write('<head>');
            res.write('<title>Merchant Checkout Page</title>');
            res.write('</head>');
            res.write('<body>');
            res.write('<center><h1>Please do not refresh this page...</h1></center>');
            res.write('<form method="post" action="' + url + '" name="paytm_form">');
            for (var x in paytmParams) {
                res.write('<input type="hidden" name="' + x + '" value="' + paytmParams[x] + '">');
            }
            res.write('<input type="hidden" name="CHECKSUMHASH" value="' + checksum + '">');
            res.write('</form>');
            res.write('<script type="text/javascript">');
            res.write('document.paytm_form.submit();');
            res.write('</script>');
            res.write('</body>');
            res.write('</html>');
            res.end();
        });
    })

    
}