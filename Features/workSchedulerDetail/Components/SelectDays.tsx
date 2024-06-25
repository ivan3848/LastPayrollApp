import { Checkbox, CheckboxChangeEvent } from "primereact/checkbox";

interface Props {
    setDays: (string: string) => void;
    days?: string;
    error?: string;
}

const SelectDays = ({ days, setDays, error }: Props) => {
    const weekDays: string[] = [
        "Lunes",
        "Martes",
        "Miércoles",
        "Jueves",
        "Viernes",
        "Sábado",
        "Domingo",
    ];
    
    let selectedDays = days?.split(", ") || [];

    const onDaySelect = (e: CheckboxChangeEvent) => {
        if (e.checked) selectedDays.push(e.value);
        else selectedDays = selectedDays.filter((day) => day !== e.value);

        const formattedDays = selectedDays.join(", ").replace(/^, /, "");

        setDays(formattedDays);
    };

    return (
        <div className="card">
            <div className="flex justify-content-center">
                <div className="flex flex-wrap gap-1">
                    {weekDays.map((day) => (
                        <div key={day} className="flex align-items-center mb-2">
                            <Checkbox
                                inputId={day}
                                name="day"
                                value={day}
                                onChange={onDaySelect}
                                checked={selectedDays.some((item) => item === day)}
                            />
                            <label htmlFor={day} className="ml-2">
                                {day}
                            </label>
                        </div>
                    ))}
                </div>
            </div>
            {error && (
                <div className="flex w-full mt-3">
                    {error && (
                        <small className="p-invalid text-red-600">
                            {error}
                        </small>
                    )}
                </div>
            )}
        </div>
    );
};

export default SelectDays;
