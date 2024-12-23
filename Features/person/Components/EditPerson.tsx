import GenericDropDown from "@/Features/Shared/Components/GenericDropDown";
import GenericStatusDropDown from "@/Features/Shared/Components/GenericStatusDropDown";
import useEducationQuery from "@/Features/education/Hooks/useEducationQuery";
import useNationalityQuery from "@/Features/nationality/Hooks/useNationalityQuery";
import {
    TABLE_NAME_GENDER,
    TABLE_NAME_MARITAL,
} from "@/constants/StatusTableName";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { InputMask } from "primereact/inputmask";
import { InputText } from "primereact/inputtext";
import { useForm } from "react-hook-form";
import { IPerson } from "../Types/IPerson";
import personFormSchemas from "../Validations/PersonFormSchemas";
import personService from "../Services/personService";
import useEditEntityQuery from "@/Features/Shared/Hooks/useEditEntityQuery";
import { useEffect } from "react";
import useZoneQuery from "@/Features/zone/Hooks/useZoneQuery";
import useOccupationQuery from "@/Features/occupation/Hooks/useOccupationQuery";

interface Props {
    person?: IPerson;
    toast: React.MutableRefObject<any>;
}

const EditPerson = ({ person, toast }: Props) => {
    const { editEntityFormSchema } = personFormSchemas();
    const {
        handleSubmit,
        register,
        watch,
        setValue,
        formState: { errors },
    } = useForm<IPerson>({
        resolver: zodResolver(editEntityFormSchema),
        defaultValues: person,
    });

    useEffect(() => {
        if (person) {
            Object.keys(person).forEach((key) => {
                if (key === "birthDate") {
                    person[key as keyof IPerson] &&
                        setValue(
                            key,
                            new Date(person[key as keyof IPerson] as Date)
                        );
                } else {
                    person[key as keyof IPerson] &&
                        setValue(
                            key as keyof IPerson,
                            person[key as keyof IPerson]
                        );
                }
            });
        }
    }, [person, setValue]);

    const editEntity = useEditEntityQuery({
        toast,
        service: personService,
    });

    const onSubmit = (data: IPerson) => {
        data.idPerson = person?.idPerson;
        editEntity.mutate(data);
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
                            defaultValue={person?.identification}
                            key={person?.identification}
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
                        <label htmlFor="firstLastName">Primer Apellido</label>
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
                        <label htmlFor="secondLastName">Segundo Apellido</label>
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
                        <label htmlFor="birthDate">Fecha De Nacimiento</label>

                        <Calendar
                            id="birthDate"
                            value={watch("birthDate") ?? person?.birthDate}
                            onChange={(e) => setValue("birthDate", e.value!)}
                            showIcon
                            showButtonBar
                            key={person?.birthDate?.toString()}
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
                            defaultValue={person?.phoneNumber}
                            key={person?.phoneNumber}
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
                            defaultValue={person?.cellphoneNumber}
                            key={person?.cellphoneNumber}
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
                            defaultValue={person?.email}
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
                            defaultValue={person?.address}
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
                            idValueEdit={person?.idGender}
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
                            idValueEdit={person?.idNationality}
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
                            idValueEdit={person?.idEducation}
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
                            idValueEdit={person?.idStatusMarital}
                        />
                        {errors.idStatusMarital && (
                            <small className="p-invalid text-red-500">
                                {errors.idStatusMarital.message?.toString()}
                            </small>
                        )}
                    </div>
                    <div className="field col-12 md:col-6 lg:col-4">
                        <label htmlFor="idZone" className="w-full">
                            Localidad
                        </label>
                        <GenericDropDown
                            id="idZone"
                            isValid={!!errors.idZone}
                            text="name"
                            idValueEdit={person?.idZone}
                            useQuery={useZoneQuery}
                            setValue={setValue}
                            watch={watch}
                        />
                        {errors.idZone && (
                            <small className="p-invalid text-red-500">
                                {errors.idZone.message?.toString()}
                            </small>
                        )}
                    </div>
                    <div className="field col-12 md:col-6 lg:col-4">
                        <label htmlFor="idOccupation" className="w-full">
                            Ocupación
                        </label>
                        <GenericDropDown
                            id="idOccupation"
                            isValid={!!errors.idOccupation}
                            text="name"
                            idValueEdit={person?.idOccupation}
                            useQuery={useOccupationQuery}
                            setValue={setValue}
                            watch={watch}
                        />
                        {errors.idOccupation && (
                            <small className="p-invalid text-red-500">
                                {errors.idOccupation.message?.toString()}
                            </small>
                        )}
                    </div>
                </div>
            </div>
            <div className="flex justify-content-end">
                <Button
                    icon="pi pi-save"
                    label="Guardar"
                    className="p-button-primary"
                />
            </div>
        </form>
    );
};

export default EditPerson;
