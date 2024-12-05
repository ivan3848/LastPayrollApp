"use client";
import schedulerService from "@/Features/calendar/Services/schedulerService";
import { IScheduler } from "@/Features/calendar/Types/IScheduler";
import { statusByTableNameService } from "@/Features/status/Services/statusService";
import type { Demo, Page } from "@/types";
import { DateInput, DateSelectArg, EventClickArg } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import { Button } from "primereact/button";
import { Calendar as PRCalendar } from "primereact/calendar";
import { confirmDialog, ConfirmDialog } from "primereact/confirmdialog";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

const CalendarDemo: Page = () => {
    const [events, setEvents] = useState<Demo.Event[]>([]);
    const [tags, setTags] = useState<Demo.Event["tag"][]>([]);
    const [showDialog, setShowDialog] = useState(false);
    const [view, setView] = useState("");
    const { handleSubmit } = useForm<IScheduler>();
    const [changedEvent, setChangedEvent] = useState<Demo.Event>({
        id: "",
        concept: "",
        start: "",
        end: "",
        allDay: false,
        location: "",
        borderColor: "",
        textColor: "",
        description: "",
        tag: {
            name: "Company A",
            color: "#FFB6B6",
            idStatus:
                tags.find((x) => x?.name === "Fecha de corte")?.idStatus || 0,
        },
    });

    const onEventClick = (e: EventClickArg) => {
        const { start, end, id } = e.event;
        let plainEvent = e.event.toPlainObject({
            collapseExtendedProps: true,
            collapseColor: true,
        });
        setView("display");
        setShowDialog(true);

        setChangedEvent((prevChangeState) => ({
            ...prevChangeState,
            ...plainEvent,
            start: start as DateInput,
            end: end ? end : (start as DateInput),
            id: id,
        }));
    };

    function getColor(concept: string) {
        switch (concept) {
            case "Fecha de corte":
                return "#FF8914";
            case "Día feriado":
                return "#0EAB20";
            case "Fecha de pago":
                return "#146AFF";
            case "Día no laborable":
                return "#4D6A96";
            case "Pago de impuestos":
                return "#F51818";
            default:
                return "#F52925";
        }
    }

    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        (async () => {
            const data = (await schedulerService.get()) as any;
            const schedulerType = await statusByTableNameService.get(
                "Scheduler"
            );

            const _events: Demo.Event[] = data.map((item: IScheduler) => {
                return {
                    id: item.idScheduler.toString(),
                    title: item.title,
                    concept: item.title,
                    start: item.date,
                    end: item.time,
                    textColor: "#212121",
                    location: item.concept,
                    description: item.concept,
                    borderColor: getColor(item.concept),
                    backgroundColor: getColor(item.concept),
                    tag: {
                        name: item.concept,
                        color: getColor(item.concept),
                    },
                };
            });

            setEvents(_events);

            const _tags = schedulerType.map((item) => {
                return {
                    name: item.description,
                    color: getColor(item.description),
                    idStatus: item.idStatus,
                };
            });

            setTags(_tags);
        })();
    }, [submitted]);

    function subtractFourHours(dates: string) {
        const date = new Date(dates);
        const fourHoursInMs = 4 * 60 * 60 * 1000;
        const adjustedDate = new Date(date.getTime() - fourHoursInMs);

        return adjustedDate;
    }

    const handleSave = async () => {
        if (!validate()) {
            return;
        }

        const _clickedEvent = {
            ...changedEvent,
            backgroundColor: changedEvent.tag?.color ?? "#fff",
            borderColor: changedEvent.tag?.color ?? "#fff",
            textColor: "#212121",
            id: changedEvent.id,
        };

        setShowDialog(false);

        const adjustedStart = subtractFourHours(_clickedEvent.start as string);
        const adjustedEnd = subtractFourHours(_clickedEvent.end as string);

        const _scheduler: IScheduler = {
            title: _clickedEvent.title || "",
            idScheduler: parseInt(changedEvent.id as string),
            concept: _clickedEvent.title || "",
            date: adjustedStart,
            time: adjustedEnd,
            idStatus:
                tags.find((x) => x?.name === _clickedEvent.tag?.name)
                    ?.idStatus ?? 0,
        };

        if (_clickedEvent.id) {
            await schedulerService.put(_scheduler);
            setEvents((prevState) =>
                prevState.map((event) =>
                    event.id === _clickedEvent.id ? _clickedEvent : event
                )
            );
        } else {
            const newScheduler = await schedulerService.post(_scheduler);
            const newEvent: Demo.Event = {
                ..._clickedEvent,
                id: newScheduler.toString(),
            };
            setEvents((prevState) => [...prevState, newEvent]);
        }

        setSubmitted(!submitted);
    };

    const validate = () => {
        let { start, end, title } = changedEvent;
        return start && end && title;
    };

    const onEditClick = () => {
        setView("edit");
    };

    const accept = () => {
        schedulerService.delete(parseInt(changedEvent.id as string));
        setEvents((prevState) =>
            prevState.filter((x) => x.id !== changedEvent.id)
        );
        setShowDialog(false);
    };

    const onDeleteClick = () => {
        confirmDialog({
            message: "¿Seguro que desea eliminar este evento?",
            header: "Aviso",
            icon: "pi pi-info-circle",
            acceptClassName: "p-button-danger",
            accept,
        });
    };

    const onDateSelect = (e: DateSelectArg) => {
        setView("new");
        setShowDialog(true);
        setChangedEvent({
            ...e,
            title: "",
            concept: "",
            location: "",
            borderColor: "",
            textColor: "",
            description: "",
            tag: {
                name: "Fecha de corte",
                color: "#FF8914",
                idStatus:
                    tags.find((x) => x?.name === "Fecha de corte")?.idStatus ||
                    0,
            },
        });
    };

    const selectedItemTemplate = () => {
        return (
            <div className="flex align-items-center">
                <div
                    className="flex-shrink-0 w-1rem h-1rem mr-2 border-circle"
                    style={{
                        backgroundColor: changedEvent.tag?.color || "#FFB6B6",
                    }}
                ></div>
                <div>{changedEvent.tag?.name || "Company A"}</div>
            </div>
        );
    };

    const itemOptionTemplate = (tag: Demo.Event["tag"]) => {
        return (
            <div className="flex align-items-center">
                <div
                    className="flex-shrink-0 w-1rem h-1rem mr-2 border-circle"
                    style={{ backgroundColor: tag?.color }}
                ></div>
                <div>{tag?.name}</div>
            </div>
        );
    };

    function onSubmit() {
        alert("onsubmit");
    }

    const footer = (
        <>
            {view === "display" ? (
                <>
                    <Button
                        severity="danger"
                        type="button"
                        label="Eliminar"
                        icon="pi pi-times"
                        onClick={onDeleteClick}
                    />
                    <Button
                        type="button"
                        label="Editar"
                        icon="pi pi-pencil"
                        onClick={onEditClick}
                    />
                </>
            ) : null}
            {view === "new" || view === "edit" ? (
                <Button
                    type="button"
                    label="Guardar"
                    icon="pi pi-check"
                    disabled={!changedEvent.start || !changedEvent.end}
                    onClick={handleSave}
                />
            ) : null}
        </>
    );

    return (
        <div className="grid">
            <ConfirmDialog />
            <div className="col-12">
                <div className="card">
                    <h5>Calendar</h5>
                    <FullCalendar
                        events={events}
                        eventClick={onEventClick}
                        select={onDateSelect}
                        initialDate={new Date()}
                        initialView="dayGridMonth"
                        height={720}
                        plugins={[
                            dayGridPlugin,
                            timeGridPlugin,
                            interactionPlugin,
                        ]}
                        headerToolbar={{
                            left: "prev,next today",
                            center: "title",
                            right: "dayGridMonth,timeGridWeek,timeGridDay",
                        }}
                        editable
                        selectable
                        selectMirror
                        dayMaxEvents
                    />

                    <Dialog
                        visible={showDialog}
                        style={{ width: "36rem" }}
                        modal
                        headerClassName="text-900 font-semibold text-xl"
                        header={
                            view === "display"
                                ? changedEvent.title
                                : view === "new"
                                ? "Nuevo evento"
                                : "Editar evento"
                        }
                        breakpoints={{ "960px": "75vw", "640px": "90vw" }}
                        footer={footer}
                        closable
                        onHide={() => setShowDialog(false)}
                    >
                        <>
                            {view === "display" ? (
                                <React.Fragment>
                                    <div className="grid">
                                        <div className="col-6">
                                            <div className="text-900 font-semibold mb-2">
                                                Descripción
                                            </div>
                                            <p className="flex align-items-center m-0"></p>
                                        </div>
                                        <div className="col-6">
                                            <div className="text-900 font-semibold mb-2"></div>
                                            <p className="flex align-items-center m-0"></p>
                                        </div>
                                        <div className="col-6">
                                            <div className="text-900 font-semibold mb-2">
                                                Inicio
                                            </div>
                                            <p className="flex align-items-center m-0">
                                                <i className="pi pi-fw pi-clock text-700 mr-2"></i>
                                                <span>
                                                    {changedEvent.start
                                                        ?.toString()
                                                        .slice(0, 10)}
                                                </span>
                                            </p>
                                        </div>
                                        <div className="col-6">
                                            <div className="text-900 font-semibold mb-2">
                                                Fin
                                            </div>
                                            <p className="flex align-items-center m-0">
                                                <i className="pi pi-fw pi-clock text-700 mr-2"></i>
                                                <span>
                                                    {changedEvent.end
                                                        ?.toString()
                                                        .slice(0, 10)}
                                                </span>
                                            </p>
                                        </div>
                                        <div className="col-12">
                                            <div className="text-900 font-semibold mb-2">
                                                Tipo
                                            </div>
                                            <p className="flex align-items-center m-0">
                                                <span
                                                    className="inline-flex flex-shrink-0 w-1rem h-1rem mr-2 border-circle"
                                                    style={{
                                                        backgroundColor:
                                                            changedEvent.tag
                                                                ?.color,
                                                    }}
                                                ></span>
                                                <span>
                                                    {changedEvent.tag?.name}
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                </React.Fragment>
                            ) : (
                                <form
                                    className="grid p-fluid"
                                    onSubmit={handleSubmit(onSubmit)}
                                >
                                    <div className="col-12">
                                        <div className="col-6 md:col-12 field">
                                            <label
                                                htmlFor="title"
                                                className="text-900 font-semibold"
                                            >
                                                Titulo
                                            </label>
                                            <span className="p-input-icon-left">
                                                <i className="pi pi-pencil"></i>
                                                <InputText
                                                    id="title"
                                                    value={changedEvent.title}
                                                    onChange={(e) =>
                                                        setChangedEvent(
                                                            (prevState) => ({
                                                                ...prevState,
                                                                title: e.target
                                                                    .value as string,
                                                            })
                                                        )
                                                    }
                                                    type="text"
                                                    placeholder="Fecha de corte"
                                                />
                                            </span>
                                        </div>
                                        <div className="col-6 md:col-12 field">
                                            <label
                                                htmlFor="start"
                                                className="text-900 font-semibold"
                                            >
                                                Inicio
                                            </label>
                                            <PRCalendar
                                                id="start"
                                                maxDate={
                                                    changedEvent.end as Date
                                                }
                                                value={
                                                    changedEvent.start as Date
                                                }
                                                onChange={(e) =>
                                                    setChangedEvent(
                                                        (prevState) => ({
                                                            ...prevState,
                                                            start: e.value as
                                                                | DateInput
                                                                | undefined,
                                                        })
                                                    )
                                                }
                                                showTime
                                                required
                                                showIcon
                                                mask="99/99/9999 99:99"
                                                hourFormat="12"
                                            />
                                        </div>
                                        <div className="col-6 md:col-12 field">
                                            <label
                                                htmlFor="end"
                                                className="text-900 font-semibold"
                                            >
                                                Fin
                                            </label>
                                            <PRCalendar
                                                id="end"
                                                minDate={
                                                    changedEvent.start as Date
                                                }
                                                value={changedEvent.end as Date}
                                                onChange={(e) =>
                                                    setChangedEvent(
                                                        (prevState) => ({
                                                            ...prevState,
                                                            end: e.value as DateInput,
                                                        })
                                                    )
                                                }
                                                showTime
                                                mask="99/99/9999 99:99"
                                                required
                                                showIcon
                                                hourFormat="12"
                                            />
                                        </div>
                                        <div className="col-12 field">
                                            <label
                                                htmlFor="company-color"
                                                className="text-900 font-semibold"
                                            >
                                                Tipo
                                            </label>
                                            <Dropdown
                                                inputId="company-color"
                                                value={changedEvent.tag}
                                                options={tags}
                                                onChange={(e) =>
                                                    setChangedEvent(
                                                        (prevState) => ({
                                                            ...prevState,
                                                            tag: e.value,
                                                        })
                                                    )
                                                }
                                                optionLabel="name"
                                                placeholder="Select a Tag"
                                                valueTemplate={
                                                    selectedItemTemplate
                                                }
                                                itemTemplate={
                                                    itemOptionTemplate
                                                }
                                            />
                                        </div>
                                    </div>
                                </form>
                            )}
                        </>
                    </Dialog>
                </div>
            </div>
        </div>
    );
};

export default CalendarDemo;
