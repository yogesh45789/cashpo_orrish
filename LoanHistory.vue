<template>
  <div>
    <div v-if="getLoanHistory.show_details_page">
      <LoanDetails />
    </div>
    <div v-else>
      <LoanTable />
    </div>
  </div>
</template>

<script>
import LoanTable from "@/components/lms/LoanHistory/LoanTable.vue";
import LoanDetails from "@/components/lms/LoanHistory/LoanDetails.vue";
import { mapGetters } from "vuex";

export default {
  components: { LoanTable, LoanDetails },
  computed: {
    ...mapGetters({
      getLoanHistory: "loanHistory/getLoanHistory",
    }),
  },
  methods: {},
  mounted() {
    // console.log(this.show);
  },
};
</script>

<style >
</style>