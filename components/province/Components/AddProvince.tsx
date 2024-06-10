import useCountryQuery from "@/Components/country/Hooks/useCountryQuery";
import DialogFooterButtons from "@/Components/Shared/Components/DialogFooterButtons";
import { useParamAllData } from "@/Components/Shared/Hooks/useParamFilter";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog } from "primereact/dialog";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import React from "react";
import { useForm } from "react-hook-form";
import useAddProvinceQuery from "../Hooks/useAddProvinceQuery";
import { IProvince } from "../Types/IProvince";
import provinceFormSchemas from "../Validations/ProvinceFormSchemas";
import useCityQuery from "@/Components/city/Hooks/useCityQuery";

interface Props {
    addEntityDialog: boolean;
    setAddEntityDialog: (value: boolean) => void;
    setSubmitted: (value: boolean) => void;
    toast: React.MutableRefObject<any>;
}

const AddProvince = ({
    addEntityDialog,
    setAddEntityDialog,
    setSubmitted,
    toast,
}: Props) => {
    const { addEntityFormSchema } = provinceFormSchemas();

    const {
        handleSubmit,
        register,
        reset,
        setValue,
        watch,
        formState: { errors },
    } = useForm<IProvince>({
        resolver: zodResolver(addEntityFormSchema),
    });

    const { params } = useParamAllData();
    const { data } = useCityQuery(params, []);

    const addEntity = useAddProvinceQuery({
        toast,
        setAddEntityDialog,
        setSubmitted,
        reset,
    });

    const onSubmit = (data: IProvince) => {
        addEntity.mutate(data);
        return;
    };

    const hideDialog = () => {
        setAddEntityDialog(false);
    };

    return (
        <Dialog
            visible={addEntityDialog}
            style={{ width: "450px" }}
            header="Agregar Provincia"
            modal
            className="p-fluid"
            onHide={hideDialog}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="field">
                    <label htmlFor="name" className="w-full">
                        Provincia
                    </label>
                    <InputText
                        {...register("name")}
                        id="name"
                        autoFocus
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
                    <label htmlFor="idCity" className="w-full">
                        Ciudad
                    </label>
                    <Dropdown
                        value={data.items.find(
                            (item) => item.idCity === watch("idCity")
                        )}
                        onChange={(e: DropdownChangeEvent) =>
                            setValue("idCity", e.value.idCity)
                        }
                        options={data.items}
                        optionLabel="name"
                        placeholder="Seleccione una opción..."
                        filter
                        className={classNames(
                            {
                                "p-invalid": errors.idCity,
                            },
                            "w-full"
                        )}
                    />
                    {errors.idCity && (
                        <small className="p-invalid text-danger">
                            {errors.idCity.message?.toString()}
                        </small>
                    )}
                </div>
                <DialogFooterButtons hideDialog={hideDialog} />
            </form>
        </Dialog>
    );
};

export default AddProvince;
