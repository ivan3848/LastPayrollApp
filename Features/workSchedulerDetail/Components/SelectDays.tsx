import { Checkbox, CheckboxChangeEvent } from "primereact/checkbox";

interface Props {
    days: string[];
    setDays: (value: string[]) => void;
}

const SelectDays = ({days, setDays}: Props) => {
    const weekDays: string[] = [
        "Lunes",
        "Martes",
        "Miércoles",
        "Jueves",
        "Viernes",
        "Sábado",
        "Domingo",
    ];

    const onCategoryChange = (e: CheckboxChangeEvent) => {
        let _selectedCategories = [...days];

        if (e.checked) _selectedCategories.push(e.value);
        else
            _selectedCategories = _selectedCategories.filter(
                (day) => day !== e.value
            );

        setDays(_selectedCategories);
    };

    return (
        <div className="card flex justify-content-center">
            <div className="flex flex-wrap gap-1">
                {weekDays.map((day) => (
                    <div key={day} className="flex align-items-center">
                        <Checkbox
                            inputId={day}
                            name="day"
                            value={day}
                            onChange={onCategoryChange}
                            checked={days.some((item) => item === day)}
                        />
                        <label htmlFor={day} className="ml-2">
                            {day}
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SelectDays;
