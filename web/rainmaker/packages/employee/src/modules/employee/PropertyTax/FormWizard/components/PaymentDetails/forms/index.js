import React from "react";
import Field from "egov-ui-kit/utils/field";
import { DatePicker } from "components";
import "./index.css";

const changeDateToFormat = (date) => {
  const dateObj = new Date(date);
  let year = dateObj.getFullYear();
  let month = dateObj.getMonth() + 1;
  let dt = dateObj.getDate();
  dt = dt < 10 ? "0" + dt : dt;
  month = month < 10 ? "0" + month : month;
  return dt + "-" + month + "-" + year;
};

const CashInformation = ({ form, formKey, handleFieldChange }) => {
  const fields = form.fields || {};
  return (
    <div className="clearfix">
      <div className="col-sm-12 general-form-cont-padding">
        <div className="col-sm-6 general-field-padding">
          <Field fieldKey="payerName" field={fields.payerName} handleFieldChange={handleFieldChange} />
        </div>
        <div className="col-sm-6 general-field-padding">
          <div style={{ height: 72, marginBottom: 14 }} />
        </div>
        <div className="col-sm-6 general-field-padding">
          <Field fieldKey="paidBy" field={fields.paidBy} handleFieldChange={handleFieldChange} />
        </div>
        <div className="col-sm-6 general-field-padding">
          <Field fieldKey="payerMobile" field={fields.payerMobile} handleFieldChange={handleFieldChange} />
        </div>
      </div>
    </div>
  );
};

const ChequeInformation = ({ form, formKey, handleFieldChange }) => {
  const fields = form.fields || {};
  return (
    <div className="clearfix">
      <div className="col-sm-12 general-form-cont-padding">
        <div className="col-sm-6 general-field-padding">
          <Field fieldKey="chequeNo" field={fields.chequeNo} handleFieldChange={handleFieldChange} />
        </div>
        <div className="col-sm-6 general-field-padding">
          <DatePicker
            onChange={(first, object) => {
              let e = { target: { value: object } };
              handleFieldChange("chequeDate", e.target.value);
            }}
            formatDate={(date) => changeDateToFormat(date)}
            {...fields.chequeDate}
          />
        </div>
        <div className="col-sm-6 general-field-padding">
          <Field fieldKey="BankName" field={fields.BankName} handleFieldChange={handleFieldChange} />
        </div>

        <div className="col-sm-6 general-field-padding">
          <Field fieldKey="BankBranch" field={fields.BankBranch} handleFieldChange={handleFieldChange} />
        </div>
      </div>
    </div>
  );
};

const ReceiptInformation = ({ form, formKey, handleFieldChange }) => {
  const fields = form.fields || {};
  return (
    <div className="clearfix">
      <div className="col-sm-12 general-form-cont-padding">
        <div className="col-sm-6 general-field-padding">
          <Field fieldKey="receiptNo" field={fields.receiptNo} handleFieldChange={handleFieldChange} />
        </div>
        <div className="col-sm-6 general-field-padding">
          <Field fieldKey="receiptDate" field={fields.receiptDate} handleFieldChange={handleFieldChange} />
        </div>
      </div>
    </div>
  );
};

const DemandDraftInformation = ({ form, formKey, handleFieldChange }) => {
  const fields = form.fields || {};
  return (
    <div className="clearfix">
      <div className="col-sm-12 general-form-cont-padding">
        <div className="col-sm-6 general-field-padding">
          <Field fieldKey="demandNo" field={fields.demandNo} handleFieldChange={handleFieldChange} />
        </div>
        <div className="col-sm-6 general-field-padding">
          <DatePicker
            onChange={(first, object) => {
              let e = { target: { value: object } };
              handleFieldChange("chequeDate", e.target.value);
            }}
            formatDate={(date) => changeDateToFormat(date)}
            {...fields.chequeDate}
          />
        </div>
        <div className="col-sm-6 general-field-padding">
          <Field fieldKey="BankName" field={fields.BankName} handleFieldChange={handleFieldChange} />
        </div>

        <div className="col-sm-6 general-field-padding">
          <Field fieldKey="BankBranch" field={fields.BankBranch} handleFieldChange={handleFieldChange} />
        </div>
      </div>
    </div>
  );
};

const CardInformation = ({ form, formKey, handleFieldChange }) => {
  const fields = form.fields || {};
  return (
    <div className="clearfix">
      <div className="col-sm-12 general-form-cont-padding">
        <div className="col-sm-6 general-field-padding">
          <Field fieldKey="cardDigits" field={fields.cardDigits} handleFieldChange={handleFieldChange} />
        </div>
        <div className="col-sm-6 general-field-padding">
          <div style={{ height: 72, marginBottom: 14 }} />
        </div>
        <div className="col-sm-6 general-field-padding">
          <Field fieldKey="receiptNo" field={fields.receiptNo} handleFieldChange={handleFieldChange} />
        </div>
        <div className="col-sm-6 general-field-padding">
          <Field fieldKey="confirmReceiptNo" field={fields.confirmReceiptNo} handleFieldChange={handleFieldChange} />
        </div>
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
