import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Dialog } from "primereact/dialog";
import DialogFooterButtons from "@/Features/Shared/Components/DialogFooterButtons";
import userFormSchema from "../Validation/userFormSchema";
import { IInsertUser } from "../Types/IInsertUser";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import GenericDropDown from "@/Features/Shared/Components/GenericDropDown";
import useRolQuery from "@/Features/rol/Hooks/useRolQuery";
import useAddUser from "../Hooks/useAddUser";

interface Props {
    addEntityDialog: boolean;
    id: number;
    setAddEntityDialog: (value: boolean) => void;
    setSubmitted: (value: boolean) => void;
    toast: React.MutableRefObject<any>;
}

const AddUser = ({
    setAddEntityDialog,
    addEntityDialog,
    id,
    toast,
    setSubmitted,
}: Props) => {
    const { addEntityFormSchema } = userFormSchema();
    const {
        handleSubmit,
        register,
        reset,
        setValue,
        watch,
        formState: { errors },
    } = useForm<IInsertUser>({
        resolver: zodResolver(addEntityFormSchema),
    });

    const addEntity = useAddUser({
        toast,
        setAddEntityDialog,
        setSubmitted,
        reset,
    });

    const onSubmit = (data: IInsertUser) => {
        data.idEmployee = id;
        addEntity.mutate(data);
    };

    const hideDialog = () => {
        setAddEntityDialog(false);
    };
    return (
        <Dialog
            visible={addEntityDialog}
            style={{ width: "55vw" }}
            header="Agregar Usuario"
            modal
            className="p-fluid"
            onHide={hideDialog}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="col-12">
                    <div className="p-fluid formgrid grid">
                        <div className="field col-12 md:col-6 lg:col-4">
                            <label htmlFor="userName">Nombre de Usuario</label>
                            <InputText
                                {...register("username")}
                                id="username"
                                autoFocus
                                className={classNames({
                                    "p-invalid": errors.username,
                                })}
                            />
                            {errors.username && (
                                <small className="p-invalid text-danger">
                                    {errors.username.message?.toString()}
                                </small>
                            )}
                        </div>
                        <div className="field col-12 md:col-6 lg:col-4">
                            <label htmlFor="password">Password</label>
                            <InputText
                                id="password"
                                type="text"
                                {...register("password")}
                                className={classNames({
                                    "p-invalid": errors.password,
                                })}
                            />
                            {errors.password && (
                                <small className="p-invalid text-red-500">
                                    {errors.password.message?.toString()}
                                </small>
                            )}
                        </div>
                        <div className="field col-12 md:col-6 lg:col-4">
                            <label htmlFor="idBank" className="block">
                                Banco
                            </label>
                            <GenericDropDown
                                id="idRol"
                                isValid={!!errors.idRol}
                                text="description"
                                useQuery={useRolQuery}
                                setValue={setValue}
                                watch={watch}
                            />
                            {errors.idRol && (
                                <small className="text-red-600">
                                    {errors.idRol.message?.toString()}
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

export default AddUser;
