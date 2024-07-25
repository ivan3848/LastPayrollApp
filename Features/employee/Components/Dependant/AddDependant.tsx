import { zodResolver } from "@hookform/resolvers/zod";
import { InputText } from "primereact/inputtext";
import { useForm } from "react-hook-form";
import { InputMask } from "primereact/inputmask";
import { IPerson } from "@/Features/person/Types/IPerson";
import { Dialog } from "primereact/dialog";
import DialogFooterButtons from "@/Features/Shared/Components/DialogFooterButtons";
import { IDependant } from "./Types/IDependant";
import dependantFormSchema from "./Validation/DependantFormSchema";
import { Calendar } from "primereact/calendar";
import useAddEntityQuery from "@/Features/Shared/Hooks/useAddEntityQuery";
import dependantService from "./Services/dependantService";
import { IInsertDependant } from "./Types/IInsertDependant";
import GenericStatusDropDown from "@/Features/Shared/Components/GenericStatusDropDown";
import { TABLE_NAME_RELATIONSHIP } from "@/constants/StatusTableName";

interface Props {
    setAddEntityDialog: (value: boolean) => void;
    addEntityDialog: boolean;
    id: number;
    person?: IPerson;
    handleAdd: () => void;
    setSubmitted: (value: boolean) => void;
    toast: React.MutableRefObject<any>;
}

const AddDependant = ({
    setAddEntityDialog,
    addEntityDialog,
    id,
    toast,
    setSubmitted,
    person,
}: Props) => {
    const { addEntityFormSchema } = dependantFormSchema();

    const {
        handleSubmit,
        register,
        watch,
        reset,
        setValue,
        formState: { errors },
    } = useForm<IInsertDependant>({
        resolver: zodResolver(addEntityFormSchema),
    });

    const addEntity = useAddEntityQuery({
        toast,
        setAddEntityDialog,
        setSubmitted,
        reset,
        service: dependantService,
    });

    const onSubmit = (data: IDependant) => {
        data.idEmployee = id;
        data.person = { ...data };
        addEntity.mutate(data);
    };

    const hideDialog = () => {
        setAddEntityDialog(false);
    };
    return (
        <Dialog
            visible={addEntityDialog}
            style={{ width: "50vw" }}
            header="Agregar Dependiente"
            modal
            className="p-fluid"
            onHide={hideDialog}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="col-12">
                    <div className="p-fluid formgrid grid">
                        <div className="field col-12 md:col-6 lg:col-4">
                            <label htmlFor="identification">
                                Identificación
                            </label>
                            <InputMask
                                {...register("identification")}
                                mask="999-9999999-9"
                                id="identification"
                                autoFocus
                                defaultValue={person?.identification}
                            />
                            {errors.identification && (
                                <small className="p-invalid text-red-500">
                                    {errors.identification.message?.toString()}
                                </small>
                            )}
                        </div>
                        <div className="field col-12 md:col-6 lg:col-4">
                            <label htmlFor="firstName">Primer Nombre</label>
                            <InputText
                                id="firstName"
                                type="text"
                                {...register("firstName")}
                                defaultValue={person?.firstName}
                            />
                            {errors.firstName && (
                                <small className="p-invalid text-red-500">
                                    {errors.firstName.message?.toString()}
                                </small>
                            )}
                        </div>
                        <div className="field col-12 md:col-6 lg:col-4">
                            <label htmlFor="middleName">Segundo Nombre</label>
                            <InputText
                                id="middleName"
                                type="text"
                                {...register("middleName")}
                                defaultValue={person?.middleName}
                            />
                            {errors.middleName && (
                                <small className="p-invalid text-red-500">
                                    {errors.middleName.message?.toString()}
                                </small>
                            )}
                        </div>
                        <div className="field col-12 md:col-6 lg:col-4">
                            <label htmlFor="firstLastName">
                                Primer Apellido
                            </label>
                            <InputText
                                id="firstLastName"
                                type="text"
                                {...register("firstLastName")}
                                defaultValue={person?.firstLastName}
                            />
                            {errors.firstLastName && (
                                <small className="p-invalid text-red-500">
                                    {errors.firstLastName.message?.toString()}
                                </small>
                            )}
                        </div>
                        <div className="field col-12 md:col-6 lg:col-4">
                            <label htmlFor="secondLastName">
                                Segundo Apellido
                            </label>
                            <InputText
                                id="secondLastName"
                                type="text"
                                {...register("secondLastName")}
                                defaultValue={person?.secondLastName}
                            />
                            {errors.secondLastName && (
                                <small className="p-invalid text-red-500">
                                    {errors.secondLastName.message?.toString()}
                                </small>
                            )}
                        </div>

                        <div className="field col-12 md:col-6 lg:col-4">
                            <label htmlFor="birthDate">
                                Fecha De Nacimiento
                            </label>
                            <Calendar
                                id="birthDate"
                                value={
                                    watch("birthDate") ??
                                    new Date().toDateString()
                                }
                                onChange={(e) =>
                                    setValue("birthDate", e.value!)
                                }
                                showIcon
                                showButtonBar
                            />
                            {errors.birthDate && (
                                <small className="p-invalid text-red-500">
                                    {errors.birthDate.message?.toString()}
                                </small>
                            )}
                        </div>

                        <div className="field col-12 md:col-6 lg:col-4">
                            <label
                                htmlFor="idStatusRelationship"
                                className="block mt-1"
                            >
                                Relación
                            </label>
                            <GenericStatusDropDown
                                id="idStatusRelationship"
                                isValid={!!errors.idStatusRelationship}
                                setValue={setValue}
                                watch={watch}
                                tableName={TABLE_NAME_RELATIONSHIP}
                            />
                            {errors.idStatusRelationship && (
                                <small className="text-red-600">
                                    {errors.idStatusRelationship.message?.toString()}
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

export default AddDependant;
