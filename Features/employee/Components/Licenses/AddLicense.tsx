import { CONCEPT_TYPE_LICENSE } from "@/constants/conceptTypes";
import DialogFooterButtons from "@/Features/Shared/Components/DialogFooterButtons";
import GenericConceptDropDown from "@/Features/Shared/Components/GenericConceptDropDown";
import useAddEntityQuery from "@/Features/Shared/Hooks/useAddEntityQuery";
import { zodResolver } from "@hookform/resolvers/zod";
import { Calendar } from "primereact/calendar";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { SelectButton } from "primereact/selectbutton";
import { useForm } from "react-hook-form";
import { addLicenseService } from "./Services/licenseService";
import LicensesFormSchema from "./Validation/LicensesFormSchema";

interface Props {
    setAddEntityDialog: (value: boolean) => void;
    addEntityDialog: boolean;
    id: number;
    handleAdd: () => void;
    setSubmitted: (value: boolean) => void;
    toast: React.MutableRefObject<any>;
}

const AddLicense = ({
    setAddEntityDialog,
    addEntityDialog,
    id,
    toast,
    setSubmitted,
}: Props) => {
    const { addEntityFormSchema } = LicensesFormSchema();

    const {
        handleSubmit,
        watch,
        register,
        reset,
        setValue,
        formState: { errors },
    } = useForm<ILicenses>({
        resolver: zodResolver(addEntityFormSchema),
    });

    const addEntity = useAddEntityQuery({
        toast,
        setAddEntityDialog,
        setSubmitted,
        reset,
        service: addLicenseService,
    });

    const onSubmit = (data: ILicenses) => {
        data.idEmployee = id;
        data.idConcept = data.idConcept;
        data.doctorName = data.doctorName;
        data.doctorexequatur = data.doctorexequatur;
        data.description = data.description;
        data.start = data.start;
        data.end = data.end;
        data.isToPay = true;

        addEntity.mutate(data);
    };

    const hideDialog = () => {
        setAddEntityDialog(false);
    };


    let isToPay: string[] = ["Si", "No"];

    return (
        <Dialog
            visible={addEntityDialog}
            style={{ width: "50vw" }}
            header="Agregar Licencias"
            modal
            className="p-fluid"
            onHide={hideDialog}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="col-12">
                    <div className="p-fluid formgrid grid">
                        <div className="field col-12 md:col-6 lg:col-4">
                            <label htmlFor="idConcept">Concepto</label>
                            <GenericConceptDropDown
                                id={"idConcept"}
                                code={CONCEPT_TYPE_LICENSE}
                                isValid={!!errors.idConcept}
                                watch={watch}
                                setValue={setValue}
                            />
                            {errors.idConcept && (
                                <small className="p-invalid text-danger">
                                    {errors.idConcept.message?.toString()}
                                </small>
                            )}
                        </div>
                        <div className="field col-12 md:col-6 lg:col-4">
                            <label htmlFor="doctorName">Doctor</label>
                            <InputText
                                id="doctorName"
                                type="text"
                                {...register("doctorName")}
                            />
                            {errors.doctorName && (
                                <small className="p-invalid text-red-500">
                                    {errors.doctorName.message?.toString()}
                                </small>
                            )}
                        </div>
                        <div className="field col-12 md:col-6 lg:col-4">
                            <label htmlFor="doctorexequatur">Doctor Exequantur</label>
                            <InputText
                                id="doctorexequatur"
                                type="text"
                                {...register("doctorexequatur")}
                            />
                            {errors.doctorexequatur && (
                                <small className="p-invalid text-red-500">
                                    {errors.doctorexequatur.message?.toString()}
                                </small>
                            )}
                        </div>
                        <div className="field col-12 md:col-6 lg:col-4">
                            <label htmlFor="start">Fecha De incio</label>
                            <Calendar
                                id="start"
                                onChange={(e) => setValue("start", e.value!)}
                                showIcon
                                showButtonBar
                            />
                            {errors.start && (
                                <small className="p-invalid text-red-500">
                                    {errors.start.message?.toString()}
                                </small>
                            )}
                        </div>

                        <div className="field col-12 md:col-6 lg:col-4">
                            <label htmlFor="start">Fecha Final</label>
                            <Calendar
                                id="end"
                                onChange={(e) => setValue("end", e.value!)}
                                showIcon
                                showButtonBar
                            />
                            {errors.end && (
                                <small className="p-invalid text-red-500">
                                    {errors.end.message?.toString()}
                                </small>
                            )}
                        </div>
                        {/* <div className="field col-12 md:col-6 lg:col-4">
                            <label htmlFor="isToPay">Para pago</label>
                            <div>
                                <SelectButton
                                    {...register("isToPay")}
                                    value={watch("isToPay") ? "Si" : "No"}
                                    onChange={(e) => {
                                        setValue("isToPay", e.value === "Si" ? true : false);
                                    }}
                                    options={isToPay}
                                />
                            </div>
                        </div> */}
                        <div className="field col-12 md:col-12 lg:4">
                            <label htmlFor="description">Descripción</label>
                            <InputText
                                id="description"
                                type="text"
                                {...register("description")}
                            />
                            {errors.description && (
                                <small className="p-invalid text-red-500">
                                    {errors.description.message?.toString()}
                                </small>
                            )}
                        </div>
                    </div>
                </div>
                <DialogFooterButtons hideDialog={hideDialog} />
            </form>
        </Dialog>
    );
};

export default AddLicense;
