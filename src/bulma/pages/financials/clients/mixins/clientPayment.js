export default {
    data: () => ({
        ready: true,
    }),
    computed: {
        type() {
            return this.ready && this.$refs.form.field('type').value;
        },
        usesAutoSerial() {
            return [
                this.enums.paymentTypes.Receipt,
                this.enums.paymentTypes.POSReceipt,
                this.enums.paymentTypes.CashRegisterReceipt
            ].includes(`${this.type}`);
        },
        hasNoSerial() {
            return this.enums.paymentTypes.Voucher === `${this.type}`;
        },
        isImmediatelyCollected() {
            return [
                this.enums.paymentTypes.PaymentOrder,
                this.enums.paymentTypes.Receipt,
                this.enums.paymentTypes.POSReceipt,
                this.enums.paymentTypes.CashRegisterReceipt,
                this.enums.paymentTypes.Voucher
            ].includes(`${this.type}`);
        },
    },
    methods: {
        updateIsCollected() {
            if (`${this.type}` === this.enums.paymentTypes.PromissoryNote) {
                this.$refs.form.field('is_collected').meta.hidden = false;

                return;
            }

            this.$refs.form.field('is_collected').value = false;
            this.$refs.form.field('is_collected').meta.hidden = true;
        },
        readonly(field, readonly) {
            this.$refs.form.field(field).meta.readonly = readonly;

            return this;
        },
        readonlyAndClear(field, readonly) {
            if (readonly) {
                this.readonly(field, readonly);
                this.$refs.form.field(field).value = null;

                return this;
            }

            this.readonly(field, readonly);

            return this;
        },
    }
}
