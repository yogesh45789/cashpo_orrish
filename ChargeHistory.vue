<template>
  <div>
    <v-card>
      <!-- <v-col cols="2" class="">
                  <v-container fluid class="pt-0">
            <v-card-text>
              <h3 style="color: #2f80ed" class="pl-2 pt-1">Add Charge</h3>
              <h4 style="color: #2f80ed" class="pl-1 pt-2">Amount</h4>
              <v-text-field
                class="pl-1 pt-1"
                outlined
                dense
                color="primary"
                background-color="white"
                clearable
                v-model="amount"
                label="40,0000"
              >
              </v-text-field>
              <p style="color: #2f80ed" class="mt-0">
                Total Overdue Amount: ₹40500
              </p>
              <h4 style="color: #2f80ed" class="pl-0 mt-3">Remarks</h4>
              <v-textarea
                class="pt-2 pl-1"
                outlined
                dense
                color="primary"
                background-color="white"
                clearable
                v-model="remark"
                label="Remarks.."
                rows="3"
              ></v-textarea>
              <div class="btn">
                <v-btn
                  class="mx-4 primary"
                  color="white"
                  outlined
                  rounded
                  @click="submit"
                  >Submit</v-btn
                >
              </div>
              <div class="image">
                <v-img src="@/assets/profits1.svg" width="95" height="86">
                </v-img>
              </div>
            </v-card-text>
          </v-container> 
                </v-col> -->
      <v-card-text>
        <h3 style="color: #2f80ed" class="pl-2 pt-0 mt-0">Charge History</h3>
      </v-card-text>
      <br />
      <div>
        <v-data-table
          :headers="headers"
          :items="items_list"
          hide-default-footer
        >
          <template v-slot:[`item.time`]="{ item }">
            <div>{{ item.time }}</div>
            <div>{{ item.date }}</div>
          </template>
          <template v-slot:[`item.status`]="{ item }">
            <div>{{ item.status }}</div>
            <v-chip text-color="#9759D6" color="#B290FA33"> initiated</v-chip>
            <!-- <div>{{item.status}}</div>
                <v-chip text-color="#4A8C4F" color="#4A8C4F33">
                Success</v-chip>
                <div>{{item.status}}</div>
                <v-chip text-color="#D7443E" color="#FFB1AC4D">
                Failed</v-chip>  -->
          </template>
        </v-data-table>
      </div>
    </v-card>
  </div>
</template>
<script>
// import ChargeNotice from './ChargeNotice.vue'
export default {
  name: "ChargeHistory",

  data() {
    return {
      amount: "",
      remark: "",
      headers: [
        {
          text: "Charged On",
          align: "start",
          filterable: false,
          value: "time",
          sortable: false,
          class: "table_header font-weight-medium",
        },
        {
          text: "Charged Amount",
          align: "left",
          filterable: false,
          value: "amount",
          sortable: false,
          class: "table_header font-weight-medium",
        },
        {
          text: "Payment Type",
          align: "left",
          filterable: false,
          value: "payment",
          sortable: false,
          class: "table_header font-weight-medium",
        },
        {
          text: "Payment Mode",
          align: "left",
          filterable: false,
          value: "mode",
          sortable: false,
          class: "table_header font-weight-medium",
        },
        {
          text: "Status",
          align: "center",
          sortable: false,
          value: "status",
          class: "table_header font-weight-medium ",
        },
        {
          text: "Failed Reason",
          align: "center",
          sortable: false,
          value: "reason",
          class: "table_header font-weight-medium",
        },
        {
          text: "Remark",
          align: "center",
          sortable: false,
          value: "remark",
          class: "table_header font-weight-medium",
        },
      ],
      items_list: [
        {
          time: "09:30 AM",
          date: "10 mar 2020",
          amount: "206894",
          payment: "installment",
          mode: "RZP-GATE-WAY",
          status: " ",
          reason: "-",
          remark: "-",
        },
        {
          time: "10:30 AM",
          date: "11 mar 2020",
          amount: "34000",
          payment: "Early Closer",
          mode: "RZP-ENACH",
          status: " ",
          reason: "-",
          remark: "-",
        },
        {
          time: "11:30 AM",
          date: "15 mar 2020",
          amount: "206894",
          payment: "Early closer",
          mode: "RZP-GATE-WAY",
          status: " ",
          reason: "-",
          remark: "-",
        },
      ],
    };
  },
  methods: {
    submit() {},
  },
};
</script>
<style scoped>
.header-info {
  color: #2f80ed;
}
.v-data-table-header > tr > th {
  /* color: white !important; */
  font-size: 15px !important;
  font-weight: 600 !important;
}
.v-data-table-header > tr {
  height: 80px;
}

.tab-divider {
  border-right: 1px solid #d3d3d3;
}
.btn {
  display: flex;
  justify-content: end;
  align-items: center;
  padding-right: 0px;
}
</style>