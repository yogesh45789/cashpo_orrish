<template>
  <div>
    <div class="detail-header table_header d-flex justify-space-between">
      <div><h2 class="ml-4">Loan Schedule</h2></div>
      <div class="d-flex justify-center">
        <v-btn @click="dialog.flag = true" class="mx-2" color="#2F80ED" outlined
          >Accept EMI</v-btn
        >
        <div class="mx-2">
          <v-menu bottom offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" outlined v-bind="attrs" v-on="on">
                Amendments <v-icon>mdi-chevron-down</v-icon>
              </v-btn>
            </template>

            <v-list>
              <v-list-item
                class="btn-items"
                v-for="(item, index) in items"
                 @click="getButton(item.title, index)"
                :key="index"
              >
              <div >
                <v-list-item-title >
                  {{ item.title }}</v-list-item-title
                >
              </div>

              </v-list-item>
            </v-list>
          </v-menu>
        </div>
          <div class="mx-2">
          <v-menu bottom offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" outlined v-bind="attrs" v-on="on">
                Settlement <v-icon>mdi-chevron-down</v-icon>
              </v-btn>
            </template>

            <v-list>
              <v-list-item
                class="btn-items"
                v-for="(item, index) in settle_items"
                 @click="getButton(item.title, index)"
                :key="index"
              >
              <div >
                <v-list-item-title >
                  {{ item.title }}</v-list-item-title
                >
              </div>

              </v-list-item>
            </v-list>
          </v-menu>
        </div>
        <!-- <v-btn class="mx-2" color="#2F80ED" outlined>Settlement</v-btn> -->
        <v-btn class="mx-2" color="#2F80ED" outlined>Update NACH Details</v-btn>
      </div>
    </div>
    <v-card>
      <v-data-table
        :headers="headers"
        :items="emi_details"
        :single-expand="singleExpand"
        :expanded.sync="expanded"
        item-key="name"
        show-expand
        class="elevation-1"
        hide-default-footer
      >
        <template v-slot:[`item.status`]="{ item }">
          <v-btn
            v-if="item.status === 'on_time'"
            rounded
            small
            outlined
            color="#27AE60"
            >On Time</v-btn
          >
          <v-btn
            v-if="item.status === 'pending'"
            rounded
            small
            outlined
            color="#F18324"
            >On Pending</v-btn
          >
        </template>

        <template v-slot:expanded-item="{ headers, item }">
          <td  class="px-0" :colspan="headers.length"><table class="border">
              <thead class="" >
                <th class="" v-for="header in sub_headers" :key="header.id">
                  <td>{{ header.text }}</td>
                </th>
              </thead>
              <tbody v-for="payment in item.evaluated_emi" :key="payment.id">
                <tr class="payment-row">
                  <td>{{ payment.id }}</td>
                  <td>{{ payment.created }}</td>
                  <td>{{ payment.payment_type }}</td>
                  <td>{{ payment.payment_mode }}</td>
                  <td>{{ payment.payment_status }}</td>
                  <td>{{ payment.amount }}</td>
                  <td>{{ payment.bounce_reason }}</td>
                  <td>{{ payment.remark }}</td>

                </tr>
              </tbody>
            </table></td>
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
    <AcceptEmi :dialog_data="dialog" />
    <TenureAmmendment :tenure_data="tenure_dialog" />
    <DateAmmendment :date_data="date_ammendment_dialog" />
    <AmmendmentHistory :ammendment="ammendment_history" />
    <WriteOff  :writeOff_data="write_off"/>
    <Closure :closure_data="closure_data" />
  </div>
</template>

<script>
import AcceptEmi from "@/components/lms/Dialog/AcceptEmi.vue";
import TenureAmmendment from "@/components/lms/Dialog/TenureAmmendment.vue";
import DateAmmendment from "@/components/lms/Dialog/DateAmmendment.vue";
import AmmendmentHistory from "@/components/lms/Dialog/AmmendmentHistory.vue";
import WriteOff from "../Dialog/WriteOff.vue";
import Closure from "../Dialog/Closure.vue";
export default {
  components: {
    AcceptEmi,
    TenureAmmendment,
    DateAmmendment,
    AmmendmentHistory,
    WriteOff,
    Closure,
  },
  name: "LoanSchedule",
  data() {
    return {
      select: "",
      loading_text: "Loading please wait",
      table_loading: false,
      page: 1,
      length: 1,
      expanded: [],
      singleExpand: false,
      items: [
        // { title: "Tenure Amendment" },
        { title: "Date Amendment" },
        { title: "Amendment History" },
      ],
      settle_items: [{ title: "Write Off" }, { title: "Closure" }],
      dialog: {
        flag: false,
      },
      tenure_dialog: {
        flag: false,
      },
      date_ammendment_dialog: {
        flag: false,
      },
      ammendment_history: {
        flag: false,
      },
      write_off: {
        flag: false,
      },
      closure_data: {
        flag: false,
      },
      headers: [
        {
          text: "S.N.",
          align: "start",
          filterable: false,
          value: "emi_no",
          sortable: false,
          class: "table_header2 font-weight-medium",
        },

        {
          text: "EMI Date",
          value: "emi_date",
          sortable: false,
          class: "table_header2 font-weight-medium",
        },
        {
          text: "Received Amount",
          value: "recievable_amt",
          align: "center",
          class: "table_header2 font-weight-medium",

          sortable: false,
        },
        {
          text: "Overdue Days",
          value: "overdue_days",
          align: "center",
          sortable: false,

          class: "table_header2 font-weight-medium",
        },
        {
          text: "Bounce Charge",
          value: "bounce_charge",
          sortable: false,
          align: "center",
          class: "table_header2 font-weight-medium",
        },
        {
          text: "Late Payment Charge",
          value: "late_payment_charge",
          sortable: false,
          align: "center",
          class: "table_header2 font-weight-medium",
        },
        {
          text: "Overdue Charge",
          value: "overdue_charge",
          sortable: false,
          align: "center",
          class: "table_header2 font-weight-medium",
        },
        {
          text: "Other Charges",
          value: "other_charges",
          sortable: false,
          align: "center",
          class: "table_header2 font-weight-medium",
        },
        {
          text: "Balance Amount",
          value: "balance_amt",
          sortable: false,
          align: "center",
          class: "table_header2 font-weight-medium",
        },
        {
          text: "Total Amount",
          value: "total_amt",
          sortable: false,
          align: "center",
          class: "table_header2 font-weight-medium",
        },
        {
          text: "Status",
          value: "status",
          sortable: false,
          align: "center",
          class: "table_header2 font-weight-medium",
        },
        {
          text: "",
          value: "data-table-expand",
          align: "center",
          class: "table_header2 font-weight-medium",
        },
      ],
      sub_headers: [
        { text: "ID" },
        { text: "Created On" },
        { text: "Payment Type" },
        { text: "Payment Mode" },
        { text: "Payment Status" },
        { text: "Amount" },
        { text: "Bounce Reason" },
        { text: "Remark" },
      ],

      emi_details: [
        {
          name: "0",
          emi_no: "1",
          emi_date: "04 Mar 2022",
          recievable_amt: "10,00,000",
          overdue_days: "0",
          bounce_charge: "0",
          late_payment_charge: "0",
          overdue_charge: "0",
          other_charges: "0",
          balance_amt: "0",
          total_amt: "10,00,000",
          status: "on_time",
          evaluated_emi: [
            {
              id: 1,
              created: "04 Mar 2022",
              payment_type: "Installment",
              payment_mode: "RZT-GATE-WAY",
              payment_status: "success",
              amount: "4000",
              bounce_reason: "0",
              remark: "0",
            },
            {
              id: 2,
              created: "04 Mar 2022",
              payment_type: "Installment",
              payment_mode: "RZT-GATE-WAY",
              payment_status: "success",
              amount: "4000",
              bounce_reason: "0",
              remark: "0",
            },
          ],
        },
        {
          name: "1",
          emi_no: "2",
          emi_date: "06 Mar 2022",
          recievable_amt: "10,0000",
          overdue_days: "0",
          bounce_charge: "0",
          late_payment_charge: "0",
          overdue_charge: "0",
          other_charges: "0",
          balance_amt: "0",
          total_amt: "10,,000",
          status: "pending",
          evaluated_emi: [
            {
              id: 1,
              created: "04 Mar 2022",
              payment_type: "Installment",
              payment_mode: "RZT-GATE-WAY",
              payment_status: "success",
              amount: "4000",
              bounce_reason: "0",
              remark: "0",
            },
            {
              id: 2,
              created: "04 Mar 2022",
              payment_type: "Installment",
              payment_mode: "RZT-GATE-WAY",
              payment_status: "success",
              amount: "4000",
              bounce_reason: "0",
              remark: "0",
            },
          ],
        },
      ],
    };
  },

  methods: {
    getButton(title, index) {
      console.log(title, " index ", index);
      // if (index == "Tenure Amendment") this.tenure_dialog.flag = true;
      if (title == "Date Amendment") this.date_ammendment_dialog.flag = true;
      if (title == "Amendment History") this.ammendment_history.flag = true;
      if (title == "Write Off") this.write_off.flag = true;
      if (title == "Closure") this.closure_data.flag = true;
    },
  },
};
</script>
<style lang="scss" scoped >
.detail-header {
  width: 100%;
  padding: 15px 0;
}

table.border {
  width: 100%;
  margin-left: 0px;
  margin-right: 0px;
  margin-top: 5px;
  thead {
    height: 50px;
    background-color: #cbe0ef;
    // border: 1px solid;
    // background-color: red;
    th {
      text-align: -webkit-center;
      td {
      }
    }
  }
  tbody {
    tr {
      td {
        height: 40px;
        background-color: #e5e7ef;
        text-align: center;
      }
    }
  }
}

.detail-header {
  /* width: 100%; */
  // padding: 15px 0;
}

.btn-items:hover {
  cursor: pointer;
  background-color: #cbe0ef;
  color: #2f80ed !important;
}
.payment-table {
  width: 100%;
  background-color: #e5e7ef;
}
table,
th,
td {
  border-collapse: collapse;
  // border: none;
}
</style>