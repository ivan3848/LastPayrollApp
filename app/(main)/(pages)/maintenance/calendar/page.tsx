"use client";
import FullCalendar from "@fullcalendar/react";
import type { Demo, Page } from "@/types";
import { DateInput, DateSelectArg, EventClickArg } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { Button } from "primereact/button";
import { Calendar as PRCalendar } from "primereact/calendar";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import React, { useEffect, useState } from "react";
import schedulerService from "@/Features/calendar/Services/schedulerService";
import { IScheduler } from "@/Features/calendar/Types/IScheduler";
import { useForm } from "react-hook-form";
import { statusByTableNameService } from "@/Features/status/Services/statusService";

const CalendarDemo: Page = () => {
    const [events, setEvents] = useState<Demo.Event[]>([]);
    const [tags, setTags] = useState<Demo.Event["tag"][]>([]);
    const [showDialog, setShowDialog] = useState(false);
    const [view, setView] = useState("");

    const {
        handleSubmit,
        reset,
        setValue,
        watch,
        formState: { errors },
    } = useForm<IScheduler>();

    const [changedEvent, setChangedEvent] = useState<Demo.Event>({
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
        },
    });

    const onEventClick = (e: EventClickArg) => {
        const { start, end } = e.event;
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

    useEffect(() => {
        (async () => {
            const data = (await schedulerService.get()) as any;
            const schedulerType = await statusByTableNameService.get(
                "Scheduler"
            );

            const _events: Demo.Event[] = data.map((item: IScheduler) => {
                return {
                    id: item.idScheduler.toString(),
                    title: item.concept,
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
                };
            });

            setTags(_tags);
        })();
    }, []);

    const handleSave = () => {
        if (!validate()) {
            return;
        } else {
            const _clickedEvent = {
                ...changedEvent,
                backgroundColor: changedEvent.tag?.color ?? "#fff",
                borderColor: changedEvent.tag?.color ?? "#fff",
                textColor: "#212121",
            };
            setShowDialog(false);
            console.log(_clickedEvent);
            if (_clickedEvent.id) {
                setEvents((prevState) => [
                    ...prevState,
                    {
                        ..._clickedEvent,
                        title: _clickedEvent.concept,
                    },
                ]);
            } else {
                setEvents((prevState) => [
                    ...prevState,
                    {
                        ..._clickedEvent,
                        title: _clickedEvent.concept,
                        id: Math.floor(Math.random() * 10000).toString(),
                    },
                ]);
            }
        }
    };

    const validate = () => {
        let { start, end, concept } = changedEvent;
        return start && end && concept;
    };

    const onEditClick = () => {
        setView("edit");
    };

    const onDateSelect = (e: DateSelectArg) => {
        setView("new");
        setShowDialog(true);
        setChangedEvent({
            ...e,
            concept: "",
            location: "",
            borderColor: "",
            textColor: "",
            description: "",
            tag: {
                name: "Fecha de corte",
                color: "#FF8914",
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
                <Button
                    type="button"
                    label="Edit"
                    icon="pi pi-pencil"
                    onClick={onEditClick}
                />
            ) : null}
            {view === "new" || view === "edit" ? (
                <Button
                    type="button"
                    label="Save"
                    icon="pi pi-check"
                    disabled={!changedEvent.start || !changedEvent.end}
                    onClick={handleSave}
                />
            ) : null}
        </>
    );
    return (
        <div className="grid">
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
                                ? changedEvent.concept
                                : view === "new"
                                ? "New Event"
                                : "Edit Event"
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
                                                Start
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
                                                End
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
                                                Location
                                            </div>
                                            <p className="flex align-items-center m-0">
                                                <i className="pi pi-fw pi-clock text-700 mr-2"></i>
                                                <span>
                                                    {changedEvent.location}
                                                </span>
                                            </p>
                                        </div>
                                        <div className="col-12">
                                            <div className="text-900 font-semibold mb-2">
                                                Color
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
                                    <div className="grid p-fluid formgrid">
                                        <div className="col-12 md:col-6 field">
                                            <label
                                                htmlFor="concept"
                                                className="text-900 font-semibold"
                                            >
                                                Title
                                            </label>
                                            <span className="p-input-icon-left">
                                                <i className="pi pi-pencil"></i>
                                                <InputText
                                                    id="concept"
                                                    value={changedEvent.concept}
                                                    onChange={(e) =>
                                                        setChangedEvent(
                                                            (prevState) => ({
                                                                ...prevState,
                                                                concept:
                                                                    e.target
                                                                        .value,
                                                            })
                                                        )
                                                    }
                                                    type="text"
                                                    placeholder="Title"
                                                />
                                            </span>
                                        </div>
                                        <div className="col-12 md:col-6 field">
                                            <label
                                                htmlFor="location"
                                                className="text-900 font-semibold"
                                            >
                                                Location
                                            </label>
                                            <span className="p-input-icon-left">
                                                <i className="pi pi-map-marker"></i>
                                                <InputText
                                                    id="location"
                                                    value={
                                                        changedEvent.location
                                                    }
                                                    onChange={(e) =>
                                                        setChangedEvent(
                                                            (prevState) => ({
                                                                ...prevState,
                                                                location:
                                                                    e.target
                                                                        .value,
                                                            })
                                                        )
                                                    }
                                                    type="text"
                                                    placeholder="Location"
                                                />
                                            </span>
                                        </div>
                                        <div className="col-12 md:col-6 field">
                                            <label
                                                htmlFor="start"
                                                className="text-900 font-semibold"
                                            >
                                                Start Date
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
                                            />
                                        </div>
                                        <div className="col-12 md:col-6 field">
                                            <label
                                                htmlFor="end"
                                                className="text-900 font-semibold"
                                            >
                                                End Date
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
                                                required
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
