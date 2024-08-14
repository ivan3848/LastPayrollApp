// import { zodResolver } from "@hookform/resolvers/zod";
// import { InputText } from "primereact/inputtext";
// import { useForm } from "react-hook-form";
// import { InputMask } from "primereact/inputmask";
// import { Dialog } from "primereact/dialog";
// import DialogFooterButtons from "@/Features/Shared/Components/DialogFooterButtons";
// import { Calendar } from "primereact/calendar";
// import useAddEntityQuery from "@/Features/Shared/Hooks/useAddEntityQuery";
// import GenericStatusDropDown from "@/Features/Shared/Components/GenericStatusDropDown";
// import { TABLE_NAME_RELATIONSHIP } from "@/constants/StatusTableName";
// import commissionService from "./Services/commissionService";
// import { ICommission } from "./Types/ICommission";
// import { IInsertCommission } from "./Types/IInsertCommission";
// import commissionFormSchema from "./Validation/commissionFormSchema";

// interface Props {
//     setAddEntityDialog: (value: boolean) => void;
//     addEntityDialog: boolean;
//     id: number;
//     handleAdd: () => void;
//     setSubmitted: (value: boolean) => void;
//     toast: React.MutableRefObject<any>;
// }

// const AddDependant = ({
//     setAddEntityDialog,
//     addEntityDialog,
//     id,
//     toast,
//     setSubmitted,
// }: Props) => {
//     const { addEntityFormSchema } = commissionFormSchema();

//     const {
//         handleSubmit,
//         register,
//         watch,
//         reset,
//         setValue,
//         formState: { errors },
//     } = useForm<IInsertCommission>({
//         resolver: zodResolver(addEntityFormSchema),
//     });

//     const addEntity = useAddEntityQuery({
//         toast,
//         setAddEntityDialog,
//         setSubmitted,
//         reset,
//         service: commissionService,
//     });

//     const onSubmit = (data: ICommission) => {
//         data.idEmployee = id;
//         data.commissionDetail = { ...data };
//         addEntity.mutate(data);
//     };

//     const hideDialog = () => {
//         setAddEntityDialog(false);
//     };
//     return (
//         <Dialog
//             visible={addEntityDialog}
//             style={{ width: "50vw" }}
//             header="Agregar Commission"
//             modal
//             className="p-fluid"
//             onHide={hideDialog}
//         >
//             <form onSubmit={handleSubmit(onSubmit)}>
//                 <div className="col-12">
//                     <div className="p-fluid formgrid grid">
//                         <div className="field col-12 md:col-6 lg:col-4">
//                             <label htmlFor="secondLastName">
//                                 Segundo Apellido
//                             </label>
//                             <InputText
//                                 id="secondLastName"
//                                 type="text"
//                                 {...register("secondLastName")}
//                                 defaultValue={person?.secondLastName}
//                             />
//                             {errors.secondLastName && (
//                                 <small className="p-invalid text-red-500">
//                                     {errors.secondLastName.message?.toString()}
//                                 </small>
//                             )}
//                         </div>

//                         <div className="field col-12 md:col-6 lg:col-4">
//                             <label htmlFor="birthDate">
//                                 Fecha De Nacimiento
//                             </label>
//                             <Calendar
//                                 id="birthDate"
//                                 value={watch("birthDate") ?? new Date()}
//                                 onChange={(e) =>
//                                     setValue("birthDate", e.value!)
//                                 }
//                                 onFocus={() =>
//                                     setValue("birthDate", new Date())
//                                 }
//                                 autoFocus
//                                 showIcon
//                                 showButtonBar
//                             />
//                             {errors.birthDate && (
//                                 <small className="p-invalid text-red-500">
//                                     {errors.birthDate.message?.toString()}
//                                 </small>
//                             )}
//                         </div>

//                         <div className="field col-12 md:col-6 lg:col-4">
//                             <label
//                                 htmlFor="idStatusRelationship"
//                                 className="block mt-1"
//                             >
//                                 Relación
//                             </label>
//                             <GenericStatusDropDown
//                                 id="idStatusRelationship"
//                                 isValid={!!errors.idStatusRelationship}
//                                 setValue={setValue}
//                                 watch={watch}
//                                 tableName={TABLE_NAME_RELATIONSHIP}
//                             />
//                             {errors.idStatusRelationship && (
//                                 <small className="text-red-600">
//                                     {errors.idStatusRelationship.message?.toString()}
//                                 </small>
//                             )}
//                         </div>
//                     </div>
//                 </div>
//                 <DialogFooterButtons hideDialog={hideDialog} />
//             </form>
//         </Dialog>
//     );
// };

// export default AddDependant;
