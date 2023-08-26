<template>
  <div>
    <v-row>
      <v-col cols="12">
        <div>
          <v-card>
            <v-data-table
              :headers="headers"
              :search="search"
              :items="teamData"
              :loading="table_loading"
              :loading-text="loading_text"
              hide-default-footer
            >
              <template v-slot:[`item.applied_on`]="{ item }">
                <div>{{ item.applied_on }}</div>
                <div>{{ item.time }}</div>
              </template>
              <template v-slot:[`item.applied_amount`]="{ item }">
                <div>{{ item.applied_amount }}</div>
                <div>{{ item.time2 }}</div>
              </template>
              <template v-slot:[`item.status`]="{ item }">
                <div class="text-center">
                  <v-chip :class="item.status">
                    {{ item.status }}
                  </v-chip>
                </div>

                <!-- <v-btn
                  v-if="item.status"
                  color="#4A8C4F"
                  rounded
                  outlined
                  small
                >
                  <div>Completed</div>
                </v-btn> -->
                <!-- <v-btn v-else color="#D7443E" rounded outlined small>
                  <div>Rejected</div>
                </v-btn> -->
              </template>

              <template v-slot:[`item.action`]="{ item }">
                <v-btn
                  @click="openLead(item.cif)"
                  color="primary"
                  outlined
                  small
                >
                  View
                </v-btn>
              </template>
            </v-data-table>
          </v-card>

          <div class="mt-5 text-center">
            <v-pagination
              v-model="page"
              :length="length"
              :total-visible="7"
              circle
            ></v-pagination>
          </div>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      name: "LoanTable",
      loading_text: "Loading please wait",
      table_loading: false,
      page: 1,
      length: 1,
      id: null,
      search: "",
      headers: [
        {
          text: "CIF ID",
          align: "start",
          filterable: false,
          value: "cif",
          sortable: false,
          class: "table_header ",
        },
        {
          text: "Applied on",
          align: "start",
          filterable: false,
          value: "applied_on",
          sortable: false,
          class: "table_header ",
        },
        {
          text: "Scheme",
          align: "start",
          filterable: false,
          value: "shceme",
          sortable: false,
          class: "table_header ",
        },
        {
          text: "Applied Amount",
          align: "start",
          filterable: false,
          value: "applied_amount",
          sortable: false,
          class: "table_header ",
        },
        {
          text: "Sanctioned Amount",
          align: "start",
          filterable: false,
          value: "sanctioned_amount",
          sortable: false,
          class: "table_header ",
        },
        {
          text: "Agreement Date",
          align: "start",
          filterable: false,
          value: "agreement_date",
          sortable: false,
          class: "table_header ",
        },

        {
          text: "Tenure",
          value: "tenure",
          align: "center",
          class: "table_header font-weight-medium",
          sortable: false,
        },

        {
          text: "Status",
          value: "status",
          sortable: false,
          align: "center",
          class: "table_header font-weight-medium",
        },
        {
          text: "Actions",
          value: "action",
          sortable: false,
          align: "center",
          class: "table_header font-weight-medium",
        },
      ],

      teamData: [
        {
          cif: 123,
          applied_on: "04 Mar 2022",
          time: "03:45 PM",
          shceme: "Pesonal Loan",
          applied_amount: "04 Mar 2022",
          time2: "09:39 AM",
          sanctioned_amount: "#####",
          agreement_date: "#####",
          tenure: "60",
          status: "Completed",
        },
        {
          cif: 123,
          applied_on: "04 Mar 2022",
          time: "03:45 PM",
          shceme: "Pesonal Loan",
          applied_amount: "04 Mar 2022",
          time2: "09:39 AM",
          sanctioned_amount: "#####",
          agreement_date: "#####",
          tenure: "60",
          status: "Rejected",
        },
      ],
    };
  },
  methods: {
    openLead(item) {
      this.$store.dispatch("loanHistory/setLoanHistory", {
        show_details_page: true,
        id: item,
      });
      console.log(item);
    },
  },
};
</script>

<style >
.header-info {
  color: #2f80ed;
}
.v-data-table-header > tr > th {
  /* color: white !important; */
  font-size: 15px !important;
  font-weight: 300 !important;
}
.v-data-table-header > tr {
  height: 60px;
}
.v-chip.Completed {
  background: #e9f5ea !important;
  color: #4caf50 !important;
  /* border: 0.8px solid #4caf50 !important; */
}
.v-chip.Rejected {
  background: #fde8e6 !important;
  color: #f44336 !important;
  /* border: 0.8px solid #f44336; */
}
</style>