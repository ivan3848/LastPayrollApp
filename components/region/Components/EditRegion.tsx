import DialogFooterButtons from "@/components/Shared/Components/DialogFooterButtons";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import React from "react";
import { useForm } from "react-hook-form";
import useEditRegionQuery from "../Hooks/useEditRegionQuery";
import { IRegion } from "../Types/IRegion";
import regionFormSchemas from "../Validations/RegionFormSchemas";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { useParamAllData } from "@/components/Shared/Hooks/useParamFilter";
import useCountryQuery from "@/components/country/Hooks/useCountryQuery";

interface Props {
    entity: IRegion;
    editEntityDialog: boolean;
    setEditEntityDialog: (value: boolean) => void;
    setSubmitted: (value: boolean) => void;
    toast: React.MutableRefObject<any>;
}

const EditRegion = ({
    entity,
    editEntityDialog,
    setEditEntityDialog,
    setSubmitted,
    toast,
}: Props) => {
    const { editEntityFormSchema } = regionFormSchemas();

    const {
        handleSubmit,
        register,
        reset,
        watch,
        setValue,
        formState: { errors },
    } = useForm<IRegion>({
        resolver: zodResolver(editEntityFormSchema),
    });

    const { params } = useParamAllData();
    const { data } = useCountryQuery(params, []);

    const editEntity = useEditRegionQuery({
        toast,
        setEditEntityDialog,
        setSubmitted,
        reset,
    });

    const onSubmit = (data: IRegion) => {
        data.idRegion = entity.idRegion;
        editEntity.mutate(data);
        return;
    };

    const hideDialog = () => {
        setEditEntityDialog(false);
    };

    const setDropdownValues = () => {
        setValue("idCountry", entity.idCountry);
    };

    return (
        <Dialog
            visible={editEntityDialog}
            style={{ width: "450px" }}
            header="Editar País"
            modal
            className="p-fluid"
            onHide={hideDialog}
            onShow={setDropdownValues}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="field">
                    <label htmlFor="name" className="w-full">
                        País
                    </label>
                    <InputText
                        {...register("name")}
                        id="name"
                        autoFocus
                        defaultValue={entity?.name}
                        className={classNames({
                            "p-invalid": errors.name,
                        })}
                    />
                    {errors.name && (
                        <small className="p-invalid text-danger">
                            {errors.name.message?.toString()}
                        </small>
                    )}
                </div>
                <div className="field">
                    <label htmlFor="idCountry" className="w-full">
                        País
                    </label>
                    <Dropdown
                        value={data.items.find(
                            (item) =>
                                item.idCountry ===
                                (watch("idCountry") ?? entity.idCountry)
                        )}
                        onChange={(e: DropdownChangeEvent) =>
                            setValue("idCountry", e.value.idCountry)
                        }
                        options={data.items}
                        optionLabel="name"
                        placeholder="Seleccione un país"
                        filter
                        className={classNames(
                            {
                                "p-invalid": errors.idCountry,
                            },
                            "w-full"
                        )}
                    />
                    {errors.idCountry && (
                        <small className="p-invalid text-danger">
                            {errors.idCountry.message?.toString()}
                        </small>
                    )}
                </div>
                <DialogFooterButtons hideDialog={hideDialog} />
            </form>
        </Dialog>
    );
};

export default EditRegion;
