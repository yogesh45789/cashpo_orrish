<template>
  <div>
    <v-row>
      <v-col cols="12">
        <div>
          <v-card>
            <h2 class="header-info ml-4 pt-5">During Disbursement</h2>
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

          <v-card>
            <h2 class="header-info ml-4 pt-5 mt-3">After Disbursement</h2>
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

              <!-- <template v-slot:[`header.name`]> Remark </template> -->
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
          text: "Charge Name",
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
          text: "Discount",
          value: "discount",
          sortable: false,
          align: "center",
          class: "table_header font-weight-medium",
        },
        {
          text: "Total Charge",
          value: "charges",
          sortable: false,
          align: "center",
          class: "table_header font-weight-medium",
        },
      ],

      headerrs: {
        text: "Remark",
        value: "remark",
        sortable: false,
        align: "center",
        class: "table_header font-weight-medium",
      },

      teamData: [
        {
          date: "04 Mar 2022",
          time: "03:45 PM",
          name: "Processing Fee",
          amount: "2,000",
          discount: "400",
          charges: "1300",
          remark: 21,
        },
        {
          date: "04 Mar 2022",
          time: "03:45 PM",
          name: "Processing Fee",
          amount: "2,000",
          discount: "400",
          charges: "1300",
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