console.log('yo')

const getPollResultsFromServer = pollName => new Promise((resolve, reject)=>{
    const url = `/results/${pollName}`
    const request = new XMLHttpRequest()
    request.open('GET', url, true)
    request.onload = function(){
      if(request.status >= 200 && request.status < 400){
        resolve(JSON.parse(request.response))
      } else{
        reject(new Error(request.status))
      }
    }
    request.onerror =()=>reject(new Error('Error Fetching Results'))
    //...
    request.send()
})

//Getting Results
getPollResultsFromServer('rap vs rock').then(res=>ui.renderSidebar(res))


//Chaining
getPollResultsFromServer('rap vs rock')
  .then(res=>res.filter(r=> r.city==='Orlando'))
  .then(res=>ui.renderSidebar(res))



//cleaning up

const filterByCity = (results, cityName) =>{
  result.filter(result => result.city === cityName )
}

const ui={
  renderSidebar (results){
    console.log('rap')
  }
}

getPollResultsFromServer('rap vs rock')
  .then(filterByCity(res, 'Orlando'))
  .then(ui.renderSidebar)
