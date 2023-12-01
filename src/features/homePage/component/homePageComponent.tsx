import React, { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import '../style/homePage.scss';

const HomePageComponent = () => {
    const [invoiceLabel, setInvoiceLabel] = useState('');
    const [addInvoiceInput, setAddInvoiceInput] = useState(1);
    const [quantityAmount, setQuantityAmount] = useState('');
    const [quantity, setQuantity] = useState(0);
    const [taxAmount, setTaxAmount] = useState(0);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();


    const onSubmit = useCallback(
        (data: any, e: any) => {
            console.log('data', data);
            const userData = JSON.parse(localStorage.getItem('InvoiceData') || '[]');
            userData.push({ ...data });
            localStorage.setItem('InvoiceData', JSON.stringify(userData));
        },
        [],
    );

    const generatePDF = useCallback(() => {
        window.print();
    }, []);

    return (
        <div id='invoice'>
            <form onSubmit={handleSubmit(onSubmit)} className='form'>
                <div className='form-label'>
                    <p className='form-text'>{invoiceLabel || 'Invoice'}</p>
                    <select id="invoiceType" {...register("invoiceType")} onChange={(e) => { setInvoiceLabel(e.target.value); }} className='type-dropDown'>
                        <option value={''}>Select Invoice Type</option>
                        <option value={'Invoice'}>Invoice</option>
                        <option value={'Credit Note'}>Credit Note</option>
                        <option value={'Quote'}>Quote</option>
                        <option value={'Purchase Order'}>Purchase Order</option>
                        <option value={'Receipt'}>Receipt</option>
                    </select>
                </div>
                <input type="text" placeholder="who is invoice from?"  {...register('invoiceFrom', { required: true })} className='input-box' />
                {errors.invoiceFrom && <p> invoice From is required.</p>}
                <label className='input-label'>Bill to</label>
                <input type="text" placeholder="who is invoice to" {...register('invoiceTo', { required: true })} className='input-box' />
                {errors.invoiceTo && <p> invoice To is required.</p>}
                <label className='input-label'>Ship To</label>
                <input type="text" placeholder="(optional)" {...register('shipTo')} className='input-box' />

                <table className='form-table'>
                    <tr>
                        <th>item</th>
                        <th>Quantity</th>
                        <th>Rate</th>
                        <th>Amount</th>
                    </tr>
                    {[...Array(addInvoiceInput)].map((_, index: number) => {
                        const fieldName = `invoiceData[${index}]`;
                        return (
                            <tr key={index}>
                                <td>
                                    <input type="text" placeholder="Description of service product.."  {...register(`${fieldName}.descriptionProduct`, { required: true })} className='table-input' /></td>
                                <td><input type="number" placeholder="Quantity"  {...register(`${fieldName}.Quantity`, { required: true })} className='table-input' onChange={(e) => setQuantity(Number(e.target.value))} /></td>
                                <td><input type="number" placeholder='$0.00' {...register(`${fieldName}.QuantityRate`, { required: true })} className='table-input' onChange={(e) => setQuantityAmount(e.target.value)} /></td>
                                <td><input type='number' className='table-input' {...register(`${fieldName}.Amount`)} disabled={true} value={(Number(quantityAmount) * quantity) || '$0.00'} /></td>
                            </tr>
                        );
                    })
                    }
                </table>
                <button type='button' onClick={() => setAddInvoiceInput(addInvoiceInput + 1)} className='add-list-btn'>Add List</button>

                <label className='input-label '>SubTotal&nbsp;</label>
                <input  {...register('subTotal')} disabled value={`${(Number(quantityAmount) * quantity) || ''}`} className='input-box' />

                <label className='input-label '>Tax&nbsp;</label>
                <input type="text" placeholder="$0.00" {...register('tax')} onChange={(e) => setTaxAmount(Number(e.target.value))} className='input-box' />

                <label className='input-label '>Total&nbsp;</label>
                <input type="number"  {...register('total')} value={((taxAmount / 100) * (Number(quantityAmount) * quantity)) + (Number(quantityAmount) * quantity) || (Number(quantityAmount) * quantity)} className='input-box' />

                <div className='submit-wrapper'> <input type="submit" className='submit-btn' />
                    <button type='button' onClick={generatePDF} className='add-list-btn'>Download Invoice</button>
                </div>
            </form>
        </div>
    );
};

export default HomePageComponent;