<template>
  <div>
    <v-dialog
      v-model="dialog.flag"
      scrollable
      width="680"
      height="800"
      persistent
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-card-title
          class="text-h5 white--text primary d-flex justify-space-between"
        >
          Settlement for Write-off
          <v-btn @click="dialog.flag = false" icon
            ><v-icon color="white">mdi-close</v-icon></v-btn
          >
        </v-card-title>
        <v-card-text>
          <v-form ref="WriteOffValidate">
            <v-container fluid>
              <v-row class="py-0 mt-2 mb-1">
                <v-data-table
                  :headers="headers"
                  :items="items[0]"
                  hide-default-footer
                >
                  <template v-slot:[`item.write_off`]="{ item }">
                    <div>
                      <v-text-field
                        class="mt-4"
                        dense
                        outlined
                        placeholder="₹ 0.00"
                        v-model="item.write_off"
                      >
                      </v-text-field>
                    </div>
                  </template>
                </v-data-table>
                <v-row class="d-flex justify-end mt-3">
                  <v-col cols="12" class="py-0">
                    <div class="field-text">Receivable Amount</div>
                    <div>
                      <v-text-field
                        outlined
                        dense
                        placeholder="₹ 0.00"
                        v-model="wr_off"
                        id="my_input"
                      >
                      </v-text-field>
                    </div>
                  </v-col>
                  <!-- <v-col class="py-0" cols="12"> -->
                  <div class="mr-3">
                    <v-btn rounded color="primary" class="mt-5 white--text">
                      Settle
                    </v-btn>
                  </div>
                  <!-- </v-col> -->
                </v-row>
              </v-row>
            </v-container>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: ["writeOff_data"],
  data() {
    return {
      dialog: this.writeOff_data,
      wr_off: "200",
      headers: [
        {
          text: "Charges",
          value: "charges",
          align: "center",
          filterable: false,
          sortable: false,
          class: "table_header font-weight-medium",
        },
        {
          text: "Generated Amount",
          value: "generated_amount",
          align: "center",
          filterable: false,
          sortable: false,
          class: "table_header font-weight-medium",
        },
        {
          text: "Received Amount",
          value: "recieved_amount",
          align: "center",
          filterable: false,
          sortable: false,
          class: "table_header font-weight-medium",
        },
        {
          text: "Write-off",
          value: "write_off",
          align: "center",
          filterable: false,
          sortable: false,
          class: "table_header font-weight-medium",
        },
        {
          text: "Balance Amount",
          value: "balance_amount",
          align: "center",
          filterable: false,
          sortable: false,
          class: "table_header font-weight-medium",
        },
      ],
      headers2: [
        {
          text: "",
          value: "charges",
          align: "center",
          filterable: false,
          sortable: false,
          //   class: "table_header font-weight-medium",
        },
        {
          text: "",
          value: "generated_amount",
          align: "center",
          filterable: false,
          sortable: false,
          //   class: "table_header font-weight-medium",
        },
        {
          text: "",
          value: "recieved_amount",
          align: "center",
          filterable: false,
          sortable: false,
          //   class: "table_header font-weight-medium",
        },
        {
          text: "",
          value: "write_off",
          align: "center",
          filterable: false,
          sortable: false,
          //   class: "table_header font-weight-medium",
        },
        {
          text: "",
          value: "balance_amount",
          align: "center",
          filterable: false,
          sortable: false,
          //   class: "table_header font-weight-medium",
        },
      ],
      items: [
        [
          {
            charges: "Principal",
            generated_amount: "₹ 10000.00",
            recieved_amount: "₹ 6000.00",
            write_off: "4000.00",
            balance_amount: "₹ 0.00",
          },
          {
            charges: "Principal",
            generated_amount: "₹ 10000.00",
            recieved_amount: "₹ 6000.00",
            write_off: "4000.00",
            balance_amount: "₹ 0.00",
          },
        ],
        [
          {
            charges: "total",
            generated_amount: "₹ 16800.00",
            recieved_amount: "₹ 10000.00",
            write_off: "₹ 6000.00",
            balance_amount: "₹ 800.00",
          },
        ],
      ],
    };
  },
  computed: {},
  watch: {},
};
</script>
<style lang="scss" scoped>
.table {
  margin-left: 10px;
  tbody {
  }
}
</style>
<style >
#my_input {
  color: #27ae60 !important;
  font-weight: 500;
}
</style>