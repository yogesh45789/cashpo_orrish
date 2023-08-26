export default {
    namespaced: true,

    state: {
        show_details_page: false,
        id: null,
    },

    getters: {
        getLoanHistory: (state) => state,
    },

    mutations: {
        SHOW_LOAN: (state, obj) => {
            state.show_details_page = obj.show_details_page ? obj.show_details_page : false;
            state.id = obj.id ? obj.id : null;
        }
    },


    actions: {
        setLoanHistory({ commit }, obj) {
            commit("SHOW_LOAN", obj)
        }
    }


}