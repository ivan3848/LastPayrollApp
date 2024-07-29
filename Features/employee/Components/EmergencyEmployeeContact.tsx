import { TABLE_NAME_RELATIONSHIP } from "@/constants/StatusTableName";
import GenericStatusDropDown from "@/Features/Shared/Components/GenericStatusDropDown";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "primereact/button";
import { InputMask } from "primereact/inputmask";
import { InputText } from "primereact/inputtext";
import { useForm } from "react-hook-form";
import employeeContactFormSchemas from "../Validations/EmployeeContactFormSchemas";
import { IEmployee } from "../Types/IEmployee";

interface Props {
    setContactInformation: (
        idStatusRelationship?: number,
        contactName?: string,
        contactNumber?: string
    ) => void;
    addEmployeeInformation: () => void;
    employee?: IEmployee;
}

const EmergencyEmployeeContact = ({
    setContactInformation,
    addEmployeeInformation,
    employee,
}: Props) => {
    const { addEntityFormSchema } = employeeContactFormSchemas();

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
        addEmployeeInformation();
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
                            isFocus={true}
                            idValueEdit={employee?.idStatusRelationship}
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
                            defaultValue={employee?.contactName}
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
                            defaultValue={employee?.contactNumber}
                            key={employee?.contactNumber}
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
                    iconPos="left"
                    label="Contratar"
                    type="submit"
                    className="p-button-primary"
                />
            </div>
        </form>
    );
};

export default EmergencyEmployeeContact;
