import { zodResolver } from "@hookform/resolvers/zod";
import { InputText } from "primereact/inputtext";
import { useForm } from "react-hook-form";
import { IPerson } from "../Types/IPerson";
import personFormSchemas from "../Validations/PersonFormSchemas";
import { InputMask } from "primereact/inputmask";
import { Calendar } from "primereact/calendar";
import GenericStatusDropDown from "@/Features/Shared/Components/GenericStatusDropDown";
import {
    TABLE_NAME_GENDER,
    TABLE_NAME_MARITAL,
} from "@/constants/StatusTableName";
import GenericDropDown from "@/Features/Shared/Components/GenericDropDown";
import useNationalityQuery from "@/Features/nationality/Hooks/useNationalityQuery";
import useEducationQuery from "@/Features/education/Hooks/useEducationQuery";
import { Button } from "primereact/button";

interface Props {
    setPerson: (value: IPerson) => void;
    setStep: (value: number) => void;
}

const AddPerson = ({ setPerson, setStep }: Props) => {
    const { addEntityFormSchema } = personFormSchemas();

    const {
        handleSubmit,
        register,
        reset,
        watch,
        setValue,
        formState: { errors },
    } = useForm<IPerson>({
        resolver: zodResolver(addEntityFormSchema),
    });

    const onSubmit = (data: IPerson) => {
        console.log(data);
        setPerson(data);
        setStep(1);
        return;
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="col-12">
                <div className="p-fluid formgrid grid">
                    <div className="field col-12 md:col-6 lg:col-4">
                        <label htmlFor="identification">Identificación</label>
                        <InputMask
                            {...register("identification")}
                            mask="999-9999999-9"
                            id="identification"
                            autoFocus
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
                        />
                        {errors.middleName && (
                            <small className="p-invalid text-red-500">
                                {errors.middleName.message?.toString()}
                            </small>
                        )}
                    </div>
                    <div className="field col-12 md:col-6 lg:col-4">
                        <label htmlFor="firstLastName">Primer Apellido</label>
                        <InputText
                            id="firstLastName"
                            type="text"
                            {...register("firstLastName")}
                        />
                        {errors.firstLastName && (
                            <small className="p-invalid text-red-500">
                                {errors.firstLastName.message?.toString()}
                            </small>
                        )}
                    </div>
                    <div className="field col-12 md:col-6 lg:col-4">
                        <label htmlFor="secondLastName">Segundo Apellido</label>
                        <InputText
                            id="secondLastName"
                            type="text"
                            {...register("secondLastName")}
                        />
                        {errors.secondLastName && (
                            <small className="p-invalid text-red-500">
                                {errors.secondLastName.message?.toString()}
                            </small>
                        )}
                    </div>
                    <div className="field col-12 md:col-6 lg:col-4">
                        <label htmlFor="birthDate">Fecha De Nacimiento</label>

                        <Calendar
                            id="birthDate"
                            value={watch("birthDate")}
                            onChange={(e) => setValue("birthDate", e.value!)}
                            showIcon
                        />
                        {errors.birthDate && (
                            <small className="p-invalid text-red-500">
                                {errors.birthDate.message?.toString()}
                            </small>
                        )}
                    </div>
                    <div className="field col-12 md:col-6 lg:col-4">
                        <label htmlFor="phoneNumber">Teléfono</label>
                        <InputMask
                            {...register("phoneNumber")}
                            mask="999-999-9999"
                            id="phoneNumber"
                        />

                        {errors.phoneNumber && (
                            <small className="p-invalid text-red-500">
                                {errors.phoneNumber.message?.toString()}
                            </small>
                        )}
                    </div>
                    <div className="field col-12 md:col-6 lg:col-4">
                        <label htmlFor="cellphoneNumber">Celular</label>
                        <InputMask
                            {...register("cellphoneNumber")}
                            mask="999-999-9999"
                            id="cellphoneNumber"
                        />

                        {errors.cellphoneNumber && (
                            <small className="p-invalid text-red-500">
                                {errors.cellphoneNumber.message?.toString()}
                            </small>
                        )}
                    </div>
                    <div className="field col-12 md:col-6 lg:col-4">
                        <label htmlFor="email">Correo</label>
                        <InputText
                            id="email"
                            type="email"
                            {...register("email")}
                        />
                        {errors.email && (
                            <small className="p-invalid text-red-500">
                                {errors.email.message?.toString()}
                            </small>
                        )}
                    </div>
                    <div className="field col-12 md:col-6 lg:col-4">
                        <label htmlFor="address">Dirección</label>
                        <InputText
                            id="address"
                            type="text"
                            {...register("address")}
                        />
                        {errors.address && (
                            <small className="p-invalid text-red-500">
                                {errors.address.message?.toString()}
                            </small>
                        )}
                    </div>
                    <div className="field col-12 md:col-6 lg:col-4">
                        <label htmlFor="idGender">Género</label>
                        <GenericStatusDropDown
                            id="idGender"
                            isValid={!!errors.idGender}
                            setValue={setValue}
                            watch={watch}
                            tableName={TABLE_NAME_GENDER}
                        />
                        {errors.idGender && (
                            <small className="p-invalid text-red-500">
                                {errors.idGender.message?.toString()}
                            </small>
                        )}
                    </div>
                    <div className="field col-12 md:col-6 lg:col-4">
                        <label htmlFor="idNationality">Nacionalidad</label>
                        <GenericDropDown
                            id="idNationality"
                            isValid={!!errors.idNationality}
                            setValue={setValue}
                            watch={watch}
                            text="name"
                            useQuery={useNationalityQuery}
                        />
                        {errors.idNationality && (
                            <small className="p-invalid text-red-500">
                                {errors.idNationality.message?.toString()}
                            </small>
                        )}
                    </div>
                    <div className="field col-12 md:col-6 lg:col-4">
                        <label htmlFor="idEducation">Nivel Educativo</label>
                        <GenericDropDown
                            id="idEducation"
                            isValid={!!errors.idEducation}
                            setValue={setValue}
                            watch={watch}
                            text="name"
                            useQuery={useEducationQuery}
                        />
                        {errors.idEducation && (
                            <small className="p-invalid text-red-500">
                                {errors.idEducation.message?.toString()}
                            </small>
                        )}
                    </div>
                    <div className="field col-12 md:col-6 lg:col-4">
                        <label htmlFor="idStatusMarital">Estado Civil</label>
                        <GenericStatusDropDown
                            id="idStatusMarital"
                            isValid={!!errors.idStatusMarital}
                            setValue={setValue}
                            watch={watch}
                            tableName={TABLE_NAME_MARITAL}
                        />
                        {errors.idStatusMarital && (
                            <small className="p-invalid text-red-500">
                                {errors.idStatusMarital.message?.toString()}
                            </small>
                        )}
                    </div>
                </div>
            </div>
            <div className="flex justify-content-end">
                <Button
                    icon="pi pi-arrow-right"
                    iconPos="right"
                    // label="Siguiente"
                    className="p-button-primary"
                />
            </div>
        </form>
    );
};

export default AddPerson;