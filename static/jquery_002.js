(function($){$.color={};$.color.make=function(E,D,B,C){var F={};F.r=E||0;F.g=D||0;F.b=B||0;F.a=C!=null?C:1;F.add=function(I,H){for(var G=0;G<I.length;++G){F[I.charAt(G)]+=H}return F.normalize()};F.scale=function(I,H){for(var G=0;G<I.length;++G){F[I.charAt(G)]*=H}return F.normalize()};F.toString=function(){if(F.a>=1){return"rgb("+[F.r,F.g,F.b].join(",")+")"}else{return"rgba("+[F.r,F.g,F.b,F.a].join(",")+")"}};F.normalize=function(){function G(I,J,H){return J<I?I:(J>H?H:J)}F.r=G(0,parseInt(F.r),255);F.g=G(0,parseInt(F.g),255);F.b=G(0,parseInt(F.b),255);F.a=G(0,F.a,1);return F};F.clone=function(){return $.color.make(F.r,F.b,F.g,F.a)};return F.normalize()};$.color.extract=function(C,B){var D;do{D=C.css(B).toLowerCase();if(D!=""&&D!="transparent"){break}C=C.parent()}while(!$.nodeName(C.get(0),"body"));if(D=="rgba(0, 0, 0, 0)"){D="transparent"}return $.color.parse(D)};$.color.parse=function(E){var D,B=$.color.make;if(D=/rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(E)){return B(parseInt(D[1],10),parseInt(D[2],10),parseInt(D[3],10))}if(D=/rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]+(?:\.[0-9]+)?)\s*\)/.exec(E)){return B(parseInt(D[1],10),parseInt(D[2],10),parseInt(D[3],10),parseFloat(D[4]))}if(D=/rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(E)){return B(parseFloat(D[1])*2.55,parseFloat(D[2])*2.55,parseFloat(D[3])*2.55)}if(D=/rgba\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\s*\)/.exec(E)){return B(parseFloat(D[1])*2.55,parseFloat(D[2])*2.55,parseFloat(D[3])*2.55,parseFloat(D[4]))}if(D=/#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(E)){return B(parseInt(D[1],16),parseInt(D[2],16),parseInt(D[3],16))}if(D=/#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(E)){return B(parseInt(D[1]+D[1],16),parseInt(D[2]+D[2],16),parseInt(D[3]+D[3],16))}var C=$.trim(E).toLowerCase();if(C=="transparent"){return B(255,255,255,0)}else{D=A[C];return B(D[0],D[1],D[2])}};var A={aqua:[0,255,255],azure:[240,255,255],beige:[245,245,220],black:[0,0,0],blue:[0,0,255],brown:[165,42,42],cyan:[0,255,255],darkblue:[0,0,139],darkcyan:[0,139,139],darkgrey:[169,169,169],darkgreen:[0,100,0],darkkhaki:[189,183,107],darkmagenta:[139,0,139],darkolivegreen:[85,107,47],darkorange:[255,140,0],darkorchid:[153,50,204],darkred:[139,0,0],darksalmon:[233,150,122],darkviolet:[148,0,211],fuchsia:[255,0,255],gold:[255,215,0],green:[0,128,0],indigo:[75,0,130],khaki:[240,230,140],lightblue:[173,216,230],lightcyan:[224,255,255],lightgreen:[144,238,144],lightgrey:[211,211,211],lightpink:[255,182,193],lightyellow:[255,255,224],lime:[0,255,0],magenta:[255,0,255],maroon:[128,0,0],navy:[0,0,128],olive:[128,128,0],orange:[255,165,0],pink:[255,192,203],purple:[128,0,128],violet:[128,0,128],red:[255,0,0],silver:[192,192,192],white:[255,255,255],yellow:[255,255,0]}})(jQuery);(function($){function Plot(placeholder,data_,options_,plugins){var series=[],options={colors:["#edc240","#afd8f8","#cb4b4b","#4da74d","#9440ed"],legend:{show:true,noColumns:1,labelFormatter:null,labelBoxBorderColor:"#ccc",container:null,position:"ne",margin:5,backgroundColor:null,backgroundOpacity:0.85},xaxis:{position:"bottom",mode:null,color:null,tickColor:null,transform:null,inverseTransform:null,min:null,max:null,autoscaleMargin:null,ticks:null,tickFormatter:null,labelWidth:null,labelHeight:null,tickLength:null,alignTicksWithAxis:null,tickDecimals:null,tickSize:null,minTickSize:null,monthNames:null,timeformat:null,twelveHourClock:false},yaxis:{autoscaleMargin:0.02,position:"left"},xaxes:[],yaxes:[],series:{points:{show:false,radius:3,lineWidth:2,fill:true,fillColor:"#ffffff",symbol:"circle"},lines:{lineWidth:2,fill:false,fillColor:null,steps:false},bars:{show:false,lineWidth:2,barWidth:1,fill:true,fillColor:null,align:"left",horizontal:false},shadowSize:3},grid:{show:true,aboveData:false,color:"#545454",backgroundColor:null,borderColor:null,tickColor:null,labelMargin:5,axisMargin:8,borderWidth:2,markings:null,markingsColor:"#f4f4f4",markingsLineWidth:2,clickable:false,hoverable:false,autoHighlight:true,mouseActiveRadius:10},hooks:{}},canvas=null,overlay=null,eventHolder=null,ctx=null,octx=null,xaxes=[],yaxes=[],plotOffset={left:0,right:0,top:0,bottom:0},canvasWidth=0,canvasHeight=0,plotWidth=0,plotHeight=0,hooks={processOptions:[],processRawData:[],processDatapoints:[],drawSeries:[],draw:[],bindEvents:[],drawOverlay:[]},plot=this;plot.setData=setData;plot.setupGrid=setupGrid;plot.draw=draw;plot.getPlaceholder=function(){return placeholder;};plot.getCanvas=function(){return canvas;};plot.getPlotOffset=function(){return plotOffset;};plot.width=function(){return plotWidth;};plot.height=function(){return plotHeight;};plot.offset=function(){var o=eventHolder.offset();o.left+=plotOffset.left;o.top+=plotOffset.top;return o;};plot.getData=function(){return series;};plot.getAxis=function(dir,number){var a=(dir=="x"?xaxes:yaxes)[number-1];if(a&&!a.used)
a=null;return a;};plot.getAxes=function(){var res={},i;for(i=0;i<xaxes.length;++i)
res["x"+(i?(i+1):"")+"axis"]=xaxes[i]||{};for(i=0;i<yaxes.length;++i)
res["y"+(i?(i+1):"")+"axis"]=yaxes[i]||{};if(!res.x2axis)
res.x2axis={n:2};if(!res.y2axis)
res.y2axis={n:2};return res;};plot.getXAxes=function(){return xaxes;};plot.getYAxes=function(){return yaxes;};plot.getUsedAxes=getUsedAxes;plot.c2p=canvasToAxisCoords;plot.p2c=axisToCanvasCoords;plot.getOptions=function(){return options;};plot.highlight=highlight;plot.unhighlight=unhighlight;plot.triggerRedrawOverlay=triggerRedrawOverlay;plot.pointOffset=function(point){return{left:parseInt(xaxes[axisNumber(point,"x")-1].p2c(+point.x)+plotOffset.left),top:parseInt(yaxes[axisNumber(point,"y")-1].p2c(+point.y)+plotOffset.top)};};plot.hooks=hooks;initPlugins(plot);parseOptions(options_);constructCanvas();setData(data_);setupGrid();draw();bindEvents();function executeHooks(hook,args){args=[plot].concat(args);for(var i=0;i<hook.length;++i)
hook[i].apply(this,args);}
function initPlugins(){for(var i=0;i<plugins.length;++i){var p=plugins[i];p.init(plot);if(p.options)
$.extend(true,options,p.options);}}
function parseOptions(opts){var i;$.extend(true,options,opts);if(options.xaxis.color==null)
options.xaxis.color=options.grid.color;if(options.yaxis.color==null)
options.yaxis.color=options.grid.color;if(options.xaxis.tickColor==null)
options.xaxis.tickColor=options.grid.tickColor;if(options.yaxis.tickColor==null)
options.yaxis.tickColor=options.grid.tickColor;if(options.grid.borderColor==null)
options.grid.borderColor=options.grid.color;if(options.grid.tickColor==null)
options.grid.tickColor=$.color.parse(options.grid.color).scale('a',0.22).toString();for(i=0;i<Math.max(1,options.xaxes.length);++i)
options.xaxes[i]=$.extend(true,{},options.xaxis,options.xaxes[i]);for(i=0;i<Math.max(1,options.yaxes.length);++i)
options.yaxes[i]=$.extend(true,{},options.yaxis,options.yaxes[i]);if(options.xaxis.noTicks&&options.xaxis.ticks==null)
options.xaxis.ticks=options.xaxis.noTicks;if(options.yaxis.noTicks&&options.yaxis.ticks==null)
options.yaxis.ticks=options.yaxis.noTicks;if(options.x2axis){options.x2axis.position="top";options.xaxes[1]=options.x2axis;}
if(options.y2axis){if(options.y2axis.autoscaleMargin===undefined)
options.y2axis.autoscaleMargin=0.02;options.y2axis.position="right";options.yaxes[1]=options.y2axis;}
if(options.grid.coloredAreas)
options.grid.markings=options.grid.coloredAreas;if(options.grid.coloredAreasColor)
options.grid.markingsColor=options.grid.coloredAreasColor;if(options.lines)
$.extend(true,options.series.lines,options.lines);if(options.points)
$.extend(true,options.series.points,options.points);if(options.bars)
$.extend(true,options.series.bars,options.bars);if(options.shadowSize!=null)
options.series.shadowSize=options.shadowSize;for(i=0;i<options.xaxes.length;++i)
getOrCreateAxis(xaxes,i+1).options=options.xaxes[i];for(i=0;i<options.yaxes.length;++i)
getOrCreateAxis(yaxes,i+1).options=options.yaxes[i];for(var n in hooks)
if(options.hooks[n]&&options.hooks[n].length)
hooks[n]=hooks[n].concat(options.hooks[n]);executeHooks(hooks.processOptions,[options]);}
function setData(d){series=parseData(d);fillInSeriesOptions();processData();}
function parseData(d){var res=[];for(var i=0;i<d.length;++i){var s=$.extend(true,{},options.series);if(d[i].data!=null){s.data=d[i].data;delete d[i].data;$.extend(true,s,d[i]);d[i].data=s.data;}
else
s.data=d[i];res.push(s);}
return res;}
function axisNumber(obj,coord){var a=obj[coord+"axis"];if(typeof a=="object")
a=a.n;if(typeof a!="number")
a=1;return a;}
function canvasToAxisCoords(pos){var res={},i,axis;for(i=0;i<xaxes.length;++i){axis=xaxes[i];if(axis&&axis.used)
res["x"+axis.n]=axis.c2p(pos.left);}
for(i=0;i<yaxes.length;++i){axis=yaxes[i];if(axis&&axis.used)
res["y"+axis.n]=axis.c2p(pos.top);}
if(res.x1!==undefined)
res.x=res.x1;if(res.y1!==undefined)
res.y=res.y1;return res;}
function axisToCanvasCoords(pos){var res={},i,axis,key;for(i=0;i<xaxes.length;++i){axis=xaxes[i];if(axis&&axis.used){key="x"+axis.n;if(pos[key]==null&&axis.n==1)
key="x";if(pos[key]!=null){res.left=axis.p2c(pos[key]);break;}}}
for(i=0;i<yaxes.length;++i){axis=yaxes[i];if(axis&&axis.used){key="y"+axis.n;if(pos[key]==null&&axis.n==1)
key="y";if(pos[key]!=null){res.top=axis.p2c(pos[key]);break;}}}
return res;}
function getUsedAxes(){var res=[],i,axis;for(i=0;i<xaxes.length;++i){axis=xaxes[i];if(axis&&axis.used)
res.push(axis);}
for(i=0;i<yaxes.length;++i){axis=yaxes[i];if(axis&&axis.used)
res.push(axis);}
return res;}
function getOrCreateAxis(axes,number){if(!axes[number-1])
axes[number-1]={n:number,direction:axes==xaxes?"x":"y",options:$.extend(true,{},axes==xaxes?options.xaxis:options.yaxis)};return axes[number-1];}
function fillInSeriesOptions(){var i;var neededColors=series.length,usedColors=[],assignedColors=[];for(i=0;i<series.length;++i){var sc=series[i].color;if(sc!=null){--neededColors;if(typeof sc=="number")
assignedColors.push(sc);else
usedColors.push($.color.parse(series[i].color));}}
for(i=0;i<assignedColors.length;++i){neededColors=Math.max(neededColors,assignedColors[i]+1);}
var colors=[],variation=0;i=0;while(colors.length<neededColors){var c;if(options.colors.length==i)
c=$.color.make(100,100,100);else
c=$.color.parse(options.colors[i]);var sign=variation%2==1?-1:1;c.scale('rgb',1+sign*Math.ceil(variation/2)*0.2)
colors.push(c);++i;if(i>=options.colors.length){i=0;++variation;}}
var colori=0,s;for(i=0;i<series.length;++i){s=series[i];if(s.color==null){s.color=colors[colori].toString();++colori;}
else if(typeof s.color=="number")
s.color=colors[s.color].toString();if(s.lines.show==null){var v,show=true;for(v in s)
if(s[v]&&s[v].show){show=false;break;}
if(show)
s.lines.show=true;}
s.xaxis=getOrCreateAxis(xaxes,axisNumber(s,"x"));s.yaxis=getOrCreateAxis(yaxes,axisNumber(s,"y"));}}
function processData(){var topSentry=Number.POSITIVE_INFINITY,bottomSentry=Number.NEGATIVE_INFINITY,fakeInfinity=Number.MAX_VALUE,i,j,k,m,length,s,points,ps,x,y,axis,val,f,p;function initAxis(axis,number){if(!axis)
return;axis.datamin=topSentry;axis.datamax=bottomSentry;axis.used=false;}
function updateAxis(axis,min,max){if(min<axis.datamin&&min!=-fakeInfinity)
axis.datamin=min;if(max>axis.datamax&&max!=fakeInfinity)
axis.datamax=max;}
for(i=0;i<xaxes.length;++i)
initAxis(xaxes[i]);for(i=0;i<yaxes.length;++i)
initAxis(yaxes[i]);for(i=0;i<series.length;++i){s=series[i];s.datapoints={points:[]};executeHooks(hooks.processRawData,[s,s.data,s.datapoints]);}
for(i=0;i<series.length;++i){s=series[i];var data=s.data,format=s.datapoints.format;if(!format){format=[];format.push({x:true,number:true,required:true});format.push({y:true,number:true,required:true});if(s.bars.show||(s.lines.show&&s.lines.fill)){format.push({y:true,number:true,required:false,defaultValue:0});if(s.bars.horizontal){delete format[format.length-1].y;format[format.length-1].x=true;}}
s.datapoints.format=format;}
if(s.datapoints.pointsize!=null)
continue;s.datapoints.pointsize=format.length;ps=s.datapoints.pointsize;points=s.datapoints.points;insertSteps=s.lines.show&&s.lines.steps;s.xaxis.used=s.yaxis.used=true;for(j=k=0;j<data.length;++j,k+=ps){p=data[j];var nullify=p==null;if(!nullify){for(m=0;m<ps;++m){val=p[m];f=format[m];if(f){if(f.number&&val!=null){val=+val;if(isNaN(val))
val=null;else if(val==Infinity)
val=fakeInfinity;else if(val==-Infinity)
val=-fakeInfinity;}
if(val==null){if(f.required)
nullify=true;if(f.defaultValue!=null)
val=f.defaultValue;}}
points[k+m]=val;}}
if(nullify){for(m=0;m<ps;++m){val=points[k+m];if(val!=null){f=format[m];if(f.x)
updateAxis(s.xaxis,val,val);if(f.y)
updateAxis(s.yaxis,val,val);}
points[k+m]=null;}}
else{if(insertSteps&&k>0&&points[k-ps]!=null&&points[k-ps]!=points[k]&&points[k-ps+1]!=points[k+1]){for(m=0;m<ps;++m)
points[k+ps+m]=points[k+m];points[k+1]=points[k-ps+1];k+=ps;}}}}
for(i=0;i<series.length;++i){s=series[i];executeHooks(hooks.processDatapoints,[s,s.datapoints]);}
for(i=0;i<series.length;++i){s=series[i];points=s.datapoints.points,ps=s.datapoints.pointsize;var xmin=topSentry,ymin=topSentry,xmax=bottomSentry,ymax=bottomSentry;for(j=0;j<points.length;j+=ps){if(points[j]==null)
continue;for(m=0;m<ps;++m){val=points[j+m];f=format[m];if(!f)
continue;if(f.x){if(val<xmin)
xmin=val;if(val>xmax)
xmax=val;}
if(f.y){if(val<ymin)
ymin=val;if(val>ymax)
ymax=val;}}}
if(s.bars.show){var delta=s.bars.align=="left"?0:-s.bars.barWidth/2;if(s.bars.horizontal){ymin+=delta;ymax+=delta+s.bars.barWidth;}
else{xmin+=delta;xmax+=delta+s.bars.barWidth;}}
updateAxis(s.xaxis,xmin,xmax);updateAxis(s.yaxis,ymin,ymax);}
$.each(getUsedAxes(),function(i,axis){if(axis.datamin==topSentry)
axis.datamin=null;if(axis.datamax==bottomSentry)
axis.datamax=null;});}
function constructCanvas(){canvasWidth=placeholder.width();canvasHeight=placeholder.height();if(window.G_vmlCanvasManager)
placeholder.find("canvas").each(function(){this.context_=null;});placeholder.html("");if(placeholder.css("position")=='static')
placeholder.css("position","relative");if(canvasWidth<=0||canvasHeight<=0)
throw"Invalid dimensions for plot, width = "+canvasWidth+", height = "+canvasHeight;function makeCanvas(skipPositioning){var c=document.createElement('canvas');c.width=canvasWidth;c.height=canvasHeight;if(!skipPositioning)
$(c).css({position:'absolute',left:0,top:0});$(c).appendTo(placeholder);if(!c.getContext)
c=window.G_vmlCanvasManager.initElement(c);return c;}
canvas=makeCanvas(true);ctx=canvas.getContext("2d");overlay=makeCanvas();octx=overlay.getContext("2d");}
function bindEvents(){eventHolder=$([overlay,canvas]);if(options.grid.hoverable){eventHolder.mousemove(onMouseMove);eventHolder.mouseleave(onMouseLeave);}
if(options.grid.clickable)
eventHolder.click(onClick);executeHooks(hooks.bindEvents,[eventHolder]);}
function setTransformationHelpers(axis){function identity(x){return x;}
var s,m,t=axis.options.transform||identity,it=axis.options.inverseTransform;if(axis.direction=="x"){s=axis.scale=plotWidth/(t(axis.max)-t(axis.min));m=t(axis.min);if(t==identity)
axis.p2c=function(p){return(p-m)*s;};else
axis.p2c=function(p){return(t(p)-m)*s;};if(!it)
axis.c2p=function(c){return m+c/s;};else
axis.c2p=function(c){return it(m+c/s);};}
else{s=axis.scale=plotHeight/(t(axis.max)-t(axis.min));m=t(axis.max);if(t==identity)
axis.p2c=function(p){return(m-p)*s;};else
axis.p2c=function(p){return(m-t(p))*s;};if(!it)
axis.c2p=function(c){return m-c/s;};else
axis.c2p=function(c){return it(m-c/s);};}}
function measureTickLabels(axis){if(!axis)
return;var opts=axis.options,i,ticks=axis.ticks||[],labels=[],l,w=opts.labelWidth,h=opts.labelHeight,dummyDiv;function makeDummyDiv(labels,width){return $('<div style="position:absolute;top:-10000px;'+width+'font-size:smaller">'+'<div class="'+axis.direction+'Axis '+axis.direction+axis.n+'Axis">'
+labels.join("")+'</div></div>').appendTo(placeholder);}
if(axis.direction=="x"){if(w==null)
w=Math.floor(canvasWidth/(ticks.length>0?ticks.length:1));if(h==null){labels=[];for(i=0;i<ticks.length;++i){l=ticks[i].label;if(l)
labels.push('<div class="tickLabel" style="float:left;width:'+w+'px">'+l+'</div>');}
if(labels.length>0){labels.push('<div style="clear:left"></div>');dummyDiv=makeDummyDiv(labels,"width:10000px;");h=dummyDiv.height();dummyDiv.remove();}}}
else if(w==null||h==null){for(i=0;i<ticks.length;++i){l=ticks[i].label;if(l)
labels.push('<div class="tickLabel">'+l+'</div>');}
if(labels.length>0){dummyDiv=makeDummyDiv(labels,"");if(w==null)
w=dummyDiv.children().width();if(h==null)
h=dummyDiv.find("div.tickLabel").height();dummyDiv.remove();}}
if(w==null)
w=0;if(h==null)
h=0;axis.labelWidth=w;axis.labelHeight=h;}
function computeAxisBox(axis){if(!axis||!axis.labelWidth||!axis.labelHeight)
return;var lw=axis.labelWidth,lh=axis.labelHeight,pos=axis.options.position,tickLength=axis.options.tickLength,axismargin=options.grid.axisMargin,padding=options.grid.labelMargin,all=axis.direction=="x"?xaxes:yaxes,index;var samePosition=$.grep(all,function(a){return a&&a.options.position==pos&&(a.labelHeight||a.labelWidth);});if($.inArray(axis,samePosition)==samePosition.length-1)
axismargin=0;if(tickLength==null)
tickLength="full";var sameDirection=$.grep(all,function(a){return a&&(a.labelHeight||a.labelWidth);});var innermost=$.inArray(axis,sameDirection)==0;if(!innermost&&tickLength=="full")
tickLength=5;if(!isNaN(+tickLength))
padding+=+tickLength;if(axis.direction=="x"){lh+=padding;if(pos=="bottom"){plotOffset.bottom+=lh+axismargin;axis.box={top:canvasHeight-plotOffset.bottom,height:lh};}
else{axis.box={top:plotOffset.top+axismargin,height:lh};plotOffset.top+=lh+axismargin;}}
else{lw+=padding;if(pos=="left"){axis.box={left:plotOffset.left+axismargin,width:lw};plotOffset.left+=lw+axismargin;}
else{plotOffset.right+=lw+axismargin;axis.box={left:canvasWidth-plotOffset.right,width:lw};}}
axis.position=pos;axis.tickLength=tickLength;axis.box.padding=padding;axis.innermost=innermost;}
function fixupAxisBox(axis){if(!axis||!axis.labelWidth||!axis.labelHeight)
return;if(axis.direction=="x"){axis.box.left=plotOffset.left;axis.box.width=plotWidth;}
else{axis.box.top=plotOffset.top;axis.box.height=plotHeight;}}
function setupGrid(){var axes=getUsedAxes(),j,k;for(k=0;k<axes.length;++k)
setRange(axes[k]);plotOffset.left=plotOffset.right=plotOffset.top=plotOffset.bottom=0;if(options.grid.show){for(k=0;k<axes.length;++k){setupTickGeneration(axes[k]);setTicks(axes[k]);snapRangeToTicks(axes[k],axes[k].ticks);}
for(j=0;j<xaxes.length;++j)
measureTickLabels(xaxes[j]);for(j=0;j<yaxes.length;++j)
measureTickLabels(yaxes[j]);for(j=xaxes.length-1;j>=0;--j)
computeAxisBox(xaxes[j]);for(j=yaxes.length-1;j>=0;--j)
computeAxisBox(yaxes[j]);var maxOutset=0;for(var i=0;i<series.length;++i)
maxOutset=Math.max(maxOutset,2*(series[i].points.radius+series[i].points.lineWidth/2));for(var a in plotOffset){plotOffset[a]+=options.grid.borderWidth;plotOffset[a]=Math.max(maxOutset,plotOffset[a]);}}
plotWidth=canvasWidth-plotOffset.left-plotOffset.right;plotHeight=canvasHeight-plotOffset.bottom-plotOffset.top;for(k=0;k<axes.length;++k)
setTransformationHelpers(axes[k]);if(options.grid.show){for(k=0;k<axes.length;++k)
fixupAxisBox(axes[k]);insertAxisLabels();}
insertLegend();}
function setRange(axis){var opts=axis.options,min=+(opts.min!=null?opts.min:axis.datamin),max=+(opts.max!=null?opts.max:axis.datamax),delta=max-min;if(delta==0.0){var widen=max==0?1:0.01;if(opts.min==null)
min-=widen;if(opts.max==null||opts.min!=null)
max+=widen;}
else{var margin=opts.autoscaleMargin;if(margin!=null){if(opts.min==null){min-=delta*margin;if(min<0&&axis.datamin!=null&&axis.datamin>=0)
min=0;}
if(opts.max==null){max+=delta*margin;if(max>0&&axis.datamax!=null&&axis.datamax<=0)
max=0;}}}
axis.min=min;axis.max=max;}
function setupTickGeneration(axis){var opts=axis.options;var noTicks;if(typeof opts.ticks=="number"&&opts.ticks>0)
noTicks=opts.ticks;else if(axis.direction=="x")
noTicks=0.3*Math.sqrt(canvasWidth);else
noTicks=0.3*Math.sqrt(canvasHeight);var delta=(axis.max-axis.min)/noTicks,size,generator,unit,formatter,i,magn,norm;if(opts.mode=="time"){var timeUnitSize={"second":1000,"minute":60*1000,"hour":60*60*1000,"day":24*60*60*1000,"month":30*24*60*60*1000,"year":365.2425*24*60*60*1000};var spec=[[1,"second"],[2,"second"],[5,"second"],[10,"second"],[30,"second"],[1,"minute"],[2,"minute"],[5,"minute"],[10,"minute"],[30,"minute"],[1,"hour"],[2,"hour"],[4,"hour"],[8,"hour"],[12,"hour"],[1,"day"],[2,"day"],[3,"day"],[0.25,"month"],[0.5,"month"],[1,"month"],[2,"month"],[3,"month"],[6,"month"],[1,"year"]];var minSize=0;if(opts.minTickSize!=null){if(typeof opts.tickSize=="number")
minSize=opts.tickSize;else
minSize=opts.minTickSize[0]*timeUnitSize[opts.minTickSize[1]];}
for(var i=0;i<spec.length-1;++i)
if(delta<(spec[i][0]*timeUnitSize[spec[i][1]]
+spec[i+1][0]*timeUnitSize[spec[i+1][1]])/2&&spec[i][0]*timeUnitSize[spec[i][1]]>=minSize)
break;size=spec[i][0];unit=spec[i][1];if(unit=="year"){magn=Math.pow(10,Math.floor(Math.log(delta/timeUnitSize.year)/Math.LN10));norm=(delta/timeUnitSize.year)/magn;if(norm<1.5)
size=1;else if(norm<3)
size=2;else if(norm<7.5)
size=5;else
size=10;size*=magn;}
axis.tickSize=opts.tickSize||[size,unit];generator=function(axis){var ticks=[],tickSize=axis.tickSize[0],unit=axis.tickSize[1],d=new Date(axis.min);var step=tickSize*timeUnitSize[unit];if(unit=="second")
d.setUTCSeconds(floorInBase(d.getUTCSeconds(),tickSize));if(unit=="minute")
d.setUTCMinutes(floorInBase(d.getUTCMinutes(),tickSize));if(unit=="hour")
d.setUTCHours(floorInBase(d.getUTCHours(),tickSize));if(unit=="month")
d.setUTCMonth(floorInBase(d.getUTCMonth(),tickSize));if(unit=="year")
d.setUTCFullYear(floorInBase(d.getUTCFullYear(),tickSize));d.setUTCMilliseconds(0);if(step>=timeUnitSize.minute)
d.setUTCSeconds(0);if(step>=timeUnitSize.hour)
d.setUTCMinutes(0);if(step>=timeUnitSize.day)
d.setUTCHours(0);if(step>=timeUnitSize.day*4)
d.setUTCDate(1);if(step>=timeUnitSize.year)
d.setUTCMonth(0);var carry=0,v=Number.NaN,prev;do{prev=v;v=d.getTime();ticks.push(v);if(unit=="month"){if(tickSize<1){d.setUTCDate(1);var start=d.getTime();d.setUTCMonth(d.getUTCMonth()+1);var end=d.getTime();d.setTime(v+carry*timeUnitSize.hour+(end-start)*tickSize);carry=d.getUTCHours();d.setUTCHours(0);}
else
d.setUTCMonth(d.getUTCMonth()+tickSize);}
else if(unit=="year"){d.setUTCFullYear(d.getUTCFullYear()+tickSize);}
else
d.setTime(v+step);}while(v<axis.max&&v!=prev);return ticks;};formatter=function(v,axis){var d=new Date(v);if(opts.timeformat!=null)
return $.plot.formatDate(d,opts.timeformat,opts.monthNames);var t=axis.tickSize[0]*timeUnitSize[axis.tickSize[1]];var span=axis.max-axis.min;var suffix=(opts.twelveHourClock)?" %p":"";if(t<timeUnitSize.minute)
fmt="%h:%M:%S"+suffix;else if(t<timeUnitSize.day){if(span<2*timeUnitSize.day)
fmt="%h:%M"+suffix;else
fmt="%b %d %h:%M"+suffix;}
else if(t<timeUnitSize.month)
fmt="%b %d";else if(t<timeUnitSize.year){if(span<timeUnitSize.year)
fmt="%b";else
fmt="%b %y";}
else
fmt="%y";return $.plot.formatDate(d,fmt,opts.monthNames);};}
else{var maxDec=opts.tickDecimals;var dec=-Math.floor(Math.log(delta)/Math.LN10);if(maxDec!=null&&dec>maxDec)
dec=maxDec;magn=Math.pow(10,-dec);norm=delta/magn;if(norm<1.5)
size=1;else if(norm<3){size=2;if(norm>2.25&&(maxDec==null||dec+1<=maxDec)){size=2.5;++dec;}}
else if(norm<7.5)
size=5;else
size=10;size*=magn;if(opts.minTickSize!=null&&size<opts.minTickSize)
size=opts.minTickSize;axis.tickDecimals=Math.max(0,maxDec!=null?maxDec:dec);axis.tickSize=opts.tickSize||size;generator=function(axis){var ticks=[];var start=floorInBase(axis.min,axis.tickSize),i=0,v=Number.NaN,prev;do{prev=v;v=start+i*axis.tickSize;ticks.push(v);++i;}while(v<axis.max&&v!=prev);return ticks;};formatter=function(v,axis){return v.toFixed(axis.tickDecimals);};}
if(opts.alignTicksWithAxis!=null){var otherAxis=(axis.direction=="x"?xaxes:yaxes)[opts.alignTicksWithAxis-1];if(otherAxis&&otherAxis.used&&otherAxis!=axis){var niceTicks=generator(axis);if(niceTicks.length>0){if(opts.min==null)
axis.min=Math.min(axis.min,niceTicks[0]);if(opts.max==null&&niceTicks.length>1)
axis.max=Math.max(axis.max,niceTicks[niceTicks.length-1]);}
generator=function(axis){var ticks=[],v,i;for(i=0;i<otherAxis.ticks.length;++i){v=(otherAxis.ticks[i].v-otherAxis.min)/(otherAxis.max-otherAxis.min);v=axis.min+v*(axis.max-axis.min);ticks.push(v);}
return ticks;};if(axis.mode!="time"&&opts.tickDecimals==null){var extraDec=Math.max(0,-Math.floor(Math.log(delta)/Math.LN10)+1),ts=generator(axis);if(!(ts.length>1&&/\..*0$/.test((ts[1]-ts[0]).toFixed(extraDec))))
axis.tickDecimals=extraDec;}}}
axis.tickGenerator=generator;if($.isFunction(opts.tickFormatter))
axis.tickFormatter=function(v,axis){return""+opts.tickFormatter(v,axis);};else
axis.tickFormatter=formatter;}
function setTicks(axis){axis.ticks=[];var oticks=axis.options.ticks,ticks=[];if(oticks==null||(typeof oticks=="number"&&oticks>0))
ticks=axis.tickGenerator(axis);else if(oticks){if($.isFunction(oticks))
ticks=oticks({min:axis.min,max:axis.max});else
ticks=oticks;}
var i,v;for(i=0;i<ticks.length;++i){var label=null;var t=ticks[i];if(typeof t=="object"){v=t[0];if(t.length>1)
label=t[1];}
else
v=t;if(label==null)
label=axis.tickFormatter(v,axis);axis.ticks[i]={v:v,label:label};}}
function snapRangeToTicks(axis,ticks){if(axis.options.autoscaleMargin&&ticks.length>0){if(axis.options.min==null)
axis.min=Math.min(axis.min,ticks[0].v);if(axis.options.max==null&&ticks.length>1)
axis.max=Math.max(axis.max,ticks[ticks.length-1].v);}}
function draw(){ctx.clearRect(0,0,canvasWidth,canvasHeight);var grid=options.grid;if(grid.show&&grid.backgroundColor)
drawBackground();if(grid.show&&!grid.aboveData)
drawGrid();for(var i=0;i<series.length;++i){executeHooks(hooks.drawSeries,[ctx,series[i]]);drawSeries(series[i]);}
executeHooks(hooks.draw,[ctx]);if(grid.show&&grid.aboveData)
drawGrid();}
function extractRange(ranges,coord){var axis,from,to,axes,key;axes=getUsedAxes();for(i=0;i<axes.length;++i){axis=axes[i];if(axis.direction==coord){key=coord+axis.n+"axis";if(!ranges[key]&&axis.n==1)
key=coord+"axis";if(ranges[key]){from=ranges[key].from;to=ranges[key].to;break;}}}
if(!ranges[key]){axis=coord=="x"?xaxes[0]:yaxes[0];from=ranges[coord+"1"];to=ranges[coord+"2"];}
if(from!=null&&to!=null&&from>to){var tmp=from;from=to;to=tmp;}
return{from:from,to:to,axis:axis};}
function drawBackground(){ctx.save();ctx.translate(plotOffset.left,plotOffset.top);ctx.fillStyle=getColorOrGradient(options.grid.backgroundColor,plotHeight,0,"rgba(255, 255, 255, 0)");ctx.fillRect(0,0,plotWidth,plotHeight);ctx.restore();}
function drawGrid(){var i;ctx.save();ctx.translate(plotOffset.left,plotOffset.top);var markings=options.grid.markings;if(markings){if($.isFunction(markings)){var axes=plot.getAxes();axes.xmin=axes.xaxis.min;axes.xmax=axes.xaxis.max;axes.ymin=axes.yaxis.min;axes.ymax=axes.yaxis.max;markings=markings(axes);}
for(i=0;i<markings.length;++i){var m=markings[i],xrange=extractRange(m,"x"),yrange=extractRange(m,"y");if(xrange.from==null)
xrange.from=xrange.axis.min;if(xrange.to==null)
xrange.to=xrange.axis.max;if(yrange.from==null)
yrange.from=yrange.axis.min;if(yrange.to==null)
yrange.to=yrange.axis.max;if(xrange.to<xrange.axis.min||xrange.from>xrange.axis.max||yrange.to<yrange.axis.min||yrange.from>yrange.axis.max)
continue;xrange.from=Math.max(xrange.from,xrange.axis.min);xrange.to=Math.min(xrange.to,xrange.axis.max);yrange.from=Math.max(yrange.from,yrange.axis.min);yrange.to=Math.min(yrange.to,yrange.axis.max);if(xrange.from==xrange.to&&yrange.from==yrange.to)
continue;xrange.from=xrange.axis.p2c(xrange.from);xrange.to=xrange.axis.p2c(xrange.to);yrange.from=yrange.axis.p2c(yrange.from);yrange.to=yrange.axis.p2c(yrange.to);if(xrange.from==xrange.to||yrange.from==yrange.to){ctx.beginPath();ctx.strokeStyle=m.color||options.grid.markingsColor;ctx.lineWidth=m.lineWidth||options.grid.markingsLineWidth;ctx.moveTo(xrange.from,yrange.from);ctx.lineTo(xrange.to,yrange.to);ctx.stroke();}
else{ctx.fillStyle=m.color||options.grid.markingsColor;ctx.fillRect(xrange.from,yrange.to,xrange.to-xrange.from,yrange.from-yrange.to);}}}
var axes=getUsedAxes(),bw=options.grid.borderWidth;for(var j=0;j<axes.length;++j){var axis=axes[j],box=axis.box,t=axis.tickLength,x,y,xoff,yoff;if(axis.ticks.length==0)
continue;ctx.strokeStyle=axis.options.tickColor||$.color.parse(axis.options.color).scale('a',0.22).toString();ctx.lineWidth=1;if(axis.direction=="x"){x=0;if(t=="full")
y=(axis.position=="top"?0:plotHeight);else
y=box.top-plotOffset.top+(axis.position=="top"?box.height:0);}
else{y=0;if(t=="full")
x=(axis.position=="left"?0:plotWidth);else
x=box.left-plotOffset.left+(axis.position=="left"?box.width:0);}
if(!axis.innermost){ctx.beginPath();xoff=yoff=0;if(axis.direction=="x")
xoff=plotWidth;else
yoff=plotHeight;if(ctx.lineWidth==1){x=Math.floor(x)+0.5;y=Math.floor(y)+0.5;}
ctx.moveTo(x,y);ctx.lineTo(x+xoff,y+yoff);ctx.stroke();}
ctx.beginPath();for(i=0;i<axis.ticks.length;++i){var v=axis.ticks[i].v;xoff=yoff=0;if(v<axis.min||v>axis.max||(t=="full"&&bw>0&&(v==axis.min||v==axis.max)))
continue;if(axis.direction=="x"){x=axis.p2c(v);yoff=t=="full"?-plotHeight:t;if(axis.position=="top")
yoff=-yoff;}
else{y=axis.p2c(v);xoff=t=="full"?-plotWidth:t;if(axis.position=="left")
xoff=-xoff;}
if(ctx.lineWidth==1){if(axis.direction=="x")
x=Math.floor(x)+0.5;else
y=Math.floor(y)+0.5;}
ctx.moveTo(x,y);ctx.lineTo(x+xoff,y+yoff);}
ctx.stroke();}
if(bw){ctx.lineWidth=bw;ctx.strokeStyle=options.grid.borderColor;ctx.strokeRect(-bw/2,-bw/2,plotWidth+bw,plotHeight+bw);}
ctx.restore();}
function insertAxisLabels(){placeholder.find(".tickLabels").remove();var html=['<div class="tickLabels" style="font-size:smaller">'];var axes=getUsedAxes();for(var j=0;j<axes.length;++j){var axis=axes[j],box=axis.box;html.push('<div class="'+axis.direction+'Axis '+axis.direction+axis.n+'Axis" style="color:'+axis.options.color+'">');for(var i=0;i<axis.ticks.length;++i){var tick=axis.ticks[i];if(!tick.label||tick.v<axis.min||tick.v>axis.max)
continue;var pos={},align;if(axis.direction=="x"){align="center";pos.left=Math.round(plotOffset.left+axis.p2c(tick.v)-axis.labelWidth/2);if(axis.position=="bottom")
pos.top=box.top+box.padding;else
pos.bottom=canvasHeight-(box.top+box.height-box.padding);}
else{pos.top=Math.round(plotOffset.top+axis.p2c(tick.v)-axis.labelHeight/2);if(axis.position=="left"){pos.right=canvasWidth-(box.left+box.width-box.padding)
align="right";}
else{pos.left=box.left+box.padding;align="left";}}
pos.width=axis.labelWidth;var style=["position:absolute","text-align:"+align];for(var a in pos)
style.push(a+":"+pos[a]+"px")
html.push('<div class="tickLabel" style="'+style.join(';')+'">'+tick.label+'</div>');}
html.push('</div>');}
html.push('</div>');placeholder.append(html.join(""));}
function drawSeries(series){if(series.lines.show)
drawSeriesLines(series);if(series.bars.show)
drawSeriesBars(series);if(series.points.show)
drawSeriesPoints(series);}
function drawSeriesLines(series){function plotLine(datapoints,xoffset,yoffset,axisx,axisy){var points=datapoints.points,ps=datapoints.pointsize,prevx=null,prevy=null;ctx.beginPath();for(var i=ps;i<points.length;i+=ps){var x1=points[i-ps],y1=points[i-ps+1],x2=points[i],y2=points[i+1];if(x1==null||x2==null)
continue;if(y1<=y2&&y1<axisy.min){if(y2<axisy.min)
continue;x1=(axisy.min-y1)/(y2-y1)*(x2-x1)+x1;y1=axisy.min;}
else if(y2<=y1&&y2<axisy.min){if(y1<axisy.min)
continue;x2=(axisy.min-y1)/(y2-y1)*(x2-x1)+x1;y2=axisy.min;}
if(y1>=y2&&y1>axisy.max){if(y2>axisy.max)
continue;x1=(axisy.max-y1)/(y2-y1)*(x2-x1)+x1;y1=axisy.max;}
else if(y2>=y1&&y2>axisy.max){if(y1>axisy.max)
continue;x2=(axisy.max-y1)/(y2-y1)*(x2-x1)+x1;y2=axisy.max;}
if(x1<=x2&&x1<axisx.min){if(x2<axisx.min)
continue;y1=(axisx.min-x1)/(x2-x1)*(y2-y1)+y1;x1=axisx.min;}
else if(x2<=x1&&x2<axisx.min){if(x1<axisx.min)
continue;y2=(axisx.min-x1)/(x2-x1)*(y2-y1)+y1;x2=axisx.min;}
if(x1>=x2&&x1>axisx.max){if(x2>axisx.max)
continue;y1=(axisx.max-x1)/(x2-x1)*(y2-y1)+y1;x1=axisx.max;}
else if(x2>=x1&&x2>axisx.max){if(x1>axisx.max)
continue;y2=(axisx.max-x1)/(x2-x1)*(y2-y1)+y1;x2=axisx.max;}
if(x1!=prevx||y1!=prevy)
ctx.moveTo(axisx.p2c(x1)+xoffset,axisy.p2c(y1)+yoffset);prevx=x2;prevy=y2;ctx.lineTo(axisx.p2c(x2)+xoffset,axisy.p2c(y2)+yoffset);}
ctx.stroke();}
function plotLineArea(datapoints,axisx,axisy){var points=datapoints.points,ps=datapoints.pointsize,bottom=Math.min(Math.max(0,axisy.min),axisy.max),i=0,top,areaOpen=false,ypos=1,segmentStart=0,segmentEnd=0;while(true){if(ps>0&&i>points.length+ps)
break;i+=ps;var x1=points[i-ps],y1=points[i-ps+ypos],x2=points[i],y2=points[i+ypos];if(areaOpen){if(ps>0&&x1!=null&&x2==null){segmentEnd=i;ps=-ps;ypos=2;continue;}
if(ps<0&&i==segmentStart+ps){ctx.fill();areaOpen=false;ps=-ps;ypos=1;i=segmentStart=segmentEnd+ps;continue;}}
if(x1==null||x2==null)
continue;if(x1<=x2&&x1<axisx.min){if(x2<axisx.min)
continue;y1=(axisx.min-x1)/(x2-x1)*(y2-y1)+y1;x1=axisx.min;}
else if(x2<=x1&&x2<axisx.min){if(x1<axisx.min)
continue;y2=(axisx.min-x1)/(x2-x1)*(y2-y1)+y1;x2=axisx.min;}
if(x1>=x2&&x1>axisx.max){if(x2>axisx.max)
continue;y1=(axisx.max-x1)/(x2-x1)*(y2-y1)+y1;x1=axisx.max;}
else if(x2>=x1&&x2>axisx.max){if(x1>axisx.max)
continue;y2=(axisx.max-x1)/(x2-x1)*(y2-y1)+y1;x2=axisx.max;}
if(!areaOpen){ctx.beginPath();ctx.moveTo(axisx.p2c(x1),axisy.p2c(bottom));areaOpen=true;}
if(y1>=axisy.max&&y2>=axisy.max){ctx.lineTo(axisx.p2c(x1),axisy.p2c(axisy.max));ctx.lineTo(axisx.p2c(x2),axisy.p2c(axisy.max));continue;}
else if(y1<=axisy.min&&y2<=axisy.min){ctx.lineTo(axisx.p2c(x1),axisy.p2c(axisy.min));ctx.lineTo(axisx.p2c(x2),axisy.p2c(axisy.min));continue;}
var x1old=x1,x2old=x2;if(y1<=y2&&y1<axisy.min&&y2>=axisy.min){x1=(axisy.min-y1)/(y2-y1)*(x2-x1)+x1;y1=axisy.min;}
else if(y2<=y1&&y2<axisy.min&&y1>=axisy.min){x2=(axisy.min-y1)/(y2-y1)*(x2-x1)+x1;y2=axisy.min;}
if(y1>=y2&&y1>axisy.max&&y2<=axisy.max){x1=(axisy.max-y1)/(y2-y1)*(x2-x1)+x1;y1=axisy.max;}
else if(y2>=y1&&y2>axisy.max&&y1<=axisy.max){x2=(axisy.max-y1)/(y2-y1)*(x2-x1)+x1;y2=axisy.max;}
if(x1!=x1old){ctx.lineTo(axisx.p2c(x1old),axisy.p2c(y1));}
ctx.lineTo(axisx.p2c(x1),axisy.p2c(y1));ctx.lineTo(axisx.p2c(x2),axisy.p2c(y2));if(x2!=x2old){ctx.lineTo(axisx.p2c(x2),axisy.p2c(y2));ctx.lineTo(axisx.p2c(x2old),axisy.p2c(y2));}}}
ctx.save();ctx.translate(plotOffset.left,plotOffset.top);ctx.lineJoin="round";var lw=series.lines.lineWidth,sw=series.shadowSize;if(lw>0&&sw>0){ctx.lineWidth=sw;ctx.strokeStyle="rgba(0,0,0,0.1)";var angle=Math.PI/18;plotLine(series.datapoints,Math.sin(angle)*(lw/2+sw/2),Math.cos(angle)*(lw/2+sw/2),series.xaxis,series.yaxis);ctx.lineWidth=sw/2;plotLine(series.datapoints,Math.sin(angle)*(lw/2+sw/4),Math.cos(angle)*(lw/2+sw/4),series.xaxis,series.yaxis);}
ctx.lineWidth=lw;ctx.strokeStyle=series.color;var fillStyle=getFillStyle(series.lines,series.color,0,plotHeight);if(fillStyle){ctx.fillStyle=fillStyle;plotLineArea(series.datapoints,series.xaxis,series.yaxis);}
if(lw>0)
plotLine(series.datapoints,0,0,series.xaxis,series.yaxis);ctx.restore();}
function drawSeriesPoints(series){function plotPoints(datapoints,radius,fillStyle,offset,shadow,axisx,axisy,symbol){var points=datapoints.points,ps=datapoints.pointsize;for(var i=0;i<points.length;i+=ps){var x=points[i],y=points[i+1];if(x==null||x<axisx.min||x>axisx.max||y<axisy.min||y>axisy.max)
continue;ctx.beginPath();x=axisx.p2c(x);y=axisy.p2c(y)+offset;if(symbol=="circle")
ctx.arc(x,y,radius,0,shadow?Math.PI:Math.PI*2,false);else
symbol(ctx,x,y,radius,shadow);ctx.closePath();if(fillStyle){ctx.fillStyle=fillStyle;ctx.fill();}
ctx.stroke();}}
ctx.save();ctx.translate(plotOffset.left,plotOffset.top);var lw=series.points.lineWidth,sw=series.shadowSize,radius=series.points.radius,symbol=series.points.symbol;if(lw>0&&sw>0){var w=sw/2;ctx.lineWidth=w;ctx.strokeStyle="rgba(0,0,0,0.1)";plotPoints(series.datapoints,radius,null,w+w/2,true,series.xaxis,series.yaxis,symbol);ctx.strokeStyle="rgba(0,0,0,0.2)";plotPoints(series.datapoints,radius,null,w/2,true,series.xaxis,series.yaxis,symbol);}
ctx.lineWidth=lw;ctx.strokeStyle=series.color;plotPoints(series.datapoints,radius,getFillStyle(series.points,series.color),0,false,series.xaxis,series.yaxis,symbol);ctx.restore();}
function drawBar(x,y,b,barLeft,barRight,offset,fillStyleCallback,axisx,axisy,c,horizontal,lineWidth){var left,right,bottom,top,drawLeft,drawRight,drawTop,drawBottom,tmp;if(horizontal){drawBottom=drawRight=drawTop=true;drawLeft=false;left=b;right=x;top=y+barLeft;bottom=y+barRight;if(right<left){tmp=right;right=left;left=tmp;drawLeft=true;drawRight=false;}}
else{drawLeft=drawRight=drawTop=true;drawBottom=false;left=x+barLeft;right=x+barRight;bottom=b;top=y;if(top<bottom){tmp=top;top=bottom;bottom=tmp;drawBottom=true;drawTop=false;}}
if(right<axisx.min||left>axisx.max||top<axisy.min||bottom>axisy.max)
return;if(left<axisx.min){left=axisx.min;drawLeft=false;}
if(right>axisx.max){right=axisx.max;drawRight=false;}
if(bottom<axisy.min){bottom=axisy.min;drawBottom=false;}
if(top>axisy.max){top=axisy.max;drawTop=false;}
left=axisx.p2c(left);bottom=axisy.p2c(bottom);right=axisx.p2c(right);top=axisy.p2c(top);if(fillStyleCallback){c.beginPath();c.moveTo(left,bottom);c.lineTo(left,top);c.lineTo(right,top);c.lineTo(right,bottom);c.fillStyle=fillStyleCallback(bottom,top);c.fill();}
if(lineWidth>0&&(drawLeft||drawRight||drawTop||drawBottom)){c.beginPath();c.moveTo(left,bottom+offset);if(drawLeft)
c.lineTo(left,top+offset);else
c.moveTo(left,top+offset);if(drawTop)
c.lineTo(right,top+offset);else
c.moveTo(right,top+offset);if(drawRight)
c.lineTo(right,bottom+offset);else
c.moveTo(right,bottom+offset);if(drawBottom)
c.lineTo(left,bottom+offset);else
c.moveTo(left,bottom+offset);c.stroke();}}
function drawSeriesBars(series){function plotBars(datapoints,barLeft,barRight,offset,fillStyleCallback,axisx,axisy){var points=datapoints.points,ps=datapoints.pointsize;for(var i=0;i<points.length;i+=ps){if(points[i]==null)
continue;drawBar(points[i],points[i+1],points[i+2],barLeft,barRight,offset,fillStyleCallback,axisx,axisy,ctx,series.bars.horizontal,series.bars.lineWidth);}}
ctx.save();ctx.translate(plotOffset.left,plotOffset.top);ctx.lineWidth=series.bars.lineWidth;ctx.strokeStyle=series.color;var barLeft=series.bars.align=="left"?0:-series.bars.barWidth/2;var fillStyleCallback=series.bars.fill?function(bottom,top){return getFillStyle(series.bars,series.color,bottom,top);}:null;plotBars(series.datapoints,barLeft,barLeft+series.bars.barWidth,0,fillStyleCallback,series.xaxis,series.yaxis);ctx.restore();}
function getFillStyle(filloptions,seriesColor,bottom,top){var fill=filloptions.fill;if(!fill)
return null;if(filloptions.fillColor)
return getColorOrGradient(filloptions.fillColor,bottom,top,seriesColor);var c=$.color.parse(seriesColor);c.a=typeof fill=="number"?fill:0.4;c.normalize();return c.toString();}
function insertLegend(){placeholder.find(".legend").remove();if(!options.legend.show)
return;var fragments=[],rowStarted=false,lf=options.legend.labelFormatter,s,label;for(var i=0;i<series.length;++i){s=series[i];label=s.label;if(!label)
continue;if(i%options.legend.noColumns==0){if(rowStarted)
fragments.push('</tr>');fragments.push('<tr>');rowStarted=true;}
if(lf)
label=lf(label,s);fragments.push('<td class="legendColorBox"><div style="border:1px solid '+options.legend.labelBoxBorderColor+';padding:1px"><div style="width:4px;height:0;border:5px solid '+s.color+';overflow:hidden"></div></div></td>'+'<td class="legendLabel">'+label+'</td>');}
if(rowStarted)
fragments.push('</tr>');if(fragments.length==0)
return;var table='<table style="font-size:smaller;color:'+options.grid.color+'">'+fragments.join("")+'</table>';if(options.legend.container!=null)
$(options.legend.container).html(table);else{var pos="",p=options.legend.position,m=options.legend.margin;if(m[0]==null)
m=[m,m];if(p.charAt(0)=="n")
pos+='top:'+(m[1]+plotOffset.top)+'px;';else if(p.charAt(0)=="s")
pos+='bottom:'+(m[1]+plotOffset.bottom)+'px;';if(p.charAt(1)=="e")
pos+='right:'+(m[0]+plotOffset.right)+'px;';else if(p.charAt(1)=="w")
pos+='left:'+(m[0]+plotOffset.left)+'px;';var legend=$('<div class="legend">'+table.replace('style="','style="position:absolute;'+pos+';')+'</div>').appendTo(placeholder);if(options.legend.backgroundOpacity!=0.0){var c=options.legend.backgroundColor;if(c==null){c=options.grid.backgroundColor;if(c&&typeof c=="string")
c=$.color.parse(c);else
c=$.color.extract(legend,'background-color');c.a=1;c=c.toString();}
var div=legend.children();$('<div style="position:absolute;width:'+div.width()+'px;height:'+div.height()+'px;'+pos+'background-color:'+c+';"> </div>').prependTo(legend).css('opacity',options.legend.backgroundOpacity);}}}
var highlights=[],redrawTimeout=null;function findNearbyItem(mouseX,mouseY,seriesFilter){var maxDistance=options.grid.mouseActiveRadius,smallestDistance=maxDistance*maxDistance+1,item=null,foundPoint=false,i,j;for(i=series.length-1;i>=0;--i){if(!seriesFilter(series[i]))
continue;var s=series[i],axisx=s.xaxis,axisy=s.yaxis,points=s.datapoints.points,ps=s.datapoints.pointsize,mx=axisx.c2p(mouseX),my=axisy.c2p(mouseY),maxx=maxDistance/axisx.scale,maxy=maxDistance/axisy.scale;if(s.lines.show||s.points.show){for(j=0;j<points.length;j+=ps){var x=points[j],y=points[j+1];if(x==null)
continue;if(x-mx>maxx||x-mx<-maxx||y-my>maxy||y-my<-maxy)
continue;var dx=Math.abs(axisx.p2c(x)-mouseX),dy=Math.abs(axisy.p2c(y)-mouseY),dist=dx*dx+dy*dy;if(dist<smallestDistance){smallestDistance=dist;item=[i,j/ps];}}}
if(s.bars.show&&!item){var barLeft=s.bars.align=="left"?0:-s.bars.barWidth/2,barRight=barLeft+s.bars.barWidth;for(j=0;j<points.length;j+=ps){var x=points[j],y=points[j+1],b=points[j+2];if(x==null)
continue;if(series[i].bars.horizontal?(mx<=Math.max(b,x)&&mx>=Math.min(b,x)&&my>=y+barLeft&&my<=y+barRight):(mx>=x+barLeft&&mx<=x+barRight&&my>=Math.min(b,y)&&my<=Math.max(b,y)))
item=[i,j/ps];}}}
if(item){i=item[0];j=item[1];ps=series[i].datapoints.pointsize;return{datapoint:series[i].datapoints.points.slice(j*ps,(j+1)*ps),dataIndex:j,series:series[i],seriesIndex:i};}
return null;}
function onMouseMove(e){if(options.grid.hoverable)
triggerClickHoverEvent("plothover",e,function(s){return s["hoverable"]!=false;});}
function onMouseLeave(e){if(options.grid.hoverable)
triggerClickHoverEvent("plothover",e,function(s){return false;});}
function onClick(e){triggerClickHoverEvent("plotclick",e,function(s){return s["clickable"]!=false;});}
function triggerClickHoverEvent(eventname,event,seriesFilter){var offset=eventHolder.offset(),canvasX=event.pageX-offset.left-plotOffset.left,canvasY=event.pageY-offset.top-plotOffset.top,pos=canvasToAxisCoords({left:canvasX,top:canvasY});pos.pageX=event.pageX;pos.pageY=event.pageY;var item=findNearbyItem(canvasX,canvasY,seriesFilter);if(item){item.pageX=parseInt(item.series.xaxis.p2c(item.datapoint[0])+offset.left+plotOffset.left);item.pageY=parseInt(item.series.yaxis.p2c(item.datapoint[1])+offset.top+plotOffset.top);}
if(options.grid.autoHighlight){for(var i=0;i<highlights.length;++i){var h=highlights[i];if(h.auto==eventname&&!(item&&h.series==item.series&&h.point[0]==item.datapoint[0]&&h.point[1]==item.datapoint[1]))
unhighlight(h.series,h.point);}
if(item)
highlight(item.series,item.datapoint,eventname);}
placeholder.trigger(eventname,[pos,item]);}
function triggerRedrawOverlay(){if(!redrawTimeout)
redrawTimeout=setTimeout(drawOverlay,30);}
function drawOverlay(){redrawTimeout=null;octx.save();octx.clearRect(0,0,canvasWidth,canvasHeight);octx.translate(plotOffset.left,plotOffset.top);var i,hi;for(i=0;i<highlights.length;++i){hi=highlights[i];if(hi.series.bars.show)
drawBarHighlight(hi.series,hi.point);else
drawPointHighlight(hi.series,hi.point);}
octx.restore();executeHooks(hooks.drawOverlay,[octx]);}
function highlight(s,point,auto){if(typeof s=="number")
s=series[s];if(typeof point=="number"){var ps=s.datapoints.pointsize;point=s.datapoints.points.slice(ps*point,ps*(point+1));}
var i=indexOfHighlight(s,point);if(i==-1){highlights.push({series:s,point:point,auto:auto});triggerRedrawOverlay();}
else if(!auto)
highlights[i].auto=false;}
function unhighlight(s,point){if(s==null&&point==null){highlights=[];triggerRedrawOverlay();}
if(typeof s=="number")
s=series[s];if(typeof point=="number")
point=s.data[point];var i=indexOfHighlight(s,point);if(i!=-1){highlights.splice(i,1);triggerRedrawOverlay();}}
function indexOfHighlight(s,p){for(var i=0;i<highlights.length;++i){var h=highlights[i];if(h.series==s&&h.point[0]==p[0]&&h.point[1]==p[1])
return i;}
return-1;}
function drawPointHighlight(series,point){var x=point[0],y=point[1],axisx=series.xaxis,axisy=series.yaxis;if(x<axisx.min||x>axisx.max||y<axisy.min||y>axisy.max)
return;var pointRadius=series.points.radius+series.points.lineWidth/2;octx.lineWidth=pointRadius;octx.strokeStyle=$.color.parse(series.color).scale('a',0.5).toString();var radius=1.5*pointRadius,x=axisx.p2c(x),y=axisy.p2c(y);octx.beginPath();if(series.points.symbol=="circle")
octx.arc(x,y,radius,0,2*Math.PI,false);else
series.points.symbol(octx,x,y,radius,false);octx.closePath();octx.stroke();}
function drawBarHighlight(series,point){octx.lineWidth=series.bars.lineWidth;octx.strokeStyle=$.color.parse(series.color).scale('a',0.5).toString();var fillStyle=$.color.parse(series.color).scale('a',0.5).toString();var barLeft=series.bars.align=="left"?0:-series.bars.barWidth/2;drawBar(point[0],point[1],point[2]||0,barLeft,barLeft+series.bars.barWidth,0,function(){return fillStyle;},series.xaxis,series.yaxis,octx,series.bars.horizontal,series.bars.lineWidth);}
function getColorOrGradient(spec,bottom,top,defaultColor){if(typeof spec=="string")
return spec;else{var gradient=ctx.createLinearGradient(0,top,0,bottom);for(var i=0,l=spec.colors.length;i<l;++i){var c=spec.colors[i];if(typeof c!="string"){var co=$.color.parse(defaultColor);if(c.brightness!=null)
co=co.scale('rgb',c.brightness)
if(c.opacity!=null)
co.a*=c.opacity;c=co.toString();}
gradient.addColorStop(i/(l-1),c);}
return gradient;}}}
$.plot=function(placeholder,data,options){var plot=new Plot($(placeholder),data,options,$.plot.plugins);return plot;};$.plot.plugins=[];$.plot.formatDate=function(d,fmt,monthNames){var leftPad=function(n){n=""+n;return n.length==1?"0"+n:n;};var r=[];var escape=false,padNext=false;var hours=d.getUTCHours();var isAM=hours<12;if(monthNames==null)
monthNames=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];if(fmt.search(/%p|%P/)!=-1){if(hours>12){hours=hours-12;}else if(hours==0){hours=12;}}
for(var i=0;i<fmt.length;++i){var c=fmt.charAt(i);if(escape){switch(c){case'h':c=""+hours;break;case'H':c=leftPad(hours);break;case'M':c=leftPad(d.getUTCMinutes());break;case'S':c=leftPad(d.getUTCSeconds());break;case'd':c=""+d.getUTCDate();break;case'm':c=""+(d.getUTCMonth()+1);break;case'y':c=""+d.getUTCFullYear();break;case'b':c=""+monthNames[d.getUTCMonth()];break;case'p':c=(isAM)?(""+"am"):(""+"pm");break;case'P':c=(isAM)?(""+"AM"):(""+"PM");break;case'0':c="";padNext=true;break;}
if(c&&padNext){c=leftPad(c);padNext=false;}
r.push(c);if(!padNext)
escape=false;}
else{if(c=="%")
escape=true;else
r.push(c);}}
return r.join("");};function floorInBase(n,base){return base*Math.floor(n/base);}})(jQuery);