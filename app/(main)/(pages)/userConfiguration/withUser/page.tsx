"use client";
import UserTableWithLogin from "@/Features/UserConfiguration/Components/UserTableWithLogin";

export default function UserConfigurationTab() {
    return (
        <div className="card">
            <UserTableWithLogin submitted={false} />
        </div>
    );
}
