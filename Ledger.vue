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
              <template v-slot:[`item.date`]="{ item }">
                <div>{{ item.date }}</div>
                <div>{{ item.time }}</div>
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
  name: "LedgerList",
  data() {
    return {
      name: "ChargeDetails",
      loading_text: "Loading please wait",
      table_loading: false,
      page: 1,
      length: 1,
      id: null,
      search: "",
      headers: [
        {
          text: "Date",
          align: "start",
          filterable: false,
          value: "date",
          sortable: false,
          class: "table_header ",
        },

        {
          text: "Particulars",
          value: "name",
          align: "center",
          class: "table_header font-weight-medium",

          sortable: false,
        },
        {
          text: "Amount",
          value: "amount",
          align: "center",
          sortable: false,

          class: "table_header font-weight-medium",
        },
        {
          text: "Balance",
          value: "balance",
          sortable: false,
          align: "center",
          class: "table_header font-weight-medium",
        },
        {
          text: "Narration",
          value: "narrations",
          sortable: false,
          align: "center",
          class: "table_header font-weight-medium",
        },
      ],

      teamData: [
        {
          date: "04 Mar 2022",
          time: "03:45 PM",
          name: "Processing Fee",
          amount: "2,000",
          balance: "400",
          narrations: "Proccessing Fee Charged",
        },
        {
          date: "04 Mar 2022",
          time: "03:45 PM",
          name: "Processing Fee",
          amount: "2,000",
          balance: "400",
          narrations: "Proccessing Fee Charged",
        },
      ],
    };
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
</style>