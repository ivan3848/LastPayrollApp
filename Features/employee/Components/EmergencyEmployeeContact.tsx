import { TABLE_NAME_RELATIONSHIP } from "@/constants/StatusTableName";
import GenericStatusDropDown from "@/Features/Shared/Components/GenericStatusDropDown";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "primereact/button";
import { InputMask } from "primereact/inputmask";
import { InputText } from "primereact/inputtext";
import { useForm } from "react-hook-form";
import employeeFormSchemas from "../Validations/EmployeeFormSchemas";

interface Props {
    setContactInformation: (
        idStatusRelationship?: number,
        contactName?: string,
        contactNumber?: string
    ) => void;
    addEmployeeInformation: () => void;
}

const EmergencyEmployeeContact = ({ setContactInformation, addEmployeeInformation }: Props) => {
    const { addEntityFormSchema } = employeeFormSchemas();

    const {
        handleSubmit,
        register,
        watch,
        setValue,
        formState: { errors },
    } = useForm<IEmployee>({
        resolver: zodResolver(addEntityFormSchema),
    });

    const onSubmit = (data: IEmployee) => {
        setContactInformation(
            data.idStatusRelationship,
            data.contactName,
            data.contactNumber
        );
        return;
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="col-12">
                <div className="p-fluid formgrid grid">
                    <div className="field col-12 md:col-6 lg:col-4">
                        <label htmlFor="idStatusRelationShip">
                            Tipo de relación
                        </label>
                        <GenericStatusDropDown
                            id="idStatusRelationship"
                            isValid={!!errors.idStatusRelationship}
                            tableName={TABLE_NAME_RELATIONSHIP}
                            setValue={setValue}
                            watch={watch}
                        />
                        {errors.idStatusRelationship && (
                            <small className="p-invalid text-red-500">
                                {errors.idStatusRelationship.message?.toString()}
                            </small>
                        )}
                    </div>
                    <div className="field col-12 md:col-6 lg:col-4">
                        <label htmlFor="contactName">Nombre Completo</label>
                        <InputText
                            id="contactName"
                            type="text"
                            {...register("contactName")}
                        />
                        {errors.contactName && (
                            <small className="p-invalid text-red-500">
                                {errors.contactName.message?.toString()}
                            </small>
                        )}
                    </div>
                    <div className="field col-12 md:col-6 lg:col-4">
                        <label htmlFor="contactNumber">
                            Número de contacto
                        </label>
                        <InputMask
                            {...register("contactNumber")}
                            mask="999-999-9999"
                            id="contactNumber"
                        />

                        {errors.contactNumber && (
                            <small className="p-invalid text-red-500">
                                {errors.contactNumber.message?.toString()}
                            </small>
                        )}
                    </div>
                </div>
            </div>
            <div className="flex justify-content-end">
                <Button
                    icon="pi pi-user-plus"
                    iconPos="right"
                    label="Contratar"
                    className="p-button-primary"
                    onClick={addEmployeeInformation}
                />
            </div>
        </form>
    );
};

export default EmergencyEmployeeContact;
