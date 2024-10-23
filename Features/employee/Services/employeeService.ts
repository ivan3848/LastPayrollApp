import ApiService from "@/services/ApiService";
import { IEmployee } from "../Types/IEmployee";
import { IEmployeeChange } from "../Types/IEmployeeChange";
import { IEmployeeHistory } from "../Types/IEmployeeHistory";
import { IInsertEmployee } from "../Types/IInsertEmployee";
import IDGT4View from "@/Features/reports/Types/IDGT4View";
import { IDGT2View } from "@/Features/reports/Types/IDGT2View";
import IDGT5View from "@/Features/reports/Types/IDGT5View";
import IDGT3View from "@/Features/reports/Types/IDGT3View";
import IDGT12View from "@/Features/reports/Types/IDGT12View";
import { IBonusTemplate } from "@/Features/reports/Types/IBonusTemplate";
import { IRectifyTemplate } from "@/Features/reports/Types/IRectifyTemplate";
import { ITemplateForNewsFileView } from "@/Features/reports/Types/ITemplateForNewsFileView";

const employeeService = new ApiService<IEmployee, IEmployee>(
    "employee/employee/"
);

const addEmployeeService = new ApiService<IInsertEmployee, IInsertEmployee>(
    "employee/employee"
);

const employeeChangeService = new ApiService<IEmployeeChange, IEmployee>(
    "employee/employee/employeeChange"
);

const employeeHistory = new ApiService<IEmployee, IEmployeeHistory>(
    "employee/employeeHistory"
);

const deleteEmployeeService = new ApiService<IEmployee, IEmployee>(
    "employee/employee"
);

const reactivateEmployeeService = new ApiService<IEmployee, IEmployee>(
    "employee/employee/reactivateEmployee"
);

const getEmployeeForDGT4 = new ApiService<IDGT4View, IDGT4View>(
    "employee/employee/getEmployeeEntryByDatesDGT4"
);
const getEmployeeForDGT2 = new ApiService<IDGT2View, IDGT2View>(
    "employee/employee/getEmployeeForDGT2"
);
const getEmployeeForDGT5 = new ApiService<IDGT5View, IDGT5View>(
    "employee/employee/getEmployeeForDGT5"
);
const getEmployeeForDGT3 = new ApiService<IDGT3View, IDGT3View>(
    "employee/employee/getEmployeeForDGT3"
);
const getEmployeeForDGT12 = new ApiService<IDGT12View, IDGT12View>(
    "employee/employee/getEmployeeForDGT12"
);
const getTemplateForBonus = new ApiService<IBonusTemplate, IBonusTemplate>(
    "employee/employee/getTemplateForBonus"
);
const getTemplateForRectify = new ApiService<IRectifyTemplate, IRectifyTemplate>(
    "employee/employee/getTemplateForRectify"
);
const getTemplateForNewsFile = new ApiService<ITemplateForNewsFileView, ITemplateForNewsFileView>(
    "employee/employee/getTemplateForNewsFile"
);
const getTemplateForAutodetermination = new ApiService<IRectifyTemplate, IRectifyTemplate>(
    "employee/employee/getTemplateForAutodetermination"
);
const getTemplateForRawNewsFile = new ApiService<ITemplateForNewsFileView, ITemplateForNewsFileView>(
    "employee/employee/getTemplateForRawNewsFile"
);
const getTemplateForRawAutodetermination = new ApiService<ITemplateForNewsFileView, ITemplateForNewsFileView>(
    "employee/employee/getTemplateForRawAutodetermination"
);
const getTemplateForDGT = new ApiService("employee/employee/getTemplateForDGT");

export default employeeService;

export {
    employeeChangeService,
    employeeHistory,
    addEmployeeService,
    deleteEmployeeService,
    reactivateEmployeeService,
    getEmployeeForDGT4,
    getEmployeeForDGT2,
    getEmployeeForDGT5,
    getEmployeeForDGT3,
    getEmployeeForDGT12,
    getTemplateForBonus,
    getTemplateForRectify,
    getTemplateForNewsFile,
    getTemplateForAutodetermination,
    getTemplateForRawNewsFile,
    getTemplateForRawAutodetermination,
    getTemplateForDGT
};
