"use client";
import { Card } from "primereact/card";

export default function Page() {
    const header = <img alt="Card" src="avatar.png" style={{ width: "90%" }} />;

    return (
        <Card
            title="Advanced Card"
            subTitle="Card subtitle"
            header={header}
            className="md:w-25rem center-content m-auto "
        >
            <p className="m-0">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Inventore sed consequuntur error repudiandae numquam deserunt
                quisquam repellat libero asperiores earum nam nobis, culpa
                ratione quam perferendis esse, cupiditate neque quas!
            </p>
        </Card>
    );
}
