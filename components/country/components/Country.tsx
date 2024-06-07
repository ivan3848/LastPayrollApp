"use client";

import useCrudModals from "@/components/Shared/Hooks/useCrudModals";
import { ProductService } from "@/demo/service/ProductService";
import type { Demo } from "@/types";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import {
    InputNumber,
    InputNumberValueChangeEvent,
} from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { RadioButton, RadioButtonChangeEvent } from "primereact/radiobutton";
import { Toast } from "primereact/toast";
import { Toolbar } from "primereact/toolbar";
import { classNames } from "primereact/utils";
import React, { useEffect, useRef, useState } from "react";
import { ICountry } from "../Types/ICountry";
import useParamFilter from "@/components/Shared/Hooks/useParamFilter";
import useCountryQuery from "../Hooks/useCountryQuery";

const Country = () => {
    let emptyProduct: Demo.Product = {
        id: "",
        name: "",
        image: "",
        description: "",
        category: "",
        price: 0,
        quantity: 0,
        rating: 0,
        inventoryStatus: "INSTOCK",
    };

    const {
        entityDialog,
        setEntityDialog,
        deleteEntityDialog,
        setDeleteEntityDialog,
        entity,
        setEntity,
        submitted,
        setSubmitted,
        toast,
        dt,
    } = useCrudModals<ICountry>();
    const { setPage, setPageSize, setGlobalFilter, params } = useParamFilter();

    const listOfDependencies: boolean[] = [submitted];
    const { data } = useCountryQuery(params, listOfDependencies);

    const openNew = () => {
        setProduct(emptyProduct);
        setSubmitted(false);
        setProductDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setProductDialog(false);
    };

    const hideDeleteProductDialog = () => {
        setDeleteProductDialog(false);
    };

    const saveProduct = () => {
        setSubmitted(true);

        if (product.name.trim()) {
            let _products = [...products];
            let _product = { ...product };
            if (product.id) {
                const index = findIndexById(product.id);

                _products[index] = _product;
                toast.current?.show({
                    severity: "success",
                    summary: "Successful",
                    detail: "Product Updated",
                    life: 3000,
                });
            } else {
                _product.image = "product-placeholder.svg";
                _products.push(_product);
                toast.current?.show({
                    severity: "success",
                    summary: "Successful",
                    detail: "Product Created",
                    life: 3000,
                });
            }

            setProducts(_products);
            setProductDialog(false);
            setProduct(emptyProduct);
        }
    };

    const editProduct = (product: Demo.Product) => {
        setProduct({ ...product });
        setProductDialog(true);
    };

    const confirmDeleteProduct = (product: Demo.Product) => {
        setProduct(product);
        setDeleteProductDialog(true);
    };

    const deleteProduct = () => {
        let _products = products.filter((val) => val.id !== product.id);
        setProducts(_products);
        setDeleteProductDialog(false);
        setProduct(emptyProduct);
        toast.current?.show({
            severity: "success",
            summary: "Successful",
            detail: "Product Deleted",
            life: 3000,
        });
    };

    const findIndexById = (id: string) => {
        let index = -1;
        for (let i = 0; i < products.length; i++) {
            if (products[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    };

    const onCategoryChange = (e: RadioButtonChangeEvent) => {
        let _product = { ...product };
        _product["category"] = e.value;
        setProduct(_product);
    };

    const onInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        name: string
    ) => {
        const val = (e.target && e.target.value) || "";
        let _product = { ...product };
        _product[`${name}`] = val;

        setProduct(_product);
    };

    const onInputNumberChange = (
        e: InputNumberValueChangeEvent,
        name: string
    ) => {
        const val = e.value || 0;
        let _product = { ...product };
        _product[`${name}`] = val;

        setProduct(_product);
    };

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <Button
                        label="Agregar"
                        icon="pi pi-plus"
                        severity="success"
                        className="mr-2"
                        onClick={openNew}
                    />
                </div>
            </React.Fragment>
        );
    };

    const nameBodyTemplate = (rowData: Demo.Product) => {
        return (
            <>
                <span className="p-column-title">Name</span>
                {rowData.name}
            </>
        );
    };

    const actionBodyTemplate = (rowData: Demo.Product) => {
        return (
            <>
                <Button
                    icon="pi pi-pencil"
                    className="mr-2"
                    rounded
                    severity="success"
                    onClick={() => editProduct(rowData)}
                />
                <Button
                    icon="pi pi-trash"
                    rounded
                    severity="warning"
                    onClick={() => confirmDeleteProduct(rowData)}
                />
            </>
        );
    };

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">País</h5>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <InputText
                    type="search"
                    onInput={(e) =>
                        setTimeout(() => {
                            setGlobalFilter(
                                (e.target as HTMLInputElement).value
                            );
                        }, 500)
                    }
                    placeholder="Buscar..."
                />
            </span>
        </div>
    );

    const productDialogFooter = (
        <>
            <Button
                label="Cancel"
                icon="pi pi-times"
                text
                onClick={hideDialog}
            />
            <Button
                label="Save"
                icon="pi pi-check"
                text
                onClick={saveProduct}
            />
        </>
    );


    return (
        <div className="grid crud-demo">
            <div className="col-12">
                <div className="card">
                    <Toast ref={toast} />
                    <Toolbar
                        className="mb-4"
                        left={leftToolbarTemplate}
                    ></Toolbar>

                    <DataTable
                        ref={dt}
                        value={data.items}
                        dataKey="id"
                        paginator
                        rows={10}
                        rowsPerPageOptions={[5, 10, 25]}
                        className="datatable-responsive"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
                        emptyMessage="No hay registros disponibles"
                        header={header}
                        responsiveLayout="scroll"
                    >
                        <Column
                            field="name"
                            header="Name"
                            sortable
                            body={nameBodyTemplate}
                            headerStyle={{ minWidth: "15rem" }}
                        ></Column>
                        <Column
                            body={actionBodyTemplate}
                            header="Acciones"
                            headerStyle={{ minWidth: "10rem" }}
                        ></Column>
                    </DataTable>

                    <Dialog
                        visible={productDialog}
                        style={{ width: "450px" }}
                        header="Product Details"
                        modal
                        className="p-fluid"
                        footer={productDialogFooter}
                        onHide={hideDialog}
                    >
                        {product.image && (
                            <img
                                src={`/demo/images/product/${product.image}`}
                                alt={product.image}
                                width="150"
                                className="mt-0 mx-auto mb-5 block shadow-2"
                            />
                        )}
                        <div className="field">
                            <label htmlFor="name">Name</label>
                            <InputText
                                id="name"
                                value={product.name}
                                onChange={(e) => onInputChange(e, "name")}
                                required
                                autoFocus
                                className={classNames({
                                    "p-invalid": submitted && !product.name,
                                })}
                            />
                            {submitted && !product.name && (
                                <small className="p-invalid">
                                    Name is required.
                                </small>
                            )}
                        </div>
                        <div className="field">
                            <label htmlFor="description">Description</label>
                            <InputTextarea
                                id="description"
                                value={product.description}
                                onChange={(e) =>
                                    onInputChange(e, "description")
                                }
                                required
                                rows={3}
                                cols={20}
                            />
                        </div>

                        <div className="field">
                            <label className="mb-3">Category</label>
                            <div className="formgrid grid">
                                <div className="field-radiobutton col-6">
                                    <RadioButton
                                        inputId="category1"
                                        name="category"
                                        value="Accessories"
                                        onChange={onCategoryChange}
                                        checked={
                                            product.category === "Accessories"
                                        }
                                    />
                                    <label htmlFor="category1">
                                        Accessories
                                    </label>
                                </div>
                                <div className="field-radiobutton col-6">
                                    <RadioButton
                                        inputId="category2"
                                        name="category"
                                        value="Clothing"
                                        onChange={onCategoryChange}
                                        checked={
                                            product.category === "Clothing"
                                        }
                                    />
                                    <label htmlFor="category2">Clothing</label>
                                </div>
                                <div className="field-radiobutton col-6">
                                    <RadioButton
                                        inputId="category3"
                                        name="category"
                                        value="Electronics"
                                        onChange={onCategoryChange}
                                        checked={
                                            product.category === "Electronics"
                                        }
                                    />
                                    <label htmlFor="category3">
                                        Electronics
                                    </label>
                                </div>
                                <div className="field-radiobutton col-6">
                                    <RadioButton
                                        inputId="category4"
                                        name="category"
                                        value="Fitness"
                                        onChange={onCategoryChange}
                                        checked={product.category === "Fitness"}
                                    />
                                    <label htmlFor="category4">Fitness</label>
                                </div>
                            </div>
                        </div>

                        <div className="formgrid grid">
                            <div className="field col">
                                <label htmlFor="price">Price</label>
                                <InputNumber
                                    id="price"
                                    value={product.price as number}
                                    onValueChange={(e) =>
                                        onInputNumberChange(e, "price")
                                    }
                                    mode="currency"
                                    currency="USD"
                                    locale="en-US"
                                />
                            </div>
                            <div className="field col">
                                <label htmlFor="quantity">Quantity</label>
                                <InputNumber
                                    id="quantity"
                                    value={product.quantity}
                                    onValueChange={(e) =>
                                        onInputNumberChange(e, "quantity")
                                    }
                                />
                            </div>
                        </div>
                    </Dialog>

                </div>
            </div>
        </div>
    );
};

export default Country;
