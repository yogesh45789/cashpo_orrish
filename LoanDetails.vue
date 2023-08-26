<template>
  <div>
    <v-form ref="loanValidation">
      <v-container fluid>
        <v-col cols="12" md="12" sm="12">
          <v-row class="pl-0 pt-4">
            <v-col cols="8" md="8" sm="10">
              <div class="field-name">Product Type</div>
              <v-select
                placeholder="Product Type"
                dense
                :items="productType"
                :rules="[$rules.required]"
                v-model="typeProduct"
                item-text="name"
                item-value="id"
                outlined
                background-color="#FFF"
              >
              </v-select>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="8" md="8" sm="12">
          <h3 style="color: #2f80ed" class="pb-3">Scheme Details</h3>
          <v-row class="pl-0 pt-4">
            <v-col cols="6" md="6" sm="4" class="py-0">
              <div class="field-name">Scheme Name</div>
              <v-text-field
                v-model="scheme.name"
                type="text"
                :rules="[$rules.required]"
                placeholder="Scheme Name"
                dense
                outlined
                background-color="#FFF"
                color="#2F80ED"
              >
              </v-text-field>
            </v-col>
            <v-col cols="6" md="6" sm="4" class="py-0">
              <div class="field-name">Loan Type</div>
              <v-select
                :items="loanType"
                v-model="scheme.typeLoan"
                :rules="[$rules.required]"
                item-text="name"
                item-value="id"
                placeholder="Loan Type"
                dense
                outlined
                background-color="#FFF"
              >
              </v-select>
            </v-col>
            <v-col cols="6" md="6" sm="4" class="py-0">
              <div class="field-name">Start Date</div>
              <v-menu
                ref="menu1"
                v-model="scheme.startMenu"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="scheme.startDate"
                    placeholder="Start Date"
                    append-icon="mdi-calendar"
                    :rules="[$rules.required]"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                    outlined
                    dense
                    background-color="#FFF"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="scheme.startDate" no-title scrollable>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="scheme.startMenu = false">
                    Cancel
                  </v-btn>
                  <v-btn text color="primary" @click="scheme.startMenu = false">
                    OK
                  </v-btn>
                </v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="6" md="6" sm="4" class="py-0">
              <div class="field-name">End Date</div>
              <v-menu
                ref="menu"
                v-model="scheme.endMenu"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="scheme.endDate"
                    placeholder="End Date"
                    :rules="[$rules.required]"
                    append-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                    outlined
                    dense
                    background-color="#FFF"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="scheme.endDate" no-title scrollable>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="scheme.endMenu = false">
                    Cancel
                  </v-btn>
                  <v-btn text color="primary" @click="scheme.endMenu = false">
                    OK
                  </v-btn>
                </v-date-picker>
              </v-menu>
            </v-col>

            <v-col class="pt-4">
              <div class="d-flex">
                <div class="pr-5">Interest Type:</div>
                <div class="pl-5">
                  <v-radio-group
                    v-model="scheme.interestType"
                    :rules="[$rules.required]"
                    row
                    class="py-0 mt-0"
                  >
                    <v-radio label="Fixed" value="Fixed" class="px-4"></v-radio>
                    <v-radio
                      label="Reducing (Written Down)"
                      value="Reducing"
                      class="px-4"
                    ></v-radio>
                  </v-radio-group>
                </div>
              </div>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" md="12">
          <v-row>
            <v-col cols="4" md="4" sm="4" class="py-0">
              <div class="field-name">Fixed Interest Rate</div>
              <v-text-field
                v-model="scheme.field_intr_rate"
                :rules="!minmaxIntRate ? [$rules.required] : []"
                :disabled="minmaxIntRate"
                type="number"
                placeholder="Interest Rate"
                dense
                outlined
                background-color="#FFF"
                color="primary"
              >
              </v-text-field>
            </v-col>
            <v-col cols="4" md="4" sm="4" class="py-0">
              <div class="field-name">Minimum Interest Rate (Optional)</div>
              <v-text-field
                v-model="scheme.min_intr_rate"
                :rules="!fixedIntRate ? [$rules.required] : []"
                type="number"
                :disabled="fixedIntRate"
                placeholder="Min Interest Rate"
                dense
                outlined
                background-color="#FFF"
                color="primary"
              >
              </v-text-field>
            </v-col>
            <v-col cols="4" md="4" sm="4" class="py-0">
              <div class="field-name">Maximum Interest Rate (Optional)</div>
              <v-text-field
                v-model="scheme.max_intr_rate"
                :rules="!fixedIntRate ? [$rules.required] : []"
                type="number"
                :disabled="fixedIntRate"
                placeholder="Max Interest Rate"
                dense
                outlined
                background-color="#FFF"
                color="primary"
              >
              </v-text-field>
            </v-col>
            <v-col cols="4" md="4" sm="4" class="py-0">
              <div class="field-name">Fixed Amount</div>
              <v-text-field
                v-model="scheme.fixed_amount"
                :rules="!minmaxAmount ? [$rules.required] : []"
                type="number"
                :disabled="minmaxAmount"
                placeholder="Amount"
                dense
                outlined
                background-color="#FFF"
                color="primary"
              >
              </v-text-field>
            </v-col>
            <v-col cols="4" md="4" sm="4" class="py-0">
              <div class="field-name">Minimum Amount (Optional)</div>
              <v-text-field
                v-model="scheme.min_amount"
                :rules="!fixedAmount ? [$rules.required] : []"
                type="number"
                :disabled="fixedAmount"
                placeholder="Min Amount"
                dense
                outlined
                background-color="#FFF"
                color="primary"
              >
              </v-text-field>
            </v-col>
            <v-col cols="4" md="4" sm="4" class="py-0">
              <div class="field-name">Maximum Amount (Optional)</div>
              <v-text-field
                v-model="scheme.max_amount"
                :rules="!fixedAmount ? [$rules.required] : []"
                :disabled="fixedAmount"
                type="number"
                placeholder="Max Amount"
                dense
                outlined
                background-color="#FFF"
                color="primary"
              >
              </v-text-field>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="8" class="pt-5">
          <h3 style="color: #2f80ed" class="pb-3 mb-3">EMI Details</h3>
          <v-row>
            <v-col cols="2" md="3" class="py-0">
              <div>EMI Type</div>
            </v-col>
            <v-col cols="12" md="9" class="py-0">
              <v-radio-group
                v-model="emi_details.emi_type"
                row
                class="py-0 mt-0"
              >
                <v-radio
                  :disabled="scheme.interestType === 'Reducing'"
                  label="Only Interest EMI"
                  value="Only Interest EMI"
                  class="px-2"
                ></v-radio>
                <v-radio
                  label="Principal Plus EMI Interest"
                  value="Principal plus EMI interest"
                  class="px-2"
                ></v-radio>
              </v-radio-group>
            </v-col>
            <v-col cols="12" md="12" sm="12" class="py-0">
              <div>EMI Duration</div>
              <v-select
                placeholder="Half yearly"
                dense
                v-model="emi_details.emi_duration"
                :rules="[$rules.required]"
                :items="emiDuration"
                item-text="name"
                item-value="id"
                outlined
                background-color="#FFF"
              >
              </v-select>
            </v-col>
            <v-col cols="3" md="3" class="py-0">
              <div>Moratorium Period</div>
            </v-col>
            <v-col cols="12" md="9" class="py-0">
              <!-- {{ emi_details.moratorium }} -->
              <v-radio-group
                v-model="emi_details.moratorium"
                row
                class="py-0 mt-0"
              >
                <v-radio label="Yes" v-bind:value="true" class="px-4"></v-radio>
                <v-radio label="No" v-bind:value="false" class="px-4"></v-radio>
              </v-radio-group>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="8">
          <h3 style="color: #2f80ed" class="pb-3 mb-3">Processing Fee</h3>
          <v-row>
            <v-col cols="7" md="7" class="py-0">
              <div>Processing fees applicable (Inclusive of GST)</div>
            </v-col>
            <v-col cols="5" md="5" class="py-0">
              <v-radio-group
                v-model="processing_fees.processing"
                row
                class="py-0 mt-0"
              >
                <v-radio label="Yes" v-bind:value="true" class="px-4"></v-radio>
                <v-radio label="No" v-bind:value="false" class="px-4"></v-radio>
              </v-radio-group>
            </v-col>

            <v-col cols="6" md="6" sm="6" class="pt-5">
              <div class="field-name">Processing Fee (%)</div>
              <v-text-field
                v-model="processing_fees.processing_fee"
                :rules="[$rules.required]"
                type="number"
                placeholder="Enter Rate (%)"
                dense
                outlined
                background-color="#FFF"
                color="primary"
              >
              </v-text-field>
            </v-col>
            <v-col cols="6" md="6" sm="6">
              <div class="field-name">
                Minimum Processing Amount
                <v-tooltip right>
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon color="#989393" dark v-bind="attrs" v-on="on">
                      mdi-information-outline
                    </v-icon>
                  </template>
                  <span
                    >If the loan amount is less than or equal to 'Minimum Loan
                    Amount' <br />
                    then the 'Processing Fees (%)' will be applicable and if it
                    is more than <br />
                    'Minimum Loan Amount' then the proccessing fees will
                    applicable<br />
                    according to the slab below.</span
                  >
                </v-tooltip>
              </div>
              <v-text-field
                v-model="processing_fees.min_amount"
                :rules="[$rules.required]"
                type="number"
                placeholder="Enter Amount (%)"
                dense
                outlined
                background-color="#FFF"
                color="primary"
              >
              </v-text-field>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" md="12" class="py-2">
          <div class="font-weight-bold mb-4">Insurance Fee Slab</div>
          <v-row v-for="(items, i) in dynamic_processing" :key="i">
            <v-col cols="4" md="4" class="py-2">
              <v-text-field
                v-model="items.from_range"
                :rules="[$rules.required]"
                type="number"
                dense
                background-color="#FFF"
                color="primary"
                outlined
                placeholder="From (₹)"
                rounded
                filled
                class="rounded-r-0"
              ></v-text-field>
            </v-col>
            <v-col cols="4" md="4" class="py-2">
              <v-text-field
                v-model="items.to_range"
                :rules="[$rules.required]"
                type="number"
                placeholder="to (₹)"
                dense
                background-color="#FFF"
                color="primary"
                outlined
                rounded
                filled
                class="rounded-l-0"
              ></v-text-field>
            </v-col>
            <v-col cols="4" md="4" class="py-2 d-flex">
              <v-text-field
                v-model="items.processing_fee"
                :rules="[$rules.required]"
                type="number"
                placeholder="Enter Processing Fee (₹)"
                background-color="#FFF"
                color="primary"
                outlined
                dense
              ></v-text-field>
              <v-btn  v-if="dynamic_processing.length > 1" @click="remove_processing(i)" icon>
                <v-icon color="red">mdi-close-circle</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="11" md="12" class="pt-0 mb-4"
          ><v-btn @click="add_processing" rounded outlined color="primary">
            <v-icon color="primary">mdi-plus</v-icon> Add New
          </v-btn>
        </v-col>

        <v-col cols="8">
          <h3 style="color: #2f80ed" class="pb-3 mb-3">Insurance Fee</h3>
          <v-row>
            <v-col cols="7" md="7" class="py-0">
              <div>Loan Insurance Fee Applicable (Inclusive of GST)</div>
            </v-col>
            <v-col cols="5" md="5" class="py-0">
              <v-radio-group
                v-model="insurance_fees.processing"
                row
                class="py-0 mt-0"
              >
                <v-radio label="Yes" v-bind:value="true" class="px-4"></v-radio>
                <v-radio label="No" v-bind:value="false" class="px-4"></v-radio>
              </v-radio-group>
            </v-col>

            <v-col cols="6" md="6" sm="6" class="pt-5">
              <div class="field-name">Insurance Fee (%)</div>
              <v-text-field
                v-model="insurance_fees.processing_fee"
                :rules="[$rules.required]"
                type="number"
                placeholder="Enter Rate (%)"
                dense
                outlined
                background-color="#FFF"
                color="primary"
              >
              </v-text-field>
            </v-col>
            <v-col cols="6" md="6" sm="6">
              <div class="field-name">
                Minimum Insurance Fee
                <v-tooltip right>
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon color="#989393" dark v-bind="attrs" v-on="on">
                      mdi-information-outline
                    </v-icon>
                  </template>
                  <span
                    >If the loan amount is less than or equal to 'Minimum Loan
                    Amount' <br />
                    then the 'Processing Fees (%)' will be applicable and if it
                    is more than <br />
                    'Minimum Loan Amount' then the proccessing fees will
                    applicable<br />
                    according to the slab below.</span
                  >
                </v-tooltip>
              </div>
              <v-text-field
                v-model="insurance_fees.min_amount"
                :rules="[$rules.required]"
                type="number"
                placeholder="Enter Amount (%)"
                dense
                outlined
                background-color="#FFF"
                color="primary"
              >
              </v-text-field>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" md="12">
          <div class="font-weight-bold mb-4">Insurance Fee Slab</div>
          <v-row>
            <v-col>
              <!-- {{ dynamicfields }} -->
              <v-row v-for="(items, i) in dynamic_insurance" :key="i">
                <v-col cols="4" md="4" class="py-2">
                  <v-text-field
                    v-model="items.from_range"
                    :rules="[$rules.required]"
                    type="number"
                    dense
                    background-color="#FFF"
                    color="primary"
                    outlined
                    placeholder="From (₹)"
                    rounded
                    filled
                    class="rounded-r-0"
                  ></v-text-field>
                  <!-- {{ insuranceFee.from }} -->
                </v-col>
                <v-col cols="4" md="4" class="py-2">
                  <v-text-field
                    v-model="items.to_range"
                    :rules="[$rules.required]"
                    type="number"
                    placeholder="to (₹)"
                    dense
                    background-color="#FFF"
                    color="primary"
                    outlined
                    rounded
                    filled
                    class="rounded-l-0"
                  ></v-text-field>
                </v-col>
                <v-col cols="4" md="4" class="py-2 d-flex ">
                  <v-text-field
                    v-model="items.processing_fee"
                    :rules="[$rules.required]"
                    type="number"
                    placeholder="Enter Processing Fee (₹)"
                    dense
                    background-color="#FFF"
                    color="primary"
                    outlined
                  ></v-text-field>
                  <v-btn 
                   v-if=" dynamic_insurance.length > 1 " 
                    @click="remove_insurance(i)" icon>
                    <v-icon color="red">mdi-close-circle</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="12" md="12" class="pt-0 mb-4"
              ><v-btn @click="add_insurance" rounded outlined color="primary">
                <v-icon color="primary">mdi-plus</v-icon> Add New
              </v-btn>
            </v-col>
            <v-col cols="2" md="2" class="py-0">
              <div>Pre-EMI Applicable</div>
            </v-col>
            <v-col cols="5" md="5" class="py-0">
              <v-radio-group
                v-model="insurance_fees.pre_emi"
                row
                class="py-0 mt-0"
              >
                <v-radio label="Yes" v-bind:value="true" class="px-4"></v-radio>
                <v-radio label="No" v-bind:value="false" class="px-4"></v-radio>
              </v-radio-group>
            </v-col>
          </v-row>
        </v-col>

        <v-col cols="8" md="8" class="mt-3">
          <h3 style="color: #2f80ed" class="pb-3 mb-3">
            Charges
            <span class="font-weight-light">(Inclusive of GST)</span>
          </h3>
          <div class="font-weight-bold mt-7 mb-4">Bounce Charge</div>
          <v-row>
            <v-col cols="6" md="6" class="py-0">
              <div class="field-name">Charges Frequecny</div>
              <v-select
                v-model="charges.bounce.frequency"
                :rules="[$rules.required]"
                type="number"
                placeholder="Daily"
                dense
                :items="frequncyList"
                item-text="name"
                item-value="id"
                outlined
                background-color="#FFF"
              >
              </v-select>
            </v-col>
            <v-col cols="6" md="6" class="py-0">
              <div class="field-name">Grace Period</div>
              <v-text-field
                v-model="charges.bounce.grace_period"
                :rules="[$rules.required]"
                type="number"
                placeholder="Enter no. of days"
                dense
                background-color="#FFF"
                color="primary"
                outlined
              ></v-text-field>
            </v-col>
          </v-row>
        </v-col>

        <v-col cols="12" md="12">
          <v-row>
            <v-col cols="4" md="4" class="py-0">
              <div class="field-name">EMI (%) (i)</div>
              <v-text-field
                v-model="charges.bounce.emi"
                :rules="[$rules.required]"
                type="number"
                placeholder="Enter Rate (%)"
                dense
                background-color="#FFF"
                color="primary"
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="4" md="4" class="py-0">
              <div class="field-name">EMI Minimum (%)</div>
              <v-text-field
                v-model="charges.bounce.emi_min"
                :rules="[$rules.required]"
                type="number"
                placeholder="Enter Rate (%)"
                dense
                background-color="#FFF"
                color="primary"
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="4" md="4" class="py-0">
              <div class="field-name">EMI Maximum (%)</div>
              <v-text-field
                v-model="charges.bounce.emi_max"
                :rules="[$rules.required]"
                type="number"
                placeholder="Enter Rate (%)"
                dense
                background-color="#FFF"
                color="primary"
                outlined
              ></v-text-field>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" md="12">
          <div class="font-weight-bold mt-3 mb-4">Late Payment Charge</div>
          <v-row class="mt-3">
            <v-col cols="4" md="4" class="py-0">
              <div class="field-name">Charge Frequency</div>
              <v-select
                v-model="charges.late.frequency"
                :rules="[$rules.required]"
                placeholder="Daily"
                dense
                :items="frequncyList"
                item-text="name"
                item-value="id"
                outlined
                background-color="#FFF"
              >
              </v-select>
            </v-col>
            <v-col cols="4" md="4" class="py-0">
              <div class="field-name">Grace Period</div>
              <v-text-field
                v-model="charges.late.grace_period"
                :rules="[$rules.required]"
                type="number"
                placeholder="Enter no. of days"
                dense
                background-color="#FFF"
                color="primary"
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="4" md="4"></v-col>
            <v-col cols="4" md="4" class="py-0">
              <div class="field-name">EMI (%) (i)</div>
              <v-text-field
                v-model="charges.late.emi"
                :rules="[$rules.required]"
                type="number"
                placeholder="Enter Rate (%)"
                dense
                background-color="#FFF"
                color="primary"
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="4" md="4" class="py-0">
              <div class="field-name">EMI Minimum (%)</div>
              <v-text-field
                v-model="charges.late.emi_min"
                :rules="[$rules.required]"
                type="number"
                placeholder="Enter Rate (%)"
                dense
                background-color="#FFF"
                color="primary"
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="4" md="4" class="py-0">
              <div class="field-name">EMI Maximum (%)</div>
              <v-text-field
                v-model="charges.late.emi_max"
                :rules="[$rules.required]"
                type="number"
                placeholder="Enter Rate (%)"
                dense
                background-color="#FFF"
                color="primary"
                outlined
              ></v-text-field>
            </v-col>
          </v-row>
          <div class="font-weight-bold mt-7 mb-4">Overdue Charge</div>
          <v-row class="mt-3">
            <v-col cols="4" md="4" class="py-0">
              <div class="field-name">Charge Frequency</div>
              <v-select
                v-model="charges.overdue.frequency"
                :rules="[$rules.required]"
                placeholder="Daily"
                dense
                :items="frequncyList"
                item-text="name"
                item-value="id"
                outlined
                background-color="#FFF"
              >
              </v-select>
            </v-col>
            <v-col cols="4" md="4" class="py-0">
              <div class="field-name">Grace Period</div>
              <v-text-field
                v-model="charges.overdue.grace_period"
                :rules="[$rules.required]"
                type="number"
                placeholder="Enter no. of days"
                dense
                background-color="#FFF"
                color="primary"
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="4" md="4"></v-col>
            <v-col cols="4" md="4" class="py-0">
              <div class="field-name">EMI (%) (i)</div>
              <v-text-field
                v-model="charges.overdue.emi"
                :rules="[$rules.required]"
                type="number"
                placeholder="Enter Rate (%)"
                dense
                background-color="#FFF"
                color="primary"
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="4" md="4" class="py-0">
              <div class="field-name">EMI Minimum (%)</div>
              <v-text-field
                v-model="charges.overdue.emi_min"
                :rules="[$rules.required]"
                type="number"
                placeholder="Enter Rate (%)"
                dense
                background-color="#FFF"
                color="primary"
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="4" md="4" class="py-0">
              <div class="field-name">EMI Maximum (%)</div>
              <v-text-field
                v-model="charges.overdue.emi_max"
                :rules="[$rules.required]"
                type="number"
                placeholder="Enter Rate (%)"
                dense
                background-color="#FFF"
                color="primary"
                outlined
              ></v-text-field>
            </v-col>
          </v-row>
        </v-col>
        <v-spacer></v-spacer>
        <v-col class="d-flex justify-end">
          <v-btn
            :loading="loading"
            @click="submitForm"
            rounded
            class="white--text"
            color="primary"
            >Save</v-btn
          >
        </v-col>
      </v-container>
    </v-form>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "LoanDetails",
  data() {
    return {
      productType: [],
      typeProduct: "",
      loanType: [],
      emiDuration: [],
      frequncyList: [],
      loading: false,
      scheme: {
        name: "",
        typeLoan: "",
        startDate: null,
        formated_start_date: null,
        formated_end_date: null,
        startMenu: false,
        endDate: null,
        endMenu: false,
        interestType: "Fixed",
        field_intr_rate: null,
        max_intr_rate: null,
        min_intr_rate: null,
        fixed_amount: null,
        min_amount: null,
        max_amount: null,
      },
      emi_details: {
        emi_type: "Only Interest EMI",
        emi_duration: "",
        moratorium: true,
      },
      processing_fees: {
        processing: true,
        processing_fee: null,
        min_amount: null,
      },

      insurance_fees: {
        processing: true,
        pre_emi: true,
        processing_fee: null,
        min_amount: null,
      },

      dynamic_insurance: [
        {
          from_range: null,
          to_range: null,
          processing_fee: null,
        },
      ],
      dynamic_processing: [
        {
          from_range: null,
          to_range: null,
          processing_fee: null,
        },
      ],

      charges: {
        bounce: {
          frequency: null,
          grace_period: null,
          emi: null,
          emi_min: null,
          emi_max: null,
        },
        late: {
          frequency: null,
          grace_period: null,
          emi: null,
          emi_min: null,
          emi_max: null,
        },
        overdue: {
          frequency: null,
          grace_period: null,
          emi: null,
          emi_min: null,
          emi_max: null,
        },
      },
    };
  },

  computed: {
    fixedIntRate() {
      return this.scheme.field_intr_rate ? true : false;
    },
    minmaxIntRate() {
      return this.scheme.min_intr_rate || this.scheme.max_intr_rate
        ? true
        : false;
    },
    fixedAmount() {
      return this.scheme.fixed_amount ? true : false;
    },
    minmaxAmount() {
      return this.scheme.min_amount || this.scheme.max_amount ? true : false;
    },
  },
  watch: {
    "scheme.interestType": function () {
      this.scheme.interestType === "Reducing"
        ? (this.emi_details.emi_type = "Principal plus EMI interest")
        : (this.emi_details.emi_type = "Only Interest EMI");
    },

    "emi_details.moratorium": function () {
      this.emi_details.moratorium = false;
    },
  },

  methods: {
    // reducingEMI() {
    //   this.scheme.interestType === "Principal plus EMI interest"
    //     ? (this.emi_details.emi_type = "Min Interest Rate")
    //     : "";
    // },

    ...mapActions({
      showToast: "snackBar/snackBar",
    }),

    getProductType() {
      // let formData = {};
      // let look_up_key = "";

      const successHandler = (res) => {
        this.productType = res.data.result;
      };
      const failureHandler = () => {};

      return this.$Axios("get", this.$apiUrl.GET_PRODUCT_TYPE_LIST, {
        // params: formData,
        onSuccess: successHandler,
        onFailure: failureHandler,
        isTokenRequired: true,
      });

      // this.$Axios.request_GET(
      //   this.$apiUrl.GET_PRODUCT_TYPE_LIST,
      //   look_up_key,
      //   formData,
      //   {},
      //   successHandler,
      //   failureHandler,
      //   false,
      //   true
      // );
    },
    getLoanType() {
      // let formData = {};
      // let look_up_key = "";

      const successHandler = (res) => {
        this.loanType = res.data.result;
      };
      const failureHandler = () => {};

      return this.$Axios("get", this.$apiUrl.GET_LOAN_TYPE_LIST, {
        // params: formData,
        onSuccess: successHandler,
        onFailure: failureHandler,
        isTokenRequired: true,
      });

      // this.$Axios.request_GET(
      //   this.$apiUrl.GET_LOAN_TYPE_LIST,
      //   look_up_key,
      //   formData,
      //   {},
      //   successHandler,
      //   failureHandler,
      //   false,
      //   true
      // );
    },
    getEMIduration() {
      // let formData = {};
      // let look_up_key = "";

      const successHandler = (res) => {
        this.emiDuration = res.data.result;
      };
      const failureHandler = () => {};

      return this.$Axios("get", this.$apiUrl.GET_TIME_PERIOD_LIST, {
        // params: formData,
        onSuccess: successHandler,
        onFailure: failureHandler,
        isTokenRequired: true,
      });

      // this.$Axios.request_GET(
      //   this.$apiUrl.GET_TIME_PERIOD_LIST,
      //   look_up_key,
      //   formData,
      //   {},
      //   successHandler,
      //   failureHandler,
      //   false,
      //   true
      // );
    },

    getFrequencylist() {
      // let formData = {};
      // let look_up_key = "";

      const successHandler = (res) => {
        this.frequncyList = res.data.result;
      };
      const failureHandler = () => {};

      return this.$Axios("get", this.$apiUrl.GET_FREQUENCY_LIST, {
        // params: formData,
        onSuccess: successHandler,
        onFailure: failureHandler,
        isTokenRequired: true,
      });

      // this.$Axios.request_GET(
      //   this.$apiUrl.GET_FREQUENCY_LIST,
      //   look_up_key,
      //   formData,
      //   {},
      //   successHandler,
      //   failureHandler,
      //   false,
      //   true
      // );
    },
    add_insurance() {
      this.dynamic_insurance.push({
        from_range: null,
        to_range: null,
        processing_fee: null,
      });
    },
    remove_insurance(index) {
      this.dynamic_insurance.splice(index, 1);
    },

    add_processing() {
      this.dynamic_processing.push({
        from_range: null,
        to_range: null,
        processing_fee: null,
      });
    },

    remove_processing(index) {
      this.dynamic_processing.splice(index, 1);
    },

    getLoanDetails() {
      console.log(this.$route.name);
      if (this.$route.name === "loan-scheme-details") {
        // let formData = {};
        let look_up_key = this.$route.params.id;

        const successHandler = (res) => {
          // console.log(res.data.result, "DATA");
          let data = res.data.result;
          this.typeProduct = data.product_type;
          // scheme
          this.scheme.name = data.scheme_name;
          this.scheme.typeLoan = data.loan_type;
          this.scheme.startDate = data.start_date;
          this.scheme.endDate = data.end_date;
          this.scheme.interestType = data.interest_type;
          this.scheme.field_intr_rate = data.fixed_interest_rate;
          this.scheme.min_intr_rate = data.minimum_interest_rate;
          this.scheme.max_intr_rate = data.maximum_interest_rate;
          this.scheme.fixed_amount = data.fixed_amount;
          this.scheme.min_amount = data.minimum_amount;
          this.scheme.max_amount = data.maximum_amount;
          // emi details
          this.emi_details.emi_type = data.emi_type;
          this.emi_details.emi_duration = data.emi_duration;
          this.emi_details.moratorium = data.moratorium_period;
          // processing fees
          this.processing_fees.processing = data.processing_fee_applicable;
          this.processing_fees.processing_fee = data.processing_fee;
          this.processing_fees.min_amount = data.minimum_processing_fee;
          // insurance fee
          this.insurance_fees.processing = data.loan_insurance_fee_applicable;
          this.insurance_fees.processing_fee = data.insurance_fee;
          this.insurance_fees.min_amount = data.minimum_insurance_fee;
          this.insurance_fees.pre_emi = data.pre_emi_applicable;
          //  dynamic processing and insurance
          this.dynamic_insurance = data.loan_insurance_fee;
          this.dynamic_processing = data.loan_processing_fee;
          // CHARGES
          // bounce
          this.charges.bounce.frequency = data.bounce_charge_frequency;
          this.charges.bounce.grace_period = data.bounce_grace_period;
          this.charges.bounce.emi = data.bounce_emi_percent;
          this.charges.bounce.emi_min = data.bounce_emi_minimum_percent;
          this.charges.bounce.emi_max = data.bounce_emi_maximum_percent;
          // late
          this.charges.late.frequency = data.late_payment_charge_frequency;
          this.charges.late.grace_period = data.late_payment_grace_period;
          this.charges.late.emi = data.late_payment_percent;
          this.charges.late.emi_min = data.late_payment_emi_minimum_percent;
          this.charges.late.emi_max = data.late_payment_emi_maximum_percent;
          // overdue
          this.charges.overdue.frequency = data.overdue_charge_frequency;
          this.charges.overdue.grace_period = data.overdue_grace_period;
          this.charges.overdue.emi = data.overdue_emi_percent;
          this.charges.overdue.emi_min = data.overdue_emi_minimum_percent;
          this.charges.overdue.emi_max = data.overdue_emi_maximum_percent;
        };
        const failureHandler = () => {};

        return this.$Axios("get", this.$apiUrl.GET_LOAN_SCHEME_DETAILS, {
          // data: formData,
          onSuccess: successHandler,
          onFailure: failureHandler,
          lookUpKey: look_up_key,
          isTokenRequired: true,
        });

        // this.$Axios.request_GET(
        //   this.$apiUrl.GET_LOAN_SCHEME_DETAILS,
        //   look_up_key,
        //   formData,
        //   {},
        //   successHandler,
        //   failureHandler,
        //   false,
        //   true
        // );
      }
    },

    submitForm() {
      if (this.$refs.loanValidation.validate()) {
        this.loading = true;
        // console.log(this.$route.params.name);
        // let look_up_key = this.$route.params.id;
        let formData = {};
        let look_up_key = this.$route.params.id;
        // formData["product_type"] = this.typeProduct;
        //  scheme details
        formData["scheme_name"] = this.scheme.name;
        formData["start_date"] = this.formate_date(this.scheme.startDate);
        formData["end_date"] = this.formate_date(this.scheme.endDate);
        formData["interest_type"] = this.scheme.interestType;
        formData["fixed_interest_rate"] = this.scheme.field_intr_rate;
        formData["minimum_interest_rate"] = this.scheme.min_intr_rate;
        formData["maximum_interest_rate"] = this.scheme.max_intr_rate;
        formData["fixed_amount"] = this.scheme.fixed_amount;
        formData["minimum_amount"] = this.scheme.min_amount;
        formData["maximum_amount"] = this.scheme.max_amount;
        // emi details
        formData["emi_type"] = this.emi_details.emi_type; //send radio string format
        formData["moratorium_period"] = this.emi_details.moratorium;
        // processing fee
        formData["processing_fee_applicable"] = this.processing_fees.processing; //send boolean
        formData["processing_fee"] = this.processing_fees.processing_fee;
        formData["minimum_processing_fee"] = this.processing_fees.min_amount;
        // insurance fee
        formData["loan_insurance_fee_applicable"] =
          this.insurance_fees.processing; //send boolean
        formData["insurance_fee"] = this.insurance_fees.processing_fee;
        formData["minimum_insurance_fee"] = this.insurance_fees.min_amount;
        formData["pre_emi_applicable"] = this.insurance_fees.pre_emi; //boolean

        //  CHARGES
        // bounce
        formData["bounce_grace_period"] = this.charges.bounce.grace_period;
        formData["bounce_emi_percent"] = this.charges.bounce.emi;
        formData["bounce_emi_minimum_percent"] = this.charges.bounce.emi_min;
        formData["bounce_emi_maximum_percent"] = this.charges.bounce.emi_max;
        // late
        formData["late_payment_grace_period"] = this.charges.late.grace_period;
        formData["late_payment_percent"] = this.charges.late.emi;
        formData["late_payment_emi_minimum_percent"] =
          this.charges.late.emi_min;
        formData["late_payment_emi_maximum_percent"] =
          this.charges.late.emi_max;
        // overdue
        formData["overdue_grace_period"] = this.charges.overdue.grace_period;
        formData["overdue_emi_percent"] = this.charges.overdue.emi;
        formData["overdue_emi_minimum_percent"] = this.charges.overdue.emi_min;
        formData["overdue_emi_maximum_percent"] = this.charges.overdue.emi_max;

        const successHandler = () => {
          this.loading = false;
          this.$router.push({
            name: "loan-scheme",
          });
        };
        const failureHandler = () => {
          this.loading = false;
        };
        const finallyHandler = () => {
          this.loading = false;
        };

        if (this.$route.name === "add-loan-scheme") {
          formData["product_type"] = this.typeProduct;
          formData["loan_type"] = this.scheme.typeLoan;
          formData["emi_duration"] = this.emi_details.emi_duration;
          formData["overdue_charge_frequency"] = this.charges.overdue.frequency;
          formData["late_payment_charge_frequency"] =
            this.charges.late.frequency;
          formData["bounce_charge_frequency"] = this.charges.bounce.frequency;
          // dyanamic processing and insurance
          formData["loan_insurance_fee"] = this.dynamic_insurance;
          formData["loan_processing_fee"] = this.dynamic_processing;

          return this.$Axios("post", this.$apiUrl.ADD_LOANSCHEME_INFO, {
            data: formData,
            onSuccess: successHandler,
            onFailure: failureHandler,
            onFinally: finallyHandler,
            isTokenRequired: true,
          });
          // this.$Axios.request_POST(
          //   this.$apiUrl.ADD_LOANSCHEME_INFO,
          //   formData,
          //   {},
          //   successHandler,
          //   failureHandler,
          //   false,
          //   true
          // );
        } else if (this.$route.name === "loan-scheme-details") {
          formData["product_type"] = this.typeProduct.id;
          formData["loan_type"] = this.scheme.typeLoan.id;
          formData["emi_duration"] = this.emi_details.emi_duration.id;
          formData["overdue_charge_frequency"] =
            this.charges.overdue.frequency.id;
          formData["late_payment_charge_frequency"] =
            this.charges.late.frequency.id;
          formData["bounce_charge_frequency"] =
            this.charges.bounce.frequency.id;
          formData["loan_insurance_fee"] = this.dynamic_insurance;
          formData["loan_processing_fee"] = this.dynamic_processing;

          return this.$Axios("put", this.$apiUrl.PATCH_LOAN_SCHEME_DETAILS, {
            data: formData,
            onSuccess: successHandler,
            onFailure: failureHandler,
            onFinally: finallyHandler,
            lookUpKey: look_up_key,
            isTokenRequired: true,
          });
          // this.$Axios.request_PUT(
          //   this.$apiUrl.PATCH_LOAN_SCHEME_DETAILS,
          //   look_up_key,
          //   formData,
          //   {},
          //   successHandler,
          //   failureHandler,
          //   false,
          //   true
          // );
        }
      } else {
        this.showToast({
          message: "Please fill all the fields",
          color: "e",
        });
      }
    },
  },

  mounted() {
    this.getProductType();
    this.getLoanType();
    this.getEMIduration();
    this.getFrequencylist();
    this.getLoanDetails();
    // console.log(this.dynamicfields.push(this.temp_Insurance_Fee));
    // console.log(this.dynamicfields);
    // console.log(this.temp_Insurance_Fee);
  },
};
</script>

<style scoped>
h3 {
  font-size: 25px;
}
</style>

