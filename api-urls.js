const apiUrl = {
    // Base URL
    // BASE_URL: "https://0da2-13-234-124-191.in.ngrok.io/api/",


    // Login Page
    GET_OTP: "/user/send_otp/",
    GENERATE_token: "/user/generate_token/",
    VALIDATE_OTP: "/user/validate_otp/",


    /* ****  ****  **** **** **** **** **** **** **** ****   */

    //  Master API
    GET_HIERARCHY_LIST: "/master/get_management_hierarchy_list/",
    GET_ROLE_LIST: "/master/get_management_role_list/",
    GET_PRODUCT_TYPE_LIST: "/master/get_product_type_list/",
    GET_LOAN_TYPE_LIST: "/master/get_loan_type_list/",
    GET_FREQUENCY_LIST: "/master/get_charges_frequency_list/",
    GET_TIME_PERIOD_LIST: "/master/get_time_period_list/",
    GET_TENURE_LIST: "/master/get_tenure_list/",
    GET_VIDEO_CALL_TIMING_LIST: "/master/get_video_call_timing_list/",
    

    /* ****  ****  **** **** **** **** **** **** **** ****   */

    // Teams API
    TEAM_LIST_API: "team/get_teammember_list/",
    ADD_TEAM_MEMBER: "/team/add_teammember_info/",
    GET_TEAM_DETAILS: "/team/get_teammember_info/",
    PATCH_TEAM_DETAILS: "/team/edit_teammember_info/",
    DELETE_TEAM_DETAILS: "/team/delete_teammember_info/",
    MAKE_TEAMMEMBER_ACTIVE_INACTIVE: "/team/make_teammember_active_inactive/",
    GET_LOGGED_USER_INFO: "/team/get_logged_in_teammember_info/",


    /* ****  ****  **** **** **** **** **** **** **** ****   */


    // Loan Scheme API
    GET_LOAN_SCHEME: "/loanschema/get_loanscheme_list/",
    MAKE_LOAN_SCHEME_MEMBER_ACTIVE_INACTIVE: "/loanschema/make_loanscheme_active_inactive/",
    DELETE_LOAN_SCHEME_DETAILS: "/loanschema/delete_loanscheme_info/",
    ADD_INSURANCE_FEE: "/loanschema/add_loan_insurance_fee/",
    ADD_PROCESSING_FEE: "/loanschema/add_loan_processing_fee/",
    ADD_LOANSCHEME_INFO: "/loanschema/add_loanscheme_info/",
    GET_LOAN_SCHEME_DETAILS: "/loanschema/get_loanscheme_info/",
    PATCH_LOAN_SCHEME_DETAILS: '/loanschema/edit_loanscheme_info/',


    /* ****  ****  **** **** **** **** **** **** **** ****   */


    // Borrower  LOS
    GET_BORROWER_COMPLETE_INFO: "/borrower/get_borrower_complete_info/",
    ADD_BORROWER_COMPLETE_INFO: "/borrower/create_borrower_complete_info/",
    CREATE_BORROWER_INFO: "/borrower/admin_upload_borrower_documents/",


    /* ****  ****  **** **** **** **** **** **** **** ****   */

    // Los loan
    GET_LOS_LOAN_LIST: "/los_loan/get_loan_list/",
    GET_BORROWER_LOAN_INFO: "/los_loan/get_borrower_loan_information/",

        // stepper
    GET_STEPS: "/los_loan_button/get_internal_loan_status/",  // GET -- params: lead_creation
    UPDATE_LOS_LOAN_STATUS: "/los_loan_button/update_loan_status/",  // look_up_key: lead_creation
        // internal score
    GET_INTERNAL_SCORE: "/los_loan/get_internal_score/",
        // document verification
    GET_BORROWER_SUBMITTED_DOCUMENT: "/los_loan/get_borrower_submitted_document/",
    MAKE_DOCUMENT_VERIFIED: "/los_loan/document_is_verified_button/",
    MAKE_REQUEST_AGAIN: "/los_loan/document_requested_again_button/",
    GET_APPROVAL_FORM_DETAILS: "/los_loan/get_loan_approval_form/",
    POST_APPROVAL_FORM_DETAILS: "/los_loan/create_loan_approval_form/",
        // cam
    GET_CAM_DETAILS: "/los_loan_cam/get_cam_detail/",
    GET_CAM_OFFER_LIST: "/los_loan_cam/get_cam_offer_list/", // params: lead_creation
    GENERATE_CAM_OFFER_LIST: "/los_loan_cam/create_or_update_cam_data/", // look_up_key: lead_creation
    SEND_OFFERS_TO_CUSTOMER: "/los_loan_cam/send_offer_to_customer/", // params: lead_creation
    SELECT_OFFER: "/los_loan_cam/admin_update_offer_status/",
        // disbursal details
    GET_DISBURSAL_DETAILS: "/los_loan_charges/get_disbursal_detail/", // GET -- look_up_key: lead_creation
        // video verification
    GET_VIDEO_CALL_SCHEDULE: "/los_loan_video/get_video_call_schedule_list/",  // GET -- params: lead_creation
    GET_LAST_VIDEO_CALL_DETAILS: "/los_loan_video/get_last_video_call_detail/", //GET -- look_up_key: lead_creation
    ADD_VIDEO_CALL_SCHEDULE: "/los_loan_video/add_video_schedule/",  // POST -- look_up_key: lead_creation
    ADD_VIDEO_CALL_VERIFICATION_DIALOG: "/los_loan_video/add_video_call_verification/", // POST -- look_up_key: lead_creation
        // enach
    GET_ENACH_DETAILS: "/los_loan_enach/get_enach_details/", // GET -- look_up_key: lead_creation
    UPDATE_ENACH_DETAILS: "/los_loan_enach/update_enach/", // PUT/PATCH -- look_up_key: lead_creation
        // payment details
    GET_PAYMENT_DETAILS: "/los_loan_payment/get_payment_details/", //GET -- look_up_key: lead_creation
    GET_PAYMENT_BREAKDOWN: "/los_loan_payment/get_payment_task_details/", //GET -- look_up_key: lead_creation
    UPDATE_BORROWER_BANK_DETAILS: "/los_loan_payment/update_borrower_bank_details/", // PUT/PATCH -- look_up_key: lead_creation
    
    


    /* ****  ****  **** **** **** **** **** **** **** ****   */

    //LMS loan
    GET_LMS_LOAN_LIST: "/lms_loan/get_loan_list/",
    GET_LMS_LOAN_INFO: "/lms_loan/get_loan_info/",

    /* ****  ****  **** **** **** **** **** **** **** ****   */

    //Notice Management
    NOTICE_LIST_API: "/notice/get_notice_list/",
    DELETE_NOTICE_DETAILS: "/notice/delete_notice/",
    GET_NOTICE_DETAILS: "/notice/get_notice/",
    PATCH_NOTICE_DETAILS: "/notice/update_notice/",
    POST_NOTICE_DETAILS: "/notice/create_notice/",

}

export default apiUrl;