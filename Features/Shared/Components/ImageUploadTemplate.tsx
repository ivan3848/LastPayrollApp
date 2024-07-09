import {
    FileUpload,
    FileUploadHeaderTemplateOptions,
    FileUploadSelectEvent,
    ItemTemplateOptions
} from "primereact/fileupload";
import { ProgressBar } from "primereact/progressbar";
import { Tag } from "primereact/tag";
import { Tooltip } from "primereact/tooltip";
import { useRef, useState } from "react";

export default function ImageUploadTemplate() {
    const [totalSize, setTotalSize] = useState(0);
    const fileUploadRef = useRef<FileUpload>(null);

    const onTemplateSelect = async (e: FileUploadSelectEvent) => {

        setTotalSize(e.files[0].size);
        const file = e.files[0];
        const reader = new FileReader();
        let blob = await fetch(URL.createObjectURL(file)).then((r) => r.blob());

        reader.readAsDataURL(blob);

        reader.onloadend = function () {
            const base64data = reader.result;
            console.log(base64data);
            // setValue("employeeImage", base64data?.toString() ?? "");
        };
    };

    const headerTemplate = (options: FileUploadHeaderTemplateOptions) => {
        const { className, chooseButton, cancelButton } = options;
        const value = totalSize / 10000;
        const formatedValue =
            fileUploadRef && fileUploadRef.current
                ? fileUploadRef.current.formatSize(totalSize)
                : "0 B";

        return (
            <div
                className={className}
                style={{
                    backgroundColor: "transparent",
                    display: "flex",
                    alignItems: "center",
                }}
            >
                {chooseButton}
                {cancelButton}
                <div className="flex align-items-center gap-3 ml-auto">
                    <span>{formatedValue} / 1 MB</span>
                    <ProgressBar
                        value={value}
                        showValue={false}
                        style={{ width: "10rem", height: "12px" }}
                    ></ProgressBar>
                </div>
            </div>
        );
    };

    const itemTemplate = (inFile: object, props: ItemTemplateOptions) => {
        const file = inFile as File;
        return (
            <div className="flex align-items-center flex-wrap">
                <div
                    className="flex align-items-center"
                    style={{ width: "40%" }}
                >
                    <img
                        alt={file.name}
                        role="presentation"
                        src={URL.createObjectURL(file)}
                        width={100}
                    />
                    <span className="flex flex-column text-left ml-3">
                        {file.name}
                        <small>{new Date().toLocaleDateString()}</small>
                    </span>
                </div>
                <Tag
                    value={props.formatSize}
                    severity="warning"
                    className="px-3 py-2"
                />
            </div>
        );
    };

    const emptyTemplate = () => {
        return (
            <div className="flex align-items-center flex-column">
                <i
                    className="pi pi-image mt-3 p-5"
                    style={{
                        fontSize: "5em",
                        borderRadius: "50%",
                        backgroundColor: "var(--surface-b)",
                        color: "var(--surface-d)",
                    }}
                ></i>
                <span
                    style={{
                        fontSize: "1.2em",
                        color: "var(--text-color-secondary)",
                    }}
                    className="my-5"
                >
                    Arrastre y suelte archivos aquí para subirlos
                </span>
            </div>
        );
    };

    const chooseOptions = {
        icon: "pi pi-fw pi-images",
        iconOnly: true,
        className: "custom-choose-btn p-button-rounded p-button-outlined p-3",
    };

    const cancelOptions = {
        icon: "pi pi-fw pi-times",
        iconOnly: true,
        className:
            "custom-cancel-btn p-button-danger p-button-rounded p-button-outlined p-3",
    };

    return (
        <div>
            <Tooltip
                target=".custom-choose-btn"
                content="Seleccionar imagen"
                position="bottom"
            />
            <Tooltip
                target=".custom-cancel-btn"
                content="Eliminar"
                position="bottom"
            />

            <FileUpload
                ref={fileUploadRef}
                name="demo[]"
                url="/api/upload"
                accept="image/*"
                maxFileSize={1000000}
                onSelect={onTemplateSelect}
                onError={() => setTotalSize(0)}
                onClear={() => setTotalSize(0)}
                headerTemplate={headerTemplate}
                itemTemplate={itemTemplate}
                emptyTemplate={emptyTemplate}
                chooseOptions={chooseOptions}
                cancelOptions={cancelOptions}
            />
        </div>
    );
}
