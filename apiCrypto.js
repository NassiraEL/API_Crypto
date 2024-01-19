let alldata = [];
let coord = [];
let coloris = [];
let volums =[]
let time = 0;


if(localStorage.length>0){
    let dt = JSON.parse(localStorage.getItem("bitcuine"));
    new Chart("myChart", {
        type: "scatter",
        data: {
          datasets: [{
            pointRadius: dt.v,
            pointBackgroundColor: dt.clr,
            data: dt.cd
          }]
        },
        options: {
          legend: {display: false},
          scales: {
            xAxes: [{ticks: {min: 0, max:100}}],
            yAxes: [{ticks: {min: 40000, max:46000}}],
          }
        }
      });
      coord = coord.concat(dt.cd);
      coloris = coloris.concat(dt.coloris);
      volums = volums.concat(dt.v);
      time = dt.cd[dt.cd.length -1].x;
    
}

 function update(){

    fetch("https://api.coincap.io/v2/assets")
    .then(rep => rep.json())
    .then(data => {
        alldata = {...data};

        let obj = {
            y: alldata.data[0].priceUsd,
            x:time
        }


        coord.push(obj);
   
        let v = Math.floor((alldata.data[0].volumeUsd24Hr % 1) * 100);
  


        console.log(Math.floor((alldata.data[0].volumeUsd24Hr % 1) * 100));
        console.log(volums[volums.length-1])
        if(Math.floor((alldata.data[0].volumeUsd24Hr % 1) * 100) < volums[volums.length-1] ){
            let clr = "red";
            coloris.push(clr);
        }else{
            let clr = "green";
            coloris.push(clr);
        }
        volums.push(v)

        let dataStorige =  {
            cd: coord,
            v: volums,
            clr: coloris
        }
        localStorage.setItem("bitcuine", JSON.stringify(dataStorige));

  
        new Chart("myChart", {
          type: "scatter",
          data: {
            datasets: [{
              pointRadius: volums,
              pointBackgroundColor: coloris,
              data: coord
            }]
          },
          options: {
            legend: {display: false},
            scales: {
              xAxes: [{ticks: {min: 0, max:100}}],
              yAxes: [{ticks: {min: 40000, max:46000}}],
            }
          }
        });


})

time += 5;
 }

// time = 5 => 1 minute
setInterval(update, 60000)
