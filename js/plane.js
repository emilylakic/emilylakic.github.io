let select = s => document.querySelector(s),
  selectAll = s =>  document.querySelectorAll(s),
	mainSVG = select('#mainSVG'),
	trailLine = select('#trailLine'),
	numPoints = 300,
	svgHeight = 600,
	height = svgHeight,
	allPlanes = gsap.utils.toArray('.plane'),
	allTrailLines = selectAll('.trailLine'),
	allTrailPoints = [],
	planeColorArray = ['#04BCE8', '#EA6360', '#4EBE92', '#A83395', '#4A52A6', '#F2CD5D'],
	planeWidth = allPlanes[0].getBBox().width,
	pivotFrame = 60

gsap.defaults({lazy:true}) 

gsap.set('svg', {
	visibility: 'visible'
})
gsap.set(allPlanes, {
	transformOrigin: '50% 100%',
	yPercent: -20
})
let p = CustomEase.create('trail', 'M0,0 C0,0 0.08957,0.04997 0.14563,0.07332 0.17361,0.08497 0.19406,0.08816 0.22447,0.09346 0.25234,0.09831 0.27245,0.10281 0.29876,0.1 0.3304,0.09662 0.3574,0.09206 0.38526,0.07627 0.46146,0.0331 0.50906,-0.01658 0.58698,-0.06332 0.61735,-0.08154 0.64322,-0.09168 0.67604,-0.09815 0.70315,-0.10349 0.72556,-0.09999 0.75503,-0.09644 0.7862,-0.09269 0.8064,-0.0881 0.83671,-0.07879 0.87049,-0.06842 0.89148,-0.06013 0.92338,-0.04473 0.95378,-0.03007 1,0 1,0 ');

const swayPlane = (_id) => {

	gsap.set(allPlanes[_id], {
		x: allTrailPoints[_id][0].x - (planeWidth/2),
		y: allTrailPoints[_id][0].y - planeWidth
	})
		gsap.to(allPlanes[_id], {
			duration: 0.1,
			rotation: ((planeInitArray[_id].x - (allTrailPoints[_id][pivotFrame].x)) * 0.72),
			ease: 'sine.inOut'
		})
}

let planeInitArray = []									 
let duration = gsap.utils.random(5, 20);
for(var j = 0; j < allPlanes.length; j++) {
	let trailLine = allTrailLines[j];
	let pointX = gsap.utils.random(250, 350);
	let pointArray = [];
	let heightMultiplier = gsap.utils.random(0.11, 0.8);
	gsap.set(allTrailLines[j], {
		stroke: planeColorArray[j]
	})
	
	for(let i = 0; i < numPoints; i++) {
		let point = trailLine.points.appendItem(mainSVG.createSVGPoint());
		pointArray.push(point)
		point.x = pointX;
		gsap.set(point, {
			y:(height * heightMultiplier) + (i * ((height ) / numPoints))
		})			
	}
allTrailPoints.push(pointArray)
	planeInitArray.push({x: pointArray[0].x, y: pointArray[0].y} );

	let tl = gsap.timeline();
	tl.to(allTrailPoints[j], {
		duration: gsap.utils.random(7, 14),
		x: '-=' + gsap.utils.random(-600, 600),
		stagger: {
			each: duration / 1000,
			repeat: -1
		},
		onUpdate: swayPlane,
		onUpdateParams:[j],
		ease: 'trail'
	}).seek(gsap.utils.random(300, 1000));
	

}

let extraTl = gsap.timeline();
extraTl.to(allTrailLines, {
	//strokeDashoffset:-(14 * 4),
	//repeat: -1,
	ease: 'none'
}).to('#grid', {
	duration: 1,
		y: '+=40',
	ease: 'none',
	repeat: -1
}, 0)

allTrailLines.forEach(function (i, c) {
	let tl = gsap.timeline();
	//console.log(i, c)
	tl.to(i, {
		strokeDashoffset:-(14 * 4),
		duration: gsap.utils.random(0.5, 0.76),
		repeat: -1,
		ease: 'none'
	})
	extraTl.add(tl, 0)
})

//gsap.globalTimeline.timeScale(0.25)
