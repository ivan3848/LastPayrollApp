"use client";
import type { AppConfigProps, ColorScheme } from "@/types";
import { PrimeReactContext } from "primereact/api";
import { Button } from "primereact/button";
import { InputSwitch, InputSwitchChangeEvent } from "primereact/inputswitch";
import { RadioButton, RadioButtonChangeEvent } from "primereact/radiobutton";
import { Sidebar } from "primereact/sidebar";
import { classNames } from "primereact/utils";
import { useContext, useEffect } from "react";
import { LayoutContext } from "./context/layoutcontext";

const AppConfig = (props: AppConfigProps) => {
    const {
        layoutConfig,
        setLayoutConfig,
        layoutState,
        setLayoutState,
        isSlim,
        isSlimPlus,
        isHorizontal,
    } = useContext(LayoutContext);
    const { changeTheme } = useContext(PrimeReactContext);
    const scales = [12, 13, 14, 15, 16];
    const componentThemes = [
        { name: "indigo", color: "#6366F1" },
        { name: "blue", color: "#3B82F6" },
        { name: "purple", color: "#8B5CF6" },
        { name: "teal", color: "#14B8A6" },
        { name: "cyan", color: "#06b6d4" },
        { name: "green", color: "#10b981" },
        { name: "orange", color: "#f59e0b" },
        { name: "pink", color: "#d946ef" },
    ];

    useEffect(() => {
        if (isSlim() || isSlimPlus() || isHorizontal()) {
            setLayoutState((prevState) => ({ ...prevState, resetMenu: true }));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [layoutConfig.menuMode]);

    const onConfigButtonClick = () => {
        setLayoutState((prevState) => ({
            ...prevState,
            configSidebarVisible: true,
        }));
    };

    const onConfigSidebarHide = () => {
        setLayoutState((prevState) => ({
            ...prevState,
            configSidebarVisible: false,
        }));
    };

    const changeInputStyle = (e: RadioButtonChangeEvent) => {
        setLayoutConfig((prevState) => ({ ...prevState, inputStyle: e.value }));
    };

    const changeRipple = (e: InputSwitchChangeEvent) => {
        setLayoutConfig((prevState) => ({
            ...prevState,
            ripple: e.value as boolean,
        }));
    };

    const changeMenuMode = (e: RadioButtonChangeEvent) => {
        setLayoutConfig((prevState) => ({ ...prevState, menuMode: e.value }));
    };

    const changeMenuTheme = (e: RadioButtonChangeEvent) => {
        setLayoutConfig((prevState) => ({ ...prevState, menuTheme: e.value }));
    };

    const changeColorScheme = (colorScheme: ColorScheme) => {
        changeTheme?.(
            layoutConfig.colorScheme,
            colorScheme,
            "theme-link",
            () => {
                setLayoutConfig((prevState) => ({ ...prevState, colorScheme }));
            }
        );
    };

    const _changeTheme = (theme: string) => {
        changeTheme?.(layoutConfig.theme, theme, "theme-link", () => {
            setLayoutConfig((prevState) => ({ ...prevState, theme }));
        });
    };

    const decrementScale = () => {
        setLayoutConfig((prevState) => ({
            ...prevState,
            scale: prevState.scale - 1,
        }));
    };

    const incrementScale = () => {
        setLayoutConfig((prevState) => ({
            ...prevState,
            scale: prevState.scale + 1,
        }));
    };

    const applyScale = () => {
        document.documentElement.style.fontSize = layoutConfig.scale + "px";
    };

    useEffect(() => {
        applyScale();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [layoutConfig.scale]);

    return (
        <>
            <button
                className="layout-config-button config-link"
                style={{ display: "none" }}
                type="button"
                onClick={onConfigButtonClick}
            >
                <i className="pi pi-cog"></i>
            </button>

            <Sidebar
                visible={layoutState.configSidebarVisible}
                onHide={onConfigSidebarHide}
                position="right"
                className="layout-config-sidebar w-18rem"
            >
                <h5>Temas</h5>
                <div className="flex flex-wrap row-gap-3">
                    {componentThemes.map((theme, i) => {
                        return (
                            <div key={i} className="w-3">
                                <button
                                    type="button"
                                    className="cursor-pointer p-link w-2rem h-2rem border-circle flex-shrink-0 flex align-items-center justify-content-center"
                                    onClick={() => _changeTheme(theme.name)}
                                    style={{ backgroundColor: theme.color }}
                                >
                                    {theme.name == layoutConfig.theme && (
                                        <i className="pi pi-check text-white"></i>
                                    )}
                                </button>
                            </div>
                        );
                    })}
                </div>

                <h5>Tamaño</h5>
                <div className="flex align-items-center">
                    <Button
                        icon="pi pi-minus"
                        type="button"
                        onClick={decrementScale}
                        className="w-2rem h-2rem mr-2"
                        rounded
                        text
                        disabled={layoutConfig.scale === scales[0]}
                    ></Button>
                    <div className="flex gap-2 align-items-center">
                        {scales.map((s, i) => {
                            return (
                                <i
                                    key={i}
                                    className={classNames(
                                        "pi pi-circle-fill text-300",
                                        {
                                            "text-primary-500":
                                                s === layoutConfig.scale,
                                        }
                                    )}
                                ></i>
                            );
                        })}
                    </div>
                    <Button
                        icon="pi pi-plus"
                        type="button"
                        onClick={incrementScale}
                        className="w-2rem h-2rem ml-2"
                        rounded
                        text
                        disabled={
                            layoutConfig.scale === scales[scales.length - 1]
                        }
                    ></Button>
                </div>

                {!props.minimal && (
                    <>
                        <h5>Menu</h5>
                        <div className="flex flex-wrap row-gap-3 w-8">
                            <div className="flex align-items-center gap-2">
                                <RadioButton
                                    name="menuMode"
                                    value={"static"}
                                    checked={layoutConfig.menuMode === "static"}
                                    onChange={(e) => changeMenuMode(e)}
                                    inputId="mode1"
                                ></RadioButton>
                                <label htmlFor="mode1">Estático</label>
                            </div>
                            <div className="flex align-items-center gap-2">
                                <RadioButton
                                    name="menuMode"
                                    value={"overlay"}
                                    checked={
                                        layoutConfig.menuMode === "overlay"
                                    }
                                    onChange={(e) => changeMenuMode(e)}
                                    inputId="mode2"
                                ></RadioButton>
                                <label htmlFor="mode2">Superponer</label>
                            </div>
                            {/* <div className="flex align-items-center gap-2">
                                <RadioButton
                                    name="menuMode"
                                    value={"slim"}
                                    checked={layoutConfig.menuMode === "slim"}
                                    onChange={(e) => changeMenuMode(e)}
                                    inputId="mode3"
                                ></RadioButton>
                                <label htmlFor="mode3">Delgado</label>
                            </div>
                            <div className="flex align-items-center gap-2">
                                <RadioButton
                                    name="menuMode"
                                    value={"slim-plus"}
                                    checked={
                                        layoutConfig.menuMode === "slim-plus"
                                    }
                                    onChange={(e) => changeMenuMode(e)}
                                    inputId="mode4"
                                ></RadioButton>
                                <label htmlFor="mode4">Delgado +</label>
                            </div>
                            <div className="flex align-items-center gap-2 ">
                                <RadioButton
                                    name="menuMode"
                                    value={"drawer"}
                                    checked={layoutConfig.menuMode === "drawer"}
                                    onChange={(e) => changeMenuMode(e)}
                                    inputId="mode7"
                                ></RadioButton>
                                <label htmlFor="mode7">Cajón</label>
                            </div>
                            <div className="flex align-items-center gap-2">
                                <RadioButton
                                    name="menuMode"
                                    value={"reveal"}
                                    checked={layoutConfig.menuMode === "reveal"}
                                    onChange={(e) => changeMenuMode(e)}
                                    inputId="mode5"
                                ></RadioButton>
                                <label htmlFor="mode6">Revelar</label>
                            </div>
                            <div className="flex align-items-center gap-2">
                                <RadioButton
                                    name="menuMode"
                                    value={"horizontal"}
                                    checked={
                                        layoutConfig.menuMode === "horizontal"
                                    }
                                    onChange={(e) => changeMenuMode(e)}
                                    inputId="mode5"
                                ></RadioButton>
                                <label htmlFor="mode5">Horizontal</label>
                            </div> */}
                        </div>

                        <h5>Tema del menú</h5>
                        <div className="field-radiobutton">
                            <RadioButton
                                name="menuTheme"
                                value="colorScheme"
                                checked={
                                    layoutConfig.menuTheme === "colorScheme"
                                }
                                onChange={(e) => changeMenuTheme(e)}
                                inputId="menutheme-colorscheme"
                            ></RadioButton>
                            <label htmlFor="menutheme-colorscheme">
                                Esquema de color
                            </label>
                        </div>
                        <div className="field-radiobutton">
                            <RadioButton
                                name="menuTheme"
                                value="primaryColor"
                                checked={
                                    layoutConfig.menuTheme === "primaryColor"
                                }
                                onChange={(e) => changeMenuTheme(e)}
                                inputId="menutheme-primarycolor"
                            ></RadioButton>
                            <label htmlFor="menutheme-primarycolor">
                                Color primario
                            </label>
                        </div>
                        <div className="field-radiobutton">
                            <RadioButton
                                name="menuTheme"
                                value="transparent"
                                checked={
                                    layoutConfig.menuTheme === "transparent"
                                }
                                onChange={(e) => changeMenuTheme(e)}
                                inputId="menutheme-transparent"
                            ></RadioButton>
                            <label htmlFor="menutheme-transparent">
                                Transparente
                            </label>
                        </div>
                    </>
                )}

                <h5>Color de fondo</h5>
                <div className="field-radiobutton">
                    <RadioButton
                        name="colorScheme"
                        value="light"
                        checked={layoutConfig.colorScheme === "light"}
                        onChange={(e) => changeColorScheme(e.value)}
                        inputId="mode-light"
                    ></RadioButton>
                    <label htmlFor="mode-light">Claro</label>
                </div>
                <div className="field-radiobutton">
                    <RadioButton
                        name="colorScheme"
                        value="dim"
                        checked={layoutConfig.colorScheme === "dim"}
                        onChange={(e) => changeColorScheme(e.value)}
                        inputId="mode-dim"
                    ></RadioButton>
                    <label htmlFor="mode-dim">Tenue</label>
                </div>
                <div className="field-radiobutton">
                    <RadioButton
                        name="colorScheme"
                        value="dark"
                        checked={layoutConfig.colorScheme === "dark"}
                        onChange={(e) => changeColorScheme(e.value)}
                        inputId="mode-dark"
                    ></RadioButton>
                    <label htmlFor="mode-dark">Oscuro</label>
                </div>

                {!props.minimal && (
                    <>
                        <h5>Estilo de entrada</h5>
                        <div className="flex">
                            <div className="field-radiobutton flex-1">
                                <RadioButton
                                    name="inputStyle"
                                    value="outlined"
                                    checked={
                                        layoutConfig.inputStyle === "outlined"
                                    }
                                    onChange={(e) => changeInputStyle(e)}
                                    inputId="outlined_input"
                                ></RadioButton>
                                <label htmlFor="outlined_input">Descrito</label>
                            </div>
                            <div className="field-radiobutton flex-1">
                                <RadioButton
                                    name="inputStyle"
                                    value="filled"
                                    checked={
                                        layoutConfig.inputStyle === "filled"
                                    }
                                    onChange={(e) => changeInputStyle(e)}
                                    inputId="filled_input"
                                ></RadioButton>
                                <label htmlFor="filled_input">Lleno</label>
                            </div>
                        </div>

                        <h5>Efecto dominó</h5>
                        <InputSwitch
                            checked={layoutConfig.ripple}
                            onChange={changeRipple}
                        ></InputSwitch>
                    </>
                )}
            </Sidebar>
        </>
    );
};

export default AppConfig;
