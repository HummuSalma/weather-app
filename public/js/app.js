console.log("Client Side javascript file loaded!!")
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageone = document.querySelector('#msg-1')
const messagetwo = document.querySelector('#msg-2')

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location = search.value
    messageone.textContent = "Loading..."
    messagetwo.textContent = ''
    fetch('http://localhost:3001/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            messageone.textContent=data.error
        }
        else{
            console.log(data.forecast)
            console.log(data.location)
            messageone.textContent = data.forecast
            messagetwo.textContent = data.location
        }
    })
})
    console.log(location)
})