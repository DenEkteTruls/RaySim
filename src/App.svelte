<script>
	import chartjs from 'chart.js/auto';
	import { onMount } from 'svelte';
	import { Engine } from './engine';
	
	import Controls from "./components/Controls.svelte";

	let engine = new Engine(200, 0.1);
	engine.updateVoltage(1530, 5820);
	localStorage.setItem("u", "x");

	setInterval(() => {
		if(localStorage.getItem("u") != "x") {
			engine.updateVoltage(2500, parseInt(localStorage.getItem("u")));
			localStorage.setItem("u", "x");
		}
	}, 10)

	let ctx;
	let chartCanvas;

	const data = [];
	const data2 = [];
	let prev = 100;
	let prev2 = 80;
	for (let i = 0; i < 1000; i++) {
  		prev += 5 - Math.random() * 10;
  		data.push({x: i, y: prev});
  		prev2 += 5 - Math.random() * 10;
  		data2.push({x: i, y: prev2});
	}

	const totalDuration = 10000;
	const delayBetweenPoints = totalDuration / data.length;
	const previousY = (ctx) => ctx.index === 0 ? ctx.chart.scales.y.getPixelForValue(100) : ctx.chart.getDatasetMeta(ctx.datasetIndex).data[ctx.index - 1].getProps(['y'], true).y;
	const animation = {
	  x: {
	    type: 'number',
	    easing: 'linear',
	    duration: delayBetweenPoints,
	    from: NaN, 
	    delay(ctx) {
	      if (ctx.type !== 'data' || ctx.xStarted) {
	        return 0;
	      }
	      ctx.xStarted = true;
	      return ctx.index * delayBetweenPoints;
	    }
	  },
	  y: {
	    type: 'number',
	    easing: 'linear',
	    duration: delayBetweenPoints,
	    from: previousY,
	    delay(ctx) {
	      if (ctx.type !== 'data' || ctx.yStarted) {
	        return 0;
	      }
	      ctx.yStarted = true;
	      return ctx.index * delayBetweenPoints;
	    }
	  }
	};

	onMount(async () => {
		ctx = chartCanvas.getContext("2d");
		new chartjs(ctx, {
			type: 'line',
			data: {
				labels: engine.punkter.map(x => x.x),
				datasets: [{
					label: 'Teltronrør',
					borderColor: 'cyan',
					borderWidth: 4,
					radius: 0,
					data: engine.punkter.map(x => x.y)
				}]
			},
			options: {
    			animation,
    			interaction: {
      				intersect: false
    			},
    			plugins: {
      				legend: false
    			},
    			scales: {
      				x: {
	        			type: 'linear',
						max: 0.1
      				},
					y: {
						max: 0.025
					}
    			}
			}
		});
	});
</script>



<!--<Controls/>-->
<canvas bind:this={chartCanvas} id='chart'></canvas>


<style>

</style>