function solve() {
    let departBtn=document.querySelector('#depart');
    let arriveBtn=document.querySelector('#arrive');
    let spanInfo=document.querySelector('.info');
    let nextStopId='depot'

    function depart() {
        arriveBtn.disabled=false;
        departBtn.disabled=true;

        if(spanInfo.getAttribute('nextStopId')!=null){
            nextStopId=spanInfo.getAttribute('nextStopId');
        }

        fetch(`http://localhost:3030/jsonstore/bus/schedule/${nextStopId}`)
        .then(body=>body.json())
        .then(stopInfo=>{
            console.log(stopInfo);
            spanInfo.setAttribute('stopName', stopInfo.name);
            spanInfo.setAttribute('nextStopId', stopInfo.next);
            spanInfo.textContent=`Next stop ${stopInfo.name}`;
        })
        .catch(err=>{
            arriveBtn.disabled=true;
            departBtn.disabled=true;
            spanInfo.textContent='Error';
        })
    }

    function arrive() {
        arriveBtn.disabled=true;
        departBtn.disabled=false;

        let stopName=spanInfo.getAttribute('stopName')
        spanInfo.textContent=`Arriving at ${stopName}`;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();