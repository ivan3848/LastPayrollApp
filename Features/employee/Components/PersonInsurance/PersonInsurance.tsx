import DeleteEntity from "@/Features/Shared/Components/DeleteEntity";
import TableSkeletonTemplate from "@/Features/Shared/Components/TableSkeletonTemplate";
import useCrudModals from "@/Features/Shared/Hooks/useCrudModals";
import { Toast } from "primereact/toast";
import { Suspense } from "react";
import { IEmployee } from "../../Types/IEmployee";
import AddPersonInsurance from "./AddPersonInsurance";
import EditPersonInsurance from "./EditPersonInsurance";
import PersonInsuranceTable from "./PersonInsuranceTable";

interface Props {
    employee: IEmployee;
}

const PersonInsurance = ({ employee }: Props) => {
    const {
        deleteEntityDialog,
        setDeleteEntityDialog,
        addEntityDialog,
        setAddEntityDialog,
        editEntityDialog,
        setEditEntityDialog,
        entity,
        setEntity,
        submitted,
        setSubmitted,
        toast,
    } = useCrudModals<IPersonInsurance>();

    const handleAdd = () => {
        setSubmitted(false);
        setAddEntityDialog(true);
    };

    const handleEdit = (entity: IPersonInsurance) => {
        setEntity(entity);
        setSubmitted(false);
        setEditEntityDialog(true);
    };

    const handleDelete = (entity: IPersonInsurance) => {
        setEntity(entity);
        setSubmitted(false);
        setDeleteEntityDialog(true);
    };

    const entityProperties = [
        "Numero De Cuenta",
        "Fecha de inicio",
        "Método de pago",
        "Fecha final",
    ];

    return (
        <div className="grid">
            <div className="w-full">
                <Toast ref={toast} />
                <Suspense
                    fallback={
                        <TableSkeletonTemplate items={entityProperties} />
                    }
                >
                    <PersonInsuranceTable
                        submitted={submitted}
                        handleAdd={handleAdd}
                        handleDelete={handleDelete}
                        handleEdit={handleEdit}
                        employee={employee}
                    />
                </Suspense>
                {/* {editEntityDialog && (
                    <EditPersonInsurance
                    // setEditEntityDialog={setEditEntityDialog}
                    // setSubmitted={setSubmitted}
                    // toast={toast}
                    // entity={entity!}
                    // editEntityDialog={editEntityDialog}
                    />
                )} */}
                {addEntityDialog && (
                    <AddPersonInsurance
                        addEntityDialog={addEntityDialog}
                        setAddEntityDialog={setAddEntityDialog}
                        setSubmitted={setSubmitted}
                        toast={toast}
                        id={employee.idEmployee ?? 0}
                    />
                )}

                {deleteEntityDialog && (
                    <DeleteEntity
                        id={entity?.IdPersonInsurance ?? 0}
                        endpoint="employee/bankEmployeeHistory"
                        deleteEntityDialog={deleteEntityDialog}
                        setDeleteEntityDialog={setDeleteEntityDialog}
                        setSubmitted={setSubmitted}
                        toast={toast}
                    />
                )}
            </div>
        </div>
    );
};

export default PersonInsurance;

{
    /* <div className="grid">
            <div className="col-12 mx-auto">
                <div className="card">
                    <form onSubmit={handleSubmit(onFormSubmit)}>
                        <h4 style={{ marginBottom: "30px" }}>Seguros</h4>
                        <div
                            className="p-fluid formgrid grid"
                            style={{
                                marginTop: "15px",
                                display: "flex",
                                justifyContent: "space-evenly",
                                width: "100%",
                            }}
                        >
                            <div className="field col-12 md:col-3">
                                <label htmlFor="idConcept" className="w-full">
                                    Seguro
                                </label>
                                <GenericConceptDropDown
                                    id="idConcept"
                                    isValid={!!errors.IdConcept}
                                    setValue={setValue}
                                    watch={watch}
                                    code={CONCEPT_TYPE_INSURANCE}
                                />
                                {errors.IdConcept && (
                                    <small className="p-invalid text-danger">
                                        {errors.IdConcept.message?.toString()}
                                    </small>
                                )}
                            </div>
                            <div className="field col-12 md:col-3">
                                <label htmlFor="idStatus" className="w-full">
                                    Dependientes
                                </label>
                                <GenericStatusDropDown
                                    id="IdCancelationType"
                                    isValid={!!errors.Amount}
                                    setValue={setValue}
                                    watch={watch}
                                    isFocus={true}
                                    tableName="SalaryNewsStatus"
                                />
                                {errors.Amount && (
                                    <small className="p-invalid text-danger">
                                        {errors.Amount.message?.toString()}
                                    </small>
                                )}
                            </div>
                            <div className="field col-12 md:col-3">
                                <label
                                    htmlFor="IdChangeManager"
                                    className="w-full"
                                >
                                    Descuento
                                </label>
                                <GenericInputNumber
                                    {...register("PercentDiscount")}
                                    id="PercentDiscount"
                                    isValid={!!errors.PercentDiscount}
                                    setValue={setValue}
                                    watch={watch}
                                />
                                {errors.PercentDiscount && (
                                    <small className="p-invalid text-danger">
                                        {errors.PercentDiscount.message?.toString()}
                                    </small>
                                )}
                            </div>
                        </div>
                        <div
                            className="p-fluid formgrid grid"
                            style={{
                                marginTop: "15px",
                                display: "flex",
                                justifyContent: "space-evenly",
                                width: "100%",
                            }}
                        >
                            <div className="field col-12 md:col-3">
                                <label
                                    htmlFor="IdChangeManager"
                                    className="w-full"
                                >
                                    Monto
                                </label>
                                <GenericInputNumber
                                    {...register("Amount")}
                                    id="Amount"
                                    isValid={!!errors.Amount}
                                    setValue={setValue}
                                    watch={watch}
                                />
                                {errors.Amount && (
                                    <small className="p-invalid text-danger">
                                        {errors.Amount.message?.toString()}
                                    </small>
                                )}
                            </div>
                            <div className="field col-12 md:col-3">
                                <label id="DateChange" htmlFor="DateChange">
                                    Fecha de inicio
                                </label>
                                <Calendar
                                    {...register("StartDate")}
                                    name="FiredDate"
                                    value={new Date()}
                                    showIcon
                                />
                            </div>
                            <div className="field col-12 md:col-3">
                                <label id="DateChange" htmlFor="DateChange">
                                    Fecha de inicio
                                </label>
                                <Calendar
                                    {...register("StartDate")}
                                    name="FiredDate"
                                    value={new Date()}
                                    showIcon
                                />
                            </div>
                        </div>
                        <DialogFooterButtons hideDialog={() => {}} />
                    </form>
                </div>
            </div>
        </div> */
}
