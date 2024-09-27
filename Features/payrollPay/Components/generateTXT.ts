'use server';
import { promises as fs } from 'fs';
import { IPaymentLoad } from '../types/IPayrollPay';

export const generateTXT = async (data: IPaymentLoad) => {
    const translatedData = await translateData(data);

    const txtContent = translatedData.map((item: { [key: string]: any }) => 
        Object.entries(item).map(([key, value]) => `${key}: ${value}`).join('\n')
    ).join('\n\n');

    try {
       const response =  await fs.writeFile('public/data.txt', txtContent);
        console.log('response', response);
    } catch (error) {
        console.error('Error writing file:', error);
    }
};

export const translateData = (entity: any): { [key: string]: any }[] => {
    const keysToTranslate = ['bankName', 'bankCode', 'paymentMethod', 'accountNumber', 'totalPay', 'employeeName', 'countryName', 'email', 'transactionType', 'documentType'];

    return entity.map((item: any) => {
        const translatedItem: { [key: string]: any } = {};
        Object.keys(item)
            .filter(key => keysToTranslate.includes(key) && item[key] !== undefined)
            .forEach(key => {
                translatedItem[translateColumnName(key)] = item[key];
            });
        return translatedItem;
    });
};

export const translateColumnName = (columnName: string): string => {
    const translations: { [key: string]: string } = {
        bankName: 'Nombre de Banco',
        bankCode: 'Código de Banco',
        paymentMethod: 'Método de Pago',
        accountNumber: 'Número de Cuenta',
        totalPay: 'Total de Pago',
        employeeName: 'Nombre de Empleado',
        countryName: 'Nombre de País',
        email: 'Correo Electrónico',
        transactionType: 'Tipo de Transacción',
        documentType: 'Tipo de Documento'
    };
    
    return translations[columnName] || columnName.charAt(0).toUpperCase() + columnName.slice(1);
};
