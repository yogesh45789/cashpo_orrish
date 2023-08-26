import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'login',
        meta: { requiresAuth: false, title: "Login", show_back_btn: false },
        component: () => import( /* webpackChunkName: "login" */ "@/views/Login-Page/Login.vue")
    },
    {
        path: '/',
        name: 'home',
        component: () => import( /* webpackChunkName: "WarehouseProfile" */ "@/components/layouts/Base.vue"),
        beforeEnter: (to, from, next) => {
            guard(to, from, next)
        },
        children: [
            {
                path: 'team',
                name: 'team',
                meta: { requiresAuth: true, title: "Team", show_back_btn: false },
                component: () => import( /* webpackChunkName: "team" */ "@/views/Admin/team/index.vue")
            },
            {
                path: 'team/details/:id',
                name: 'team-details',
                meta: { requiresAuth: true, title: "Team Member Details", show_back_btn: true },
                component: () => import( /* webpackChunkName: "team" */ "@/views/Admin/team/ViewMemberDetails.vue")
            },
            {
                path: 'team/add',
                name: 'add-team',
                meta: { requiresAuth: true, title: "Add Team Member", show_back_btn: true },
                component: () => import( /* webpackChunkName: "team" */ "@/views/Admin/team/AddTeamMember.vue")
            },
            {
                path: 'loan-scheme',
                name: 'loan-scheme',
                meta: { requiresAuth: true, title: "Loan Scheme", show_back_btn: false },
                component: () => import( /* webpackChunkName: "team" */ "@/views/Admin/loan-scheme/index.vue")
            },
            {
                path: 'loan-scheme/details/:id',
                name: 'loan-scheme-details',
                meta: { requiresAuth: true, title: "View Loan Scheme", show_back_btn: true },
                component: () => import( /* webpackChunkName: "team" */ "@/views/Admin/loan-scheme/ViewLoanSchemeDetails.vue")
            },
            {
                path: 'loan-scheme/add',
                name: 'add-loan-scheme',
                meta: { requiresAuth: true, title: "Create Loan Scheme", show_back_btn: true },
                component: () => import( /* webpackChunkName: "team" */ "@/views/Admin/loan-scheme/AddLoanSchemeDetails.vue")
            },
            {
                path: 'lead-list',
                name: 'lead-list',
                meta: { requiresAuth: true, title: "LOS", show_back_btn: false },
                component: () => import( /* webpackChunkName: "team" */ "@/views/LOS/index.vue")
            },
            {
                path: 'lead-list/details/:id',
                name: 'lead-details',
                meta: { requiresAuth: true, title: "Lead Details", show_back_btn: true },
                component: () => import( /* webpackChunkName: "team" */ "@/views/LOS/LeadDetails.vue")
            },
            {
                path: 'lead-list/add',
                name: 'add-lead-list',
                meta: { requiresAuth: true, title: "Create Lead", show_back_btn: true },
                component: () => import( /* webpackChunkName: "team" */ "@/views/LOS/CreateLead.vue")
            },
            {
                path: 'lms-list',
                name: 'lms-List',
                meta: { requiresAuth: true, title: "LMS", show_back_btn: true },
                component: () => import( /* webpackChunkName: "team" */ "@/views/LMS/index.vue")
            },
            {
                path: '/lms-list/lms-details/:id',
                name: 'lmsDetails',
                meta: { requiresAuth: true, title: "LMS Details", show_back_btn: true },
                component: () => import( /* webpackChunkName: "team" */ "@/views/LMS/LmsDetails.vue")
            },

            {
                path: 'account-list',
                name: 'account-list',
                meta: { requiresAuth: true, title: "Accounts", show_back_btn: false },
                component: () => import( /* webpackChunkName: "team" */ "@/views/Accounts/index.vue")
            },
            {
                path: 'account-list/disbursement/:id',
                name: 'account_disbursement',
                meta: { requiresAuth: true, title: "disbursement", show_back_btn: true },
                component: () => import( /* webpackChunkName: "team" */ "@/views/Accounts/Disbursement/Disbursement.vue")
            },
            {
                path: 'collection-list',
                name: 'collection-list',
                meta: { requiresAuth: true, title: "Collection", show_back_btn: false },
                component: () => import( /* webpackChunkName: "team" */ "@/views/Collections/index.vue")
            },
            {
                path:'notice-management',
                name:'notice-management',
                meta: { requiresAuth: true, title: "Notice Management", show_back_btn: false },
                component:() => import(/*webpackChunkName: "team" */ "@/views/Notice-Management/index.vue")
            },
            {
                path: 'notice-management/details/:id',
                name: 'notice_details',
                meta: { requiresAuth: true, title: "Notice Details", show_back_btn: true },
                component: () => import( /* webpackChunkName: "team" */ "@/views/Notice-Management/ViewNotice.vue")
            },
            {
                path:'notice-management/editdetails/:id',
                name:'edit_details',
                meta: {requiresAuth: true, title: "Edit Notice", show_back_btn: true},
                component:() => import(/* webpackChunkName: "team" */ "@/views/Notice-Management/EditNotice.vue")
            },
        ]
    },

];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})


/* redirecting to home page if access token is not provided*/
// router.beforeEach((to, from, next) => {

//     let access_token = sessionStorage.getItem("token")
//     // console.log(access_token);
//     if (to.meta.requiresAuth == true && !access_token) {
//         next({
//             name: 'login'
//         })
//     } else if (to.meta.requiresAuth == true && access_token) {
//         next({
//             name: 'team'
//         })
//     } else
//         next()

// });

const guard = function (to, from, next) {
    if (sessionStorage.getItem('token')) {
        next()
    }
    else if ((sessionStorage.getItem('token') == "") && next('/')) {
        next('/')
    }
    else {
        next('/')
    }
}

// router.beforeEach((to, from, next) => {

//     let access_token = sessionStorage.getItem("token")
//     if (to.meta.requiresAuth == true && !access_token) {
//         next({
//             name: 'login'
//         })
//     } else if (to.meta.requiresAuth == false && access_token) {
//         next({
//             name: 'team'
//         })
//     } else
//         next()

// });


export default router