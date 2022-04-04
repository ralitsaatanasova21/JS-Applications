import { editItem, getById } from "../api/data.js";
import { html, until } from "../lib.js";

const editTemplate=(editPromise)=>html`
<div class="row space-top">
<div class="col-md-12">
    <h1>Edit Furniture</h1>
    <p>Please fill all fields.</p>
</div>
</div>
${until(editPromise, html`<p>Loading &hellip;</p>`)}
`
const formTemplate=(item, onSubmit, errMsg, errors)=>html`
<form @submit=${onSubmit}>
${errMsg ? html`<div class="form-group error">${errMsg}</div>` : null}
<div class="row space-top">
    <div class="col-md-4">
        <div class="form-group">
            <label class="form-control-label" for="new-make">Make</label>
            <input class=${"form-control" + (errors.make ? ' is-invalid' : '')} id="new-make" type="text" name="make" .value=${item.make}>
        </div>
        <div class="form-group has-success">
            <label class="form-control-label" for="new-model">Model</label>
            <input class=${"form-control" + (errors.model ? ' is-invalid' : '')} id="new-model" type="text" name="model" .value=${item.model}>
        </div>
        <div class="form-group has-danger">
            <label class="form-control-label" for="new-year">Year</label>
            <input class=${"form-control" + (errors.year ? ' is-invalid' : '')} id="new-year" type="number" name="year" .value=${item.year}>
        </div>
        <div class="form-group">
            <label class="form-control-label" for="new-description">Description</label>
            <input class=${"form-control" + (errors.description ? ' is-invalid' : '')} type="text" name="description" .value=${item.description}>
        </div>
    </div>
    <div class="col-md-4">
        <div class="form-group">
            <label class="form-control-label" for="new-price">Price</label>
            <input class=${"form-control" + (errors.price ? ' is-invalid' : '')} type="number" name="price" .value=${item.price}>
        </div>
        <div class="form-group">
            <label class="form-control-label" for="new-image">Image</label>
            <input class=${"form-control" + (errors.img ? ' is-invalid' : '')} type="text" name="img" .value=${item.img}>
        </div>
        <div class="form-group">
            <label class="form-control-label" for="new-material">Material (optional)</label>
            <input class="form-control" id="new-material" type="text" name="material" .value=${item.material}>
        </div>
        <input type="submit" class="btn btn-info" value="Edit" />
    </div>
</div>
</form>
`

export function editPage(ctx){
    let itemPromise= getById(ctx.params.id)
    update(itemPromise, null, {});

    function update(itemPromise, errMsg, errors){
        ctx.render(editTemplate(loadItem(itemPromise, errMsg, errors)))
    }

    async function loadItem(itemPromise, errMsg, errors) {
        const item = await itemPromise;
      
        return formTemplate(item, onSubmit, errMsg, errors);
    }

    async function onSubmit(e){
        e.preventDefault();

        const formData=[...(new FormData(e.target)).entries()];
        const data=formData.reduce((acc, [key, value])=>Object.assign(acc, { [key]: value.trim() }), {});

        const missing=formData.filter(([k,v])=> k !='material' && v.trim()=='');

        try{

        data.year= Number(data.year);
        data.price= Number(data.price);

        if(missing.length>0){
            const errors=missing.reduce((a,[k])=>Object.assign(a, {[k] : true} ), {})
            throw {
                error: new Error('Please fill all fields!'),
                errors
            }
        }

        if(data.make.length<4){
            throw {
                error: new Error('Make must be at least 4 symbols long'),
            }
        }

        if(data.model.length<4){
            throw {
                error: new Error('Model must be at least 4 symbols long'),
            }
        }

        if(data.year<1950 || data.year>2050){
            throw {
                error: new Error('Year must be between 1950 and 2050'),
            }
        }

        if(data.description.length<=10){
            throw {
                error: new Error('Description must be more than 10 symbols'),
            }
        }


        const result= await editItem(ctx.params.id, data);

        e.target.reset();
        ctx.page.redirect('/details/' + result._id);

       }catch(err){
           const message=err.message || err.error.message;
           update(data, message, {});

       }
    }
}
