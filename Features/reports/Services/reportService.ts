import ApiService from "@/services/ApiService";
import { IPayrollPayExpenseForReport } from "../Types/IPayrollPayExpenseForReport";
import { IAccumulateForReport } from "../Types/IAccumulateForReport";
import { IBankPaymentForReport } from "../Types/IBankPaymentForReport";
import { ICheckPaymentForReport } from "../Types/ICheckPaymentForReport";
import { IEmployeeForReport } from "../Types/IEmployeeForReport";
import { IExtraHourForReport } from "../Types/IExtraHourForReport";
import { IEmployeeHistoryForReport } from "../Types/IEmployeeHistoryForReport";
import { IConceptForReport } from "../Types/IConceptForReport";
import { IVacationForReport } from "../Types/IVacationForReport";
import { ILicencesForReport } from "../Types/ILicencesForReport";
import { IPermitForReport } from "../Types/IPermitForReport";
import { IDepartmentForReport } from "../Types/IDepartmentForReport";
import { IPositionForReport } from "../Types/IPositionForReport";
import { IFiredEmployeeForReport } from "../Types/IFiredEmployeeForReport";
import { ILeaseForReport } from "../Types/ILeaseForReport";
import { IRetroactiveHoursForReport } from "../Types/IRetroactiveHoursForReport";
import { IProfitForReport } from "../Types/IProfitForReport";
import { IConsolidatedDataForReport } from "../Types/IConsolidatedDataForReport";
import { IBankRelationshipForReport } from "../Types/IBankRelationshipForReport";
import { IIncentiveForReport } from "../Types/IIncentiveForReport";
import { IInsuranceForReport } from "../Types/IInsuranceForReport";
import { ICostCenterForReport } from "../Types/ICostCenterForReport";
import { ITotalTaxForReport } from "../Types/ITotalTaxForReport";
import { IDependantForReport } from "../Types/IDependantForReport";
import { INetPayForReport } from "../Types/INetPayForReport";
import { IPlantPunchForReport } from "../Types/IPlantPunchForReport";
import { IDependantInsuranceForReport } from "../Types/IDependantInsuranceForReport";
import { ILatenessForReport } from "../Types/ILatenessForReport";
import { IPunchForReport } from "../Types/IPunchForReport";
import { ICostForReport } from "../Types/ICostForReport";

const payrollPayExpenseForReportService = new ApiService<IPayrollPayExpenseForReport[], IPayrollPayExpenseForReport>("employee/report/getAllPayrollPayExpense");
const accumulateForReportService = new ApiService<IAccumulateForReport[], IAccumulateForReport>("employee/report/getAllAccumulate");
const bankPaymentForReportService = new ApiService<IBankPaymentForReport[], IBankPaymentForReport>("employee/report/getAllBankPayment");
const checkPaymentForReportService = new ApiService<ICheckPaymentForReport[], ICheckPaymentForReport>("employee/report/getAllCheckPayment");
const employeeForReportService = new ApiService<IEmployeeForReport[], IEmployeeForReport>("employee/report/getAllEmployee");
const extrahourForReportService = new ApiService<IExtraHourForReport[], IExtraHourForReport>("employee/report/getAllExtraHour");
const employeeHistoryForReportService = new ApiService<IEmployeeHistoryForReport[], IEmployeeHistoryForReport>("employee/report/getAllEmployeeHistory");
const conceptForReportService = new ApiService<IConceptForReport[], IConceptForReport>("employee/report/getAllConcept");
const vacationForReportService = new ApiService<IVacationForReport[], IVacationForReport>("employee/report/getAllVacation");
const positionForReportService = new ApiService<IPositionForReport[], IPositionForReport>("employee/report/getAllPosition");
const departmentForReportService = new ApiService<IDepartmentForReport[], IDepartmentForReport>("employee/report/getAllDepartment");
const firedEmployeeForReportService = new ApiService<IFiredEmployeeForReport[], IFiredEmployeeForReport>("employee/report/getAllFiredEmployee");
const permitForReportService = new ApiService<IPermitForReport[], IPermitForReport>("employee/report/getAllPermit");
const licencesForReportService = new ApiService<ILicencesForReport[], ILicencesForReport>("employee/report/getAllLicences");
const leaseForReportService = new ApiService<ILeaseForReport[], ILeaseForReport>("employee/report/getAllLease");
const dependantForReportService = new ApiService<IDependantForReport[], IDependantForReport>("employee/report/getAllDependant");
const netPayForReportService = new ApiService<INetPayForReport[], INetPayForReport>("employee/report/getAllNetPay");
const totalTaxForReportService = new ApiService<ITotalTaxForReport[], ITotalTaxForReport>("employee/report/getAllTotalTax");
const costCenterForReportService = new ApiService<ICostCenterForReport[], ICostCenterForReport>("employee/report/getAllCostCenter");
const insuranceForReportService = new ApiService<IInsuranceForReport[], IInsuranceForReport>("employee/report/getAllInsurance");
const incentiveForReportService = new ApiService<IIncentiveForReport[], IIncentiveForReport>("employee/report/getAllIncentive");
const bankRelationshipForReportService = new ApiService<IBankRelationshipForReport[], IBankRelationshipForReport>("employee/report/getAllBankRelationship");
const consolidatedDataForReportService = new ApiService<IConsolidatedDataForReport[], IConsolidatedDataForReport>("employee/report/getAllConsolidatedData");
const profitForReportService = new ApiService<IProfitForReport[], IProfitForReport>("employee/report/getAllProfit");
const retroactiveHoursForReportService = new ApiService<IRetroactiveHoursForReport[], IRetroactiveHoursForReport>("employee/report/getAllRetroactiveHours");
const costForReportService = new ApiService<ICostForReport[], ICostForReport>("employee/report/getAllCost");
const punchForReportService = new ApiService<IPunchForReport[], IPunchForReport>("employee/report/getAllPunch");
const latenessForReportService = new ApiService<ILatenessForReport[], ILatenessForReport>("employee/report/getAllLateness");
const dependantInsuranceForReportService = new ApiService<IDependantInsuranceForReport[], IDependantInsuranceForReport>("employee/report/getAllDependantInsurance");
const plantPunchForReportService = new ApiService<IPlantPunchForReport[], IPlantPunchForReport>("employee/report/getAllPlantPunch");


export {
    payrollPayExpenseForReportService, accumulateForReportService, bankPaymentForReportService,
    checkPaymentForReportService, employeeForReportService, extrahourForReportService,
    employeeHistoryForReportService, conceptForReportService, vacationForReportService,
    positionForReportService, departmentForReportService, firedEmployeeForReportService,
    permitForReportService, licencesForReportService, leaseForReportService, dependantForReportService,
    netPayForReportService, totalTaxForReportService, costCenterForReportService, insuranceForReportService,
    incentiveForReportService, bankRelationshipForReportService, consolidatedDataForReportService, profitForReportService,
    retroactiveHoursForReportService, costForReportService, punchForReportService, latenessForReportService,
    dependantInsuranceForReportService, plantPunchForReportService
};