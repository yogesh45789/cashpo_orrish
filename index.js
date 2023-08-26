export default {
    namespaced: true,
    state: {
      notice_modal: {
        show: false,
      },
    },
    mutations: {
      SET_NOTICE_MODAL(state, obj) {
           state.notice_modal.show = obj.show;
      },
    },
    getters:{},
  }
  //   actions: {
  //     toggleModal({ commit }, obj) {
  //       commit("TOGGLE_MODAL", obj);
  //     }
  //   }
  