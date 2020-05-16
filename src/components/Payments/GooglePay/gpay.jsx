// Global key for canMakepayment cache.
const canMakePaymentCache = 'canMakePaymentCache';

/**
 * Check whether can make payment with Google Pay or not. It will check session storage
 * cache first and use the cache directly if it exists. Otherwise, it will call
 * canMakePayment method from PaymentRequest object and return the result, the
 * result will also be stored in the session storage cache for future usage.
 *
 * @private
 * @param {PaymentRequest} request The payment request object.
 * @return {Promise} a promise containing the result of whether can make payment.
 */
function checkCanMakePayment(request) {
    // Check canMakePayment cache, use cache result directly if it exists.
    if (sessionStorage.hasOwnProperty(canMakePaymentCache)) {
        return Promise.resolve(JSON.parse(sessionStorage[canMakePaymentCache]));
    }

    // If canMakePayment() isn't available, default to assume the method is
    // supported.
    var canMakePaymentPromise = Promise.resolve(true);

    // Feature detect canMakePayment().
    if (request.canMakePayment) {
        canMakePaymentPromise = request.canMakePayment();
    }

    return canMakePaymentPromise
        .then((result) => {
            // Store the result in cache for future usage.
            sessionStorage[canMakePaymentCache] = result;
            return result;
        })
        .catch((err) => {
            console.log('Error calling canMakePayment: ' + err);
        });
}


/**
* Show the payment request UI.
*
* @private
* @param {PaymentRequest} request The payment request object.
* @param {Promise} canMakePayment The promise for whether can make payment.
*/
function showPaymentUI(request, canMakePayment) {
    if (!canMakePayment) {
        handleNotReadyToPay();
        return;
    }

    // Set payment timeout.
    let paymentTimeout = window.setTimeout(function () {
        window.clearTimeout(paymentTimeout);
        request.abort()
            .then(function () {
                console.log('Payment timed out after 20 minutes.');
            })
            .catch(function () {
                console.log('Unable to abort, user is in the process of paying.');
            });
    }, 20 * 60 * 1000); /* 20 minutes */

    request.show()
        .then(function (instrument) {

            window.clearTimeout(paymentTimeout);
            console.log(instrument);
            
            processResponse(instrument); // Handle response from browser.
        })
        .catch(function (err) {
            console.log(err);
        });
}

/**
* Process the response from browser.
*
* @private
* @param {PaymentResponse} instrument The payment instrument that was authed.
*/
function processResponse(instrument) {
    var instrumentString = JSON.stringify(instrument, undefined, 2);
    
    console.log(instrumentString);

    fetch('/buy', {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: instrumentString,
    })
        .then(function (buyResult) {
            if (buyResult.ok) {
                return buyResult.json();
            }
            console.log('Error sending instrument to server.');
        })
        .then(function (buyResultJson) {
            completePayment(instrument, buyResultJson.status, buyResultJson.message);

        })
        .catch(function (err) {
            console.log('Unable to process payment. ' + err);
        });
}

/**
* Notify browser that the instrument authorization has completed.
*
* @private
* @param {PaymentResponse} instrument The payment instrument that was authed.
* @param {string} result Whether the auth was successful. Should be either
* 'success' or 'fail'.
* @param {string} msg The message to log in console.
*/
function completePayment(instrument, result, msg) {
    instrument.complete(result)
        .then(function () {
            console.log('Payment succeeds.');
            console.log(msg);
        })
        .catch(function (err) {
            console.log(err);
        });
}

/** Launches payment request flow when user taps on buy button. */
function onBuyClicked(amt) {
    if (!window.PaymentRequest) {
        console.log('Web payments are not supported in this browser.');
        return;
    }

    // Create supported payment method.
    const supportedInstruments = [
        {
            supportedMethods: ['https://tez.google.com/pay'],
            data: {
                pa: 'jainprashul@paytm',
                pn: 'Prashul Jain',
                tr: '1234ABCDxxxxx',  // your custom transaction reference ID
                url: 'https://game-zone.jainprashul.now.sh/account',
                mc: '6211', // your merchant category code
                tn: 'Add Balance to GameZone',
            },
        }
    ];

    // Create order detail data.
    const details = {
        total: {
            label: 'Total',
            amount: {
                currency: 'INR',
                value: `${amt}`, // sample amount
            },
        },
        displayItems: [{
            label: 'Add Balance',
            amount: {
                currency: 'INR',
                value: `${amt}`, 
            },
        }],
    };

    // Create payment request object.
    let request = null;
    try {
        request = new PaymentRequest(supportedInstruments, details);
    } catch (e) {
        console.log('Payment Request Error: ' + e.message);
        return;
    }
    if (!request) {
        console.log('Web payments are not supported in this browser.');
        return;
    }

    var canMakePaymentPromise = checkCanMakePayment(request);
    canMakePaymentPromise
        .then((result) => {
            showPaymentUI(request, result);
        })
        .catch((err) => {
            console.log('Error calling checkCanMakePayment: ' + err);
        });
}

/** Handle Google Pay not ready to pay case. */
function handleNotReadyToPay() {
    alert('Google Pay is not ready to pay.');
}



export {onBuyClicked}