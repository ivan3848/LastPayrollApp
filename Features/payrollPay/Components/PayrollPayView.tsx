
'use client'
import DialogFooterButtons from '@/Features/Shared/Components/DialogFooterButtons'
import GenericStatusDropDown from '@/Features/Shared/Components/GenericStatusDropDown'
import { Button } from 'primereact/button'
import { Calendar } from 'primereact/calendar'
import { InputNumber } from 'primereact/inputnumber'
import { InputSwitch } from 'primereact/inputswitch'
import { InputTextarea } from 'primereact/inputtextarea'
import { SelectButton } from 'primereact/selectbutton'
import { TabPanel, TabView } from 'primereact/tabview'
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { IPayrollPay } from '../types/IPayrollPay'
import DialogFooterButtonPayrollPay from './DialogFooterButtonPayrollPay'
import { InputText } from 'primereact/inputtext'

interface Props {
    entity: IPayrollPay | null;
    setEntity?: (entity: IPayrollManagement) => void;
    setSubmitted: (value: boolean) => void;
    toast: React.MutableRefObject<any>;
    entityPayrollManagement: IPayrollManagement | undefined;
}

const PayrollPayView = ({
    entity,
    setEntity,
    toast,
    setSubmitted,
    entityPayrollManagement
}: Props) => {
    const {
        register,
        handleSubmit,
        watch,
        reset,
        setValue,
        formState: { errors },
    } = useForm<IPayrollPay>();

    const initialPayrollNumber = useRef<number | null>(null);
    const [pagoNavidad, setPagoNavidad] = useState(false);
    const [notice, setNotice] = useState(false);
    const [vacation, setVacation] = useState(false);
    const [unemployment, setUnemployment] = useState(false);

    // const addEntity = useAddPayrollManagement({
    //     toast,
    //     setSubmitted,
    //     reset,
    // });

    const payrollNumber = watch("payrollNumber");


    const updateFormValues = (data: IPayrollPay) => {
        Object.entries(data).forEach(([key, value]) => {
            if (["lastModifiedDate", "payrollPeriodStart",
                "date", "payrollPeriodEnd"].includes(key)) {
                value = new Date(value);
            }
            setValue(key as keyof IPayrollPay, value);
        });
    };

    useEffect(() => {
        if (entity) {
            updateFormValues(entity);
        }
    }, [entity]);

    useEffect(() => {
        if (payrollNumber && initialPayrollNumber.current === null) {
            initialPayrollNumber.current = payrollNumber;
        }
    }, [payrollNumber]);

    const onSubmit = (data: IPayrollPay) => {
        // addEntity.mutate(data);
    };

    let options: string[] = ['Mensual', 'Quincenal'];

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="col-12">
                <div className="card">
                    <h5 className='mt-1'>Configuración de nómina</h5>
                    <div className="card">
                        <div className="p-fluid formgrid grid"
                            style={{
                                marginTop: "15px",
                                marginBottom: "15px",
                                display: "flex",
                                justifyContent: "space-evenly",
                                width: "100%",
                            }}>

                            <div className="field col-12 md:col-2">
                                <label id="DateChange" htmlFor="DateChange">
                                    Numero de nomina
                                </label>
                                <InputNumber
                                    id="payrollNumber"
                                    value={payrollNumber || initialPayrollNumber.current}
                                    min={1}
                                    format={false}
                                    disabled={true}
                                />
                            </div>
                            <div className="field col-12 md:col-3">
                                <label id="DateChange" htmlFor="DateChange">
                                    Fecha de inicio
                                </label>
                                <Calendar
                                    name="FiredDate"
                                    value={new Date()}
                                    showIcon
                                    disabled={true}
                                />
                            </div><div className="field col-12 md:col-3">
                                <label id="DateChange" htmlFor="DateChange">
                                    Fecha final
                                </label>
                                <Calendar
                                    name="FiredDate"
                                    value={new Date()}
                                    showIcon
                                    disabled={true}
                                />
                            </div><div className="field col-12 md:col-3">
                                <label id="DateChange" htmlFor="DateChange">
                                    Periodo de retroactividad
                                </label>
                                <Calendar
                                    name="FiredDate"
                                    value={new Date()}
                                    showIcon
                                    disabled={true}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="card">
                        <TabView>
                            <TabPanel header="Nomina Real">
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="p-fluid formgrid grid"
                                        style={{
                                            marginTop: "15px",
                                            marginBottom: "15px",
                                            display: "flex",
                                            justifyContent: "space-evenly",
                                            width: "100%",
                                        }}>
                                        <div className="field col-12 md:col-3">
                                            <label
                                                htmlFor="IdChangeManager"
                                                className="w-full"
                                            >
                                                Tipo de nomina
                                            </label>
                                            <SelectButton
                                                value={watch("idPayrollArea") === 2 ? 'Mensual' : 'Quincenal'}
                                                onChange={(e) => {
                                                    setValue("idPayrollArea", e.value === 'Mensual' ? 2 : 1)
                                                    // getLastPayroll(watch("payrollNumber"));
                                                }}
                                                options={options}
                                            />
                                        </div>
                                        <div className="field col-12 md:col-3">
                                            <label htmlFor="idStatus" className="w-full">
                                                Descripción
                                            </label>
                                            <InputText
                                                id="process"
                                                placeholder="Descripcion..."
                                            />
                                        </div>
                                        <div className="field col-12 md:col-3">
                                            <label id="DateChange" htmlFor="DateChange">
                                                Fecha de inicio
                                            </label>
                                            <Calendar
                                                name="FiredDate"
                                                value={new Date()}
                                                showIcon
                                            />
                                        </div>
                                    </div>
                                    <div
                                        className="p-fluid formgrid grid"
                                        style={{
                                            marginTop: "15px",
                                            marginBottom: "15px",
                                            display: "flex",
                                            justifyContent: "space-evenly",
                                            width: "100%",
                                        }}
                                    >
                                        <div className="field col-12 md:col-3">
                                            <h6>Pago de Navidad</h6>
                                            <InputSwitch
                                                name="IsChristmasPayment"
                                                checked={pagoNavidad}
                                                onChange={(e) =>
                                                    setPagoNavidad(e.value ?? false)
                                                }
                                            />
                                            <h6>Pre-Aviso</h6>
                                            <InputSwitch
                                                name="IsNotice"
                                                checked={notice}
                                                onChange={(e) =>
                                                    setNotice(e.value ?? false)
                                                }
                                            />
                                        </div>
                                        <div className="field col-12 md:col-3">
                                            <h6>Ha tomado vacaciones este año?</h6>
                                            <InputSwitch
                                                name="IsTakenVacation"
                                                checked={vacation}
                                                onChange={(e) =>
                                                    setVacation(e.value ?? false)
                                                }
                                            />
                                            <h6>Cesantia</h6>
                                            <InputSwitch
                                                name="IsUnemployment"
                                                checked={unemployment}
                                                onChange={(e) =>
                                                    setUnemployment(e.value ?? false)
                                                }
                                            />
                                        </div>
                                    </div>
                                </form>
                            </TabPanel>
                            <TabPanel header="Nomina Simulada">
                                <p>
                                    Sed ut perspiciatis unde omnis iste natus error
                                    sit voluptatem accusantium doloremque
                                    laudantium, totam rem aperiam, eaque ipsa quae
                                    ab illo inventore veritatis et quasi architecto
                                    beatae vitae dicta sunt explicabo. Nemo enim
                                    ipsam voluptatem quia voluptas sit aspernatur
                                    aut odit aut fugit, sed quia consequuntur magni
                                    dolores eos qui ratione voluptatem sequi
                                    nesciunt. Consectetur, adipisci velit, sed quia
                                    non numquam eius modi.
                                </p>
                            </TabPanel>
                        </TabView>
                    </div>
                    <DialogFooterButtonPayrollPay />
                </div>
            </div>
        </form>
    )
}

export default PayrollPayView
