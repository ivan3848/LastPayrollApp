import Department from "@/Features/departments/Components/Deparment";

export default function page() {
    return (
        <div className="card">
            <div className="card-header">
                <h3 className="card-title">Departments</h3>
            </div>
            <Department />
        </div>
    );
}
