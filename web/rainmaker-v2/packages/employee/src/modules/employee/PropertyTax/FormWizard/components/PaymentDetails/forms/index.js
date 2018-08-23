import React from "react"
import Field from "egov-ui-kit/utils/field"

const CashInformation = ({ form, formKey, handleFieldChange }) => {
  const fields = form.fields || {};
  return (
    <div className="cash-info">
      <div className="name-paidby">
        <Field fieldKey="payerName" field={fields.payerName} handleFieldChange={handleFieldChange} />
        <Field fieldKey="paidBy" field={fields.paidBy} handleFieldChange={handleFieldChange} />
      </div>
      <div className="mobile-number">
        <div className="empty"></div>
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
      <Field fieldKey="chequeDate" field={fields.chequeDate} handleFieldChange={handleFieldChange} />
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
      <Field fieldKey="demandDate" field={fields.demandDate} handleFieldChange={handleFieldChange} />
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
      <div className="empty"></div>
      <Field fieldKey="confirmReceiptNo" field={fields.confirmReceiptNo} handleFieldChange={handleFieldChange} />
      </div>
    </div>
  );
}

export { CashInformation, ChequeInformation, DemandDraftInformation, ReceiptInformation, CardInformation }
