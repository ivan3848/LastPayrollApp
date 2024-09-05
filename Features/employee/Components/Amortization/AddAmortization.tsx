import DialogFooterButtons from "@/Features/Shared/Components/DialogFooterButtons";
import GenericDropDown from "@/Features/Shared/Components/GenericDropDown";
import GenericStatusDropDown from "@/Features/Shared/Components/GenericStatusDropDown";
import useAddEntityQuery from "@/Features/Shared/Hooks/useAddEntityQuery";
import useBankQuery from "@/Features/bank/Hooks/useBankQuery";
import { useConceptByStatusCodeQuery } from "@/Features/concept/Hooks/useConceptQuery";
import { TABLE_NAME_AMORTIZATION } from "@/constants/StatusTableName";
import { CONCEPT_TYPE_LEASE } from "@/constants/conceptTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { Calendar } from "primereact/calendar";
import { Dialog } from "primereact/dialog";
import { useForm } from "react-hook-form";
import { addAmortizationService } from "./Services/AmortizationService";
import AmortizationFormSchema from "./Validation/AmortizationFormSchema";
import { useEffect } from "react";
import AmortizationTable from "./AmortizationTable";
import useExpireSessionQuery from "@/Features/Shared/Hooks/useExpireSessionQuery";
import { CACHE_KEY_LEASE } from "@/constants/cacheKeys";

interface Props {
    setAddEntityDialog: (value: boolean) => void;
    addEntityDialog: boolean;
    id: number;
    handleAdd: () => void;
    setSubmitted: (value: boolean) => void;
    toast: React.MutableRefObject<any>;
    entity: IAmortization;
    submitted: boolean;
    handleEdit?: (entity: IAmortization) => void;
    handleDelete?: (entity: IAmortization) => void;
    setCustomAddDialog: (customAddDialog: boolean) => void;
    idConcept?: number;
}

const AddAmortization = ({
    setAddEntityDialog,
    addEntityDialog,
    id,
    toast,
    setSubmitted,
    entity,
    submitted,
    handleEdit,
    handleDelete,
    handleAdd,
    setCustomAddDialog,
    idConcept,
}: Props) => {
    const { addEntityFormSchema } = AmortizationFormSchema();
    const expireQuery = useExpireSessionQuery([CACHE_KEY_LEASE]);

    const {
        handleSubmit,
        watch,
        register,
        reset,
        setValue,
        formState: { errors },
    } = useForm<IAmortization>({
        resolver: zodResolver(addEntityFormSchema),
    });

    const addEntity = useAddEntityQuery({
        toast,
        setCustomAddDialog,
        setSubmitted,
        reset,
        service: addAmortizationService,
    });

    const onSubmit = (data: IAmortization) => {
        addEntity
            .mutateAsync({
                ...data,
                idLease: id,
                idConcept: idConcept!,
                isPaid: true,
                isToPay: true,
            })
            .then(() => {
                expireQuery();
            });
    };

    const hideDialog = () => {
        setCustomAddDialog(false);
    };

    useEffect(() => {
        if (entity) {
            Object.keys(entity).forEach((key) => {
                if (key === "payDate") {
                    setValue(
                        key as keyof IAmortization,
                        new Date(entity[key as keyof IAmortization] as Date)
                    );
                    return;
                }
                setValue(
                    key as keyof IAmortization,
                    entity[key as keyof IAmortization]
                );
            });
        }
    }, [entity, setCustomAddDialog]);

    return (
        <Dialog
            visible={addEntityDialog}
            style={{ width: "90vw" }}
            header="Agregar amortización"
            modal
            maximizable
            className="p-fluid"
            onHide={() => setCustomAddDialog(false)}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="col-12">
                    <div className="p-fluid formgrid grid">
                        <div className="field col-12 md:col-6">
                            <label htmlFor="idStatus" className="w-full">
                                Amortización
                            </label>
                            <GenericStatusDropDown
                                id="idStatus"
                                isValid={!!errors.idStatus}
                                setValue={setValue}
                                watch={watch}
                                isFocus={true}
                                tableName={TABLE_NAME_AMORTIZATION}
                            />
                            {errors.idStatus && (
                                <small className="p-invalid text-red-500">
                                    {errors.idStatus.message?.toString()}
                                </small>
                            )}
                        </div>
                        <div className="field col-12 md:col-6">
                            <label htmlFor="payDate">Fecha de pago</label>
                            <Calendar
                                id="payDate"
                                onChange={(e) => setValue("payDate", e.value!)}
                                showIcon
                                showButtonBar
                            />
                            {errors.payDate && (
                                <small className="p-invalid text-red-500">
                                    {errors.payDate.message?.toString()}
                                </small>
                            )}
                        </div>
                        <div className="field col-12 md:col-6">
                            <label htmlFor="amount">Cantidad</label>
                            <input
                                {...register("amount", {
                                    setValueAs: (value) => parseFloat(value),
                                })}
                                id="amount"
                                type="number"
                                min={0}
                                className="p-inputtext p-component"
                                placeholder="0.00"
                            />
                            {errors.amount && (
                                <small className="p-invalid text-red-500">
                                    {errors.amount.message?.toString()}
                                </small>
                            )}
                            <div />
                        </div>
                    </div>
                </div>
                <AmortizationTable
                    submitted={submitted}
                    handleAdd={handleAdd}
                    handleDelete={handleDelete}
                    handleEdit={handleEdit}
                    idLease={id}
                />
                <DialogFooterButtons hideDialog={hideDialog} />
            </form>
        </Dialog>
    );
};

export default AddAmortization;
