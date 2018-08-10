import React from "react";
import Field from "egov-ui-kit/utils/field";
import { DatePicker } from "components";

const changeDateToFormat = (date) => {
  console.log(date);
  const dateObj = new Date(date);
  let year = dateObj.getFullYear();
  let month = dateObj.getMonth() + 1;
  let dt = dateObj.getDate();
  dt = dt < 10 ? "0" + dt : dt;
  month = month < 10 ? "0" + month : month;
  return dt + "/" + month + "/" + year;
};

const CashInformation = ({ form, formKey, handleFieldChange }) => {
  const fields = form.fields || {};
  return (
    <div className="cash-info">
      <div className="name-paidby">
        <Field fieldKey="payerName" field={fields.payerName} handleFieldChange={handleFieldChange} />
        <Field fieldKey="paidBy" field={fields.paidBy} handleFieldChange={handleFieldChange} />
      </div>
      <div className="mobile-number">
        <div className="empty" />
        <Field fieldKey="payerMobile" field={fields.payerMobile} handleFieldChange={handleFieldChange} />
      </div>
    </div>
  );
};

const ChequeInformation = ({ form, formKey, handleFieldChange }) => {
  const fields = form.fields || {};
  return (
    <div className="cheque-info">
      <div className="no-name">
        <Field fieldKey="chequeNo" field={fields.chequeNo} handleFieldChange={handleFieldChange} />
        <Field fieldKey="BankName" field={fields.BankName} handleFieldChange={handleFieldChange} />
      </div>
      <div className="date-branchr">
        <DatePicker
          onChange={(first, object) => {
            let e = { target: { value: object } };
            handleFieldChange("chequeDate", changeDateToFormat(e.target.value));
          }}
          formatDate={(date) => changeDateToFormat(date)}
          {...fields.chequeDate}
        />
        <Field fieldKey="BankBranch" field={fields.BankBranch} handleFieldChange={handleFieldChange} />
      </div>
    </div>
  );
};

const ReceiptInformation = ({ form, formKey, handleFieldChange }) => {
  const fields = form.fields || {};
  return (
    <div className="receipt-info">
      <Field fieldKey="receiptNo" field={fields.receiptNo} handleFieldChange={handleFieldChange} />
      <Field fieldKey="receiptDate" field={fields.receiptDate} handleFieldChange={handleFieldChange} />
    </div>
  );
};

const DemandDraftInformation = ({ form, formKey, handleFieldChange }) => {
  const fields = form.fields || {};
  return (
    <div className="demand-info">
      <div className="no-name">
        <Field fieldKey="demandNo" field={fields.demandNo} handleFieldChange={handleFieldChange} />
        <Field fieldKey="BankName" field={fields.BankName} handleFieldChange={handleFieldChange} />
      </div>
      <div className="date-branchr">
        <DatePicker
          onChange={(first, object) => {
            let e = { target: { value: object } };
            handleFieldChange("chequeDate", changeDateToFormat(e.target.value));
          }}
          formatDate={(date) => changeDateToFormat(date)}
          {...fields.chequeDate}
        />
        <Field fieldKey="BankBranch" field={fields.BankBranch} handleFieldChange={handleFieldChange} />
      </div>
    </div>
  );
};

const CardInformation = ({ form, formKey, handleFieldChange }) => {
  const fields = form.fields || {};
  return (
    <div className="card-info">
      <div className="card-no">
        <Field fieldKey="cardDigits" field={fields.cardDigits} handleFieldChange={handleFieldChange} />
        <Field fieldKey="receiptNo" field={fields.receiptNo} handleFieldChange={handleFieldChange} />
      </div>
      <div className="receipt">
        <div className="empty" />
        <Field fieldKey="confirmReceiptNo" field={fields.confirmReceiptNo} handleFieldChange={handleFieldChange} />
      </div>
    </div>
  );
};

const PaymentModeInformation = ({ form, formKey, handleFieldChange }) => {
  const fields = form.fields || {};
  return (
    <div className="payment-mode-info">
      <Field fieldKey="mode" field={fields.mode} handleFieldChange={handleFieldChange} />
    </div>
  );
};

export { CashInformation, ChequeInformation, DemandDraftInformation, ReceiptInformation, CardInformation, PaymentModeInformation };
