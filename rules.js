import messages from './messages.js';

export default {
    required: (value) => !!value || messages.FIELD_REQURIED,
    gst_required: (value) => value != null || messages.FIELD_REQURIED,
    price: (value) => value != null || messages.PRICE_REQURIED,
    required_array: (value) => !!value[0] || messages.FIELD_REQURIED,
    email: (v) => {
        /* eslint-disable-next-line no-useless-escape*/
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (re.test(String(v).toLowerCase().trim())) {
            return true;
        }
        return messages.EMAIL_MUST_BE_VALID;
    },

    otp: (v) => {
        const re = /^[0-9]{1,6}$/;
        if (re.test(v)) {
            return true;
        }
        return messages.FIELD_REQURIED;
    },
    email_optional: (v) => {
        /* eslint-disable-next-line no-useless-escape*/
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (re.test(String(v).toLowerCase().trim()) || !v) {
            return true;
        }
        return messages.EMAIL_MUST_BE_VALID;
    },
    email2: (v) => {
        /* eslint-disable-next-line no-useless-escape*/
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (v !== null && String(v).trim()) {
            if (re.test(String(v).toLowerCase().trim())) {
                return true;
            }
            return messages.EMAIL_MUST_BE_VALID;
        }
        return true;
    },
    phone: (v) => {
        const re = /^(\+91)?[0]?(91)?[6789]\d{9}$/;
        if (re.test(v)) {
            return true;
        }
        return messages.INVALID_MOBILE_NUMBER_ERROR;
    },
    name: (v) => {
        const re = /^[a-zA-Z ]+$/;
        if (re.test(v)) {
            return true;
        }
        return messages.INVALID_NAME;
    },
    phone_optional: (v) => {
        const re = /^(\+91)?[0]?(91)?[6789]\d{9}$/;
        if (v === null || v === "") {
            return true;
        } else if (re.test(v)) {
            return true;
        }
        return messages.INVALID_MOBILE_NUMBER_ERROR;
    },
    account_number: (v) => {
        // console.log(v)
        const re = /^[0-9]{9,18}$/;
        if (re.test(v)) {
            return true;
        }
        return messages.INVALID_ACCOUNT_NUMBER;
    },
    text: (v) => {
        const re = /^[A-Za-z\s]+$/;
        if (re.test(v)) {
            return true;
        }
        return messages.ONLY_CHARACTER;
    },
    NUMBER: (v) => {
        const re = /^[0-9]+$/;
        if (re.test(v)) {
            return true;
        }
        return messages.ONLY_NUMEBER;
    },
    AMOUNT: (v) => {
        const re = /^[0-9]+$/;
        if (re.test(v)) {
            return true;
        }
        return messages.AMOUNT_NOT_VALID;
    },
    url: (v) => {
        const re = /^(http|https):\/\/+[\www\d]+\.[\w]+(\/[\w\d]+)?/;
        if (re.test(v) || !v) {
            return true;
        }
        return messages.INVALID_URL;
    },
    aadharValidation: (v) => {
        if (String(v).length === 12) {
            return true;
        }
        return messages.INVALID_AADHAAR_NUMBER;
    },
    ifsc_code: (v) => {
        const re = /^[A-Z]{4}0[A-Z0-9]{6}$/;
        if (re.test(v)) {
            return true;
        }
        return messages.INVALID_IFSC_CODE;
    },
    acc_no: (v) => {
        if (
            parseInt(v.toString().length) > 8 &&
            parseInt(v.toString().length) < 18
        ) {
            return true;
        }
        return messages.INVALID_ACCOUNT_NUMBER;
    },
    pan_number: (v) => {
        // console.log(v)
        const re = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
        if (re.test(v)) {
            return true;
        }
        return messages.INVALID_PAN_NUMBER;
    },
    gst_number: (v) => {
        const re = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
        if (re.test(v)) {
            return true;
        }
        return messages.INVALID_GST;
    },

};
