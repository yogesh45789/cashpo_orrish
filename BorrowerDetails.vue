<template>
  <div>
    <v-col cols="12" md="12">
      <div class="container">
        <div class="box-field">
          <div>Lead</div>
          <div>PL-123</div>
        </div>
        <div class="box-field">
          <div>Name</div>
          <div>Sagar Patel</div>
        </div>
        <div class="box-field">
          <div>Contact</div>
          <div>9876544567</div>
        </div>
        <div class="box-field">
          <div>Email</div>
          <div>abc@abc.com</div>
        </div>
        <div class="box-field">
          <div>Scheme Name</div>
          <div>Regular</div>
        </div>
        <div class="box-field">
          <div>Product Type</div>
          <div>Personal Loan</div>
        </div>
        <div class="box-field">
          <div>Loan Type</div>
          <div>UnSecured Loan</div>
        </div>
        <div class="box-field">
          <div>Martial Status</div>
          <div>Single</div>
        </div>
        <div class="box-field">
          <div>Agreement Date</div>
          <div>22 Jul 2022</div>
        </div>
        <div class="box-field">
          <div>Sanctioned Amount</div>
          <div>5,00,000</div>
        </div>

        <div class="box-field">
          <div>Loan Applied Amount</div>
          <div>5ds</div>
        </div>
        <div class="box-field">
          <div>EMI Tenure</div>
          <div>36 Months</div>
        </div>
        <div class="box-field">
          <div>IRR (%)</div>
          <div>4%</div>
        </div>
        <div class="box-field">
          <div>Interest Rate</div>
          <div>12</div>
        </div>
        <div class="box-field">
          <div>No. of Installments</div>
          <div>36</div>
        </div>
        <div class="box-field">
          <div>Total Due</div>
          <div>24</div>
        </div>
        <div class="box-field">
          <div>EMI Date</div>
          <div>15th of Every Month</div>
        </div>
        <div class="box-field">
          <div>Loan Frequency No.</div>
          <div>1</div>
        </div>
        <div class="box-field">
          <div>Overdue as on Date</div>
          <div>₹ 3,00,436</div>
        </div>
        <div class="box-field">
          <div>Charges Dues</div>
          <div>2200</div>
        </div>
      </div>
    </v-col>
  </div>
</template>

<script>
export default {
  name: "BorrowerDetails",
};
</script>

<style scoped>
.container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
}
.box-field {
  border: 1px solid #d3d3d3;
  padding: 8px;
  /* font-size: 8px; */
  text-align: left;
}

div.box-field > div:nth-child(1) {
  font-size: 14px;
  color: #333333;
  opacity: 56%;
}
div.box-field > div:nth-child(2) {
  font-weight: 500;
  font-size: 16px;
  line-height: 28px;
}
</style>