/**
 * Indian Payroll Calculation Engine
 * Rules based on user requirements:
 * Basic = 50% of CTC
 * HRA = 20% of CTC
 * PF = min(12% basic, 1800)
 * ESIC Employee = if gross < 21000 -> 0.75%
 * ESIC Employer = if gross < 21000 -> 3.25%
 * PT = simple slab (200 if gross > 15000)
 * TDS = simplified 10% after 7L exemption (new regime default)
 */

export interface PayrollInput {
  ctc: number;
}

export interface PayrollOutput {
  gross_salary: number;
  basic: number;
  hra: number;
  special_allowance: number;
  pf: number;
  esic_employee: number;
  esic_employer: number;
  pt: number;
  tds: number;
  net_salary: number;
}

export function calculatePayroll(input: PayrollInput): PayrollOutput {
  const monthlyCTC = input.ctc / 12;

  const basic = monthlyCTC * 0.50;
  const hra = monthlyCTC * 0.20;
  
  // Employer PF is part of CTC conceptually, but typically we consider gross first.
  // Simplifying based on standard gross logic:
  // Let's assume Gross = Basic + HRA + Special Allowance
  // Pf employer = min(12% basic, 1800)
  const pf_employer = Math.min(basic * 0.12, 1800);
  
  // Actually, standard is CTC = Gross + Employer PF + M/Insurance.
  // Let's deduce Special Allowance = monthlyCTC - Basic - HRA - Employer PF
  let special_allowance = monthlyCTC - basic - hra - pf_employer;
  if (special_allowance < 0) special_allowance = 0;

  const gross_salary = basic + hra + special_allowance;

  // Employee Deductions
  const pf = Math.min(basic * 0.12, 1800); // Employee share
  
  const esic_employee = gross_salary <= 21000 ? gross_salary * 0.0075 : 0;
  const esic_employer = gross_salary <= 21000 ? gross_salary * 0.0325 : 0;

  const pt = gross_salary >= 15000 ? 200 : 0;

  // Simple TDS calculation (New Regime, zero tax under 7L)
  const yearlyGross = gross_salary * 12;
  let yearlyTds = 0;
  if (yearlyGross > 700000) {
    // simplified 10% flat for demo
    yearlyTds = (yearlyGross - 700000) * 0.10;
  }
  const tds = yearlyTds / 12;

  const total_deductions = pf + esic_employee + pt + tds;
  const net_salary = gross_salary - total_deductions;

  return {
    gross_salary,
    basic,
    hra,
    special_allowance,
    pf,
    esic_employee,
    esic_employer,
    pt,
    tds,
    net_salary
  };
}
